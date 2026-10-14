import { Link } from "wouter";
import { PageHero } from "@/site/blocks";
import { ROUTES } from "@/site/nav";

/** Shown for any address the site does not have. */
export default function NotFound() {
  return (
    <PageHero
      title={
        <>
          <span className="big-404">404</span>
          <br />
          Page not found
        </>
      }
      sub="The page may have moved, or the address may be mistyped."
      extra={
        <div className="btns" style={{ marginTop: 8 }}>
          <Link className="btn btn-blue" href="/">
            <span className="cta-label">Go to the homepage</span>
          </Link>
          <Link className="btn btn-ghost" href={ROUTES.services}>
            <span className="cta-label">Browse services</span>
          </Link>
        </div>
      }
    />
  );
}
