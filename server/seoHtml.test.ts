import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { injectSeo } from "./seoHtml.js";
import { isKnownRoute, resolveSeo } from "../shared/seo.js";
import { sitemapXml } from "../shared/sitemap.js";
import { GUIDES, PUBLISHED_GUIDES } from "../shared/guides.js";
import { SERVICES } from "../shared/services.js";
import {
  GUIDE_REDIRECTS,
  LEGACY_ANCHOR_REDIRECTS,
  PAGE_REDIRECTS,
  SERVICE_REDIRECTS,
  SITE_SERVICES,
  WITHDRAWN_SERVICES,
} from "../shared/site.js";
import { ARTICLES, SHOWN_ARTICLES } from "../shared/insights.js";
import { ARTICLE_BODIES } from "../shared/articleBodies.js";
import { PUBLIC_CASES } from "../shared/work.js";
import { SERVICE_DETAIL } from "../client/src/site/content/services.js";

const SHELL = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Darwish &amp; Co — homepage title</title>
    <meta name="description" content="Homepage description." />
    <meta property="og:url" content="https://darwish-co.com/" />
    <meta property="og:title" content="Homepage title" />
    <meta name="twitter:title" content="Homepage title" />
    <link rel="canonical" href="https://darwish-co.com/" />
    <script type="application/ld+json">{"@type":"Organization"}</script>
  </head>
  <body><div id="root"></div></body>
