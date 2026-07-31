import { useState } from "react";
import { SendHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageFieldProps {
	onSendMessage: (message: string) => void;
	isSending?: boolean;
}

const MessageField = ({ onSendMessage, isSending = false }: MessageFieldProps) => {
	const [message, setMessage] = useState("");

	const submitMessage = () => {
		const trimmed = message.trim();

		if (!trimmed) {
			return;
		}

		onSendMessage(trimmed);
		setMessage("");
	};

	return (
		<section className="rounded-2xl border border-emerald-500/20 bg-linear-to-br from-white via-emerald-50/30 to-white p-4 shadow-sm dark:from-emerald-950/20 dark:via-emerald-900/15 dark:to-emerald-950/20">
			<label
				htmlFor="message-input"
				className="mb-2 block text-xs font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-300"
			>
				New message
			</label>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-end">
				<Textarea
					id="message-input"
					value={message}
					onChange={(event) => setMessage(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							submitMessage();
						}
					}}
					placeholder="Type your message..."
					className="min-h-20 border-emerald-400/30 bg-white/90 text-emerald-950 placeholder:text-emerald-700/60 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:border-emerald-600/30 dark:bg-emerald-950/30 dark:text-emerald-100 dark:placeholder:text-emerald-300/50"
				/>

				<Button
					type="button"
					onClick={submitMessage}
					disabled={isSending || !message.trim()}
					className="h-10 w-full bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 sm:w-auto"
				>
					<SendHorizontalIcon className="size-4" />
					Send
				</Button>
			</div>
		</section>
	);
};

export default MessageField;
