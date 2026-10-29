/**
 * Insights: topics and articles, shared by the browser (listing and article
 * pages) and the server (which addresses exist, and their search metadata).
 * Exported from the approved prototype; edit here from now on.
 */

import { MARKDOWN_ARTICLES } from "./insightsContent";

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
  /** Shorter title for search results and browser tabs, used whole; falls back to the title. */
  seoTitle?: string;
  /** Text on the listing card. */
  listing: string;
  author: string | null;
  date: string | null;
  /** Cover photo (1200x676) and its alt text, shown on the card and at the top of the article. */
  cover?: string;
  coverAlt?: string;
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

/** Every article comes from content/insights/*.md (edited in the CMS at /cms), in their `order`. */
export const ARTICLES: Article[] = MARKDOWN_ARTICLES;

const env = (import.meta as { env?: Record<string, string | undefined> }).env;

/**
 * "public" (the default, decided 17 Oct 2026 for launch) lists published articles only; with none
 * published, Insights says the first insights are being prepared. "preview" also lists the planned and
 * sample articles with their status, as in the approved prototype: set VITE_INSIGHTS_MODE=preview at
 * build time and on the server for a review copy.
 */
export const INSIGHTS_MODE: "preview" | "public" =
  (env?.VITE_INSIGHTS_MODE ?? (typeof process !== "undefined" ? process.env.VITE_INSIGHTS_MODE : undefined)) === "preview"
    ? "preview"
    : "public";

/** Articles that have a page and a card in the current mode. */
export const SHOWN_ARTICLES = ARTICLES.filter((a) => a.status === "published" || INSIGHTS_MODE === "preview");
