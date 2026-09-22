/**
 * Builds a shareable preview of the site and, unless told not to, publishes it
 * to Cloudflare Pages.
 *
 * The preview is the ordinary production build with three additions, none of
 * which belong in the real site:
 *
 *   - every page marked "do not index", plus a robots.txt refusing all
 *     crawlers, so a preview can never compete with the live site in search
 *     results or be picked up by an AI crawler;
 *   - a catch-all rule, so an unknown address shows the site rather than the
 *     host's own 404 page;
 *   - the host's build folder left out.
 *
 * Usage:
 *   npm run share              build and publish, printing the link
 *   npm run share -- --local   build only, leaving the folder ready to drag
 *
 * Publishing needs Cloudflare access once: `npx wrangler login` opens a browser
 * and asks you to approve. After that this command needs no further sign-in.
 */

import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync, statSync } from "node:fs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const builtSite = join(projectRoot, "dist", "public");
const previewDir = join(projectRoot, "dist", "preview");
const projectName = "darwish-preview";
const localOnly = process.argv.includes("--local");

const run = (command, args) =>
  execFileSync(command, args, { cwd: projectRoot, stdio: "inherit" });

/** Every index.html below `dir`. */
function pages(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) found.push(...pages(path));
    else if (entry === "index.html") found.push(path);
  }
  return found;
}

console.log("[preview] building…");
run("npm", ["run", "build"]);

console.log("[preview] preparing the preview copy…");
rmSync(previewDir, { recursive: true, force: true });
mkdirSync(previewDir, { recursive: true });
cpSync(builtSite, previewDir, {
  recursive: true,
  // The hosting platform's own build folder is not part of the site.
  filter: (source) => !source.includes("__manus__"),
});

const noindex = '<meta name="robots" content="noindex, nofollow">';
let marked = 0;
for (const page of pages(previewDir)) {
  const html = readFileSync(page, "utf-8");
  if (html.includes(noindex)) continue;
  writeFileSync(page, html.replace("</head>", `    ${noindex}\n  </head>`), "utf-8");
  marked += 1;
}

writeFileSync(join(previewDir, "robots.txt"), "User-agent: *\nDisallow: /\n", "utf-8");
writeFileSync(join(previewDir, "_redirects"), "/*    /index.html   200\n", "utf-8");
cpSync(join(previewDir, "index.html"), join(previewDir, "404.html"));

console.log(`[preview] ${marked} pages marked "do not index"`);

if (localOnly) {
  console.log(`[preview] ready to drag: ${previewDir}`);
  process.exit(0);
}

console.log("[preview] publishing to Cloudflare Pages…");
run("npx", [
  "--yes",
  "wrangler@4",
  "pages",
  "deploy",
  previewDir,
  `--project-name=${projectName}`,
  "--commit-dirty=true",
]);
