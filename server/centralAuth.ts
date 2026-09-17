import { createHash, randomBytes } from "node:crypto";

export const PORTAL_KEYS = ["darwish_hub", "nabta_quest", "training_server"] as const;
export type PortalKey = (typeof PORTAL_KEYS)[number];

export const PORTAL_ROLES = ["owner", "editor", "viewer"] as const;
export type PortalRole = (typeof PORTAL_ROLES)[number];

export const PORTAL_CONFIG: Record<PortalKey, { url: string; callbackPath: string; label: string }> = {
  darwish_hub: {
    url: "https://darwishhub-rs8nk5xu.manus.space",
    callbackPath: "/central-auth/callback",
    label: "Darwish Hub",
  },
  nabta_quest: {
    url: "https://nabtaquest-fvgnftnq.manus.space",
    callbackPath: "/central-auth/callback",
    label: "Nabta Quest",
  },
  training_server: {
    url: "https://trainingsrv-jpszljho.manus.space",
    callbackPath: "/central-auth/callback",
    label: "Training Server",
  },
};

export const CENTRAL_AUTH_CODE_TTL_MS = 2 * 60 * 1000;

export function isPortalKey(value: unknown): value is PortalKey {
  return typeof value === "string" && (PORTAL_KEYS as readonly string[]).includes(value);
}

export function isPortalRole(value: unknown): value is PortalRole {
  return typeof value === "string" && (PORTAL_ROLES as readonly string[]).includes(value);
}

export function getPortalKeyForUrl(value: string): PortalKey | null {
  try {
    const origin = new URL(value).origin.toLowerCase();
    return PORTAL_KEYS.find(key => new URL(PORTAL_CONFIG[key].url).origin.toLowerCase() === origin) ?? null;
  } catch {
    return null;
  }
}

export function getCentralCallbackUrl(portalKey: PortalKey, code: string): string {
  const portal = PORTAL_CONFIG[portalKey];
  const callback = new URL(portal.callbackPath, portal.url);
  callback.searchParams.set("code", code);
  return callback.toString();
}

export function generateAuthorizationCode(): string {
  return randomBytes(32).toString("base64url");
}

export function hashAuthorizationCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}
