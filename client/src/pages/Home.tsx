import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "wouter";
import { SHOWN_ARTICLES } from "@shared/insights";
import ContactSection from "@/site/ContactSection";
import Growth360Journey from "@/site/Growth360Journey";
import { CountUp, FlipWord, Marquee } from "@/site/motion";
import { ROUTES, SITE_SERVICES, serviceHref } from "@/site/nav";

const FACTS = [
  { n: 8, label: "Consulting practices", note: "Organized around four challenges" },
  { n: 8, label: "Senior advisors", note: "Founder and expert network" },
  { n: 9, label: "Specialist partners", note: "Credited by name" },
  { n: 6, label: "Sectors served", note: "Public and private" },
];

const ExternalIcon = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path d="M4.5 2.5h5v5M9.5 2.5 3 9" />
  </svg>
);

const CHALLENGES = [
  {
    id: "ch-1",
    tile: "t-strategy",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9.25" />
        <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z" />
        <path d="M12 2.75v1.5M12 19.75v1.5M2.75 12h1.5M19.75 12h1.5" />
      </svg>
    ),
    title: "The gap between strategy and results.",
    text: "Transformation ambitions can lose value during execution, before improvements become lasting results.",
    img: { src: "/media/challenges/strategy-execution.png", alt: "Illustrative team reviewing performance charts and reports around a table.", w: 720, h: 1080 },
    num: "42%",
    stat: "Of potential transformation value is lost, on average, during execution and sustaining change.",
    source: "McKinsey · 2023",
    sourceLabel: "Source: McKinsey, How to implement transformations for long-term impact, 2023 (opens in a new tab)",
    href: "https://www.mckinsey.com/capabilities/implementation/our-insights/how-to-implement-transformations-for-long-term-impact",
  },
  {
    id: "ch-2",
    tile: "t-port",
    center: true,
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3.75 20.25h16.5" />
        <path d="m4.5 16 5-5 3.5 3.5 6.5-7" />
        <path d="M15 7.5h4.5V12" />
      </svg>
    ),
    title: "Uncertainty holds growth back.",
    text: "Geopolitical uncertainty can delay investment and make expansion decisions harder.",
    img: { src: "/media/challenges/growth-port.png", alt: "Illustrative commercial port with a container vessel and cranes.", w: 720, h: 900 },
    num: "32%",
    stat: "Of surveyed CEOs say geopolitical uncertainty makes them less likely to make large new investments.",
    source: "PwC Global CEO Survey · 2026",
    sourceLabel: "Source: PwC Global CEO Survey, 2026 (opens in a new tab)",
    href: "https://www.pwc.com/gx/en/1/issues/c-suite-insights/ceo-survey.html",
  },
  {
    id: "ch-3",
    tile: "t-interchange",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="m12 3.25 8.75 4.5L12 12.25 3.25 7.75z" />
        <path d="m3.25 12 8.75 4.5 8.75-4.5" />
        <path d="m3.25 16.25 8.75 4.5 8.75-4.5" />
      </svg>
    ),
    title: "Complexity is increasing.",
    text: "Interconnected projects, shifting priorities, and competing demands make delivery harder to manage.",
    img: { src: "/media/challenges/complexity-interchange.png", alt: "Illustrative urban interchange showing interconnected roads and bridges.", w: 720, h: 900 },
    num: "81%",
    stat: "Of surveyed project professionals say projects have become more complex in recent years.",
    source: "PMI Pulse of the Profession · 2026",
    sourceLabel: "Source: PMI Pulse of the Profession, 2026 (opens in a new tab)",
    href: "https://www.pmi.org/about/press-media/2026/pulse-why-complex-projects-fail-best-practices-are-not-enough-system-thinking",
  },
];

const FEATURED_HREF = SHOWN_ARTICLES.some((a) => a.slug === "delegation-of-authority") ? `${ROUTES.insights}/delegation-of-authority` : ROUTES.insights;

/** The founder portrait beside the "Who we are" copy; hidden for now (17 Oct 2026), the quote stays. */
const SHOW_FOUNDER_PHOTO = false;

const FLIP_WORDS = ["Growth", "Diagnose", "Understand", "Strategy", "Activate", "Optimize"];

const PARTNERS = [
  { file: "visionethics", name: "VisionEthics" },
  { file: "techno-management", name: "Techno-Management" },
  { file: "inlight", name: "In Light Consumer Insights" },
  { file: "growthino", name: "Growthino" },
  { file: "widebot", name: "WideBot AI" },
  { file: "logic-arrow", name: "Logic Arrow" },
  { file: "blh", name: "Business Learning House" },
  { file: "cornerstone", name: "Cornerstone OnDemand", filled: true },
  { file: "keheilan", name: "Keheilan Asset Management", filled: true },
];

