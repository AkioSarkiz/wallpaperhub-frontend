export interface IPaginationAPI<T> {
    data: T[];
    links: {
        first: string;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        current_page_url: string;
        from: number;
        path: string;
        per_page: number;
        to: number;
    };
}
