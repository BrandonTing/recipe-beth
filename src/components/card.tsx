import { Recipes } from "../db/schema";
import Button from "../components/ui/button";

export default function Card ({recipe}: {recipe: Pick<Recipes, "title"|"description"|"id">}) {

    return (
        <div class="rounded overflow-hidden shadow-lg" id={`card_${recipe.id}`}>
            <img
                src="/public/placeholder.svg"
                width="400"
                height="200"
                alt="collection-cover"
                class="w-full h-[200px] object-cover"
                style="aspect-ratio: 400 / 200; object-fit: cover;"
            />
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{recipe.title}</div>
                <p class="text-base">{recipe.description}</p>
                <div class="mt-2 flex justify-between">
                    <div class="flex gap-1">
                        {
                            // FIXME add real tages
                            ["simple", "fast"].map(tag => (
                                <span class="h-6 leading-6 inline-block bg-green-200 text-green-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                                    {tag}
                                </span>
                            ))
                        }
                    </div>
                    <div class="flex gap-1 items-center" >
                        <a href={`/detail/${recipe.id}`}>
                            <Button>
                                Detail
                            </Button>
                        </a>
                        <div class="w-6">
                            <svg 
                                class="cursor-pointer"
                                hx-swap="none"
                                hx-post={`/api/recipe/remove/${recipe.id}`}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"/> </g> </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}