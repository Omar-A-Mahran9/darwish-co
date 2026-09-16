import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "wouter";
import { PILLARS, servicesInPillar, type ServicePillar } from "@shared/services";
import { BLOG_ARTICLES } from "@shared/seo";
import { ACCENT, ServiceIcon } from "@/components/serviceStyles";

/**
 * The two situations clients most often arrive with (positioning v3 §3), and
 * the three kept as secondary entry points rather than campaigns of their own.
 */
const PRIORITY_SITUATIONS = [
  {
    quote: "I have to sign everything. I need to delegate without losing oversight.",
    body: "Authority was never written down, so every decision comes back to one person. The fix is a delegation of authority matrix: who decides what, up to which limit, and on what record.",
    href: "/services/corporate-family-governance",
    cta: "Corporate & Family Governance",
  },
  {
    quote: "A major client sent us a compliance questionnaire and we don't know how to answer it.",
    body: "Most questionnaires ask for a policy, a procedure, a record and a named responsible person. Usually the practice already exists and the documentation does not.",
    href: "/services/risk-compliance-integrity",
    cta: "Risk, Compliance & Integrity",
  },
];

const SECONDARY_SITUATIONS = [
  {
    label: "Preparing for investment or bank finance",
    body: "An investor or lender has started asking how decisions are made and recorded.",
    href: "/services/corporate-family-governance",
  },
  {
    label: "Staff are already using AI at work",
    body: "Tools are in use on company information, with no rule saying what is permitted.",
    href: "/services/risk-compliance-integrity",
  },
  {
    label: "Expanding to the Gulf",
    body: "A market decision that needs evidence, and the compliance a new buyer will expect.",
    href: "/services/growth-market-entry",
  },
];

const HOW_WE_WORK = [
  {
    title: "We start from the decision you face",
    body: "Not from a service. The first conversation establishes what has prompted the work and what a good outcome looks like, at no cost and no obligation.",
  },
  {
    title: "Right-sized, not scaled down",
    body: "Methods drawn from recognised standards — ISO 37001, ISO 31000, OECD guidance — shaped into something a company of a hundred people can actually run.",
  },
  {
    title: "We say who delivers",
    body: "Where a partner firm carries the specialist capability, the service page names them and says who is accountable for what. A partner's expertise is theirs, not ours.",
  },
  {
    title: "We say when it is not our work",
    body: "Where a question needs a legal opinion, or a standard needs an accredited certifier, we say so rather than stretching to cover it.",
  },
];

