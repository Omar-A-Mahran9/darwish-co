import { Resend } from "resend";

export type ContactRequest = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export type ContactEmailConfig = {
  apiKey?: string;
  recipient?: string;
  from?: string;
};

const DEFAULT_RECIPIENT = "info@darwish-co.com";
const DEFAULT_FROM = "Darwish & Co. Website <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cleanSubject(value?: string): string {
  const subject = value?.trim().replace(/[\r\n]+/g, " ");
  return subject || "New website request";
}

export async function sendContactEmailNotification(
  request: ContactRequest,
  config: ContactEmailConfig = {}
): Promise<boolean> {
  const apiKey = config.apiKey ?? process.env.RESEND_API_KEY;
  const recipient = (config.recipient ?? process.env.CONTACT_NOTIFICATION_EMAIL ?? DEFAULT_RECIPIENT).trim();
  const from = (config.from ?? process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM).trim();

  if (!apiKey || !recipient || !from) {
    console.warn("[Email] Notification configuration is incomplete — skipping email notification.");
    return false;
  }

  const safeName = escapeHtml(request.name.trim());
  const safeEmail = escapeHtml(request.email.trim());
  const safeSubject = escapeHtml(cleanSubject(request.subject));
  const safeMessage = escapeHtml(request.message.trim());
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: [recipient],
      replyTo: request.email.trim(),
      subject: `[Website request] ${cleanSubject(request.subject)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: #0099CC; padding: 20px; border-radius: 6px 6px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Website Request</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">Darwish &amp; Co.</p>
          </div>
          <div style="padding: 24px; background: #fff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555; width: 100px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #222;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #222;"><a href="mailto:${safeEmail}" style="color: #0099CC;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555;">Subject</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #222;">${safeSubject}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message</p>
              <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; color: #333; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</div>
            </div>
          </div>
          <div style="padding: 16px 24px; background: #f8f9fa; border-radius: 0 0 6px 6px; text-align: center;">
            <p style="color: #888; font-size: 12px; margin: 0;">Darwish &amp; Co. — Consulting &amp; Business Development</p>
            <p style="color: #888; font-size: 12px; margin: 4px 0 0;">www.darwish-co.com</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Email] Resend error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Email] Failed to send website request email:", error);
    return false;
  }
}
