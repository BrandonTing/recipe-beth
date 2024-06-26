import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipes = sqliteTable("recipes", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    imageUrl: text("image_url").default(""),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
});
export type Recipes = InferSelectModel<typeof recipes>;

export const steps = sqliteTable("steps", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    description: text("description").notNull(),
    recipeID: text("recipe_id").references(() => recipes.id),
});

export type Step = InferInsertModel<typeof steps>;

export const recipeIngredients = sqliteTable("recipe_ingredients", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    type: text("type", {
        enum: ["Ingredient", "Seasoning"],
    })
        .notNull()
        .default("Ingredient"),
    recipeID: text("recipe_id")
        .references(() => recipes.id)
        .notNull(),
    amount: integer("amount", { mode: "number" }).notNull(),
});

export type RecipeIngredient = InferInsertModel<typeof recipeIngredients>;

export const tags = sqliteTable("tags", {
    label: text("label").primaryKey().notNull(),
});

export type Tag = InferInsertModel<typeof tags>;

export const recipeTags = sqliteTable("recipe_tags", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    label: text("label")
        .references(() => tags.label)
        .notNull(),
    recipeID: text("recipe_id")
        .references(() => recipes.id)
        .notNull(),
});

export type RecipeTags = InferInsertModel<typeof recipeTags>;

export const recipeRelations = relations(recipes, ({ many }) => ({
    ingredients: many(recipeIngredients),
    steps: many(steps),
    tags: many(recipeTags),
}));

export const stepRelations = relations(steps, ({ one }) => ({
    recipe: one(recipes, {
        fields: [steps.recipeID],
        references: [recipes.id],
    }),
}));

export const recipeIngredientRelations = relations(
    recipeIngredients,
    ({ one }) => ({
        recipe: one(recipes, {
            fields: [recipeIngredients.recipeID],
            references: [recipes.id],
        }),
    }),
);

export const tagRelations = relations(tags, ({ many }) => ({
    recipeTags: many(recipeTags),
}));

export const recipeTagsRelations = relations(recipeTags, ({ one }) => ({
    recipe: one(recipes, {
        fields: [recipeTags.recipeID],
        references: [recipes.id],
    }),
    ingredient: one(tags, {
        fields: [recipeTags.label],
        references: [tags.label],
    }),
}));
