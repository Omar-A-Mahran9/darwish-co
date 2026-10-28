/**
 * "How we work" on the homepage (formerly Growth 360): five steps from understanding to optimization,
 * renamed and reordered 28 Oct 2026 (layout from the corporate profile slide, 17 Oct 2026). Step 04,
 * Execution, is gold: hovering it (or tapping, or pressing Enter) opens the activation with its three
 * partner tracks. Partner work is attributed to the partner.
 *
 * On desktop the package floats over the journey so nothing on the page moves; below 1080px it opens in
 * place under the step. The package text is always in the page, open or not, so crawlers read it.
 * Motion: when the section scrolls into view the line draws and the steps rise in order. Without
 * JavaScript, or with reduced motion, everything is simply shown.
 */
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Provider = { name: string; mark: string };

const DARWISH: Provider = { name: "Darwish & Co.", mark: "/media/marks/darwish.png" };
const IN_LIGHT: Provider = { name: "In Light", mark: "/media/partners/inlight.png" };

const ICONS: Record<string, ReactNode> = {
  diagnose: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
      <path d="M14 3v5h5" />
      <path d="M19 8v2" />
      <circle cx="16.5" cy="15.5" r="3.5" />
      <path d="m19 18 2.5 2.5" />
      <path d="M8 9h3M8 13h2" />
    </>
  ),
  understand: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M6.5 20v-1.5A4.5 4.5 0 0 1 11 14h2a4.5 4.5 0 0 1 4.5 4.5V20" />
      <circle cx="5" cy="10" r="2" />
      <path d="M2 18.5v-.8A3 3 0 0 1 5 14.7" />
      <circle cx="19" cy="10" r="2" />
      <path d="M22 18.5v-.8a3 3 0 0 0-3-3" />
    </>
  ),
  strategize: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="m8 15 3-3 2.5 2 3-4" />
      <path d="M8 7.5 10 9.5M10 7.5 8 9.5" />
      <circle cx="16.5" cy="10" r=".6" />
    </>
  ),
  optimize: (
    <>
      <path d="M4 20h16" />
      <path d="M6 20v-5M10 20v-8M14 20v-6M18 20v-10" />
      <path d="m5 10 4-4 3 2 6-5" />
      <path d="M15 3h3v3" />
    </>
  ),
  market: (
    <>
      <path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1Z" />
      <path d="M17 9a4 4 0 0 1 0 6" />
      <path d="M20 6.5a8 8 0 0 1 0 11" />
    </>
  ),
  capability: (
    <>
      <circle cx="12" cy="7" r="3" />
      <circle cx="5.5" cy="9" r="2" />
      <circle cx="18.5" cy="9" r="2" />
      <path d="M7 20v-2a5 5 0 0 1 10 0v2" />
      <path d="M2.5 18v-.5A3 3 0 0 1 5.5 14.5M21.5 18v-.5a3 3 0 0 0-3-3" />
    </>
  ),
  activate: (
    <>
      <path d="M13 2 4.5 13.5H11L10 22l9.5-12.5H13z" />
    </>
  ),
  digital: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
    </>
  ),
};

type Step = { n: string; title: string; text: string; icon: string; by: Provider };

const BEFORE: Step[] = [
  { n: "01", title: "Understand", text: "Growth priorities, market and customers.", icon: "understand", by: IN_LIGHT },
  { n: "02", title: "Diagnose", text: "Root causes and growth gaps.", icon: "diagnose", by: DARWISH },
  { n: "03", title: "Design", text: "Growth strategy and clear roadmap.", icon: "strategize", by: DARWISH },
];
const AFTER: Step = { n: "05", title: "Optimize", text: "Measure results, refine performance.", icon: "optimize", by: DARWISH };

const TRACKS: { title: string; items: string[]; icon: string; by: Provider }[] = [
  { title: "Market activation", items: ["SEO", "GEO", "Digital marketing", "Content activation"], icon: "market", by: { name: "Growthino", mark: "/media/marks/growthino.png" } },
  { title: "Capability development", items: ["People", "Skills", "Organizational capability"], icon: "capability", by: { name: "Business Learning House", mark: "/media/marks/blh.png" } },
  { title: "Digital enablement", items: ["Smart solutions", "AI & automation", "Technology"], icon: "digital", by: { name: "Logic Arrow", mark: "/media/marks/logic-arrow.png" } },
];

