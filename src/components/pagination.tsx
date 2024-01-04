import { PAGE_SIZE } from "../config";

interface PaginationProps {
    curPageCounts: number;
    page: number;
    total: number;
}

export function Pagination({ page, total, curPageCounts }: PaginationProps) {
    const lastPage = PAGE_SIZE * (page - 1);
    return (
        <div class="flex items-center justify-between w-full px-4 py-2">
            <p class="text-sm text-gray-500 dark:text-gray-400">
                Showing {lastPage + 1}-{lastPage + curPageCounts} of {total}{" "}
                results
            </p>
            <div class="flex items-center gap-2">
                <button
                    class="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                    disabled={page === 1}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-4 h-4"
                    >
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                    </svg>
                    <span class="sr-only">Previous page</span>
                </button>
                <button
                    class="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                    disabled={PAGE_SIZE * page > total}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-4 h-4"
                    >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                    <span class="sr-only">Next page</span>
                </button>
            </div>
        </div>
    );
}
