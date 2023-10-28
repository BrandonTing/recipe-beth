import { Recipe } from "../schema";

export default function Card ({recipe}: {recipe: Pick<Recipe, "name"|"description"|"tags">}) {
    return (
        <a href="#">
            <div class="rounded overflow-hidden shadow-lg">
                <img
                    src="/public/placeholder.svg"
                    width="400"
                    height="200"
                    alt="collection-cover"
                    class="w-full h-[200px] object-cover"
                    style="aspect-ratio: 400 / 200; object-fit: cover;"
                />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{recipe.name}</div>
                    <p class="text-base">{recipe.description}</p>
                    <div class="mt-2">
                        {
                            recipe.tags.map(tag => (
                                <span class="inline-block bg-green-200 text-green-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                    {tag}
                                </span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </a>
    )
}