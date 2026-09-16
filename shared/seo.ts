/**
 * Per-page search and social metadata.
 *
 * One source of truth shared by the browser (client/src/hooks/useSeo.ts, which
 * updates the document head on every route change) and the Express server,
 * which injects the same values into index.html before it is sent. The server
 * side is what crawlers and AI assistants that do not run JavaScript see.
 */

import { getService, PUBLISHED_SERVICES, WITHDRAWN_SERVICES } from "./services.js";

export const SITE_URL = "https://www.darwish-co.com";
export const SITE_NAME = "Darwish & Co.";
const DEFAULT_OG_IMAGE = "/images/logo.png";

export type PageSeo = {
  /** Browser tab and search-result title. */
  title: string;
  /** Search and social description, 50–160 characters. */
  description: string;
  /** Absolute canonical address for this page. */
  canonical: string;
  /** Absolute address of the social sharing image. */
  ogImage: string;
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
    ogType: input.ogType ?? "website",
    robots: input.robots ?? "index, follow",
    jsonLd: input.jsonLd,
  };
}

const COMPANY_DESCRIPTION =
  "Darwish & Co. is an Egypt-based governance and management consultancy for SMEs in the MENA region — governance, risk and compliance, strategy, people and growth.";

/** Articles published under /blog. Titles and summaries match client/src/pages/BlogPost.tsx. */
export const BLOG_ARTICLES = [
  {
    slug: "ai-human-oversight-governance",
    title: "Why AI Decisions Still Require Human Oversight",
    headline:
      "When AI Accelerates the Wrong Decision: Why Human Oversight Is a Governance Requirement",
    description:
      "AI can accelerate decisions, but without governance it scales outdated data and hidden bias. Who stays responsible when an AI-supported decision causes harm?",
    image: "/images/article-ai-human-oversight-figure.webp",
    datePublished: "2026-07-01",
  },
  {
    slug: "ai-bias-mena-education",
    title: "AI Bias and Governance in MENA Education",
    headline: "AI in MENA Education: When Automation Reinforces Existing Inequality",
    description:
      "AI can improve education across MENA, but biased data and weak oversight may reinforce inequality in admissions, grading, scholarships and student monitoring.",
    image: "/images/article-ai-bias-education-figure.webp",
    datePublished: "2026-07-01",
  },
  {
    slug: "ai-institutional-bias-governance",
    title: "How AI Can Scale Institutional Bias and Weak Governance",
    headline: "AI Does Not Eliminate Institutional Bias — It Can Scale It",
    description:
      "AI learns from institutional data. Where that data reflects unfair practice or weak governance, the system automates those problems instead of fixing them.",
    image: "/images/article-ai-institutional-bias-figure.webp",
    datePublished: "2026-07-01",
  },
] as const;

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

