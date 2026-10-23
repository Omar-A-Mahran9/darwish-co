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

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(projectRoot, "dist", "public");
const serverEntry = join(projectRoot, "dist", "server", "entry-server.js");

const { render, prerenderRoutes, injectSeo } = await import(pathToFileURL(serverEntry).href);

const shell = readFileSync(join(publicDir, "index.html"), "utf-8");
const routes = prerenderRoutes();

/** "/" b.   ecomes index.html; "/about" becomes about/index.html. */
const fileFor = (route) =>
  route === "/" ? join(publicDir, "index.html") : join(publicDir, route.slice(1), "index.html");

let written = 0;
const failures = [];

for (const route of routes) {
  try {
    const body = render(route);
    const html = injectSeo(shell, route).replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`,
    );

    if (!html.includes('<div id="root">')) {
      throw new Error("the shell no longer contains the root element to fill");
    }

    const file = fileFor(route);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html, "utf-8");
    written += 1;
  } catch (error) {
    failures.push({ route, message: error instanceof Error ? error.message : String(error) });
  }
}

console.log(`[prerender] wrote ${written} of ${routes.length} pages`);

for (const failure of failures) {
  console.warn(`[prerender] skipped ${failure.route}: ${failure.message}`);
}
