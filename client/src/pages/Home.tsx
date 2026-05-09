import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight, CheckCircle2, Shield, Users, TrendingUp,
  Brain, Globe, BarChart3, Target, Layers, Star
} from "lucide-react";
import { Link } from "wouter";

// ─── CDN assets ────────────────────────────────────────────────────────────
const EMBLEM_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/darwish-emblem-nobg_fd180146.png";
const LOGOIN_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/darwish-logoin-v3_92cb6d47.png";

// ─── Partner logo CDN urls ──────────────────────────────────────────────────
const PARTNER_LOGOS = [
  { href: "https://visionethics.com",     src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/visionethics-logo_1effaf51.webp",      alt: "VisionEthics" },
  { href: "https://widebot.ai",           src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/widebot-logo_48344ad3.webp",           alt: "WideBot AI" },
  { href: "https://techno-management.com",src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/techno-management-logo_14119f1e.webp", alt: "Techno-Management" },
  { href: "https://www.keheilan.com",     src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/keheilan-official-logo_bb492e13.png",  alt: "Keheilan" },
  { href: "https://in-light.tech",        src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/inlight-logo_f1bdc052.jpg",           alt: "In Light" },
];

// ─── Liquid-glass navbar ────────────────────────────────────────────────────
function GlassNavbar() {
  return (
    <div
      className="sticky top-[30px] z-50 mx-auto w-fit"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav
        style={{
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(50px)",
          background: "rgba(255,255,255,0.3)",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "inset 0px 4px 4px 0px rgba(255,255,255,0.25)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Logo */}
        <Link href="/">
          <span
            className="flex items-center gap-2 cursor-pointer select-none"
            style={{ fontFamily: "'Fustat', sans-serif", fontWeight: 700, fontSize: "18px", color: "#111" }}
          >
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/logo-nobg_7762efbd.png" alt="Darwish & Co." className="h-7 w-auto object-contain" />
            Darwish &amp; Co.
          </span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {[
            { label: "Strategy", href: "/services#strategy" },
            { label: "Services", href: "/services" },
            { label: "Projects", href: "/projects" },
            { label: "Partners", href: "/partners" },
            { label: "Blog", href: "/blog" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <span className="hover:text-gray-900 transition-colors duration-150 cursor-pointer">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Sign-up / CTA button */}
        <Link href="/contact">
          <button
            style={{
              background: "rgba(0,132,255,0.85)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              borderRadius: "12px",
              border: "none",
              boxShadow: "inset 0px 4px 4px 0px rgba(255,255,255,0.35)",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              padding: "8px 18px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              transition: "transform 200ms ease, opacity 200ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
          >
            Get Started
            <span
              style={{
                background: "rgba(255,255,255,0.25)",
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowRight size={12} strokeWidth={2.5} />
            </span>
          </button>
        </Link>
      </nav>
    </div>
  );
}

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

      {/* Central emblem — magnetic explode/reassemble animation */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          filter: "drop-shadow(0 6px 24px rgba(49,154,255,0.4))",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          width="150"
          height="150"
          aria-hidden="true"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Explode keyframes per colour group — each flies in a different direction */}
            <style>{`
              @keyframes explode-blue {
                0%,100% { transform: translate(0,0) scale(1); opacity:1; }
                30%      { transform: translate(-22px,-18px) scale(1.08); opacity:0.85; }
                50%      { transform: translate(-22px,-18px) scale(1.08); opacity:0.85; }
                80%      { transform: translate(0,0) scale(1); opacity:1; }
              }
              @keyframes explode-green {
                0%,100% { transform: translate(0,0) scale(1); opacity:1; }
                30%      { transform: translate(20px,-18px) scale(1.08); opacity:0.85; }
                50%      { transform: translate(20px,-18px) scale(1.08); opacity:0.85; }
                80%      { transform: translate(0,0) scale(1); opacity:1; }
              }
              @keyframes explode-gold {
                0%,100% { transform: translate(0,0) scale(1); opacity:1; }
                30%      { transform: translate(0px, 24px) scale(1.06); opacity:0.85; }
                50%      { transform: translate(0px, 24px) scale(1.06); opacity:0.85; }
                80%      { transform: translate(0,0) scale(1); opacity:1; }
              }
              .explode-blue  { animation: explode-blue  4.5s ease-in-out infinite; transform-origin: 100px 100px; }
              .explode-green { animation: explode-green 4.5s ease-in-out infinite; transform-origin: 100px 100px; }
              .explode-gold  { animation: explode-gold  4.5s ease-in-out infinite; transform-origin: 100px 100px; }
            `}</style>
          </defs>

          {/* ── GOLD / ORANGE accent ring (middle layer) ── */}
          <g className="explode-gold">
            {Array.from({length:12},(_,i)=>{
              const a=(i*30)*Math.PI/180;
              const r=62;
              const x=100+r*Math.cos(a);
              const y=100+r*Math.sin(a);
              return <circle key={i} cx={x} cy={y} r={7} fill="#F5A623" opacity="0.95"/>;
            })}
            <circle cx="100" cy="100" r="14" fill="#F5A623" opacity="0.9"/>
          </g>

          {/* ── GREEN outer star points ── */}
          <g className="explode-green">
            {Array.from({length:12},(_,i)=>{
              const a=(i*30)*Math.PI/180;
              const r=82;
              const cx=100+r*Math.cos(a);
              const cy=100+r*Math.sin(a);
              const tip=100+(r+18)*Math.cos(a);
              const tiy=100+(r+18)*Math.sin(a);
              const lx=100+(r-10)*Math.cos(a-0.28);
              const ly=100+(r-10)*Math.sin(a-0.28);
              const rx=100+(r-10)*Math.cos(a+0.28);
              const ry=100+(r-10)*Math.sin(a+0.28);
              return <polygon key={i} points={`${tip},${tiy} ${lx},${ly} ${rx},${ry}`} fill="#2ECC71" opacity="0.92"/>;
            })}
          </g>

          {/* ── BLUE inner petals ── */}
          <g className="explode-blue">
            {Array.from({length:12},(_,i)=>{
              const a=(i*30)*Math.PI/180;
              const r=44;
              const tipx=100+(r+20)*Math.cos(a);
              const tipy=100+(r+20)*Math.sin(a);
              const lx=100+(r-8)*Math.cos(a-0.38);
              const ly=100+(r-8)*Math.sin(a-0.38);
              const rx=100+(r-8)*Math.cos(a+0.38);
              const ry=100+(r-8)*Math.sin(a+0.38);
              return <polygon key={i} points={`${tipx},${tipy} ${lx},${ly} ${rx},${ry}`}
                fill={i%2===0?"#1A73E8":"#0D47A1"} opacity="0.93"/>;
            })}
            <circle cx="100" cy="100" r="22" fill="#1A73E8" opacity="0.85"/>
          </g>
        </svg>
      </div>
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
        {/* Navbar */}
        <div className="pt-6 px-4">
          <GlassNavbar />
        </div>

        {/* Hero body */}
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 lg:py-24">

            {/* ── Left: copy ── */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* Social proof badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  fontFamily: "'Inter', sans-serif",
                  color: "#444",
                }}
              >
                <span className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#FF801E" stroke="none" />
                  ))}
                </span>
                <span>Rated 4.9/5 by 200+ clients</span>
              </div>

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
                Navigating complexity and unlocking potential for SMEs in the
                MENA region through expert strategic management, GRC, HR, and
                market research consulting.
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
                    Get Started Now
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
            Trusted by top-tier companies across MENA
          </p>

          {/* Desktop: static row */}
          <div className="hidden md:flex items-center justify-center" style={{ gap: "100px" }}>
            {PARTNER_LOGOS.map((p) => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300 flex items-center">
                <img src={p.src} alt={p.alt} className="h-10 w-auto object-contain" />
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
                      <img src={p.src} alt={p.alt} className="h-10 w-auto object-contain" />
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
              <Link href="/services#strategy">
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
              { icon: Shield, color: "text-primary", border: "border-t-primary", title: "Governance & Risk", desc: "Robust GRC frameworks that protect your business while enabling sustainable growth.", href: "/services#grc" },
              { icon: Users, color: "text-chart-2", border: "border-t-chart-2", title: "Human Resources", desc: "Strategic HR planning and talent acquisition tailored for the MENA market.", href: "/services#hr" },
              { icon: TrendingUp, color: "text-chart-3", border: "border-t-chart-3", title: "Business Development", desc: "Market entry strategies and partnerships to accelerate your expansion.", href: "/services#bizdev" },
              { icon: Brain, color: "text-primary", border: "border-t-primary", title: "Digital & AI", desc: "Digital marketing, AI tools, and consumer insights to sharpen your competitive edge.", href: "/services" },
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
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/meeting-insight_58b81ff9.jpg"
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
              { color: "bg-secondary text-primary", title: "Regional Expertise", desc: "Deeply rooted in MENA culture and regulations, ensuring compliance and cultural alignment." },
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
              { icon: Globe, color: "text-chart-3", accentColor: "bg-chart-3", borderHover: "hover:border-chart-3/50", tagColor: "text-chart-3", tags: ["React", "Bilingual", "Trade Data", "Sector Maps"], label: "International Trade", title: "Hebei–Egypt Industrial Partnership Portal", desc: "A bilingual trade intelligence platform connecting Egyptian investors with Hebei Province's 107 industrial clusters.", href: "/projects#trade-portal", cta: "Explore portal" },
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
    </div>
  );
}
