import type { Message } from "@/types";
import { formatDate } from "@/utils/formatDate";

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
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[70%] ${
          isOwnMessage
            ? "bg-emerald-600 text-white"
            : "border border-emerald-500/20 bg-emerald-50/70 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100"
        }`}
      >
        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed">
          {message.text}
        </p>
        <p
          className={`mt-2 text-[11px] ${
            isOwnMessage
              ? "text-emerald-100/85"
              : "text-emerald-700/80 dark:text-emerald-300/80"
          }`}
        >
          {formatDate(message.createdAt, {
            fallback: "Unknown time",
            options: {
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            },
          })}
        </p>
      </article>
    </li>
  );
};

export default ChatMessage;
