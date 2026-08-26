import nodemailer from "nodemailer";

export type WebsiteRequest = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

const GMAIL_SMTP_HOST = "smtp.gmail.com";
const GMAIL_SMTP_PORT = 465;
const DEFAULT_GMAIL_ADDRESS = "darwishandcoeg@gmail.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getGmailAddress(): string {
  return (process.env.GMAIL_SMTP_USER || DEFAULT_GMAIL_ADDRESS).trim();
}

function getNotificationRecipient(): string {
  return (process.env.CONTACT_NOTIFICATION_EMAIL || DEFAULT_GMAIL_ADDRESS).trim();
}

function getAppPassword(): string | undefined {
  return process.env.GMAIL_SMTP_APP_PASSWORD?.replace(/\s/g, "");
}

export function createGmailTransport(appPassword = getAppPassword()) {
  if (!appPassword) return null;

  return nodemailer.createTransport({
    host: GMAIL_SMTP_HOST,
    port: GMAIL_SMTP_PORT,
    secure: true,
    auth: {
      user: getGmailAddress(),
      pass: appPassword,
    },
  });
}

export async function verifyGmailSmtpConnection(): Promise<boolean> {
  const transporter = createGmailTransport();
  if (!transporter) {
    console.warn("[Gmail] GMAIL_SMTP_APP_PASSWORD is not configured.");
    return false;
  }

  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("[Gmail] SMTP verification failed:", error);
    return false;
  }
}

export async function sendGmailWebsiteRequestNotification(
  request: WebsiteRequest
): Promise<boolean> {
  const transporter = createGmailTransport();
  if (!transporter) {
    console.warn("[Gmail] GMAIL_SMTP_APP_PASSWORD is not configured — skipping email notification.");
    return false;
  }

  const safeName = escapeHtml(request.name.trim());
  const safeEmail = escapeHtml(request.email.trim());
  const safeSubject = escapeHtml(request.subject?.trim() || "New website request");
  const safeMessage = escapeHtml(request.message.trim());

  try {
    await transporter.sendMail({
      from: `Darwish & Co. Website <${getGmailAddress()}>`,
      to: getNotificationRecipient(),
      replyTo: request.email.trim(),
      subject: `[Website request] ${request.subject?.trim() || "New website request"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: #0099CC; padding: 20px; border-radius: 6px 6px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Website Request</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">Darwish &amp; Co.</p>
          </div>
          <div style="padding: 24px; background: #fff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555; width: 100px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #222;">${safeName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #222;"><a href="mailto:${safeEmail}" style="color: #0099CC;">${safeEmail}</a></td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555;">Subject</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #222;">${safeSubject}</td></tr>
            </table>
            <div style="margin-top: 20px;"><p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message</p><div style="background: #f8f9fa; padding: 16px; border-radius: 6px; color: #333; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</div></div>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("[Gmail] Failed to send website request email:", error);
    return false;
  }
}
