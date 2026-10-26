import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { CONTACT, ROUTES, SITE_SERVICES, serviceHref } from "./nav";

/** Official social profiles (confirmed 25 Oct 2026). Also listed as sameAs in the Organization record in index.html. */
const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/darwishandcoeg/",
    path: "M5 3.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM1.2 8h3.6v13H1.2zM8.2 8h3.5v1.8h.05c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V21h-3.6v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V21H8.2z",
  },
  { name: "Facebook", href: "https://www.facebook.com/darwishandcoeg", path: "M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z" },
  { name: "Instagram", href: "https://www.instagram.com/darwishandcoeg/", path: "" },
];

/**
 * Footer. The "A wise word in the right moment" strip is dropped on pages that already end with a
 * contact section or a contact band, so the page never shows two "Discuss your challenge" calls in a row.
 */
export default function SiteFooter() {
  const [location] = useLocation();
  const [showTop, setShowTop] = useState(true);

  useEffect(() => {
    setShowTop(!document.querySelector("main .sx-contact, main .cta-band"));
  }, [location]);

  return (
    <footer className="site-footer">
      <div className="wrap">
        {showTop && (
          <div className="foot-top">
            <p>A wise word in the right moment.</p>
            <Link className="btn btn-blue" href={ROUTES.contact}>
              <span className="cta-label">Discuss your challenge</span>
            </Link>
          </div>
        )}
        <div className="foot-grid">
          <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <Link className="brand" href="/" aria-label="Darwish & Co. home">
              <img src="/media/emblem.png" alt="" width={34} height={34} />
              <span className="brand-name">Darwish &amp; Co.</span>
            </Link>
            <p style={{ maxWidth: "34ch", fontSize: 14 }}>Strategic management and business consulting, New Cairo, Egypt.</p>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              {SITE_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s.slug)}>{s.short}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Firm</h2>
            <ul>
              <li>
                <Link href={ROUTES.about}>About</Link>
              </li>
              <li>
                <Link href={ROUTES.integrity}>Integrity commitments</Link>
              </li>
              <li>
                <Link href={ROUTES.industries}>Industries</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <address>
              <span>{CONTACT.address}</span>
              <span>{CONTACT.phone}</span>
              <span>{CONTACT.email}</span>
            </address>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Darwish &amp; Co.</span>
          <div className="foot-util">
            {/* The client portal link is hidden (26 Oct 2026); the login stays at /client-login for clients who have the address. */}
            <Link href={ROUTES.privacy}>Privacy</Link>
          </div>
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
      </div>
    </footer>
  );
}
