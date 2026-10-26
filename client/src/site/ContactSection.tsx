import { Link } from "wouter";
import { CONTACT, ROUTES } from "./nav";
import ZohoForm from "./ZohoForm";

/**
 * The closing contact section used on the homepage, About and the service pages: the invitation and
 * direct contacts on the left, the Zoho "Brief overview of your challenge" form on the right
 * (27 Oct 2026; it replaces the site's own form, which posted to /api/contact).
 *
 * `idPrefix` keeps the heading id unique per page.
 */
export default function ContactSection({
  title = "Let's discuss your next strategic priority.",
  text = "Tell us the decision, performance issue, or growth question in front of you. We will help clarify the challenge and identify a practical next step.",
  idPrefix = "ct",
  privacy = "We use these details to respond to your enquiry.",
}: {
  title?: string;
  text?: string;
  idPrefix?: string;
  privacy?: string;
}) {
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
        <div className="sx-form zf-card">
          <ZohoForm />
          <p className="sx-privacy">
            {privacy} See our <Link href={ROUTES.privacy}>privacy policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
