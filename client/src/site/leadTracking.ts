/**
 * Lead events for Google Tag Manager (GTM-5JG3FZDV, 8 Nov 2026). Events go to the dataLayer only; Tag Manager
 * routes them to Google Analytics under consent mode. They never carry personal data: no names, addresses,
 * numbers or message text, only the kind of contact and the page it happened on.
 *
 * - contact_click: any mailto:, tel: or WhatsApp link, anywhere on the site (one listener on the document).
 * - generate_lead: a successful enquiry. The form is Zoho's, in an iframe this page cannot read, so success is
 *   signalled by Zoho redirecting to /form-thanks.html on this domain after it accepts the submission. That
 *   page pushes the event into this page's dataLayer, or, if it opened as a full page, leaves a flag that
 *   flushPendingLead() turns into the event on the next page load.
 */
export const PENDING_LEAD_KEY = "dc_pending_lead";

type ContactMethod = "email" | "phone" | "whatsapp";

/** What kind of contact a link starts, or null for any other link. */
export function contactMethodOf(href: string): ContactMethod | null {
  const h = href.trim().toLowerCase();
  if (h.startsWith("mailto:")) return "email";
  if (h.startsWith("tel:")) return "phone";
  if (h.startsWith("whatsapp:") || /^https?:\/\/(wa\.me|(api|web)\.whatsapp\.com|chat\.whatsapp\.com)\//.test(h)) return "whatsapp";
  return null;
}

const push = (event: Record<string, unknown>) => {
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer = w.dataLayer || []).push(event);
};

/** Starts the site-wide contact-link listener. Call once, in the browser. */
export function installContactClickTracking() {
  document.addEventListener(
    "click",
    (e) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const method = link && contactMethodOf(link.getAttribute("href") ?? "");
      if (method) push({ event: "contact_click", contact_method: method, page_path: location.pathname });
    },
    { capture: true },
  );
}

/** Sends a lead recorded while the thank-you page was open on its own (see the note above). */
export function flushPendingLead() {
  try {
    const path = sessionStorage.getItem(PENDING_LEAD_KEY);
    if (path === null) return;
    sessionStorage.removeItem(PENDING_LEAD_KEY);
    push({ event: "generate_lead", lead_source: "contact_form", page_path: path || location.pathname });
  } catch {
    // Storage blocked: nothing was recorded, so there is nothing to send.
  }
}
