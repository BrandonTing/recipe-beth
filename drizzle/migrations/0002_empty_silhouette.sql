ALTER TABLE `recipes` RENAME COLUMN `estimatedTime` TO `estimated_time`;--> statement-breakpoint
ALTER TABLE recipes ADD `created_at` integer NOT NULL;