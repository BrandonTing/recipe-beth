CREATE TABLE `recipe_tags` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`recipe_id` text NOT NULL,
	FOREIGN KEY (`label`) REFERENCES `tags`(`label`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`label` text PRIMARY KEY NOT NULL
);
