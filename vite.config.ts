import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { ClientLoginRateLimiter } from "./server/clientLoginRateLimit";
import { injectSeo } from "./server/seoHtml";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
// ── Owner notification helper (dev mode) ─────────────────────────────────────
async function devNotifyOwner(title: string, content: string): Promise<boolean> {
  const apiUrl = process.env.BUILT_IN_FORGE_API_URL;
  const apiKey = process.env.BUILT_IN_FORGE_API_KEY;
  const appId = process.env.VITE_APP_ID;
  if (!apiUrl || !apiKey || !appId) return false;
  try {
    const res = await fetch(`${apiUrl}/notification/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ appId, title, content }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Vite plugin that adds /api/contact and /api/admin/* endpoints during development
 */
function vitePluginContactApi(): Plugin {
  const clientLoginRateLimiter = new ClientLoginRateLimiter(15 * 60 * 1000, 5);

  const sendJson = (res: import("node:http").ServerResponse, status: number, body: unknown) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
  };

  const parseRequestBody = (req: import("node:http").IncomingMessage) =>
    new Promise<Record<string, unknown>>((resolve, reject) => {
      let body = "";
      req.on("data", chunk => { body += chunk.toString(); });
      req.on("end", () => {
        try { resolve(body ? JSON.parse(body) : {}); } catch (error) { reject(error); }
      });
    });

  const hasAdminAccess = (req: import("node:http").IncomingMessage) => {
    const adminToken = process.env.ADMIN_TOKEN;
    const token = req.headers["x-admin-token"] || new URL(req.url || "", "http://localhost").searchParams.get("token");
    return Boolean(adminToken && token === adminToken);
  };

  return {
    name: "manus-contact-api",
    configureServer(server: ViteDevServer) {
      // ── POST /api/contact ────────────────────────────────────────────────
      server.middlewares.use("/api/contact", (req, res, next) => {
        if (req.method !== "POST") return next();

        let body = "";
        req.on("data", (chunk) => { body += chunk.toString(); });
        req.on("end", async () => {
          try {
            const { name, email, subject, message } = JSON.parse(body) as {
              name?: string; email?: string; subject?: string; message?: string;
            };

            if (!name?.trim() || !email?.trim() || !message?.trim()) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, error: "Name, email, and message are required." }));
              return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, error: "Please provide a valid email address." }));
              return;
            }

            console.log(`[Contact] New submission from ${name} <${email}>`);

            // Save to DB
            try {
              const { saveContactSubmission } = await import("./server/db.js");
              await saveContactSubmission({
                name: name.trim(), email: email.trim(),
                subject: subject?.trim() || null,
                message: message.trim(), isRead: false, createdAt: Date.now(),
              });
            } catch (dbErr) {
              console.error("[Contact] DB save failed:", dbErr);
            }

            // Send email
            const resendKey = process.env.RESEND_API_KEY;
            if (resendKey) {
              try {
                const { Resend } = await import("resend");
                const resend = new Resend(resendKey);
                await resend.emails.send({
                  from: "Darwish & Co. Website <onboarding@resend.dev>",
                  to: ["info@darwish-co.com"],
                  subject: `📩 New Contact: ${subject || name}`,
                  html: `<p><b>From:</b> ${name} (${email})</p><p><b>Subject:</b> ${subject || "(none)"}</p><p><b>Message:</b></p><p>${message.replace(/\n/g, "<br>")}</p>`,
                });
              } catch (emailErr) {
                console.error("[Contact] Email failed:", emailErr);
              }
            }

            // Manus push notification
            const notificationContent = [
              `**From:** ${name} (${email})`,
              `**Subject:** ${subject || "(no subject)"}`,
              `**Message:**\n${message}`,
            ].join("\n\n");
            devNotifyOwner(`📩 New Contact: ${name}`, notificationContent).catch(console.error);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: "Your message has been received. We'll be in touch soon!" }));
          } catch (e) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Server error. Please try again." }));
          }
        });
      });

      // ── GET /api/admin/messages ──────────────────────────────────────────
      server.middlewares.use("/api/admin/messages", (req, res, next) => {
        if (!hasAdminAccess(req)) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Unauthorized" }));
          return;
        }

        if (req.method === "GET") {
          import("./server/db.js").then(async ({ getAllContactSubmissions, getUnreadCount }) => {
            const messages = await getAllContactSubmissions();
            const unreadCount = await getUnreadCount();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, messages, unreadCount }));
          }).catch(e => {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          });
          return;
        }
        next();
      });

      // ── Client portal sign-in (development parity with Express server) ─────
      server.middlewares.use("/api/client-login", (req, res, next) => {
        if (req.method !== "POST") return next();
        (async () => {
          try {
            const body = await parseRequestBody(req);
            const auth = await import("./server/clientAuth.js");
            const db = await import("./server/db.js");
            const username = auth.normalizeUsername(String(body.username ?? ""));
            const password = String(body.password ?? "");
            const rateLimitKey = `${req.socket.remoteAddress || "unknown"}:${username || "unknown"}`;

            if (!username || !password || clientLoginRateLimiter.isLimited(rateLimitKey)) {
              clientLoginRateLimiter.recordFailure(rateLimitKey);
              return sendJson(res, 401, { success: false, error: "Invalid username or password." });
            }

            const account = await db.getClientAccountByUsername(username);
            const now = Date.now();
            if (!account || !account.isActive || (account.lockedUntil && account.lockedUntil > now)) {
              clientLoginRateLimiter.recordFailure(rateLimitKey);
              return sendJson(res, 401, { success: false, error: "Invalid username or password." });
            }

            if (!(await auth.verifyClientPassword(password, account.passwordHash))) {
              const previousAttempts = account.lockedUntil && account.lockedUntil <= now ? 0 : account.failedAttempts;
              await db.recordFailedClientLogin(account.id, previousAttempts);
              clientLoginRateLimiter.recordFailure(rateLimitKey);
              return sendJson(res, 401, { success: false, error: "Invalid username or password." });
            }

            await db.resetClientLoginAttempts(account.id);
            clientLoginRateLimiter.clear(rateLimitKey);
            const central = await import("./server/centralAuth.js");
            const code = central.generateAuthorizationCode();
            await db.createCentralAuthorizationCode({
              clientAccountId: account.id,
              codeHash: central.hashAuthorizationCode(code),
              portalKey: account.portalKey,
              expiresAt: now + central.CENTRAL_AUTH_CODE_TTL_MS,
            });
            return sendJson(res, 200, { success: true, portalUrl: central.getCentralCallbackUrl(account.portalKey, code) });
          } catch (error) {
            console.error("[ClientLogin] Development sign-in failed:", error);
            return sendJson(res, 500, { success: false, error: "Unable to sign in. Please try again." });
          }
        })();
      });

      // ── Central authorization code exchange (development parity) ───────────
      server.middlewares.use("/api/central-auth/exchange", (req, res, next) => {
        if (req.method !== "POST") return next();
        (async () => {
          try {
            const body = await parseRequestBody(req);
            const central = await import("./server/centralAuth.js");
            const db = await import("./server/db.js");
            const code = String(body.code ?? "");
            const portalKey = body.portalKey;
            if (!code || code.length < 32 || !central.isPortalKey(portalKey)) {
              return sendJson(res, 400, { success: false, error: "Invalid authorization exchange request." });
            }
            const grant = await db.consumeCentralAuthorizationCode({ codeHash: central.hashAuthorizationCode(code), portalKey });
            if (!grant) return sendJson(res, 401, { success: false, error: "This sign-in link is invalid or has expired." });
            return sendJson(res, 200, { success: true, grant });
          } catch (error) {
            console.error("[CentralAuth] Development exchange failed:", error);
            return sendJson(res, 500, { success: false, error: "Unable to complete central authorization." });
          }
        })();
      });

      // ── Client credential administration (development parity) ─────────────
      server.middlewares.use("/api/admin/client-accounts", (req, res, next) => {
        if (!hasAdminAccess(req)) return sendJson(res, 401, { success: false, error: "Unauthorized" });

        (async () => {
          try {
            const db = await import("./server/db.js");
            const auth = await import("./server/clientAuth.js");
            const idMatch = (req.url || "").split("?")[0].match(/^\/(\d+)$/);
            const id = idMatch ? Number(idMatch[1]) : null;

            if (req.method === "GET" && id === null) {
              return sendJson(res, 200, { success: true, accounts: await db.getAllClientAccounts() });
            }

            if (req.method === "POST" && id === null) {
              const body = await parseRequestBody(req);
              const clientName = String(body.clientName ?? "").trim();
              const username = auth.normalizeUsername(String(body.username ?? ""));
              const password = String(body.password ?? "");
              const portalUrl = String(body.portalUrl ?? "").trim();
              const central = await import("./server/centralAuth.js");
              const portalKey = central.getPortalKeyForUrl(portalUrl);
              const portalRole = body.portalRole ?? "viewer";
              const validationError = (!clientName && "Client name is required.") || auth.validateClientUsername(username) || auth.validateClientPassword(password) || auth.validatePortalUrl(portalUrl) || (!portalKey && "Choose Darwish Hub or Nabta Quest as the assigned portal.") || (!central.isPortalRole(portalRole) && "Choose a valid portal role.");
              if (validationError) return sendJson(res, 400, { success: false, error: validationError });
              if (!portalKey || !central.isPortalRole(portalRole)) return sendJson(res, 400, { success: false, error: "Choose a valid portal and role." });
              const now = Date.now();
              await db.insertClientAccount({ clientName, username, passwordHash: await auth.hashClientPassword(password), portalUrl, portalKey, portalRole, isActive: true, failedAttempts: 0, lockedUntil: null, createdAt: now, updatedAt: now });
              return sendJson(res, 201, { success: true });
            }

            if (req.method === "PATCH" && id !== null) {
              const body = await parseRequestBody(req);
              const clientName = body.clientName === undefined ? undefined : String(body.clientName).trim();
              const portalUrl = body.portalUrl === undefined ? undefined : String(body.portalUrl).trim();
              const central = await import("./server/centralAuth.js");
              const portalKey = portalUrl === undefined ? undefined : central.getPortalKeyForUrl(portalUrl);
              const portalRole = body.portalRole;
              const isActive = body.isActive;
              const password = body.password === undefined ? undefined : String(body.password);
              const validationError =
                (clientName !== undefined && !clientName && "Client name is required.") ||
                (portalUrl !== undefined && auth.validatePortalUrl(portalUrl)) ||
                (portalUrl !== undefined && !portalKey && "Choose Darwish Hub or Nabta Quest as the assigned portal.") ||
                (portalRole !== undefined && !central.isPortalRole(portalRole) && "Choose a valid portal role.") ||
                (password !== undefined && auth.validateClientPassword(password)) ||
                (isActive !== undefined && typeof isActive !== "boolean" && "Active status must be true or false.");
              if (validationError) return sendJson(res, 400, { success: false, error: validationError });
              const update: { clientName?: string; portalUrl?: string; portalKey?: "darwish_hub" | "nabta_quest"; portalRole?: "owner" | "editor" | "viewer"; isActive?: boolean; passwordHash?: string; failedAttempts?: number; lockedUntil?: number | null; updatedAt: number } = { updatedAt: Date.now() };
              if (clientName !== undefined) update.clientName = clientName;
              if (portalUrl !== undefined && portalKey) { update.portalUrl = portalUrl; update.portalKey = portalKey; }
              if (central.isPortalRole(portalRole)) update.portalRole = portalRole;
              if (typeof isActive === "boolean") update.isActive = isActive;
              if (password !== undefined) {
                update.passwordHash = await auth.hashClientPassword(password);
                update.failedAttempts = 0;
                update.lockedUntil = null;
              }
              await db.updateClientAccount(id, update);
              return sendJson(res, 200, { success: true });
            }

            if (req.method === "DELETE" && id !== null) {
              await db.deleteClientAccount(id);
              return sendJson(res, 200, { success: true });
            }

            return next();
          } catch (error) {
            console.error("[ClientAccess] Development admin API failed:", error);
            return sendJson(res, 500, { success: false, error: "Unable to complete the client access request." });
          }
        })();
      });
    },
  };
}

/**
 * Gives the development and preview servers the same per-page head the Express
 * server sends in production, so local previews show the real title, description
 * and canonical address for each route.
 */
function vitePluginRouteSeo(): Plugin {
  return {
    name: "darwish-route-seo",
    transformIndexHtml(html, ctx) {
      // Only for served requests. At build time there is no route to resolve,
      // and the built shell must keep the homepage head it ships with.
      if (!ctx.server) return html;
      const pathname = (ctx.originalUrl || ctx.path || "/").split("?")[0];
      return injectSeo(html, pathname === "/index.html" ? "/" : pathname);
    },
  };
}

function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

function vitePluginStorageProxy(): Plugin {
  return {
    name: "manus-storage-proxy",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/manus-storage", async (req, res) => {
        const key = req.url?.replace(/^\//, "");
        if (!key) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing storage key");
          return;
        }
        const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
        const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;
        if (!forgeBaseUrl || !forgeKey) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Storage proxy not configured");
          return;
        }
        try {
          const forgeUrl = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
          forgeUrl.searchParams.set("path", key);
          const forgeResp = await fetch(forgeUrl, {
            headers: { Authorization: `Bearer ${forgeKey}` },
          });
          if (!forgeResp.ok) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Storage backend error");
            return;
          }
          const { url } = (await forgeResp.json()) as { url: string };
          if (!url) {
            res.writeHead(502, { "Content-Type": "text/plain" });
            res.end("Empty signed URL");
            return;
          }
          res.writeHead(307, { Location: url, "Cache-Control": "no-store" });
          res.end();
        } catch {
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end("Storage proxy error");
        }
      });
    },
  };
}

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginContactApi(), vitePluginRouteSeo(), vitePluginManusDebugCollector(), vitePluginStorageProxy()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});