const EXPERTS = [
  ["fouad-darwish", "Fouad Darwish"],
  ["doha-monir", "Dr. Doha Monir"],
  ["teh-chau-chin", "Teh Chau Chin"],
  ["ahmed-barakat", "Ahmed Barakat"],
  ["amr-mohamed", "Dr. Amr Mohamed"],
  ["engy-saeed", "Engy Saeed"],
  ["ahmed-mohamed", "Ahmed Mohamed"],
  ["mohamed-abdelsattar", "Mohamed Abdelsattar"],
];

const CLIENTS = [
  ["mas-sofabed", "MAS Sofabed"],
  ["ministry-water", "Egyptian Ministry of Water Resources & Irrigation"],
  ["tanmia", "Tanmia Petroleum Company"],
  ["nabta", "Nabta Advertising"],
  ["firewall", "Firewall Security"],
  ["nadim", "NADIM Group"],
  ["itouch-plus", "iTouch Plus"],
  ["mafa-organic", "MAFA Organic"],
];

const TOPICS: { key: string; label: string; icon: ReactNode }[] = [
  { key: "strategy", label: "Strategy", icon: <><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-1.8 5.41a2 2 0 0 1-1.27 1.27L7.76 16.24l1.8-5.41a2 2 0 0 1 1.27-1.27z" /></> },
  { key: "governance", label: "Governance", icon: <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /> },
  { key: "people", label: "People", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
  { key: "operations", label: "Operations", icon: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></> },
  { key: "growth", label: "Growth", icon: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></> },
  { key: "research", label: "Research", icon: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></> },
];

const FAQS = [
  ["Do I need to know which service I require before contacting you?", "No. We begin by understanding your business challenge and priorities to identify the appropriate advisory scope."],
  ["What does an engagement include?", "Each proposal defines the advisory sessions, reviews, deliverables and follow-up activities. Any additional work is specified separately."],
  ["Do you support implementation or only provide recommendations?", "Darwish & Co. provides diagnosis, strategy, advisory oversight and performance review. Specialist implementation is delivered by the entities identified in the project scope."],
  ["How are consulting results measured?", "We agree success measures linked to the project objective, such as performance improvement, cost reduction or operational efficiency, and review progress against the engagement plan."],
];

/** Hero video: plays muted on loop; visitors who prefer reduced motion see the still poster instead. */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current.play()?.catch(() => {});
  }, []);
  return <video ref={ref} className="hero-media" src="/media/hero.mp4" poster="/media/hero-poster.jpg" muted loop playsInline preload="auto" aria-hidden="true" />;
}

const WORK_ITEMS = [
  <li className="mq-item" key="case-1">
    <Link className="wcard" href={`${ROUTES.work}/furniture`} id="case-1">
      <img src="/media/work/furniture.jpg" alt="Living room furnished with a sofa and dining set." width={720} height={510} loading="lazy" decoding="async" />
      <span className="wcard-label">Furniture manufacturing</span>
      <h3>From low digital visibility to a GEO strategy</h3>
      <span className="wcard-pill">Search visibility &amp; GEO</span>
    </Link>
  </li>,
  <li className="mq-item" key="case-2">
    <Link className="wcard" href={`${ROUTES.work}/organization`} id="case-2">
      <img src="/media/work/org-development.jpg" alt="Leadership team reviewing documents around a boardroom table." width={720} height={566} loading="lazy" decoding="async" />
      <span className="wcard-label">Organizational development</span>
      <h3>From a performance question to a management development roadmap</h3>
      <span className="wcard-pill">Management development</span>
    </Link>
  </li>,
  <li className="mq-item" key="case-3">
    <div className="wcard" id="case-3">
      <img src="/media/work/illustrative-expansion.jpg" alt="Illustrative photo: a professional holding a hard hat and plans in a shared office." width={720} height={480} loading="lazy" decoding="async" />
      <span className="wcard-label">Illustrative example</span>
      <h3>Turning expansion ambitions into a focused market-entry plan</h3>
      <span className="wcard-pill">Growth &amp; market expansion</span>
    </div>
  </li>,
];

