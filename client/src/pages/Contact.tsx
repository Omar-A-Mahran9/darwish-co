import { useEffect, useRef, useState } from "react";
import { Mail, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import "./Contact.css";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * What the site says once an enquiry has arrived. It makes no promise about
 * how quickly a reply comes: that is an operational commitment, and none has
 * been confirmed.
 */
const SENT_MESSAGE = "Thank you. Your enquiry has reached us, and we will reply to the email address you gave.";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8!2d31.4677375!3d30.0560468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d2b0e3b3b3b%3A0x1465949206209374709!2sDarwish%26co!5e0!3m2!1sen!2seg!4v1715000000000!5m2!1sen!2seg";
const DIRECTIONS = "https://share.google/6tKphgm623sxgJe9m";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sentHeadingRef = useRef<HTMLHeadingElement>(null);

  // The form is replaced by the confirmation, so focus moves to it: otherwise
  // a keyboard or screen-reader user is left on a button that no longer exists.
  useEffect(() => {
    if (submitted) sentHeadingRef.current?.focus();
  }, [submitted]);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Please tell us what you would like help with.";
    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear field error on change
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const found = validate();
    const firstInvalid = (["name", "email", "message"] as const).find((field) => found[field]);
    if (firstInvalid) {
      // Take the reader to the first field that needs fixing; its error is
      // tied to it with aria-describedby, so it is read out on arrival.
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      toast.error("Please fix the errors before submitting.", {
        icon: <AlertCircle className="w-4 h-4" />,
      });
      return;
    }

    setIsSubmitting(true);

    // Show loading toast
    const loadingToastId = toast.loading("Sending your enquiry…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      toast.dismiss(loadingToastId);

      if (res.ok && data.success) {
        toast.success("Enquiry sent", {
          description: SENT_MESSAGE,
          icon: <CheckCircle2 className="w-4 h-4" />,
          duration: 6000,
        });
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const message = data.error || "Something went wrong. Please try again.";
        setSubmitError(message);
        toast.error(message, {
          icon: <AlertCircle className="w-4 h-4" />,
          duration: 5000,
        });
      }
    } catch {
      toast.dismiss(loadingToastId);
      const message = "Network error. Please check your connection and try again.";
      setSubmitError(message);
      toast.error(message, {
        icon: <AlertCircle className="w-4 h-4" />,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Props shared by each required field: its error, and how it is announced. */
  const fieldState = (field: keyof FormErrors) => ({
    required: true,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const fieldError = (field: keyof FormErrors) =>
    errors[field] && (
      <p id={`${field}-error`} className="contact-field-error">
        <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors[field]}
      </p>
    );

  return (
    <div className="contact-page">
      <div className="site-container contact-intro-grid">
        <div className="contact-intro">
          <p className="contact-eyebrow">Contact Darwish &amp; Co.</p>
          <h1 className="contact-title">
            What decision is
            <br className="hidden lg:inline" /> your business
            <br className="hidden lg:inline" /> <em>facing?</em>
          </h1>
          <p className="contact-lead">
            Whether you need to delegate without losing oversight, respond to a client’s
            compliance requirements, or plan your next stage of growth, tell us what has
            prompted the conversation.
          </p>
          <p className="contact-promise">
            We’ll start by understanding your situation and what a good outcome looks like.
          </p>
          <ul className="contact-assurance">
            <li>First conversation</li>
            <li>No cost</li>
            <li>No obligation</li>
          </ul>
        </div>

        <section className="contact-form-panel" id="enquiry" aria-labelledby="form-heading">
          {submitted ? (
            <div className="contact-sent" role="status">
              <h2
                id="form-heading"
                tabIndex={-1}
                ref={sentHeadingRef}
              >
                Enquiry sent
              </h2>
              <p>{SENT_MESSAGE}</p>
              <button
                type="button"
                className="contact-sent-again"
                onClick={() => setSubmitted(false)}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <>
              <h2 id="form-heading">
                Tell us what you’re
                <br className="hidden lg:inline" /> working through.
              </h2>
              <p className="contact-form-intro">
                A few details are enough to start the conversation.
              </p>
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="contact-fields-row">
                  <div className="contact-field">
                    <label htmlFor="name">
                      Name <span>(required)</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      {...fieldState("name")}
                    />
                    {fieldError("name")}
                  </div>
                  <div className="contact-field">
                    <label htmlFor="email">
                      Email <span>(required)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      {...fieldState("email")}
                    />
                    {fieldError("email")}
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="subject">
                    Subject <span>(optional)</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    autoComplete="off"
                    placeholder="What would you like to discuss?"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="message">
                    What would you like help with? <span>(required)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Briefly describe the situation, the decision you face, and any timing we should know about."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    {...fieldState("message")}
                  />
                  {fieldError("message")}
                </div>

                <p className="contact-privacy">
                  We’ll only use these details to respond to your enquiry.
                </p>

                {submitError && (
                  <p className="contact-form-alert" role="alert">
                    <AlertCircle aria-hidden="true" /> {submitError}
                  </p>
                )}

                <button type="submit" className="contact-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      Sending… <span className="contact-spinner" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Send enquiry <span className="contact-submit-arrow" aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </section>

        <section className="contact-direct" aria-labelledby="direct-heading">
          <h2 id="direct-heading">Prefer to contact us directly?</h2>
          <a className="contact-link" href="mailto:info@darwish-co.com">
            <Mail strokeWidth={1.5} aria-hidden="true" />
            info@darwish-co.com
          </a>
          <a className="contact-link" href="tel:+201101101090">
            <Phone strokeWidth={1.5} aria-hidden="true" />
            +20 110 110 1090
          </a>
        </section>
      </div>

      <section className="site-container contact-office" aria-labelledby="office-heading">
        <div className="contact-office-copy">
          <div>
            <p className="contact-eyebrow">Find us</p>
            <h2 id="office-heading">Our office in New Cairo</h2>
            <address>
              Office T-10, 3rd Floor, RIO Mall
              <br />
              Dr. Ahmed Okasha St., off Sadat Axis
              <br />
              New Cairo 1, Cairo Governorate 11865, Egypt
            </address>
            <a
              className="contact-directions"
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="contact-hours">
            <h3>Working hours</h3>
            <p>
              Mon – Fri
              <br />
              9:00 AM – 6:00 PM
            </p>
            <p className="contact-region">
              Based in Egypt.
              <br />
              Working with SMEs across the MENA region.
            </p>
          </div>
        </div>
        <div className="contact-map">
          <iframe
            title="Darwish & Co. office location in New Cairo"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
