import { InferInsertModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipes = sqliteTable("recipes", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    estimatedTime: integer("estimatedTime", { mode: "number" }).notNull(),
    imageUrl: text("image_url")
})

export const steps = sqliteTable("steps", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    recipeID: integer("recipe_id").references(() => recipes.id)
})

export type Step = InferInsertModel<typeof steps>

export const ingredients = sqliteTable("ingredients", {
    name: text("name").notNull().primaryKey(),
    unit: text("unit").notNull()
})

export type Ingredient = InferInsertModel<typeof ingredients>

export const recipeIngredients = sqliteTable("recipe_ingredients", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name").references(() => ingredients.name).notNull(),
    recipeID: integer("recipe_id").references(() => recipes.id).notNull(),
    amount: integer("amount", { mode: "number" }).notNull()
})

export type RecipeIngredient = InferInsertModel<typeof recipeIngredients>

export const recipeRelations = relations(recipes, ({ many }) => ({
    ingredients: many(recipeIngredients),
    steps: many(steps)
}));

export const stepRelations = relations(steps, ({ one }) => ({
    recipe: one(recipes, {
        fields: [steps.recipeID],
        references: [recipes.id]
    })
}))

export const ingredientRelations = relations(ingredients, ({ many }) => ({
    recipeIngredients: many(recipeIngredients)
}))

export const recipeIngredientRelations = relations(recipeIngredients, ({ one }) => ({
    recipe: one(recipes, {
        fields: [recipeIngredients.recipeID],
        references: [recipes.id]
    }),
    ingredient: one(ingredients, {
        fields: [recipeIngredients.name],
        references: [ingredients.name]
    })
}))
