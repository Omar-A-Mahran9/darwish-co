/** Privacy policy (approved text) and Integrity commitments (placeholder until its approved text arrives). */
import { Fragment } from "react";
import { CtaBand, PageHero, SampleTag } from "@/site/blocks";
import { CONTACT, ROUTES } from "@/site/nav";

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

function PolicyTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="policy-table-wrap">
      <table className="policy-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Privacy policy, approved by Fouad Darwish on 29 Oct 2026. The cookie section describes site/CookieBanner.tsx and site/consent.ts. */
export function Privacy() {
  return (
    <>
      <PageHero
        title="Privacy policy"
        sub="Last updated: 29 October 2026"
        crumbs={[
          ["Home", "/"],
          ["Privacy policy", null],
        ]}
      />
      <section className="band white" aria-label="Privacy policy">
        <div className="wrap">
          <div className="prose">
            <p>
              This policy explains what personal information Darwish &amp; Co. collects through darwish-co.com, why we collect it, and what you can ask us to do with it. We collect as little
              as we need to answer your enquiry and serve our clients.
            </p>

            <h2>Who we are</h2>
            <p>
              Darwish &amp; Co. is the trading name of Fouad Darwish Business &amp; Consulting Development (organisation number 291746), a management consulting firm based in Egypt. We are
              responsible for the personal information described in this policy.
            </p>
            <ul>
              <li>Registered address: 53 Capital Mall, behind the Court, 2nd Floor, New Cairo, Cairo Governorate, Egypt</li>
              <li>Office: {CONTACT.address}, Egypt</li>
              <li>
                Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                Phone: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
            </ul>

            <h2>Information we collect</h2>
            <p>
              <strong>When you send us an enquiry.</strong> Our enquiry form asks for your name, contact details, organization, and a short description of your challenge. It also records which
              page of the site you wrote from. The form is provided by Zoho Forms, which stores your answers for us.
            </p>
            <p>
              <strong>When you contact us directly.</strong> If you email, call, or message us, including through LinkedIn, Facebook, or Instagram, we keep what you send and your contact details
              so we can reply.
            </p>
            <p>
              <strong>When you sign in to a client portal.</strong> Clients sign in with a username and password that we issue. We use them only to check your access and send you to your
              organization's portal.
            </p>
            <p>
              <strong>When you browse the site.</strong> Like any website, our server receives technical details with each request, such as your IP address, browser type, and the page you asked
              for. The server keeps these in short-lived logs for security and fault-finding. We do not use them to identify you.
            </p>
            <p>
              <strong>Content from Google.</strong> The site loads its fonts from Google Fonts, and the Contact page shows a Google map. When these load, Google receives your IP address and
              browser details. Google's use of this information is covered by its own{" "}
              <a href="https://policies.google.com/privacy" {...external}>
                privacy policy
              </a>
              .
            </p>
            <p>
              <strong>Analytics and advertising.</strong> If you accept cookies, we use Google Analytics, Microsoft Clarity, and the Meta Pixel to understand how the site is used and to measure
              our advertising. They collect information such as the pages you visit, how long you stay, where you click and scroll, the site you came from, your device and browser, and your
              approximate location. Clarity also makes recordings and heatmaps of how visitors move through pages; it does not record what you type into the enquiry form. If you do not accept,
              Google Analytics receives only a basic signal that a page was viewed, without cookies and without identifying you. We may add similar tools later and will list them here first.
            </p>
            <p>We do not ask for sensitive personal data, such as health, religious, or financial information. Please do not include it in your enquiry.</p>

            <h2>How we use your information</h2>
            <PolicyTable
              head={["Purpose", "Information used", "Why we may use it"]}
              rows={[
                ["Reply to your enquiry and arrange a first conversation", "Enquiry or message, contact details", "You asked us to, and you gave your consent by sending it"],
                ["Prepare and deliver an engagement", "Contact details, details of your organization's challenge", "To take steps toward, and carry out, a contract with you"],
                ["Give clients access to their portal", "Portal username and password", "To provide the service we agreed with your organization"],
                ["Understand how the site is used and improve it", "Analytics data (Google Analytics, Clarity)", "Your consent, given in the cookie banner"],
                ["Show our ads to relevant audiences and measure them", "Advertising data (Meta Pixel)", "Your consent, given in the cookie banner"],
                ["Keep the site secure and working", "Technical details in server logs", "Our legitimate interest in protecting the site and our clients"],
                ["Meet legal and tax obligations", "Records of engagements and correspondence", "To comply with the law"],
              ]}
            />
            <p>
              We do not sell your information. If you accept advertising cookies, Meta may use them to show our ads to you on Facebook and Instagram, and to measure how those ads perform. We will
              only send you news or insights by email if you ask us to, and every such email will let you stop them.
            </p>

            <h2>Who we share it with</h2>
            <p>We share personal information only where it is needed, and only with:</p>
            <ul>
              <li>
                <strong>Service providers who work for us:</strong> Zoho (enquiry form), our website hosting provider, and our email and phone providers. They may use your information only to
                provide their service to us.
              </li>
              <li>
                <strong>Analytics and advertising providers:</strong> Google (Google Analytics), Microsoft (Clarity), and Meta (Meta Pixel), only if you accept cookies. Each also uses this
                information under its own privacy policy:{" "}
                <a href="https://policies.google.com/privacy" {...external}>
                  Google
                </a>
                ,{" "}
                <a href="https://privacy.microsoft.com/privacystatement" {...external}>
                  Microsoft
                </a>
                ,{" "}
                <a href="https://www.facebook.com/privacy/policy/" {...external}>
                  Meta
                </a>
                .
              </li>
              <li>
                <strong>Specialist partners:</strong> some engagements are delivered with named partner firms. We share your details with a partner only after you agree to it, and only for that
                engagement.
              </li>
              <li>
                <strong>Authorities:</strong> where the law requires it, or to protect our rights or someone's safety.
              </li>
            </ul>
            <p>If Darwish &amp; Co. ever merges with or transfers its business to another firm, your information would pass to that firm under this policy.</p>

            <h2>Cookies</h2>
            <p>
              Cookies are small files a website stores in your browser. When you first visit, a banner asks whether you accept analytics and advertising cookies. Only cookies the site needs to
              work are set before you choose.
            </p>
            <PolicyTable
              head={["Type", "Used for", "Set by", "Needs your consent"]}
              rows={[
                ["Necessary", "Keeping client portal sign-in secure; remembering your cookie choice", "Darwish & Co.", "No"],
                ["Analytics", "Counting visits and understanding how pages are used", "Google Analytics, Microsoft Clarity", "Yes"],
                ["Advertising", "Measuring our ads and showing them to relevant audiences", "Meta Pixel", "Yes"],
              ]}
            />
            <p>Zoho may also set its own cookies when the enquiry form loads, and Google when the map loads; their policies explain how.</p>
            <p>
              You can change your choice at any time through the "Cookie settings" link at the bottom of every page, or by clearing cookies in your browser. Refusing cookies does not stop you
              using the site.
            </p>

            <h2>How long we keep it</h2>
            <ul>
              <li>Enquiries that do not lead to an engagement: up to 2 years after our last contact.</li>
              <li>Engagement records: as long as the law requires us to keep business and tax records.</li>
              <li>Analytics data: up to 14 months in Google Analytics; Clarity recordings for up to 30 days.</li>
              <li>Server logs: a few weeks.</li>
            </ul>
            <p>After that, we delete the information or make it anonymous.</p>

            <h2>How we protect it</h2>
            <p>
              The site uses an encrypted (HTTPS) connection. Access to enquiries and client information is limited to the people at Darwish &amp; Co. who need it. No system is perfectly secure,
              so if we learn of a breach that affects you, we will tell you and the authorities as the law requires.
            </p>

            <h2>Transfers outside Egypt</h2>
            <p>
              Some of our service providers, such as Zoho, Google, Microsoft, and Meta, store information on servers outside Egypt. Where this happens, we rely on their contractual and security
              commitments and on the safeguards Egyptian law requires.
            </p>

            <h2>Your rights</h2>
            <p>You can ask us to:</p>
            <ul>
              <li>tell you what personal information we hold about you, and give you a copy;</li>
              <li>correct information that is wrong or incomplete;</li>
              <li>delete your information, or stop using it, where we have no legal reason to keep it;</li>
              <li>withdraw a consent you gave us, without affecting what we did before.</li>
            </ul>
            <p>
              To make a request, email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. We may ask you to confirm your identity, and we will reply within 30 days. If you are not satisfied
              with our answer, you can complain to Egypt's Personal Data Protection Centre.
            </p>

            <h2>Children</h2>
            <p>The site is meant for businesses and professionals. We do not knowingly collect information from anyone under 18.</p>

            <h2>Changes to this policy</h2>
            <p>We will update this page when our practices change, and show the date of the latest version at the top.</p>

            <h2>Contact us</h2>
            <p>
              Questions about this policy or your information: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
            </p>
          </div>
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
