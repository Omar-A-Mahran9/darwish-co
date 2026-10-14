/**
 * Insights: topics and articles, shared by the browser (listing and article
 * pages) and the server (which addresses exist, and their search metadata).
 * Exported from the approved prototype; edit here from now on.
 */

export type ArticleStatus = "planned" | "sample" | "published";

export type Article = {
  slug: string;
  topic: string;
  title: string;
  status: ArticleStatus;
  /** Placeholder card that only shows a topic; never published as written. */
  sample: boolean;
  featured?: boolean;
  summary: string;
  /** Slug of the related service. */
  service: string;
  /** Text on the listing card. */
  listing: string;
  author: string | null;
  date: string | null;
};

export const TOPICS: [key: string, name: string][] = [
  [
    "strategy",
    "Strategy"
  ],
  [
    "governance",
    "Governance"
  ],
  [
    "people",
    "People"
  ],
  [
    "operations",
    "Operations"
  ],
  [
    "growth",
    "Growth"
  ],
  [
    "research",
    "Research"
  ]
];

export const ARTICLES: Article[] = [
  {
    "slug": "delegation-of-authority",
    "topic": "governance",
    "title": "Delegation of Authority: how to delegate decisions without losing oversight",
    "status": "planned",
    "sample": false,
    "featured": true,
    "summary": "A perspective on decision rights, accountability, and effective oversight.",
    "service": "governance-risk-compliance",
    "listing": "A perspective on decision rights, accountability, and effective oversight.",
    "author": null,
    "date": null
  },
  {
    "slug": "anti-bribery-questionnaire",
    "topic": "governance",
    "title": "What to do when a major client sends an anti-bribery questionnaire",
    "status": "planned",
    "sample": false,
    "summary": "How to prepare evidence, policies and owners before the questionnaire arrives.",
    "service": "governance-risk-compliance",
    "listing": "How to prepare evidence, policies, and owners before the questionnaire arrives.",
    "author": null,
    "date": null
  },
  {
    "slug": "strategy-into-decision-rights",
    "topic": "strategy",
    "title": "How to turn strategy into decision rights, measures and monthly reviews",
    "status": "planned",
    "sample": false,
    "summary": "Connecting priorities to owners, KPIs and a review rhythm leadership will keep.",
    "service": "strategy-performance",
    "listing": "Connecting priorities to owners, KPIs, and a review rhythm leadership can sustain.",
    "author": null,
    "date": null
  },
  {
    "slug": "sample-role-clarity",
    "topic": "people",
    "title": "Role clarity before restructuring",
    "status": "sample",
    "sample": true,
    "summary": "Sample article card used to show the People topic.",
    "service": "human-resources",
    "listing": "Why responsibilities and reporting relationships deserve attention before changing the organization chart.",
    "author": null,
    "date": null
  },
  {
    "slug": "sample-handoffs",
    "topic": "operations",
    "title": "Finding the handoffs that slow decisions down",
    "status": "sample",
    "sample": true,
    "summary": "Sample article card used to show the Operations topic.",
    "service": "operational-excellence",
    "listing": "A practical perspective on coordination, ownership, and the points where work loses momentum.",
    "author": null,
    "date": null
  },
  {
    "slug": "sample-market-entry",
    "topic": "research",
    "title": "What a decision-ready market brief contains",
    "status": "sample",
    "sample": true,
    "summary": "Sample article card used to show the Research topic.",
    "service": "market-research",
    "listing": "Organizing market evidence around the question leadership needs to answer.",
    "author": null,
    "date": null
  }
];

const env = (import.meta as { env?: Record<string, string | undefined> }).env;

/**
 * "preview" lists planned and sample articles with their status, as in the
 * approved prototype; "public" lists published articles only. Set
 * VITE_INSIGHTS_MODE=public (at build time and on the server) once real
 * articles exist.
 */
export const INSIGHTS_MODE: "preview" | "public" =
  (env?.VITE_INSIGHTS_MODE ?? (typeof process !== "undefined" ? process.env.VITE_INSIGHTS_MODE : undefined)) === "public"
    ? "public"
    : "preview";

/** Articles that have a page and a card in the current mode. */
export const SHOWN_ARTICLES = ARTICLES.filter((a) => a.status === "published" || INSIGHTS_MODE === "preview");
