/**
 * Site structure for the redesigned website (ported from the approved prototype, prototype/).
 * One source for the header menu, footer, homepage service grid and service routes.
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

export const serviceHref = (slug: string) => `/services/${slug}`;

/** Addresses of the main pages. */
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  industries: "/industries",
  work: "/projects",
  insights: "/insights",
  contact: "/contact",
  privacy: "/privacy",
  integrity: "/about/integrity",
  growth360: "/growth-360",
  clientLogin: "/client-login",
} as const;

export const CONTACT = {
  email: "info@darwish-co.com",
  phone: "+20 110 110 1090",
  phoneHref: "tel:+201101101090",
  address: "Office T-10, 3rd Floor, RIO Mall, Dr. Ahmed Okasha St., off Sadat Axis, New Cairo",
} as const;
