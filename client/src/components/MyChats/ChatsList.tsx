import type { Chat } from "@/types";
import { Link } from "react-router-dom";
import ChatCard from "./ChatCard";

interface ChatsListProps {
	chats: Chat[];
}

const ChatsList = ({ chats }: ChatsListProps) => {
	if (!chats.length) {
		return (
			<section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 via-background to-background p-6 sm:p-8">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -top-20 -right-12 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl"
				/>
				<div className="relative">
					<h2 className="font-heading text-xl font-semibold text-emerald-800 dark:text-emerald-300">
						No chats yet
					</h2>
					<p className="mt-2 max-w-xl text-sm text-muted-foreground">
						Start a conversation from the users page and your chats will appear
						here.
					</p>
					<Link
						to="/users"
						className="mt-4 inline-flex items-center rounded-lg border border-emerald-500/30 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
					>
						Find users
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="space-y-4">
			<header className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:bg-emerald-950/30">
				<h2 className="font-heading text-lg font-semibold text-emerald-900 dark:text-emerald-200">
					Your conversations
				</h2>
				<p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-300/80">
					{chats.length} active chat{chats.length === 1 ? "" : "s"}
				</p>
			</header>

			<ul className="grid list-none gap-3 p-0 sm:gap-4">
				{chats.map((chat, index) => (
					<ChatCard key={chat.id} chat={chat} index={index} />
				))}
			</ul>
		</section>
	);
};

export default ChatsList;
