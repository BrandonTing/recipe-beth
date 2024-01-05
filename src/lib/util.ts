import { desc, eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { Recipes, recipeIngredients, recipes } from "../db/schema";
import { PAGE_SIZE } from "../config";

export function getEstimatedTimeText(estimatedTime: number): string {
    const hour =
        estimatedTime >= 60 ? `${Math.floor(estimatedTime / 60)}小時 ` : "";
    return `${hour}${estimatedTime % 60} 分鐘`;
}

export async function getRecipesFilteredByIngredients(
    filters: Map<string, number>,
): Promise<{
    recipes: {
        id: string;
        title: string;
        description: string;
        estimatedTime: number;
        tags: {
            label: string;
        }[];
    }[];
    count: number;
}> {
    const rawdRecipes = await db
        .select({
            id: recipes.id,
            recipe_ingredients: recipeIngredients,
        })
        .from(recipes)
        .leftJoin(recipeIngredients, eq(recipeIngredients.recipeID, recipes.id))
        .where(inArray(recipeIngredients.name, [...filters.keys()]));

    const filteredRecipesMap = new Map<
        string,
        Pick<Recipes, "id"> & {
            ingredients: Record<string, number>;
        }
    >();
    rawdRecipes.forEach((recipe) => {
        if (recipe.recipe_ingredients) {
            if (filteredRecipesMap.has(recipe.id)) {
                const { id, ingredients } = filteredRecipesMap.get(recipe.id)!;
                filteredRecipesMap.set(recipe.id, {
                    id,
                    ingredients: {
                        ...ingredients,
                        [recipe.recipe_ingredients?.name]:
                            recipe.recipe_ingredients?.amount,
                    },
                });
            } else {
                const { id } = recipe;
                filteredRecipesMap.set(id, {
                    id,
                    ingredients: {
                        [recipe.recipe_ingredients?.name]:
                            recipe.recipe_ingredients?.amount,
                    },
                });
            }
        }
    });

    const filteredRecipes = [...filteredRecipesMap.values()].filter(
        (recipe) => {
            let valid = true;
            const { ingredients } = recipe;
            filters.forEach((value, key) => {
                const targetIngredient = ingredients[key];
                // 沒有完整條件或數量不足
                if (!targetIngredient) {
                    valid = false;
                } else if (targetIngredient > value) {
                    valid = false;
                }
            });
            return valid;
        },
    );

    const count = filteredRecipes.length;

    const recipesToRender =
        count > 0
            ? await db.query.recipes.findMany({
                  orderBy: [desc(recipes.createdAt)],
                  limit: PAGE_SIZE,
                  offset: 0,
                  where: inArray(
                      recipes.id,
                      filteredRecipes.map((recipe) => recipe.id),
                  ),
                  columns: {
                      id: true,
                      title: true,
                      description: true,
                      estimatedTime: true,
                  },
                  with: {
                      tags: {
                          columns: {
                              label: true,
                          },
                      },
                  },
              })
            : [];

    return {
        recipes: recipesToRender,
        count,
    };
}
