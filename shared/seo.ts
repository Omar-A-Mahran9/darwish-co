/**
 * Per-page search and social metadata.
 *
 * One source of truth shared by the browser (client/src/hooks/useSeo.ts, which
 * updates the document head on every route change) and the Express server,
 * which injects the same values into index.html before it is sent. The server
 * side is what crawlers and AI assistants that do not run JavaScript see.
 */

import { SITE_SERVICES, WITHDRAWN_SERVICES, GUIDE_REDIRECTS } from "./site.js";
import { PUBLIC_CASES } from "./work.js";
import { SHOWN_ARTICLES, TOPICS } from "./insights.js";
import { SERVICE_DETAIL } from "../client/src/site/content/services.js";
import { ABOUT } from "../client/src/site/content/about.js";
import { FAQS } from "../client/src/site/content/faqs.js";
import {
  getGuide,
  groupOf,
  guideName,
  guidesIndexIsWorthHaving,
  PUBLISHED_GUIDES,
  spokesOf,
} from "./guides.js";

export const SITE_URL = "https://darwish-co.com";
export const SITE_NAME = "Darwish & Co.";
/**
 * The JPEG copy of an article cover used when the article is shared (/images/share/<name>.jpg, 1200x630).
 * LinkedIn does not reliably show WebP previews; scripts/prerender.mjs writes these files on every build.
 */
export const shareImageFor = (cover: string) => `/images/share/${cover.split("/").pop()!.replace(/\.[a-z0-9]+$/i, "")}.jpg`;

/** Every share image the build must write: one per published article with a cover. */
export const shareImageJobs = () =>
  SHOWN_ARTICLES.filter((a) => a.status === "published" && a.cover).map((a) => ({ source: a.cover!, target: shareImageFor(a.cover!) }));

/** The default share image (1200x630, 29 Oct 2026): brand, homepage headline and category over the hero photo. */
const DEFAULT_OG_IMAGE = "/images/social-default.jpg";
const DEFAULT_OG_IMAGE_ALT = "Darwish & Co.: A wise word in the right moment. Management & business consulting, New Cairo, Egypt.";

export type PageSeo = {
  /** Browser tab and search-result title. */
  title: string;
  /** Search and social description, 50–160 characters. */
  description: string;
  /** Absolute canonical address for this page. */
  canonical: string;
  /** Absolute address of the social sharing image. */
  ogImage: string;
  /** What the sharing image shows, for people who cannot see it. */
  ogImageAlt: string;
  /** Open Graph object type. */
  ogType: "website" | "article";
  /** Value for the robots meta tag. */
  robots: "index, follow" | "noindex, nofollow";
  /** Optional page-level structured data (JSON-LD), already shaped for output. */
  jsonLd?: Record<string, unknown>;
};

type PageSeoInput = Omit<Partial<PageSeo>, "canonical"> & {
  title: string;
  description: string;
};

const absolute = (pathOrUrl: string) =>
  pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;

function page(path: string, input: PageSeoInput): PageSeo {
  return {
    title: input.title,
    description: input.description,
    canonical: absolute(path === "/" ? "/" : path.replace(/\/+$/, "")),
    ogImage: absolute(input.ogImage ?? DEFAULT_OG_IMAGE),
    ogImageAlt: input.ogImage ? (input.ogImageAlt ?? "") : DEFAULT_OG_IMAGE_ALT,
    ogType: input.ogType ?? "website",
    robots: input.robots ?? "index, follow",
    jsonLd: input.jsonLd,
  };
}

// The homepage's own "Who we are" sentence (26 Oct 2026), within the 160-character display limit.
const COMPANY_DESCRIPTION =
  "Darwish & Co. is a consulting firm based in Egypt, helping organizations improve performance, strengthen governance, and pursue sustainable growth.";

/**
 * Points at the Organization record in index.html rather than restating it, so
 * the site has one identity rather than a copy per page.
 */
const ORGANISATION_REFERENCE = { "@id": `${SITE_URL}/#organization` };

