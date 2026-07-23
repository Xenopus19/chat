import { Outlet } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

const AppLayout = () => {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-500/20 bg-background/90 backdrop-blur">
				<div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
					<div className="flex items-center gap-2">
						<div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
						<p className="font-heading text-base font-semibold tracking-wide text-emerald-600 sm:text-lg dark:text-emerald-400">
							Chat
						</p>
					</div>
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
