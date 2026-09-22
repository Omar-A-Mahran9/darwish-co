/**
 * The guides: one hub and its spokes, as set out in `docs/positioning.md` §6 and
 * planned in `docs/content-plan.md`.
 *
 * This is the single source for the guide pages, their navigation entry, the
 * sitemap and their structured data — the same arrangement as `services.ts`.
 *
 * Every guide below is `published: false` until its text is written and
 * approved. An unpublished guide has no page, appears in no menu, is in no
 * sitemap and is not written out at build time: its address simply does not
 * exist yet. Nothing here advertises a gap.
 *
 * The addresses are deliberately `/guides/<slug>`, plural, so a second guide
 * later needs no redirects. While there is one guide the menu names it, rather
 * than offering a category holding a single item.
 */

export type GuideKind = "hub" | "spoke";

/** A block of guide text. The page renders these in order. */
export type GuideSection = {
  heading: string;
  /** Paragraphs of plain text. */
  body: string[];
  /** Optional bulleted points shown after the paragraphs. */
  points?: string[];
};

export type Guide = {
  slug: string;
  kind: GuideKind;
  published: boolean;
  /** Full title, used as the page heading. */
  title: string;
  /** Short label for menus, cards and breadcrumbs. */
  navLabel: string;
  /** Browser tab and search-result title. */
  metaTitle: string;
  /** Search and social description, 50–160 characters. */
  metaDescription: string;
  /** One or two sentences: what the reader gets. Shown on cards and at the top. */
  summary: string;
  /** The thing the reader walks away with — a matrix, an agenda, a statement. */
  artefact?: string;
  /** Service page this guide belongs beside, as a slug from `services.ts`. */
  relatedService?: string;
  /** The hub a spoke belongs to. Hubs leave this empty. */
  hub?: string;
  /** ISO date, set when the guide is published. */
  datePublished?: string;
  /** Social sharing image. */
  image?: string;
  sections?: GuideSection[];
  faqs?: { question: string; answer: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "governance-for-growing-smes",
    kind: "hub",
    published: false,
    title:
      "Governance for Growing SMEs: A Practical Guide for Owners in Egypt and the MENA Region",
    navLabel: "Governance Guide",
    metaTitle: "Governance for Growing SMEs — A Practical Guide | Darwish & Co",
    metaDescription:
      "What governance means for a company of 50–300 people in Egypt and the MENA region: who decides what, to which limit, and on what record.",
    summary:
      "What governance actually means at SME scale, the moments that make a company need it, and where to start.",
  },
  {
    slug: "delegation-of-authority",
    kind: "spoke",
    published: false,
    hub: "governance-for-growing-smes",
    relatedService: "corporate-family-governance",
    title: "Delegation of Authority: How to Delegate Decisions Without Losing Oversight",
    navLabel: "Delegation of authority",
    metaTitle: "Delegation of Authority: Delegating Without Losing Oversight | Darwish & Co",
    metaDescription:
      "How to build a delegation of authority matrix: who decides what, to which financial limit, and on what record — so decisions stop routing to one signature.",
    summary:
      "How to stop every decision routing to one signature, without losing sight of any of them.",
    artefact: "A delegation of authority matrix",
  },
  {
    slug: "anti-bribery-questionnaire",
    kind: "spoke",
    published: false,
    hub: "governance-for-growing-smes",
    relatedService: "risk-compliance-integrity",
    title: "What to Do When a Major Client Sends an Anti-Bribery Questionnaire",
    navLabel: "Anti-bribery questionnaires",
    metaTitle: "Answering a Client's Anti-Bribery Questionnaire | Darwish & Co",
    metaDescription:
      "Most questions on a client compliance questionnaire ask for four things: a policy, a procedure, a record and a named responsible person. How to answer honestly.",
    summary:
      "What the questionnaire is really asking for, and what to do when the honest answer is not yet.",
    artefact: "A map of the four things behind almost every question",
  },
  {
    slug: "strategy-decision-rights",
    kind: "spoke",
    published: false,
    hub: "governance-for-growing-smes",
    relatedService: "strategy-execution",
    title: "How to Turn Strategy into Decision Rights, Measures and Monthly Reviews",
    navLabel: "Strategy into decision rights",
    metaTitle: "Turning Strategy into Decision Rights and Monthly Reviews | Darwish & Co",
    metaDescription:
      "Why strategies stall, and how an objective becomes an owner, a measure and a decision right — reviewed on a rhythm the company can keep.",
    summary:
      "Why a strategy stops happening, and the monthly rhythm that keeps it happening.",
    artefact: "A monthly review agenda",
  },
  {
    slug: "employee-ai-use",
    kind: "spoke",
    published: false,
    hub: "governance-for-growing-smes",
    relatedService: "ai-governance",
    title: "Setting the Rules for Employee AI Use: A Governance Starting Point",
    navLabel: "Employee AI use",
    metaTitle: "Rules for Employee AI Use: A Governance Starting Point | Darwish & Co",
    metaDescription:
      "Staff are already using AI on company information. The three or four rules worth writing down first, and who approves the exceptions.",
    summary:
      "The few rules worth writing down first, while staff are already using these tools.",
    artefact: "A one-page acceptable use statement",
  },
];

export const PUBLISHED_GUIDES = GUIDES.filter((guide) => guide.published);

export function getGuide(slug: string): Guide | undefined {
  return PUBLISHED_GUIDES.find((guide) => guide.slug === slug);
}

/** The published hub, if there is one. */
export function hubGuide(): Guide | undefined {
  return PUBLISHED_GUIDES.find((guide) => guide.kind === "hub");
}

/** Published spokes belonging to a hub. */
export function spokesOf(hubSlug: string): Guide[] {
  return PUBLISHED_GUIDES.filter((guide) => guide.kind === "spoke" && guide.hub === hubSlug);
}

/** Published guides that point at a service page. */
export function guidesForService(serviceSlug: string): Guide[] {
  return PUBLISHED_GUIDES.filter((guide) => guide.relatedService === serviceSlug);
}

/**
 * True once there is more than one published guide, at which point `/guides`
 * earns an index page and the menu can say "Guides" rather than naming one.
 */
export function guidesIndexIsWorthHaving(): boolean {
  return PUBLISHED_GUIDES.length > 1;
}
