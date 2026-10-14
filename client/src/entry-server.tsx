import { renderToString } from "react-dom/server";
import App from "./App";
import { BLOG_ARTICLES, resolveSeo } from "@shared/seo";
import { SITE_SERVICES } from "./site/nav";
import { PUBLIC_CASES } from "./site/content/work";
import { SHOWN_ARTICLES } from "./pages/Insights";
import { guidesIndexIsWorthHaving, PUBLISHED_GUIDES } from "@shared/guides";
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
    ...SITE_SERVICES.map((service) => `/services/${service.slug}`),
    "/industries",
    "/projects",
    ...PUBLIC_CASES.map((c) => `/projects/${c.slug}`),
    "/insights",
    ...SHOWN_ARTICLES.map((a) => `/insights/${a.slug}`),
    "/partners",
    "/corporate-partners",
    "/blog",
    ...BLOG_ARTICLES.map((article) => `/blog/${article.slug}`),
    // Guides appear here as they are published; an unpublished one has no page
    // and no address. `/guides` is written only once it lists more than one.
    ...(guidesIndexIsWorthHaving() ? ["/guides"] : []),
    ...PUBLISHED_GUIDES.map((guide) => `/guides/${guide.slug}`),
    "/contact",
    "/privacy",
    "/about/integrity",
    "/growth-360",
  ];
}

export { injectSeo, resolveSeo };
