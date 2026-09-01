CREATE TABLE `client_accounts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`client_name` varchar(255) NOT NULL,
	`username` varchar(64) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`portal_url` varchar(1000) NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`failed_attempts` bigint NOT NULL DEFAULT 0,
	`locked_until` bigint,
	`created_at` bigint NOT NULL,
	`updated_at` bigint NOT NULL,
	CONSTRAINT `client_accounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `client_accounts_username_unique` UNIQUE(`username`)
);
