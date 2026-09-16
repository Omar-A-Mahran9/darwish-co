import { renderToString } from "react-dom/server";
import App from "./App";
import { BLOG_ARTICLES, resolveSeo } from "@shared/seo";
import { PUBLISHED_SERVICES } from "@shared/services";
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

/**
 * Every address worth writing to disk. Admin screens and the client login are
 * deliberately excluded: they are noindex, they need a signed-in session to show
 * anything, and prerendering them would only publish an empty logged-out state.
 */
export function prerenderRoutes(): string[] {
  return [
    "/",
    "/about",
    "/services",
    ...PUBLISHED_SERVICES.map((service) => `/services/${service.slug}`),
    "/projects",
    "/partners",
    "/corporate-partners",
    "/blog",
    ...BLOG_ARTICLES.map((article) => `/blog/${article.slug}`),
    "/contact",
  ];
}

export { injectSeo, resolveSeo };
