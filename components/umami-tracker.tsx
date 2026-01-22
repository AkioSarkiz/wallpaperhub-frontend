import Script from "next/script";

export function UmamiTracker() {
  const umamiUrl = String(process.env.NEXT_PUBLIC_UMAMI_URL);
  const umamiWebsiteId = String(process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID);

  if (process.env.NODE_ENV !== "production") {
    return;
  }

  return <Script defer src={umamiUrl} data-website-id={umamiWebsiteId} />;
}
