import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockedSend } = vi.hoisted(() => ({ mockedSend: vi.fn() }));

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockedSend },
  })),
}));

import { sendContactEmailNotification } from "./contactNotification";

describe("website request email notifications", () => {
  const request = {
    name: "Ahmed <Darwish>",
    email: "ahmed@example.com",
    subject: "GRC & risk\nassessment",
    message: "Please share a proposal for <our organisation>.",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("skips delivery when no email provider credential is available", async () => {
    const sent = await sendContactEmailNotification(request, {
      apiKey: "",
      recipient: "info@darwish-co.com",
    });

    expect(sent).toBe(false);
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it("emails the configured Darwish & Co. recipient with a reply-to address", async () => {
    mockedSend.mockResolvedValue({ data: { id: "email_123" }, error: null });

    const sent = await sendContactEmailNotification(request, {
      apiKey: "test-resend-key",
      recipient: "info@darwish-co.com",
      from: "Darwish & Co. Website <requests@example.com>",
    });

    expect(sent).toBe(true);
    expect(mockedSend).toHaveBeenCalledTimes(1);
    expect(mockedSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["info@darwish-co.com"],
        replyTo: "ahmed@example.com",
        subject: "[Website request] GRC & risk assessment",
      })
    );

    const emailPayload = mockedSend.mock.calls[0][0];
    expect(emailPayload.html).toContain("Ahmed &lt;Darwish&gt;");
    expect(emailPayload.html).toContain("&lt;our organisation&gt;");
  });

  it("uses the CONTACT_NOTIFICATION_EMAIL environment setting when no recipient is passed", async () => {
    mockedSend.mockResolvedValue({ data: { id: "email_456" }, error: null });
    const configuredRecipient = process.env.CONTACT_NOTIFICATION_EMAIL;

    expect(configuredRecipient).toBe("darwishandcoeg@gmail.com");

    const sent = await sendContactEmailNotification(request, {
      apiKey: "test-resend-key",
      from: "Darwish & Co. Website <requests@example.com>",
    });

    expect(sent).toBe(true);
    expect(mockedSend).toHaveBeenCalledWith(
      expect.objectContaining({ to: [configuredRecipient] })
    );
  });

  it("returns false when the email provider reports an error", async () => {
    mockedSend.mockResolvedValue({ data: null, error: { message: "Delivery failed" } });

    const sent = await sendContactEmailNotification(request, {
      apiKey: "test-resend-key",
      recipient: "info@darwish-co.com",
    });

    expect(sent).toBe(false);
  });
});
