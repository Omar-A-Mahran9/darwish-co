import { resolveSeo } from "../shared/seo.js";

/**
 * Rewrites the head of the built index.html with the metadata for one route.
 *
 * The site is a single-page app, so every address is served from the same
 * HTML file. Without this, every page would report the homepage's title,
 * description and canonical address to search engines and to AI crawlers,
 * which mostly do not run JavaScript and so never see the client-side update.
 */

const escapeAttribute = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Escapes the one sequence that could close the script element early. */
const escapeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

/** Tags this module owns; stripped before the fresh set is written in. */
const MANAGED_TAG_PATTERNS = [
  /<title>[\s\S]*?<\/title>\s*/gi,
  /<meta\s+name="description"[^>]*>\s*/gi,
  /<meta\s+name="robots"[^>]*>\s*/gi,
  /<meta\s+property="og:[^"]*"[^>]*>\s*/gi,
  /<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi,
  /<link\s+rel="canonical"[^>]*>\s*/gi,
  /<script\s+type="application\/ld\+json"\s+data-seo="page"[\s\S]*?<\/script>\s*/gi,
];

export function injectSeo(html: string, pathname: string): string {
  const seo = resolveSeo(pathname);
  const title = escapeAttribute(seo.title);
  const description = escapeAttribute(seo.description);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:url" content="${escapeAttribute(seo.canonical)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${escapeAttribute(seo.ogImage)}" />`,
    ...(seo.ogImageAlt ? [`<meta property="og:image:alt" content="${escapeAttribute(seo.ogImageAlt)}" />`] : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(seo.ogImage)}" />`,
    ...(seo.ogImageAlt ? [`<meta name="twitter:image:alt" content="${escapeAttribute(seo.ogImageAlt)}" />`] : []),
    `<link rel="canonical" href="${escapeAttribute(seo.canonical)}" />`,
  ];

  if (seo.jsonLd) {
    tags.push(
      `<script type="application/ld+json" data-seo="page">${escapeJsonLd(seo.jsonLd)}</script>`,
    );
  }

  const stripped = MANAGED_TAG_PATTERNS.reduce(
    (current, pattern) => current.replace(pattern, ""),
    html,
  );

  const block = `${tags.join("\n    ")}\n  `;
  return stripped.includes("</head>")
    ? stripped.replace("</head>", `  ${block}</head>`)
    : `${stripped}${block}`;
}
