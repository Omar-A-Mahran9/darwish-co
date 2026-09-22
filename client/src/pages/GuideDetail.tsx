import { Link, useParams } from "wouter";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getGuide, hubGuide, spokesOf, type GuideSection } from "@shared/guides";
import { getService } from "@shared/services";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import NotFound from "./NotFound";

/**
 * Renders the `[text](url)` links the guide text is written with. Nothing else
 * in the text is treated as markup: the paragraphs are plain prose.
 */
function withLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!link) return part;

    return (
      <a
        key={index}
        href={link[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary underline underline-offset-2 hover:no-underline"
      >
        {link[1]}
      </a>
    );
  });
}

/** One block of the guide: prose, then any points or table, then the rest. */
function Section({ section }: { section: GuideSection }) {
  const PointList = section.ordered ? "ol" : "ul";

  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl font-bold text-foreground">{section.heading}</h2>

      {section.note && (
        <p className="border-l-4 border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          {section.note}
        </p>
      )}

      {section.body.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-muted-foreground">
          {withLinks(paragraph)}
        </p>
      ))}

      {section.points && (
        <PointList
          className={cn(
            "space-y-3 pl-5 text-muted-foreground",
            section.ordered ? "list-decimal" : "list-disc",
          )}
        >
          {section.points.map((point) => (
            <li key={point.text} className="leading-relaxed">
              {point.label && (
                <strong className="font-semibold text-foreground">{point.label}:</strong>
              )}{" "}
              {withLinks(point.text)}
            </li>
          ))}
        </PointList>
      )}

      {section.table && (
        // Tables here carry the argument, so they stay readable rather than
        // collapsing: on a narrow screen the table scrolls sideways on its own.
        <div className="overflow-x-auto border border-border lg:-mx-16 lg:w-[calc(100%+8rem)]">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-secondary/40 text-left">
                {section.table.headers.map((header) => (
                  <th
                    key={header}
                    className="border-b border-border p-3 font-heading font-bold text-foreground"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row.join("|")} className="align-top">
                  {row.map((cell, index) => (
                    <td
                      key={cell + index}
                      className={cn(
                        "border-b border-border p-3 leading-relaxed text-muted-foreground",
                        index === 0 && "font-semibold text-foreground",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.after?.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-muted-foreground">
          {withLinks(paragraph)}
        </p>
      ))}
    </section>
  );
}

/**
 * One guide — the hub, or one of its spokes. The text comes from
 * `shared/guides.ts`, so a guide is published by writing its sections there
 * rather than by adding a page.
 *
 * An unpublished or unknown slug falls through to the not-found page, which is
 * what the server answers for that address too.
 */
export default function GuideDetail() {
  const params = useParams<{ slug: string }>();
  const guide = params.slug ? getGuide(params.slug) : undefined;

  if (!guide) return <NotFound />;

  const hub = guide.kind === "spoke" && guide.hub ? getGuide(guide.hub) : undefined;
  const spokes = guide.kind === "hub" ? spokesOf(guide.slug) : [];
  const siblings =
    guide.kind === "spoke" && guide.hub
      ? spokesOf(guide.hub).filter((entry) => entry.slug !== guide.slug)
      : [];
  const service = guide.relatedService ? getService(guide.relatedService) : undefined;

  return (
    <div className="font-body">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-secondary/20 py-4">
        <div className="container flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/">
            <span className="cursor-pointer hover:text-primary">Home</span>
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          {hub ? (
            <>
              <Link href={`/guides/${hub.slug}`}>
                <span className="cursor-pointer hover:text-primary">{hub.navLabel}</span>
              </Link>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </>
          ) : null}
          <span className="text-foreground">{guide.navLabel}</span>
        </div>
      </nav>

      {/* Title */}
      <header className="bg-primary py-16 text-primary-foreground">
        <div className="container max-w-3xl space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">
            {guide.kind === "hub" ? "Guide" : hub ? `Part of ${hub.navLabel}` : "Guide"}
          </span>
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
            {guide.title}
          </h1>
          <p className="text-lg leading-relaxed text-primary-foreground/85">{guide.summary}</p>
          {guide.artefact && (
            <p className="border-l-4 border-primary-foreground/40 pl-4 text-sm text-primary-foreground/85">
              <strong className="font-semibold">What you leave with:</strong> {guide.artefact}
            </p>
          )}
        </div>
      </header>

      {/* The guide itself */}
      <article className="py-16">
        <div className="container max-w-3xl space-y-12">
          {guide.intro && (
            <div className="space-y-4">
              {guide.intro.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-foreground">
                  {withLinks(paragraph)}
                </p>
              ))}
            </div>
          )}

          {guide.sections?.map((section) => (
            <Section key={section.heading} section={section} />
          ))}

          {guide.faqs && guide.faqs.length > 0 && (
            <section className="space-y-6 border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-bold text-foreground">Common questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {guide.faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left font-heading font-bold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}
        </div>
      </article>

      {/* Where to go next: the rest of the cluster, then the service it belongs to */}
      {(spokes.length > 0 || siblings.length > 0) && (
        <section className="border-t border-border bg-secondary/20 py-16">
          <div className="container max-w-3xl space-y-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {guide.kind === "hub" ? "In this guide" : "Also in this guide"}
            </h2>
            <ul className="space-y-5">
              {(spokes.length > 0 ? spokes : siblings).map((entry) => (
                <li key={entry.slug}>
                  <Link href={`/guides/${entry.slug}`}>
                    <span className="group block cursor-pointer space-y-1">
                      <span className="block font-heading text-lg font-bold text-foreground group-hover:underline">
                        {entry.title}
                      </span>
                      <span className="block leading-relaxed text-muted-foreground">
                        {entry.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {hub && (
              <Link href={`/guides/${hub.slug}`}>
                <span className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-primary hover:underline">
                  <ArrowLeft className="h-4 w-4" /> Back to {hub.navLabel}
                </span>
              </Link>
            )}
          </div>
        </section>
      )}

      {service && (
        <section className="bg-foreground py-16 text-white">
          <div className="container max-w-3xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              The work behind this
            </span>
            <h2 className="font-heading text-2xl font-bold">{service.name}</h2>
            <p className="leading-relaxed text-white/70">{service.tagline}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href={`/services/${service.slug}`}>
                <Button variant="secondary">
                  What this service covers <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Book a consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/**
 * `/guides` — an index of the published guides. It only earns its place once
 * there is more than one; until then the menu names the single guide and this
 * address is not offered.
 */
export function GuideIndex() {
  const hub = hubGuide();
  if (!hub) return <NotFound />;

  const spokes = spokesOf(hub.slug);

  return (
    <div className="font-body">
      <header className="bg-primary py-16 text-primary-foreground">
        <div className="container max-w-3xl space-y-4">
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">Guides</h1>
          <p className="text-lg leading-relaxed text-primary-foreground/85">
            Practical guides for owners and managing directors, written around the decisions
            that bring companies to us.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container max-w-3xl space-y-10">
          {[hub, ...spokes].map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`}>
              <article className="group cursor-pointer space-y-2 border-t-4 border-primary bg-secondary/20 p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {guide.kind === "hub" ? "The guide" : "Part of the guide"}
                </span>
                <h2 className="font-heading text-xl font-bold text-foreground group-hover:underline">
                  {guide.title}
                </h2>
                <p className="leading-relaxed text-muted-foreground">{guide.summary}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