/**
 * Where work is delivered today. Not the target audience: the approved wording
 * names SMEs in the MENA region as who the firm is for, which is a different
 * claim from where it can deliver. Widen this only when coverage is confirmed.
 */
const AREA_SERVED = { "@type": "Country", name: "Egypt" };

/** The founder's Person record in index.html, credited as the author of the articles he wrote. */
const FOUNDER_REFERENCE = { "@id": `${SITE_URL}/#fouad-darwish` };

/** An article's named author as a Person (the founder by reference); the firm when no author is named. */
const authorOf = (name: string | null) =>
  !name ? ORGANISATION_REFERENCE : name === "Fouad Darwish" ? FOUNDER_REFERENCE : { "@type": "Person", name };

/**
 * Titles follow the approved prototype: "<page> | Darwish & Co.". When that runs past the ~60 characters
 * Google shows, the page name stands alone rather than being cut off mid-word.
 */
const TITLE_MAX = 60;
const titled = (name: string) => {
  const full = `${name} | Darwish & Co.`;
  return full.length <= TITLE_MAX ? full : name;
};

const STATIC_PAGES: Record<string, PageSeo> = {
  "/": page("/", {
    title: "Darwish & Co. | Egypt’s #1 Management & Business Consulting",
    description: COMPANY_DESCRIPTION,
    // The homepage FAQ, so assistants can lift each answer as written.
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
    },
  }),
  "/about": page("/about", { title: ABOUT.title, description: ABOUT.meta }),
  "/services": page("/services", {
    title: titled("Services"),
    description: "Eight consulting services organized around the four decisions leaders face.",
  }),
  "/industries": page("/industries", {
    title: titled("Industries"),
    // The prototype's "Sectors Darwish & Co. serves across Egypt." is under 50 characters; the page's own introduction is used instead.
    description:
      "Localized strategic impact across Egypt, with selective regional relevance supported by specialized cross-market partnerships.",
  }),
  "/projects": page("/projects", {
    title: "Our Work | Darwish & Co.",
    description:
      "Explore selected Darwish & Co. engagements in business diagnosis, organizational development, and growth advisory.",
  }),
  "/insights": page("/insights", {
    title: titled("Insights"),
    description:
      "Explore Darwish & Co. perspectives on strategy, governance, organizational performance, operations, and business growth.",
  }),
  "/contact": page("/contact", {
    title: titled("Contact"),
    description: "Discuss your business challenge with Darwish & Co. Share a brief overview and our team will contact you to agree on the next step.",
  }),
  "/privacy": page("/privacy", {
    title: titled("Privacy policy"),
    description: "How Darwish & Co. handles personal information shared through this website and in our engagements.",
  }),
  // Pages still waiting for their approved text: reachable, but kept out of search results.
  "/about/integrity": page("/about/integrity", {
    title: titled("Integrity commitments"),
    description: "Darwish & Co. commitments on independence, confidentiality and conflicts of interest.",
    robots: "noindex, nofollow",
  }),
  "/client-login": page("/client-login", {
    title: "Client Login | Darwish & Co",
    description:
      "Sign in with the username and password issued by Darwish & Co. to reach the client portal assigned to your organisation.",
    robots: "noindex, nofollow",
  }),
};

// The services hub lists the individual service pages for search engines.
STATIC_PAGES["/services"].jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Darwish & Co. consulting services",
  itemListElement: SITE_SERVICES.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    url: absolute(`/services/${service.slug}`),
  })),
};

// The Organization and WebSite records live in index.html and are site-wide, so
// the homepage adds nothing here. The About page states that it is the page
// about the organisation, which is what disambiguates a similarly named company.
STATIC_PAGES["/about"].jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: absolute("/about"),
  name: "About Darwish & Co.",
  mainEntity: ORGANISATION_REFERENCE,
};

const breadcrumb = (trail: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], index) => ({ "@type": "ListItem", position: index + 1, name, item: absolute(path) })),
});

