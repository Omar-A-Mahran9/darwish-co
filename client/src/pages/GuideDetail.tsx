import { Link, useParams } from "wouter";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  getGuide,
  groupOf,
  guideGroups,
  guideName,
  guideSizeLabel,
  readingMinutes,
  type GuideBlock,
  type GuidePoint,
  type GuideSection,
} from "@shared/guides";
import GuideNav from "@/components/GuideNav";
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

/** A list of points, bulleted or numbered, each optionally with sub-points. */
function PointList({ items, ordered }: { items: GuidePoint[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";

  return (
    <List
      className={cn(
        "space-y-3 pl-5 text-muted-foreground",
        ordered ? "list-decimal" : "list-disc",
      )}
    >
      {items.map((item) => (
        <li key={item.text} className="leading-relaxed">
          {item.label && <strong className="font-semibold text-foreground">{item.label}:</strong>}{" "}
          {withLinks(item.text)}
          {item.sub && (
            <ul className="mt-2 space-y-1.5 pl-5 list-[circle]">
              {item.sub.map((line) => (
                <li key={line} className="leading-relaxed">
                  {withLinks(line)}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </List>
  );
}

/** One ordered block of a section. */
function Block({ block, heading }: { block: GuideBlock; heading: string }) {
  if (block.kind === "paragraph") {
    return <p className="leading-relaxed text-muted-foreground">{withLinks(block.text)}</p>;
  }

  if (block.kind === "note") {
    return (
      <p className="border-l-4 border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        {withLinks(block.text)}
      </p>
    );
  }

  if (block.kind === "points") {
    return <PointList items={block.items} ordered={block.ordered} />;
  }

  if (block.kind === "table") {
    return <DataTable table={block} heading={heading} />;
  }

  return (
    <aside className="space-y-4 border border-border bg-secondary/20 p-6">
      {block.title && (
        <h3 className="font-heading text-lg font-bold text-foreground">{block.title}</h3>
      )}
      {block.note && (
        <p className="border-l-4 border-primary/40 bg-white/60 px-4 py-3 text-sm text-muted-foreground">
          {withLinks(block.note)}
        </p>
      )}
      {block.intro?.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-muted-foreground">
          {withLinks(paragraph)}
        </p>
      ))}
      {block.items && <PointList items={block.items} ordered={block.ordered} />}
    </aside>
  );
}

/**
 * A table of rows compared column by column, rendered twice: as a table from md
 * up, and as one labelled block per row below that — a wide table on a phone is
 * either unreadable or a long sideways scroll. It stays inside its column,
 * because a guide page has a navigation column beside it.
 */
function DataTable({
  table,
  heading,
}: {
  table: { headers: string[]; rows: string[][] };
  heading: string;
}) {
  const wide = table.headers.length >= 5;

  return (
    <>
      <div className="hidden overflow-x-auto border border-border md:block">
        <table
          className={cn("w-full border-collapse text-sm", wide ? "min-w-[860px]" : "min-w-[640px]")}
        >
          <caption className="sr-only">{heading}</caption>
          <thead>
            <tr className="bg-secondary/40 text-left">
              {table.headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="border-b border-border p-3 font-heading font-bold text-foreground"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join("|")} className="align-top">
                {row.map((cell, index) => (
                  <td
                    key={cell + index}
                    className={cn(
                      "whitespace-pre-line border-b border-border p-3 leading-relaxed text-muted-foreground",
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

      <ul className="space-y-4 md:hidden">
        {table.rows.map((row) => (
          <li key={row.join("|")} className="border-t-4 border-primary bg-secondary/20 p-5">
            <p className="font-heading text-base font-bold text-foreground">{row[0]}</p>
            <dl className="mt-3 space-y-3">
              {row.slice(1).map((cell, index) => (
                <div key={cell + index}>
                  <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {table.headers[index + 1]}
                  </dt>
                  <dd className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground">
                    {cell}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

/** One section of the guide: its heading, then its content in order. */
function Section({ section }: { section: GuideSection }) {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl font-bold text-foreground">{section.heading}</h2>

      {section.note && (
        <p className="border-l-4 border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          {section.note}
        </p>
      )}

      {section.body?.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-muted-foreground">
          {withLinks(paragraph)}
        </p>
      ))}

      {section.points && <PointList items={section.points} ordered={section.ordered} />}

      {section.table && <DataTable table={section.table} heading={section.heading} />}

      {section.after?.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-muted-foreground">
          {withLinks(paragraph)}
        </p>
      ))}

      {section.blocks?.map((block, index) => (
        <Block key={index} block={block} heading={section.heading} />
      ))}
    </section>
  );
}


export default function GuideDetail() {
  const params = useParams<{ slug: string }>();
  const guide = params.slug ? getGuide(params.slug) : undefined;

  if (!guide) return <NotFound />;

  // Everything about a guide's place in the set comes from its group, so the
  // breadcrumb, the navigation and the footer links cannot disagree.
  const group = groupOf(guide.slug);
  const hub = group && group.hub.slug !== guide.slug ? group.hub : undefined;
  const siblings = group ? group.topics.filter((topic) => topic.slug !== guide.slug) : [];

  /**
   * The promotional block at the foot of a guide is withheld until the service
   * it promotes carries a named delivery lead. Without one, the service page
   * itself still shows a "needs delivery lead" notice, and a guide should not
   * send a reader to buy something the site has not yet evidenced. This is a
   * hold pending confirmation, not a statement that the service does not exist.
   */
  const relatedService = guide.relatedService ? getService(guide.relatedService) : undefined;
  const service = relatedService?.deliveryLead ? relatedService : undefined;

  return (
    <div className="font-body">
      {/* Breadcrumb: Home › Guides › this guide › this page */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-secondary/20 py-4">
        <ol className="container flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Link href="/">
              <span className="cursor-pointer hover:text-primary hover:underline">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </li>
          <li className="flex items-center gap-2">
            <Link href="/guides">
              <span className="cursor-pointer hover:text-primary hover:underline">Guides</span>
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </li>
          {hub && (
            <li className="flex items-center gap-2">
              <Link href={`/guides/${hub.slug}`}>
                <span className="cursor-pointer hover:text-primary hover:underline">
                  {guideName(hub)}
                </span>
              </Link>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </li>
          )}
          <li aria-current="page" className="text-foreground">
            {hub ? guide.navLabel : guideName(guide)}
          </li>
        </ol>
      </nav>

      {/* Title */}
      <header className="bg-primary py-16 text-primary-foreground">
        <div className="container max-w-3xl space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">
            {guide.kind === "hub" ? "Guide" : hub ? `Part of ${guideName(hub)}` : "Guide"}
          </span>
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
            {guide.title}
          </h1>
          <p className="text-lg leading-relaxed text-primary-foreground/85">{guide.summary}</p>
          {/* Counted from the text itself, and the byline appears only where a
              real person has been confirmed for it. */}
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-primary-foreground/70">
            <span>{readingMinutes(guide)} min read</span>
            {guide.author && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {guide.author.name}, {guide.author.role}
                </span>
              </>
            )}
            {guide.reviewedBy && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Reviewed by {guide.reviewedBy.name}, {guide.reviewedBy.role}
                </span>
              </>
            )}
          </p>
          {guide.artefact && (
            <p className="border-l-4 border-primary-foreground/40 pl-4 text-sm text-primary-foreground/85">
              <strong className="font-semibold">What you leave with:</strong> {guide.artefact}
            </p>
          )}
        </div>
      </header>

      {/* The guide itself, with its contents beside it on a wide screen and
          above it on a narrow one. */}
      <div className="py-16">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14">
          <article className="order-2 max-w-3xl space-y-12 lg:order-1">
          {(guide.intro || guide.introPoints) && (
            <div className="space-y-4">
              {guide.intro?.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-foreground">
                  {withLinks(paragraph)}
                </p>
              ))}
              {guide.introPoints && <PointList items={guide.introPoints} />}
              {guide.introAfter?.map((paragraph) => (
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
          </article>

          {/* The sticky offset sits on the grid item itself: a stretched
              wrapper gives a sticky child nothing to travel within. top-28
              clears the site header, which is sticky and 80px tall. */}
          {group && (
            <div className="order-1 lg:sticky lg:top-28 lg:order-2 lg:self-start">
              <GuideNav group={group} currentSlug={guide.slug} />
            </div>
          )}
        </div>
      </div>

      {/* A way on: the overview, then the other pages of the same guide. */}
      {group && (hub || siblings.length > 0) && (
        <section className="border-t border-border bg-secondary/20 py-16">
          <div className="container max-w-3xl space-y-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {guide.kind === "hub" ? "Start with" : "Continue in this guide"}
            </h2>
            <ul className="space-y-5">
              {(guide.kind === "hub" ? group.topics : siblings).map((entry) => (
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
                  <ArrowLeft className="h-4 w-4" /> Back to the guide overview
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
 * `/guides` — the library. One card per guide, each showing what it contains,
 * so a reader can tell a guide from a page inside it before clicking. Built
 * from `guideGroups()`, so a new guide or a new topic page needs no layout
 * work here.
 */
export function GuideIndex() {
  const groups = guideGroups();
  if (groups.length === 0) return <NotFound />;

  // At most three topics are listed on a card; a longer guide offers its
  // overview instead of a list that would fill the card.
  const SHOWN = 3;

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
        {/* One guide gets the full width; the grid arrives with the second. */}
        <div
          className={cn(
            "container grid gap-10",
            groups.length > 1 ? "lg:grid-cols-2" : "mx-auto max-w-3xl",
          )}
        >
          {groups.map((group) => {
            const shown = group.topics.slice(0, SHOWN);
            const hidden = group.topics.length - shown.length;

            return (
              <article
                key={group.hub.slug}
                className="flex flex-col border-t-4 border-primary bg-secondary/20"
              >
                <div className="space-y-4 p-8 pb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    {guideSizeLabel(group)}
                  </p>
                  <h2 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-3xl">
                    <Link href={`/guides/${group.hub.slug}`}>
                      <span className="cursor-pointer hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        {guideName(group.hub)}
                      </span>
                    </Link>
                  </h2>
                  {group.hub.audience && (
                    <p className="text-sm font-semibold text-muted-foreground">
                      {group.hub.audience}
                    </p>
                  )}
                  <p className="leading-relaxed text-muted-foreground">{group.hub.summary}</p>
                  <Link href={`/guides/${group.hub.slug}`}>
                    <span className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      Explore guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </div>

                {group.topics.length > 0 && (
                  <div className="border-t border-border bg-white/60 p-8 pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Included in this guide
                    </h3>
                    <ul className="mt-4 divide-y divide-border">
                      {shown.map((topic) => (
                        <li key={topic.slug}>
                          <Link href={`/guides/${topic.slug}`}>
                            <span className="block cursor-pointer py-3 text-sm font-semibold leading-snug text-foreground hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                              {topic.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {hidden > 0 && (
                      <Link href={`/guides/${group.hub.slug}`}>
                        <span className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-primary hover:underline">
                          View all {group.topics.length} pages{" "}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </Link>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
