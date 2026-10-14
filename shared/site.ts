/**
 * Site structure shared by the browser and the server: the eight services, and
 * where old addresses go. The header, footer and service routes read the
 * services from here (via client/src/site/nav.ts); the server reads the
 * redirects and the list of real pages.
 */

export const SERVICE_GROUPS = ["Find direction", "Strengthen execution", "Enable growth", "Navigate complexity"] as const;
export type ServiceGroup = (typeof SERVICE_GROUPS)[number];

export type SiteService = {
  slug: string;
  /** Full name, used in the menu and on the service page. */
  title: string;
  /** Name on the homepage service grid, where space is tighter. */
  gridTitle: string;
  /** Short name for the footer. */
  short: string;
  group: ServiceGroup;
  promise: string;
};

export const SITE_SERVICES: SiteService[] = [
  {
    slug: "strategy-performance",
    title: "Strategy & Performance Management",
    gridTitle: "Strategy & Performance Management",
    short: "Strategy & Performance",
    group: "Find direction",
    promise:
      "Actionable strategic frameworks that align leadership vision with operational realities, with clear priorities, measurement models and practical pathways for implementation.",
  },
  {
    slug: "governance-risk-compliance",
    title: "Governance, Risk & Institutional Excellence",
    gridTitle: "Governance, Risk & Institutional Excellence",
    short: "Governance & Risk",
    group: "Find direction",
    promise:
      "Stronger institutional frameworks: clear authorities, formal policies, real accountability and practical risk and control structures.",
  },
  {
    slug: "human-resources",
    title: "Organizational Development & Human Capital Advisory",
    gridTitle: "Organizational Development & Human Capital",
    short: "Organizational Development",
    group: "Strengthen execution",
    promise: "Clear structures, defined roles and people systems that connect performance to business priorities.",
  },
  {
    slug: "operational-excellence",
    title: "Operational Excellence & Project Advisory",
    gridTitle: "Operational Excellence & Project Advisory",
    short: "Operational Excellence",
    group: "Strengthen execution",
    promise: "Simpler ways of working: clear handoffs, ownership, process flow and project governance.",
  },
  {
    slug: "business-development",
    title: "Business Growth & Market Expansion",
    gridTitle: "Business Growth & Market Expansion",
    short: "Growth & Market Expansion",
    group: "Enable growth",
    promise: "Clear growth choices: opportunities, market entry, business-model options and a go-to-market path.",
  },
  {
    slug: "negotiation-deal-advisory",
    title: "Strategic Negotiation & Deal Advisory",
    gridTitle: "Strategic Negotiation & Deal Advisory",
    short: "Negotiation & Deals",
    group: "Enable growth",
    promise:
      "Better-prepared negotiations: clear priorities, counterpart insight, structured positions and commercially sound agreements.",
  },
  {
    slug: "market-research",
    title: "Research, Feasibility & Business Intelligence",
    gridTitle: "Research, Feasibility & Business Intelligence",
    short: "Research & Feasibility",
    group: "Navigate complexity",
    promise:
      "Evidence before decisions: research, feasibility and competitive intelligence that reduce uncertainty before investment or entry.",
  },
  {
    slug: "company-liquidation",
    title: "Company Liquidation & Dissolution",
    gridTitle: "Company Liquidation & Dissolution",
    short: "Company Liquidation",
    group: "Navigate complexity",
    promise:
      "A controlled, traceable closure: structured advisory and coordination for formally liquidating a company in Egypt.",
  },
];

export const SITE_SERVICE_SLUGS = SITE_SERVICES.map((service) => service.slug);

/**
 * Service addresses from earlier versions of the site, mapped to the page that
 * replaced them. The server answers these with a 301; links inside the site
 * (the guides still use the old slugs) are redirected in the browser.
 */
export const SERVICE_REDIRECTS: Record<string, string> = {
  // The v3 service pages (Sep–Oct 2026), replaced by the eight-practice site
  "/services/strategy-execution": "/services/strategy-performance",
  "/services/corporate-family-governance": "/services/governance-risk-compliance",
  "/services/risk-compliance-integrity": "/services/governance-risk-compliance",
  "/services/people-organisation": "/services/human-resources",
  "/services/growth-market-entry": "/services/business-development",
  // From the first split, 16 Sep 2026
  "/services/integrity-anti-corruption": "/services/governance-risk-compliance",
};

/**
 * Removed from the consulting offer with no replacement to redirect to. These
 * answer 410 Gone rather than redirecting to a hub, which search engines treat
 * as a soft 404.
 */
export const WITHDRAWN_SERVICES: Record<string, string> = {
  "/services/digital-marketing": "Digital marketing is no longer part of the Darwish & Co. consulting offer.",
};

/** Old single-page anchors (/services#grc), sent to the page that replaced them. */
export const LEGACY_ANCHOR_REDIRECTS: Record<string, string> = {
  strategy: "/services/strategy-performance",
  grc: "/services/governance-risk-compliance",
  hr: "/services/human-resources",
  bizdev: "/services/business-development",
  "market-research": "/services/market-research",
  integrity: "/services/governance-risk-compliance",
};

/** Pages folded into other pages by the redesign (decided 13 Oct 2026). */
export const PAGE_REDIRECTS: Record<string, string> = {
  "/partners": "/about#partners",
  "/corporate-partners": "/about#partners",
  "/blog": "/insights",
};
