"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IWallpaperAPI } from "@/types/api/wallapers";

interface DownlaodButtonProps {
	wallpaper: IWallpaperAPI;
}

export function DownlaodButton(props: DownlaodButtonProps) {
	const { wallpaper } = props;

	const handleDownload = () => {
		// TODO: send download event to backend

		const url = wallpaper.wallpaper.url;
		const link = document.createElement("a");
		link.href = url;
		link.download = wallpaper.wallpaper.url.split("/").pop() || "wallpaper.jpg";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<Button size="lg" className="flex-1 gap-2" onClick={handleDownload}>
			<Download className="h-4 w-4" />
			Download
		</Button>
	);
}
