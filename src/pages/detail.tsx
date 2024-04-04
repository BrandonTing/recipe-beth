import { eq } from "drizzle-orm";
import { Elysia, NotFoundError, t } from "elysia";
import { BaseHtml } from "../components/base";
import Ingredients from "../components/ingredients";
import Tabs from "../components/tabs";
import { Tags } from "../components/tags";
import Button from "../components/ui/button";
import { ctx } from "../context";
import { db } from "../db";
import { recipes } from "../db/schema";

export const detail = new Elysia().use(ctx).get(
    "/detail/:id",
    async ({ htmlStream, params: { id } }) => {
        const recipeDetail = await db.query.recipes.findFirst({
            where: eq(recipes.id, id),
            with: {
                ingredients: true,
                steps: true,
                tags: {
                    columns: {
                        label: true,
                    },
                },
            },
        });
        if (!recipeDetail) {
            throw new NotFoundError(
                "Target recipe does not exist! Please try again.",
            );
        }

        return htmlStream(() => (
            <BaseHtml>
                <div class="px-4">
                    <div class="flex items-center justify-center px-4 py-6 sm:px-0">
                        <h1 class="text-4xl font-bold w-full text-gray-900 text-center relative">
                            <a href="/" class="absolute left-0">
                                <Button>上一頁</Button>
                            </a>
                            {recipeDetail.title}
                        </h1>
                    </div>
                    <div class="mt-1 text-lg text-gray-500 text-center">
                        <Tags tags={recipeDetail.tags} />
                    </div>
                </div>
                <div id="contentContainer">
                    <Tabs activeType="ingredients" recipeId={id} />
                    <div class="pt-2 w-full">
                        <Ingredients ingredients={recipeDetail.ingredients} />
                    </div>
                </div>
            </BaseHtml>
        ));
    },
    {
        params: t.Object({
            id: t.String(),
        }),
    },
);
