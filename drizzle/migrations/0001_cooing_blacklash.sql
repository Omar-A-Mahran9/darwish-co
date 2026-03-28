CREATE TABLE `corporate_partners` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('partner','licence','affiliation','client') NOT NULL DEFAULT 'partner',
	`description` text,
	`website` varchar(500),
	`logo_url` varchar(1000),
	`country` varchar(100),
	`display_order` bigint NOT NULL DEFAULT 0,
	`is_visible` boolean NOT NULL DEFAULT true,
	`created_at` bigint NOT NULL,
	CONSTRAINT `corporate_partners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partners` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`specialisation` varchar(255),
	`bio` text,
	`email` varchar(255),
	`linkedin` varchar(500),
	`photo_url` varchar(1000),
	`display_order` bigint NOT NULL DEFAULT 0,
	`is_visible` boolean NOT NULL DEFAULT true,
	`created_at` bigint NOT NULL,
	CONSTRAINT `partners_id` PRIMARY KEY(`id`)
);
