import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockSendMail, mockVerify, mockCreateTransport } = vi.hoisted(() => ({
  mockSendMail: vi.fn(),
  mockVerify: vi.fn(),
  mockCreateTransport: vi.fn(),
}));

vi.mock("nodemailer", () => ({
  default: {
    createTransport: mockCreateTransport,
  },
}));

import {
  sendGmailWebsiteRequestNotification,
  verifyGmailSmtpConnection,
} from "./gmailNotification";

describe("Gmail website request notifications", () => {
  const request = {
    name: "Amina <Hassan>",
    email: "amina@example.com",
    subject: "Strategy enquiry",
    message: "Please contact <our team>.",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GMAIL_SMTP_APP_PASSWORD = "test app password";
    process.env.GMAIL_SMTP_USER = "darwishandcoeg@gmail.com";
    process.env.CONTACT_NOTIFICATION_EMAIL = "darwishandcoeg@gmail.com";
    process.env.CONTACT_NOTIFICATION_FORWARD_EMAIL = "info@darwish-co.com";
    mockCreateTransport.mockReturnValue({ verify: mockVerify, sendMail: mockSendMail });
  });

  it("verifies Gmail SMTP using the securely configured App Password", async () => {
    mockVerify.mockResolvedValue(true);

    await expect(verifyGmailSmtpConnection()).resolves.toBe(true);
    expect(mockCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: expect.objectContaining({ user: "darwishandcoeg@gmail.com" }),
      })
    );
    expect(mockVerify).toHaveBeenCalledOnce();
  });

  it("sends the request to the primary and forwarding inboxes with a reply-to address", async () => {
    mockSendMail.mockResolvedValue({ messageId: "gmail-message-123" });

    await expect(sendGmailWebsiteRequestNotification(request)).resolves.toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["darwishandcoeg@gmail.com", "info@darwish-co.com"],
        replyTo: "amina@example.com",
        subject: "[Website request] Strategy enquiry",
      })
    );
    expect(mockSendMail.mock.calls[0][0].html).toContain("Amina &lt;Hassan&gt;");
    expect(mockSendMail.mock.calls[0][0].html).toContain("&lt;our team&gt;");
  });

  it("uses the configured forwarding address from the environment", async () => {
    expect(process.env.CONTACT_NOTIFICATION_FORWARD_EMAIL).toBe("info@darwish-co.com");
  });
});
