import { MARKDOWN_BODIES } from "./insightsContent";

/** Full article text (HTML) keyed by article slug, generated from content/insights/*.md. Articles without a body show the pending placeholder. */
export const ARTICLE_BODIES: Record<string, string> = MARKDOWN_BODIES;
