import { getUserChats } from "@/services/chatService";
import { useAppDispatch } from "@/store/hooks";
import { handleApiError } from "@/utils/handleApiError";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChatsList from "./ChatsList";
import { useEffect } from "react";
import { socket } from "@/socket";
import type { ChatWithStatistics, Message } from "@/types";
import { makeMessage } from "@/reducers/message";

const MyChats = () => {
  const {
    data: chats,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["userChats"],
    queryFn: getUserChats,
  });

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleMessageCreated = (message: Message) => {
      queryClient.setQueryData<ChatWithStatistics[]>(["userChats"], (currentChats) => {
        if (!currentChats) {
          return currentChats;
        }

        const chatIndex = currentChats.findIndex((chat) => chat.id === message.chatId);
        if (chatIndex === -1) {
          dispatch(
            makeMessage(
              "A new chat with you have been added.",
              false,
              "Reload the page to see it."
            )
          );
          return currentChats;
        }

        const updatedChats = [...currentChats];
        const currentChat = updatedChats[chatIndex];

        updatedChats[chatIndex] = {
          ...currentChat,
          lastMessage: message,
          updatedAt: message.createdAt,
          unreadCount: currentChat.unreadCount + 1,
        };

        return updatedChats;
      });
    };

    socket.on("messageCreated", handleMessageCreated);

    return () => {
      socket.off("messageCreated", handleMessageCreated);
    };
  }, [dispatch, queryClient]);

  if (isLoading || !chats) {
    return <div>Loading...</div>;
  }

  if (isError) {
    handleApiError(error, dispatch, "Failed to fetch chats.");
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
          My chats
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Jump back into your conversations.
        </p>
      </div>

      <ChatsList chats={chats} />
    </section>
  );
};

export default MyChats;
