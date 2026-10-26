/** Contact page: the Zoho contact form beside the office details (form since 27 Oct 2026; layout ported from build_site.py). */
import { Link } from "wouter";
import { PageHero } from "@/site/blocks";
import { CONTACT, ROUTES } from "@/site/nav";
import ZohoForm from "@/site/ZohoForm";

export default function ContactPage() {
  return (
    <>
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
      />
      <section className="band white" aria-label="Contact form and details">
        <div className="wrap contact-cols">
          <div className="zf-card zf-light">
            <ZohoForm />
            <p className="cf-privacy">
              We use these details only to respond to your enquiry. See our <Link href={ROUTES.privacy}>privacy policy</Link>.
            </p>
          </div>
          <div className="contact-panel">
            <dl style={{ display: "grid", gap: 18, margin: 0 }}>
              <div>
                <dt>Office</dt>
                <dd>Office T-10, 3rd Floor, RIO Mall, Dr. Ahmed Okasha St., off Sadat Axis, New Cairo, Cairo Governorate, Egypt</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd className="pending-text">[Office hours to be confirmed]</dd>
              </div>
            </dl>
            <div className="map-slot" role="img" aria-label="Placeholder for the office map">
              Office map
              <br />
              (Google Business Profile link to be confirmed)
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
