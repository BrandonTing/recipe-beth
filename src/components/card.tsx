import Button from "../components/ui/button";
import { Recipes } from "../db/schema";
import { getEstimatedTimeText } from "../lib/util";
import { getDownloadPath } from "../storage";

export default function Card({
    recipe,
}: {
    recipe: Pick<Recipes, "id" | "title" | "estimatedTime" | "imageUrl"> & {
        tags: { label: string }[] | null;
    };
}) {
    const imageUrl = recipe.imageUrl
        ? getDownloadPath(recipe.imageUrl)
        : "/public/placeholder.svg";
    return (
        <div class="overflow-hidden rounded shadow-lg" id={`card_${recipe.id}`}>
            <img
                src={imageUrl}
                width="400"
                height="200"
                alt="collection-cover"
                class="h-[200px] w-full object-cover"
                style="aspect-ratio: 400 / 200; object-fit: cover;"
            />
            <div class="px-6 py-4">
                <div class="mb-2 text-xl font-bold">{recipe.title}</div>
                <p class="text-base">
                    {getEstimatedTimeText(recipe.estimatedTime)}
                </p>
                <div class="mt-2 flex justify-between">
                    <div class="flex gap-1">
                        {recipe.tags?.length && recipe.tags?.length > 0
                            ? recipe.tags
                                  ?.filter((tag) => tag.label !== "")
                                  .map((tag) => (
                                      <span class="inline-block h-6 rounded-full bg-green-200 px-2 text-xs font-semibold uppercase leading-6 tracking-wide text-green-800">
                                          {tag.label}
                                      </span>
                                  ))
                            : null}
                    </div>
                    <div class="flex items-center gap-1">
                        <a href={`/detail/${recipe.id}`}>
                            <Button>Detail</Button>
                        </a>
                        <div class="w-6">
                            <svg
                                class="cursor-pointer"
                                hx-swap="none"
                                hx-post={`/api/recipe/remove/${recipe.id}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                hx-vals={`{"image": "${recipe.imageUrl}"}`}
                            >
                                {" "}
                                <g>
                                    {" "}
                                    <path fill="none" d="M0 0h24v24H0z" />{" "}
                                    <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />{" "}
                                </g>{" "}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
