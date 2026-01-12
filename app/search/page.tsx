import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import { backendFetch } from "@/lib/backend-fetch";
import type { IPaginationAPI } from "@/types/api/pagination";
import type { IWallpaperAPI } from "@/types/api/wallapers";

interface SearchPageProps {
    searchParams: Promise<{ q?: string; p?: string }>;
}

async function searchWallpapers(
    query: string,
    page: number,
): Promise<{
    wallpapers: IWallpaperAPI[];
    nextPage?: number;
    currentPage: number;
}> {
    const path = `/api/v1/wallpapers/search?page=${page}&limit=20&q=${query}`;
    const wallpapers = await backendFetch<IPaginationAPI<IWallpaperAPI>>(path);

    if (!wallpapers?.data) {
        return { wallpapers: [], currentPage: page };
    }

    const nextPage = wallpapers.links.next ? wallpapers.meta.current_page + 1 : undefined;

    return {
        wallpapers: wallpapers.data,
        currentPage: wallpapers.meta.current_page,
        nextPage,
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q, p } = await searchParams;

    const page = p || 1;
    const query = q || "";
    const { wallpapers, nextPage, currentPage } = await searchWallpapers(query, Math.max(Number(page), 1));

    return (
        <main className="container mx-auto px-4 py-8 flex-1">
            {/* Search Header */}
            <section className="mb-8">
                <h1 className="mb-4 text-balance text-3xl font-bold text-foreground">
                    {query ? `Search Results for "${query}"` : "Explore Wallpapers"}
                </h1>
                <p className="mb-6 text-muted-foreground">
                    {query
                        ? `Found ${nextPage ? `more than ${wallpapers.length}` : wallpapers.length} wallpaper${wallpapers.length !== 1 ? "s" : ""}`
                        : "Browse our entire collection of stunning wallpapers"}
                </p>

                <div className="max-w-[700px] mx-auto flex flex-col items-center">
                    {/* Search Input */}
                    <SearchInput initValue={query} />

                    {/* Category Filter */}
                    {/*<CategoryFilter />*/}
                </div>
            </section>

            {/* Results */}
            <section>
                {wallpapers.length > 0 ? (
                    <WallpaperGrid wallpapers={wallpapers} />
                ) : (
                    <div className="py-16 text-center">
                        <p className="text-lg text-muted-foreground">
                            No wallpapers found. Try a different search term.
                        </p>
                    </div>
                )}

                <div className="mt-10 flex gap-8 justify-center">
                    <Button disabled={currentPage <= 1}>
                        <Link href={`/search?q=${query}&p=${currentPage - 1}`}>
                            <span className="flex items-center">
                                <ChevronLeft />
                                Prev page
                            </span>
                        </Link>
                    </Button>

                    {nextPage && (
                        <Button asChild>
                            <Link href={`/search?q=${query}&p=${nextPage}`}>
                                <span className="flex items-center">
                                    Next page
                                    <ChevronRight />
                                </span>
                            </Link>
                        </Button>
                    )}
                </div>
            </section>
        </main>
    );
}
