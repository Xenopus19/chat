import { socket } from "@/socket";
import { useEffect, useRef } from "react";
import type { Message } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { useAppSelector } from "@/store/hooks";
import MessageStatus from "./MessageStatus";
import UserAvatar from "../ui/UserAvatar";

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
  otherUserAvatarUrl?: string | null;
  otherUserName?: string;
}

const ChatMessage = ({
  message,
  isOwnMessage,
  otherUserAvatarUrl,
  otherUserName,
}: ChatMessageProps) => {
  const fallbackInitial = (otherUserName ?? "?").charAt(0).toUpperCase();

  const messageRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector((state) => state.user.data);

  const currentUserId = user?.id;

  useEffect(() => {
    if (message.userId === currentUserId || message.status === "READ") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          socket.emit("viewMessage", message.id);
          observer.disconnect();
        }
      },
      { threshold: 0.7 },
    );

    if (messageRef.current) {
      observer.observe(messageRef.current);
    }

    return () => observer.disconnect();
  }, [message.id, message.status, message.userId, currentUserId]);

  return (
    <li className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      {!isOwnMessage && (
        <UserAvatar
          src={otherUserAvatarUrl}
          name={otherUserName ?? "User"}
          fallback={fallbackInitial}
          className="mr-2 mt-1 h-8 w-8 border border-emerald-500/20"
          fallbackClassName="text-xs"
        />
      )}
      <article
        ref={messageRef}
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[70%] ${
          isOwnMessage
            ? "bg-emerald-600 text-white"
            : "border border-emerald-500/20 bg-emerald-50/70 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100"
        }`}
      >
        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed">
          {message.text}
        </p>
        <div
          className={`mt-2 flex items-center gap-2 text-[11px] ${
            isOwnMessage
              ? "justify-end text-emerald-100/90"
              : "text-emerald-700/80 dark:text-emerald-300/80"
          }`}
        >
          <time dateTime={message.createdAt}>
            {formatDate(message.createdAt, {
              fallback: "Unknown time",
              options: {
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              },
            })}
          </time>
          {isOwnMessage && <MessageStatus status={message.status} />}
        </div>
      </article>
    </li>
  );
};

export default ChatMessage;
