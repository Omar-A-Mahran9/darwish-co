import { describe, expect, it } from "vitest";
import {
  sendGmailWebsiteRequestNotification,
  verifyGmailSmtpConnection,
} from "./gmailNotification";

describe.skipIf(process.env.RUN_LIVE_SMTP_VERIFY !== "1")("live Gmail SMTP verification", () => {
  it("authenticates with the configured Gmail App Password without sending an email", async () => {
    expect(process.env.GMAIL_SMTP_APP_PASSWORD).toBeTruthy();
    await expect(verifyGmailSmtpConnection()).resolves.toBe(true);
  }, 30_000);
});

describe.skipIf(process.env.RUN_LIVE_SMTP_SEND !== "1")("live Gmail request notification delivery", () => {
  it("delivers a Gmail notification to the configured request inbox", async () => {
    const sent = await sendGmailWebsiteRequestNotification({
      name: "Darwish & Co. Website",
      email: "darwishandcoeg@gmail.com",
      subject: "Gmail notification configuration test",
      message: "This confirms that website request notifications can be delivered through the configured Gmail SMTP account.",
    });

    expect(sent).toBe(true);
  }, 30_000);
});