/** A service page: Service, FAQ and breadcrumb records, from the same content the page shows. */
function serviceSeo(slug: string): PageSeo | null {
  const service = SITE_SERVICES.find((entry) => entry.slug === slug);
  const detail = SERVICE_DETAIL[slug];
  if (!service || !detail) return null;

  const path = `/services/${service.slug}`;
  const description: string = detail.meta || detail.hero.intro;
  const faqs = (detail.faqs ?? []) as [string, string][];

  return page(path, {
    title: titled(service.title),
    description,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: service.title,
          description,
          serviceType: service.title,
          areaServed: AREA_SERVED,
          url: absolute(path),
          provider: ORGANISATION_REFERENCE,
        },
        ...(faqs.length
          ? [
              {
                "@type": "FAQPage",
                mainEntity: faqs.map(([question, answer]) => ({
                  "@type": "Question",
                  name: question,
                  acceptedAnswer: { "@type": "Answer", text: answer },
                })),
              },
            ]
          : []),
        breadcrumb([
          ["Home", "/"],
          ["Services", "/services"],
          [service.title, path],
        ]),
      ],
    },
  });
}

function caseSeo(slug: string): PageSeo | null {
  const study = PUBLIC_CASES.find((entry) => entry.slug === slug);
  if (!study) return null;
  return page(`/projects/${study.slug}`, { title: titled(study.title), description: study.text });
}

/**
 * An Insights article. Until an article is published its page is a placeholder
 * ("[Approved text pending]"), so it stays out of search results.
 */
function articleSeo(slug: string): PageSeo | null {
  const article = SHOWN_ARTICLES.find((entry) => entry.slug === slug);
  if (!article) return null;
  const path = `/insights/${article.slug}`;
  const published = article.status === "published";
  const topic = TOPICS.find(([key]) => key === article.topic)?.[1];
  return page(path, {
    title: article.seoTitle ?? titled(article.title),
    // The summary when it fits Google's ~160 characters; otherwise the one-line listing text.
    description: article.sample || article.summary.length > 160 ? article.listing : article.summary,
    ogType: "article",
    ...(article.cover && published ? { ogImage: shareImageFor(article.cover), ogImageAlt: article.coverAlt ?? "" } : {}),
    robots: published ? "index, follow" : "noindex, nofollow",
    jsonLd: published
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          ...(article.cover ? { image: absolute(article.cover) } : {}),
          ...(article.date ? { datePublished: article.date } : {}),
          ...(topic ? { articleSection: topic } : {}),
          author: authorOf(article.author),
          publisher: ORGANISATION_REFERENCE,
          mainEntityOfPage: absolute(path),
        }
      : undefined,
  });
}

/**
 * A guide page. The hub publishes as an Article with a list of its spokes; a
 * spoke publishes as an Article that points back at the hub. Both carry a
 * breadcrumb trail, and any questions publish as a FAQ so they can be quoted
 * directly.
 */
