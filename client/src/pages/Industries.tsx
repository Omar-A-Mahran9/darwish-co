import { CtaBand, InfoIcon, PageHero } from "@/site/blocks";
import { INDUSTRIES } from "@/site/content/site";

/** Sectors Darwish & Co. serves across Egypt. */
export default function Industries() {
  return (
    <>
      <PageHero
        pill="Industries"
        title={
          <>
            Industries &amp; markets <span className="acc">we serve</span>
          </>
        }
        sub="Localized strategic impact across Egypt, with selective regional relevance supported by specialized cross-market partnerships."
        crumbs={[
          ["Home", "/"],
          ["Services", "/services"],
          ["Industries", null],
        ]}
      />
      <section className="band white" aria-label="Sectors">
        <div className="wrap">
          <div className="cgrid c3">
            {(INDUSTRIES as [string, string][]).map(([n, t]) => (
              <div className="tile" key={n}>
                <h3>{n}</h3>
                <p>{t}</p>
              </div>
            ))}
          </div>
          <div className="notice">
            <InfoIcon />
            <p>
              We work across government institutions, private-sector enterprises and development stakeholders. Sector assignments are accepted where relevant expertise, evidence and delivery capability can be clearly
              demonstrated.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
