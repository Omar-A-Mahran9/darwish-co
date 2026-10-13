/** Shared pieces of the simpler inner pages (ported from the page shell in prototype/tools/build_site.py). */
import type { ReactNode } from "react";
import { Link } from "wouter";
import { ROUTES } from "./nav";
import { Crumbs } from "./sx";

/** Navy page hero with breadcrumb, optional pill, title and subtitle. */
export function PageHero({ pill, title, sub, crumbs, extra, className = "" }: { pill?: string; title: ReactNode; sub?: ReactNode; crumbs?: [string, string | null][]; extra?: ReactNode; className?: string }) {
  return (
    <section className={`page-hero dark${className ? " " + className : ""}`} aria-labelledby="page-title">
      <div className="wrap">
        {crumbs && <Crumbs items={crumbs} />}
        {pill && <span className="pill">{pill}</span>}
        <h1 id="page-title">{title}</h1>
        {sub && <p className="sub">{sub}</p>}
        {extra}
      </div>
    </section>
  );
}

/** Closing navy band with one "Discuss your challenge" button. */
export function CtaBand({
  title = "Let’s discuss your next strategic priority.",
  text = "Tell us what your organization is facing. We’ll help you frame the challenge and identify a practical next step.",
  id,
  className = "",
}: {
  title?: string;
  text?: string;
  id?: string;
  className?: string;
}) {
  return (
    <section className={`cta-band${className ? " " + className : ""}`} id={id} aria-labelledby="cta-title">
      <div className="wrap">
        <div>
          <h2 id="cta-title">{title}</h2>
          <p>{text}</p>
        </div>
        <Link className="btn btn-blue" href={ROUTES.contact}>
          <span className="cta-label">Discuss your challenge</span>
        </Link>
      </div>
    </section>
  );
}

export const InfoIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.5" />
  </svg>
);

/** Marks content that is a sample or still pending, so it is never read as final. */
export const SampleTag = ({ children = "Sample content" }: { children?: ReactNode }) => <span className="sample-tag">{children}</span>;
