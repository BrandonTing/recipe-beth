export interface TagsProps {
    tags: string[];
}

export function Tags({ tags }: TagsProps) {
    return (
        <>
            {tags.map((tag) => (
                <span class="inline-block h-6 rounded-full bg-green-200 px-2 text-xs font-semibold uppercase leading-6 tracking-wide text-green-800">
                    {tag}
                </span>
            ))}
        </>
    );
}
