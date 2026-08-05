import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  keywords: string[];
  coverImage?: string;
  featured?: boolean;
  hasFullPost?: boolean;
};

const articles: Article[] = [
  // ── New AI articles (from uploaded DOCX) ──────────────────────────────────
  {
    slug: "ai-human-oversight-governance",
    title: "When AI Accelerates the Wrong Decision: Why Human Oversight Is a Governance Requirement",
    excerpt:
      "AI can accelerate decisions, but without effective governance it can also scale outdated data, hidden bias, and institutional error. The question is not whether to use AI — it is who remains responsible when an AI-supported decision causes harm.",
    date: "July 2026",
    readTime: "8 min read",
    category: "AI Governance",
    categoryColor: "text-primary bg-primary/10",
    keywords: ["AI human oversight", "AI governance", "automation bias", "responsible AI"],
    coverImage: "/manus-storage/blog-ai-governance_a92bc631.jpg",
    featured: true,
    hasFullPost: true,
  },
  {
    slug: "ai-bias-mena-education",
    title: "AI in MENA Education: When Automation Reinforces Existing Inequality",
    excerpt:
      "AI can improve education across the MENA region, but biased historical data and weak institutional oversight may reinforce inequality in admissions, grading, scholarships, and student monitoring.",
    date: "July 2026",
    readTime: "9 min read",
    category: "AI & Education",
    categoryColor: "text-chart-2 bg-chart-2/10",
    keywords: ["AI in MENA education", "algorithmic bias in education", "responsible AI in schools"],
    coverImage: "/manus-storage/blog-ai-education-mena_02068c1d.jpg",
    hasFullPost: true,
  },
  {
    slug: "ai-institutional-bias-governance",
    title: "AI Does Not Eliminate Institutional Bias — It Can Scale It",
    excerpt:
      "Organizations invest in AI expecting more objective decisions. But AI learns from institutional data. If that data reflects unfair practices, weak governance, or corruption, the system may automate and accelerate those problems rather than fix them.",
    date: "July 2026",
    readTime: "10 min read",
    category: "AI Governance",
    categoryColor: "text-primary bg-primary/10",
    keywords: ["AI institutional bias", "AI and corruption", "algorithmic accountability"],
    coverImage: "/manus-storage/blog-ai-institutional-bias_aaa12434.jpg",
    hasFullPost: true,
  },
  // ── Existing articles ─────────────────────────────────────────────────────
  {
    slug: "grc-consulting-egypt-2026",
    title: "GRC Consulting in Egypt 2026: What SMEs Need to Know",
    excerpt:
      "Governance, Risk & Compliance is no longer a concern reserved for large corporations. Egyptian SMEs are increasingly required to demonstrate structured GRC frameworks to access financing, win government contracts, and attract international partners.",
    date: "May 2026",
    readTime: "6 min read",
    category: "Governance & Risk",
    categoryColor: "text-primary bg-primary/10",
    keywords: ["GRC consulting Egypt", "governance risk compliance MENA", "SME compliance Egypt"],
  },
  {
    slug: "hr-compliance-egypt-2026",
    title: "HR Compliance in Egypt 2026: Key Labour Law Updates for SMEs",
    excerpt:
      "Egypt's labour regulations have seen significant updates affecting contract structures, end-of-service benefits, and remote work policies. This guide covers the most important HR compliance requirements for growth-stage companies in Egypt and the broader MENA region.",
    date: "April 2026",
    readTime: "5 min read",
    category: "Human Resources",
    categoryColor: "text-chart-2 bg-chart-2/10",
    keywords: ["HR compliance Egypt 2026", "labour law Egypt SME", "HR consulting MENA"],
  },
  {
    slug: "consumer-research-mena-guide",
    title: "Consumer Research in MENA: A Practical Guide for Market Entry",
    excerpt:
      "Entering a new market in the MENA region without consumer research is one of the most common and costly mistakes businesses make. This guide explains the methodologies that work best in the region.",
    date: "March 2026",
    readTime: "7 min read",
    category: "Market Research",
    categoryColor: "text-emerald-700 bg-emerald-50",
    keywords: ["consumer research MENA", "market entry research Egypt", "brand tracking Gulf"],
  },
];

export default function Blog() {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <div className="flex flex-col min-h-screen font-body">
      {/* Header */}
      <section className="py-24 bg-white border-b">
        <div className="container max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Insights &amp; Perspectives
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            The Darwish &amp; Co. Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical guidance on strategic management, GRC, HR compliance, AI governance,
            and market research for MENA's growth-stage businesses.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-16 bg-secondary/20">
          <div className="container max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Cover image */}
              {featured.coverImage && (
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${featured.categoryColor}`}>
                    {featured.category}
                  </span>
                </div>
              )}
              <div className="space-y-6">
                {!featured.coverImage && (
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${featured.categoryColor}`}>
                    {featured.category}
                  </span>
                )}
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {featured.readTime}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featured.keywords.map((kw) => (
                    <span key={kw} className="flex items-center gap-1 text-xs text-muted-foreground bg-white border px-2 py-1 rounded-sm">
                      <Tag className="w-3 h-3" /> {kw}
                    </span>
                  ))}
                </div>
                {featured.hasFullPost ? (
                  <Link href={`/blog/${featured.slug}`}>
                    <Button className="bg-primary text-white hover:bg-primary/90 rounded-none font-bold">
                      Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/contact">
                    <Button className="bg-primary text-white hover:bg-primary/90 rounded-none font-bold">
                      Request a Consultation <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-10">
            All Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article) => (
              <div
                key={article.slug}
                className="border border-border flex flex-col hover:border-primary/40 transition-colors duration-200 overflow-hidden"
              >
                {/* Cover image */}
                {article.coverImage && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${article.categoryColor}`}>
                      {article.category}
                    </span>
                  </div>
                )}
                <div className="p-6 space-y-3 flex flex-col flex-1">
                  {!article.coverImage && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${article.categoryColor}`}>
                      {article.category}
                    </span>
                  )}
                  <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {article.keywords.slice(0, 2).map((kw) => (
                      <span key={kw} className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-sm">
                        <Tag className="w-3 h-3" /> {kw}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    {article.hasFullPost ? (
                      <Link href={`/blog/${article.slug}`}>
                        <Button size="sm" className="bg-primary text-white hover:bg-primary/90 rounded-none font-bold w-full">
                          Read Article <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/contact">
                        <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none font-bold w-full">
                          Get in Touch <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div className="border-2 border-dashed border-primary/30 p-6 space-y-4 flex flex-col justify-center items-start bg-primary/5">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Coming Soon
              </span>
              <h3 className="font-heading text-lg font-bold text-foreground">
                New articles every month
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We publish practical guides on strategic management, GRC, HR compliance,
                AI governance, and market research for MENA businesses.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none font-bold">
                  Suggest a Topic <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Ready to put these insights into action?
          </h2>
          <p className="text-white/90 text-lg font-light">
            Our consultants are available to help you apply these frameworks
            directly to your business.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold rounded-none px-10 mt-4">
              Book a Free Discovery Call
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
