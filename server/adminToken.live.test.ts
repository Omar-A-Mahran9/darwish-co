import { describe, expect, it } from "vitest";

const baseUrl = process.env.WEBSITE_BASE_URL || "http://localhost:3000";

describe("configured ADMIN_TOKEN", () => {
  it("authorizes the protected admin messages endpoint", async () => {
    const adminToken = process.env.ADMIN_TOKEN;

    expect(adminToken).toBeTruthy();

    const response = await fetch(`${baseUrl}/api/admin/messages`, {
      headers: { "x-admin-token": adminToken! },
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
  }, 15_000);
});
