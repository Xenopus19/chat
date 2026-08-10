import { socket } from "@/socket";
import { useEffect, useRef } from "react";
import type { Message } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { Mail, MailCheck, MailOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

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

  const getStatusMeta = (
    status: string,
  ): { icon: LucideIcon; label: string } | null => {
    switch (status) {
      case "SENT":
        return { icon: Mail, label: "Sent" };
      case "DELIVERED":
        return { icon: MailCheck, label: "Delivered" };
      case "READ":
        return { icon: MailOpen, label: "Read" };
      default:
        return null;
    }
  };

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

  const statusMeta = getStatusMeta(message.status);

  return (
    <li className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      {!isOwnMessage && (
        <div className="mr-2 mt-1 h-8 w-8 shrink-0 overflow-hidden rounded-full border border-emerald-500/20 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
          {otherUserAvatarUrl ? (
            <img
              src={otherUserAvatarUrl}
              alt={`${otherUserName ?? "User"} avatar`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase">
              {fallbackInitial}
            </div>
          )}
        </div>
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
          {isOwnMessage && statusMeta && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[10px] font-medium tracking-wide backdrop-blur-sm">
              <statusMeta.icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{statusMeta.label}</span>
            </span>
          )}
        </div>
      </article>
    </li>
  );
};

export default ChatMessage;