function guideSeo(slug: string): PageSeo | null {
  const guide = getGuide(slug);
  if (!guide) return null;

  const path = `/guides/${guide.slug}`;
  const group = groupOf(guide.slug);
  const hub = group && group.hub.slug !== guide.slug ? group.hub : undefined;
  const spokes = guide.kind === "hub" ? spokesOf(guide.slug) : [];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: guide.title,
      description: guide.metaDescription,
      ...(guide.datePublished ? { datePublished: guide.datePublished } : {}),
      ...(guide.image ? { image: absolute(guide.image) } : {}),
      author: ORGANISATION_REFERENCE,
      publisher: ORGANISATION_REFERENCE,
      mainEntityOfPage: absolute(path),
      ...(hub ? { isPartOf: { "@type": "Article", "@id": absolute(`/guides/${hub.slug}`) } } : {}),
      ...(spokes.length > 0
        ? {
            hasPart: spokes.map((spoke) => ({
              "@type": "Article",
              "@id": absolute(`/guides/${spoke.slug}`),
              headline: spoke.title,
            })),
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      // The same trail the page shows: Home › Guides › this guide › this page.
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
        ...(guidesIndexIsWorthHaving()
          ? [{ "@type": "ListItem", position: 2, name: "Guides", item: absolute("/guides") }]
          : []),
        ...(hub
          ? [
              {
                "@type": "ListItem",
                position: guidesIndexIsWorthHaving() ? 3 : 2,
                name: guideName(hub),
                item: absolute(`/guides/${hub.slug}`),
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: (guidesIndexIsWorthHaving() ? 2 : 1) + (hub ? 2 : 1),
          name: hub ? guide.navLabel : guideName(guide),
          item: absolute(path),
        },
      ],
    },
  ];

  if (guide.faqs && guide.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return page(path, {
    title: guide.metaTitle,
    description: guide.metaDescription,
    ogType: "article",
    ...(guide.image ? { ogImage: guide.image } : {}),
    jsonLd: { "@context": "https://schema.org", "@graph": graph },
  });
}

/** `/guides` only exists once more than one guide is published. */
function guideIndexSeo(): PageSeo | null {
  if (!guidesIndexIsWorthHaving()) return null;

  return page("/guides", {
    title: "Guides for SME Owners — Governance, Risk and Growth | Darwish & Co",
    description:
      "Practical guides for owners and managing directors of SMEs in Egypt and the MENA region, written around the decisions that bring companies to us.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: PUBLISHED_GUIDES.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: absolute(`/guides/${guide.slug}`),
      })),
    },
  });
}

const NOT_FOUND_SEO = page("/", {
  title: "Page not found | Darwish & Co.",
  description:
    "The page you were looking for does not exist. Browse the consulting services, work and insights of Darwish & Co., a consulting firm in Egypt.",
  robots: "noindex, nofollow",
});

/** Strips a query string, hash and trailing slash so `/about?x=1` and `/about/` match `/about`. */
export function normalizePath(pathname: string): string {
  const withoutQuery = pathname.split(/[?#]/)[0];
  const trimmed = withoutQuery.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** True when the address is a real page of the site, rather than a not-found route. */
export function isKnownRoute(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (STATIC_PAGES[path] || path.startsWith("/admin/")) return true;
  if (path.startsWith("/services/")) return serviceSeo(path.slice("/services/".length)) !== null;
  if (path.startsWith("/projects/")) return caseSeo(path.slice("/projects/".length)) !== null;
  if (path.startsWith("/insights/")) return articleSeo(path.slice("/insights/".length)) !== null;
  if (path === "/guides") return guideIndexSeo() !== null;
  if (path.startsWith("/guides/")) return !GUIDE_REDIRECTS[path] && guideSeo(path.slice("/guides/".length)) !== null;
  return false;
}

/** Returns the metadata for a route. Unknown routes get the noindex not-found entry. */
export function resolveSeo(pathname: string): PageSeo {
  const path = normalizePath(pathname);

  const staticPage = STATIC_PAGES[path];
  if (staticPage) return staticPage;

  const found =
    (path.startsWith("/services/") && serviceSeo(path.slice("/services/".length))) ||
    (path.startsWith("/projects/") && caseSeo(path.slice("/projects/".length))) ||
    (path.startsWith("/insights/") && articleSeo(path.slice("/insights/".length))) ||
    (path === "/guides" && guideIndexSeo()) ||
    (path.startsWith("/guides/") && guideSeo(path.slice("/guides/".length)));
  if (found) return found;

  if (WITHDRAWN_SERVICES[path]) {
    return page(path, {
      title: "This service is no longer offered | Darwish & Co",
      description:
        "Digital marketing is no longer part of the Darwish & Co. consulting offer. See the consulting services the firm provides today.",
      robots: "noindex, nofollow",
    });
  }

  if (path.startsWith("/admin/")) {
    return page(path, {
      title: "Administration | Darwish & Co",
      description: "Restricted administration area for Darwish & Co. staff.",
      robots: "noindex, nofollow",
    });
  }

  return { ...NOT_FOUND_SEO, canonical: absolute(path) };
}
