import { useEffect, useId, useState } from "react";
import { Link } from "wouter";
import { ROUTES } from "./nav";
import { OPEN_SETTINGS_EVENT, TRACKING, applyConsent, readConsent, saveConsent, trackingEnabled, type Consent } from "./consent";

/**
 * Cookie banner (see consent.ts). Shown until the visitor chooses, and again from the footer's
 * "Cookie settings" link. Accept and Reject carry equal weight; "Choose" opens one switch per kind of cookie.
 * Renders nothing on the server, so prerendered pages and hydration are unaffected.
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [draft, setDraft] = useState<Consent>({ analytics: false, ads: false });
  const id = useId();

  useEffect(() => {
    if (!trackingEnabled()) return;
    const saved = readConsent();
    applyConsent(saved);
    if (!saved) setOpen(true);
    const reopen = () => {
      setDraft(readConsent() ?? { analytics: false, ads: false });
      setChoosing(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const decide = (next: Consent) => {
    setOpen(false);
    setChoosing(false);
    saveConsent(next);
  };
  const hasAnalytics = Boolean(TRACKING.googleAnalytics || TRACKING.clarity);
  const hasAds = Boolean(TRACKING.metaPixel);

  return (
    <section className="cookie-banner" aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <div className="cb-text">
          <h2 id={`${id}-title`}>Cookies on this site</h2>
          <p>
            We use cookies to understand how the site is used{hasAds ? " and to measure our advertising" : ""}. They are off unless you accept them. Read our{" "}
            <Link href={ROUTES.privacy}>privacy policy</Link>.
          </p>
          {choosing && (
            <div className="cb-options">
              <label className="cb-option">
                <input type="checkbox" checked disabled />
                <span>
                  <strong>Necessary</strong> Keep client sign-in secure and remember this choice. Always on.
                </span>
              </label>
              {hasAnalytics && (
                <label className="cb-option">
                  <input type="checkbox" checked={draft.analytics} onChange={(e) => setDraft({ ...draft, analytics: e.target.checked })} />
                  <span>
                    <strong>Analytics</strong> Count visits and see how pages are used.
                  </span>
                </label>
              )}
              {hasAds && (
                <label className="cb-option">
                  <input type="checkbox" checked={draft.ads} onChange={(e) => setDraft({ ...draft, ads: e.target.checked })} />
                  <span>
                    <strong>Advertising</strong> Measure our ads and show them to relevant audiences.
                  </span>
                </label>
              )}
            </div>
          )}
        </div>
        <div className="cb-actions">
          {choosing ? (
            <button type="button" className="btn btn-blue" onClick={() => decide(draft)}>
              Save choices
            </button>
          ) : (
            <button type="button" className="btn btn-ghost" onClick={() => setChoosing(true)}>
              Choose
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={() => decide({ analytics: false, ads: false })}>
            Reject all
          </button>
          <button type="button" className={choosing ? "btn btn-ghost" : "btn btn-blue"} onClick={() => decide({ analytics: true, ads: true })}>
            Accept all
          </button>
        </div>
      </div>
    </section>
  );
}
