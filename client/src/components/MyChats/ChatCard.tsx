import type { Chat } from "@/types";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/formatDate";

interface ChatCardProps {
	chat: Chat;
	index: number;
}

const ChatCard = ({ chat, index }: ChatCardProps) => {
	const chatName = chat.name?.trim() || `Conversation ${index + 1}`;

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

					<span className="shrink-0 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-emerald-700 transition-colors group-hover:bg-emerald-500/15 dark:text-emerald-300">
						Open
					</span>
				</div>

				<p className="mt-3 text-sm text-emerald-800/80 dark:text-emerald-200/80">
					Last activity:{" "}
					{formatDate(chat.updatedAt, {
						options: {
							year: "numeric",
							month: "short",
							day: "2-digit",
							hour: "2-digit",
							minute: "2-digit",
						},
					})}
				</p>
			</Link>
		</li>
	);
};

export default ChatCard;