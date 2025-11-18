import Link from "next/link";
import { generateSrcSet } from "@/lib/blurhash-image";
import type { IWallpaperAPI } from "@/types/api/wallapers";
import { BlurhashImage } from "./blurhash-image";

interface WallpaperCardProps {
	wallpaper: IWallpaperAPI;
}

export function WallpaperCard(props: WallpaperCardProps) {
	const { wallpaper } = props;
	const previewSrcSet = generateSrcSet(wallpaper);

	return (
		<Link
			href={`/wallpaper/${wallpaper.id}`}
			className="group relative block overflow-hidden rounded-lg"
		>
			<div className="relative aspect-video overflow-hidden bg-muted">
				<BlurhashImage
					blurhash={wallpaper.wallpaper.metadata.placeholder_blurhash}
					width={300}
					height={200}
					src={wallpaper.wallpaper.url}
					alt={wallpaper.title}
					srcSet={previewSrcSet}
					className="rounded-lg h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
		</Link>
	);
}
