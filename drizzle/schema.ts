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

// ── Partners (individual consultants & professionals) ────────────────────────
export const partners = mysqlTable("partners", {
  id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  specialisation: varchar("specialisation", { length: 255 }),
  bio: text("bio"),
  email: varchar("email", { length: 255 }),
  linkedin: varchar("linkedin", { length: 500 }),
  photoUrl: varchar("photo_url", { length: 1000 }),
  displayOrder: bigint("display_order", { mode: "number" }).notNull().default(0),
  isVisible: boolean("is_visible").notNull().default(true),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type NewPartner = typeof partners.$inferInsert;

// ── Corporate Partners (organisations, licences, affiliations) ───────────────
export const corporatePartners = mysqlTable("corporate_partners", {
  id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["partner", "licence", "affiliation", "client"]).notNull().default("partner"),
  description: text("description"),
  website: varchar("website", { length: 500 }),
  logoUrl: varchar("logo_url", { length: 1000 }),
  country: varchar("country", { length: 100 }),
  displayOrder: bigint("display_order", { mode: "number" }).notNull().default(0),
  isVisible: boolean("is_visible").notNull().default(true),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
});

export type CorporatePartner = typeof corporatePartners.$inferSelect;
export type NewCorporatePartner = typeof corporatePartners.$inferInsert;

// ── Client portal access (owner-issued credentials and routing) ───────────────
export const clientAccounts = mysqlTable("client_accounts", {
  id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  portalUrl: varchar("portal_url", { length: 1000 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  failedAttempts: bigint("failed_attempts", { mode: "number" }).notNull().default(0),
  lockedUntil: bigint("locked_until", { mode: "number" }),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull(),
});

export type ClientAccount = typeof clientAccounts.$inferSelect;
export type NewClientAccount = typeof clientAccounts.$inferInsert;
