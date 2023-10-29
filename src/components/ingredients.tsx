import { Ingredient } from "../api/new";

function Item ({item}: {item: Ingredient}) {
    return <p class=" text-gray-500">{item.name} - {item.amount} {item.unit}</p>
}

export default function ingredients ({ingredients, seasonings}: {ingredients: Array<Ingredient>, seasonings: Array<Ingredient>}) {
    return (
        <div class="mt-6 space-y-8 min-w-fit">
            <div class="flex flex-col space-y-4 min-w-fit w-0 m-auto">
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
        </div>
    )
}