import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight, CheckCircle2, Shield, Users, TrendingUp,
  Brain, Globe, BarChart3, Target, Layers
} from "lucide-react";
import { Link } from "wouter";

// ── FadeIn wrapper ──────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── AnimatedHeading ─────────────────────────────────────────────────────────
function AnimatedHeading({
  lines,
  className = "",
  initialDelay = 200,
  charDelay = 30,
}: {
  lines: string[];
  className?: string;
  initialDelay?: number;
  charDelay?: number;
}) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  let globalCharIndex = 0;
  return (
    <h1 className={className} style={{ letterSpacing: "-0.04em" }}>
      {lines.map((line, lineIdx) => {
        const chars = line.split("");
        const lineStartIndex = globalCharIndex;
        globalCharIndex += chars.length;
        return (
          <span key={lineIdx} className="block">
            {chars.map((char, charIdx) => {
              const delay = lineStartIndex * charDelay + charIdx * charDelay;
              return (
                <span
                  key={charIdx}
                  className="inline-block"
                  style={{
                    opacity: animated ? 1 : 0,
                    transform: animated ? "translateX(0)" : "translateX(-18px)",
                    transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

// ── Hero Section (standalone, full-viewport) ────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Full-screen background video — no overlay */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col h-full px-6 md:px-12 lg:px-16">
        {/* ── Navbar ── */}
        <nav className="pt-6">
          <div className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <span className="flex items-center gap-3 cursor-pointer">
                <img
                  src="/images/logo.png"
                  alt="Darwish & Co."
                  className="h-8 w-auto object-contain"
                  style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}
                />
                <span
                  className="text-white text-xl font-semibold tracking-tight hidden sm:block"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Darwish &amp; Co.
                </span>
              </span>
            </Link>

            {/* Center links — desktop only */}
            <div
              className="hidden md:flex items-center gap-8 text-sm text-white/80"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {[
                { label: "Strategy", href: "/services#strategy" },
                { label: "GRC", href: "/services#grc" },
                { label: "HR", href: "/services#hr" },
                { label: "Projects", href: "/projects" },
                { label: "Partners", href: "/partners" },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="hover:text-white transition-colors duration-200 cursor-pointer">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA button */}
            <Link href="/contact">
              <Button
                size="sm"
                className="bg-white text-black hover:bg-gray-100 rounded-lg text-sm font-medium px-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Start a Conversation
              </Button>
            </Link>
          </div>
        </nav>

        {/* ── Hero content — pushed to bottom ── */}
        <div className="flex-1 flex flex-col justify-end pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end gap-12">
            {/* Left: main copy */}
            <div>
              <AnimatedHeading
                lines={["A Wise Word", "In The Right Moment."]}
                className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4"
                initialDelay={200}
                charDelay={30}
              />

              <FadeIn delay={800} duration={1000}>
                <p
                  className="text-base md:text-lg text-gray-300 mb-5 max-w-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Darwish &amp; Co. partners with MENA's growth-stage businesses
                  to build the strategic foundations that turn ambition into
                  measurable results.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/services#strategy">
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100 rounded-lg font-medium px-8 py-3"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Our Strategy Practice
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="liquid-glass border border-white/20 text-white hover:bg-white hover:text-black rounded-lg font-medium px-8 py-3 transition-all duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Explore All Services
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right: tag */}
            <FadeIn delay={1400} duration={1000} className="flex items-end justify-start lg:justify-end mt-10 lg:mt-0">
              <div
                className="liquid-glass border border-white/20 px-6 py-3 rounded-xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <p className="text-white text-lg md:text-xl lg:text-2xl font-light">
                  Strategy. GRC. HR. Growth.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── HERO (full-viewport, standalone) ── */}
      <HeroSection />

      {/* ── Partner Logos Banner ── */}
      <section
        className="py-10 border-y"
        style={{
          background: "linear-gradient(135deg, #dff0f7 0%, #dff2ea 100%)",
          borderColor: "#b8d9e8",
        }}
      >
        <style>{`
          @keyframes marquee-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee-scroll 18s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="container">
          <p className="text-center text-xs font-bold tracking-widest uppercase text-muted-foreground mb-8">
            Trusted Partners &amp; Alliances
          </p>

          {/* Desktop: static centred row */}
          <div className="hidden md:flex items-center justify-center gap-16">
            {[
              { href: "https://visionethics.com", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/visionethics-logo_1effaf51.webp", alt: "VisionEthics", title: "VisionEthics — Integrity & Anti-Corruption Advisory" },
              { href: "https://widebot.ai", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/widebot-logo_48344ad3.webp", alt: "WideBot AI", title: "WideBot — Arabic AI Platform" },
              { href: "https://techno-management.com", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/techno-management-logo_14119f1e.webp", alt: "Techno-Management", title: "Techno-Management — Strategy & Performance Management" },
              { href: "https://www.keheilan.com", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/keheilan-official-logo_bb492e13.png", alt: "Keheilan Asset Management", title: "Keheilan Asset Management — Hedge Fund & Venture Capital" },
              { href: "https://in-light.tech", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/inlight-logo_f1bdc052.jpg", alt: "In Light Consumer Insights", title: "In Light — Consumer Insights" },
            ].map((p) => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center opacity-70 hover:opacity-100 transition-opacity duration-300" title={p.title}>
                <img src={p.src} alt={p.alt} className="h-12 w-auto object-contain"
                  style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))" }} />
              </a>
            ))}
          </div>

          {/* Mobile: auto-scrolling marquee */}
          <div className="md:hidden overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
            <div className="flex items-center marquee-track" style={{ width: "max-content" }}>
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center gap-12 px-6">
                  {[
                    { href: "https://visionethics.com", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/visionethics-logo_1effaf51.webp", alt: "VisionEthics" },
                    { href: "https://widebot.ai", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/widebot-logo_48344ad3.webp", alt: "WideBot AI" },
                    { href: "https://techno-management.com", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/techno-management-logo_14119f1e.webp", alt: "Techno-Management" },
                    { href: "https://www.keheilan.com", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/keheilan-official-logo_bb492e13.png", alt: "Keheilan Asset Management" },
                    { href: "https://in-light.tech", src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/inlight-logo_f1bdc052.jpg", alt: "In Light Consumer Insights" },
                  ].map((p) => (
                    <a key={p.href + setIdx} href={p.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                      <img src={p.src} alt={p.alt} className="h-12 w-auto object-contain"
                        style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))" }} />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/corporate-partners">
              <span className="text-xs font-bold text-primary hover:underline cursor-pointer tracking-wide uppercase">
                View All Partners →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Strategic Management — Primary Focus ── */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: headline */}
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
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-bold rounded-none px-8 mt-4"
                >
                  Explore Strategy Practice <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Right: 3 capability cards */}
            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-6">
              <Card className="border-t-4 border-t-primary border-x-0 border-b-0 shadow-lg rounded-none bg-white">
                <CardHeader>
                  <Target className="w-10 h-10 text-primary mb-4" />
                  <CardTitle className="font-heading text-lg text-foreground">
                    Strategic Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Structured frameworks to define goals, allocate resources,
                    and set measurable milestones.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-chart-2 border-x-0 border-b-0 shadow-lg rounded-none bg-white">
                <CardHeader>
                  <BarChart3 className="w-10 h-10 text-chart-2 mb-4" />
                  <CardTitle className="font-heading text-lg text-foreground">
                    Performance Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    KPI design, balanced scorecards, and OKR implementation
                    aligned to your strategic objectives.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-chart-3 border-x-0 border-b-0 shadow-lg rounded-none bg-white">
                <CardHeader>
                  <Layers className="w-10 h-10 text-chart-3 mb-4" />
                  <CardTitle className="font-heading text-lg text-foreground">
                    Org Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Restructuring, role clarity, and governance models that
                    support your growth trajectory.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── Supporting Services ── */}
      <section className="py-24 bg-secondary/20">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Supporting Practices
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Built Around Your Strategy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Once the strategic direction is set, our specialist practices
              deliver the governance, people, and growth capabilities that
              bring it to life.
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
              We don't just advise; we partner. Our integrated approach ensures
              that your governance structures support your people, and your
              people drive your growth.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Partner with Darwish &amp; Co?
            </h2>
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
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
                Platforms We've Built
              </h2>
              <p className="text-white/60 text-lg max-w-xl">
                Beyond consulting, we deliver digital solutions that create
                lasting operational impact for our clients.
              </p>
            </div>
            <Link href="/projects">
              <span className="flex items-center gap-2 text-primary font-bold text-sm hover:underline cursor-pointer whitespace-nowrap">
                View all projects <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AI POC Platform */}
            <div className="group relative bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden">
              <div className="h-1 w-full bg-primary" />
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">AI Initiative</span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading text-2xl font-bold text-white">AI POC Collaboration Platform</h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    A full-stack platform enabling Techno-Management and Widebot to collaboratively manage AI proof-of-concept projects.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["React", "tRPC", "MySQL", "Resend Email"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-white/10 text-white/70 rounded-sm">{tag}</span>
                  ))}
                </div>
                <Link href="/projects#ai-poc">
                  <span className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline cursor-pointer">
                    Explore platform <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Hebei-Egypt Trade Portal */}
            <div className="group relative bg-white/5 border border-white/10 hover:border-chart-3/50 transition-all duration-300 overflow-hidden">
              <div className="h-1 w-full bg-chart-3" />
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-chart-3/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-chart-3" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-chart-3">International Trade</span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading text-2xl font-bold text-white">Hebei–Egypt Industrial Partnership Portal</h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    A bilingual trade intelligence platform connecting Egyptian investors with Hebei Province's 107 industrial clusters.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Bilingual", "Trade Data", "Sector Maps"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-white/10 text-white/70 rounded-sm">{tag}</span>
                  ))}
                </div>
                <Link href="/projects#trade-portal">
                  <span className="inline-flex items-center gap-2 text-chart-3 font-bold text-sm hover:underline cursor-pointer">
                    Explore portal <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary text-white">
        <div className="container text-center max-w-3xl mx-auto space-y-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Ready to Navigate Your Future?
          </h2>
          <p className="text-xl text-white/90 font-light">
            Let's build a resilient and thriving future for your business,
            together.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-12 py-8 h-auto rounded-none mt-8 shadow-xl"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
