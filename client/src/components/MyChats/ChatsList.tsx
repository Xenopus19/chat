import type { Chat } from "@/types";
import { Link } from "react-router-dom";

interface ChatsListProps {
	chats: Chat[];
}

const formatDate = (value: string) => {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return "Unknown date";
	}

	return new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);
};

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
				{chats.map((chat, index) => {
					const chatName = chat.name?.trim() || `Conversation ${index + 1}`;

					return (
						<li key={chat.id}>
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
											Created {formatDate(chat.createdAt)}
										</p>
									</div>

									<span className="shrink-0 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-emerald-700 transition-colors group-hover:bg-emerald-500/15 dark:text-emerald-300">
										Open
									</span>
								</div>

								<p className="mt-3 text-sm text-emerald-800/80 dark:text-emerald-200/80">
									Last activity: {formatDate(chat.updatedAt)}
								</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default ChatsList;
