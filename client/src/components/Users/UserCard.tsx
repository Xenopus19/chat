import { useState } from "react";
import type { User } from "@/types";
import { Button } from "../ui/button";

interface UserCardProps {
  user: User;
}

const formatDate = (value: string) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
};

const Field = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl border border-emerald-100 bg-white p-3 shadow-sm">
      <p className="text-[11px] font-semibold tracking-wide text-emerald-700 uppercase">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-emerald-950 wrap-break-word">
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

  return (
    <article className="overflow-hidden rounded-2xl border border-emerald-200 bg-linear-to-b from-emerald-50 to-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center gap-3 border-b border-emerald-100 px-4 py-3">
        {avatar ? (
          <img
            src={avatar}
            alt={`${name} avatar`}
            width={42}
            height={42}
            className="h-11 w-11 rounded-full border-2 border-emerald-300 object-cover"
          />
        ) : (
          <div className="grid h-11 w-11 place-items-center rounded-full border-2 border-emerald-300 bg-emerald-600 text-sm font-bold text-white">
            {initials || "U"}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-emerald-950">{name}</p>
          <p className="text-xs text-emerald-700">
            Member since {formatDate(user.createdAt)}
          </p>
        </div>

        <Button
          type="button"
          variant={open ? "outline" : "default"}
          size="sm"
          onClick={() => setOpen((v) => !v)}
          className={open ? "border-emerald-300 text-emerald-900" : "bg-emerald-600 text-white hover:bg-emerald-700"}
        >
          {open ? "Close" : "Details"}
        </Button>
      </div>

      {open && (
        <div className="space-y-4 px-4 py-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Username" value={user.username} />
            <Field label="User ID" value={user.id} />
            <Field label="Birthdate" value={formatDate(user.birthdate)} />
            <Field label="Updated" value={formatDate(user.updatedAt)} />
          </div>

          <div className="rounded-xl border border-emerald-100 bg-white p-3">
            <p className="text-[11px] font-semibold tracking-wide text-emerald-700 uppercase">
              About
            </p>
            <p className="mt-1 text-sm leading-relaxed text-emerald-950">
              {user.description || "-"}
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="default"
              size="sm"
              className="bg-emerald-700 text-white hover:bg-emerald-800"
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