const Icon = ({ name }: { name: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {ICONS[name]}
  </svg>
);

const By = ({ p }: { p: Provider }) => (
  <p className="gj-by">
    <img src={p.mark} alt="" width={28} height={28} loading="lazy" decoding="async" />
    <span>
      <span className="sr-only">Delivered by </span>
      {p.name}
    </span>
  </p>
);

function StepItem({ s, i }: { s: Step; i: number }) {
  return (
    <li className="gj-step" style={{ ["--i" as string]: i }}>
      <span className="gj-num" aria-hidden="true">
        {s.n}
      </span>
      <h3>
        <span className="sr-only">Step {Number(s.n)}: </span>
        {s.title}
      </h3>
      <p className="gj-text">{s.text}</p>
      <span className="gj-rail" aria-hidden="true">
        <span className="gj-node">
          <Icon name={s.icon} />
        </span>
      </span>
      <By p={s.by} />
    </li>
  );
}

const PACK_ID = "gj-pack";

/** Step 04: a gold step that opens the activation package. */
function ActivateStep() {
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState<CSSProperties>({});
  const li = useRef<HTMLLIElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const floating = () => window.matchMedia("(min-width: 1080px)").matches;
  const hoverable = () => floating() && window.matchMedia("(hover: hover)").matches;

  // On desktop the package floats inside the journey: it starts just under the gold circle and stays
  // within the journey's width, with its pointer under the circle.
  const measure = useCallback(() => {
    const step = li.current, node = btn.current, list = step?.parentElement;
    if (!step || !node || !list || !floating()) return setPlace({});
    const l = list.getBoundingClientRect(), n = node.getBoundingClientRect();
    const width = Math.min(800, l.width);
    const centre = n.left + n.width / 2 - l.left;
    const left = Math.max(0, Math.min(centre - width / 2, l.width - width));
    setPlace({ top: n.bottom - l.top + 18, left, width, ["--gj-arrow" as string]: `${centre - left}px` });
  }, []);

  const show = (v: boolean) => {
    if (v) measure();
    setOpen(v);
  };
  const later = (v: boolean, ms: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => show(v), ms);
  };

  useEffect(() => {
    if (!open) return;
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, measure]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <li
      ref={li}
      className={"gj-step gj-activate" + (open ? " is-open" : "")}
      style={{ ["--i" as string]: 3 }}
      onMouseEnter={() => hoverable() && later(true, 150)}
      onMouseLeave={() => hoverable() && later(false, 160)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          show(false);
          btn.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (floating() && !li.current?.contains(e.relatedTarget as Node)) show(false);
      }}
    >
      <span className="gj-num" aria-hidden="true">
        04
      </span>
      <h3>
        <span className="sr-only">Step 4: </span>Execution
      </h3>
      <p className="gj-text">Activation with specialist partners.</p>
      <span className="gj-rail">
        <button
          ref={btn}
          type="button"
          className="gj-node gj-open"
          aria-expanded={open}
          aria-controls={PACK_ID}
          aria-label="See the activation with specialist partners"
          onClick={() => {
            window.clearTimeout(timer.current);
            show(!open);
          }}
        >
          <Icon name="activate" />
        </button>
      </span>
      <p className="gj-by gj-partners">
        <span className="gj-marks" aria-hidden="true">
          {TRACKS.map((t) => (
            <img src={t.by.mark} alt="" width={24} height={24} loading="lazy" decoding="async" key={t.by.name} />
          ))}
        </span>
        <span>Specialist partners</span>
      </p>
      <span className="gj-hint" aria-hidden="true" onClick={() => show(!open)}>
        {open ? "Close the package" : "See the package"} <span className="gj-plus">+</span>
      </span>
      <div className="gj-pack" id={PACK_ID} role="region" aria-label="Activation with specialist partners" style={place}>
        <div className="gj-pack-clip">
          <div className="gj-pack-inner">
            <div className="gj-pack-head">
              <p className="gj-pack-title">Activation with specialist partners</p>
              <p className="gj-pack-sub">An activation mix based on diagnosed business needs.</p>
            </div>
            <ul className="gj-tracks">
              {TRACKS.map((t, j) => (
                <li className="gj-track" style={{ ["--j" as string]: j }} key={t.title}>
                  <span className="gj-tnode" aria-hidden="true">
                    <Icon name={t.icon} />
                  </span>
                  <h4>{t.title}</h4>
                  <ul className="gj-items">
                    {t.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <By p={t.by} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Growth360Journey() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The package closes into its step only once script can open it again.
    el.dataset.ready = "";
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Armed only once script runs, so the journey is never hidden for visitors without JavaScript.
    el.dataset.armed = "";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol className="gj" ref={ref} aria-label="How we work, step by step">
      {BEFORE.map((s, i) => (
        <StepItem s={s} i={i} key={s.n} />
      ))}
      <ActivateStep />
      <StepItem s={AFTER} i={4} />
    </ol>
  );
}
