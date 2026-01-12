import { urljoin } from "@/utils/url";

export async function backendFetchOne<T>(path: string, options?: RequestInit): Promise<T | null> {
    const data = await backendFetch<T>(path, options);

    if (data) {
        // @ts-expect-error
        return Object.hasOwn(data, "data") ? (data.data as T) : null;
    }

    return null;
}

export async function backendFetch<T>(path: string, options?: RequestInit): Promise<T | null> {
    const url = urljoin(String(process.env.NEXT_PUBLIC_BACKEND_URL), path);

    const response = await fetch(url, {
        ...options,
        headers: {
            Accept: "application/json",
            ...options?.headers,
        },
        cache: "no-store",
    });

    if (response.ok) {
        return response.json() as T;
    }

    return null;
}
