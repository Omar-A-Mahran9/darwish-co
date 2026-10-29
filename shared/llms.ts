/**
 * llms.txt (llmstxt.org): a plain Markdown summary of the firm for AI assistants, built on every build
 * from the same data as the pages (scripts/prerender.mjs writes it to dist/public), so a new service or
 * published article appears in it automatically. Facts only: the same identity as the Organization record.
 */
import { SITE_SERVICES } from "./site.js";
import { SHOWN_ARTICLES } from "./insights.js";
import { SITE_URL } from "./seo.js";

export function llmsTxt(): string {
  const services = SITE_SERVICES.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.promise}`);
  const articles = SHOWN_ARTICLES.filter((a) => a.status === "published").map((a) => `- [${a.title}](${SITE_URL}/insights/${a.slug}): ${a.listing}`);
  return `# Darwish & Co.

> Darwish & Co. is a management and business consulting firm based in New Cairo, Egypt. It helps organizations improve performance, strengthen governance, and pursue sustainable growth. Founder & Managing Partner: Fouad Darwish.

- Legal name: Fouad Darwish Business & Consulting Development (organisation number 291746)
- Office: Office T-10, 3rd Floor, RIO Mall, Dr. Ahmed Okasha St., off Sadat Axis, New Cairo, Egypt
- Phone: +20 110 110 1090
- Email: info@darwish-co.com
- Website: ${SITE_URL}
- LinkedIn: https://www.linkedin.com/company/darwishandcoeg/
- Specialist partners are credited by name for their part of an engagement; see the About page.

## Services

${services.join("\n")}

## Insights

${articles.join("\n")}

## About the firm

- [About Darwish & Co.](${SITE_URL}/about): the firm, its founder, specialist advisors and partners
- [Industries](${SITE_URL}/industries): sectors served in Egypt
- [Contact](${SITE_URL}/contact): how to start a conversation
- [Privacy policy](${SITE_URL}/privacy)
`;
}
