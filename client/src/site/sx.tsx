/**
 * Building blocks for the service pages and About (ported from prototype/tools/service_detail.py).
 * Class names match site.css exactly, so the markup renders the same as the approved prototype.
 */
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "wouter";
import { PEOPLE } from "./content/site";

/* ------------------------------------------------------------------ links */
/** In-page anchors stay plain links; everything else navigates inside the app. */
export function SiteLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode; [k: string]: unknown }) {
  if (href.startsWith("#") || /^(https?:|mailto:|tel:)/.test(href))
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ icons */
const ICONS: Record<string, string> = {
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.6 2.7-6 6-6s6 2.4 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M16 14.2c2.8.2 5 2.3 5 5.8"/>',
  gauge: '<path d="M3.5 17a8.5 8.5 0 1 1 17 0"/><path d="M12 17l4-6"/><path d="M3.5 17h17"/>',
  check: '<rect x="4" y="4" width="16" height="16"/><path d="M8 12.5l3 3 5-6"/>',
  bars: '<path d="M5 20V11M12 20V5M19 20v-6"/><path d="M3 20h18"/>',
  cycle: '<path d="M19.5 12a7.5 7.5 0 0 1-13 5.1"/><path d="M4.5 12a7.5 7.5 0 0 1 13-5.1"/><path d="M17.5 3.5v3.4h-3.4M6.5 20.5v-3.4h3.4"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>',
  org: '<rect x="9" y="3" width="6" height="5"/><rect x="3" y="16" width="6" height="5"/><rect x="15" y="16" width="6" height="5"/><path d="M12 8v4M6 16v-4h12v4"/>',
  flow: '<rect x="3" y="9" width="5" height="6"/><rect x="16" y="9" width="5" height="6"/><path d="M8 12h8M13 9.5l3 2.5-3 2.5"/>',
  process: '<path d="M3 6h11M3 12h16M3 18h8"/><path d="M16 15l4 3-4 3"/><circle cx="17" cy="6" r="2"/>',
  project: '<rect x="3" y="4" width="18" height="16"/><path d="M3 9h18M9 9v11"/><path d="M12.5 13.5h5M12.5 16.5h3"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6M9 19h4"/>',
  checklist: '<rect x="4" y="3" width="16" height="18"/><path d="M8 8.5l1.5 1.5 2.5-3M8 14.5l1.5 1.5 2.5-3M14 9h3M14 15h3"/>',
  screen: '<rect x="3" y="4" width="18" height="12"/><path d="M8 20h8M12 16v4"/><path d="M7 12l3-3 2.5 2 4.5-4"/>',
};
export const Icon = ({ name, cls = "sx-ico" }: { name: string; cls?: string }) => (
  <svg className={cls} viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
);
export const Chevron = () => (
  <svg className="sx-chev" viewBox="0 0 20 28" aria-hidden="true">
    <path d="M4 3l11 11L4 25" />
  </svg>
);
export const Plus = () => (
  <svg className="sx-plus" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 2v12M2 8h12" />
  </svg>
);
export const n2 = (i: number) => String(i).padStart(2, "0");

/* ------------------------------------------------------------------ breadcrumbs */
export function Crumbs({ items }: { items: [string, string | null][] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        {items.map(([t, href]) => (
          <li key={t} aria-current={href ? undefined : "page"}>
            {href ? <SiteLink href={href}>{t}</SiteLink> : t}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ photographs */
// AI-generated editorial illustrations with fictional people and places (Darwish-Service-Images package):
// never caption them as Darwish staff, offices, clients or engagements. alt "" = background hero.
const IMG = "/media/services/";
type Photo = { src: string; w: number; h: number; alt: string; mobile?: [string, number, number] };
export const IMAGES: Record<string, Photo> = {
  "STRAT-01": { src: IMG + "strategy-hero-desktop.webp", w: 1672, h: 941, alt: "", mobile: [IMG + "strategy-hero-mobile.webp", 1122, 1402] },
  "GOV-01": { src: IMG + "governance-hero-desktop.webp", w: 1672, h: 941, alt: "", mobile: [IMG + "governance-hero-mobile.webp", 1122, 1402] },
  "PEOPLE-01": { src: IMG + "human-capital-hero.webp", w: 1182, h: 1330, alt: "Illustration of colleagues discussing responsibilities and ways of working." },
  "PEOPLE-02": { src: IMG + "human-capital-editorial.webp", w: 1448, h: 1086, alt: "Illustration of two colleagues reviewing responsibilities at a table." },
  "OPS-01": { src: IMG + "operations-hero-desktop.webp", w: 1672, h: 941, alt: "", mobile: [IMG + "operations-hero-mobile.webp", 1122, 1402] },
  "GROW-01": { src: IMG + "growth-hero-desktop.webp", w: 1672, h: 941, alt: "", mobile: [IMG + "growth-hero-mobile.webp", 1122, 1402] },
  "GROW-02": { src: IMG + "growth-editorial.webp", w: 1448, h: 1086, alt: "Illustration of two commercial professionals evaluating unbranded product samples." },
  "DEAL-01": { src: IMG + "negotiation-hero.webp", w: 1182, h: 1330, alt: "Illustration of professional teams in a negotiation discussion." },
  "RES-01": { src: IMG + "research-hero.webp", w: 1182, h: 1330, alt: "Illustration of analysts reviewing research materials." },
  "CLOSE-01": { src: IMG + "liquidation-hero.webp", w: 1182, h: 1330, alt: "Illustration of neatly organized document folders on an executive desk." },
  "CLOSE-02": { src: IMG + "liquidation-editorial.webp", w: 1448, h: 1086, alt: "Illustration of two professionals reviewing paperwork at a meeting table." },
};

/** The supplied photograph for an asset slot, or the labelled placeholder when none has been supplied. */
export function AssetSlot({ slot, cls = "" }: { slot: [string, string, string]; cls?: string }) {
  const [id, kind, brief] = slot;
  const im = IMAGES[id];
  if (!im)
    return (
      <div className={`sx-slot ${cls}`} role="img" aria-label={`Image placeholder ${id}`}>
        <span className="sx-slot-id">{id} · image pending</span>
        <span className="sx-slot-k">{kind}</span>
        <span className="sx-slot-b">{brief}</span>
      </div>
    );
  const hero = cls.includes("hero");
  const img = (
    <img
      className={`sx-photo ${cls}`}
      src={im.src}
      alt={im.alt}
      width={im.w}
      height={im.h}
      {...(hero ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
    />
  );
  if (!im.mobile) return img;
  return (
    <picture className="sx-pic">
      <source media="(max-width: 767px)" srcSet={im.mobile[0]} width={im.mobile[1]} height={im.mobile[2]} />
      {img}
    </picture>
  );
}
export const hasPhoto = (slot?: [string, string, string]) => !!slot && slot[0] in IMAGES;

/* ------------------------------------------------------------------ interactions */
/** A button that shows or hides a panel (prototype `data-disclose`). */
export function useDisclosure(initial = false) {
  const [open, setOpen] = useState(initial);
  return { open, toggle: () => setOpen((o) => !o), button: { "aria-expanded": open, onClick: () => setOpen((o) => !o) } };
}

/** Tabs with arrow, Home and End keys. Returns the selected index and props for each tab. */
export function useTabs(count: number) {
  const [sel, setSel] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabProps = (i: number) => ({
    role: "tab" as const,
    "aria-selected": sel === i,
    tabIndex: sel === i ? 0 : -1,
    ref: (el: HTMLButtonElement | null) => {
      refs.current[i] = el;
    },
    onClick: () => setSel(i),
    onKeyDown: (e: KeyboardEvent) => {
      const last = count - 1;
      let n: number | null = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") n = i === last ? 0 : i + 1;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = i === 0 ? last : i - 1;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = last;
      if (n !== null) {
        e.preventDefault();
        setSel(n);
        refs.current[n]?.focus();
      }
    },
  });
  return { sel, tabProps };
}

/* ------------------------------------------------------------------ shared sections */
export const Faqs = ({ items }: { items: [string, string][] }) => (
  <div className="sx-faq">
    {items.map(([q, a]) => (
      <details key={q}>
        <summary>{q}</summary>
        <p>{a}</p>
      </details>
    ))}
  </div>
);

export function FaqRelated({ d, hid }: { d: any; hid: string }) {
  const rel: [string, string][] = d.related;
  return (
    <>
      <h2 id={hid} className="sx-h2">
        {d.faqs_title}
      </h2>
      <Faqs items={d.faqs} />
      <nav className="gv-related" aria-labelledby={`${hid}-rel`}>
        <h2 id={`${hid}-rel`}>Related service{rel.length > 1 ? "s" : ""}</h2>
        <ul>
          {rel.map(([t, href]) => (
            <li key={href}>
              <SiteLink className="sx-link" href={href}>
                {t}
              </SiteLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

const personPhoto = (slug: string) => `/media/people/${PEOPLE[slug].photo}`;

export function ExpertsBlock({ x, hid, logoAlt = false }: { x: any; hid: string; logoAlt?: boolean }) {
  const pt = x.partner;
  const [lsrc, lw, lh] = pt.logo as [string, number, number];
  return (
    <>
      <div className="sx-head-row">
        <div>
          <h2 id={hid} className="sx-h2">
            {x.title}
          </h2>
          <p className="gv-body">{x.intro}</p>
        </div>
        <SiteLink className="sx-link" href="/about#experts">
          Meet our experts
        </SiteLink>
      </div>
      <ul className="gv-people">
        {(x.people as [string, string][]).map(([slug, role]) => (
          <li className="gv-person" key={slug}>
            <img src={personPhoto(slug)} alt="" width={400} height={400} loading="lazy" />
            <div>
              <h3>{PEOPLE[slug].name}</h3>
              <p>{role}</p>
            </div>
          </li>
        ))}
      </ul>
      {logoAlt ? (
        // Governance keeps the logo as a plain image named by its alt text.
        <div className="gv-partner">
          <img src={lsrc} alt={pt.name} width={lw} height={lh} loading="lazy" />
          <div>
            <h3>{pt.title}</h3>
            <p>{pt.text}</p>
          </div>
        </div>
      ) : (
        <div className={"gv-partner" + (Math.abs(lw - lh) <= lw * 0.2 ? " gv-partner-mark" : "")}>
          <span className="gv-plogo">
            <img src={lsrc} alt="" width={lw} height={lh} loading="lazy" />
            <span>{pt.name}</span>
          </span>
          <div>
            <h3>{pt.title}</h3>
            <p>{pt.text}</p>
          </div>
        </div>
      )}
    </>
  );
}

export function PartnerStrip({ pt }: { pt: any }) {
  const [lsrc, lw, lh] = pt.logo as [string, number, number];
  return (
    <div className="gv-partner">
      <img src={lsrc} alt={pt.name} width={lw} height={lh} loading="lazy" />
      <div>
        <h3>{pt.title}</h3>
        <p>{pt.text}</p>
      </div>
    </div>
  );
}

export function AdvisorBlock({ ad, hid }: { ad: any; hid: string }) {
  const p = PEOPLE[ad.person];
  return (
    <div className="op-adv">
      <img src={personPhoto(ad.person)} alt="" width={400} height={400} loading="lazy" />
      <div>
        <h2 id={hid} className="sx-h2">
          {ad.title}
        </h2>
        <p className="op-adv-name">
          <strong>{p.name}</strong>
          <span>{ad.role}</span>
        </p>
        <p className="gv-body">{ad.text}</p>
        <SiteLink className="sx-link" href="/about#experts">
          Meet our experts
        </SiteLink>
      </div>
    </div>
  );
}

/** Draft engagement summary; unapproved cases carry a visible "not for publication" banner. */
export function CaseBlock({ c, hid, extraClass = "" }: { c: any; hid: string; extraClass?: string }) {
  const [src, w, h] = c.img as [string, number, number];
  return (
    <div className={`sx-wrap pp-case${extraClass}`}>
      <figure className="pp-case-img">
        <img src={src} alt="" width={w} height={h} loading="lazy" decoding="async" />
        <figcaption>Illustrative photograph. It does not show the client.</figcaption>
      </figure>
      <div className="pp-case-copy">
        {!c.approved && (
          <p className="pp-gate">
            <strong>Draft · not for publication</strong>
            {c.gate}
          </p>
        )}
        <span className="pp-eyebrow">{c.eyebrow}</span>
        <h2 id={hid} className="sx-h2">
          {c.title}
        </h2>
        <dl className="pp-dl">
          {(c.rows as [string, string][]).map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ heroes */
function HeroCtas({ anchor, light }: { anchor: [string, string]; light?: boolean }) {
  const [text, id] = anchor;
  return (
    <div className="gv-ctas">
      <a className={light ? "btn btn-navy" : "btn btn-blue"} href="#contact">
        <span className="cta-label">Discuss your challenge</span>
      </a>
      <a className={light ? "pp-anchor" : "gv-anchor"} href={`#${id}`}>
        {text}
      </a>
    </div>
  );
}

/** Navy hero with a full-bleed photograph (Governance, Operations, Growth, About). */
export function DarkHero({ h, crumbs, extraClass = "" }: { h: any; crumbs: ReactNode; extraClass?: string }) {
  let media: ReactNode;
  if (h.image) {
    const [src, w, ht] = h.image as [string, number, number];
    media = <img className="ab-hero-img" src={src} alt="" width={w} height={ht} fetchPriority="high" />;
  } else media = <AssetSlot slot={h.slot} cls="gv-hero-slot" />;
  const has = !!h.image || hasPhoto(h.slot);
  return (
    <section className={`page-hero sx-hero gv-hero${extraClass} dark${has ? " has-photo" : ""}`} aria-labelledby="page-title">
      {media}
      <div className="sx-wrap gv-hero-in">
        <div className="gv-hero-copy">
          {crumbs}
          <span className="sx-eyebrow">{h.label}</span>
          <h1 id="page-title">{h.title}</h1>
          <p className="sx-lede">{h.intro}</p>
          <HeroCtas anchor={h.anchor} />
        </div>
      </div>
    </section>
  );
}

/** Warm split hero with the photograph on the right (HR, Negotiation, Liquidation). */
export function LightHero({ h, crumbs, title }: { h: any; crumbs: ReactNode; title?: ReactNode }) {
  return (
    <section className="pp-hero" aria-labelledby="page-title">
      <div className="pp-hero-copy">
        {crumbs}
        <span className="pp-eyebrow">{h.label}</span>
        <h1 id="page-title">{title ?? h.title}</h1>
        <p className="pp-lede">{h.intro}</p>
        <HeroCtas anchor={h.anchor} light />
      </div>
      <AssetSlot slot={h.slot} cls="pp-hero-slot" />
    </section>
  );
}

/* ------------------------------------------------------------------ Strategy page diagrams (conceptual, no values) */
export function stageVisual(kind: string, uid: string): string {
  const head = `<svg class="sx-dia" viewBox="0 0 600 440" role="img" aria-labelledby="${uid}-t">`;
  let body = "";
  if (kind === "matrix") {
    const cells: [string, number, number][] = [["Business direction", 40, 40], ["People", 310, 40], ["Operations", 40, 230], ["Performance", 310, 230]];
    for (const [t, x, y] of cells) {
      body += `<rect class="d-cell" x="${x}" y="${y}" width="250" height="170"/><text class="d-lab" x="${x + 20}" y="${y + (y < 100 ? 34 : 150)}">${t}</text>`;
      for (const [oy, w] of [[0, 150], [20, 190], [40, 120]]) body += `<rect class="d-line" x="${x + 20}" y="${y + oy + (y < 100 ? 58 : 40)}" width="${w}" height="8"/>`;
    }
    body += '<rect class="d-core" x="225" y="176" width="150" height="88"/><text class="d-coret" x="300" y="215" text-anchor="middle">Priority</text><text class="d-coret" x="300" y="241" text-anchor="middle">issues</text>';
    return head + `<title id="${uid}-t">Diagnostic matrix: business direction, people, operations and performance, converging on priority issues</title>` + body + "</svg>";
  }
  if (kind === "map") {
    body = '<rect class="d-core" x="150" y="30" width="300" height="70"/><text class="d-coret" x="300" y="72" text-anchor="middle">Ambition</text>';
    [40, 220, 400].forEach((x, i) => {
      body += `<path class="d-conn" d="M300 100V128H${x + 80}V160"/>`;
      body += `<rect class="d-cell hi" x="${x}" y="160" width="160" height="64"/><text class="d-lab" x="${x + 80}" y="198" text-anchor="middle">Priority ${i + 1}</text>`;
      for (const ox of [x, x + 84]) {
        body += `<path class="d-conn" d="M${x + 80} 224V256H${ox + 38}V290"/>`;
        body += `<rect class="d-cell" x="${ox}" y="290" width="76" height="110"/><text class="d-sm d-xs" x="${ox + 38}" y="318" text-anchor="middle">Objective</text>`;
        body += `<rect class="d-line" x="${ox + 12}" y="340" width="52" height="7"/><rect class="d-line" x="${ox + 12}" y="356" width="40" height="7"/><rect class="d-line" x="${ox + 12}" y="372" width="48" height="7"/>`;
      }
    });
    return head + `<title id="${uid}-t">Strategy map from ambition to priorities to objectives</title>` + body + "</svg>";
  }
  if (kind === "roadmap") {
    body = '<text class="d-sm" x="40" y="44">Initiative</text>';
    ["Phase 1", "Phase 2", "Phase 3"].forEach((ph, i) => {
      const x = 200 + i * 130;
      body += `<rect class="d-phase" x="${x}" y="26" width="126" height="28"/><text class="d-sm" x="${x + 63}" y="45" text-anchor="middle">${ph}</text><path class="d-grid" d="M${x} 60V400"/>`;
    });
    body += '<path class="d-grid" d="M590 60V400"/>';
    const rows: [string, number, number, string][] = [["Initiative A", 200, 210, "Owner"], ["Initiative B", 260, 220, "Owner"], ["Initiative C", 330, 170, "Owner"], ["Initiative D", 420, 160, "Owner"]];
    rows.forEach(([t, x, w, o], i) => {
      const y = 84 + i * 76;
      body += `<text class="d-lab" x="40" y="${y + 26}">${t}</text><text class="d-sm" x="40" y="${y + 46}">${o}</text>`;
      body += `<rect class="d-bar${i === 1 ? " hi" : ""}" x="${x}" y="${y + 8}" width="${w}" height="30"/>`;
      body += `<path class="d-mile" d="M${x + w} ${y + 12}l11 11-11 11-11-11z"/>`;
    });
    body += '<path class="d-dep" d="M410 115V160H460V176"/>';
    return head + `<title id="${uid}-t">Illustrative roadmap: four initiatives across three phases, with owners, milestones and a dependency</title>` + body + "</svg>";
  }
  const pts: [string, number, number][] = [["Measure", 300, 70], ["Review", 500, 220], ["Decide", 300, 370], ["Act", 100, 220]];
  body = '<circle class="d-ring" cx="300" cy="220" r="150"/>';
  body += '<rect class="d-core" x="210" y="180" width="180" height="80"/><text class="d-coret" x="300" y="216" text-anchor="middle">Review</text><text class="d-coret" x="300" y="242" text-anchor="middle">rhythm</text>';
  for (const [t, x, y] of pts) body += `<rect class="d-cell hi" x="${x - 70}" y="${y - 28}" width="140" height="56"/><text class="d-lab" x="${x}" y="${y + 6}" text-anchor="middle">${t}</text>`;
  for (const d of ["M383 96l14 8-14 8", "M512 300l-6 15-12-10", "M217 344l-14-8 14-8", "M88 140l6-15 12 10"]) body += `<path class="d-arrow" d="${d}"/>`;
  return head + `<title id="${uid}-t">Review cycle: measure, review, decide and act around a review rhythm</title>` + body + "</svg>";
}

export function insightVisual(kind: string): string {
  if (kind === "momentum")
    return `<svg class="sx-ivis" viewBox="0 0 640 400" role="img" aria-labelledby="iv-m"><title id="iv-m">Conceptual chart: momentum rising to an approval point, then fading</title>
<rect width="640" height="400" class="iv-bg"/><path class="iv-grid" d="M60 80H600M60 160H600M60 240H600M60 320H600"/>
<path class="iv-line" d="M60 320C150 300 220 180 300 120"/><path class="iv-fade" d="M300 120C380 140 460 240 600 300"/>
<path class="iv-mark" d="M300 70V340"/><rect class="iv-tag" x="250" y="40" width="100" height="30"/><text class="iv-tagt" x="300" y="60" text-anchor="middle">Approval</text>
<text class="iv-ax" x="60" y="370">Planning</text><text class="iv-ax" x="600" y="370" text-anchor="end">Execution</text></svg>`;
  return `<svg class="sx-ivis" viewBox="0 0 400 300" role="img" aria-labelledby="iv-k"><title id="iv-k">Conceptual scorecard with objectives, measures and owners</title>
<rect width="400" height="300" class="iv-bg"/><rect class="iv-card" x="40" y="40" width="320" height="220"/>
<path class="iv-grid" d="M40 92H360M40 148H360M40 204H360M170 40V260M270 40V260"/>
<text class="iv-ax" x="56" y="72">Objective</text><text class="iv-ax" x="186" y="72">Measure</text><text class="iv-ax" x="286" y="72">Owner</text>
<rect class="iv-cell" x="56" y="112" width="90" height="16"/><rect class="iv-cell" x="186" y="112" width="64" height="16"/><rect class="iv-cell hi" x="286" y="112" width="52" height="16"/>
<rect class="iv-cell" x="56" y="168" width="76" height="16"/><rect class="iv-cell" x="186" y="168" width="70" height="16"/><rect class="iv-cell hi" x="286" y="168" width="52" height="16"/>
<rect class="iv-cell" x="56" y="224" width="96" height="16"/><rect class="iv-cell" x="186" y="224" width="58" height="16"/><rect class="iv-cell hi" x="286" y="224" width="52" height="16"/></svg>`;
}
