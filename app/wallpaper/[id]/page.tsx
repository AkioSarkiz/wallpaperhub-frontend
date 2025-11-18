import { Download, Eye, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { BlurhashImage } from "@/components/blurhash-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { backendFetchOne } from "@/lib/backend-fetch";
import { generateSrcSet } from "@/lib/blurhash-image";
import { formatFileSize } from "@/lib/utils";
import type { IWallpaperAPI } from "@/types/api/wallapers";
import { DownlaodButton } from "./components/download-button";

interface WallpaperPageProps {
  params: Promise<{ id: string }>;
}

export default async function WallpaperPage({ params }: WallpaperPageProps) {
  const { id } = await params;

  const wallpaper = await backendFetchOne<IWallpaperAPI>(
    `/api/v1/wallpapers/${id}`,
  );

  if (!wallpaper) {
    notFound();
  }

  const previewSrcSet = generateSrcSet(wallpaper, "wallpaper_previews");

  // const relatedWallpapers = getWallpapers()
  // 	.filter((w) => w.category === wallpaper.category && w.id !== wallpaper.id)
  // 	.slice(0, 4);

  const isPreviewSrcSetFull =
    Object.keys(previewSrcSet.avif || {}).length >= 3 &&
    Object.keys(previewSrcSet.webp || {}).length >= 3 &&
    Object.keys(previewSrcSet.jpg || {}).length >= 3;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-lg bg-muted">
          <BlurhashImage
            blurhash={wallpaper.wallpaper.metadata.placeholder_blurhash}
            src={wallpaper.wallpaper.url || "/placeholder.svg"}
            alt={wallpaper.title}
            className="h-full w-full object-cover"
            width={100000}
            height={100000}
            srcSet={isPreviewSrcSetFull ? previewSrcSet : undefined}
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="mb-2 text-balance text-3xl font-bold text-foreground">
              {wallpaper.title}
            </h1>
            <p className="text-muted-foreground">
              by{" "}
              <span className="font-medium text-foreground">
                {wallpaper.user.name}
              </span>
            </p>
          </div>

          <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
            {wallpaper.description}
          </p>

          {/* Stats */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Download className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {wallpaper.total_downloads} downloads
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {wallpaper.total_views} views
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-foreground">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {wallpaper.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.title}
                </Badge>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-8 rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium text-card-foreground">
              Specifications
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resolution</span>
                <span className="font-medium text-card-foreground">
                  {wallpaper.wallpaper.metadata.height}x
                  {wallpaper.wallpaper.metadata.width}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">File Size</span>
                <span className="font-medium text-card-foreground">
                  {formatFileSize(wallpaper.wallpaper.metadata.size)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <DownlaodButton wallpaper={wallpaper} />
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Related Wallpapers */}
      {/*{relatedWallpapers.length > 0 && (
				<section className="mt-16">
					<h2 className="mb-6 text-2xl font-semibold text-foreground">
						Related Wallpapers
					</h2>
					<WallpaperGrid wallpapers={relatedWallpapers} />
				</section>
			)}*/}
    </main>
  );
}
