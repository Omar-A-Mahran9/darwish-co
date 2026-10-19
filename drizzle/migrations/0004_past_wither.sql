ALTER TABLE `client_accounts` MODIFY COLUMN `portal_key` enum('darwish_hub','nabta_quest','training_server') NOT NULL DEFAULT 'darwish_hub';
--> statement-breakpoint
ALTER TABLE `central_auth_codes` MODIFY COLUMN `portal_key` enum('darwish_hub','nabta_quest','training_server') NOT NULL;
