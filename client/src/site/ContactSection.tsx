import { useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { CONTACT, ROUTES } from "./nav";

type FieldName = "name" | "email" | "org" | "message";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function problem(field: FieldName, raw: string): string {
  const v = raw.trim();
  switch (field) {
    case "name":
      return v ? "" : "Please enter your name.";
    case "email":
      if (!v) return "Please enter your work email.";
      return EMAIL.test(v) ? "" : "Enter an email address like name@company.com.";
    case "message":
      return v.length >= 10 ? "" : "Please describe your business challenge in a sentence or two.";
    default:
      return "";
  }
}

type Status = { kind: "idle" } | { kind: "error" | "sending" | "sent" | "failed"; text?: string };

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
}: {
  title?: string;
  text?: string;
  lead?: string;
  idPrefix?: string;
  service?: string;
}) {
  const [values, setValues] = useState<Record<FieldName, string>>({ name: "", email: "", org: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const refs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const statusRef = useRef<HTMLDivElement>(null);
  const id = (f: FieldName) => `${idPrefix}-${f}`;

  const check = (f: FieldName, v = values[f]) => {
    const msg = problem(f, v);
    setErrors((prev) => ({ ...prev, [f]: msg }));
    return msg;
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const order: FieldName[] = ["name", "email", "org", "message"];
    const found = Object.fromEntries(order.map((f) => [f, problem(f, values[f])])) as Record<FieldName, string>;
    setErrors(found);
    const first = order.find((f) => found[f]);
    if (first) {
      setStatus({ kind: "error", text: "Please check the highlighted fields." });
      refs.current[first]?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    const subject = [values.org.trim() && `Organization: ${values.org.trim()}`, service && `Service: ${service}`]
      .filter(Boolean)
      .join(" · ");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: subject || undefined,
          message: values.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "sent" });
      setValues({ name: "", email: "", org: "", message: "" });
      setErrors({});
    } catch {
      setStatus({ kind: "failed" });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field = (f: FieldName, label: string, opts: { type?: string; auto?: string; optional?: boolean; area?: boolean }) => {
    const err = errors[f];
    const common = {
      id: id(f),
      name: id(f),
      value: values[f],
      "aria-describedby": `${id(f)}-err`,
      "aria-invalid": err === undefined ? undefined : err ? true : false,
      required: !opts.optional,
      onChange: (ev: { target: { value: string } }) => setValues((prev) => ({ ...prev, [f]: ev.target.value })),
      onBlur: () => {
        if (errors[f] !== undefined) check(f);
      },
    };
    return (
      <div className="sx-field">
        <label htmlFor={id(f)}>
          {label} {opts.optional && <span className="sx-opt">(optional)</span>}
        </label>
        {opts.area ? (
          <textarea {...common} rows={4} ref={(el) => {
            refs.current[f] = el;
          }} />
        ) : (
          <input {...common} type={opts.type ?? "text"} autoComplete={opts.auto} ref={(el) => {
            refs.current[f] = el;
          }} />
        )}
        <p className="sx-err" id={`${id(f)}-err`} hidden={!err}>
          {err}
        </p>
      </div>
    );
  };

  return (
    <div className="sx sx-gov sx-about">
      <section className="sx-contact" id="contact" aria-labelledby={`${idPrefix}-h`}>
        <div className="sx-wrap sx-ct">
          <div className="sx-ct-copy">
            <h2 id={`${idPrefix}-h`} className="sx-h2">
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
            <p className="sx-flead">{lead}</p>
            <p className="sx-req">All fields are required unless marked optional.</p>
            <div className="sx-frow">
              {field("name", "Name", { auto: "name" })}
              {field("email", "Work email", { type: "email", auto: "email" })}
            </div>
            {field("org", "Organization", { auto: "organization", optional: true })}
            {field("message", "Your business challenge", { area: true })}
            <p className="sx-privacy">
              We use these details to respond to your enquiry. See our <Link href={ROUTES.privacy}>privacy policy</Link>.
            </p>
            <button className="btn btn-navy sx-submit" type="submit" disabled={status.kind === "sending"}>
              <span className="cta-label">{status.kind === "sending" ? "Sending…" : "Discuss your challenge"}</span>
            </button>
            <div
              ref={statusRef}
              className={"sx-status" + (status.kind === "error" || status.kind === "failed" ? " is-error" : "")}
              role="status"
              tabIndex={-1}
              hidden={status.kind === "idle" || status.kind === "sending"}
            >
              {status.kind === "error" && status.text}
              {status.kind === "sent" && (
                <>
                  <strong>Thank you. Your request has been received.</strong> Our team will review the information and
                  contact you to agree on the next step.
                </>
              )}
              {status.kind === "failed" && (
                <>
                  <strong>We couldn’t send your request.</strong> Please try again, or email{" "}
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
                  Your details are still in the form.
                </>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
