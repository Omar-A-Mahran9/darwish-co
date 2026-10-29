import { renderToString } from "react-dom/server";
import App from "./App";
import { resolveSeo } from "@shared/seo";
import { publicRoutes } from "@shared/routes";
import { sitemapXml } from "@shared/sitemap";
import { llmsTxt } from "@shared/llms";
import { injectSeo } from "../../server/seoHtml";

/**
 * Build-time rendering. `scripts/prerender.mjs` calls this once per address and
 * writes the result to disk, so the server can send a finished page instead of
 * an empty shell — which is what crawlers that do not run JavaScript receive.
 */

/** Renders one route to HTML. */
export function render(pathname: string): string {
  return renderToString(<App ssrPath={pathname} />);
}

/** Every address worth writing to disk (shared/routes.ts). */
export const prerenderRoutes = publicRoutes;

export { injectSeo, llmsTxt, resolveSeo, sitemapXml };
