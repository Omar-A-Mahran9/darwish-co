import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

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
                  to: ["fouadarwish@gmail.com"],
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
        const adminToken = process.env.ADMIN_TOKEN || "darwish-admin-2026";
        const token = (req as any).headers["x-admin-token"] || new URL(req.url || "", "http://localhost").searchParams.get("token");
        if (token !== adminToken) {
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

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginContactApi(), vitePluginManusDebugCollector()];

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
