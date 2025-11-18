import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/6">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-8">
					<Link href="/" className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
							<span className="text-lg font-bold text-primary-foreground">
								W
							</span>
						</div>
						<span className="text-xl font-semibold text-foreground">
							WallpaperHub
						</span>
					</Link>

					<nav className="hidden items-center gap-6 md:flex">
						<Link
							href="/"
							className="text-sm font-medium text-foreground transition-colors hover:text-accent"
						>
							Home
						</Link>
						<Link
							href="/search"
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
						>
							Explore
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" className="md:hidden">
						<Search className="h-5 w-5" />
					</Button>

					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</header>
	);
}
