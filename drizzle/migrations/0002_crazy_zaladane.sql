
ALTER TABLE recipe_ingredients ADD `type` text DEFAULT 'Ingredient' NOT NULL;--> statement-breakpoint
ALTER TABLE `recipes` DROP COLUMN `description`;--> statement-breakpoint
ALTER TABLE `recipes` DROP COLUMN `estimated_time`;--> statement-breakpoint
ALTER TABLE `steps` DROP COLUMN `description`;--> statement-breakpoint
ALTER TABLE `steps` DROP COLUMN `image_url`;