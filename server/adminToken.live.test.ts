import { describe, expect, it } from "vitest";

const baseUrl = process.env.WEBSITE_BASE_URL || "http://localhost:3000";

// Calls a running server with the real admin token, so it runs only when asked:
//   RUN_LIVE_ADMIN_CHECK=1 ADMIN_TOKEN=… WEBSITE_BASE_URL=… pnpm test
describe.skipIf(process.env.RUN_LIVE_ADMIN_CHECK !== "1")("configured ADMIN_TOKEN", () => {
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
