/**
 * Service pages. Each service picks one of eight layouts (content in site/content/services.ts); the markup
 * follows prototype/tools/service_detail.py so the pages match the approved prototype.
 */
import { Redirect, useParams } from "wouter";
import { SERVICE_REDIRECTS } from "@shared/site";
import ContactSection from "@/site/ContactSection";
import { SITE_SERVICES } from "@/site/nav";
import { SERVICE_DETAIL } from "@/site/content/services";
import { PEOPLE } from "@/site/content/site";
import {
  AdvisorBlock,
  AssetSlot,
  CaseBlock,
  Chevron,
  Crumbs,
  DarkHero,
  ExpertsBlock,
  FaqRelated,
  Faqs,
  Icon,
  LightHero,
  PartnerStrip,
  Plus,
  SiteLink,
  hasPhoto,
  insightVisual,
  n2,
  stageVisual,
  useDisclosure,
  useTabs,
} from "@/site/sx";
import NotFound from "./NotFound";

type Svc = { slug: string; title: string };
type Props = { s: Svc; d: any; crumbs: React.ReactNode };

const LEAD = "Share a brief overview of your challenge. Our team will review it and contact you to agree on the next step.";
const Contact = ({ s, d, prefix }: { s: Svc; d: any; prefix: string }) => (
  <ContactSection title={d.contact.title} text={d.contact.text} lead={LEAD} idPrefix={prefix} service={s.title} />
);

