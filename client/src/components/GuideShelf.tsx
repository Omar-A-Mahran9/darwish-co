import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { guideName, type GuideGroup } from "@shared/guides";
import GuideBook from "./GuideBook";
import "./GuideShelf.css";

/**
 * True while the element's content is wider than the element, so the "scroll
 * to explore" hint appears only when there is something to scroll to. It stays
 * false in the prerendered HTML, which has no layout to measure.
 */
function useOverflowsX<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => setOverflows(element.scrollWidth > element.clientWidth + 1);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, overflows] as const;
}

/**
 * One guide on its own shelf: the overview standing first, then every
 * published topic page beside it. On a narrow screen the overview sits above
 * and the topic pages scroll sideways in a strip of their own, so the page
 * itself never scrolls sideways.
 */
export default function GuideShelf({ group, position }: { group: GuideGroup; position: number }) {
  const [topicsRef, overflows] = useOverflowsX<HTMLUListElement>();
  const name = guideName(group.hub);
  const headingId = `shelf-${group.hub.slug}`;
  const count = group.topics.length;
  const isOverview = group.hub.kind === "hub";

  return (
    <section className="guide-shelf" aria-labelledby={headingId}>
      <div className="guide-shelf-head">
        <h2 className="guide-shelf-title" id={headingId}>
          <span className="guide-shelf-number">{String(position).padStart(2, "0")}</span>
          {name}
        </h2>
        {count > 0 && <p>Start with the overview. Go deeper where it matters.</p>}
      </div>

      <div className="guide-shelf-books">
        <GuideBook guide={group.hub} variant="hub" position={position} />

        {count > 0 && (
          <div className="guide-shelf-topics-wrap">
            <div className="guide-shelf-topic-label">
              <span>
                In this guide / {count} topic {count === 1 ? "page" : "pages"}
              </span>
              {overflows && (
                <span className="guide-shelf-scroll-cue" aria-hidden="true">
                  Scroll to explore →
                </span>
              )}
            </div>
            <ul ref={topicsRef} className="guide-shelf-topics" aria-label={`${name}: topic pages`}>
              {group.topics.map((topic, index) => (
                <li key={topic.slug}>
                  <GuideBook guide={topic} variant="topic" position={index + 1} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="guide-shelf-caption">
        <p>{group.hub.summary}</p>
        <Link href={`/guides/${group.hub.slug}`}>
          {isOverview ? "Explore the guide" : "Read the guide"} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
