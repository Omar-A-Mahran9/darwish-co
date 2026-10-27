/**
 * Contact page (redesigned 27 Oct 2026): quick contact actions in the hero, the Zoho form beside the
 * direct contacts, what happens after sending, the office map and the homepage FAQ. Office hours are left
 * out until they are confirmed.
 */
import type { ReactNode } from "react";
import { Link } from "wouter";
import { PageHero } from "@/site/blocks";
import { FAQS } from "@/site/content/faqs";
import { CONTACT, ROUTES, SOCIALS } from "@/site/nav";
import ZohoForm from "@/site/ZohoForm";

const OFFICE = "Office T-10, 3rd Floor, RIO Mall, Dr. Ahmed Okasha St., off Sadat Axis, New Cairo, Cairo Governorate, Egypt";
// The search Google resolves to the mall itself (Rio Mall, Ahmed Okasha St., New Cairo); the full street address only centres the area.
const MAP_QUERY = encodeURIComponent("RIO Mall, New Cairo, Egypt");
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&z=16&output=embed`;

const icon = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {d}
  </svg>
);
const MAIL = icon(
  <>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </>,
);
const PHONE = icon(<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />);
const PIN = icon(
  <>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </>,
);

/** What happens after sending, in the site's own words (contact section, homepage FAQ, hero line). */
const STEPS: [string, string][] = [
  ["Share a brief overview", "Tell us the decision, performance issue or growth question in front of you."],
  ["Our team reviews it", "We begin by understanding your business challenge and priorities to identify the appropriate advisory scope."],
  ["We agree the next step", "We contact you to agree on a practical next step."],
];

export default function ContactPage() {
  return (
    <div className="ct-page">
      <PageHero
        pill="Let’s talk"
        title={
          <>
            Discuss your <span className="acc">business challenge</span>
          </>
        }
        sub="Share a brief overview of your challenge. Our team will review it and contact you to agree on the next step."
        crumbs={[
          ["Home", "/"],
          ["Contact", null],
        ]}
        extra={
          <div className="btns ct-quick">
            <a className="btn btn-blue" href={`mailto:${CONTACT.email}`}>
              <span className="cta-label">Email us</span>
            </a>
            <a className="btn btn-ghost" href={CONTACT.phoneHref}>
              <span className="cta-label">Call {CONTACT.phone}</span>
            </a>
            <a className="btn btn-ghost" href={DIRECTIONS} target="_blank" rel="noopener noreferrer">
              <span className="cta-label">Get directions</span>
            </a>
          </div>
        }
      />

      <section className="band ct-main" id="contact" aria-labelledby="ct-form-h">
        <div className="wrap ct-grid">
          <div className="ct-form">
            <h2 id="ct-form-h" className="sr-only">
              Send us your challenge
            </h2>
            <ZohoForm />
            <p className="ct-privacy">
              We use these details only to respond to your enquiry. See our <Link href={ROUTES.privacy}>privacy policy</Link>.
            </p>
          </div>

          <aside className="ct-direct" aria-labelledby="ct-direct-h">
            <h2 id="ct-direct-h">Talk to us directly</h2>
            <p className="ct-direct-lead">Prefer email or a call? Reach the team directly.</p>
            <ul className="ct-list">
              <li>
                <span className="ct-ico">{MAIL}</span>
                <div>
                  <span className="ct-k">Email</span>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </div>
              </li>
              <li>
                <span className="ct-ico">{PHONE}</span>
                <div>
                  <span className="ct-k">Phone</span>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </div>
              </li>
              <li>
                <span className="ct-ico">{PIN}</span>
                <div>
                  <span className="ct-k">Office</span>
                  <address>{OFFICE}</address>
                  <a className="ct-dir" href={DIRECTIONS} target="_blank" rel="noopener noreferrer">
                    Get directions <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </a>
                </div>
              </li>
            </ul>
            <div className="ct-social">
              <span className="ct-k">Follow us</span>
              <ul className="socials" aria-label="Darwish & Co. on social media">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Darwish & Co. on ${s.name} (opens in a new tab)`}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        {s.name === "Instagram" ? (
                          <>
                            <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="17.3" cy="6.7" r="1.2" />
                          </>
                        ) : (
                          <path d={s.path} />
                        )}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="band white ct-steps-band" aria-labelledby="ct-steps-h">
        <div className="wrap">
          <h2 id="ct-steps-h">What happens next</h2>
          <ol className="ct-steps">
            {STEPS.map(([t, d], i) => (
              <li key={t}>
                <span className="ct-step-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ct-map" aria-labelledby="ct-map-h">
        <iframe className="ct-map-frame" src={MAP_EMBED} title="Map: Darwish & Co. office at RIO Mall, New Cairo" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="wrap ct-map-wrap">
          <div className="ct-map-card">
            <h2 id="ct-map-h">Visit our office</h2>
            <address>{OFFICE}</address>
            <a className="btn btn-navy" href={DIRECTIONS} target="_blank" rel="noopener noreferrer">
              <span className="cta-label">Get directions</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--white)" }} aria-labelledby="ct-fq-h">
        <div className="wrap faq-grid">
          <h2 id="ct-fq-h">Before you write</h2>
          <div className="faqs">
            {FAQS.slice(0, 3).map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
