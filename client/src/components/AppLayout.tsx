import { Outlet } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

const AppLayout = () => {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
				<div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
					<p className="font-heading text-base font-semibold tracking-wide sm:text-lg">
						Chat Haven
					</p>
					<ThemeSwitch />
				</div>
			</header>

			<main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
				<Outlet />
			</main>
		</div>
	);
};

export default AppLayout;
