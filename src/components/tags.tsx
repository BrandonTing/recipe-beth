export interface TagsProps {
    tags: string[];
}

export function Tags({ tags }: TagsProps) {
    return (
        <div class="flex gap-1 justify-center">
            {tags.map((tag) => (
                <span class="inline-block h-6 rounded-full bg-green-200 px-2 text-xs font-semibold uppercase leading-6 tracking-wide text-green-800">
                    {tag}
                </span>
            ))}
        </div>
    );
}
