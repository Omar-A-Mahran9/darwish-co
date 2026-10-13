import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "wouter";
import { BLOG_ARTICLES } from "@shared/seo";
import { ServicesShowcase } from "@/components/ServicesShowcase";

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

/**
 * Three of the consultants listed on /partners, shown on the homepage so the
 * firm has faces and names before a visitor reaches the Insights section.
 *
 * Names, roles and expertise are the verified ones from that page. The
 * portraits are GENERATED IMAGES, not photographs of these people — supplied
 * on 16 Sep 2026 with the founder to be told directly, which is why no notice
 * appears on the page. They should be replaced with real photographs.
 */
const FEATURED_CONSULTANTS = [
  {
    name: "Fouad Ismail Fouad Darwish",
    photo: "/images/people/fouad-darwish.webp",
    role: "Managing Partner — Political & Strategic Consultant",
    expertise:
      "Twenty years in anti-corruption policy and governance reform. Former Director of the Research Centre for the Prevention and Combating of Corruption, and fifteen years with Egypt's Administrative Control Authority.",
  },
  {
    name: "Teh Chau Chin",
    photo: "/images/people/teh-chau-chin.webp",
    role: "Principal Consultant — Anti-Corruption & Risk Advisory",
    expertise:
      "Governance, risk and compliance across Asia and the Middle East, with anti-bribery management systems and enterprise risk frameworks built to recognised standards.",
  },
  {
    name: "Sherin Hamouda Ibrahim",
    photo: "/images/people/sherin-hamouda.webp",
    role: "Senior Consultant — Project Management & Quality",
    expertise:
      "Twenty-six years running multi-phase transformation programmes in IT and construction, including an ISO 9001 certification programme as management representative. PMP and SAFe certified.",
  },
];

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
  { href: "https://growthino.com",        src: "/images/partners/growthino.webp",         alt: "Growthino" },
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

/**
 * Conduction pulse.
 *
 * Both rings hold their satellites 90° apart, so a ring never aligns with
 * itself — the only event is inner ring against outer. The rings close on each
 * other at 39°/s (24 forward, 15 back), and because both are four-fold
 * symmetric every inner satellite meets an outer one every 2.3s. That is far
 * too often to read as a moment, so the pulse is gated on one *labelled* pair,
 * satellite 0 against satellite 4, which comes round once per full relative
 * revolution — roughly every 9.2s.
 *
 * At that instant all four pairs are aligned, so all four fire, staggered into
 * a sweep that converges on the hub: the satellites keep their own orbits, and
 * once a revolution the line of sight back to the centre lights up.
 */
const CONDUCTION_PAIRS: ReadonlyArray<readonly [number, number]> = [
  [0, 4], [1, 5], [2, 6], [3, 7],
];
/** Fires ~200ms before exact alignment, which the fade-in covers. */
const ALIGN_TOLERANCE_DEG = 8;
const PULSE_MS = 900;
const PAIR_STAGGER_MS = 90;
const TRAVEL_START_MS = 100;
const TRAVEL_MS = 450;
const ARRIVAL_MS = TRAVEL_START_MS + TRAVEL_MS;
const BLOOM_MS = 350;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

