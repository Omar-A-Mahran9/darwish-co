import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { LEGACY_ANCHOR_REDIRECTS } from "@shared/site";
import { CtaBand, PageHero } from "@/site/blocks";
import { CHALLENGES, SERVICES } from "@/site/content/site";
import { serviceHref } from "@/site/nav";

/** Services overview: the eight practices grouped by the four decisions leaders face. */
export default function Services() {
  const [, navigate] = useLocation();
  // Links to the original one-page services list (/services#grc) go to the page that replaced the section.
  useEffect(() => {
    const moved = LEGACY_ANCHOR_REDIRECTS[window.location.hash.slice(1)];
    if (moved) navigate(moved, { replace: true });
  }, [navigate]);

  return (
    <>
      <PageHero
        pill="Our services"
        title={
          <>
            Eight practices. <span className="acc">Four decisions you face.</span>
          </>
        }
        sub="Our consulting interventions are designed around the business result that needs to change, not around disconnected service activity."
        crumbs={[
          ["Home", "/"],
          ["Services", null],
        ]}
      />
      {(CHALLENGES as [string, string, [string, string][]][]).map(([name, line, pairs], i) => (
        <section className={"band" + (i % 2 === 0 ? " white" : "")} aria-label={name} key={name}>
          <div className="wrap cols">
            <div className="band-head" style={{ margin: 0 }}>
              <h2>{name}</h2>
              <p>{line}</p>
              <ul className="ticks" style={{ marginTop: 8 }}>
                {pairs.map(([a, b]) => (
                  <li key={a}>
                    {a} → {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cgrid c2">
              {SERVICES.filter((s) => s.decision === name).map((s) => (
                <Link className="tile" href={serviceHref(s.slug)} key={s.slug}>
                  <span className="k">{s.decision}</span>
                  <h3>{s.title}</h3>
                  <p>{s.promise}</p>
                  <span className="go">Explore the service →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
