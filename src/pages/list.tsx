import { desc } from "drizzle-orm";
import { Elysia } from "elysia";
import { BaseHtml } from "../components/base";
import Table from "../components/table";
import Button from "../components/ui/button";
import { ctx } from "../context";
import { db } from "../db";
import { recipes as receipeSchema } from "../db/schema";

export const list = new Elysia().use(ctx).get("/", async ({ htmlStream }) => {
    const recipes = await db.query.recipes.findMany({
        orderBy: [desc(receipeSchema.createdAt)],
        // FIXME add pagination
        limit: 10,
        columns: {
            id: true,
            title: true,
            description: true,
            estimatedTime: true,
        },
    });
    return htmlStream(() => (
        <BaseHtml>
            <main class="flex-1 px-4 py-8">
                <div class="mb-4 flex items-center justify-between">
                    <h1 class="text-3xl font-bold">Collections</h1>
                    <div class="flex gap-2">
                        <div class="w-64">
                            <input
                                name="keyword"
                                placeholder="Search recipes..."
                                class="w-full rounded border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                type="text"
                            />
                        </div>
                        <Button
                            hx-get="/api/recipe"
                            hx-include="input[name='keyword']"
                            hx-target="#tableContainer"
                            hx-swap="innerHTML"
                            hx-indicator="#listLoading"
                        >
                            Search
                        </Button>

                        <Button
                            hx-get="/api/recipe/advanced"
                            hx-target="this"
                            hx-swap="afterend"
                        >
                            Advanced Search
                        </Button>
                        <a href="/new">
                            <Button>Add New</Button>
                        </a>
                    </div>
                </div>
                <p id="listLoading" class="hidden [&.htmx-request]:block">
                    loading...
                </p>
                <Table recipes={recipes} />
            </main>
        </BaseHtml>
    ));
});
