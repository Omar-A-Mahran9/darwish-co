import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import {
  contactSubmissions,
  partners,
  corporatePartners,
  clientAccounts,
  centralAuthCodes,
  type NewContactSubmission,
  type NewPartner,
  type NewCorporatePartner,
  type NewClientAccount,
} from "../drizzle/schema.js";
import { and, asc, desc, eq, gt, isNull } from "drizzle-orm";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing. Check the server .env file.");
}

const parsedDatabaseUrl = new URL(databaseUrl);

if (parsedDatabaseUrl.protocol !== "mysql:") {
  throw new Error("DATABASE_URL must use the mysql:// protocol.");
}

const databaseName = decodeURIComponent(
  parsedDatabaseUrl.pathname.replace(/^\/+/, "")
);

if (!parsedDatabaseUrl.username || !databaseName) {
  throw new Error("DATABASE_URL must include a username and database name.");
}

const pool = mysql.createPool({
  host: parsedDatabaseUrl.hostname,
  port: Number(parsedDatabaseUrl.port || 3306),
  user: decodeURIComponent(parsedDatabaseUrl.username),
  password: decodeURIComponent(parsedDatabaseUrl.password),
  database: databaseName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = drizzle(pool, { mode: "default" });

// ── Contact Submissions ──────────────────────────────────────────────────────

export async function saveContactSubmission(data: NewContactSubmission) {
  await db.insert(contactSubmissions).values(data);
}

export async function getAllContactSubmissions() {
  return db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function markSubmissionAsRead(id: number) {
  await db
    .update(contactSubmissions)
    .set({ isRead: true })
    .where(eq(contactSubmissions.id, id));
}

export async function deleteSubmission(id: number) {
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}

export async function getUnreadCount() {
  const rows = await db
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.isRead, false));
  return rows.length;
}

// ── Partners (individual consultants) ────────────────────────────────────────

export async function getAllPartners() {
  return db
    .select()
    .from(partners)
    .where(eq(partners.isVisible, true))
    .orderBy(asc(partners.displayOrder), asc(partners.id));
}

export async function getAllPartnersAdmin() {
  return db
    .select()
    .from(partners)
    .orderBy(asc(partners.displayOrder), asc(partners.id));
}

export async function insertPartner(data: NewPartner) {
  await db.insert(partners).values(data);
}

export async function updatePartner(id: number, data: Partial<NewPartner>) {
  await db.update(partners).set(data).where(eq(partners.id, id));
}

export async function deletePartner(id: number) {
  await db.delete(partners).where(eq(partners.id, id));
}

// ── Corporate Partners (organisations, licences) ─────────────────────────────

export async function getAllCorporatePartners() {
  return db
    .select()
    .from(corporatePartners)
    .where(eq(corporatePartners.isVisible, true))
    .orderBy(asc(corporatePartners.displayOrder), asc(corporatePartners.id));
}

export async function getAllCorporatePartnersAdmin() {
  return db
    .select()
    .from(corporatePartners)
    .orderBy(asc(corporatePartners.displayOrder), asc(corporatePartners.id));
}

export async function insertCorporatePartner(data: NewCorporatePartner) {
