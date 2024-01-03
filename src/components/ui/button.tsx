import { PropsWithChildren } from "beth-stack/jsx";

export default function button({
    children,
    ...rest
}: PropsWithChildren & Htmx.Attributes & JSX.HtmlButtonTag) {
    return (
        <button
            {...rest}
            class="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
            {children}
        </button>
    );
}
