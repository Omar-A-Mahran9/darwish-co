import { readFileSync } from "fs";
import { describe, expect, it } from "vitest";
import { injectSeo } from "./seoHtml.js";
import { BLOG_ARTICLES, isKnownRoute, resolveSeo } from "../shared/seo.js";
import { GUIDES, PUBLISHED_GUIDES } from "../shared/guides.js";
import {
  LEGACY_ANCHOR_REDIRECTS,
  PUBLISHED_SERVICES,
  SERVICE_REDIRECTS,
  SERVICES,
  WITHDRAWN_SERVICES,
} from "../shared/services.js";

const SHELL = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Darwish &amp; Co — homepage title</title>
    <meta name="description" content="Homepage description." />
    <meta property="og:url" content="https://www.darwish-co.com/" />
    <meta property="og:title" content="Homepage title" />
    <meta name="twitter:title" content="Homepage title" />
    <link rel="canonical" href="https://www.darwish-co.com/" />
    <script type="application/ld+json">{"@type":"Organization"}</script>
  </head>
  <body><div id="root"></div></body>
</html>`;

const titleOf = (html: string) => html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
const canonicalsOf = (html: string) => html.match(/<link rel="canonical"[^>]*>/g) ?? [];
const descriptionsOf = (html: string) => html.match(/<meta name="description"[^>]*>/g) ?? [];

describe("per-page metadata", () => {
  it("gives every main route its own title, description and canonical address", () => {
    const paths = ["/", "/about", "/services", "/projects", "/partners", "/corporate-partners", "/blog", "/contact"];
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const path of paths) {
      const seo = resolveSeo(path);
      titles.add(seo.title);
      descriptions.add(seo.description);
      expect(seo.canonical).toBe(`https://www.darwish-co.com${path === "/" ? "/" : path}`);
      expect(seo.description.length).toBeGreaterThanOrEqual(50);
      // 160 is the usual display limit; the homepage keeps the approved
      // company description, which is one character over it.
      expect(seo.description.length).toBeLessThanOrEqual(path === "/" ? 161 : 160);
      expect(seo.title.length).toBeLessThanOrEqual(80);
    }

    expect(titles.size).toBe(paths.length);
    expect(descriptions.size).toBe(paths.length);
  });

  it("replaces the shell's head rather than adding a second copy of each tag", () => {
    const html = injectSeo(SHELL, "/services");

    expect(titleOf(html)).toContain("Consulting Services");
    expect(canonicalsOf(html)).toHaveLength(1);
    expect(descriptionsOf(html)).toHaveLength(1);
    expect(html).toContain('href="https://www.darwish-co.com/services"');
    expect(html).not.toContain("Homepage description.");
    // The site-wide structured data in the shell is left alone.
    expect(html).toContain('{"@type":"Organization"}');
  });

  it("escapes ampersands and quotes in the injected head", () => {
    const html = injectSeo(SHELL, "/about");
    expect(html).toContain("Darwish &amp; Co");
    expect(titleOf(html)).not.toMatch(/ & /);
  });

  it("describes each article with its own metadata and article structured data", () => {
    for (const article of BLOG_ARTICLES) {
      const html = injectSeo(SHELL, `/blog/${article.slug}`);
      expect(titleOf(html)).toContain(article.title.split(" ")[0]);
      expect(html).toContain(`href="https://www.darwish-co.com/blog/${article.slug}"`);
      expect(html).toContain('<meta property="og:type" content="article" />');
      expect(html).toContain('data-seo="page"');
      expect(html).toContain('"@type":"Article"');
      expect(html).toContain(`https://www.darwish-co.com${article.image}`);
    }
  });

  it("gives each service page its own metadata and service structured data", () => {
    const titles = new Set<string>();

    for (const service of PUBLISHED_SERVICES) {
      const path = `/services/${service.slug}`;
      const seo = resolveSeo(path);
      titles.add(seo.title);

      expect(seo.canonical).toBe(`https://www.darwish-co.com${path}`);
      expect(seo.description.length).toBeGreaterThanOrEqual(50);
      expect(seo.description.length).toBeLessThanOrEqual(160);
      expect(isKnownRoute(path)).toBe(true);

      const html = injectSeo(SHELL, path);
      expect(html).toContain(`href="https://www.darwish-co.com${path}"`);
      expect(html).toContain('"@type":"Service"');
      expect(html).toContain('"@type":"FAQPage"');
      expect(html).toContain('"@type":"BreadcrumbList"');
      // Every question on the page is exposed as structured data.
      expect(service.faqs.length).toBeGreaterThanOrEqual(3);
      for (const faq of service.faqs) {
        expect(html).toContain(JSON.stringify(faq.question).slice(1, -1));
      }
    }

    expect(titles.size).toBe(PUBLISHED_SERVICES.length);
    expect(isKnownRoute("/services/not-a-service")).toBe(false);
  });

  it("names the partner as the provider for partner-delivered services", () => {
    const partnered = PUBLISHED_SERVICES.filter((service) => service.partner);
    expect(partnered.map((service) => service.slug)).toEqual([
      "risk-compliance-integrity",
      "growth-market-entry",
    ]);

    for (const service of partnered) {
      const html = injectSeo(SHELL, `/services/${service.slug}`);
      // A partner is a second named provider, never folded into Darwish & Co.
      expect(html).toContain(`"name":"${service.partner!.name}"`);
      expect(html).toContain(`"url":"${service.partner!.url}"`);
      expect(html).not.toContain('"subOrganization"');
      expect(html).not.toContain('"parentOrganization"');
    }

    for (const service of PUBLISHED_SERVICES.filter((entry) => !entry.partner)) {
      const html = injectSeo(SHELL, `/services/${service.slug}`);
      expect(html).toContain('"provider":{"@id":"https://www.darwish-co.com/#organization"}');
    }
  });

  it("sends every address that existed before the restructure somewhere real", () => {
    // Anchors from the original single services page.
    expect(Object.keys(LEGACY_ANCHOR_REDIRECTS).sort()).toEqual([
      "bizdev",
      "digital-marketing",
      "grc",
      "hr",
      "integrity",
      "market-research",
      "strategy",
    ]);

    // Slugs from the first split, 16 Sep 2026, that have a real successor.
    expect(Object.keys(SERVICE_REDIRECTS).sort()).toEqual([
      "/services/business-development",
      "/services/governance-risk-compliance",
      "/services/human-resources",
      "/services/integrity-anti-corruption",
      "/services/market-research",
      "/services/strategy-performance",
    ]);

    // Withdrawn with no successor: answered as gone, never redirected to a hub.
    expect(Object.keys(WITHDRAWN_SERVICES)).toEqual(["/services/digital-marketing"]);
    for (const path of Object.keys(WITHDRAWN_SERVICES)) {
      expect(SERVICE_REDIRECTS[path]).toBeUndefined();
      expect(isKnownRoute(path)).toBe(false);
      expect(resolveSeo(path).robots).toBe("noindex, nofollow");
    }

    for (const destination of [
      ...Object.values(LEGACY_ANCHOR_REDIRECTS),
      ...Object.values(SERVICE_REDIRECTS),
    ]) {
      expect(isKnownRoute(destination)).toBe(true);
      expect(resolveSeo(destination).robots).toBe("index, follow");
    }

    // Nothing redirects to a page that was itself replaced.
    for (const destination of Object.values(SERVICE_REDIRECTS)) {
      expect(SERVICE_REDIRECTS[destination]).toBeUndefined();
    }
  });

  it("keeps an unpublished service off the site entirely", () => {
    const unpublished = SERVICES.filter((service) => !service.published);
    expect(unpublished.map((service) => service.slug)).toEqual(["ai-governance"]);

    const sitemap = readFileSync(new URL("../client/public/sitemap.xml", import.meta.url), "utf-8");
    for (const service of unpublished) {
      const path = `/services/${service.slug}`;
      expect(isKnownRoute(path)).toBe(false);
      expect(resolveSeo(path).robots).toBe("noindex, nofollow");
      expect(sitemap).not.toContain(path);
    }
  });

  it("lists every service page in the sitemap", () => {
    const sitemap = readFileSync(
      new URL("../client/public/sitemap.xml", import.meta.url),
      "utf-8",
    );
    for (const service of PUBLISHED_SERVICES) {
      expect(sitemap).toContain(`https://www.darwish-co.com/services/${service.slug}</loc>`);
    }
  });

  it("never puts an unconfirmed delivery lead into structured data", () => {
    for (const service of PUBLISHED_SERVICES) {
      const html = injectSeo(SHELL, `/services/${service.slug}`);
      // The page shows a visible "needs delivery lead" notice; the machine-readable
      // record stays silent rather than naming nobody.
      expect(html).not.toContain("Needs delivery lead");
      expect(html).not.toContain('"employee"');
      if (!service.deliveryLead) {
        expect(html).not.toContain('"provider":{"@type":"Person"');
      }
    }
  });

  it("claims delivery in Egypt only, whatever the target audience", () => {
    for (const service of PUBLISHED_SERVICES) {
      const html = injectSeo(SHELL, `/services/${service.slug}`);
      expect(html).toContain('"areaServed":{"@type":"Country","name":"Egypt"}');
      expect(html).not.toContain('"areaServed":"MENA"');
    }
  });

  it("references one organization record rather than restating it per page", () => {
    const orgId = '"@id":"https://www.darwish-co.com/#organization"';
    expect(injectSeo(SHELL, "/about")).toContain(orgId);
    for (const service of PUBLISHED_SERVICES) {
      expect(injectSeo(SHELL, `/services/${service.slug}`)).toContain(orgId);
    }
  });

  it("keeps private and unknown routes out of search results", () => {
    for (const path of ["/client-login", "/admin/inbox", "/admin/client-access", "/does-not-exist", "/blog/not-an-article"]) {
      expect(resolveSeo(path).robots).toBe("noindex, nofollow");
      expect(injectSeo(SHELL, path)).toContain('<meta name="robots" content="noindex, nofollow" />');
    }

    expect(isKnownRoute("/about")).toBe(true);
    expect(isKnownRoute(`/blog/${BLOG_ARTICLES[0].slug}`)).toBe(true);
    expect(isKnownRoute("/blog/not-an-article")).toBe(false);
    expect(isKnownRoute("/does-not-exist")).toBe(false);
  });

  it("gives an unpublished guide no address at all", () => {
    const sitemap = readFileSync(new URL("../client/public/sitemap.xml", import.meta.url), "utf-8");

    for (const guide of GUIDES.filter((entry) => !entry.published)) {
      const path = `/guides/${guide.slug}`;
      expect(isKnownRoute(path)).toBe(false);
      expect(resolveSeo(path).robots).toBe("noindex, nofollow");
      expect(sitemap).not.toContain(path);
    }

    // `/guides` is an index, so it waits until there is more than one to list —
    // and once it exists it must be a real page, not a not-found shell.
    expect(isKnownRoute("/guides")).toBe(PUBLISHED_GUIDES.length > 1);
    if (PUBLISHED_GUIDES.length > 1) {
      expect(resolveSeo("/guides").robots).toBe("index, follow");
    }
  });

  it("publishes a guide with its own metadata, breadcrumb and cluster links", () => {
    const sitemap = readFileSync(new URL("../client/public/sitemap.xml", import.meta.url), "utf-8");

    for (const guide of PUBLISHED_GUIDES) {
      const path = `/guides/${guide.slug}`;
      const seo = resolveSeo(path);

      expect(isKnownRoute(path)).toBe(true);
      expect(seo.robots).toBe("index, follow");
      expect(seo.ogType).toBe("article");
      expect(seo.canonical).toBe(`https://www.darwish-co.com${path}`);
      expect(seo.description.length).toBeGreaterThanOrEqual(50);
      expect(seo.description.length).toBeLessThanOrEqual(160);
      expect(sitemap).toContain(`https://www.darwish-co.com${path}</loc>`);

      const html = injectSeo(SHELL, path);
      expect(html).toContain('"@type":"BreadcrumbList"');
      expect(html).toContain('"@type":"Article"');

      // The trail the page shows is the trail the structured data states:
      // Home, then the library, then the guide, then the page.
      expect(html).toContain('"name":"Guides"');

      // A spoke says which guide it belongs to — but only once that hub is
      // itself published. A spoke written first must not point at a page that
      // does not exist.
      const hubPublished =
        guide.kind === "spoke" && PUBLISHED_GUIDES.some((entry) => entry.slug === guide.hub);
      expect(html.includes('"isPartOf"')).toBe(hubPublished);
    }
  });

  it("treats trailing slashes and query strings as the same page", () => {
    expect(resolveSeo("/about/")).toEqual(resolveSeo("/about"));
    expect(resolveSeo("/about?utm_source=x")).toEqual(resolveSeo("/about"));
    expect(resolveSeo("/services#grc").canonical).toBe("https://www.darwish-co.com/services");
  });
});
