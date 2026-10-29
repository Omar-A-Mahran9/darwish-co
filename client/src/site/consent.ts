/**
 * Cookie consent for analytics and advertising tools (29 Oct 2026; described in the Privacy policy).
 *
 * Add each tool's ID below to switch it on. The IDs are public (they appear in every page's source), so
 * they live here rather than in the server's .env. While all three are empty the site loads no tool and
 * shows no cookie banner.
 *
 * - Google Analytics loads on every visit with Consent Mode set to "denied": until a visitor accepts it
 *   sets no cookies and sends Google only cookieless page signals. Accepting turns on its cookies.
 * - Microsoft Clarity and the Meta Pixel load only after a visitor accepts them.
 * All three notice address changes in this single-page site by themselves (GA4 enhanced measurement,
 * Clarity, and the Pixel's history tracking), so no page-view code runs on navigation.
 */
export const TRACKING = {
  /** Google Analytics 4 measurement ID, such as "G-XXXXXXXXXX". */
  googleAnalytics: "",
  /** Microsoft Clarity project ID, such as "abcd1234ef". */
  clarity: "",
  /** Meta Pixel ID, such as "123456789012345". */
  metaPixel: "",
};

export type Consent = { analytics: boolean; ads: boolean };

const COOKIE = "dc_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // ask again after six months
/** Fired by the footer's "Cookie settings" link to reopen the banner. */
export const OPEN_SETTINGS_EVENT = "dc:cookie-settings";

export const trackingEnabled = () => Boolean(TRACKING.googleAnalytics || TRACKING.clarity || TRACKING.metaPixel);
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));

/** The visitor's saved choice, or null when they have not chosen yet. Stored as "a1.m0". */
export function readConsent(): Consent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=a([01])\\.m([01])(?:;|$)`));
  return match ? { analytics: match[1] === "1", ads: match[2] === "1" } : null;
}

export function saveConsent(next: Consent) {
  const before = readConsent();
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=a${+next.analytics}.m${+next.ads}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
  // A tool that already ran cannot be unloaded: clear its cookies and reload without it.
  if ((before?.analytics && !next.analytics) || (before?.ads && !next.ads)) {
    clearTrackingCookies(next);
    location.reload();
    return;
  }
  applyConsent(next);
}

/** Loads the tools the visitor has accepted. Safe to call more than once. */
export function applyConsent(consent: Consent | null) {
  const w = window as any;
  // A tool refused after it ran can rewrite its cookies while the page unloads; clear them on every load.
  if (consent) clearTrackingCookies(consent);
  if (TRACKING.googleAnalytics) {
    loadGoogleAnalytics();
    w.gtag("consent", "update", { analytics_storage: consent?.analytics ? "granted" : "denied" });
  }
  if (consent?.analytics && TRACKING.clarity) loadClarity();
  if (consent?.ads && TRACKING.metaPixel) loadMetaPixel();
}

const loaded = new Set<string>();

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadGoogleAnalytics() {
  if (loaded.has("ga")) return;
  loaded.add("ga");
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    w.dataLayer.push(arguments);
  };
  // Ads storage stays denied: Google Analytics is used for site statistics only.
  w.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  w.gtag("js", new Date());
  w.gtag("config", TRACKING.googleAnalytics);
  addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(TRACKING.googleAnalytics)}`);
}

function loadClarity() {
  if (loaded.has("clarity")) return;
  loaded.add("clarity");
  const w = window as any;
  w.clarity =
    w.clarity ||
    function clarity() {
      (w.clarity.q = w.clarity.q || []).push(arguments);
    };
  w.clarity("consent");
  addScript(`https://www.clarity.ms/tag/${encodeURIComponent(TRACKING.clarity)}`);
}

function loadMetaPixel() {
  if (loaded.has("meta")) return;
  loaded.add("meta");
  const w = window as any;
  if (!w.fbq) {
    const fbq: any = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    w.fbq = w._fbq = fbq;
  }
  w.fbq("init", TRACKING.metaPixel);
  w.fbq("track", "PageView");
  addScript("https://connect.facebook.net/en_US/fbevents.js");
}

/** Removes the cookies of tools the visitor no longer accepts, on this host and its parent domain. */
function clearTrackingCookies(keep: Consent) {
  const names = document.cookie.split("; ").map((c) => c.split("=")[0]);
  const drop = names.filter(
    (n) => (!keep.analytics && (n === "_ga" || n.startsWith("_ga_") || n === "_clck" || n === "_clsk" || n === "CLID")) || (!keep.ads && (n === "_fbp" || n === "_fbc")),
  );
  const host = location.hostname;
  for (const name of drop) {
    for (const domain of ["", `; Domain=${host}`, `; Domain=.${host.replace(/^www\./, "")}`]) {
      document.cookie = `${name}=; Path=/; Max-Age=0${domain}`;
    }
  }
}
