/** Privacy policy, Integrity commitments and Growth 360: placeholder pages until the approved text arrives (ported from build_site.py). */
import { Fragment } from "react";
import { CtaBand, InfoIcon, PageHero, SampleTag } from "@/site/blocks";
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
  return (
    <>
      <PageHero
        title="Privacy policy"
        crumbs={[
          ["Home", "/"],
          ["Privacy policy", null],
        ]}
        extra={sample}
      />
      <section className="band white" aria-label="Policy">
        <div className="wrap">
          <PendingProse
            intro="The approved privacy policy will replace this page. The headings show the intended structure only."
            headings={["Information we collect", "How we use it", "How long we keep it", "Your rights and how to contact us"]}
          />
        </div>
      </section>
    </>
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

export function Growth360() {
  return (
    <>
      <PageHero
        pill="Growth 360"
        title={
          <>
            Growth <span className="acc">360</span>
          </>
        }
        sub="From business diagnosis to integrated growth execution."
        crumbs={[
          ["Home", "/"],
          ["Growth 360", null],
        ]}
        extra={sample}
      />
      <section className="band white" aria-label="Status">
        <div className="wrap">
          <div className="notice" style={{ margin: 0 }}>
            <InfoIcon />
            <p>This page’s format is being agreed between Darwish &amp; Co. and Growthino: a standalone joint product page, or no separate page. Content will be added once that decision is made.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
