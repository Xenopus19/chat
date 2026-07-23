import { useAppSelector } from "@/store/hooks";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";

const MainPage = () => {
  const user = useAppSelector((state) => state.user.data);
  const greeting = user?.username ? `Welcome, ${user.username}` : "Welcome";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-background to-background p-6 sm:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col gap-6">
        <Card className="border-emerald-500/20 bg-background/80 ring-1 ring-emerald-500/20 shadow-[0_0_0_1px_rgba(16,185,129,0.05)]">
          <CardHeader>
            <CardDescription>Chat with users across the world</CardDescription>
            <CardTitle className="text-2xl text-emerald-700 sm:text-3xl dark:text-emerald-400">
              {greeting}.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Connect, share, and engage with users globally in a comfortable
              and user-friendly environment.
            </p>
          </CardContent>
          <CardFooter className="gap-3 border-t border-emerald-500/15">
            <Link to="/signup">
              <Button
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="secondary"
                size="sm"
                className="border-emerald-500/20 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300"
              >
                Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default MainPage;
