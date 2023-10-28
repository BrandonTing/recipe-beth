import { z } from "zod";

export const recipeSchema = z.object({
    name: z.string(),
    estimatedTime: z.number().describe("minutes estimated to finish this recipe"),
    description: z.string(),
    ingredients: z.array(z.string()),
    seasonings: z.array(z.string()),
    referenceLinks: z.array(z.string().refine(val => {
        try {
            return Boolean(new URL(val));
        }
        catch (e) {
            return false;
        }
    })),
    tags: z.array(z.string()),
})

export type Recipe = z.infer<typeof recipeSchema>