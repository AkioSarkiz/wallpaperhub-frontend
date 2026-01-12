import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import { backendFetch } from "@/lib/backend-fetch";
import type { IWallpaperAPI } from "@/types/api/wallapers";

export default async function HomePage() {
    const wallpapersData = await backendFetch<{ data: IWallpaperAPI[] }>("api/v1/wallpapers?limit=10");

    return (
        <main className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="mb-12 text-center">
                <h1 className="mb-4 mt-20 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    Discover Stunning Wallpapers
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
                    Browse thousands of high-quality wallpapers for your desktop, mobile, and tablet. Free to download
                    and use.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button size="lg" className="gap-2" asChild>
                        <Link href="/search">
                            <Sparkles className="h-4 w-4" />
                            Explore Collection
                        </Link>
                    </Button>
                    {/*<Button size="lg" variant="outline" className="gap-2 bg-transparent">
            <TrendingUp className="h-4 w-4" />
            Trending Now
          </Button>*/}
                </div>
            </section>

            {/* Category Filter */}
            {/*<section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Browse by Category</h2>
          <CategoryFilter />
        </section>*/}

            {/* Featured Wallpapers */}
            <section className="mb-12">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-foreground">Featured Wallpapers</h2>
                    <Button variant="ghost" asChild>
                        <Link href="/search">View All</Link>
                    </Button>
                </div>
                {wallpapersData && <WallpaperGrid wallpapers={wallpapersData.data} />}
            </section>
        </main>
    );
}
