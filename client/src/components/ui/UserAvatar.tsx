import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  name?: string;
  alt?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  fallback?: string;
}

const UserAvatar = ({
  src,
  name = "User",
  alt,
  className,
  imageClassName,
  fallbackClassName,
  fallback,
  ...props
}: UserAvatarProps) => {
  const resolvedName = name?.trim() || "User";
  const fallbackText = fallback ?? resolvedName.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
        className,
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? `${resolvedName} avatar`}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center text-sm font-semibold uppercase",
            fallbackClassName,
          )}
        >
          {fallbackText}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
