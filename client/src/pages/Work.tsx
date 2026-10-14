/** Our work: selected engagements, the client logo grid and the two case-study pages (ported from build_site.py). */
import { Link, useParams } from "wouter";
import { CtaBand, PageHero, SampleTag } from "@/site/blocks";
import { CLIENTS, PUBLIC_CASES } from "@/site/content/work";
import { ROUTES } from "@/site/nav";
import NotFound from "./NotFound";

export default function Work() {
  return (
    <>
      <PageHero
        className="ow-hero"
        title="Our work"
        sub="Selected engagements showing how diagnosis, advisory, and implementation guidance address business challenges."
        crumbs={[
          ["Home", "/"],
          ["Our work", null],
        ]}
      />
      <section className="band white ow-cases" aria-labelledby="cases-h">
        <div className="wrap">
          <h2 id="cases-h">Selected engagements</h2>
          <ul className="ow-grid">
            {PUBLIC_CASES.map((c) => {
              const [src, w, h, alt] = c.img;
              return (
                <li className="ow-card" key={c.slug}>
                  <img src={src} alt={alt} width={w} height={h} loading="lazy" />
                  <div className="ow-body">
                    <p className="ow-sector">{c.sector}</p>
                    <h3>{c.title}</h3>
                    <p className="ow-text">{c.text}</p>
                    <p className="ow-service">{c.service}</p>
                    <Link className="ow-more" href={`${ROUTES.work}/${c.slug}`}>
                      <span className="cta-label">Read case study</span>
                      <span className="sr-only">: {c.title}</span>
                      <span aria-hidden="true"> →</span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="band ow-clients" aria-labelledby="clients-h">
        <div className="wrap">
          <h2 id="clients-h">Organizations we work with</h2>
          <p className="ow-lede">Selected organizations included in our corporate profile.</p>
          <ul className="ow-logos">
            {CLIENTS.map((c) => (
              <li key={c.file}>
                <img src={`/media/clients/${c.file}.png`} alt={c.name} width={c.w} height={c.h} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Have a similar challenge?" id="contact" className="ow-cta" />
    </>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const c = PUBLIC_CASES.find((x) => x.slug === slug);
  if (!c?.page) return <NotFound />;
  const p = c.page;
  return (
    <>
      <PageHero
        pill={c.sector}
        title={c.title}
        crumbs={[
          ["Home", "/"],
          ["Our work", ROUTES.work],
          [c.title, null],
        ]}
        extra={
          <p>
            <SampleTag />
          </p>
        }
      />
      <section className="band white" aria-label="Engagement">
        <div className="wrap cols">
          <img src={p.img} alt={p.alt} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} loading="lazy" />
          <ol className="numbered">
            <li>
              <strong>Challenge</strong>
              <span>{p.challenge}</span>
            </li>
            <li>
              <strong>Darwish &amp; Co.’s role</strong>
              <span>{p.scope}</span>
            </li>
            <li>
              <strong>Deliverables</strong>
              <span>{p.deliverables}</span>
            </li>
            <li>
              <strong>Outcome</strong>
              <span>
                {p.outcome}
                {p.outcomePending && (
                  <>
                    {" "}
                    <span className="pending-text">{p.outcomePending}</span>
                  </>
                )}
              </span>
            </li>
          </ol>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
