import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "./ServicesShowcase.css";

/**
 * The five services from the founder's brand-identity document, standing in
 * for the site's real service catalogue until it's rebuilt around them.
 * There is no `shared/services.ts` entry or route for any of these yet — see
 * the dialog below — so this data is local to the component on purpose,
 * rather than half-wiring it into the existing (soon to be replaced) service
 * data.
 */
/**
 * `pan` is how far each image slides on hover to reveal what the resting
 * 16:9 crop cuts off — the objects sit slightly above center in their square
 * source canvas, so every one of the five loses some of its top at rest, in
 * varying amounts. Measured by eye against each render (as a % of the
 * image's own height, so it scales with the element rather than a fixed
 * px value): the strategy bars and governance plates keep more headroom in
 * their source frame, so they need less; the growth ribbon runs almost to
 * the top and bottom of its canvas, so it needs the most and still can't
 * show both ends at once — the pan favours revealing its top, which is the
 * more distinctive part of the shape.
 */
const SERVICES = [
  {
    label: "01 / DIRECTION",
    name: "Strategy & Performance",
    description:
      "Set a clear strategic direction and translate priorities into measurable performance.",
    image: "/images/services/01-strategy-performance.png",
    pan: "8%",
  },
  {
    label: "02 / EXCELLENCE",
    name: "Governance & Organizational Excellence",
    description:
      "Strengthen governance, align your organization, and build the foundations for sustained excellence.",
    image: "/images/services/02-governance-excellence.png",
    pan: "6%",
  },
  {
    label: "03 / OPPORTUNITY",
    name: "Growth & Market Expansion",
    description:
      "Identify new opportunities, assess markets, and shape a focused path to sustainable growth.",
    image: "/images/services/03-growth-market-expansion.png",
    pan: "15%",
  },
  {
    label: "04 / TRANSFORMATION",
    name: "Digital & AI Transformation Advisory",
    description:
      "Connect digital and AI ambitions to business value through clear priorities and practical roadmaps.",
    image: "/images/services/04-digital-ai-transformation.png",
    pan: "10%",
  },
  {
    label: "05 / INSIGHT",
    name: "Research & Feasibility",
    description:
      "Make informed decisions with rigorous research, feasibility assessments, and actionable insight.",
    image: "/images/services/05-research-feasibility.png",
    pan: "10%",
  },
] as const;

/**
 * The founder's generated gold/steel-blue renders (square, on a dark
 * background), cropped to the prototype's 16:9 art tile. The image is sized
 * to genuinely extend above and below the frame (not just cropped by
 * `object-fit`), so a hover pan has real content to reveal — see the CSS
 * for why. The frame itself (`.services-showcase-art`, `overflow: hidden`)
 * never moves or resizes; only the image inside it does.
 */
function ServiceArt({ image, pan }: { image: string; pan: string }) {
  return (
    <div className="services-showcase-art" aria-hidden="true">
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ ["--ss-pan" as string]: pan }}
      />
    </div>
  );
}

export function ServicesShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? SERVICES[openIndex] : null;

  // Which card to return focus to on close. Radix's own automatic restore
  // (tracking document.activeElement at open time) didn't reliably land back
  // on the trigger here — likely because these buttons live outside the
  // Dialog's own tree rather than as a <DialogTrigger> — so it's handled
  // explicitly via onCloseAutoFocus instead of assumed to work.
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpenIndex = useRef<number | null>(null);

  const open = (i: number) => {
    lastOpenIndex.current = i;
    setOpenIndex(i);
  };

  return (
    <section aria-labelledby="services-showcase-title" className="services-showcase-section">
      <div className="services-showcase-inner">
        <div className="services-showcase-intro services-showcase-reveal">
          <p className="services-showcase-eyebrow">How we help clients</p>
          <h2 id="services-showcase-title" className="services-showcase-heading">
            Clear direction.
            <br />
            Lasting business impact.
          </h2>
          <p className="services-showcase-lede">
            We help organizations make confident decisions, strengthen performance, and turn
            ambition into meaningful progress.
          </p>
        </div>

        <div className="services-showcase-grid">
          {SERVICES.map((service, i) => (
            <button
              key={service.name}
              ref={(el) => { triggerRefs.current[i] = el; }}
              type="button"
              className="services-showcase-card services-showcase-reveal"
              style={{ ["--ss-delay" as string]: `${(i + 1) * 150}ms` }}
              aria-haspopup="dialog"
              onClick={() => open(i)}
            >
              <ServiceArt image={service.image} pan={service.pan} />
              <span className="services-showcase-meta">{service.label}</span>
              <h3 className="services-showcase-card-title">
                {service.name}
                <span className="services-showcase-arrow" aria-hidden="true">
                  &rsaquo;
                </span>
              </h3>
              <p className="services-showcase-description">{service.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/*
        The prototype's dialog behaviour, kept rather than routed to a
        service page: these five services don't have pages yet (the site's
        current service pages are the six they're replacing). Once the five
        real pages exist, this becomes a <Link> to each one instead.
      */}
      <Dialog open={openIndex !== null} onOpenChange={(next) => !next && setOpenIndex(null)}>
        <DialogContent
          className="bg-[#f4f1e9] text-[#071e2a] sm:max-w-[620px]"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            const i = lastOpenIndex.current;
            if (i !== null) triggerRefs.current[i]?.focus();
          }}
        >
          <DialogHeader>
            <p className="text-xs font-bold uppercase tracking-[0.19em] text-[#ba9256]">
              How we help clients
            </p>
            <DialogTitle className="font-heading text-h3 font-bold">
              {active?.name}
            </DialogTitle>
            <DialogDescription className="text-[#071e2a]/80 text-base leading-relaxed">
              {active?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