/** Signed separation of two angles, wrapped to [-180, 180). */
function angleDelta(a: number, b: number) {
  let d = (a - b) % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

function FloatingLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const angleRefs = useRef<number[]>(ORBIT_DEFS.map(d => d.startDeg));
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const conduitRefs = useRef<(SVGPolylineElement | null)[]>([]);
  const sparkRefs = useRef<(SVGCircleElement | null)[]>([]);
  const bloomRef = useRef<SVGCircleElement>(null);
  /** Start of the current pulse, or null when idle. Doubles as the re-fire latch. */
  const pulseStartRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: set the satellites to their resting angle once and stop
    // — no orbit, no pulse. (Previously only the pulse honoured this setting;
    // the orbit itself ran regardless.)
    if (reduceMotion) {
      ORBIT_DEFS.forEach((def, i) => {
        const rad = (def.startDeg * Math.PI) / 180;
        const cx = def.radius * Math.cos(rad);
        const cy = def.radius * Math.sin(rad);
        const wrap = wrapRefs.current[i];
        if (wrap) wrap.style.transform = `translate(${cx - def.size / 2}px, ${cy - def.size / 2}px)`;
      });
      return;
    }

    // "An occasional framing device, not a repeating decorative stamp" — the
    // orbit plays once, for one full conduction cycle, the first time it
    // scrolls into view, then settles rather than spinning indefinitely.
    let hasPlayed = false;
    const PLAY_DURATION_MS = 13_000; // covers one full satellite-0/4 realignment (~9.2s) plus its pulse
    let stopTimer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (hasPlayed || !entries[0]?.isIntersecting) return;
        hasPlayed = true;
        observer.disconnect();
        rafRef.current = requestAnimationFrame(tick);
        stopTimer = setTimeout(() => cancelAnimationFrame(rafRef.current), PLAY_DURATION_MS);
      },
      { threshold: 0.3 },
    );
    if (containerRef.current) observer.observe(containerRef.current);

    let last = performance.now();
    // Satellite centres for this frame, reused by the conduction pass below.
    const pos = ORBIT_DEFS.map(() => ({ x: 0, y: 0 }));

    function tick(now: number) {
      // Clamped: a backgrounded tab throttles rAF, and an unclamped dt would
      // teleport the satellites — past an alignment, in this case.
      const dt = Math.min((now - last) / 1000, 0.05); // seconds
      last = now;
      ORBIT_DEFS.forEach((def, i) => {
        angleRefs.current[i] += def.speed * dt * 60; // deg per frame at 60fps
        const rad = (angleRefs.current[i] * Math.PI) / 180;
        const cx = def.radius * Math.cos(rad);
        const cy = def.radius * Math.sin(rad);
        pos[i].x = cx;
        pos[i].y = cy;
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

      if (!reduceMotion) updateConduction(now, pos);

      rafRef.current = requestAnimationFrame(tick);
    }

    function updateConduction(now: number, pos: { x: number; y: number }[]) {
      // Arm on the labelled pair approaching alignment. The latch below is held
      // longer than the tolerance window is wide, so one crossing fires once.
      if (
        pulseStartRef.current === null &&
        Math.abs(angleDelta(angleRefs.current[0], angleRefs.current[4])) < ALIGN_TOLERANCE_DEG
      ) {
        pulseStartRef.current = now;
      }
      const started = pulseStartRef.current;

      CONDUCTION_PAIRS.forEach(([inner, outer], k) => {
        const conduit = conduitRefs.current[k];
        const spark = sparkRefs.current[k];
        if (!conduit || !spark) return;

        const t = started === null ? -1 : now - started - k * PAIR_STAGGER_MS;
        if (t < 0 || t > PULSE_MS) {
          conduit.style.opacity = "0";
          spark.style.opacity = "0";
          return;
        }

        // Endpoints stay attached to the satellites rather than frozen at the
        // alignment angle, so the path bends gently as the rings drift apart.
        const { x: ox, y: oy } = pos[outer];
        const { x: ix, y: iy } = pos[inner];
        conduit.setAttribute("points", `${ox},${oy} ${ix},${iy} 0,0`);

        const envelope = Math.min(clamp01(t / 150), 1 - clamp01((t - ARRIVAL_MS) / BLOOM_MS));
        conduit.style.opacity = `${0.3 * envelope}`;

        // Light travels outer satellite → inner satellite → hub.
        const p = easeInOut(clamp01((t - TRAVEL_START_MS) / TRAVEL_MS));
        const legOut = Math.hypot(ix - ox, iy - oy);
        const legIn = Math.hypot(ix, iy);
        const travelled = p * (legOut + legIn);
        let sx: number, sy: number;
        if (travelled <= legOut) {
          const u = legOut ? travelled / legOut : 0;
          sx = ox + (ix - ox) * u;
          sy = oy + (iy - oy) * u;
        } else {
          const u = legIn ? (travelled - legOut) / legIn : 0;
          sx = ix - ix * u;
          sy = iy - iy * u;
        }
        spark.setAttribute("cx", `${sx}`);
        spark.setAttribute("cy", `${sy}`);
        spark.style.opacity = `${p >= 1 ? 0 : 0.85 * clamp01(t / 120)}`;
      });

      // One bloom at the hub, timed to the first arrival.
      const bloom = bloomRef.current;
      if (bloom) {
        const tb = started === null ? -1 : now - started - ARRIVAL_MS;
        if (tb < 0 || tb > BLOOM_MS) {
          bloom.style.opacity = "0";
        } else {
          const q = tb / BLOOM_MS;
          bloom.setAttribute("r", `${28 + 46 * q}`);
          bloom.style.opacity = `${0.42 * (1 - q)}`;
        }
      }

      // Release once the last staggered beam has finished.
      if (
        started !== null &&
        now - started > PULSE_MS + (CONDUCTION_PAIRS.length - 1) * PAIR_STAGGER_MS
      ) {
        pulseStartRef.current = null;
      }
    }

    return () => {
      observer.disconnect();
      clearTimeout(stopTimer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: "520px", height: "520px" }}
    >
      {/* Radial glow backdrop — navy, not the old all-blue glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(23,43,67,0.16) 0%, rgba(23,43,67,0.06) 55%, transparent 80%)",
          filter: "blur(36px)",
          pointerEvents: "none",
        }}
      />

      {/* Orbit ring 1 — inner */}
      <div style={{
        position: "absolute", width: "300px", height: "300px",
        borderRadius: "50%", border: "1px dashed rgba(23,43,67,0.18)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      {/* Orbit ring 2 — outer */}
      <div style={{
        position: "absolute", width: "450px", height: "450px",
        borderRadius: "50%", border: "1px dashed rgba(23,43,67,0.09)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      {/* Conduction overlay. Sits above the rings and below the emblem, and is
          driven entirely by the rAF loop above — no React state, no re-render.
          The viewBox is centred so satellite coordinates map straight through. */}
      <svg
        viewBox="-260 -260 520 520"
        aria-hidden="true"
        focusable="false"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        {/* Gold is the document's "rare emphasis, decorative" color — this
            once-per-orbit pulse, not running text, is exactly that use. The
            connecting lines stay navy/link-blue; only the moment of arrival
            (the spark and its bloom) takes the gold. */}
        <circle
          ref={bloomRef}
          cx="0"
          cy="0"
          r="28"
          fill="rgba(255,215,23,0.55)"
          style={{ opacity: 0, filter: "blur(14px)" }}
        />
        {CONDUCTION_PAIRS.map((_, k) => (
          <polyline
            key={`conduit-${k}`}
            ref={el => { conduitRefs.current[k] = el; }}
            points="0,0"
            fill="none"
            stroke="#0076c1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ opacity: 0 }}
          />
        ))}
        {CONDUCTION_PAIRS.map((_, k) => (
          <circle
            key={`spark-${k}`}
            ref={el => { sparkRefs.current[k] = el; }}
            cx="0"
            cy="0"
            r="3.2"
            fill="#FFD717"
            style={{ opacity: 0, filter: "drop-shadow(0 0 6px rgba(255,215,23,0.95))" }}
          />
        ))}
      </svg>

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
              filter: "drop-shadow(0 2px 8px rgba(23,43,67,0.25))",
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
          filter: "drop-shadow(0 6px 24px rgba(23,43,67,0.35))",
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
      <div className="relative z-10 flex flex-col pt-20" style={{ minHeight: "100vh" }}>
        {/* Hero body */}
        <div className="flex-1 flex items-center">
          <div className="site-container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 lg:py-24">

            {/* ── Left: copy. First in the source order, so on a narrow screen
                 the headline and the CTA are what the visitor sees first. ── */}
            <div className="space-y-8 order-1">
              {/* Headline */}
              <h1
                className="font-heading"
                style={{
                  fontWeight: 700,
                  // Capped at 64px, not 72: the hero text column is 552px on the
                  // 1280px grid, and "Delegate decisions" needs 591px at 72px —
                  // so it wrapped to a fourth line above ~1340px viewports.
                  fontSize: "clamp(36px, 5vw, 64px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--foreground)",
                }}
              >
                {/* The breaks are the desktop composition, where the column is
                    wide enough to hold them. Below lg the headline wraps on its
                    own: kept, these force a fourth line on a phone. Wording and
                    size are unchanged — only the two hardcoded hex colors above
                    and below were swapped for the brand-doc tokens they should
                    always have referenced. */}
                Delegate decisions<br className="hidden lg:inline" />{" "}
                without losing<br className="hidden lg:inline" />{" "}
                <span style={{ color: "var(--link)" }}>oversight.</span>
              </h1>

              {/* Sub-headline */}
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: 1.65,
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
              <div className="flex flex-wrap gap-6 items-center">
                <Link href="/contact">
                  <Button size="lg">
                    Book a consultation <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/services">
                  <span className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                    Explore services <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>

            {/* ── Right: animated logos. Second on a narrow screen, and scaled
                 down there so it does not fill the first screen. ── */}
            <div className="order-2 flex h-[280px] items-center justify-center sm:h-[360px] lg:h-auto lg:min-h-[400px]">
              <div className="scale-[0.52] sm:scale-[0.68] lg:scale-100">
                <FloatingLogos />
              </div>
            </div>
          </div>
        </div>

        {/* ── Trusted-by footer strip ── */}
        {/* Was bare padding with no container, which left the logo row sitting
            32px outboard of every other row on the page. */}
        <div className="site-container pb-12">
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

/**
 * A worked engagement, reduced to its outcome. The situation and the work that
 * produced it belong to the full case study the button points at.
 *
 * PLACEHOLDER. Every figure, quotation and attribution below is invented to
 * hold the shape of the section, as is the photograph. It must be replaced with
 * a real engagement — with the client's written permission to name them, or
 * anonymised with their agreement — before this page is published. The review
 * notice is deliberately visible so it cannot go live unnoticed.
 */
const CASE_EXAMPLE = {
  client: "A family-owned manufacturer, 140 staff, Greater Cairo",
  outcome: [
    { figure: "3 of 4", label: "decision types moved off the founder's desk" },
    { figure: "11 weeks", label: "from first conversation to the board adopting the matrix" },
    { figure: "Facility approved", label: "governance questions closed at the second review" },
  ],
  quote:
    "The point was never the document. It was that I could take a week off and the company kept deciding.",
  attribution: "Managing Director",
};

function CaseExampleSection() {
  return (
    <section className="border-t border-border bg-white py-24">
      <div className="site-container space-y-10">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            What an engagement looks like
          </span>
          <h2 className="font-heading text-h2 font-bold text-foreground">
            One piece of work, start to finish
          </h2>
          <p className="leading-relaxed text-muted-foreground">{CASE_EXAMPLE.client}</p>
        </div>

        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {/* The picture stands for the invented client, and is a placeholder
              itself — see the review notice above. */}
          {/* The picture is taken out of the flow so it cannot set the height of
              the row: it fills whatever height the text beside it needs, and no
              more. On a narrow screen there is no text beside it, so it keeps a
              4:3 box of its own. */}
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <img
              src="/images/case-example.webp"
              width={1086}
              height={1448}
              loading="lazy"
              decoding="async"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* The outcome alone, stacked. The situation and the work that
              produced it are the subject of the full case study. */}
          <div className="flex flex-col justify-center gap-8">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              The outcome
            </p>
            <dl className="divide-y divide-border border-y border-border">
              {CASE_EXAMPLE.outcome.map((result) => (
                <div key={result.label} className="py-5">
                  <dt className="font-heading text-3xl font-bold leading-tight text-primary">
                    {result.figure}
                  </dt>
                  <dd className="mt-1 leading-relaxed text-muted-foreground">{result.label}</dd>
                </div>
              ))}
            </dl>
            <div>
              <Link href="/contact">
                <Button size="lg">
                  Read the full case study <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <figure className="border-t-2 border-primary bg-secondary/20 p-8">
          <blockquote className="font-heading text-xl font-bold leading-snug text-foreground">
            &ldquo;{CASE_EXAMPLE.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            {CASE_EXAMPLE.attribution}, {CASE_EXAMPLE.client}
          </figcaption>
        </figure>
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

      {/* ── A worked example ── */}
      <CaseExampleSection />

      {/* ── When companies call us ── */}
      <section className="bg-white py-24">
        <div className="site-container space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              When companies call us
            </span>
            <h2 className="font-heading text-h2 font-bold text-foreground">
              Two situations bring most clients here
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {PRIORITY_SITUATIONS.map((situation) => (
              <div key={situation.href} className="flex flex-col justify-between gap-6 border-t-2 border-primary bg-secondary/20 p-8">
                <div className="space-y-4">
                  <p className="font-heading text-xl font-bold leading-snug text-foreground">
                    &ldquo;{situation.quote}&rdquo;
                  </p>
                  <p className="leading-relaxed text-muted-foreground">{situation.body}</p>
                </div>
                <Link href={situation.href}>
                  <span className="link inline-flex cursor-pointer items-center gap-2 text-sm font-bold">
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
      <ServicesShowcase />

      {/* ── The people behind the work ── */}
      <section className="bg-secondary/10 py-24">
        <div className="site-container space-y-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Who does the work
            </span>
            <h2 className="font-heading text-h2 font-bold text-foreground">
              The people behind the work
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Engagements are delivered by named consultants. Where a service calls for specialist
              capability, a partner firm works alongside us, and the service page says who is
              accountable for what.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {FEATURED_CONSULTANTS.map((person) => (
              <div
                key={person.name}
                className="flex flex-col gap-4 border-t-4 border-primary bg-white p-8"
              >
                <img
                  src={person.photo}
                  width={256}
                  height={256}
                  loading="lazy"
                  decoding="async"
                  alt={person.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div className="space-y-1">
                  <h3 className="font-heading text-lg font-bold leading-tight text-foreground">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold text-primary">{person.role}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{person.expertise}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/partners">
              <Button variant="outline">Consultants &amp; advisers</Button>
            </Link>
            <Link href="/corporate-partners">
              <Button variant="outline">Partner firms</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Insights ── */}
      <section className="bg-white py-24">
        <div className="site-container space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Insights
              </span>
              <h2 className="font-heading text-h2 font-bold text-foreground">
                What we have been writing about
              </h2>
            </div>
            <Link href="/blog">
              <span className="link cursor-pointer whitespace-nowrap text-sm font-bold">
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

      {/* ── How we work ── */}
      <section className="bg-white py-24">
        <div className="site-container space-y-12">
          <h2 className="font-heading text-h2 font-bold text-foreground">
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

      {/* ── Contact ── */}
      <section className="bg-primary py-20 text-white">
        <div className="site-container grid gap-12 md:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <h2 className="font-heading text-h2 font-bold">
              Book a consultation
            </h2>
            <p className="max-w-xl leading-relaxed text-white/85">
              Tell us what has prompted the work — an investor asking questions, a client
              questionnaire, a structure that has stopped working — and we will tell you which of
              our services applies, or whether none does.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="font-bold">
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

      {/* The client-login section used to sit here, after the consultation
          section. It competed with it for the end of the page; client access is
          now a link in the header, the mobile menu and the footer. */}
    </div>
  );
}
