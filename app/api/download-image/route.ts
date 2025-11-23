import { NextResponse } from "next/server";

const accaptableUrlHosts: string[] = ["fsn1.your-objectstorage.com"];

function isAccaptableUrl(url: string) {
  try {
    const urlObj = new URL(url);

    return accaptableUrlHosts.includes(urlObj.host);
  } catch (_error) {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl || !isAccaptableUrl(imageUrl)) {
    return new NextResponse("Missing url parameter or invalid origin", {
      status: 422,
    });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Next.js Image Downloader)",
      },
    });

    if (!response.ok) {
      return new NextResponse("Failed to fetch image", { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();

    let filename = imageUrl.split("/").pop()?.split("?")[0] || "wallpaper.jpg";

    if (!filename.includes(".")) {
      filename = "wallpaper.jpg";
    }

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Access-Control-Expose-Headers": "Content-Disposition",
      },
    });
  } catch (error) {
    console.error("Proxy download error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
