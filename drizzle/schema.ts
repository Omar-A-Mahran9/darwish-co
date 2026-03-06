import { mysqlTable, varchar, text, bigint, boolean, mysqlEnum } from "drizzle-orm/mysql-core";

export const contactSubmissions = mysqlTable("contact_submissions", {
  id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
