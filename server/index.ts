import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { sendGmailWebsiteRequestNotification } from "./gmailNotification.js";
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
  getAllClientAccounts,
  getClientAccountByUsername,
  insertClientAccount,
  updateClientAccount,
  deleteClientAccount,
  recordFailedClientLogin,
  resetClientLoginAttempts,
  createCentralAuthorizationCode,
  consumeCentralAuthorizationCode,
} from "./db.js";
import {
  CLIENT_LOCKOUT_MS,
  hashClientPassword,
  MAX_CLIENT_LOGIN_ATTEMPTS,
  normalizeUsername,
  validateClientPassword,
  validateClientUsername,
  validatePortalUrl,
  verifyClientPassword,
} from "./clientAuth.js";
import {
  CENTRAL_AUTH_CODE_TTL_MS,
  generateAuthorizationCode,
  getCentralCallbackUrl,
  getPortalKeyForUrl,
  hashAuthorizationCode,
  isPortalKey,
  isPortalRole,
} from "./centralAuth.js";

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

// ── Simple owner auth middleware ─────────────────────────────────────────────
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers["x-admin-token"] || req.query.token;
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  next();
}

const loginWindows = new Map<string, { attempts: number; resetAt: number }>();

function isLoginRateLimited(key: string): boolean {
  const now = Date.now();
  const window = loginWindows.get(key);
  if (!window || window.resetAt <= now) {
    loginWindows.set(key, { attempts: 1, resetAt: now + CLIENT_LOCKOUT_MS });
    return false;
  }
  window.attempts += 1;
  return window.attempts > MAX_CLIENT_LOGIN_ATTEMPTS;
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

    // Send the team email before responding so serverless execution cannot end the
    // notification job prematurely. The submission remains stored in the admin inbox
    // if the email provider is temporarily unavailable.
    const emailNotificationSent = await sendGmailWebsiteRequestNotification({
      name,
      email,
      subject,
      message,
    });
    if (!emailNotificationSent) {
      console.warn("[Contact] Request saved, but email notification was not sent.");
    }

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

  // ── Client portal login ───────────────────────────────────────────────────
  app.post("/api/client-login", async (req, res) => {
    const username = normalizeUsername(String(req.body?.username ?? ""));
    const password = String(req.body?.password ?? "");
    const rateLimitKey = `${req.ip}:${username || "unknown"}`;

    if (!username || !password || isLoginRateLimited(rateLimitKey)) {
      return res.status(401).json({ success: false, error: "Invalid username or password." });
    }

    try {
      const account = await getClientAccountByUsername(username);
      const now = Date.now();
      if (!account || !account.isActive || (account.lockedUntil && account.lockedUntil > now)) {
        return res.status(401).json({ success: false, error: "Invalid username or password." });
      }

      const isValidPassword = await verifyClientPassword(password, account.passwordHash);
      if (!isValidPassword) {
        const previousAttempts = account.lockedUntil && account.lockedUntil <= now ? 0 : account.failedAttempts;
        await recordFailedClientLogin(account.id, previousAttempts);
        return res.status(401).json({ success: false, error: "Invalid username or password." });
      }

      await resetClientLoginAttempts(account.id);
      const code = generateAuthorizationCode();
      await createCentralAuthorizationCode({
        clientAccountId: account.id,
        codeHash: hashAuthorizationCode(code),
        portalKey: account.portalKey,
        expiresAt: now + CENTRAL_AUTH_CODE_TTL_MS,
      });
      return res.json({ success: true, portalUrl: getCentralCallbackUrl(account.portalKey, code) });
    } catch (error) {
      console.error("[ClientLogin] Sign-in failed:", error);
      return res.status(500).json({ success: false, error: "Unable to sign in. Please try again." });
    }
  });

  // ── Central authorization exchange (called server-to-server by each portal) ─
  app.post("/api/central-auth/exchange", async (req, res) => {
    const code = String(req.body?.code ?? "");
    const portalKey = req.body?.portalKey;
    if (!code || code.length < 32 || !isPortalKey(portalKey)) {
      return res.status(400).json({ success: false, error: "Invalid authorization exchange request." });
    }
    try {
      const grant = await consumeCentralAuthorizationCode({ codeHash: hashAuthorizationCode(code), portalKey });
      if (!grant) return res.status(401).json({ success: false, error: "This sign-in link is invalid or has expired." });
      return res.json({ success: true, grant });
    } catch (error) {
      console.error("[CentralAuth] Code exchange failed:", error);
      return res.status(500).json({ success: false, error: "Unable to complete central authorization." });
    }
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

  // ── Client Access Admin API ───────────────────────────────────────────────
  app.get("/api/admin/client-accounts", requireAdmin, async (_req, res) => {
    try {
      return res.json({ success: true, accounts: await getAllClientAccounts() });
    } catch (error) {
      console.error("[ClientAccess] Failed to fetch accounts:", error);
      return res.status(500).json({ success: false, error: "Failed to fetch client accounts." });
    }
  });

  app.post("/api/admin/client-accounts", requireAdmin, async (req, res) => {
    const clientName = String(req.body?.clientName ?? "").trim();
    const username = normalizeUsername(String(req.body?.username ?? ""));
    const password = String(req.body?.password ?? "");
    const portalUrl = String(req.body?.portalUrl ?? "").trim();
    const portalKey = getPortalKeyForUrl(portalUrl);
    const portalRole = req.body?.portalRole ?? "viewer";
    const validationError =
      (!clientName && "Client name is required.") ||
      validateClientUsername(username) ||
      validateClientPassword(password) ||
      validatePortalUrl(portalUrl) ||
      (!portalKey && "Choose Darwish Hub or Nabta Quest as the assigned portal.") ||
      (!isPortalRole(portalRole) && "Choose a valid portal role.");
    if (validationError) return res.status(400).json({ success: false, error: validationError });
    if (!portalKey || !isPortalRole(portalRole)) {
      return res.status(400).json({ success: false, error: "Choose a valid portal and role." });
    }

    try {
      const now = Date.now();
      await insertClientAccount({
        clientName,
        username,
        passwordHash: await hashClientPassword(password),
        portalUrl,
        portalKey,
        portalRole,
        isActive: true,
        failedAttempts: 0,
        lockedUntil: null,
        createdAt: now,
        updatedAt: now,
      });
      return res.status(201).json({ success: true });
    } catch (error) {
      console.error("[ClientAccess] Failed to issue credentials:", error);
      return res.status(409).json({ success: false, error: "Unable to issue these credentials. The username may already exist." });
    }
  });

  app.patch("/api/admin/client-accounts/:id", requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ success: false, error: "Invalid client account ID." });

    const clientName = req.body?.clientName === undefined ? undefined : String(req.body.clientName).trim();
    const portalUrl = req.body?.portalUrl === undefined ? undefined : String(req.body.portalUrl).trim();
    const portalKey = portalUrl === undefined ? undefined : getPortalKeyForUrl(portalUrl);
    const portalRole = req.body?.portalRole;
    const isActive = req.body?.isActive;
    const password = req.body?.password === undefined ? undefined : String(req.body.password);
    const validationError =
      (clientName !== undefined && !clientName && "Client name is required.") ||
      (portalUrl !== undefined && validatePortalUrl(portalUrl)) ||
      (portalUrl !== undefined && !portalKey && "Choose Darwish Hub or Nabta Quest as the assigned portal.") ||
      (portalRole !== undefined && !isPortalRole(portalRole) && "Choose a valid portal role.") ||
      (password !== undefined && validateClientPassword(password)) ||
      (isActive !== undefined && typeof isActive !== "boolean" && "Active status must be true or false.");
    if (validationError) return res.status(400).json({ success: false, error: validationError });

    try {
      const update: {
        clientName?: string;
        portalUrl?: string;
        portalKey?: "darwish_hub" | "nabta_quest";
        portalRole?: "owner" | "editor" | "viewer";
        isActive?: boolean;
        passwordHash?: string;
        failedAttempts?: number;
        lockedUntil?: number | null;
        updatedAt: number;
      } = { updatedAt: Date.now() };
      if (clientName !== undefined) update.clientName = clientName;
      if (portalUrl !== undefined && portalKey) {
        update.portalUrl = portalUrl;
        update.portalKey = portalKey;
      }
      if (isPortalRole(portalRole)) update.portalRole = portalRole;
      if (typeof isActive === "boolean") update.isActive = isActive;
      if (password !== undefined) {
        update.passwordHash = await hashClientPassword(password);
        update.failedAttempts = 0;
        update.lockedUntil = null;
      }
      await updateClientAccount(id, update);
      return res.json({ success: true });
    } catch (error) {
      console.error("[ClientAccess] Failed to update account:", error);
      return res.status(500).json({ success: false, error: "Failed to update the client account." });
    }
  });

  app.delete("/api/admin/client-accounts/:id", requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ success: false, error: "Invalid client account ID." });
    try {
      await deleteClientAccount(id);
      return res.json({ success: true });
    } catch (error) {
      console.error("[ClientAccess] Failed to delete account:", error);
      return res.status(500).json({ success: false, error: "Failed to delete the client account." });
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
