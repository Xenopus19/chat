import { useState } from "react";
import type { User } from "@/types";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { createOrGetChat } from "@/services/chatService";
import { useMutation } from "@tanstack/react-query";
import { formatDate } from "@/utils/formatDate";

interface UserCardProps {
  user: User;
}

const Field = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl border border-emerald-100 bg-white p-3 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/40">
      <p className="text-[11px] font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-300">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-emerald-950 wrap-break-word dark:text-emerald-100">
        {value || "-"}
      </p>
    </div>
  );
};

const UserCard = ({ user }: UserCardProps) => {
  const [open, setOpen] = useState(false);
  const name = user.username || "Unknown User";
  const avatar = user.avatarUrl ?? "";
  const initials = name.slice(0, 2).toUpperCase();
  const navigate = useNavigate();
  const getChatIdMutation = useMutation({ mutationFn: createOrGetChat });

  const goToChat = async () => {
    try {
      const chat = await getChatIdMutation.mutateAsync(user.id);
      navigate(`/chats/${chat.id}`);
    } catch (error) {
      console.error("Failed to get or create chat:", error);
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-emerald-200 bg-linear-to-b from-emerald-50 to-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-emerald-800/60 dark:from-emerald-950/40 dark:to-emerald-900/20 dark:hover:shadow-emerald-950/30">
      <div className="flex items-center gap-3 border-b border-emerald-100 px-4 py-3 dark:border-emerald-800/50">
        {avatar ? (
          <img
            src={avatar}
            alt={`${name} avatar`}
            width={42}
            height={42}
            className="h-11 w-11 rounded-full border-2 border-emerald-300 object-cover dark:border-emerald-500/60"
          />
        ) : (
          <div className="grid h-11 w-11 place-items-center rounded-full border-2 border-emerald-300 bg-emerald-600 text-sm font-bold text-white dark:border-emerald-500/70 dark:bg-emerald-700">
            {initials || "U"}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-emerald-950 dark:text-emerald-100">
            {name}
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-300/90">
            Member since {formatDate(user.createdAt, { fallback: "-" })}
          </p>
        </div>

        <Button
          type="button"
          variant={open ? "outline" : "default"}
          size="sm"
          onClick={() => setOpen((v) => !v)}
          className={
            open
              ? "border-emerald-300 text-emerald-900 dark:border-emerald-600 dark:text-emerald-200 dark:hover:bg-emerald-900/50"
              : "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          }
        >
          {open ? "Close" : "Details"}
        </Button>
      </div>

      {open && (
        <div className="space-y-4 px-4 py-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Username" value={user.username} />
            <Field
              label="Birthdate"
              value={formatDate(user.birthdate, { fallback: "-" })}
            />
          </div>

          <div className="rounded-xl border border-emerald-100 bg-white p-3 dark:border-emerald-800/60 dark:bg-emerald-950/40">
            <p className="text-[11px] font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-300">
              About
            </p>
            <p className="mt-1 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100">
              {user.description || "-"}
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={goToChat}
              type="button"
              variant="default"
              size="sm"
              className="bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              Message
            </Button>
          </div>
        </div>
      )}
    </article>
  );
};

export default UserCard;