/* ================================================================== Strategy (default layout) */
function StageIncludes({ id, items }: { id: string; items: string[] }) {
  const dc = useDisclosure();
  return (
    <div className="sx-disc">
      <button className="sx-disc-btn" type="button" aria-controls={id} {...dc.button}>
        What this includes <Plus />
      </button>
      <div className="sx-disc-body" id={id} hidden={!dc.open}>
        <ul className="sx-dots">
          {items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ToolRow({ i, row }: { i: number; row: [string, string, string[]] }) {
  const [title, desc, items] = row;
  const dc = useDisclosure();
  const rid = `sx-tool-${i}`;
  return (
    <li className="sx-row">
      <div className="sx-row-head">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <button className="sx-row-btn" type="button" aria-controls={rid} {...dc.button}>
        <span className="sr-only">{title}: </span>Sample contents <Plus />
      </button>
      <div className="sx-row-body" id={rid} hidden={!dc.open}>
        <ul className="sx-dots">
          {items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function CaseDetail({ it, xid }: { it: any; xid: string }) {
  const dc = useDisclosure();
  return (
    <>
      <button className="btn btn-line sx-case-btn" type="button" aria-controls={xid} {...dc.button}>
        <span className="sx-dl">{dc.open ? "Hide example" : "View example"}</span>
      </button>
      <div className="sx-case-det" id={xid} hidden={!dc.open}>
        <p className="sx-mini">Example scope</p>
        <ul className="sx-dots">
          {(it.scope as string[]).map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p className="sx-mini">Example outputs</p>
        <p>{it.outputs}</p>
      </div>
    </>
  );
}

function InsightConcept({ item, cls, idx }: { item: any; cls: string; idx: number }) {
  const dc = useDisclosure();
  const pid = `sx-ins-${idx}`;
  const vis = item.visual ? (
    <div className="sx-ins-vis" dangerouslySetInnerHTML={{ __html: insightVisual(item.visual) }} />
  ) : (
    <div className="sx-ins-vis">
      <img src={item.img[0]} alt={item.img[1]} width={item.img[2]} height={item.img[3]} loading="lazy" />
    </div>
  );
  if (item.href)
    return (
      <article className={cls}>
        {vis}
        <div className="sx-ins-copy">
          <span className="sx-ins-k">Planned article</span>
          <h3>
            <SiteLink href={item.href}>{item.title}</SiteLink>
          </h3>
          <SiteLink className="sx-pill-link" href={item.href} aria-hidden="true" tabIndex={-1}>
            Read more
          </SiteLink>
        </div>
      </article>
    );
  return (
    <article className={cls}>
      {vis}
      <div className="sx-ins-copy">
        <span className="sx-ins-k">Article concept</span>
        <h3>{item.title}</h3>
        <button className="sx-pill-link" type="button" aria-controls={pid} {...dc.button}>
          <span className="sx-dl">{dc.open ? "Hide preview" : "Preview concept"}</span>
        </button>
        <div className="sx-ins-prev" id={pid} hidden={!dc.open}>
          <p>{item.preview}</p>
          <p className="sx-mini">Not yet published</p>
        </div>
      </div>
    </article>
  );
}

function StrategyLayout({ s, d, crumbs }: Props) {
  const h = d.hero, c = d.challenges, b = d.benefits, a = d.approach, j = d.journey, t = d.tools, eco = d.ecosystem, g = d.grid, cs = d.cases, ins = d.insights, ad = d.advisors;
  const journey = useTabs(j.stages.length);
  const cases = useTabs(cs.items.length);
  const [[t1, x1], [t2, x2], [t3, x3]] = g.themes;
  const [[i1, a1, w1, h1], [i2, a2, w2, h2]] = g.images;
  const tile = (n: number, tt: string, xx: string) => (
    <div className="sx-gt">
      <span className="sx-gn">{n2(n)}</span>
      <h3>{tt}</h3>
      <p>{xx}</p>
    </div>
  );
  const p = PEOPLE[ad.person];
  const [st, sx] = ad.support;
  return (
    <div className="sx">
      <section className="page-hero sx-hero gv-hero dark has-photo" aria-labelledby="page-title">
        <AssetSlot slot={h.slot} cls="gv-hero-slot" />
        <div className="sx-wrap gv-hero-in">
          <div className="sx-hero-copy gv-hero-copy">
            {crumbs}
            <span className="sx-eyebrow">{h.label}</span>
            <h1 id="page-title">{h.title}</h1>
            <p className="sx-lede">{h.intro}</p>
            <div className="sx-ctas">
              <a className="btn btn-blue" href="#contact">
                <span className="cta-label">Discuss your challenge</span>
              </a>
              <a className="btn btn-ghost" href="#journey">
                <span className="cta-label">Explore our approach</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="sx-strip" aria-label="How we advise">
        <div className="sx-wrap">
          <ul className="sx-strip-list">
            {(d.strip as [string, string][]).map(([tt, xx]) => (
              <li key={tt}>
                <strong>{tt}</strong>
                <span>{xx}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sx-sec sx-white" aria-labelledby="sx-chal-h">
        <div className="sx-wrap">
          <h2 id="sx-chal-h" className="sx-h2">
            {c.title}
          </h2>
          <ul className="sx-chal">
            {(c.items as string[]).map((i) => (
              <li key={i}>
                <Chevron />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sx-sec sx-navy" aria-labelledby="sx-ben-h">
        <div className="sx-wrap sx-ben">
          <div>
            <h2 id="sx-ben-h" className="sx-h2">
              {b.title}
            </h2>
            <ul className="sx-ben-list">
              {(b.items as [string, string][]).map(([ic, tt]) => (
                <li key={tt}>
                  <Icon name={ic} />
                  <span>{tt}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="sx-statement">
            <span className="sx-st-label">{b.panel_label}</span>
            <p>{b.panel_text}</p>
            <span className="sx-st-mark" aria-hidden="true">
              <img src="/media/emblem.png" alt="" width={34} height={34} />
              Darwish &amp; Co.
            </span>
          </figure>
        </div>
      </section>

      <section className="sx-sec sx-white sx-approach" aria-labelledby="sx-app-h">
        <div className="sx-wrap">
          <h2 id="sx-app-h" className="sx-h2 sx-wide">
            {a.title}
          </h2>
          <div className="sx-app">
            <div className="sx-app-copy">
              {(a.paras as string[]).map((x) => (
                <p key={x}>{x}</p>
              ))}
            </div>
            <div className="sx-app-panel">
              <p>{a.panel}</p>
              <ol className="sx-parts">
                {(a.parts as [string, string][]).map(([tt, xx], i) => (
                  <li key={tt}>
                    <span className="sx-pi">{n2(i + 1)}</span>
                    <strong>{tt}</strong>
                    <span>{xx}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="sx-journey" id="journey">
            <h3 className="sx-kicker">Our four-stage approach</h3>
            <div data-tabs="">
              <div className="sx-tabs" role="tablist" aria-label="Engagement stages">
                {(j.stages as any[]).map((stg, i) => (
                  <button className="sx-tab" id={`sx-tab-${stg.key}`} aria-controls={`sx-panel-${stg.key}`} key={stg.key} {...journey.tabProps(i)}>
                    <span className="sx-step">Step {n2(i + 1)}</span>
                    <span className="sx-tab-t">{stg.title}</span>
                    <span className="sx-tick" aria-hidden="true" />
                  </button>
                ))}
              </div>
              {(j.stages as any[]).map((stg, i) => (
                <div className="sx-panel" role="tabpanel" id={`sx-panel-${stg.key}`} aria-labelledby={`sx-tab-${stg.key}`} tabIndex={0} hidden={journey.sel !== i} key={stg.key}>
                  <div className="sx-panel-copy">
                    <h3>
                      <span>{i + 1}.</span> {stg.title}
                    </h3>
                    <p>{stg.desc}</p>
                    <StageIncludes id={`sx-inc-${stg.key}`} items={stg.includes} />
                    <p className="sx-out">
                      <strong>Outputs</strong>
                      {stg.outputs}
                    </p>
                  </div>
                  <figure className="sx-panel-vis">
                    <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: stageVisual(stg.visual, "sv-" + stg.key) }} />
                    {stg.visual === "roadmap" && <figcaption>Illustrative roadmap. Phases and timing are set during the engagement.</figcaption>}
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sx-sec sx-warm" aria-labelledby="sx-tools-h">
        <div className="sx-wrap">
          <h2 id="sx-tools-h" className="sx-h2 sx-wide">
            {t.title}
          </h2>
          <div className="sx-tools">
            <div className="sx-tools-l">
              <p className="sx-body">{t.text}</p>
              <ul className="sx-sum">
                {(t.summary as [string, string][]).map(([aa, bb]) => (
                  <li key={aa}>
                    <strong>{aa}</strong>
                    <span>{bb}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="sx-rows">
              {(t.rows as [string, string, string[]][]).map((row, i) => (
                <ToolRow key={row[0]} i={i} row={row} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sx-sec sx-pale" aria-labelledby="sx-eco-h">
        <div className="sx-wrap sx-center">
          <h2 id="sx-eco-h" className="sx-h2">
            {eco.title}
          </h2>
          <p className="sx-body sx-measure">{eco.text}</p>
          <ul className="sx-eco">
            {(eco.blocks as [string, string, string][]).map(([ic, nn, xx]) => (
              <li key={nn}>
                <Icon name={ic} />
                <strong>{nn}</strong>
                <span>{xx}</span>
              </li>
            ))}
          </ul>
          <p className="sx-note">
            {eco.note} <SiteLink href="/about#partners">See the partner ecosystem</SiteLink>
          </p>
        </div>
      </section>

      <section className="sx-sec sx-white" aria-labelledby="sx-grid-h">
        <div className="sx-wrap">
          <h2 id="sx-grid-h" className="sx-h2 sx-wide">
            {g.title}
          </h2>
          <div className="sx-alt">
            <div className="sx-alt-col">
              {tile(1, t1, x1)}
              <img className="sx-gi" src={i1} alt={a1} width={w1} height={h1} loading="lazy" decoding="async" />
            </div>
            <div className="sx-alt-col sx-rev">
              {tile(2, t2, x2)}
              <img className="sx-gi" src={i2} alt={a2} width={w2} height={h2} loading="lazy" decoding="async" />
            </div>
            <div className="sx-alt-col">
              {tile(3, t3, x3)}
              <div className="sx-words" role="img" aria-label={(g.words as string[]).join(" / ")}>
                {(g.words as string[]).map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sx-sec sx-warm" aria-labelledby="sx-case-h">
        <div className="sx-wrap">
          <div className="sx-head-row">
            <div>
              <h2 id="sx-case-h" className="sx-h2">
                {cs.title}
              </h2>
              <p className="sx-body sx-measure">{cs.intro}</p>
            </div>
            <SiteLink className="sx-link" href="/projects">
              See our client work
            </SiteLink>
          </div>
          <div data-tabs="" className="sx-cases">
            {(cs.items as any[]).map((it, i) => {
              const [src, alt, w, hh] = it.img;
              return (
                <div className="sx-case" role="tabpanel" id={`sx-case-${it.key}`} aria-labelledby={`sx-ctab-${it.key}`} hidden={cases.sel !== i} key={it.key}>
                  <img className="sx-case-img" src={src} alt={alt} width={w} height={hh} loading="lazy" decoding="async" />
                  <div className="sx-case-copy">
                    <span className="sx-illus">Illustrative engagement</span>
                    <span className="sx-case-k">{it.sector}</span>
                    <h3>{it.title}</h3>
                    <p>{it.summary}</p>
                    <CaseDetail it={it} xid={`sx-cdet-${it.key}`} />
                  </div>
                </div>
              );
            })}
            <div className="sx-ctabs" role="tablist" aria-label="Illustrative engagements">
              {(cs.items as any[]).map((it, i) => (
                <button className="sx-ctab" id={`sx-ctab-${it.key}`} aria-controls={`sx-case-${it.key}`} key={it.key} {...cases.tabProps(i)}>
                  <img src={it.img[0]} alt="" width={it.img[2]} height={it.img[3]} loading="lazy" />
                  <span>
                    <span className="sx-ctab-k">{it.sector}</span>
                    <span className="sx-ctab-t">{it.title}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sx-sec sx-pale" aria-labelledby="sx-ins-h">
        <div className="sx-wrap">
          <div className="sx-head-row">
            <h2 id="sx-ins-h" className="sx-h2">
              {ins.title}
            </h2>
            <SiteLink className="sx-link" href="/insights#strategy">
              All strategy insights
            </SiteLink>
          </div>
          <div className="sx-ins">
            <InsightConcept item={ins.featured} cls="sx-ins-feat" idx={0} />
            <div className="sx-ins-side">
              {(ins.items as any[]).map((it, i) => (
                <InsightConcept key={it.title} item={it} cls="sx-ins-item" idx={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sx-sec sx-white" aria-labelledby="sx-adv-h">
        <div className="sx-wrap sx-center">
          <h2 id="sx-adv-h" className="sx-h2">
            {ad.title}
          </h2>
          <div className="sx-adv">
            <div className="sx-person">
              <img src={`/media/people/${p.photo}`} alt="" width={400} height={400} loading="lazy" />
              <strong>{p.name}</strong>
              <span>{p.title}</span>
            </div>
            <div className="sx-support">
              <Icon name="people" cls="sx-ico sx-ico-lg" />
              <strong>{st}</strong>
              <span>{sx}</span>
              <SiteLink className="sx-link" href="/about#experts">
                Meet our experts
              </SiteLink>
            </div>
          </div>
        </div>
      </section>

      <ContactSection
        title={d.contact.title}
        text={d.contact.text}
        lead=""
        idPrefix="sx"
        service={s.title}
        variant="strategy"
        privacy="We use these details only to respond to your enquiry."
      />

      <section className="sx-sec sx-white" aria-labelledby="sx-faq-h">
        <div className="sx-wrap">
          <h2 id="sx-faq-h" className="sx-h2">
            Frequently asked questions
          </h2>
          <Faqs items={d.faqs} />
        </div>
      </section>
    </div>
  );
}

/* ================================================================== Governance ("gov") */
function GovLayout({ s, d, crumbs }: Props) {
  const n = d.needs, sc = d.scope, o = d.outputs, a = d.assessment;
  const tabs = useTabs(sc.tabs.length);
  return (
    <div className="sx sx-gov">
      <section className={`page-hero sx-hero gv-hero dark${hasPhoto(d.hero.slot) ? " has-photo" : ""}`} aria-labelledby="page-title">
        <AssetSlot slot={d.hero.slot} cls="gv-hero-slot" />
        <div className="sx-wrap gv-hero-in">
          <div className="gv-hero-copy">
            {crumbs}
            <span className="sx-eyebrow">{d.hero.label}</span>
            <h1 id="page-title">{d.hero.title}</h1>
            <p className="sx-lede">{d.hero.intro}</p>
            <div className="gv-ctas">
              <a className="btn btn-blue" href="#contact">
                <span className="cta-label">Discuss your challenge</span>
              </a>
              <a className="gv-anchor" href={`#${d.hero.anchor[1]}`}>
                {d.hero.anchor[0]}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="sx-sec sx-warm gv-tight" aria-labelledby="gv-need-h">
        <div className="sx-wrap">
          <h2 id="gv-need-h" className="sx-h2">
            {n.title}
          </h2>
          <ul className="gv-needs">
            {(n.items as [string, string][]).map(([t, x]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sx-sec sx-white" id="scope" aria-labelledby="gv-scope-h">
        <div className="sx-wrap">
          <div className="gv-head">
            <h2 id="gv-scope-h" className="sx-h2">
              {sc.title}
            </h2>
            <p className="gv-body">{sc.intro}</p>
          </div>
          <div className="gv-scope" data-tabs="" data-stack="">
            <div className="gv-tabs" role="tablist" aria-label="Scope areas" aria-orientation="vertical">
              {(sc.tabs as string[][]).map(([key, label], i) => (
                <button className="gv-tab" id={`gv-tab-${key}`} aria-controls={`gv-panel-${key}`} key={key} {...tabs.tabProps(i)}>
                  <span className="gv-tab-n">{n2(i + 1)}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div className="gv-panels">
              {(sc.tabs as string[][]).map(([key, label, head, body, outl], i) => (
                <div className={"gv-panel" + (tabs.sel === i ? "" : " is-off")} role="tabpanel" id={`gv-panel-${key}`} aria-labelledby={`gv-tab-${key}`} tabIndex={0} key={key}>
                  <p className="gv-panel-k">{label}</p>
                  <h3>{head}</h3>
                  <p>{body}</p>
                  <p className="gv-out">{outl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="sx-sec sx-navy" aria-labelledby="gv-out-h">
        <div className="sx-wrap">
          <h2 id="gv-out-h" className="sx-h2">
            {o.title}
          </h2>
          <ol className="gv-docs">
            {(o.items as [string, string][]).map(([t, x], i) => (
              <li key={t}>
                <span className="gv-doc-n">{n2(i + 1)}</span>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ol>
          <p className="gv-result">{o.result}</p>
        </div>
      </section>
      <section className="sx-sec sx-pale" aria-labelledby="gv-as-h">
        <div className="sx-wrap gv-split">
          <div className="gv-head">
            <h2 id="gv-as-h" className="sx-h2">
              {a.title}
            </h2>
            <p className="gv-body">{a.text}</p>
          </div>
          <ol className="gv-steps">
            {(a.steps as string[]).map((x, i) => (
              <li key={x}>
                <span>{n2(i + 1)}</span>
                <p>{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="sx-sec sx-warm" aria-labelledby="gv-ex-h">
        <div className="sx-wrap">
          <ExpertsBlock x={d.experts} hid="gv-ex-h" logoAlt />
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="gv-faq-h">
        <div className="sx-wrap">
          <FaqRelated d={d} hid="gv-faq-h" />
        </div>
      </section>
      <Contact s={s} d={d} prefix="gv" />
    </div>
  );
}

/* ================================================================== Organizational development ("people") */
function PeopleLayout({ s, d, crumbs }: Props) {
  const h = d.hero, n = d.needs, sc = d.scope, A = sc.a, B = sc.b, o = d.outputs;
  const [t1, t2] = h.title;
  const pts = (xs: string[]) => (
    <ul className="pp-points">
      {xs.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
  return (
    <div className="sx sx-gov sx-ppl">
      <LightHero
        h={h}
        crumbs={crumbs}
        title={
          <>
            {t1} <span className="acc">{t2}</span>
          </>
        }
      />
      <section className="sx-sec sx-white" aria-labelledby="pp-need-h">
        <div className="sx-wrap pp-needs-grid">
          <h2 id="pp-need-h" className="sx-h2">
            {n.title}
          </h2>
          <ul className="pp-needs">
            {(n.items as [string, string][]).map(([t, x]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sx-sec sx-warm" id="scope" aria-labelledby="pp-scope-h">
        <div className="sx-wrap">
          <div className="gv-head">
            <h2 id="pp-scope-h" className="sx-h2">
              {sc.title}
            </h2>
            <p className="gv-body">{sc.intro}</p>
          </div>
          <div className="pp-block">
            <AssetSlot slot={A.slot} cls="pp-block-slot" />
            <div className="pp-block-copy">
              <h3>{A.title}</h3>
              <p>{A.body}</p>
              {pts(A.points)}
            </div>
          </div>
          <div className="pp-block pp-rev">
            <div className="pp-block-copy">
              <h3>{B.title}</h3>
              <p>{B.body}</p>
              {pts(B.points)}
            </div>
            <figure className="pp-dia">
              <ol aria-label="Conceptual relationship">
                {(B.diagram as string[]).map((x, i) => (
                  <li key={x}>
                    <span className="pp-dn">{n2(i + 1)}</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ol>
              <figcaption>A conceptual relationship, not an organization chart.</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="pp-out-h">
        <div className="sx-wrap">
          <h2 id="pp-out-h" className="sx-h2">
            {o.title}
          </h2>
          <ol className="pp-rows">
            {(o.items as [string, string][]).map(([t, x], i) => (
              <li key={t}>
                <span className="pp-rn">{n2(i + 1)}</span>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ol>
          <p className="pp-result">{o.result}</p>
        </div>
      </section>
      <section className="sx-sec sx-pale" aria-labelledby="pp-case-h">
        <CaseBlock c={d.case} hid="pp-case-h" extraClass={d.case.approved ? "" : " is-draft"} />
      </section>
      <section className="sx-sec sx-warm" aria-labelledby="pp-ex-h">
        <div className="sx-wrap">
          <ExpertsBlock x={d.experts} hid="pp-ex-h" />
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="pp-faq-h">
        <div className="sx-wrap">
          <FaqRelated d={d} hid="pp-faq-h" />
        </div>
      </section>
      <Contact s={s} d={d} prefix="pp" />
    </div>
  );
}

/* ================================================================== Operations ("ops") */
function OpsLayout({ s, d, crumbs }: Props) {
  const f = d.friction, a = d.approach, t = d.table, b = d.band, st = d.start;
  const [c1, c2] = t.cols;
  return (
    <div className="sx sx-gov sx-ops">
      <DarkHero h={d.hero} crumbs={crumbs} />
      <section className="sx-sec sx-white" aria-labelledby="op-fr-h">
        <div className="sx-wrap">
          <h2 id="op-fr-h" className="sx-h2">
            {f.title}
          </h2>
          <ul className="op-fric">
            {(f.items as [string, string, string][]).map(([ic, tt, x]) => (
              <li key={tt}>
                <Icon name={ic} />
                <h3>{tt}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sx-sec sx-warm" id="approach" aria-labelledby="op-ap-h">
        <div className="sx-wrap">
          <div className="gv-head">
            <h2 id="op-ap-h" className="sx-h2">
              {a.title}
            </h2>
            <p className="gv-body">{a.intro}</p>
          </div>
          <ol className="op-ribbon">
            {(a.steps as [string, string][]).map(([tt, x], i) => (
              <li key={tt}>
                <p className="op-step">
                  <span>{n2(i + 1)}</span> · {tt}
                </p>
                <p className="op-desc">{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="sx-sec sx-warm op-table-sec" aria-labelledby="op-tb-h">
        <div className="sx-wrap">
          <h2 id="op-tb-h" className="sx-h2">
            {t.title}
          </h2>
          <table className="op-table">
            <thead>
              <tr>
                <th scope="col">{c1}</th>
                <th scope="col">{c2}</th>
              </tr>
            </thead>
            <tbody>
              {(t.rows as [string, string][]).map(([o, x]) => (
                <tr key={o}>
                  <th scope="row">{o}</th>
                  <td>
                    <span className="op-ml" aria-hidden="true">
                      {c2}
                    </span>
                    {x}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="sx-sec sx-navy" aria-labelledby="op-bd-h">
        <div className="sx-wrap op-band">
          <h2 id="op-bd-h" className="sx-h2">
            {b.title}
          </h2>
          <div>
            <ul className="op-ben">
              {(b.items as string[]).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="op-note">{b.note}</p>
          </div>
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="op-st-h">
        <div className="sx-wrap">
          <div className="gv-split op-start">
            <div className="gv-head">
              <h2 id="op-st-h" className="sx-h2">
                {st.title}
              </h2>
              <p className="gv-body">{st.text}</p>
            </div>
            <ul className="op-labels" aria-label="Typical starting points">
              {(st.labels as string[]).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <PartnerStrip pt={st.partner} />
        </div>
      </section>
      <section className="sx-sec sx-warm" aria-labelledby="op-ad-h">
        <div className="sx-wrap">
          <AdvisorBlock ad={d.advisor} hid="op-ad-h" />
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="op-faq-h">
        <div className="sx-wrap">
          <FaqRelated d={d} hid="op-faq-h" />
        </div>
      </section>
      <Contact s={s} d={d} prefix="op" />
    </div>
  );
}

/* ================================================================== Growth ("growth") */
function GrowthLayout({ s, d, crumbs }: Props) {
  const dc = d.decisions, ch = d.chapters, o = d.outputs, g = d.g360;
  const [lt, lh] = g.link;
  return (
    <div className="sx sx-gov sx-grow">
      <DarkHero h={d.hero} crumbs={crumbs} />
      <section className="sx-sec sx-warm gv-tight" aria-labelledby="gr-dc-h">
        <div className="sx-wrap">
          <h2 id="gr-dc-h" className="sx-h2">
            {dc.title}
          </h2>
          <ul className="gv-needs">
            {(dc.items as [string, string][]).map(([t, x]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sx-sec sx-white" id="scope" aria-labelledby="gr-ch-h">
        <div className="sx-wrap">
          <h2 id="gr-ch-h" className="sx-h2">
            {ch.title}
          </h2>
          <ol className="gr-chapters">
            {(ch.items as [string, string][]).map(([t, x], i) => (
              <li className={"gr-ch" + (i === 1 ? " has-media" : "")} key={t}>
                <span className="gr-n">{n2(i + 1)}</span>
                <div className="gr-ch-copy">
                  <h3>{t}</h3>
                  <p>{x}</p>
                </div>
                {i === 1 && <AssetSlot slot={ch.slot} cls="gr-slot" />}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="sx-sec sx-warm" aria-labelledby="gr-out-h">
        <div className="sx-wrap">
          <h2 id="gr-out-h" className="sx-h2">
            {o.title}
          </h2>
          <ul className="gr-grid">
            {(o.items as [string, string][]).map(([t, x]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ul>
          <p className="gr-result">{o.result}</p>
        </div>
      </section>
      <section className="sx-sec sx-navy" aria-labelledby="gr-g3-h">
        <div className="sx-wrap">
          <div className="gr-g3">
            <div className="gr-g3-copy">
              <h2 id="gr-g3-h" className="sx-h2">
                {g.title}
              </h2>
              <p>{g.text}</p>
              <SiteLink className="gr-g3-link" href={lh}>
                {lt}
              </SiteLink>
            </div>
            <ol className="gr-seq" aria-label="Growth 360 stages">
              {(g.stages as any[]).map(([name, who, logo], i) => (
                <li key={name}>
                  <span className="gr-st-n">{i + 1}</span>
                  <span className="gr-st-t">
                    <strong>{name}</strong>
                    <span>{who}</span>
                  </span>
                  {logo && <img className="gr-st-logo" src={logo[0]} alt="" width={logo[1]} height={logo[2]} loading="lazy" />}
                </li>
              ))}
            </ol>
          </div>
          <ul className="gr-contrib" aria-label="Activation arms">
            {(g.partners as any[]).map(([name, text, [src, w, hh], wordmark]) => (
              <li key={name}>
                {wordmark ? (
                  <span className="gr-plate">
                    <img src={src} alt={name} width={w} height={hh} loading="lazy" />
                  </span>
                ) : (
                  <span className="gr-plate gr-plate-mark">
                    <img src={src} alt="" width={w} height={hh} loading="lazy" />
                    <span>{name}</span>
                  </span>
                )}
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sx-sec sx-pale" aria-labelledby="gr-case-h">
        <CaseBlock c={d.case} hid="gr-case-h" />
      </section>
      <section className="sx-sec sx-warm" aria-labelledby="gr-ad-h">
        <div className="sx-wrap">
          <AdvisorBlock ad={d.advisor} hid="gr-ad-h" />
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="gr-faq-h">
        <div className="sx-wrap">
          <FaqRelated d={d} hid="gr-faq-h" />
        </div>
      </section>
      <Contact s={s} d={d} prefix="gr" />
    </div>
  );
}

/* ================================================================== Negotiation ("deal") */
function DealLayout({ s, d, crumbs }: Props) {
  const n = d.needs, m = d.mandate, st = d.stages, o = d.outputs, oc = d.outcomes;
  return (
    <div className="sx sx-gov sx-ppl sx-deal">
      <LightHero h={d.hero} crumbs={crumbs} />
      <section className="sx-sec sx-white" aria-labelledby="dl-nd-h">
        <div className="sx-wrap">
          <h2 id="dl-nd-h" className="sx-h2">
            {n.title}
          </h2>
          <ol className="gv-needs dl-needs">
            {(n.items as [string, string][]).map(([t, x], i) => (
              <li key={t}>
                <span className="dl-lab">{n2(i + 1)}</span>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="sx-sec sx-warm dl-mandate-sec" aria-labelledby="dl-md-h">
        <div className="sx-wrap">
          <div className="dl-mandate">
            <h2 id="dl-md-h">{m.title}</h2>
            <p>{m.text}</p>
          </div>
        </div>
      </section>
      <section className="sx-sec sx-warm dl-stages-sec" id="approach" aria-labelledby="dl-st-h">
        <div className="sx-wrap dl-stages-grid">
          <div className="gv-head">
            <h2 id="dl-st-h" className="sx-h2">
              {st.title}
            </h2>
            <p className="gv-body">{st.intro}</p>
          </div>
          <ol className="dl-stages">
            {(st.items as [string, string][]).map(([t, x], i) => (
              <li key={t}>
                <span className="dl-n">{n2(i + 1)}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{x}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="sx-sec sx-navy" aria-labelledby="dl-out-h">
        <div className="sx-wrap">
          <h2 id="dl-out-h" className="sx-h2">
            {o.title}
          </h2>
          <ul className="gv-docs dl-docs">
            {(o.items as [string, string][]).map(([t, x]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sx-sec sx-warm" aria-labelledby="dl-oc-h">
        <div className="sx-wrap op-band dl-out">
          <h2 id="dl-oc-h" className="sx-h2">
            {oc.title}
          </h2>
          <div>
            <ul className="dl-oc">
              {(oc.items as string[]).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="dl-note">{oc.note}</p>
          </div>
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="dl-ad-h">
        <div className="sx-wrap">
          <AdvisorBlock ad={d.advisor} hid="dl-ad-h" />
        </div>
      </section>
      <section className="sx-sec sx-warm" aria-labelledby="dl-faq-h">
        <div className="sx-wrap">
          <FaqRelated d={d} hid="dl-faq-h" />
        </div>
      </section>
      <Contact s={s} d={d} prefix="dl" />
    </div>
  );
}

/* ================================================================== Research ("research") */
function ResearchLayout({ s, d, crumbs }: Props) {
  const h = d.hero, g = d.gaps, sc = d.scope, b = d.brief, bd = d.band, st = d.start;
  const tabs = useTabs(sc.tabs.length);
  return (
    <div className="sx sx-gov sx-ppl sx-res">
      <section className="page-hero pp-hero rs-hero dark" aria-labelledby="page-title">
        <div className="pp-hero-copy">
          {crumbs}
          <span className="sx-eyebrow">{h.label}</span>
          <h1 id="page-title">{h.title}</h1>
          <p className="pp-lede">{h.intro}</p>
          <div className="gv-ctas">
            <a className="btn btn-blue" href="#contact">
              <span className="cta-label">Discuss your challenge</span>
            </a>
            <a className="gv-anchor" href={`#${h.anchor[1]}`}>
              {h.anchor[0]}
            </a>
          </div>
        </div>
        <AssetSlot slot={h.slot} cls="pp-hero-slot rs-hero-slot" />
      </section>
      <section className="sx-sec sx-white" aria-labelledby="rs-gp-h">
        <div className="sx-wrap">
          <h2 id="rs-gp-h" className="sx-h2">
            {g.title}
          </h2>
          <ul className="gv-needs dl-needs">
            {(g.items as [string, string][]).map(([t, x]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sx-sec sx-warm" id="scope" aria-labelledby="rs-sc-h">
        <div className="sx-wrap">
          <div className="gv-head">
            <h2 id="rs-sc-h" className="sx-h2">
              {sc.title}
            </h2>
            <p className="gv-body">{sc.intro}</p>
          </div>
          <div className="rs-scope" data-tabs="" data-stack="">
            <div className="rs-tabs" role="tablist" aria-label="Research lenses">
              {(sc.tabs as string[][]).map(([key, label], i) => (
                <button className="rs-tab" id={`rs-tab-${key}`} aria-controls={`rs-panel-${key}`} key={key} {...tabs.tabProps(i)}>
                  <span className="gv-tab-n">{n2(i + 1)}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div className="rs-panels">
              {(sc.tabs as string[][]).map(([key, label, head, body, output], i) => (
                <div className={"rs-panel" + (tabs.sel === i ? "" : " is-off")} role="tabpanel" id={`rs-panel-${key}`} aria-labelledby={`rs-tab-${key}`} tabIndex={0} key={key}>
                  <div className="rs-panel-copy">
                    <p className="gv-panel-k">{label}</p>
                    <h3>{head}</h3>
                    <p>{body}</p>
                  </div>
                  <div className="rs-output">
                    <Icon name="doc" cls="sx-ico rs-doc" />
                    <span>
                      <span className="rs-out-k">Output</span>
                      <strong>{output}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="rs-br-h">
        <div className="sx-wrap gv-split">
          <div className="gv-head">
            <h2 id="rs-br-h" className="sx-h2">
              {b.title}
            </h2>
            <p className="gv-body">{b.text}</p>
          </div>
          <div className="rs-brief">
            <p className="rs-brief-k">{b.label}</p>
            <dl>
              {(b.rows as [string, string][]).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <section className="rs-band sx-navy" aria-labelledby="rs-bd-h">
        <div className="sx-wrap">
          <h2 id="rs-bd-h" className="rs-band-t">
            {bd.title}
          </h2>
          <ul className="rs-band-list">
            {(bd.items as string[]).map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="rs-ex-h">
        <div className="sx-wrap">
          <ExpertsBlock x={d.experts} hid="rs-ex-h" />
        </div>
      </section>
      <section className="sx-sec sx-warm rs-start-sec" aria-labelledby="rs-st-h">
        <div className="sx-wrap">
          <div className="rs-start">
            <h2 id="rs-st-h" className="sx-h2">
              {st.title}
            </h2>
            <p className="gv-body">{st.text}</p>
          </div>
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="rs-faq-h">
        <div className="sx-wrap">
          <FaqRelated d={d} hid="rs-faq-h" />
        </div>
      </section>
      <Contact s={s} d={d} prefix="rs" />
    </div>
  );
}

/* ================================================================== Liquidation ("close") */
function AreaItem({ i, t, x }: { i: number; t: string; x: string }) {
  const dc = useDisclosure(i === 0);
  const rid = `cl-area-${i + 1}`;
  return (
    <li>
      <h3>
        <button className="cl-acc-btn" type="button" aria-controls={rid} {...dc.button}>
          <span className="cl-n">{n2(i + 1)}</span>
          <span className="cl-t">{t}</span>
          <Plus />
        </button>
      </h3>
      <div className="cl-acc-body" id={rid} hidden={!dc.open}>
        <p>{x}</p>
      </div>
    </li>
  );
}

function CloseLayout({ s, d, crumbs }: Props) {
  const n = d.needs, po = d.position, a = d.areas, o = d.outputs, c = d.coord;
  return (
    <div className="sx sx-gov sx-ppl sx-close">
      <LightHero h={d.hero} crumbs={crumbs} />
      <section className="sx-sec sx-white" aria-labelledby="cl-nd-h">
        <div className="sx-wrap">
          <h2 id="cl-nd-h" className="sx-h2">
            {n.title}
          </h2>
          <ul className="gv-needs dl-needs">
            {(n.items as [string, string][]).map(([t, x]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sx-sec sx-warm" id="scope" aria-labelledby="cl-po-h">
        <div className="sx-wrap gv-split">
          <div className="gv-head">
            <h2 id="cl-po-h" className="sx-h2">
              {po.title}
            </h2>
            <p className="gv-body">{po.text}</p>
          </div>
          <p className="cl-inset">{po.note}</p>
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="cl-ar-h">
        <div className="sx-wrap">
          <div className="gv-head">
            <h2 id="cl-ar-h" className="sx-h2">
              {a.title}
            </h2>
            <p className="gv-body">{a.intro}</p>
          </div>
          <div className="cl-areas">
            <ol className="cl-acc">
              {(a.items as [string, string][]).map(([t, x], i) => (
                <AreaItem key={t} i={i} t={t} x={x} />
              ))}
            </ol>
            <AssetSlot slot={a.slot} cls="cl-slot" />
          </div>
        </div>
      </section>
      <section className="sx-sec sx-warm" aria-labelledby="cl-out-h">
        <div className="sx-wrap">
          <h2 id="cl-out-h" className="sx-h2">
            {o.title}
          </h2>
          <ul className="gr-grid cl-grid">
            {(o.items as [string, string, string][]).map(([ic, t, x]) => (
              <li key={t}>
                <Icon name={ic} cls="sx-ico cl-ico" />
                <h3>{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ul>
          <p className="cl-result">{o.result}</p>
        </div>
      </section>
      <section className="sx-sec sx-white" aria-labelledby="cl-co-h">
        <div className="sx-wrap">
          <h2 id="cl-co-h" className="sx-h2">
            {c.title}
          </h2>
          <p className="gv-body cl-co-intro">{c.intro}</p>
          <dl className="cl-coord">
            {(c.rows as [string, string][]).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="sx-sec sx-warm" aria-labelledby="cl-faq-h">
        <div className="sx-wrap">
          <FaqRelated d={d} hid="cl-faq-h" />
        </div>
      </section>
      <Contact s={s} d={d} prefix="cl" />
    </div>
  );
}

/* ================================================================== page */
const LAYOUTS: Record<string, (p: Props) => React.ReactElement> = {
  gov: GovLayout,
  people: PeopleLayout,
  ops: OpsLayout,
  growth: GrowthLayout,
  deal: DealLayout,
  research: ResearchLayout,
  close: CloseLayout,
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const s = SITE_SERVICES.find((x) => x.slug === slug);
  const d = slug ? SERVICE_DETAIL[slug] : undefined;
  // Old service addresses, still linked from the guides; the server answers the same addresses with a 301.
  const moved = SERVICE_REDIRECTS[`/services/${slug}`];
  if (moved) return <Redirect to={moved} replace />;
  if (!s || !d) return <NotFound />;
  const crumbs = (
    <Crumbs
      items={[
        ["Home", "/"],
        ["Services", "/services"],
        [s.title, null],
      ]}
    />
  );
  const Layout = LAYOUTS[d.layout] ?? StrategyLayout;
  return <Layout s={s} d={d} crumbs={crumbs} />;
}
