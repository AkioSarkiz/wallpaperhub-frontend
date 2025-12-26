import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import type React from "react";
import { Header } from "@/components/header";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "WallpaperHub - Premium Wallpapers",
	description: "Discover and download stunning wallpapers for your devices",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({
	children,
}: Readonly<RootLayoutProps>) {
	return (
		<html lang="en" className={geist.className}>
			<body className={`font-sans antialiased`}>
				<NextTopLoader showSpinner={false} />

				<div className="min-h-screen bg-background flex flex-col justify-between">
					<Header />

					{children}

					<footer className="mt-16 border-t border-border bg-muted/30 py-8">
						<div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
							<p>© 2025 WallpaperHub. All rights reserved.</p>
						</div>
					</footer>
				</div>
			</body>
		</html>
	);
}
