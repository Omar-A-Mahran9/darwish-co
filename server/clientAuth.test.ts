import { describe, expect, it } from "vitest";
import {
  CLIENT_LOCKOUT_MS,
  hashClientPassword,
  MAX_CLIENT_LOGIN_ATTEMPTS,
  normalizeUsername,
  validateClientCredential,
  validateClientPassword,
  validateClientUsername,
  validatePortalUrl,
  verifyClientPassword,
} from "./clientAuth";

describe("client credential security", () => {
  it("normalizes usernames and enforces the supported username format", () => {
    expect(normalizeUsername("  Acme.Client  ")).toBe("acme.client");
    expect(validateClientUsername("acme.client")).toBeNull();
    expect(validateClientUsername("ab")).toContain("3–64");
    expect(validateClientUsername("Acme Client")).toContain("lowercase");
  });

  it("requires an adequate issued password", () => {
    expect(validateClientPassword("strong-password-2026")).toBeNull();
    expect(validateClientPassword("too-short")).toContain("12–128");
  });

  it("allows a six-digit PIN only for Training Server accounts", async () => {
    expect(validateClientCredential("012345", "training_server")).toBeNull();
    expect(validateClientCredential("12345", "training_server")).toContain("exactly six");
    expect(validateClientCredential("12345a", "training_server")).toContain("exactly six");
    expect(validateClientCredential("012345", "darwish_hub")).toContain("12–128");

    const hash = await hashClientPassword("012345", "training_server");
    await expect(verifyClientPassword("012345", hash)).resolves.toBe(true);
  });

  it("uses a salted password hash that verifies only the issued password", async () => {
    const hash = await hashClientPassword("strong-password-2026");

    expect(hash).toMatch(/^scrypt\$/);
    await expect(verifyClientPassword("strong-password-2026", hash)).resolves.toBe(true);
    await expect(verifyClientPassword("incorrect-password", hash)).resolves.toBe(false);
    await expect(verifyClientPassword("strong-password-2026", "invalid-hash")).resolves.toBe(false);
  });

  it("accepts only HTTPS portal addresses", () => {
    expect(validatePortalUrl("https://client.example.com/portal")).toBeNull();
    expect(validatePortalUrl("http://client.example.com/portal")).toContain("HTTPS");
    expect(validatePortalUrl("not a url")).toContain("valid HTTPS");
  });

  it("uses a five-attempt, fifteen-minute account lockout policy", () => {
    expect(MAX_CLIENT_LOGIN_ATTEMPTS).toBe(5);
    expect(CLIENT_LOCKOUT_MS).toBe(15 * 60 * 1000);
  });
});
