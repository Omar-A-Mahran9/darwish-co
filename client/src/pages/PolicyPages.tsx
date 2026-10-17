/** Privacy policy and Integrity commitments: placeholder pages until the approved text arrives (ported from build_site.py). */
import { Fragment } from "react";
import { CtaBand, PageHero, SampleTag } from "@/site/blocks";
import { ROUTES } from "@/site/nav";

const sample = (
  <p>
    <SampleTag />
  </p>
);

/** Headings show the intended structure; each section reads "[Policy text pending approval]" until the text is approved. */
function PendingProse({ intro, headings }: { intro: string; headings: string[] }) {
  return (
    <div className="prose">
      <p className="pending-text">{intro}</p>
      {headings.map((h) => (
        <Fragment key={h}>
          <h2>{h}</h2>
          <p className="pending-text">[Policy text pending approval]</p>
        </Fragment>
      ))}
    </div>
  );
}

export function Privacy() {
  // The pending-approval notes were removed for launch (17 Oct 2026); the policy text is added here once approved.
  return (
    <PageHero
      title="Privacy policy"
      crumbs={[
        ["Home", "/"],
        ["Privacy policy", null],
      ]}
    />
  );
}

export function Integrity() {
  return (
    <>
      <PageHero
        pill="About us"
        title="Integrity commitments"
        sub="How we protect independence, confidentiality and trust in every engagement."
        crumbs={[
          ["Home", "/"],
          ["About us", ROUTES.about],
          ["Integrity commitments", null],
        ]}
        extra={sample}
      />
      <section className="band white" aria-label="Commitments">
        <div className="wrap">
          <PendingProse
            intro="The approved policy text will replace this page. The headings below show the intended structure only."
            headings={["Independence and objectivity", "Confidentiality of client information", "Conflicts of interest", "Partner and supplier conduct"]}
          />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
