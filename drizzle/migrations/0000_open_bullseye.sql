CREATE TABLE `ingredients` (
	`name` text PRIMARY KEY NOT NULL,
	`unit` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recipe_ingredients` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text DEFAULT 'Ingredient' NOT NULL, 
	`recipe_id` text NOT NULL,
	`amount` integer NOT NULL,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`estimated_time` integer NOT NULL,
	`image_url` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `steps` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text,
	`recipe_id` text,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
