import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { guideName, type Guide } from "@shared/guides";

/**
 * One guide as a book on the `/guides` shelf. The overview of a guide is the
 * thick navy volume; each topic page is a narrower spine beside it. A published
 * topic page whose overview is not published stands on its own as a "guide",
 * not as an overview, so the book never claims more than exists.
 *
 * The visible title is the short name; the link's accessible name is the full
 * title, so a screen reader hears what the page is actually called.
 */
export default function GuideBook({
  guide,
  variant,
  position,
}: {
  guide: Guide;
  /** "hub" for an overview or a standalone guide, "topic" for a topic page. */
  variant: "hub" | "topic";
  /** Its place on the shelf, printed as "01", "02"… */
  position: number;
}) {
  const isOverview = variant === "hub" && guide.kind === "hub";
  const label = variant === "topic" ? "Topic page" : isOverview ? "The complete guide" : "Guide";
  const action = variant === "topic" ? "Read topic" : isOverview ? "Read the overview" : "Read the guide";
  const description =
    variant === "topic" ? (guide.shelfDescription ?? guide.summary) : guide.audience;

  // A voice-control user says the words they see, so the accessible name must
  // contain the printed title; it is prefixed where the full title does not.
  const name = guideName(guide);
  const accessibleName = guide.title.toLowerCase().includes(name.toLowerCase())
    ? guide.title
    : `${name}: ${guide.title}`;

  return (
    <Link
      href={`/guides/${guide.slug}`}
      aria-label={accessibleName}
      className={cn("guide-book", variant === "hub" ? "guide-book--hub" : "guide-book--topic")}
    >
      <span className="guide-book-type" aria-hidden="true">
        <span>{label}</span>
        <span>{String(position).padStart(2, "0")}</span>
      </span>
      <span className="guide-book-title">{name}</span>
      {description && <span className="guide-book-description">{description}</span>}
      <span className="guide-book-bottom" aria-hidden="true">
        <span>{action}</span>
        <span className="guide-book-arrow">↗</span>
      </span>
    </Link>
  );
}
