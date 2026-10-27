/**
 * Every public address of the site, in one list. The build writes each one to disk
 * (scripts/prerender.mjs) and the sitemap lists the indexable ones (shared/sitemap.ts),
 * so a newly published Insights article gets both without any further change.
 *
 * Admin screens and the client login are deliberately excluded: they are noindex,
 * they need a signed-in session to show anything, and prerendering them would only
 * publish an empty logged-out state.
 */
import { guidesIndexIsWorthHaving, PUBLISHED_GUIDES } from "./guides.js";
import { SHOWN_ARTICLES } from "./insights.js";
import { GUIDE_REDIRECTS, SITE_SERVICES } from "./site.js";
import { PUBLIC_CASES } from "./work.js";

export function publicRoutes(): string[] {
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
    // Guides appear here as they are published; an unpublished one has no page
    // and no address. `/guides` is written only once it lists more than one.
    ...(guidesIndexIsWorthHaving() ? ["/guides"] : []),
    ...PUBLISHED_GUIDES.map((guide) => `/guides/${guide.slug}`).filter((path) => !GUIDE_REDIRECTS[path]),
    "/contact",
    "/privacy",
    "/about/integrity",
  ];
}
