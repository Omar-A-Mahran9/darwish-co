import { describe, expect, it } from "vitest";
import { callbackPage, stateMatches } from "./cmsAuth.js";

describe("CMS GitHub sign-in", () => {
  it("hands the token over in Sveltia's message format, only to its own origin", () => {
    const html = callbackPage({ token: "gho_abc123" });
    expect(html).toContain('authorization:github:success:{\\"provider\\":\\"github\\",\\"token\\":\\"gho_abc123\\"}');
    expect(html).toContain("event.origin !== window.location.origin");
    expect(html).toContain('postMessage("authorizing:github", window.location.origin)');
    expect(html).not.toContain('"*"');
  });

  it("reports errors without letting their text break out of the page", () => {
    const html = callbackPage({ error: "</script><b>x", errorCode: "TOKEN_REQUEST_FAILED" });
    expect(html).toContain("authorization:github:error:");
    expect(html).not.toContain("</script><b>");
    expect(html).toContain("&lt;/script&gt;&lt;b&gt;x");
  });

  it("accepts only the state this browser was given", () => {
    expect(stateMatches("a1b2c3", "a1b2c3")).toBe(true);
    expect(stateMatches("a1b2c3", "a1b2c4")).toBe(false);
    expect(stateMatches(undefined, "a1b2c3")).toBe(false);
    expect(stateMatches("a1b2c3", undefined)).toBe(false);
    expect(stateMatches("a1b2c3", "a1b2")).toBe(false);
  });
});