function PillarBlock({ pillar }: { pillar: ServicePillar }) {
  const services = servicesInPillar(pillar);
  if (services.length === 0) return null;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h3 className="font-heading text-xl font-bold text-foreground">{PILLARS[pillar].name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{PILLARS[pillar].description}</p>
      </div>
      <ul className="space-y-3 border-t border-border pt-5">
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`}>
              <span className="group flex cursor-pointer items-start gap-3">
                <ServiceIcon
                  name={service.icon}
                  className={`mt-0.5 h-5 w-5 shrink-0 ${ACCENT[service.accent].text}`}
                />
                <span>
                  <span className="block font-bold text-foreground group-hover:underline">
                    {service.name}
                  </span>
                  <span className="block text-sm leading-relaxed text-muted-foreground">
                    {service.tagline}
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── CDN assets ────────────────────────────────────────────────────────────
const EMBLEM_URL =
  "/images/emblem-small.webp";
const LOGOIN_URL =
  "/images/emblem.webp";

// ─── Partner logo CDN urls ──────────────────────────────────────────────────
const PARTNER_LOGOS = [
  { href: "https://visionethics.com",     src: "/images/partners/visionethics.webp",      alt: "VisionEthics" },
  { href: "https://widebot.ai",           src: "/images/partners/widebot.webp",           alt: "WideBot AI" },
  { href: "https://techno-management.com",src: "/images/partners/techno-management.webp", alt: "Techno-Management" },
  { href: "https://www.keheilan.com",     src: "/images/partners/keheilan.webp",  alt: "Keheilan" },
  { href: "https://in-light.tech",        src: "/images/partners/inlight.webp",           alt: "In Light" },
];

// ─── Floating animated logo composition — hub-and-spoke orbital (rAF) ───────
// Each satellite orbits at a fixed radius. The wrapper rotates; the img counter-rotates
// so it always faces upright. Positions calculated with trigonometry each frame.
const ORBIT_DEFS = [
  // inner ring — 4 satellites, clockwise
  { src: LOGOIN_URL,  size: 68,  radius: 150, speed:  0.40, startDeg:   0, opacity: 0.92 },
  { src: EMBLEM_URL,  size: 54,  radius: 150, speed:  0.40, startDeg:  90, opacity: 0.78 },
  { src: LOGOIN_URL,  size: 46,  radius: 150, speed:  0.40, startDeg: 180, opacity: 0.65 },
  { src: EMBLEM_URL,  size: 40,  radius: 150, speed:  0.40, startDeg: 270, opacity: 0.55 },
  // outer ring — 4 satellites, counter-clockwise
  { src: EMBLEM_URL,  size: 58,  radius: 225, speed: -0.25, startDeg:  45, opacity: 0.80 },
  { src: LOGOIN_URL,  size: 46,  radius: 225, speed: -0.25, startDeg: 135, opacity: 0.65 },
  { src: EMBLEM_URL,  size: 40,  radius: 225, speed: -0.25, startDeg: 225, opacity: 0.55 },
  { src: LOGOIN_URL,  size: 36,  radius: 225, speed: -0.25, startDeg: 315, opacity: 0.45 },
];

function FloatingLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const angleRefs = useRef<number[]>(ORBIT_DEFS.map(d => d.startDeg));
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let last = performance.now();
    function tick(now: number) {
      const dt = (now - last) / 1000; // seconds
      last = now;
      ORBIT_DEFS.forEach((def, i) => {
        angleRefs.current[i] += def.speed * dt * 60; // deg per frame at 60fps
        const rad = (angleRefs.current[i] * Math.PI) / 180;
        const cx = def.radius * Math.cos(rad);
        const cy = def.radius * Math.sin(rad);
        const wrap = wrapRefs.current[i];
        const img  = imgRefs.current[i];
        if (wrap) {
          wrap.style.transform = `translate(${cx - def.size / 2}px, ${cy - def.size / 2}px)`;
        }
        if (img) {
          // counter-rotate so logo stays upright
          img.style.transform = `rotate(${-angleRefs.current[i]}deg)`;
        }
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: "520px", height: "520px" }}
    >
      {/* Radial glow backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,177,255,0.22) 0%, rgba(49,154,255,0.08) 55%, transparent 80%)",
          filter: "blur(36px)",
          pointerEvents: "none",
        }}
      />

      {/* Orbit ring 1 — inner */}
      <div style={{
        position: "absolute", width: "300px", height: "300px",
        borderRadius: "50%", border: "1px dashed rgba(49,154,255,0.2)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      {/* Orbit ring 2 — outer */}
      <div style={{
        position: "absolute", width: "450px", height: "450px",
        borderRadius: "50%", border: "1px dashed rgba(49,154,255,0.10)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      {/* Orbiting satellites — positioned via rAF */}
      {ORBIT_DEFS.map((def, i) => (
        <div
          key={i}
          ref={el => { wrapRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${def.size}px`,
            height: `${def.size}px`,
            willChange: "transform",
          }}
        >
          <img
            ref={el => { imgRefs.current[i] = el; }}
            src={def.src}
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: def.opacity,
              filter: "drop-shadow(0 2px 8px rgba(49,154,255,0.28))",
              willChange: "transform",
            }}
          />
        </div>
      ))}

      {/* Central emblem — static slow-spinning logo PNG */}
      <img
        src={EMBLEM_URL}
        alt="Darwish & Co. emblem"
        aria-hidden="true"
        className="spin-slow"
        style={{
          position: "relative",
          zIndex: 10,
          width: "150px",
          height: "150px",
          objectFit: "contain",
          filter: "drop-shadow(0 6px 24px rgba(49,154,255,0.4))",
        }}
      />
    </div>
  );
}

