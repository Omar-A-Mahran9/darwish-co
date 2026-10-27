/**
 * "Sign in with GitHub" for the Insights CMS at /cms (Sveltia), served by the website itself instead of
 * a separate Cloudflare Worker. It follows the protocol of Sveltia's own authenticator
 * (github.com/sveltia/sveltia-cms-auth): the CMS opens /api/cms/auth in a pop-up, GitHub sends the
 * writer back to /api/cms/callback, and the callback page hands the token to the CMS window by
 * postMessage, but only to a window on this site's own origin.
 *
 * Needs a GitHub OAuth app (see docs/insights-cms.md) whose keys are set on the server:
 *   CMS_GITHUB_CLIENT_ID, CMS_GITHUB_CLIENT_SECRET
 * Without them the sign-in window says the CMS is not set up yet; nothing else on the site changes.
 */
import { randomBytes, timingSafeEqual } from "node:crypto";
import type express from "express";

const STATE_COOKIE = "cms_oauth_state";
const COOKIE_PATH = "/api/cms";

type Outcome = { token: string } | { error: string; errorCode: string };

/** The page shown in the sign-in pop-up. It answers only a CMS window on the same origin. */
export function callbackPage(outcome: Outcome): string {
  const ok = "token" in outcome;
  const content = ok ? { provider: "github", token: outcome.token } : { provider: "github", error: outcome.error, errorCode: outcome.errorCode };
  // Safe inside a <script>: no "<" can close the tag early.
  const message = JSON.stringify(`authorization:github:${ok ? "success" : "error"}:${JSON.stringify(content)}`).replace(/</g, "\\u003c");
  const note = ok ? "Signed in. This window will close." : `Sign-in failed: ${escapeHtml(outcome.error)}`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>Darwish &amp; Co. CMS sign-in</title></head>
<body style="font:16px system-ui,sans-serif;padding:24px">
<p>${note}</p>
<script>
(() => {
  const message = ${message};
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin || event.data !== "authorizing:github") return;
    window.opener && window.opener.postMessage(message, event.origin);
  });
  window.opener && window.opener.postMessage("authorizing:github", window.location.origin);
})();
</script>
</body></html>`;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** True when the state GitHub returned is the one this browser was given. */
export function stateMatches(expected: string | undefined, received: string | undefined): boolean {
  if (!expected || !received || expected.length !== received.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(received));
}

function readCookie(req: express.Request, name: string): string | undefined {
  for (const part of (req.headers.cookie ?? "").split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

/** The site's public origin, as the browser sees it behind nginx. */
function siteOrigin(req: express.Request): string {
  const proto = String(req.headers["x-forwarded-proto"] ?? req.protocol).split(",")[0].trim();
  return `${proto}://${req.get("host")}`;
}

export function registerCmsAuth(app: express.Express) {
  app.get("/api/cms/auth", (req, res) => {
    const clientId = process.env.CMS_GITHUB_CLIENT_ID;
    res.set("Cache-Control", "no-store");
    if (req.query.provider !== "github") {
      return res.status(400).type("html").send(callbackPage({ error: "Only GitHub sign-in is supported.", errorCode: "UNSUPPORTED_BACKEND" }));
    }
    if (!clientId || !process.env.CMS_GITHUB_CLIENT_SECRET) {
      return res.status(503).type("html").send(callbackPage({ error: "The CMS sign-in is not set up yet (missing GitHub OAuth keys on the server).", errorCode: "AUTH_APP_NOT_CONFIGURED" }));
    }
    const origin = siteOrigin(req);
    const state = randomBytes(24).toString("hex");
    const secure = origin.startsWith("https:") ? "; Secure" : "";
    res.set("Set-Cookie", `${STATE_COOKIE}=${state}; Path=${COOKIE_PATH}; Max-Age=600; HttpOnly; SameSite=Lax${secure}`);
    const authorize = new URL("https://github.com/login/oauth/authorize");
    authorize.searchParams.set("client_id", clientId);
    authorize.searchParams.set("redirect_uri", `${origin}/api/cms/callback`);
    authorize.searchParams.set("scope", "repo,user");
    authorize.searchParams.set("state", state);
    res.redirect(302, authorize.toString());
  });

  app.get("/api/cms/callback", async (req, res) => {
    res.set("Cache-Control", "no-store");
    res.set("Set-Cookie", `${STATE_COOKIE}=; Path=${COOKIE_PATH}; Max-Age=0; HttpOnly; SameSite=Lax`);
    const send = (status: number, outcome: Outcome) => res.status(status).type("html").send(callbackPage(outcome));

    if (!stateMatches(readCookie(req, STATE_COOKIE), typeof req.query.state === "string" ? req.query.state : undefined)) {
      return send(400, { error: "The sign-in request expired or did not start here. Please try again.", errorCode: "CSRF_DETECTED" });
    }
    const code = typeof req.query.code === "string" ? req.query.code : "";
    if (!code) return send(400, { error: "GitHub did not return an authorization code.", errorCode: "AUTH_CODE_REQUEST_FAILED" });

    try {
      const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: process.env.CMS_GITHUB_CLIENT_ID, client_secret: process.env.CMS_GITHUB_CLIENT_SECRET, code }),
      });
      const data = (await response.json()) as { access_token?: string; error_description?: string };
      if (!data.access_token) return send(502, { error: data.error_description || "GitHub did not return a token.", errorCode: "TOKEN_REQUEST_FAILED" });
      return send(200, { token: data.access_token });
    } catch (error) {
      console.error("[CMS] GitHub token exchange failed:", error);
      return send(502, { error: "Could not reach GitHub. Please try again.", errorCode: "TOKEN_REQUEST_FAILED" });
    }
  });
}
