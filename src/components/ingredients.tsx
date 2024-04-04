import type { RecipeIngredient } from "../db/schema";

type IngredientItem = RecipeIngredient;
function Item({ item }: { item: IngredientItem }) {
    return (
        <p class=" text-gray-500">
            {item.name} - {item.amount}
        </p>
    );
}

export default function ingredients({
    ingredients,
    seasonings,
}: {
    ingredients: IngredientItem[];
    seasonings: IngredientItem[];
}) {
    return (
        <div class="flex flex-col space-y-4 ">
            <section class="flex gap-6">
                <h2 class="w-40 text-xl font-bold">主要原料：</h2>
                <div>
                    {ingredients.map((ingredient) => (
                        <Item item={ingredient} />
                    ))}
                </div>
            </section>
            <section class="mt-4 flex gap-6">
                <h2 class="w-40 text-xl font-bold">調味料：</h2>
                <div>
                    {seasonings.map((seasoning) => (
                        <Item item={seasoning} />
                    ))}
                </div>
            </section>
        </div>
    );
}
