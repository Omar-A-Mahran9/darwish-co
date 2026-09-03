CREATE TABLE `central_auth_codes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`client_account_id` bigint unsigned NOT NULL,
	`code_hash` varchar(64) NOT NULL,
	`portal_key` enum('darwish_hub','nabta_quest') NOT NULL,
	`expires_at` bigint NOT NULL,
	`used_at` bigint,
	`created_at` bigint NOT NULL,
	CONSTRAINT `central_auth_codes_id` PRIMARY KEY(`id`),
	CONSTRAINT `central_auth_codes_code_hash_unique` UNIQUE(`code_hash`)
);
--> statement-breakpoint
ALTER TABLE `client_accounts` ADD `portal_key` enum('darwish_hub','nabta_quest') DEFAULT 'darwish_hub' NOT NULL;--> statement-breakpoint
ALTER TABLE `client_accounts` ADD `portal_role` enum('owner','editor','viewer') DEFAULT 'viewer' NOT NULL;--> statement-breakpoint
ALTER TABLE `central_auth_codes` ADD CONSTRAINT `central_auth_codes_client_account_id_client_accounts_id_fk` FOREIGN KEY (`client_account_id`) REFERENCES `client_accounts`(`id`) ON DELETE cascade ON UPDATE no action;