/**
 * How the site's files go out (29 Oct 2026, from the SEO audit): security headers on every response,
 * one address per page (no trailing slash), long caching for files whose names change with their
 * content, and the brotli or gzip copies that scripts/precompress.mjs writes beside the build's text files.
 */
import fs from "node:fs";
import path from "node:path";
import type express from "express";

export const SECURITY_HEADERS: Record<string, string> = {
  // No includeSubDomains: other darwish-co.com subdomains are not ours to commit to HTTPS-only.
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
};

export function securityHeaders(_req: express.Request, res: express.Response, next: express.NextFunction) {
  res.set(SECURITY_HEADERS);
  next();
}

/** /about/ → /about, keeping the query string. The homepage and the CMS (which needs its slash) are left alone. */
export function trailingSlashRedirect(req: express.Request, res: express.Response, next: express.NextFunction) {
  if ((req.method === "GET" || req.method === "HEAD") && req.path.length > 1 && req.path.endsWith("/") && !req.path.startsWith("/cms/") && !req.path.startsWith("/api/")) {
    const q = req.originalUrl.indexOf("?");
    return res.redirect(301, req.path.replace(/\/+$/, "") + (q === -1 ? "" : req.originalUrl.slice(q)));
  }
  next();
}

/** Cache rules by path: Vite's hashed files never change, so browsers may keep them for a year. */
export function cacheControlFor(urlPath: string): string | null {
  if (urlPath.startsWith("/assets/")) return "public, max-age=31536000, immutable";
  if (/^\/(media|images|fonts)\//.test(urlPath)) return "public, max-age=604800";
  return null;
}

export const setStaticHeaders = (res: express.Response, filePath: string, staticPath: string) => {
  const rule = cacheControlFor("/" + path.relative(staticPath, filePath).split(path.sep).join("/"));
  if (rule) res.setHeader("Cache-Control", rule);
};

const TYPES: Record<string, string> = {
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};
export const COMPRESSIBLE = Object.keys(TYPES);

/** Picks the encoding to send: brotli when the browser accepts it, then gzip. */
export function pickEncoding(acceptEncoding: string | undefined, available: { br: boolean; gz: boolean }): "br" | "gzip" | null {
  // "br, gzip;q=0.8" → accepted unless listed with q=0.
  const accepted = new Set(
    (acceptEncoding ?? "")
      .split(",")
      .map((part) => part.trim().toLowerCase().split(/\s*;\s*q=/))
      .filter(([, q]) => q === undefined || Number(q) > 0)
      .map(([name]) => name),
  );
  const accepts = (name: string) => accepted.has(name);
  if (available.br && accepts("br")) return "br";
  if (available.gz && accepts("gzip")) return "gzip";
  return null;
}

/** Serves the precompressed copy of a text file when one exists and the browser accepts it. */
export function precompressed(staticPath: string) {
  const root = path.resolve(staticPath);
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const type = TYPES[path.extname(req.path).toLowerCase()];
    if (!type) return next();
    let file: string;
    try {
      file = path.resolve(root, "." + decodeURIComponent(req.path));
    } catch {
      return next();
    }
    if (!file.startsWith(root + path.sep)) return next();
    const encoding = pickEncoding(req.headers["accept-encoding"], { br: fs.existsSync(file + ".br"), gz: fs.existsSync(file + ".gz") });
    res.vary("Accept-Encoding");
    if (!encoding) return next();
    res.set({ "Content-Type": type, "Content-Encoding": encoding });
    const rule = cacheControlFor(req.path);
    res.sendFile(file + (encoding === "br" ? ".br" : ".gz"), { headers: rule ? { "Cache-Control": rule } : {}, cacheControl: !rule }, (error) => {
      if (error && !res.headersSent) {
        res.removeHeader("Content-Encoding");
        res.removeHeader("Content-Type");
        next();
      }
    });
  };
}
