import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MessagesSquareIcon } from "lucide-react";
import { fetchChatById } from "@/services/chatService";
import { getMessagesByChatId } from "@/services/messageService";
import type { Message } from "@/types";
import { useAppSelector } from "@/store/hooks";
import { socket } from "@/socket";
import MessageField from "./MessageField";
import MessageList from "./MessageList";

const Chat = () => {
  const id = useParams().id;
  const user = useAppSelector((state) => state.user.data);
  const queryClient = useQueryClient();

  const {
    data: chat,
    isLoading: isChatLoading,
    isError: isChatError,
  } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => fetchChatById(id as string),
    enabled: Boolean(id),
  });

  const {
    data: messages,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessagesByChatId(id as string),
    enabled: Boolean(id),
  });

  useEffect(() => {
    socket.on("messageCreated", (message: Message) => {
      if (message.chatId !== id) {
        return;
      }

      queryClient.setQueryData(
        ["messages", id],
        (oldMessages: Message[] | undefined) => {
          if (!oldMessages) return [message];
          return [...oldMessages, message];
        },
      );
    });

    socket.on("messageViewed", (message: Message) => {
      if (message.chatId !== id) {
        return;
      }
      queryClient.setQueryData(
        ["messages", id],
        (oldMessages: Message[] | undefined) => {
          if (!oldMessages) return [message];
          return oldMessages.map((m) => (m.id === message.id ? message : m));
        },
      );
    });

    return () => {
      socket.off("messageCreated");
      socket.off("messageViewed");
    };
  }, [id]);

  const chatTitle = useMemo(() => {
    if (!chat?.name?.trim()) {
      return `Conversation with ${chat?.otherUser?.username ?? "Unknown User"}`;
    }

    return chat.name.trim();
  }, [chat]);

  if (isChatLoading || isMessagesLoading || !messages) {
    return <div>Loading...</div>;
  }

  if (!chat || !messages || !id) {
    return (
      <section className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
        Chat or messages not found.
      </section>
    );
  }

  const onSendMessage = (message: string) => {
    socket.emit("createMessage", { text: message, chatId: id });
  };

  if (!id) {
    return (
      <section className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
        No chat id provided.
      </section>
    );
  }

  if (isChatError || isMessagesError) {
    return (
      <section className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
        Failed to load chat data.
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <header className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-linear-to-r from-emerald-50 via-white to-emerald-50/70 p-4 dark:from-emerald-950/30 dark:via-emerald-900/20 dark:to-emerald-950/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-8 h-36 w-36 rounded-full bg-emerald-500/20 blur-3xl"
        />
        <div className="relative flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <MessagesSquareIcon className="size-5" />
          </span>
          <div>
            <h1 className="font-heading text-xl font-semibold text-emerald-900 dark:text-emerald-200">
              {chatTitle}
            </h1>
            <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">
              {messages.length} message{messages.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </header>

      <MessageList
        messageHistory={messages}
        currentUserId={user?.id}
        otherUserAvatarUrl={chat.otherUser?.avatarUrl}
        otherUserName={chat.otherUser?.username}
      />
      <MessageField onSendMessage={onSendMessage} />
    </section>
  );
};

export default Chat;
