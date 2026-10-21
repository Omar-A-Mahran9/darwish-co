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

/** Articles written in TypeScript; the rest come from content/insights/*.md. */
const HTML_ARTICLES: Article[] = [
  {
    "slug": "ai-institutional-bias",
    "topic": "governance",
    "title": "AI Does Not Eliminate Institutional Bias \u2014 It Can Scale It",
    "status": "published",
    "sample": false,
    "summary": "AI learns from institutional data. If that data reflects unfair practices, weak governance, or corruption, AI may automate those problems rather than fix them.",
    "service": "governance-risk-compliance",
    "listing": "Why automating a weak process makes the weakness faster, and six controls that keep institutional AI accountable.",
    "author": "Fouad Darwish",
    "date": "2026-07"
  },
  {
    "slug": "ai-human-oversight",
    "topic": "governance",
    "title": "When AI Accelerates the Wrong Decision: Why Human Oversight Is a Governance Requirement",
    "status": "published",
    "sample": false,
    "summary": "AI can accelerate decisions, but without effective governance it can also scale outdated data, hidden bias and institutional error. The central question is who remains responsible when an AI-supported decision causes harm.",
    "service": "governance-risk-compliance",
    "listing": "Why a human approval button is not oversight, and six controls that keep AI-supported decisions accountable.",
    "author": "Fouad Darwish",
    "date": "2026-07"
  },
  {
    "slug": "ai-bias-mena-education",
    "topic": "governance",
    "title": "AI in MENA Education: When Automation Reinforces Existing Inequality",
    "status": "published",
    "sample": false,
    "summary": "AI can improve education across the MENA region, but biased historical data and weak institutional oversight may reinforce inequality in admissions, grading, scholarships and student monitoring.",
    "service": "governance-risk-compliance",
    "listing": "Where bias enters admissions, grading, scholarships and student monitoring, and six principles for institutions adopting AI.",
    "author": "Fouad Darwish",
    "date": "2026-07"
  }
];

/** Batch 2 (Markdown, newest) first, then the three AI articles. */
export const ARTICLES: Article[] = [...MARKDOWN_ARTICLES, ...HTML_ARTICLES];

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
