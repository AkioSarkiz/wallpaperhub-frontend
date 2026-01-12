export function urljoin(...parts: string[]): string {
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].trim();

    return parts
        .map((part, index) => {
            let cleaned = part.trim();

            // Remove leading slash if not the first part
            if (index > 0 && cleaned.startsWith("/")) {
                cleaned = cleaned.slice(1);
            }

            // Remove trailing slash if not the last part
            if (index < parts.length - 1 && cleaned.endsWith("/")) {
                cleaned = cleaned.slice(0, -1);
            }

            return cleaned;
        })
        .filter((part) => part.length > 0) // Remove empty segments
        .join("/");
}
