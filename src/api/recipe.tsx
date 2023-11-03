import Elysia, { t } from "elysia";
import { Recipe } from "../schema";
import Card from "../components/card";

export const recipe = new Elysia({
    prefix: "/recipe"
})
    .get('/', async function ({query: {keyword}}) {
        const filteredRecipes = [
            {
              name: "test",
              ingredients: ["chicken", "tofu"],
              seasonings: ["miso"],
              referenceLinks: ["https://www.youtube.com/watch?v=IhN7AAOX2eg"],
              tags: ["simple"],
              estimatedTime: 30,
              description: "some description..."
            },
          ] satisfies Array<Recipe>;
      
        return (
            <>
                {
                    filteredRecipes.map(recipe => (
                        <Card recipe={recipe}/>
                        ))
                }
            </>
        )
    },   
    {
        query: t.Object({
            keyword: t.String(),
        }),
    },
)
.get('/advanced', async function () {
    return (
        <div id="advancedSearchModal" class="fixed flex items-center justify-center w-screen h-screen left-0 top-0 ">
            <div class="bg-white shadow-lg opacity-100 p-5 ">
                <div class="flex items-start justify-between">
                    <h2 class="text-2xl font-semibold">Advanced Search</h2>
                    <button
                        hx-get="/api/recipe/closeAdvance"
                        hx-target="#advancedSearchModal"
                        hx-swap="delete"
                        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class=" h-6 w-6"
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div>
                    <form class="grid gap-4">
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                            <label
                                class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                                for="field1Key"
                            >
                                Field 1 Key
                            </label>
                            <button
                                type="button"
                                role="combobox"
                                aria-controls="radix-:rl:"
                                aria-expanded="false"
                                aria-autocomplete="none"
                                dir="ltr"
                                data-state="closed"
                                data-placeholder=""
                                class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span style="pointer-events: none;">Select field 1 key</span>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="h-4 w-4 opacity-50"
                                aria-hidden="true"
                                >
                                <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </button>
                            <select
                                aria-hidden="true"
                                tabindex="-1"
                                style="position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;"
                            >
                                <option value=""></option>
                                <option value="key1">Key 1</option>
                                <option value="key2">Key 2</option>
                                <option value="key3">Key 3</option>
                            </select>
                            </div>
                            <div>
                            <label
                                class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                                for="field1Value"
                            >
                                Field 1 Value
                            </label>
                            <input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="field1Value"
                                placeholder="Enter field 1 value"
                            />
                            </div>
                        </div>
                        <div class="grid gap-2">
                            <label class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base" for="field2">
                            Field 2
                            </label>
                            <input
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="field2"
                            placeholder="Enter field 2"
                            />
                        </div>
                        <div class="grid gap-2">
                            <label class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base" for="field3">
                            Field 3
                            </label>
                            <input
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="field3"
                            placeholder="Enter field 3"
                            />
                        </div>
                        <div class="grid gap-2">
                            <label class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base" for="field4">
                            Field 4
                            </label>
                            <button
                            type="button"
                            role="combobox"
                            aria-controls="radix-:rq:"
                            aria-expanded="false"
                            aria-autocomplete="none"
                            dir="ltr"
                            data-state="closed"
                            data-placeholder=""
                            class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                            <span style="pointer-events: none;">Select multiple values</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="h-4 w-4 opacity-50"
                                aria-hidden="true"
                            >
                                <path d="m6 9 6 6 6-6"></path>
                            </svg>
                            </button>
                            <select
                            aria-hidden="true"
                            tabindex="-1"
                            style="position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;"
                            >
                            <option value=""></option>
                            <option value="value1">Value 1</option>
                            <option value="value2">Value 2</option>
                            <option value="value3">Value 3</option>
                            </select>
                        </div>
                        <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 self-start">
                            Add more fields
                        </button>
                    </form>
                </div>
            </div>
      </div>
    )
})
.get('/closeAdvance', async () => {
    return ""
})