import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

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

    // Log the submission
    console.log(`[Contact] New submission from ${name} <${email}>`);

    // Notify the owner
    const notificationTitle = `📩 New Contact: ${name}`;
    const notificationContent = [
      `**From:** ${name} (${email})`,
      `**Subject:** ${subject || "(no subject)"}`,
      `**Message:**\n${message}`,
    ].join("\n\n");

    await notifyOwner(notificationTitle, notificationContent);

    return res.json({
      success: true,
      message: "Your message has been received. We'll be in touch soon!",
    });
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
