import { Outlet } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { useAppSelector } from "@/store/hooks";
import AuthSync from "@/AuthSync";

const AppLayout = () => {
  const user = useAppSelector((state) => state.user.data);

  return (
    <AuthSync>
      <div className="min-h-screen bg-background text-foreground">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-500/20 bg-background/90 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <p className="font-heading text-base font-semibold tracking-wide text-emerald-600 sm:text-lg dark:text-emerald-400">
                Chat
              </p>
            </div>
            <div className="flex items-center gap-3">
              {user && (
                <div className="h-9 w-9 overflow-hidden rounded-full border border-emerald-500/30 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={`${user.username} avatar`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold uppercase">
                      {user.username.charAt(0)}
                    </div>
                  )}
                </div>
              )}
              <ThemeSwitch />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
          <Outlet />
        </main>
      </div>
    </AuthSync>
  );
};

export default AppLayout;
