import type { IWallpaperAPI } from "@/types/api/wallapers";
import type { ISrcSet } from "@/types/blurhash-image";

type ImageFormat = "avif" | "webp" | "jpg";
type IndexKey = "0" | "1" | "2";

const ALLOWED_FORMATS: Set<string> = new Set(["avif", "webp", "jpg"]);
const ALLOWED_INDICES: Set<number> = new Set([0, 1, 2]);

export function generateSrcSet(
    wallpaper: IWallpaperAPI,
    field: "wallpaper_thumbnails" | "wallpaper_previews" = "wallpaper_thumbnails",
): ISrcSet {
    const thumbnails = wallpaper[field];

    if (!thumbnails || thumbnails.length === 0) {
        return {};
    }

    return thumbnails.reduce((acc: ISrcSet, thumbnail) => {
        const { format, index, url } = thumbnail;

        if (ALLOWED_FORMATS.has(format) && ALLOWED_INDICES.has(index)) {
            const formatKey = format as ImageFormat;
            const indexKey = String(index) as IndexKey;

            // @ts-expect-error
            acc[formatKey] = acc[formatKey] || {};
            // biome-ignore lint/style/noNonNullAssertion: it's okay,
            acc[formatKey]![indexKey] = url;
        }

        return acc;
    }, {});
}
