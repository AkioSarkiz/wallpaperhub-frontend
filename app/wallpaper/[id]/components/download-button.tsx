"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { backendFetch } from "@/lib/backend-fetch";
import type { IWallpaperAPI } from "@/types/api/wallapers";

interface DownlaodButtonProps {
  wallpaper: IWallpaperAPI;
}

export function DownlaodButton(props: DownlaodButtonProps) {
  const { wallpaper } = props;

  const handleDownload = () => {
    backendFetch(`/api/v1/tracks/wallpapers/${wallpaper.id}/download`, {
      method: "POST",
    }).catch((e) => {
      console.error(e);
    });

    const imageUrl = wallpaper.wallpaper.url;
    const filename =
      imageUrl.split("/").pop()?.split("?")[0] || "wallpaper.jpg";

    const proxyUrl = `/api/download-image?url=${encodeURIComponent(imageUrl)}`;

    const link = document.createElement("a");
    link.href = proxyUrl;
    link.download = filename;
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
