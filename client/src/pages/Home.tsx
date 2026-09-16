import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight, CheckCircle2, Shield, Users, TrendingUp,
  Brain, BarChart3, Target, Layers
} from "lucide-react";
import { Link } from "wouter";

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

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: "100vh" }}>
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

      {/* ── Strategic Management — Primary Focus ── */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Core Practice
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Strategic Management
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every engagement begins with strategy. We work with leadership
                teams to define direction, align resources, and build the
                performance systems that turn vision into execution.
              </p>
              <div className="w-20 h-1 bg-primary" />
              <Link href="/services/strategy-execution">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-bold rounded-none px-8 mt-4">
                  Explore Strategy Practice <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-6">
              {[
                { icon: Target, color: "text-primary", border: "border-t-primary", title: "Strategic Planning", desc: "Structured frameworks to define goals, allocate resources, and set measurable milestones." },
                { icon: BarChart3, color: "text-chart-2", border: "border-t-chart-2", title: "Performance Systems", desc: "KPI design, balanced scorecards, and OKR implementation aligned to your strategic objectives." },
                { icon: Layers, color: "text-chart-3", border: "border-t-chart-3", title: "Org Design", desc: "Restructuring, role clarity, and governance models that support your growth trajectory." },
              ].map(({ icon: Icon, color, border, title, desc }) => (
                <Card key={title} className={`border-t-4 ${border} border-x-0 border-b-0 shadow-lg rounded-none bg-white`}>
                  <CardHeader>
                    <Icon className={`w-10 h-10 ${color} mb-4`} />
                    <CardTitle className="font-heading text-lg text-foreground">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Supporting Services ── */}
      <section className="py-24 bg-secondary/20">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Supporting Practices</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">Built Around Your Strategy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Once the strategic direction is set, our specialist practices deliver the governance, people, and growth capabilities that bring it to life.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, color: "text-primary", border: "border-t-primary", title: "Governance & Risk", desc: "Robust GRC frameworks that protect your business while enabling sustainable growth.", href: "/services/corporate-family-governance" },
              { icon: Users, color: "text-chart-2", border: "border-t-chart-2", title: "Human Resources", desc: "Strategic HR planning and talent acquisition tailored for the MENA market.", href: "/services/people-organisation" },
              { icon: TrendingUp, color: "text-chart-3", border: "border-t-chart-3", title: "Business Development", desc: "Market entry strategies and partnerships to accelerate your expansion.", href: "/services/growth-market-entry" },
              { icon: Brain, color: "text-primary", border: "border-t-primary", title: "Risk & Compliance", desc: "Anti-bribery programmes, due diligence and the compliance evidence major clients ask for.", href: "/services/risk-compliance-integrity" },
            ].map(({ icon: Icon, color, border, title, desc, href }) => (
              <Card key={title} className={`border-t-4 ${border} border-x-0 border-b-0 shadow-md hover:-translate-y-1 transition-transform duration-300 bg-white rounded-none`}>
                <CardHeader>
                  <Icon className={`w-9 h-9 ${color} mb-3`} />
                  <CardTitle className="font-heading text-lg text-foreground">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{desc}</p>
                  <Link href={href}>
                    <span className={`${color} font-bold text-sm flex items-center hover:underline cursor-pointer group`}>
                      Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote / Image Break ── */}
      <section className="relative py-32 bg-white">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-chart-3/20 z-0" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 z-0" />
            <img
              src="/images/meeting-insight.webp"
              width={1600}
              height={893}
              loading="lazy"
              decoding="async"
              alt="Strategic Meeting"
              className="relative z-10 w-full h-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="space-y-8">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight">
              "The difference between a missed opportunity and a{" "}
              <span className="text-primary">strategic breakthrough</span>."
            </h2>
            <p className="text-lg text-muted-foreground">
              We don't just advise; we partner. Our integrated approach ensures that your governance structures support your people, and your people drive your growth.
            </p>
            <Link href="/about">
              <Button size="lg" className="bg-foreground text-white hover:bg-foreground/90 font-bold rounded-none px-8">
                Read Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Darwish & Co ── */}
      <section className="py-32 bg-secondary/10">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Why Partner with Darwish &amp; Co?</h2>
            <div className="w-16 h-1 bg-chart-2 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { color: "bg-secondary text-primary", title: "Regional Expertise", desc: "Egypt-based and working across MENA, with an understanding of local business culture and how decisions get made." },
              { color: "bg-chart-2/10 text-chart-2", title: "Tailored for SMEs", desc: "Agile, practical strategies designed specifically for growth-stage companies, not corporations." },
              { color: "bg-chart-3/10 text-chart-3", title: "Integrated Approach", desc: "Bridging strategy, governance, and people for a holistic, executable business plan." },
            ].map(({ color, title, desc }) => (
              <div key={title} className="text-center space-y-4">
                <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto`}>
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl text-foreground">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Teaser ── */}
      <section className="py-24 bg-foreground text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Work</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">Platforms We've Built</h2>
              <p className="text-white/60 text-lg max-w-xl">Beyond consulting, we deliver digital solutions that create lasting operational impact for our clients.</p>
            </div>
            <Link href="/projects">
              <span className="flex items-center gap-2 text-primary font-bold text-sm hover:underline cursor-pointer whitespace-nowrap">
                View all projects <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Brain, color: "text-primary", accentColor: "bg-primary", borderHover: "hover:border-primary/50", tagColor: "text-primary", tags: ["React", "tRPC", "MySQL", "Resend Email"], label: "AI Initiative", title: "AI POC Collaboration Platform", desc: "A full-stack platform enabling Techno-Management and Widebot to collaboratively manage AI proof-of-concept projects.", href: "/projects#ai-poc", cta: "Explore platform" },
            ].map(({ icon: Icon, color, accentColor, borderHover, tagColor, tags, label, title, desc, href, cta }) => (
              <div key={title} className={`group relative bg-white/5 border border-white/10 ${borderHover} transition-all duration-300 overflow-hidden`}>
                <div className={`h-1 w-full ${accentColor}`} />
                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${accentColor}/20 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${tagColor}`}>{label}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-heading text-2xl font-bold text-white">{title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm">{desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-white/10 text-white/70 rounded-sm">{tag}</span>
                    ))}
                  </div>
                  <Link href={href}>
                    <span className={`inline-flex items-center gap-2 ${tagColor} font-bold text-sm hover:underline cursor-pointer`}>
                      {cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary text-white">
        <div className="container text-center max-w-3xl mx-auto space-y-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold">Ready to Navigate Your Future?</h2>
          <p className="text-xl text-white/90 font-light">Let's build a resilient and thriving future for your business, together.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-12 py-8 h-auto rounded-none mt-8 shadow-xl">
              Get in Touch
            </Button>
          </Link>
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
