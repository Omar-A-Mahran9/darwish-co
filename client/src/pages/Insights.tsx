/** Insights listing with topic filters, and the article pages (ported from insights_page in build_site.py). */
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { CtaBand, PageHero, SampleTag } from "@/site/blocks";
import { SHOWN_ARTICLES, TOPICS, type Article } from "@shared/insights";
import { ARTICLE_BODIES } from "@shared/articleBodies";
import { ROUTES, SITE_SERVICES, serviceHref } from "@/site/nav";
import PreferredSource from "@/site/PreferredSource";
import NotFound from "./NotFound";

const TOPIC_NAME: Record<string, string> = Object.fromEntries(TOPICS);
const STATUS_TAG: Record<Article["status"], [string | null, string]> = {
  planned: ["Planned article", "Preview draft"],
  sample: ["Sample article", "Preview example"],
  published: [null, "Read article"],
};

export default function Insights() {
  const shown = SHOWN_ARTICLES;
  const topics = TOPICS.filter(([k]) => shown.some((a) => a.topic === k));
  const [topic, setTopic] = useState("all");

  // The address hash (/insights#governance) preselects a topic.
  useEffect(() => {
    const pick = () => {
      const h = window.location.hash.slice(1);
      setTopic(TOPIC_NAME[h] ? h : "all");
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  const visible = shown.filter((a) => topic === "all" || a.topic === topic);
  const label = topic === "all" ? "" : TOPIC_NAME[topic];
  const count = `${visible.length}${visible.length === 1 ? " article" : " articles"}${label ? " in " + label : ""}`;

  return (
    <>
      <PageHero
        className="ow-hero"
        title="Insights"
        sub="Practical perspectives on strategy, governance, people, operations, and growth."
        crumbs={[
          ["Home", "/"],
          ["Insights", null],
        ]}
      />
      <section className="band white in-list" aria-labelledby="list-h">
        <div className="wrap">
          <h2 id="list-h" className="sr-only">
            Articles
          </h2>
          {shown.length ? (
            <>
              <div className="topic-filter" role="group" aria-label="Filter by topic">
                <button type="button" aria-pressed={topic === "all"} onClick={() => setTopic("all")} data-value="all">
                  All topics
                </button>
                {topics.map(([k, v]) => (
                  <button type="button" aria-pressed={topic === k} onClick={() => setTopic(k)} data-value={k} key={k}>
                    {v}
                  </button>
                ))}
              </div>
              <p className="topic-count" id="topic-count" aria-live="polite">
                {count}
              </p>
              <ul className="in-grid">
                {shown.map((a) => {
                  const [tag, verb] = STATUS_TAG[a.status];
                  const meta = [a.author, a.date].filter(Boolean).join(" · ");
                  return (
                    <li className="in-card" data-topic={a.topic} hidden={!(topic === "all" || a.topic === topic)} key={a.slug}>
                      {a.cover && <img className="in-cover" src={a.cover} alt="" width={1200} height={676} loading="lazy" decoding="async" />}
                      <p className="in-topic">{TOPIC_NAME[a.topic]}</p>
                      <h3>{a.title}</h3>
                      <p className="in-sum">{a.listing}</p>
                      {meta && <p className="in-meta">{meta}</p>}
                      <div className="in-foot">
                        {tag && <SampleTag>{tag}</SampleTag>}
                        <Link className="in-more" href={`${ROUTES.insights}/${a.slug}`}>
                          <span className="cta-label">{verb}</span>
                          <span className="sr-only">: {a.title}</span>
                          <span className="in-arrow" aria-hidden="true">
                            →
                          </span>
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="in-empty" id="topic-empty" hidden={visible.length > 0}>
                <p>No articles are available in this topic yet.</p>
                <button
                  type="button"
                  className="in-reset"
                  onClick={(e) => {
                    setTopic("all");
                    e.currentTarget.closest(".wrap")?.querySelector<HTMLButtonElement>('[data-value="all"]')?.focus();
                  }}
                >
                  View all insights
                </button>
              </div>
              <PreferredSource />
            </>
          ) : (
            <div className="in-empty">
              <p>
                <strong>Our first insights are being prepared.</strong>
              </p>
              <p>Please check back for practical perspectives from Darwish &amp; Co.</p>
            </div>
          )}
        </div>
      </section>
      <CtaBand
        title="Have a challenge behind the question?"
        text="Tell us what your organization is facing. We’ll help you frame the issue and identify a practical next step."
        id="contact"
        className="ow-cta"
      />
    </>
  );
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const a = SHOWN_ARTICLES.find((x) => x.slug === slug);
  if (!a) return <NotFound />;
  const service = SITE_SERVICES.find((s) => s.slug === a.service);
  return (
    <>
      <PageHero
        pill={TOPIC_NAME[a.topic]}
        title={a.title}
        sub={a.summary}
        crumbs={[
          ["Home", "/"],
          ["Insights", ROUTES.insights],
          [a.title, null],
        ]}
        extra={
          <>
            {a.featured && (
              <div className="mag-author" style={{ marginTop: 8 }}>
                <img src="/media/people/fouad-darwish-avatar.jpg" alt="" width={44} height={44} />
                <div>
                  <strong>Fouad Darwish</strong>
                  <span>Founder &amp; Managing Partner</span>
                </div>
              </div>
            )}
            <p style={{ marginTop: 6 }}>
              <SampleTag />
            </p>
          </>
        }
      />
      <section className="band white" aria-label="Article">
        <div className="wrap cols">
          <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <span className="k" style={{ font: "600 14px/1.3 var(--sans)", color: "#006BA3" }}>
              Related service
            </span>
            {service && (
              <Link className="arrow-link" href={serviceHref(service.slug)}>
                {service.title} →
              </Link>
            )}
          </div>
          {ARTICLE_BODIES[a.slug] ? (
            <div className="prose">
              {a.cover && <img className="article-cover" src={a.cover} alt={a.coverAlt ?? ""} width={1200} height={676} decoding="async" />}
              <div dangerouslySetInnerHTML={{ __html: ARTICLE_BODIES[a.slug] }} />
              <PreferredSource />
              <p>
                <Link className="arrow-link" href={ROUTES.insights}>
                  &larr; Back to all insights
                </Link>
              </p>
            </div>
          ) : (
            <div className="prose">
            <p className="pending-text">The approved article will replace this text. Articles naming Egyptian or Gulf laws or regulators need a named, qualified reviewer before publishing.</p>
            <h2>Why this matters</h2>
            <p className="pending-text">[Approved text pending]</p>
            <h2>What good practice looks like</h2>
            <p className="pending-text">[Approved text pending]</p>
            <h2>Where to start</h2>
            <p className="pending-text">[Approved text pending]</p>
            <p>
              <Link className="arrow-link" href={ROUTES.insights}>
                ← Back to all insights
              </Link>
            </p>
          </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
