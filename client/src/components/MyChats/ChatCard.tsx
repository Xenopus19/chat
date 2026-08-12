import type { ChatWithStatistics } from "@/types";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/formatDate";

interface ChatCardProps {
	chat: ChatWithStatistics;
	index: number;
}

const ChatCard = ({ chat, index }: ChatCardProps) => {
	const chatName = chat.name?.trim() || `Conversation ${index + 1}`;
	const lastMessageText = chat.lastMessage?.text?.trim();
	const hasUnreadMessages = chat.unreadCount > 0;

	return (
		<li>
			<Link
				to={`/chats/${chat.id}`}
				className="group block overflow-hidden rounded-2xl border border-emerald-500/20 bg-linear-to-r from-white to-emerald-50/70 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md dark:from-emerald-950/20 dark:to-emerald-900/20"
			>
				<div className="flex items-start justify-between gap-4">
					<div className="min-w-0">
						<p className="truncate font-heading text-base font-semibold text-emerald-950 dark:text-emerald-100">
							{chatName}
						</p>
						<p className="mt-1 text-xs text-muted-foreground">
							Created{" "}
							{formatDate(chat.createdAt, {
								options: {
									year: "numeric",
									month: "short",
									day: "2-digit",
									hour: "2-digit",
									minute: "2-digit",
								},
							})}
						</p>
					</div>

					{hasUnreadMessages ? (
						<span className="shrink-0 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-emerald-700 transition-colors group-hover:bg-emerald-500/15 dark:text-emerald-300">
							{chat.unreadCount} unread
						</span>
					) : (
						<span className="shrink-0 rounded-full border border-slate-300/70 bg-slate-100 px-2.5 py-1 text-xs font-medium tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
							All caught up
						</span>
					)}
				</div>

				<div className="mt-3 flex items-center justify-between gap-3">
					<p className="min-w-0 flex-1 text-sm text-emerald-800/80 dark:text-emerald-200/80">
						<span className="font-medium text-emerald-950 dark:text-emerald-50">Last message:</span>{" "}
						<span className="line-clamp-2 break-words">{lastMessageText || "No messages yet"}</span>
					</p>
					{chat.lastMessage && (
						<p className="shrink-0 text-[11px] text-muted-foreground">
							{formatDate(chat.lastMessage.createdAt, {
								options: {
									year: "numeric",
									month: "short",
									day: "2-digit",
									hour: "2-digit",
									minute: "2-digit",
								},
							})}
						</p>
					)}
				</div>
			</Link>
		</li>
	);
};

export default ChatCard;