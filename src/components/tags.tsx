import { twMerge } from "tailwind-merge";

const TAG_COLOR_OPTIONS = [
    ["bg-green-200", "text-green-800"],
    ["bg-blue-200", "text-blue-800"],
    ["bg-indigo-200", "text-indigo-800"],
    ["bg-purple-200", "text-purple-800"],
];

export interface TagsProps {
    tags: string[];
}

export function Tags({ tags }: TagsProps) {
    return (
        <div class="flex gap-1 justify-center">
            {tags.map((tag, i) => {
                const className = twMerge(
                    "inline-block h-6 rounded-full px-2 text-xs font-semibold uppercase leading-6 tracking-wide",
                    TAG_COLOR_OPTIONS[i % 4],
                );
                return <span class={className}>{tag}</span>;
            })}
        </div>
    );
}