const STATIC_PAGES: Record<string, PageSeo> = {
  "/": page("/", {
    title: "Darwish & Co — Governance & Management Consultancy for SMEs | Egypt & MENA",
    description: COMPANY_DESCRIPTION,
  }),
  "/about": page("/about", {
    title: "About Darwish & Co — Governance & Management Consultants | Egypt",
    description:
      "A governance and management consultancy based in New Cairo, Egypt, for SMEs in the MENA region. What the firm does, how it works, and who delivers it.",
  }),
  "/services": page("/services", {
    title: "Consulting Services — Governance, Strategy & Growth for SMEs | Darwish & Co",
    description:
      "Corporate and family governance, risk and compliance, strategy execution, people and organisation, and market entry for SMEs in Egypt and the MENA region.",
  }),
  "/projects": page("/projects", {
    title: "Projects & Innovations — AI Platforms for MENA | Darwish & Co",
    description:
      "How Darwish & Co. turns strategy into working digital solutions, including the POC Collaboration Platform built for teams in the MENA region.",
  }),
  "/partners": page("/partners", {
    title: "Partners & Consultants — Our Senior Advisory Network | Darwish & Co",
    description:
      "The consultants behind Darwish & Co.: advisers in governance, risk and compliance, finance, human resources and organisational development.",
  }),
  "/corporate-partners": page("/corporate-partners", {
    title: "Corporate Partners & Licences | Darwish & Co",
    description:
      "The organisations and institutions Darwish & Co. works with, and what each of them delivers on an engagement.",
  }),
  "/blog": page("/blog", {
    title: "Insights on Governance, AI & Management | Darwish & Co Blog",
    description:
      "Practical guidance on strategic management, governance and compliance, HR and AI governance for growth-stage businesses in the MENA region.",
  }),
  "/contact": page("/contact", {
    title: "Contact Darwish & Co — Book a Consultation | Egypt & MENA",
    description:
      "Talk to Darwish & Co. about governance, compliance, HR or growth for your business. Send a message and the team replies within one working day.",
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
  itemListElement: PUBLISHED_SERVICES.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.name,
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

function serviceSeo(slug: string): PageSeo | null {
  const service = getService(slug);
  if (!service) return null;

  const canonical = absolute(`/services/${service.slug}`);

  return page(`/services/${service.slug}`, {
    title: service.metaTitle,
    description: service.metaDescription,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: service.name,
          description: service.metaDescription,
          serviceType: service.name,
          areaServed: AREA_SERVED,
          url: canonical,
          // Partner-delivered work names the partner rather than implying it is ours.
          provider: ORGANISATION_REFERENCE,
          // A partner's capability is the partner's. It is published as a second
          // named provider, never folded into Darwish & Co.'s own credentials.
          ...(service.partner
            ? {
                provider: [
                  ORGANISATION_REFERENCE,
                  {
                    "@type": "Organization",
                    name: service.partner.name,
                    url: service.partner.url,
                  },
                ],
              }
            : {}),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: service.name,
            itemListElement: service.offerings.map((offering, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: offering.title,
                description: offering.description,
              },
            })),
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: absolute("/services") },
            { "@type": "ListItem", position: 3, name: service.name, item: canonical },
          ],
        },
      ],
    },
  });
}

function blogArticleSeo(slug: string): PageSeo | null {
  const article = BLOG_ARTICLES.find((entry) => entry.slug === slug);
  if (!article) return null;

  return page(`/blog/${article.slug}`, {
    title: `${article.title} | Darwish & Co`,
    description: article.description,
    ogImage: article.image,
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.headline,
      description: article.description,
      image: absolute(article.image),
      datePublished: article.datePublished,
      author: ORGANISATION_REFERENCE,
      publisher: ORGANISATION_REFERENCE,
      mainEntityOfPage: absolute(`/blog/${article.slug}`),
    },
  });
}

const NOT_FOUND_SEO = page("/", {
  title: "Page Not Found | Darwish & Co",
  description:
    "This page does not exist. Browse the consulting services, projects and insights of Darwish & Co., a governance and management consultancy in Egypt.",
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
  if (path.startsWith("/services/")) return getService(path.slice("/services/".length)) !== undefined;
  if (path.startsWith("/blog/")) return blogArticleSeo(path.slice("/blog/".length)) !== null;
  return false;
}

/** Returns the metadata for a route. Unknown routes get the noindex not-found entry. */
export function resolveSeo(pathname: string): PageSeo {
  const path = normalizePath(pathname);

  const staticPage = STATIC_PAGES[path];
  if (staticPage) return staticPage;

  if (path.startsWith("/services/")) {
    const service = serviceSeo(path.slice("/services/".length));
    if (service) return service;

    if (WITHDRAWN_SERVICES[path]) {
      return page(path, {
        title: "This service is no longer offered | Darwish & Co",
        description:
          "Digital marketing is no longer part of the Darwish & Co. consulting offer. See the governance, strategy and growth services the firm provides today.",
        robots: "noindex, nofollow",
      });
    }
  }

  if (path.startsWith("/blog/")) {
    const article = blogArticleSeo(path.slice("/blog/".length));
    if (article) return article;
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
