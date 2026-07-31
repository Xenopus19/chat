import { useEffect, useRef } from "react";
import type { Message } from "@/types";
import { formatDate } from "@/utils/formatDate";

interface MessageListProps {
	messageHistory: Message[];
	currentUserId?: string;
}

const MessageList = ({ messageHistory, currentUserId }: MessageListProps) => {
	const listRef = useRef<HTMLUListElement | null>(null);

	useEffect(() => {
		if (!listRef.current) {
			return;
		}

		listRef.current.scrollTo({
			top: listRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, [messageHistory]);

	if (!messageHistory.length) {
		return (
			<section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-linear-to-br from-emerald-50/60 via-white to-white p-6 dark:from-emerald-950/20 dark:via-emerald-900/10 dark:to-emerald-950/20">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -top-12 -right-8 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl"
				/>
				<h2 className="relative font-heading text-lg font-semibold text-emerald-900 dark:text-emerald-200">
					No messages yet
				</h2>
				<p className="relative mt-1 text-sm text-emerald-700/80 dark:text-emerald-300/80">
					Start the conversation by sending your first message.
				</p>
			</section>
		);
	}

	return (
		<section className="rounded-2xl border border-emerald-500/20 bg-white/80 p-4 shadow-sm dark:bg-emerald-950/15">
			<ul
				ref={listRef}
				className="max-h-[55vh] list-none space-y-3 overflow-y-auto p-0 pr-1"
			>
				{messageHistory.map((message) => {
					const isOwnMessage = currentUserId === message.userId;

					return (
						<li
							key={message.id}
							className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
						>
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
				})}
			</ul>
		</section>
	);
};

export default MessageList;
