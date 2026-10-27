import { describe, expect, it } from "vitest";
// @ts-expect-error: plain .mjs build helper without type declarations
import { CASE_SLUGS, SERVICE_SLUGS, TOPIC_KEYS, checkArticle } from "../scripts/insights-schema.mjs";
import { TOPICS } from "../shared/insights.js";
import { SITE_SERVICES } from "../shared/site.js";
import { PUBLIC_CASES } from "../shared/work.js";

const good = {
  slug: "sample-article",
  title: "A practical title for an article",
  topic: "governance",
  service: "governance-risk-compliance",
  summary: "A summary long enough to describe the article in search results and on social cards.",
  listing: "A short line for the listing card.",
  author: "Fouad Darwish",
  date: "2026-10",
  status: "published",
  cover: "/images/cover.webp",
  cover_alt: "Two people reviewing a document",
};
const body = "Intro paragraph.\n\n## A section\n\nText with a [service link](/services/human-resources).\n\n![A diagram of the process](/images/insights/d.svg)\n";
const files: Record<string, number> = { "/images/cover.webp": 60, "/images/insights/d.svg": 12, "/images/huge.webp": 900 };
const ctx = {
  fileInfo: (p: string) => (p in files ? { exists: true, kb: files[p] } : { exists: false, kb: 0 }),
  publishedSlugs: ["sample-article", "delegation-of-authority"],
};
const check = (meta: Record<string, unknown>, text = body, file = "sample-article.md") => checkArticle(file, meta, text, ctx) as string[];

describe("Insights article rules", () => {
  it("accepts a complete article", () => {
    expect(check(good)).toEqual([]);
  });

  it("names each problem with the file and field or line", () => {
    const problems = check(
      { ...good, title: "Short", topic: "marketing", service: "seo", cover: "https://example.com/x.jpg", tittle: "typo" },
      "No heading here.\n\n<div>raw</div>\n\n![](/images/huge.webp)\n\n[broken](/services/not-a-service)\n",
    );
    const text = problems.join("\n");
    expect(text).toContain('unknown field "tittle"');
    expect(text).toContain("title is 5 characters");
    expect(text).toContain('topic "marketing"');
    expect(text).toContain('service "seo"');
    expect(text).toContain("must be uploaded to the site");
    expect(text).toContain("needs at least one section heading");
    expect(text).toContain("line 3: raw HTML");
    expect(text).toContain("needs a description (alt text)");
    expect(text).toContain("is 900 KB; the limit is 250 KB");
    expect(text).toContain('link to "/services/not-a-service"');
    for (const p of problems) expect(p.startsWith("sample-article.md: ")).toBe(true);
  });

  it("requires the file name to match the slug and alt text for the cover", () => {
    const text = check({ ...good, cover_alt: "" }, body, "other-name.md").join("\n");
    expect(text).toContain("must match the file name");
    expect(text).toContain("cover_alt");
  });

  it("only checks the body of published articles", () => {
    expect(check({ ...good, status: "planned" }, "Draft notes without a heading <b>yet</b>.")).toEqual([]);
  });

  it("allows links to published articles only", () => {
    expect(check(good, "## H\n\n[ok](/insights/delegation-of-authority)\n")).toEqual([]);
    expect(check(good, "## H\n\n[no](/insights/unwritten-draft)\n").join()).toContain("does not match a page");
  });

  it("keeps its lists in step with the site", () => {
    expect(TOPIC_KEYS).toEqual(TOPICS.map(([key]) => key));
    expect(SERVICE_SLUGS).toEqual(SITE_SERVICES.map((service) => service.slug));
    expect(CASE_SLUGS).toEqual(PUBLIC_CASES.map((study) => study.slug));
  });
});
