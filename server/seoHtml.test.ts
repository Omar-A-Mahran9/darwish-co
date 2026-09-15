import { readFileSync } from "fs";
import { describe, expect, it } from "vitest";
import { injectSeo } from "./seoHtml.js";
import { BLOG_ARTICLES, isKnownRoute, resolveSeo } from "../shared/seo.js";
import { LEGACY_ANCHOR_REDIRECTS, SERVICES } from "../shared/services.js";

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

    for (const service of SERVICES) {
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

    expect(titles.size).toBe(SERVICES.length);
    expect(isKnownRoute("/services/not-a-service")).toBe(false);
  });

  it("names the partner as the provider for partner-delivered services", () => {
    const partnered = SERVICES.filter((service) => service.partner);
    expect(partnered.map((service) => service.slug)).toEqual([
      "integrity-anti-corruption",
      "market-research",
    ]);

    for (const service of partnered) {
      const html = injectSeo(SHELL, `/services/${service.slug}`);
      expect(html).toContain(`"name":"${service.partner!.name}"`);
      expect(html).toContain('"subOrganization"');
    }

    for (const service of SERVICES.filter((entry) => !entry.partner)) {
      expect(injectSeo(SHELL, `/services/${service.slug}`)).not.toContain('"subOrganization"');
    }
  });

  it("points every old services anchor at the page that replaced it", () => {
    for (const service of SERVICES) {
      expect(LEGACY_ANCHOR_REDIRECTS[service.legacyAnchor]).toBe(`/services/${service.slug}`);
      expect(isKnownRoute(LEGACY_ANCHOR_REDIRECTS[service.legacyAnchor])).toBe(true);
    }
    expect(Object.keys(LEGACY_ANCHOR_REDIRECTS).sort()).toEqual(
      ["bizdev", "digital-marketing", "grc", "hr", "integrity", "market-research", "strategy"],
    );
  });

  it("lists every service page in the sitemap", () => {
    const sitemap = readFileSync(
      new URL("../client/public/sitemap.xml", import.meta.url),
      "utf-8",
    );
    for (const service of SERVICES) {
      expect(sitemap).toContain(`https://www.darwish-co.com/services/${service.slug}</loc>`);
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

  it("treats trailing slashes and query strings as the same page", () => {
    expect(resolveSeo("/about/")).toEqual(resolveSeo("/about"));
    expect(resolveSeo("/about?utm_source=x")).toEqual(resolveSeo("/about"));
    expect(resolveSeo("/services#grc").canonical).toBe("https://www.darwish-co.com/services");
  });
});
