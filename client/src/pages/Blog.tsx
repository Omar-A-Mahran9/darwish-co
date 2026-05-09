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
  featured?: boolean;
};

const articles: Article[] = [
  {
    slug: "grc-consulting-egypt-2026",
    title: "GRC Consulting in Egypt 2026: What SMEs Need to Know",
    excerpt:
      "Governance, Risk & Compliance is no longer a concern reserved for large corporations. Egyptian SMEs are increasingly required to demonstrate structured GRC frameworks to access financing, win government contracts, and attract international partners. Here is what the landscape looks like in 2026 and how to prepare.",
    date: "May 2026",
    readTime: "6 min read",
    category: "Governance & Risk",
    categoryColor: "text-primary bg-primary/10",
    keywords: ["GRC consulting Egypt", "governance risk compliance MENA", "SME compliance Egypt"],
    featured: true,
  },
  {
    slug: "hr-compliance-egypt-2026",
    title: "HR Compliance in Egypt 2026: Key Labour Law Updates for SMEs",
    excerpt:
      "Egypt's labour regulations have seen significant updates affecting contract structures, end-of-service benefits, and remote work policies. This guide covers the most important HR compliance requirements for growth-stage companies operating in Egypt and the broader MENA region.",
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
      "Entering a new market in the MENA region without consumer research is one of the most common and costly mistakes businesses make. This guide explains the methodologies that work best in the region — from panel studies and focus groups to brand health tracking — and how to interpret the data for actionable decisions.",
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
            Practical guidance on strategic management, GRC, HR compliance, and
            market research for MENA's growth-stage businesses.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-16 bg-secondary/20">
          <div className="container max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${featured.categoryColor}`}>
                  {featured.category}
                </span>
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
                <Link href="/contact">
                  <Button className="bg-primary text-white hover:bg-primary/90 rounded-none font-bold">
                    Request a Consultation <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="bg-primary/5 border border-primary/20 p-8 rounded-none space-y-4">
                <p className="text-sm font-bold text-primary uppercase tracking-widest">
                  Key Topics Covered
                </p>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">→</span>
                    What GRC means for Egyptian SMEs in 2026
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">→</span>
                    Regulatory requirements for financing and government tenders
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">→</span>
                    How to build a GRC framework on a limited budget
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">→</span>
                    Common compliance gaps and how to close them
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  {featured.keywords.map((kw) => (
                    <span key={kw} className="flex items-center gap-1 text-xs text-muted-foreground bg-white border px-2 py-1 rounded-sm">
                      <Tag className="w-3 h-3" /> {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-10">
            More Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {rest.map((article) => (
              <div
                key={article.slug}
                className="border border-border p-8 space-y-4 hover:border-primary/40 transition-colors duration-200"
              >
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${article.categoryColor}`}>
                  {article.category}
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground leading-tight">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {article.readTime}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((kw) => (
                    <span key={kw} className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-sm">
                      <Tag className="w-3 h-3" /> {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA card — invite readers to suggest topics */}
            <div className="border-2 border-dashed border-primary/30 p-8 space-y-4 flex flex-col justify-center items-start bg-primary/5">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Coming Soon
              </span>
              <h3 className="font-heading text-xl font-bold text-foreground">
                New articles published every month
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We publish practical guides on strategic management, GRC, HR
                compliance, and market research for MENA businesses. Subscribe
                or reach out to suggest a topic.
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
