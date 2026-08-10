import { useEffect, useRef } from "react";
import type { Message } from "@/types";
import ChatMessage from "./ChatMessage";

interface MessageListProps {
	messageHistory: Message[];
	currentUserId?: string;
	otherUserAvatarUrl?: string | null;
	otherUserName?: string;
}

const MessageList = ({
	messageHistory,
	currentUserId,
	otherUserAvatarUrl,
	otherUserName,
}: MessageListProps) => {
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
						<ChatMessage
							key={message.id}
							message={message}
							isOwnMessage={isOwnMessage}
							otherUserAvatarUrl={otherUserAvatarUrl}
							otherUserName={otherUserName}
						/>
					);
				})}
			</ul>
		</section>
	);
};

export default MessageList;
