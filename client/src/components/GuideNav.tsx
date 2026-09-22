import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { guideName, type GuideGroup } from "@shared/guides";
import { ChevronDown } from "lucide-react";

/**
 * The contents of one guide: its overview, then each topic page inside it.
 *
 * Built from the guide group rather than written per page, so adding a topic
 * page adds a navigation entry everywhere it appears. Rendered twice on a guide
 * page — as a sticky sidebar from `lg` up, and as an expandable control above
 * the article below that — because a phone has no room for a persistent column.
 */

type Props = {
  group: GuideGroup;
  /** Slug of the page being read, so it can be marked as current. */
  currentSlug: string;
};

function entriesFor(group: GuideGroup) {
  return [
    { slug: group.hub.slug, label: "Overview" },
    ...group.topics.map((topic) => ({ slug: topic.slug, label: topic.navLabel })),
  ];
}

function EntryLink({
  slug,
  label,
  isCurrent,
  onNavigate,
}: {
  slug: string;
  label: string;
  isCurrent: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link href={`/guides/${slug}`}>
      <span
        // aria-current tells a screen reader which page is being read; the
        // border and weight say the same thing visually.
        aria-current={isCurrent ? "page" : undefined}
        onClick={onNavigate}
        className={cn(
          "block cursor-pointer border-l-2 py-2 pl-4 text-sm leading-snug transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          isCurrent
            ? "border-primary font-bold text-primary"
            : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
        )}
      >
        {label}
      </span>
    </Link>
  );
}

export default function GuideNav({ group, currentSlug }: Props) {
  const [open, setOpen] = useState(false);
  const entries = entriesFor(group);
  const panelId = "guide-contents";

  return (
    <>
      {/* Phone and tablet: a disclosure above the article. */}
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between border border-border bg-secondary/20 px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="font-heading text-sm font-bold text-foreground">
            Guide contents
            <span className="ml-2 font-body text-xs font-normal text-muted-foreground">
              {entries.length} pages
            </span>
          </span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
        <div id={panelId} hidden={!open} className="border border-t-0 border-border p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {guideName(group.hub)}
          </p>
          <nav aria-label="Guide contents">
            {entries.map((entry) => (
              <EntryLink
                key={entry.slug}
                slug={entry.slug}
                label={entry.label}
                isCurrent={entry.slug === currentSlug}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop: a column that follows the reader down the page. The page
          gives this element its sticky position, so it travels with the grid
          row rather than inside a stretched wrapper. */}
      <aside className="hidden lg:block">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">In this guide</p>
          <p className="mt-2 font-heading text-base font-bold leading-snug text-foreground">
            {guideName(group.hub)}
          </p>
          <nav aria-label="Guide contents" className="mt-4">
            {entries.map((entry) => (
              <EntryLink
                key={entry.slug}
                slug={entry.slug}
                label={entry.label}
                isCurrent={entry.slug === currentSlug}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
