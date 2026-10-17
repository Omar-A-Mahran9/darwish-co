import { useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { CONTACT, ROUTES } from "./nav";

type Rule = "text" | "email" | "phone" | "long";
type FieldDef = { key: string; label: string; type?: string; auto?: string; rule: Rule; required: boolean; empty: string; area?: boolean };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,}$/;

/** The standard form (homepage, About and most service pages). */
const STANDARD: FieldDef[][] = [
  [
    { key: "name", label: "Name", auto: "name", rule: "text", required: true, empty: "Please enter your name." },
    { key: "email", label: "Work email", type: "email", auto: "email", rule: "email", required: true, empty: "Please enter your work email." },
  ],
  [{ key: "org", label: "Organization", auto: "organization", rule: "text", required: false, empty: "" }],
  [{ key: "msg", label: "Your business challenge", area: true, rule: "long", required: true, empty: "Please describe your business challenge in a sentence or two." }],
];

/** The Strategy & Performance page asks for the organization and an optional phone number. */
const STRATEGY: FieldDef[][] = [
  [
    { key: "name", label: "Name", auto: "name", rule: "text", required: true, empty: "Please enter your name." },
    { key: "email", label: "Work email", type: "email", auto: "email", rule: "email", required: true, empty: "Please enter your work email." },
  ],
  [
    { key: "org", label: "Organization", auto: "organization", rule: "text", required: true, empty: "Please enter your organization." },
    { key: "phone", label: "Phone", type: "tel", auto: "tel", rule: "phone", required: false, empty: "" },
  ],
  [{ key: "msg", label: "What would you like to improve?", area: true, rule: "long", required: true, empty: "Please describe what you would like to improve in a sentence or two." }],
];

function problem(f: FieldDef, raw: string): string {
  const v = raw.trim();
  if (!v) return f.required ? f.empty : "";
  if (f.rule === "email") return EMAIL.test(v) ? "" : "Enter an email address like name@company.com.";
  if (f.rule === "phone") return PHONE.test(v) ? "" : "Enter a phone number with at least 7 digits, or leave it blank.";
  if (f.rule === "long") return v.length >= 10 ? "" : f.empty;
  return "";
}

type Status = "idle" | "error" | "sending" | "sent" | "failed";

/**
 * The closing contact section used on the homepage, About and the service pages. Messages go to
 * /api/contact, which stores them in the admin inbox and emails the team.
 *
 * `idPrefix` keeps field ids unique per page; `service` is added to the message subject so the team
 * knows which page the enquiry came from.
 */
export default function ContactSection({
  title = "Let's discuss your next strategic priority.",
  text = "Tell us the decision, performance issue, or growth question in front of you. We will help clarify the challenge and identify a practical next step.",
  lead = "Share a brief overview of your challenge. Our team will review it and contact you to agree on the next step.",
  idPrefix = "ct",
  service,
  variant = "standard",
  privacy = "We use these details to respond to your enquiry.",
}: {
  title?: string;
  text?: string;
  lead?: string;
  idPrefix?: string;
  service?: string;
  variant?: "standard" | "strategy";
  privacy?: string;
}) {
  const rows = variant === "strategy" ? STRATEGY : STANDARD;
  const fields = rows.flat();
  const blank = Object.fromEntries(fields.map((f) => [f.key, ""])) as Record<string, string>;
  const [values, setValues] = useState(blank);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<Status>("idle");
  const refs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const statusRef = useRef<HTMLDivElement>(null);
  const id = (k: string) => `${idPrefix}-${k}`;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = Object.fromEntries(fields.map((f) => [f.key, problem(f, values[f.key])]));
    setErrors(found);
    const first = fields.find((f) => found[f.key]);
    if (first) {
      setStatus("error");
      refs.current[first.key]?.focus();
      return;
    }

    setStatus("sending");
    const subject = [
      values.org?.trim() && `Organization: ${values.org.trim()}`,
      values.phone?.trim() && `Phone: ${values.phone.trim()}`,
      service && `Service: ${service}`,
    ]
      .filter(Boolean)
      .join(" · ");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), subject: subject || undefined, message: values.msg.trim() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues(blank);
      setErrors({});
    } catch {
      setStatus("failed");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field = (f: FieldDef) => {
    const err = errors[f.key];
    const common = {
      id: id(f.key),
      name: id(f.key),
      value: values[f.key],
      "aria-describedby": `${id(f.key)}-err`,
      "aria-invalid": err === undefined ? undefined : !!err,
      required: f.required,
      onChange: (ev: { target: { value: string } }) => setValues((prev) => ({ ...prev, [f.key]: ev.target.value })),
      onBlur: () => {
        if (errors[f.key] !== undefined) setErrors((prev) => ({ ...prev, [f.key]: problem(f, values[f.key]) }));
      },
      ref: (el: HTMLInputElement | HTMLTextAreaElement | null) => {
        refs.current[f.key] = el;
      },
    };
    return (
      <div className="sx-field" key={f.key}>
        <label htmlFor={id(f.key)}>
          {f.label}
          {!f.required && (
            <>
              {" "}
              <span className="sx-opt">(optional)</span>
            </>
          )}
        </label>
        {f.area ? <textarea {...common} rows={4} /> : <input {...common} type={f.type ?? "text"} autoComplete={f.auto} />}
        <p className="sx-err" id={`${id(f.key)}-err`} hidden={!err}>
          {err}
        </p>
      </div>
    );
  };

  return (
    <section className="sx-contact" id="contact" aria-labelledby={`${idPrefix}-ct-h`}>
      <div className="sx-wrap sx-ct">
        <div className="sx-ct-copy">
          <h2 id={`${idPrefix}-ct-h`} className="sx-h2">
            {title}
          </h2>
          <p>{text}</p>
          <ul className="sx-ct-alt">
            <li>
              <span>Email</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </li>
          </ul>
        </div>
        <form className="sx-form" noValidate onSubmit={onSubmit}>
          {lead && <p className="sx-flead">{lead}</p>}
          <p className="sx-req">All fields are required unless marked optional.</p>
          {rows.map((row, i) =>
            row.length > 1 ? (
              <div className="sx-frow" key={i}>
                {row.map(field)}
              </div>
            ) : (
              field(row[0])
            ),
          )}
          <p className="sx-privacy">
            {privacy} See our <Link href={ROUTES.privacy}>privacy policy</Link>.
          </p>
          <button className="btn btn-navy sx-submit" type="submit" disabled={status === "sending"}>
            <span className="cta-label">{status === "sending" ? "Sending…" : "Discuss your challenge"}</span>
          </button>
          <div
            ref={statusRef}
            className={"sx-status" + (status === "error" || status === "failed" ? " is-error" : "")}
            role="status"
            tabIndex={-1}
            hidden={status === "idle" || status === "sending"}
          >
            {status === "error" && "Please check the highlighted fields."}
            {status === "sent" && (
              <>
                <strong>Thank you. Your request has been received.</strong> Our team will review the information and contact you to agree on the next step.
              </>
            )}
            {status === "failed" && (
              <>
                <strong>We couldn’t send your request.</strong> Please try again, or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>. Your details are still in the form.
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
