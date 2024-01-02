export type TagsProps = {
    tags: Array<string>
}

export function Tags ({tags}: TagsProps) {
    return (
        <>
            {   
                ["simple", "fast"].map(tag => (
                    <span class="h-6 leading-6 inline-block bg-green-200 text-green-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                        {tag}
                    </span>
                ))
            }
        </>
    )
}