/**
 * The rules every Insights article must meet. scripts/build-insights.mjs applies them on every build
 * (and so on every CMS pull request), and the CMS form in client/public/cms/config.yml uses the same
 * limits so writers rarely meet a failed build. server/insightsSchema.test.ts keeps the lists below in
 * step with the site's own topics, services and case studies.
 */

export const TOPIC_KEYS = ["strategy", "governance", "people", "operations", "growth", "research"];

export const SERVICE_SLUGS = [
  "strategy-performance",
  "governance-risk-compliance",
  "human-resources",
  "operational-excellence",
  "business-development",
  "negotiation-deal-advisory",
  "market-research",
  "company-liquidation",
];

export const CASE_SLUGS = ["furniture", "organization"];

export const STATUSES = ["planned", "sample", "published"];

/** Character limits, with room above the longest approved article (title 87, summary 222, listing 129). */
export const LIMITS = {
  title: [10, 110],
  summary: [50, 260],
  listing: [30, 160],
  coverAlt: [10, 200],
};

/** Image size caps in kilobytes. Uploads through the CMS are converted to WebP at 1600px. */
export const MAX_KB = { cover: 250, inline: 250, svg: 100 };

const REQUIRED = ["slug", "title", "topic", "service", "summary", "listing", "status"];
const KNOWN = new Set([...REQUIRED, "author", "date", "order", "featured", "cover", "cover_alt", "cover_search"]);
const STATIC_ROUTES = new Set(["/", "/about", "/about/integrity", "/services", "/industries", "/projects", "/insights", "/contact", "/privacy"]);

/**
 * Checks one article. Returns a list of problems, each naming the field or line, so the build log
 * tells the writer exactly what to fix. `fileInfo(path)` returns { exists, kb } for a site path
 * such as /images/x.webp; `publishedSlugs` lists every published article, for internal links.
 */
export function checkArticle(file, meta, body, { fileInfo, publishedSlugs }) {
  const problems = [];
  const fail = (msg) => problems.push(`${file}: ${msg}`);
  const text = (key) => (typeof meta[key] === "string" ? meta[key].trim() : "");

  for (const key of REQUIRED) if (!text(key)) fail(`"${key}" is missing`);
  for (const key of Object.keys(meta)) if (!KNOWN.has(key)) fail(`unknown field "${key}" (check the spelling)`);

  if (meta.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.slug)) fail(`slug "${meta.slug}" must be lowercase words joined by hyphens`);
  if (meta.slug && `${meta.slug}.md` !== file) fail(`slug "${meta.slug}" must match the file name`);
  if (meta.status && !STATUSES.includes(meta.status)) fail(`status "${meta.status}" must be one of ${STATUSES.join(", ")}`);
  if (meta.topic && !TOPIC_KEYS.includes(meta.topic)) fail(`topic "${meta.topic}" must be one of ${TOPIC_KEYS.join(", ")}`);
  if (meta.service && !SERVICE_SLUGS.includes(meta.service)) fail(`service "${meta.service}" is not one of the eight services`);

  for (const key of ["title", "summary", "listing"]) {
    const [min, max] = LIMITS[key];
    const n = text(key).length;
    if (n && (n < min || n > max)) fail(`${key} is ${n} characters; it must be ${min}–${max}`);
  }
  if (meta.date !== undefined && meta.date !== null && !/^\d{4}-\d{2}(-\d{2})?$/.test(String(meta.date))) fail(`date "${meta.date}" must look like 2026-10 or 2026-10-27`);
  if (meta.order !== undefined && !Number.isFinite(meta.order)) fail(`order must be a number`);
  if (meta.featured !== undefined && typeof meta.featured !== "boolean") fail(`featured must be true or false`);

  if (meta.cover) {
    checkImage(fail, "cover image", meta.cover, MAX_KB.cover, fileInfo);
    const [min, max] = LIMITS.coverAlt;
    const n = text("cover_alt").length;
    if (n < min || n > max) fail(`cover_alt (the cover's description) must be ${min}–${max} characters`);
  }

  if (meta.status === "published") {
    if (!/^## \S/m.test(body)) fail("a published article needs at least one section heading (## Heading)");
    const lines = body.split(/\r?\n/);
    lines.forEach((line, i) => {
      const at = `line ${i + 1}`;
      if (/<\/?[a-z][a-z0-9]*(\s[^>]*)?>/i.test(line)) fail(`${at}: raw HTML is not allowed; use the editor's formatting instead`);
      for (const m of line.matchAll(/!\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g)) {
        if (!m[1].trim()) fail(`${at}: image "${m[2]}" needs a description (alt text)`);
        checkImage((msg) => fail(`${at}: ${msg}`), "image", m[2], m[2].endsWith(".svg") ? MAX_KB.svg : MAX_KB.inline, fileInfo);
      }
      for (const m of line.matchAll(/(?<!!)\[[^\]]*\]\((\/[^)\s#?]*)[^)]*\)/g)) {
        if (!isKnownPath(m[1], publishedSlugs)) fail(`${at}: link to "${m[1]}" does not match a page on the site`);
      }
    });
  }
  return problems;
}

function checkImage(fail, label, path, maxKb, fileInfo) {
  if (!/^\/images\/[\w./-]+\.(webp|jpe?g|png|svg)$/i.test(path)) {
    fail(`${label} "${path}" must be uploaded to the site (a /images/… path ending in .webp, .jpg, .png or .svg)`);
    return;
  }
  const info = fileInfo(path);
  if (!info.exists) fail(`${label} "${path}" was not found in client/public`);
  else if (info.kb > maxKb) fail(`${label} "${path}" is ${info.kb} KB; the limit is ${maxKb} KB`);
}

function isKnownPath(path, publishedSlugs) {
  const p = path.replace(/\/+$/, "") || "/";
  if (STATIC_ROUTES.has(p)) return true;
  const [, section, slug, extra] = p.split("/");
  if (extra !== undefined) return false;
  if (section === "services") return SERVICE_SLUGS.includes(slug);
  if (section === "projects") return CASE_SLUGS.includes(slug);
  if (section === "insights") return publishedSlugs.includes(slug);
  return false;
}
