import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { contactSubmissions, type NewContactSubmission } from "../drizzle/schema.js";
import { desc, eq } from "drizzle-orm";

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});

const db = drizzle(pool, { mode: "default" });

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
