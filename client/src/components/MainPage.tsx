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

const MainPage = () => {
	const user = useAppSelector((state) => state.user.data);
	const greetingName = user?.username ?? "friend";

	return (
		<section className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-background via-muted/35 to-background p-6 sm:p-10">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-secondary blur-3xl"
			/>

			<div className="relative mx-auto flex max-w-2xl flex-col gap-6">
				<Card className="ring-1 ring-primary/10">
					<CardHeader>
						<CardDescription>Welcome back</CardDescription>
						<CardTitle className="text-2xl sm:text-3xl">
							Hello, {greetingName}.
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							This is your main page. Keep building from here with reusable
							shadcn components and route-based pages.
						</p>
					</CardContent>
					<CardFooter className="gap-3 border-t">
						<Button size="sm">Start Chatting</Button>
						<Button variant="secondary" size="sm">
							Explore Features
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
};

export default MainPage;
