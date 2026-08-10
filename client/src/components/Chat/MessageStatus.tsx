import { Mail, MailCheck, MailOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MessageStatusProps {
  status: string;
}

const MessageStatus = ({ status }: MessageStatusProps) => {
  const getStatusVisuals = (
    currentStatus: string,
  ): { icon: LucideIcon; label: string } | null => {
    switch (currentStatus) {
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

  const statusMeta = getStatusVisuals(status);

  if (!statusMeta) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[10px] font-medium tracking-wide backdrop-blur-sm">
      <statusMeta.icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{statusMeta.label}</span>
    </span>
  );
};

export default MessageStatus;