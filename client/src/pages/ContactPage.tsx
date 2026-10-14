/** Contact page: the light contact form beside the office details (ported from build_site.py). */
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { PageHero } from "@/site/blocks";
import { CONTACT, ROUTES } from "@/site/nav";

type Key = "name" | "company" | "email" | "challenge";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The prototype asked for "Email or phone"; /api/contact needs an email address to reply to, so this field asks for an email.
const RULES: Record<Key, (v: string) => string> = {
  name: (v) => (v ? "" : "Please enter your name."),
  company: (v) => (v ? "" : "Please enter your company or organization."),
  email: (v) => (!v ? "Please enter your email address." : EMAIL.test(v) ? "" : "Enter an email address like name@company.com."),
  challenge: (v) => (v.length >= 10 ? "" : "Please describe your challenge in a sentence or two."),
};
const ORDER: Key[] = ["name", "company", "email", "challenge"];
const BLANK: Record<Key, string> = { name: "", company: "", email: "", challenge: "" };

type Status = "idle" | "error" | "sending" | "failed";

export default function ContactPage() {
  const [values, setValues] = useState(BLANK);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sent, setSent] = useState(false);
  const refs = useRef<Partial<Record<Key, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const okRef = useRef<HTMLDivElement>(null);

  // Once sent, the form gives way to the confirmation, which takes focus so it is announced.
  useEffect(() => {
    if (sent) okRef.current?.focus();
  }, [sent]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = Object.fromEntries(ORDER.map((k) => [k, RULES[k](values[k].trim())])) as Record<Key, string>;
    setErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      setStatus("error");
      refs.current[first]?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: `Company: ${values.company.trim()} · Contact page`,
          message: values.challenge.trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("idle");
      setSent(true);
    } catch {
      setStatus("failed");
    }
  }

  const props = (k: Key) => ({
    id: `cf-${k}`,
    name: k,
    value: values[k],
    required: true,
    "aria-describedby": `cf-${k}-err`,
    "aria-invalid": errors[k] === undefined ? undefined : !!errors[k],
    onChange: (ev: { target: { value: string } }) => setValues((p) => ({ ...p, [k]: ev.target.value })),
    onBlur: () => {
      if (errors[k] !== undefined) setErrors((p) => ({ ...p, [k]: RULES[k](values[k].trim()) }));
    },
    ref: (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      refs.current[k] = el;
    },
  });
  const err = (k: Key) => (
    <p className="cf-err" id={`cf-${k}-err`} hidden={!errors[k]}>
      {errors[k]}
    </p>
  );

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
          <div>
            <form className="cform form-light" id="contact-form" noValidate aria-label="Discuss your challenge" onSubmit={onSubmit} hidden={sent}>
              <div className="cf-row">
                <div className="cf-field">
                  <label htmlFor="cf-name">Name</label>
                  <input {...props("name")} type="text" autoComplete="name" />
                  {err("name")}
                </div>
                <div className="cf-field">
                  <label htmlFor="cf-company">Company</label>
                  <input {...props("company")} type="text" autoComplete="organization" />
                  {err("company")}
                </div>
              </div>
              <div className="cf-field">
                <label htmlFor="cf-email">Email</label>
                <input {...props("email")} type="email" autoComplete="email" />
                {err("email")}
              </div>
              <div className="cf-field">
                <label htmlFor="cf-challenge">Your business challenge</label>
                <textarea {...props("challenge")} rows={4} />
                {err("challenge")}
              </div>
              <p className="cf-privacy">
                We use these details only to respond to your enquiry. See our <Link href={ROUTES.privacy}>privacy policy</Link>.
              </p>
              <div className="cf-actions">
                <button className="btn btn-blue" type="submit" disabled={status === "sending"}>
                  <span className="cta-label">Discuss your challenge</span>
                </button>
                <p className={"cf-status" + (status === "error" || status === "failed" ? " is-error" : "")} role="status" aria-live="polite">
                  {status === "error" && "Please check the highlighted fields."}
                  {status === "sending" && "Sending…"}
                  {status === "failed" && (
                    <>
                      We couldn’t send your request. Please try again, or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Your details are still in the form.
                    </>
                  )}
                </p>
              </div>
            </form>
            <div className="cf-success" id="cf-success" tabIndex={-1} hidden={!sent} ref={okRef}>
              <p>Thank you. Your request has been received. Our team will review the information and contact you to agree on the next step.</p>
            </div>
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
