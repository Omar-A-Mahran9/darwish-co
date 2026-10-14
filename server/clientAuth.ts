import { promisify } from "node:util";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import type { PortalKey } from "./centralAuth.js";

const scryptAsync = promisify(scrypt);
const PASSWORD_KEY_LENGTH = 64;

export const MAX_CLIENT_LOGIN_ATTEMPTS = 5;
export const CLIENT_LOCKOUT_MS = 15 * 60 * 1000;

export function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

export function validateClientUsername(value: string): string | null {
  return /^[a-z0-9][a-z0-9._-]{2,63}$/.test(value)
    ? null
    : "Username must use 3–64 lowercase letters, numbers, dots, underscores, or hyphens.";
}

export function validateClientPassword(value: string): string | null {
  return value.length >= 12 && value.length <= 128
    ? null
    : "Password must contain 12–128 characters.";
}

/**
 * Training Server uses a client-requested six-digit access PIN. All other
 * portals retain the stronger standard password policy.
 */
export function validateClientCredential(value: string, portalKey?: PortalKey): string | null {
  if (portalKey === "training_server") {
    return /^\d{6}$/.test(value)
      ? null
      : "Training Server access code must contain exactly six numeric digits.";
  }
  return validateClientPassword(value);
}

export function validatePortalUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? null : "Portal URL must use HTTPS.";
  } catch {
    return "Portal URL must be a valid HTTPS address.";
  }
}

export async function hashClientPassword(password: string, portalKey?: PortalKey): Promise<string> {
  const validationError = validateClientCredential(password, portalKey);
  if (validationError) throw new Error(validationError);

  const salt = randomBytes(16).toString("hex");
  const key = (await scryptAsync(password, salt, PASSWORD_KEY_LENGTH)) as Buffer;
  return `scrypt$${salt}$${key.toString("hex")}`;
}

export async function verifyClientPassword(password: string, encodedHash: string): Promise<boolean> {
  const [algorithm, salt, storedKey] = encodedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !storedKey) return false;

  try {
    const derivedKey = (await scryptAsync(password, salt, PASSWORD_KEY_LENGTH)) as Buffer;
    const expectedKey = Buffer.from(storedKey, "hex");
    return expectedKey.length === derivedKey.length && timingSafeEqual(expectedKey, derivedKey);
  } catch {
    return false;
  }
}
