import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { useAppSelector } from "@/store/hooks";
import AuthSync from "@/components/AuthSync";
import { Button } from "./ui/button";
import useLogout from "@/hooks/useLogout";
import Message from "./Message";

const AppLayout = () => {
  const user = useAppSelector((state) => state.user.data);
  const logout = useLogout();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setIsUserMenuOpen(false);
    }
  }, [user]);

  return (
    <AuthSync>
      <div className="min-h-screen bg-background text-foreground">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-500/20 bg-background/90 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <p className="font-heading text-base font-semibold tracking-wide text-emerald-600 sm:text-lg dark:text-emerald-400">
                Chat
              </p>
            </Link>
            <div className="flex items-center gap-3">
              {user && (
                <div ref={userMenuRef} className="relative">
                  <button
                    type="button"
                    className="h-9 w-9 overflow-hidden rounded-full border border-emerald-500/30 bg-emerald-100 text-emerald-700 transition hover:border-emerald-500/60 dark:bg-emerald-900/40 dark:text-emerald-200"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    aria-haspopup="menu"
                    aria-expanded={isUserMenuOpen}
                    aria-label="Open user menu"
                  >
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
                  </button>

                  {isUserMenuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-12 z-50 w-44 rounded-2xl border border-emerald-500/20 bg-background/95 p-2 shadow-lg backdrop-blur"
                    >
                      <p className="mb-2 block truncate px-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                        {user.username}
                      </p>
                      <Link
                        to="/chats"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
                        >
                          My chats
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/40"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              )}
              <ThemeSwitch />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
          <Message />
          <Outlet />
        </main>
      </div>
    </AuthSync>
  );
};

export default AppLayout;
