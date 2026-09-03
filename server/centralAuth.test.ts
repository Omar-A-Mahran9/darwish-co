import { describe, expect, it } from "vitest";
import {
  CENTRAL_AUTH_CODE_TTL_MS,
  generateAuthorizationCode,
  getCentralCallbackUrl,
  getPortalKeyForUrl,
  hashAuthorizationCode,
  isPortalRole,
} from "./centralAuth";

describe("central authorization helpers", () => {
  it("allows only the two registered client portal origins", () => {
    expect(getPortalKeyForUrl("https://darwishhub-rs8nk5xu.manus.space")).toBe("darwish_hub");
    expect(getPortalKeyForUrl("https://nabtaquest-fvgnftnq.manus.space/")).toBe("nabta_quest");
    expect(getPortalKeyForUrl("https://untrusted.example.com")).toBeNull();
  });

  it("creates an opaque code and binds the redirect to the expected portal callback", () => {
    const code = generateAuthorizationCode();
    expect(code).toHaveLength(43);
    expect(hashAuthorizationCode(code)).toMatch(/^[a-f0-9]{64}$/);
    expect(getCentralCallbackUrl("nabta_quest", code)).toBe(`https://nabtaquest-fvgnftnq.manus.space/central-auth/callback?code=${code}`);
  });

  it("recognizes the three supported access roles and a short-lived code window", () => {
    expect(isPortalRole("owner")).toBe(true);
    expect(isPortalRole("editor")).toBe(true);
    expect(isPortalRole("viewer")).toBe(true);
    expect(isPortalRole("admin")).toBe(false);
    expect(CENTRAL_AUTH_CODE_TTL_MS).toBe(2 * 60 * 1000);
  });
});
