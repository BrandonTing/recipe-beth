import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipes = sqliteTable("recipes", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description").notNull(),
    estimatedTime: integer("estimated_time", { mode: "number" }).notNull(),
    imageUrl: text("image_url"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
});
export type Recipes = InferSelectModel<typeof recipes>;

export const steps = sqliteTable("steps", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    recipeID: text("recipe_id").references(() => recipes.id),
});

export type Step = InferInsertModel<typeof steps>;

export const ingredients = sqliteTable("ingredients", {
    name: text("name").notNull().primaryKey(),
    unit: text("unit").notNull(),
});

export type Ingredient = InferInsertModel<typeof ingredients>;

export const recipeIngredients = sqliteTable("recipe_ingredients", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name")
        .references(() => ingredients.name)
        .notNull(),
    recipeID: text("recipe_id")
        .references(() => recipes.id)
        .notNull(),
    amount: integer("amount", { mode: "number" }).notNull(),
});

export type RecipeIngredient = InferInsertModel<typeof recipeIngredients>;

export const tags = sqliteTable("tags", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    label: text("label").notNull(),
    recipeID: text("recipe_id")
        .references(() => recipes.id)
        .notNull(),
});

export type Tag = InferInsertModel<typeof tags>;

export const recipeRelations = relations(recipes, ({ many }) => ({
    ingredients: many(recipeIngredients),
    steps: many(steps),
    tags: many(tags),
}));

export const stepRelations = relations(steps, ({ one }) => ({
    recipe: one(recipes, {
        fields: [steps.recipeID],
        references: [recipes.id],
    }),
}));

export const ingredientRelations = relations(ingredients, ({ many }) => ({
    recipeIngredients: many(recipeIngredients),
}));

export const recipeIngredientRelations = relations(
    recipeIngredients,
    ({ one }) => ({
        recipe: one(recipes, {
            fields: [recipeIngredients.recipeID],
            references: [recipes.id],
        }),
        ingredient: one(ingredients, {
            fields: [recipeIngredients.name],
            references: [ingredients.name],
        }),
    }),
);

export const tagRelations = relations(tags, ({ one }) => ({
    recipe: one(recipes, {
        fields: [tags.recipeID],
        references: [recipes.id],
    }),
}));
