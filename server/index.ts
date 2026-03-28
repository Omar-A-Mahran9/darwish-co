import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import {
  saveContactSubmission,
  getAllContactSubmissions,
  markSubmissionAsRead,
  deleteSubmission,
  getUnreadCount,
  getAllPartners,
  insertPartner,
  updatePartner,
  deletePartner,
  getAllCorporatePartners,
  insertCorporatePartner,
  updateCorporatePartner,
  deleteCorporatePartner,
} from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Owner notification via Manus built-in notification API ──────────────────
async function notifyOwner(title: string, content: string): Promise<boolean> {
  const apiUrl = process.env.BUILT_IN_FORGE_API_URL;
  const apiKey = process.env.BUILT_IN_FORGE_API_KEY;
  const appId = process.env.VITE_APP_ID;

  if (!apiUrl || !apiKey || !appId) {
    console.warn("[Notification] Missing env vars — skipping owner notification.");
    return false;
  }

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
  } catch (err) {
    console.error("[Notification] Failed to send owner notification:", err);
    return false;
  }
}

// ── Email via Resend ─────────────────────────────────────────────────────────
async function sendEmailNotification(
  name: string,
  email: string,
  subject: string | undefined,
  message: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not set — skipping email notification.");
    return false;
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Darwish & Co. Website <onboarding@resend.dev>",
      to: ["info@darwish-co.com"],
      subject: `📩 New Contact: ${subject || name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: #0099CC; padding: 20px; border-radius: 6px 6px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">Darwish & Co. Website</p>
          </div>
          <div style="padding: 24px; background: #fff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555; width: 100px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #222;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #222;"><a href="mailto:${email}" style="color: #0099CC;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #555;">Subject</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #222;">${subject || "(no subject)"}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message:</p>
              <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div style="padding: 16px 24px; background: #f8f9fa; border-radius: 0 0 6px 6px; text-align: center;">
            <p style="color: #888; font-size: 12px; margin: 0;">Darwish & Co. — Consulting & Business Development</p>
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
  } catch (err) {
    console.error("[Email] Failed to send email:", err);
    return false;
  }
}

// ── Simple owner auth middleware ─────────────────────────────────────────────
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "darwish-admin-2026";

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers["x-admin-token"] || req.query.token;
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  next();
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ── Contact Form API ──────────────────────────────────────────────────────
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    console.log(`[Contact] New submission from ${name} <${email}>`);

    // Save to database
    try {
      await saveContactSubmission({
        name: name.trim(),
        email: email.trim(),
        subject: subject?.trim() || null,
        message: message.trim(),
        isRead: false,
        createdAt: Date.now(),
      });
    } catch (err) {
      console.error("[Contact] Failed to save to database:", err);
    }

    // Send email notification
    sendEmailNotification(name, email, subject, message).catch(console.error);

    // Send Manus push notification
    const notificationContent = [
      `**From:** ${name} (${email})`,
      `**Subject:** ${subject || "(no subject)"}`,
      `**Message:**\n${message}`,
    ].join("\n\n");
    notifyOwner(`📩 New Contact: ${name}`, notificationContent).catch(console.error);

    return res.json({
      success: true,
      message: "Your message has been received. We'll be in touch soon!",
    });
  });

  // ── Partners API (public) ─────────────────────────────────────────────────
  app.get("/api/partners", async (_req, res) => {
    try {
      const data = await getAllPartners();
      return res.json({ success: true, data });
    } catch (err) {
      console.error("[Partners] Failed to fetch:", err);
      return res.status(500).json({ success: false, error: "Failed to fetch partners." });
    }
  });

  // ── Partners Admin API ────────────────────────────────────────────────────
  app.post("/api/admin/partners", requireAdmin, async (req, res) => {
    try {
      await insertPartner({ ...req.body, createdAt: Date.now() });
      return res.json({ success: true });
    } catch (err) {
      console.error("[Partners] Insert failed:", err);
      return res.status(500).json({ success: false, error: "Failed to add partner." });
    }
  });

  app.patch("/api/admin/partners/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, error: "Invalid ID." });
    try {
      await updatePartner(id, req.body);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: "Failed to update partner." });
    }
  });

  app.delete("/api/admin/partners/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, error: "Invalid ID." });
    try {
      await deletePartner(id);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: "Failed to delete partner." });
    }
  });

  // ── Corporate Partners API (public) ───────────────────────────────────────
  app.get("/api/corporate-partners", async (_req, res) => {
    try {
      const data = await getAllCorporatePartners();
      return res.json({ success: true, data });
    } catch (err) {
      console.error("[CorporatePartners] Failed to fetch:", err);
      return res.status(500).json({ success: false, error: "Failed to fetch corporate partners." });
    }
  });

  // ── Corporate Partners Admin API ──────────────────────────────────────────
  app.post("/api/admin/corporate-partners", requireAdmin, async (req, res) => {
    try {
      await insertCorporatePartner({ ...req.body, createdAt: Date.now() });
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: "Failed to add corporate partner." });
    }
  });

  app.patch("/api/admin/corporate-partners/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, error: "Invalid ID." });
    try {
      await updateCorporatePartner(id, req.body);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: "Failed to update corporate partner." });
    }
  });

  app.delete("/api/admin/corporate-partners/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, error: "Invalid ID." });
    try {
      await deleteCorporatePartner(id);
      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: "Failed to delete corporate partner." });
    }
  });

  // ── Admin Inbox API ───────────────────────────────────────────────────────
  app.get("/api/admin/messages", requireAdmin, async (_req, res) => {
    try {
      const messages = await getAllContactSubmissions();
      const unreadCount = await getUnreadCount();
      return res.json({ success: true, messages, unreadCount });
    } catch (err) {
      console.error("[Admin] Failed to fetch messages:", err);
      return res.status(500).json({ success: false, error: "Failed to fetch messages." });
    }
  });

  app.patch("/api/admin/messages/:id/read", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, error: "Invalid ID." });
    try {
      await markSubmissionAsRead(id);
      return res.json({ success: true });
    } catch (err) {
      console.error("[Admin] Failed to mark as read:", err);
      return res.status(500).json({ success: false, error: "Failed to update message." });
    }
  });

  app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, error: "Invalid ID." });
    try {
      await deleteSubmission(id);
      return res.json({ success: true });
    } catch (err) {
      console.error("[Admin] Failed to delete message:", err);
      return res.status(500).json({ success: false, error: "Failed to delete message." });
    }
  });

  // ── Static Files ──────────────────────────────────────────────────────────
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Client-side routing fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
