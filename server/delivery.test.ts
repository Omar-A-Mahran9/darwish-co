import { describe, expect, it } from "vitest";
import { SECURITY_HEADERS, cacheControlFor, pickEncoding } from "./delivery.js";

describe("file delivery", () => {
  it("prefers brotli, then gzip, and respects q=0", () => {
    const both = { br: true, gz: true };
    expect(pickEncoding("gzip, deflate, br, zstd", both)).toBe("br");
    expect(pickEncoding("gzip, deflate", both)).toBe("gzip");
    expect(pickEncoding("br;q=0, gzip;q=0.8", both)).toBe("gzip");
    expect(pickEncoding("br", { br: false, gz: true })).toBe(null);
    expect(pickEncoding(undefined, both)).toBe(null);
    expect(pickEncoding("identity", both)).toBe(null);
  });

  it("caches hashed build files for a year and media for a week", () => {
    expect(cacheControlFor("/assets/index-BCGERIlz.js")).toBe("public, max-age=31536000, immutable");
    expect(cacheControlFor("/media/hero.mp4")).toBe("public, max-age=604800");
    expect(cacheControlFor("/images/logo.png")).toBe("public, max-age=604800");
    expect(cacheControlFor("/sitemap.xml")).toBe(null);
    expect(cacheControlFor("/cms/config.yml")).toBe(null);
  });

  it("sends HSTS without committing other subdomains", () => {
    expect(SECURITY_HEADERS["Strict-Transport-Security"]).toBe("max-age=31536000");
    expect(SECURITY_HEADERS["X-Content-Type-Options"]).toBe("nosniff");
  });
});
