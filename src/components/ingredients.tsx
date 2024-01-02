import type { Ingredient, RecipeIngredient } from "../db/schema"

type IngredientItem = RecipeIngredient & {
    ingredient: Ingredient
}
function Item ({item}: {item: IngredientItem}) {
    return <p class=" text-gray-500">{item.name} - {item.amount} {item.ingredient.unit}</p>
}

export default function ingredients ({ingredients, seasonings}: {ingredients: Array<IngredientItem>, seasonings: Array<IngredientItem>}) {
return (
        <div class="flex flex-col space-y-4 ">
            <section class="flex gap-6">
                <h2 class="text-xl font-bold w-40">主要原料：</h2>
                <div>
                    {
                        ingredients.map(ingredient => (
                            <Item item={ingredient} />
                        ))
                    }
                </div>
            </section>
            <section class="flex gap-6 mt-4">
                <h2 class="text-xl font-bold w-40">調味料：</h2>
                <div>
                    {
                        seasonings.map(seasoning => (
                            <Item item={seasoning} />
                        ))
                    }
                </div>
            </section>
        </div>
    )
}