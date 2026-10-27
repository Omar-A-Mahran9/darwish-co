/**
 * sitemap.xml, built from the site's own address list on every build (scripts/prerender.mjs
 * writes it to dist/public). Only pages search engines may index are listed, so a noindex
 * placeholder such as Privacy never appears and a newly published article always does.
 */
import { publicRoutes } from "./routes.js";
import { resolveSeo, SITE_URL } from "./seo.js";

function hints(path: string): [changefreq: string, priority: string] {
  if (path === "/") return ["weekly", "1.0"];
  if (path === "/insights") return ["weekly", "0.8"];
  if (path === "/services") return ["monthly", "0.9"];
  if (path.startsWith("/services/") || path === "/about") return ["monthly", "0.8"];
  if (path.startsWith("/insights/") || path.startsWith("/guides")) return ["monthly", "0.7"];
  if (path.startsWith("/projects/")) return ["monthly", "0.6"];
  if (path === "/contact") return ["yearly", "0.6"];
  return ["monthly", "0.7"];
}

export function sitemapXml(): string {
  const urls = publicRoutes()
    .filter((path) => resolveSeo(path).robots === "index, follow")
    .map((path) => {
      const [changefreq, priority] = hints(path);
      return `  <url>\n    <loc>${SITE_URL}${path === "/" ? "/" : path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>\n`;
}
