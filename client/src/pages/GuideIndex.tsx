import { guideGroups } from "@shared/guides";
import GuideShelf from "@/components/GuideShelf";
import NotFound from "./NotFound";

/**
 * `/guides` — the library. Each guide stands on its own shelf, its overview
 * first and every published topic page beside it, so a reader can tell a guide
 * from a page inside it before clicking. Built from `guideGroups()`, so a new
 * guide or a new topic page is a data change, not a layout change.
 */
export default function GuideIndex() {
  const groups = guideGroups();
  if (groups.length === 0) return <NotFound />;

  const topicCount = groups.reduce((total, group) => total + group.topics.length, 0);
  const count = [
    `${groups.length} ${groups.length === 1 ? "guide" : "guides"}`,
    topicCount > 0 && `${topicCount} topic ${topicCount === 1 ? "page" : "pages"}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="font-body">
      <header className="bg-primary py-16 text-primary-foreground">
        <div className="site-container prose-container space-y-4">
          <h1 className="font-heading text-h1 font-bold">Guides</h1>
          <p className="text-lg leading-relaxed text-primary-foreground/85">
            Practical guides for owners and managing directors, written around the decisions
            that bring companies to us.
          </p>
        </div>
      </header>

      <div className="site-container guide-library">
        <div className="guide-library-top">
          <span className="guide-library-eyebrow">Explore the collection</span>
          <span className="guide-library-count">{count}</span>
        </div>
        {groups.map((group, index) => (
          <GuideShelf key={group.hub.slug} group={group} position={index + 1} />
        ))}
      </div>
    </div>
  );
}