</html>`;

const titleOf = (html: string) => html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
const canonicalsOf = (html: string) => html.match(/<link rel="canonical"[^>]*>/g) ?? [];
const descriptionsOf = (html: string) => html.match(/<meta name="description"[^>]*>/g) ?? [];

describe("per-page metadata", () => {
  it("gives every main route its own title, description and canonical address", () => {
    const paths = ["/", "/about", "/services", "/industries", "/projects", "/insights", "/contact"];
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const path of paths) {
      const seo = resolveSeo(path);
      titles.add(seo.title);
      descriptions.add(seo.description);
      expect(seo.canonical).toBe(`https://darwish-co.com${path === "/" ? "/" : path}`);
      expect(seo.description.length).toBeGreaterThanOrEqual(50);
      // 160 is the usual display limit; About keeps its approved description, one character over it.
      expect(seo.description.length).toBeLessThanOrEqual(path === "/about" ? 161 : 160);
      expect(seo.title.length).toBeLessThanOrEqual(80);
    }

    expect(titles.size).toBe(paths.length);
    expect(descriptions.size).toBe(paths.length);
  });

  it("replaces the shell's head rather than adding a second copy of each tag", () => {
    const html = injectSeo(SHELL, "/services");

    expect(titleOf(html)).toContain("Services | Darwish");
    expect(canonicalsOf(html)).toHaveLength(1);
    expect(descriptionsOf(html)).toHaveLength(1);
    expect(html).toContain('href="https://darwish-co.com/services"');
    expect(html).not.toContain("Homepage description.");
    // The site-wide structured data in the shell is left alone.
    expect(html).toContain('{"@type":"Organization"}');
  });

  it("escapes ampersands and quotes in the injected head", () => {
    const html = injectSeo(SHELL, "/about");
    expect(html).toContain("Darwish &amp; Co");
    expect(titleOf(html)).not.toMatch(/ & /);
  });

  it("publishes an article only once it is written, and indexes only published ones", () => {
    for (const article of SHOWN_ARTICLES) {
      const path = `/insights/${article.slug}`;
      const seo = resolveSeo(path);
      expect(isKnownRoute(path)).toBe(true);
      expect(seo.canonical).toBe(`https://darwish-co.com${path}`);
      expect(seo.ogType).toBe("article");
      // Only a published article, with its approved text, is indexed.
      expect(seo.robots).toBe(article.status === "published" ? "index, follow" : "noindex, nofollow");
      expect(injectSeo(SHELL, path).includes('"@type":"Article"')).toBe(article.status === "published");
    }
    // A published article must have its approved text.
    for (const article of ARTICLES.filter((entry) => entry.status === "published")) {
      expect(ARTICLE_BODIES[article.slug]).toBeTruthy();
    }
    // Published-only by default: unwritten articles have no page at all.
    for (const article of ARTICLES.filter((entry) => entry.status !== "published")) {
      expect(isKnownRoute(`/insights/${article.slug}`)).toBe(false);
    }
    expect(isKnownRoute("/insights/not-an-article")).toBe(false);
  });

  it("gives each case study its own metadata", () => {
    for (const study of PUBLIC_CASES) {
      const path = `/projects/${study.slug}`;
      const seo = resolveSeo(path);
      expect(isKnownRoute(path)).toBe(true);
      expect(seo.robots).toBe("index, follow");
      expect(seo.description.length).toBeGreaterThanOrEqual(50);
      // The approved card text is used as written; the furniture case is one character over 160.
      expect(seo.description.length).toBeLessThanOrEqual(161);
    }
    expect(isKnownRoute("/projects/illustrative-expansion")).toBe(false);
  });

  it("keeps pages still waiting for approved text out of search results", () => {
    for (const path of ["/about/integrity"]) {
      expect(isKnownRoute(path)).toBe(true);
      expect(resolveSeo(path).robots).toBe("noindex, nofollow");
    }
  });

  it("lists the approved privacy policy in search results and the sitemap", () => {
    expect(resolveSeo("/privacy").robots).toBe("index, follow");
    expect(sitemapXml()).toContain("https://darwish-co.com/privacy</loc>");
  });

  it("gives each service page its own metadata and service structured data", () => {
    const titles = new Set<string>();

    for (const service of SITE_SERVICES) {
      const path = `/services/${service.slug}`;
      const seo = resolveSeo(path);
      titles.add(seo.title);

      // The brand suffix is dropped when it would push the title past the ~60 characters Google shows.
      const full = `${service.title} | Darwish & Co.`;
      expect(seo.title).toBe(full.length <= 60 ? full : service.title);
      expect(seo.canonical).toBe(`https://darwish-co.com${path}`);
      expect(seo.description.length).toBeGreaterThanOrEqual(50);
      expect(seo.description.length).toBeLessThanOrEqual(160);
      expect(isKnownRoute(path)).toBe(true);

      const html = injectSeo(SHELL, path);
      expect(html).toContain(`href="https://darwish-co.com${path}"`);
      expect(html).toContain('"@type":"Service"');
      expect(html).toContain('"@type":"FAQPage"');
      expect(html).toContain('"@type":"BreadcrumbList"');
      // Every question on the page is exposed as structured data.
      const faqs = SERVICE_DETAIL[service.slug].faqs as [string, string][];
      expect(faqs.length).toBeGreaterThanOrEqual(3);
      for (const [question] of faqs) {
        expect(html).toContain(JSON.stringify(question).slice(1, -1));
      }
      // Partner expertise is the partner's; the record names Darwish & Co. only.
      expect(html).toContain('"provider":{"@id":"https://darwish-co.com/#organization"}');
    }

    expect(titles.size).toBe(SITE_SERVICES.length);
    expect(isKnownRoute("/services/not-a-service")).toBe(false);
  });

  it("sends every address that existed before the redesign somewhere real", () => {
    expect(Object.keys(LEGACY_ANCHOR_REDIRECTS).sort()).toEqual(["bizdev", "grc", "hr", "integrity", "market-research", "strategy"]);
    expect(Object.keys(SERVICE_REDIRECTS).sort()).toEqual([
      "/services/corporate-family-governance",
      "/services/growth-market-entry",
      "/services/integrity-anti-corruption",
      "/services/people-organisation",
      "/services/risk-compliance-integrity",
      "/services/strategy-execution",
    ]);
    expect(PAGE_REDIRECTS).toEqual({ "/partners": "/about#partners", "/corporate-partners": "/about#partners", "/blog": "/insights" });

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
      ...Object.values(PAGE_REDIRECTS),
    ]) {
      expect(isKnownRoute(destination)).toBe(true);
      expect(resolveSeo(destination).robots).toBe("index, follow");
    }

    // A current page is never redirected away, and nothing redirects to a page that was itself replaced.
    for (const service of SITE_SERVICES) expect(SERVICE_REDIRECTS[`/services/${service.slug}`]).toBeUndefined();
    for (const destination of Object.values(SERVICE_REDIRECTS)) {
      expect(SERVICE_REDIRECTS[destination]).toBeUndefined();
    }
    for (const path of Object.keys(PAGE_REDIRECTS)) expect(isKnownRoute(path)).toBe(false);
  });

  it("keeps an unpublished service off the site entirely", () => {
    const unpublished = SERVICES.filter((service) => !service.published);
    expect(unpublished.map((service) => service.slug)).toEqual(["ai-governance"]);

    const sitemap = sitemapXml();
    for (const service of unpublished) {
      const path = `/services/${service.slug}`;
      expect(isKnownRoute(path)).toBe(false);
      expect(resolveSeo(path).robots).toBe("noindex, nofollow");
      expect(sitemap).not.toContain(path);
    }
  });

  it("lists every service page in the sitemap", () => {
    const sitemap = sitemapXml();
    for (const service of SITE_SERVICES) {
      expect(sitemap).toContain(`https://darwish-co.com/services/${service.slug}</loc>`);
    }
    // Redirected and noindex addresses stay out of it.
    for (const path of [...Object.keys(SERVICE_REDIRECTS), ...Object.keys(PAGE_REDIRECTS), "/growth-360", "/about/integrity"]) {
      expect(sitemap).not.toContain(`https://darwish-co.com${path}</loc>`);
    }
  });

  it("claims delivery in Egypt only, whatever the target audience", () => {
    for (const service of SITE_SERVICES) {
      const html = injectSeo(SHELL, `/services/${service.slug}`);
      expect(html).toContain('"areaServed":{"@type":"Country","name":"Egypt"}');
      expect(html).not.toContain('"areaServed":"MENA"');
    }
  });

  it("references one organization record rather than restating it per page", () => {
    const orgId = '"@id":"https://darwish-co.com/#organization"';
    expect(injectSeo(SHELL, "/about")).toContain(orgId);
    for (const service of SITE_SERVICES) {
      expect(injectSeo(SHELL, `/services/${service.slug}`)).toContain(orgId);
    }
  });

  it("describes the firm once, with the identity facts search engines and assistants match on", () => {
    const html = readFileSync(new URL("../client/index.html", import.meta.url), "utf-8");
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1])["@graph"];
    const org = graph.find((n: { "@id": string }) => n["@id"] === "https://darwish-co.com/#organization");
    const founder = graph.find((n: { "@id": string }) => n["@id"] === "https://darwish-co.com/#fouad-darwish");
    expect(org["@type"]).toBe("ProfessionalService");
    expect(org.legalName).toBe("Fouad Darwish Business & Consulting Development");
    expect(org.address.addressLocality).toBe("New Cairo");
    expect(org.telephone).toBe("+201101101090");
    expect(org.founder).toEqual({ "@id": founder["@id"] });
    expect(org.knowsAbout).toEqual(SITE_SERVICES.map((s) => s.title));
    expect(founder).toMatchObject({ "@type": "Person", name: "Fouad Darwish", worksFor: { "@id": org["@id"] } });
  });

  it("credits articles to their named author and gives them their cover image", () => {
    for (const article of SHOWN_ARTICLES.filter((a) => a.status === "published")) {
      const ld = resolveSeo(`/insights/${article.slug}`).jsonLd as Record<string, unknown>;
      if (article.author === "Fouad Darwish") expect(ld.author).toEqual({ "@id": "https://darwish-co.com/#fouad-darwish" });
      if (article.cover) expect(ld.image).toBe(`https://darwish-co.com${article.cover}`);
    }
  });

  it("keeps every indexed title within the ~60 characters Google shows", () => {
    const routes = [
      ...SITE_SERVICES.map((s) => `/services/${s.slug}`),
      ...SHOWN_ARTICLES.filter((a) => a.status === "published").map((a) => `/insights/${a.slug}`),
      "/about",
    ];
    for (const route of routes) expect(resolveSeo(route).title.length, route).toBeLessThanOrEqual(60);
    for (const article of SHOWN_ARTICLES.filter((a) => a.status === "published")) {
      expect(resolveSeo(`/insights/${article.slug}`).description.length, article.slug).toBeLessThanOrEqual(160);
    }
  });

  it("shares pages with the designed image, and articles with their cover", () => {
    for (const route of ["/", "/about", "/contact", `/services/${SITE_SERVICES[0].slug}`]) {
      const html = injectSeo(SHELL, route);
      expect(html).toContain('<meta property="og:image" content="https://darwish-co.com/images/social-default.jpg" />');
      expect(html).toContain('<meta property="og:image:alt" content="Darwish &amp; Co.: A wise word in the right moment.');
    }
    const article = SHOWN_ARTICLES.find((a) => a.status === "published" && a.cover)!;
    const seo = resolveSeo(`/insights/${article.slug}`);
    expect(seo.ogImage).toBe(`https://darwish-co.com${article.cover}`);
    expect(seo.ogImageAlt).toBe(article.coverAlt);
  });

  it("marks up the homepage FAQ", () => {
    const ld = resolveSeo("/").jsonLd as { "@type": string; mainEntity: unknown[] };
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity.length).toBeGreaterThan(0);
  });

  it("keeps private and unknown routes out of search results", () => {
    for (const path of ["/client-login", "/admin/inbox", "/admin/client-access", "/does-not-exist", "/insights/not-an-article"]) {
      expect(resolveSeo(path).robots).toBe("noindex, nofollow");
      expect(injectSeo(SHELL, path)).toContain('<meta name="robots" content="noindex, nofollow" />');
    }

    expect(isKnownRoute("/about")).toBe(true);
    expect(isKnownRoute("/insights")).toBe(true);
    expect(isKnownRoute("/does-not-exist")).toBe(false);
  });

  it("gives an unpublished guide no address at all", () => {
    const sitemap = sitemapXml();

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
    const sitemap = sitemapXml();

    // Guides replaced by an Insights article redirect there and are not pages of their own.
    for (const [from, to] of Object.entries(GUIDE_REDIRECTS)) {
      expect(isKnownRoute(from)).toBe(false);
      expect(sitemap).not.toContain(`https://darwish-co.com${from}</loc>`);
      expect(isKnownRoute(to)).toBe(true);
      expect(resolveSeo(to).robots).toBe("index, follow");
    }

    for (const guide of PUBLISHED_GUIDES.filter((entry) => !GUIDE_REDIRECTS[`/guides/${entry.slug}`])) {
      const path = `/guides/${guide.slug}`;
      const seo = resolveSeo(path);

      expect(isKnownRoute(path)).toBe(true);
      expect(seo.robots).toBe("index, follow");
      expect(seo.ogType).toBe("article");
      expect(seo.canonical).toBe(`https://darwish-co.com${path}`);
      expect(seo.description.length).toBeGreaterThanOrEqual(50);
      expect(seo.description.length).toBeLessThanOrEqual(160);
      expect(sitemap).toContain(`https://darwish-co.com${path}</loc>`);

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
    expect(resolveSeo("/services#grc").canonical).toBe("https://darwish-co.com/services");
  });
});

describe("llms.txt", () => {
  it("lists every service and published article with the firm's identity facts", async () => {
    const { llmsTxt } = await import("../shared/llms.js");
    const text = llmsTxt();
    expect(text.startsWith("# Darwish & Co.\n\n> ")).toBe(true);
    expect(text).toContain("Fouad Darwish Business & Consulting Development");
    for (const s of SITE_SERVICES) expect(text).toContain(`https://darwish-co.com/services/${s.slug})`);
    for (const a of SHOWN_ARTICLES.filter((x) => x.status === "published")) expect(text).toContain(`https://darwish-co.com/insights/${a.slug})`);
    for (const a of SHOWN_ARTICLES.filter((x) => x.status !== "published")) expect(text).not.toContain(`/insights/${a.slug})`);
  });
});
