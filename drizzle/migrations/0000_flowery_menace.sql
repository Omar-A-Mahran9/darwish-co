CREATE TABLE `contact_submissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`subject` varchar(500),
	`message` text NOT NULL,
	`is_read` boolean NOT NULL DEFAULT false,
	`created_at` bigint NOT NULL,
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
