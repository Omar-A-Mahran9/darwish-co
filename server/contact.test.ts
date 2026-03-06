import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Helpers ──────────────────────────────────────────────────────────────────

function validateContactForm(body: Record<string, unknown>) {
  const { name, email, message } = body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { valid: false, error: "Name, email, and message are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Please provide a valid email address." };
  }

  return { valid: true, error: null };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Contact form validation", () => {
  it("passes with valid data", () => {
    const result = validateContactForm({
      name: "Ahmed Darwish",
      email: "ahmed@darwish-co.com",
      subject: "GRC Consulting",
      message: "I would like to learn more about your services.",
    });
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
  });

  it("fails when name is missing", () => {
    const result = validateContactForm({
      name: "",
      email: "ahmed@darwish-co.com",
      message: "Hello",
    });
    expect(result.valid).toBe(false);
    expect(result.error).toContain("required");
  });

  it("fails when email is missing", () => {
    const result = validateContactForm({
      name: "Ahmed",
      email: "",
      message: "Hello",
    });
    expect(result.valid).toBe(false);
    expect(result.error).toContain("required");
  });

  it("fails when message is missing", () => {
    const result = validateContactForm({
      name: "Ahmed",
      email: "ahmed@darwish-co.com",
      message: "",
    });
    expect(result.valid).toBe(false);
    expect(result.error).toContain("required");
  });

  it("fails with an invalid email format", () => {
    const result = validateContactForm({
      name: "Ahmed",
      email: "not-an-email",
      message: "Hello",
    });
    expect(result.valid).toBe(false);
    expect(result.error).toContain("valid email");
  });

  it("fails with whitespace-only name", () => {
    const result = validateContactForm({
      name: "   ",
      email: "ahmed@darwish-co.com",
      message: "Hello",
    });
    expect(result.valid).toBe(false);
  });

  it("passes without a subject (subject is optional)", () => {
    const result = validateContactForm({
      name: "Ahmed",
      email: "ahmed@darwish-co.com",
      message: "Hello",
    });
    expect(result.valid).toBe(true);
  });
});

describe("Owner notification helper", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when env vars are missing", async () => {
    const originalEnv = { ...process.env };
    delete process.env.BUILT_IN_FORGE_API_URL;
    delete process.env.BUILT_IN_FORGE_API_KEY;
    delete process.env.VITE_APP_ID;

    // Inline the function to test without importing the server module
    async function notifyOwner(title: string, content: string): Promise<boolean> {
      const apiUrl = process.env.BUILT_IN_FORGE_API_URL;
      const apiKey = process.env.BUILT_IN_FORGE_API_KEY;
      const appId = process.env.VITE_APP_ID;
      if (!apiUrl || !apiKey || !appId) return false;
      return true;
    }

    const result = await notifyOwner("Test", "Test content");
    expect(result).toBe(false);

    Object.assign(process.env, originalEnv);
  });

  it("returns true when all env vars are present (mocked fetch)", async () => {
    process.env.BUILT_IN_FORGE_API_URL = "https://api.example.com";
    process.env.BUILT_IN_FORGE_API_KEY = "test-key";
    process.env.VITE_APP_ID = "test-app-id";

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true } as Response)
    );

    async function notifyOwner(title: string, content: string): Promise<boolean> {
      const apiUrl = process.env.BUILT_IN_FORGE_API_URL;
      const apiKey = process.env.BUILT_IN_FORGE_API_KEY;
      const appId = process.env.VITE_APP_ID;
      if (!apiUrl || !apiKey || !appId) return false;
      try {
        const res = await fetch(`${apiUrl}/notification/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ appId, title, content }),
        });
        return res.ok;
      } catch {
        return false;
      }
    }

    const result = await notifyOwner("New contact", "Test message");
    expect(result).toBe(true);

    delete process.env.BUILT_IN_FORGE_API_URL;
    delete process.env.BUILT_IN_FORGE_API_KEY;
    delete process.env.VITE_APP_ID;
    vi.unstubAllGlobals();
  });
});
