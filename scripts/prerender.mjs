/**
 * Writes a finished HTML file for every public address.
 *
 * Runs after the two Vite builds: the browser build produces dist/public, and
 * the server build produces dist/server/entry-server.js. Each route is rendered
 * once, given its own head, and written to disk so the server can hand a
 * complete page to anyone who asks — including crawlers that never run
 * JavaScript, which is most AI crawlers.
 *
 * A route that fails to render is skipped with a warning rather than failing the
 * build: the server still has the shell to fall back on, so the site degrades to
 * its previous behaviour for that page instead of breaking.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import Beasties from "beasties";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(projectRoot, "dist", "public");
const serverEntry = join(projectRoot, "dist", "server", "entry-server.js");

const { render, prerenderRoutes, injectSeo, sitemapXml, llmsTxt, shareImageJobs } = await import(pathToFileURL(serverEntry).href);

const shell = readFileSync(join(publicDir, "index.html"), "utf-8");
const routes = prerenderRoutes();

/*
 * Speed on phones (PageSpeed, 10 Nov 2026). Each page carries the CSS rules its own markup uses inline in the
 * head, and the full stylesheet loads without blocking, so the browser can draw the page as soon as the HTML
 * arrives instead of waiting for the stylesheet and, on slow connections, the site's code. Beasties matches
 * rules against the page's elements; rules for states that script adds later (open menus, animations) come
 * with the full stylesheet, which arrives before they are needed. The cookie banner and the armed motion
 * states are added by script straight after load, so their rules are always inlined too: if the code runs
 * before the full stylesheet arrives, they still look right.
 */
const beasties = new Beasties({
  allowRules: [/cookie-banner|\.cb-/, /data-ready|data-armed/],
  path: publicDir,
  publicPath: "/",
  preload: "media",
  noscriptFallback: true,
  inlineFonts: false,
  pruneSource: false,
  reduceInlineStyles: false,
  logLevel: "warn",
});

/*
 * The homepage's hero image is the element PageSpeed times. On phones, asking for it first thing in the head,
 * before Tag Manager, the stylesheet and the code, gives it the head start on slow connections. The media query
 * matches the phone <source> of the hero's <picture> in client/src/pages/Home.tsx. Desktop needs no head start
 * (its image is already high priority and desktop scores well), and a second, desktop-only preload risked a
 * phone fetching both versions.
 */
const HERO_PRELOAD =
  '<link rel="preload" as="image" href="/media/hero-poster-mobile.webp" media="(max-width: 767px)" fetchpriority="high" />';
const withHeroPreload = (html) => html.replace(/(<meta charset="UTF-8" \/>)/, `$1\n    ${HERO_PRELOAD}`);

/** "/" becomes index.html; "/about" becomes about/index.html. */
const fileFor = (route) =>
  route === "/" ? join(publicDir, "index.html") : join(publicDir, route.slice(1), "index.html");

let written = 0;
const failures = [];

for (const route of routes) {
  try {
    const body = render(route);
    let html = injectSeo(shell, route).replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`,
    );

    if (!html.includes('<div id="root">')) {
      throw new Error("the shell no longer contains the root element to fill");
    }

    if (route === "/") html = withHeroPreload(html);
    html = await beasties.process(html);

    const file = fileFor(route);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html, "utf-8");
    written += 1;
  } catch (error) {
    failures.push({ route, message: error instanceof Error ? error.message : String(error) });
  }
}

console.log(`[prerender] wrote ${written} of ${routes.length} pages`);

// The sitemap comes from the same address list, so a newly published article is always in it.
const sitemap = sitemapXml();
writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf-8");
console.log(`[prerender] wrote sitemap.xml with ${(sitemap.match(/<url>/g) || []).length} addresses`);

// llms.txt: the same facts and pages in plain Markdown for AI assistants (shared/llms.ts).
writeFileSync(join(publicDir, "llms.txt"), llmsTxt(), "utf-8");
console.log("[prerender] wrote llms.txt");

// JPEG share images for article covers (shared/seo.ts shareImageFor): LinkedIn does not reliably show
// WebP previews. 1200x630 is the shape social sites crop to. A missing cover fails the build, because
// the article's page already points at the file.
const jobs = shareImageJobs();
for (const { source, target } of jobs) {
  const out = join(publicDir, target.slice(1));
  mkdirSync(dirname(out), { recursive: true });
  await sharp(join(publicDir, source.slice(1)))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
}
console.log(`[prerender] wrote ${jobs.length} JPEG share images`);

for (const failure of failures) {
  console.warn(`[prerender] skipped ${failure.route}: ${failure.message}`);
}