// ─── Hero Section ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        maxWidth: "1600px",
        margin: "0 auto",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Background gradient glow blobs — top-left */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-160px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,177,255,0.35) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(49,154,255,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content wrapper. The top padding clears the header, which now sits over
          this section rather than above it. */}
      <div className="relative z-10 flex flex-col pt-24" style={{ minHeight: "100vh" }}>
        {/* Hero body */}
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 lg:py-24">

            {/* ── Left: copy ── */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* Headline */}
              <h1
                style={{
                  fontFamily: "'Fustat', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(42px, 5vw, 75px)",
                  lineHeight: 1.05,
                  letterSpacing: "-2px",
                  color: "#0a0a0a",
                }}
              >
                A Wise Word<br />
                <span style={{ color: "#0084FF" }}>In The Right</span><br />
                Moment.
              </h1>

              {/* Sub-headline */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "18px",
                  lineHeight: 1.65,
                  letterSpacing: "-1px",
                  color: "#555",
                  maxWidth: "480px",
                }}
              >
                Darwish &amp; Co. is an Egypt-based governance and management
                consultancy for SMEs in the MENA region. We help you build the
                governance, controls and growth strategy that investors, major
                clients and regulators expect.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/contact">
                  <button
                    style={{
                      background: "rgba(0,132,255,0.8)",
                      backdropFilter: "blur(2px)",
                      WebkitBackdropFilter: "blur(2px)",
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "inset 0px 4px 4px 0px rgba(255,255,255,0.35), 0 4px 20px rgba(0,132,255,0.3)",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: "16px",
                      padding: "14px 28px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      transition: "transform 200ms ease, box-shadow 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.transform = "scale(1.02)";
                      b.style.boxShadow = "inset 0px 4px 4px 0px rgba(255,255,255,0.35), 0 8px 28px rgba(0,132,255,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.transform = "scale(1)";
                      b.style.boxShadow = "inset 0px 4px 4px 0px rgba(255,255,255,0.35), 0 4px 20px rgba(0,132,255,0.3)";
                    }}
                  >
                    Book a consultation
                    <span
                      style={{
                        background: "rgba(255,255,255,0.25)",
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </span>
                  </button>
                </Link>

                <Link href="/services">
                  <span
                    className="cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Explore Services <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>

            {/* ── Right: animated logos ── */}
            <div
              className="order-1 lg:order-2 flex items-center justify-center"
              style={{ minHeight: "400px" }}
            >
              <FloatingLogos />
            </div>
          </div>
        </div>

        {/* ── Trusted-by footer strip ── */}
        <div
          className="px-6 lg:px-12 pb-12"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <p
            className="text-center text-xs font-medium uppercase tracking-widest mb-8"
            style={{ color: "#999" }}
          >
            Our partner network
          </p>

          {/* Desktop: static row */}
          <div className="hidden md:flex items-center justify-center" style={{ gap: "100px" }}>
            {PARTNER_LOGOS.map((p) => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300 flex items-center">
                <img src={p.src} alt={p.alt} className="h-10 w-auto object-contain" loading="lazy" decoding="async" />
              </a>
            ))}
          </div>

          {/* Mobile: marquee */}
          <div className="md:hidden overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}>
            <div className="flex items-center marquee-track" style={{ width: "max-content" }}>
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center gap-12 px-6">
                  {PARTNER_LOGOS.map((p) => (
                    <a key={p.href + setIdx} href={p.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                      <img src={p.src} alt={p.alt} className="h-10 w-auto object-contain" loading="lazy" decoding="async" />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── HERO ── */}
      <HeroSection />

      {/* ── When companies call us ── */}
      <section className="bg-white py-24">
        <div className="container space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              When companies call us
            </span>
            <h2 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Two situations bring most clients here
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {PRIORITY_SITUATIONS.map((situation) => (
              <div key={situation.href} className="flex flex-col justify-between gap-6 border-l-4 border-primary bg-secondary/20 p-8">
                <div className="space-y-4">
                  <p className="font-heading text-xl font-bold leading-snug text-foreground">
                    &ldquo;{situation.quote}&rdquo;
                  </p>
                  <p className="leading-relaxed text-muted-foreground">{situation.body}</p>
                </div>
                <Link href={situation.href}>
                  <span className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-primary hover:underline">
                    {situation.cta} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="grid gap-6 border-t border-border pt-10 md:grid-cols-3">
            {SECONDARY_SITUATIONS.map((situation) => (
              <Link key={situation.label} href={situation.href}>
                <div className="group cursor-pointer space-y-2">
                  <p className="font-bold text-foreground group-hover:underline">{situation.label}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{situation.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we do ── */}
      <section className="bg-secondary/20 py-24">
        <div className="container space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              What we do
            </span>
            <h2 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Governance first, then what depends on it
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Five services in three groups. Each page sets out what the work covers, who it suits,
              what you receive and how an engagement runs.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <PillarBlock pillar="governance" />
            <PillarBlock pillar="strategy-organisation" />
            <PillarBlock pillar="growth" />
          </div>

          <Link href="/services">
            <Button size="lg" className="rounded-none font-bold">
              All services <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Insights ── */}
      <section className="bg-white py-24">
        <div className="container space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Insights
              </span>
              <h2 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
                What we have been writing about
              </h2>
            </div>
            <Link href="/blog">
              <span className="cursor-pointer whitespace-nowrap text-sm font-bold text-primary hover:underline">
                All articles →
              </span>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {BLOG_ARTICLES.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <article className="group h-full cursor-pointer space-y-4">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={article.image}
                      loading="lazy"
                      decoding="async"
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-heading text-lg font-bold leading-snug text-foreground group-hover:underline">
                    {article.headline}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {article.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── The people behind the work ── */}
      <section className="overflow-hidden bg-secondary/10 py-20">
        <div className="container grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-6 -top-6 z-0 h-24 w-24 bg-chart-3/20" />
            <div className="absolute -bottom-6 -right-6 z-0 h-32 w-32 bg-primary/10" />
            <img
              src="/images/meeting-insight.webp"
              width={1600}
              height={893}
              loading="lazy"
              decoding="async"
              alt="A Darwish & Co. working session"
              className="relative z-10 h-auto w-full shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
              The people behind the work
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Engagements are delivered by named consultants and, where a service calls for
              specialist capability, by partner firms working alongside us. Both are listed, with
              what each of them does.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/partners">
                <Button variant="outline" className="rounded-none font-bold">
                  Consultants &amp; advisers
                </Button>
              </Link>
              <Link href="/corporate-partners">
                <Button variant="outline" className="rounded-none font-bold">
                  Partner firms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── How we work ── */}
      <section className="bg-white py-24">
        <div className="container space-y-12">
          <h2 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
            How we work
          </h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {HOW_WE_WORK.map((principle, index) => (
              <div key={principle.title} className="space-y-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-heading font-bold text-primary">
                  {index + 1}
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">{principle.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="bg-foreground py-20 text-white">
        <div className="container grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Our work</span>
            <h2 className="font-heading text-2xl font-bold leading-tight text-white md:text-3xl">
              Platforms we have built
            </h2>
            <p className="max-w-xl leading-relaxed text-white/60">
              Where an engagement calls for software rather than a document, we build it.
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                AI initiative
              </span>
            </div>
            <h3 className="mt-4 font-heading text-xl font-bold text-white">
              AI POC Collaboration Platform
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              A platform for managing AI proof-of-concept projects across collaborating teams.
            </p>
            <Link href="/projects#ai-poc">
              <span className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-primary hover:underline">
                Explore platform <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="bg-primary py-20 text-white">
        <div className="container grid gap-12 md:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
              Book a consultation
            </h2>
            <p className="max-w-xl leading-relaxed text-white/85">
              Tell us what has prompted the work — an investor asking questions, a client
              questionnaire, a structure that has stopped working — and we will tell you which of
              our services applies, or whether none does.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="rounded-none font-bold">
                Book a consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-5 text-sm text-white/85">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="leading-relaxed">
                Office T-10, 3rd Floor, RIO Mall, Dr. Ahmed Okasha St.,
                <br />
                New Cairo 1, Cairo Governorate 11865, Egypt
              </span>
            </div>
            <a href="mailto:info@darwish-co.com" className="flex gap-3 hover:underline">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              info@darwish-co.com
            </a>
            <a href="tel:+201101101090" className="flex gap-3 hover:underline">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              +20 110 110 1090
            </a>
            <a
              href="https://wa.me/201101101090"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 hover:underline"
            >
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Client Login ── */}
      <section id="client-login" className="relative overflow-hidden bg-foreground py-24 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 82% 18%, rgba(0,153,204,0.52), transparent 28%), radial-gradient(circle at 8% 90%, rgba(0,204,102,0.16), transparent 26%)" }} />
        <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              Client Access
            </span>
            <h2 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Client Login</h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/75">
              Access Darwish Hub, our secure client portal for your shared workspace, engagement materials, and collaboration with our consulting team.
            </p>
            <Link href="/client-login" className="inline-flex items-center gap-3 bg-white px-7 py-4 text-sm font-bold text-foreground transition-colors hover:bg-chart-2 hover:text-white">
              Sign in to Darwish Hub <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="border border-white/20 bg-white/5 p-8 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-chart-2">Darwish Hub</p>
            <div className="my-6 h-px w-full bg-white/15" />
            <ul className="space-y-4 text-sm leading-relaxed text-white/75">
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-chart-2" />Secure client workspace</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-chart-2" />Direct access to engagement resources</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-chart-2" />Sign in with your approved client account</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
