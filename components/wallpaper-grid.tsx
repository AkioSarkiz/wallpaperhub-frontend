import type { IWallpaperAPI } from "@/types/api/wallapers";
import { WallpaperCard } from "./wallpaper-card";

interface WallpaperGridProps {
    wallpapers: IWallpaperAPI[];
}

export function WallpaperGrid(props: WallpaperGridProps) {
    const { wallpapers } = props;

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {wallpapers.map((wallpaper) => (
                <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
            ))}
        </div>
    );
}