const LOGO_ITEMS = CLIENTS.map(([file, name]) => (
  <li className="logo-item" key={file}>
    <img src={`/media/clients/${file}.png`} alt={name} loading="lazy" decoding="async" />
  </li>
));

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero dark" aria-labelledby="hero-title" id="hero">
        <HeroVideo />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="pill">Strategic management &amp; business consulting · Egypt</span>
            <h1 id="hero-title">
              A wise word in the <span className="acc">right moment.</span>
            </h1>
            <p className="sub">We help organizations improve performance, strengthen governance, and turn growth priorities into practical action.</p>
            <div className="btns">
              <a className="btn btn-blue" href="#contact">
                <span className="cta-label">Discuss your challenge</span>
              </a>
              <Link className="btn btn-ghost" href={`${ROUTES.about}#how-we-work`}>
                <span className="cta-label">Explore our approach</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <div className="facts-lift">
        <div className="wrap facts">
          <div className="facts-row">
            {FACTS.map((f, i) => (
              <div className="fact" key={f.label}>
                <CountUp value={f.n} delay={i * 150} />
                <span>{f.label}</span>
                <small>{f.note}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who we are */}
      <section className="section" aria-labelledby="who-title" id="about">
        <div className="wrap about-grid">
          <div className="about-copy">
            <span className="pill">Who we are</span>
            <h2 id="who-title">
              Advisory that improves the <span className="acc">quality of decisions</span>
            </h2>
            <p>Darwish &amp; Co. is a consulting firm based in Egypt, helping organizations improve performance, strengthen governance, and pursue sustainable growth.</p>
          </div>
          <div className={"founder" + (SHOW_FOUNDER_PHOTO ? "" : " no-photo")} id="founder">
            {SHOW_FOUNDER_PHOTO && (
              <img className="founder-photo" src="/media/people/fouad-darwish.jpg" alt="Fouad Darwish, Founder and Managing Partner of Darwish & Co." width={505} height={670} loading="lazy" decoding="async" />
            )}
            <figure className="founder-quote">
              <blockquote>
                <p>“True advisory is not just about identifying the right path, but ensuring the institution has the strength to walk it.”</p>
              </blockquote>
              <figcaption>
                <strong>Fouad Darwish</strong>
                <span>Founder &amp; Managing Partner</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section" style={{ paddingBlockStart: 0 }} aria-labelledby="do-title">
        <div className="wrap center">
          <div className="head center">
            <span className="pill">What we do</span>
            <h2 id="do-title">
              We diagnose. We advise.
              <br />
              <span className="acc">We support execution.</span>
            </h2>
          </div>
          <div className="feature">
            <h3>
              <svg className="ico" viewBox="0 0 32 32" aria-hidden="true">
                <circle cx="14" cy="14" r="9" />
                <path d="m21 21 7 7" />
                <path d="M10 14h8M14 10v8" />
              </svg>
              Diagnosis before solutions
            </h3>
            <p>Every engagement starts by defining the decision to be improved. Specialist capability is brought in only where the work requires it.</p>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="challenges" aria-labelledby="ch-title" id="challenges">
        <div className="wrap">
          <div className="ch-head">
            <span className="ch-pill">The leadership agenda</span>
            <h2 id="ch-title">Three challenges shaping business today.</h2>
          </div>
          <div className="ch-grid">
            {CHALLENGES.map((c) => (
              <article className={"ch-group" + (c.center ? " is-center" : "")} aria-labelledby={c.id} key={c.id}>
                <div className="ch-desc">
                  <span className="ch-icon" aria-hidden="true">
                    {c.icon}
                  </span>
                  <h3 id={c.id}>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
                <figure className={`ch-tile ${c.tile}`}>
                  <img src={c.img.src} alt={c.img.alt} width={c.img.w} height={c.img.h} loading="lazy" decoding="async" />
                  <figcaption className="ch-stat">
                    <span className="num">{c.num}</span>
                    <p>{c.stat}</p>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={c.sourceLabel}>
                      {c.source} <ExternalIcon />
                    </a>
                  </figcaption>
                </figure>
              </article>
            ))}
          </div>
          <p className="ch-note">Findings from international research. Sources and survey years shown.</p>
        </div>
      </section>

      {/* Practices */}
      <section className="section" aria-labelledby="pr-title" id="practices">
        <div className="wrap center">
          <div className="head center">
            <span className="pill">Our Services</span>
            <h2 id="pr-title">
              Eight practices.
              <br />
              <span className="acc">Four decisions you face.</span>
            </h2>
          </div>
          <div className="svc-panel">
            <div className="svc-grid">
              {SITE_SERVICES.map((s, i) => (
                <Link className="svc" href={serviceHref(s.slug)} aria-labelledby={`svc-${i + 1}-t`} aria-describedby={`svc-${i + 1}-d`} key={s.slug}>
                  <span className="svc-top" aria-hidden="true">
                    <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
                    {/* Always visible, so the card reads as a link on touch screens too. */}
                    <span className="svc-go">
                      <svg viewBox="0 0 24 24">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </span>
                  <h3 id={`svc-${i + 1}-t`}>{s.gridTitle}</h3>
                  <span className="svc-tag" id={`svc-${i + 1}-d`}>
                    {s.group}
                  </span>
                  <span className="svc-more" aria-hidden="true">
                    Explore service
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="svc-cta">
            <Link className="btn btn-navy" href={ROUTES.services}>
              <span className="cta-label">See all services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Growth 360 */}
      <section className="g360" aria-labelledby="g-title" id="g360">
        <div className="wrap">
          <div className="g360-head">
            <span className="pill">Growth 360</span>
          </div>
          <div className="g360-intro">
            <h2 id="g-title">
              <span className="sr-only">Growth 360</span>
              <span className="flip-line" aria-hidden="true">
                <span className="flip">
                  <span className="flip-sizer">Understand</span>
                  <FlipWord words={FLIP_WORDS} rootId="g360" />
                </span>
                <span className="flip-num">360</span>
              </span>
            </h2>
            <p>
              From business diagnosis to integrated growth execution. Growth 360 brings together Darwish &amp; Co.’s advisory expertise, market and consumer research from In Light, and specialist support across market
              activation, capability development, and digital enablement. The activation mix is tailored to diagnosed business needs.
            </p>
          </div>
          <Growth360Journey />
          <div className="g360-cta">
            <a className="btn btn-navy" href="#contact">
              <span className="cta-label">Discuss your challenge</span>
            </a>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section" style={{ paddingBlockStart: 0 }} aria-labelledby="pt-title" id="partners">
        <div className="wrap center">
          <div className="head center">
            <span className="pill">Partner ecosystem</span>
            <h2 id="pt-title">
              Specialist partners,
              <br />
              <span className="acc">credited by name</span>
            </h2>
          </div>
          <div className="chips">
            {PARTNERS.map((p) => (
              <span className="chip" key={p.file}>
                <img className={p.filled ? "is-filled" : undefined} src={`/media/partners/${p.file}.png`} alt="" width={36} height={36} loading="lazy" />
                {p.name}
              </span>
            ))}
          </div>
          <div className="btns">
            <a className="btn btn-navy" href="#contact">
              <span className="cta-label">Discuss your challenge</span>
            </a>
            <Link className="btn btn-line" href={`${ROUTES.about}#partners`}>
              <span className="cta-label">Explore the ecosystem</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="section" style={{ paddingBlockStart: 0 }} aria-labelledby="ap-title" id="apart">
        <div className="wrap">
          <div className="head center">
            <span className="pill">Why Darwish &amp; Co.</span>
            <h2 id="ap-title">
              What sets us <span className="acc">apart</span>
            </h2>
          </div>
          <div className="mosaic">
            <div className="mcol">
              <article className="m" id="people">
                <h3>Senior advisory</h3>
                <p>Direct access to experienced leadership and seasoned experts.</p>
                <ul className="avatars" aria-label="Fouad Darwish and seven experts">
                  {EXPERTS.map(([file, name]) => (
                    <li key={file}>
                      <img src={`/media/people/${file}-avatar.jpg`} alt={name} width={48} height={48} loading="lazy" decoding="async" />
                    </li>
                  ))}
                </ul>
                <Link className="more" href={`${ROUTES.about}#experts`}>
                  <span className="cta-label">Meet our experts →</span>
                </Link>
              </article>
              <article className="m blue">
                <svg className="m-art h90" viewBox="0 0 120 90" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false">
                  <g stroke="#fff" strokeOpacity=".5" strokeWidth="1" strokeLinecap="round">
                    <line x1="60.0" y1="12.0" x2="92.3" y2="35.5" /><line x1="60.0" y1="12.0" x2="80.0" y2="73.5" /><line x1="60.0" y1="12.0" x2="40.0" y2="73.5" /><line x1="60.0" y1="12.0" x2="27.7" y2="35.5" /><line x1="92.3" y1="35.5" x2="80.0" y2="73.5" /><line x1="92.3" y1="35.5" x2="40.0" y2="73.5" /><line x1="92.3" y1="35.5" x2="27.7" y2="35.5" /><line x1="80.0" y1="73.5" x2="40.0" y2="73.5" /><line x1="80.0" y1="73.5" x2="27.7" y2="35.5" /><line x1="40.0" y1="73.5" x2="27.7" y2="35.5" />
                  </g>
                  <g fill="#fff" fillOpacity=".22" stroke="#fff" strokeWidth="1.2">
                    <circle cx="60.0" cy="12.0" r="7" /><circle cx="92.3" cy="35.5" r="7" /><circle cx="80.0" cy="73.5" r="7" /><circle cx="40.0" cy="73.5" r="7" /><circle cx="27.7" cy="35.5" r="7" />
                  </g>
                  <circle cx="60" cy="46" r="3" fill="#fff" fillOpacity=".7" />
                </svg>
                <h3>Integrated thinking</h3>
                <p>Strategy, governance, people, operations and growth, treated as one system.</p>
              </article>
            </div>
            <div className="mcol">
              <article className="m navy">
                <svg className="m-art h110" viewBox="0 0 200 110" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false">
                  <g stroke="#8FD6F8" strokeOpacity=".35" strokeWidth="1" strokeLinecap="round">
                    <path d="M14 96h150" /><path d="M14 96V12" /><path d="M14 68h150M14 40h150" strokeDasharray="2 5" />
                  </g>
                  <g fill="#00A3F0" fillOpacity=".16">
                    <rect x="28" y="70" width="14" height="26" rx="3" /><rect x="52" y="58" width="14" height="38" rx="3" /><rect x="76" y="64" width="14" height="32" rx="3" /><rect x="100" y="46" width="14" height="50" rx="3" /><rect x="124" y="34" width="14" height="62" rx="3" />
                  </g>
                  <polyline points="35,62 59,50 83,56 107,38 131,26" fill="none" stroke="#00A3F0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <g fill="#0F1F33" stroke="#00A3F0" strokeWidth="1.6">
                    <circle cx="35" cy="62" r="3.5" /><circle cx="59" cy="50" r="3.5" /><circle cx="83" cy="56" r="3.5" /><circle cx="107" cy="38" r="3.5" /><circle cx="131" cy="26" r="3.5" />
                  </g>
                  <g fill="none" stroke="#8FD6F8" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="150" cy="44" r="22" fill="#8FD6F8" fillOpacity=".08" />
                    <path d="m166 60 18 18" />
                  </g>
                </svg>
                <h3>Evidence before recommendation</h3>
                <p>Research and market intelligence reduce uncertainty before action.</p>
              </article>
              <article className="m">
                <ol className="steps3" aria-label="Priorities, then ownership, then action">
                  <li>
                    <span className="step">Priorities</span>
                    <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h11M10 5l4 4-4 4" /></svg>
                  </li>
                  <li>
                    <span className="step">Ownership</span>
                    <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h11M10 5l4 4-4 4" /></svg>
                  </li>
                  <li>
                    <span className="step">Action</span>
                  </li>
                </ol>
                <h3>Practical implementation</h3>
                <p>Frameworks with clear ownership and next steps.</p>
              </article>
            </div>
            <div className="mcol">
              <article className="m">
                <svg className="m-art h110" viewBox="-4 -4 124 96" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false">
                  <path d="M4.6 2.9 L21.8 4.6 L36.1 8.8 L44.5 5.9 L48.7 3.8 L53.8 2.5 L60.5 3.4 L64.7 5.5 L77.3 6.3 L81.1 5.0 L86.5 20.2 L84.4 24.4 L83.2 28.6 L81.7 33.6 L81.1 35.0 L75.6 30.7 L68.0 19.3 L66.8 16.4 L71.4 29.8 L77.3 39.1 L78.5 43.3 L81.5 48.7 L86.5 57.5 L91.6 67.2 L100.8 79.8 L103.3 83.2 L57.1 83.2 L3.4 83.2 L3.4 20.2 L2.5 14.3 Z" fill="#EAF6FD" stroke="#172B43" strokeWidth="1.2" strokeLinejoin="round" />
                  <g fill="none" stroke="#0B6FA4" strokeOpacity=".6" strokeWidth=".9" strokeLinecap="round" strokeDasharray="2 4">
                    <path d="M50 40 C 70 28, 92 18, 116 10" /><path d="M50 40 C 72 44, 96 46, 118 52" /><path d="M50 40 C 40 22, 34 8, 30 -2" />
                  </g>
                  <g fill="#0B6FA4">
                    <circle cx="116" cy="10" r="2.2" /><circle cx="118" cy="52" r="2.2" /><circle cx="30" cy="-2" r="2.2" />
                  </g>
                </svg>
                <h3>Local market understanding</h3>
                <p>Egypt and regional business and regulatory realities.</p>
              </article>
              <article className="m navy">
                <svg className="m-art h90" viewBox="0 0 186 80" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false">
                  <g stroke="#8FD6F8" strokeOpacity=".3" strokeWidth="1" strokeLinecap="round">
                    <line x1="18" y1="30" x2="46" y2="14" /><line x1="46" y1="14" x2="78" y2="26" /><line x1="78" y1="26" x2="108" y2="12" /><line x1="108" y1="12" x2="140" y2="30" /><line x1="140" y1="30" x2="168" y2="16" /><line x1="18" y1="30" x2="30" y2="62" /><line x1="30" y1="62" x2="96" y2="58" /><line x1="78" y1="26" x2="96" y2="58" /><line x1="96" y1="58" x2="152" y2="64" /><line x1="140" y1="30" x2="152" y2="64" /><line x1="46" y1="14" x2="30" y2="62" /><line x1="108" y1="12" x2="96" y2="58" /><line x1="168" y1="16" x2="152" y2="64" />
                  </g>
                  <g fill="#00A3F0" fillOpacity=".85" stroke="#8FD6F8" strokeOpacity=".6" strokeWidth="1">
                    <circle cx="18" cy="30" r="4" /><circle cx="46" cy="14" r="4" /><circle cx="78" cy="26" r="5" /><circle cx="108" cy="12" r="4" /><circle cx="140" cy="30" r="5" /><circle cx="168" cy="16" r="4" /><circle cx="30" cy="62" r="4" /><circle cx="96" cy="58" r="5" /><circle cx="152" cy="64" r="4" />
                  </g>
                </svg>
                <CountUp value={9} as="span" className="big" />
                <h3>Partner-enabled scale</h3>
                <p>Specialist partners assembled around larger or multidisciplinary work.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Our work */}
      <section className="work dark" aria-labelledby="rs-title" id="work">
        <div className="wrap">
          <div className="head center">
            <span className="pill">Our work</span>
            <h2 id="rs-title">
              Real organizations. <span className="acc">Selected engagements.</span>
            </h2>
          </div>
        </div>
        <Marquee className="mq-cases" items={WORK_ITEMS} speed={20} dir={1} label="Selected engagements" />
        <Marquee className="mq-logos" items={LOGO_ITEMS} speed={14} dir={-1} label="Organizations we work with" id="clients" />
      </section>

      {/* Insights */}
      <section className="section" aria-labelledby="in-title" id="insights">
        <div className="wrap mag">
          <div className="mag-left">
            <span className="pill">Our perspectives</span>
            <h2 id="in-title">Insights</h2>
            <p>Practical perspectives for leaders. Pick a topic.</p>
            <ul className="topics" aria-label="Insight topics">
              {TOPICS.map((t) => (
                <li key={t.key}>
                  <Link href={`${ROUTES.insights}#${t.key}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {t.icon}
                    </svg>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Featured article. Author credit and description are provisional pending editorial approval.
              Until the article is published it has no page, so the card opens the Insights listing. */}
          <Link className="mag-feature" href={FEATURED_HREF} aria-labelledby="mag-title-text" aria-describedby="mag-desc">
            <img src="/media/insights/delegation.jpg" alt="" width={1400} height={933} loading="lazy" decoding="async" />
            <div className="mag-glass">
              <div className="mag-author">
                <img src="/media/people/fouad-darwish-avatar.jpg" alt="" width={44} height={44} loading="lazy" />
                <div>
                  <strong>Fouad Darwish</strong>
                  <span>Founder &amp; Managing Partner</span>
                </div>
              </div>
              <span className="mag-kind">Governance</span>
              <div className="mag-title">
                <h3 id="mag-title-text">Delegation of Authority: how to delegate decisions without losing oversight</h3>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
              <p id="mag-desc">A perspective on decision rights, accountability, and effective oversight.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--white)" }} aria-labelledby="fq-title">
        <div className="wrap faq-grid">
          <h2 id="fq-title">FAQs</h2>
          <div className="faqs">
            {FAQS.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="sx sx-gov sx-about">
        <ContactSection idPrefix="ab" />
      </div>
    </>
  );
}
