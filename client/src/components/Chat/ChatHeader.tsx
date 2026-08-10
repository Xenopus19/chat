import { MessagesSquareIcon } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  messageCount: number;
}

const ChatHeader = ({ title, messageCount }: ChatHeaderProps) => {
  return (
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
            {title}
          </h1>
          <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">
            {messageCount} message{messageCount === 1 ? "" : "s"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
