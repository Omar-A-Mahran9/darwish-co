import { useEffect } from "react";

/**
 * "Add as a preferred source on Google" (29 Oct 2026), on the Insights page and at the end of each article.
 * Readers who pick darwish-co.com see its articles more often in Google's Top Stories and AI features.
 * See developers.google.com/search/docs/appearance/preferred-sources.
 *
 * The button is a plain link to Google's source preferences page, so it works without JavaScript and in
 * the prerendered HTML. Once Google's publisher script has loaded (manual mode, so it draws nothing of
 * its own), a click adds the site in place and the reader stays on the page.
 */
const DEEPLINK = "https://www.google.com/preferences/source?q=darwish-co.com";
const SCRIPT = "https://news.google.com/swg/js/v1/publisher.js";

type PreferredSourceApi = { init: (opts: { theme?: "light" | "dark"; lang?: string }) => void; addPreferredSource: () => void };
let api: PreferredSourceApi | null = null;
let requested = false;

function loadApi() {
  if (requested) return;
  requested = true;
  const w = window as any;
  (w.PREFERRED_SOURCE = w.PREFERRED_SOURCE || []).push((ps: PreferredSourceApi) => {
    ps.init({ theme: "light", lang: "en" });
    api = ps;
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = SCRIPT;
  s.setAttribute("preferred-sources-control", "manual");
  document.head.appendChild(s);
}

export default function PreferredSource() {
  useEffect(loadApi, []);

  return (
    <aside className="ps-box" aria-labelledby="ps-title">
      <div>
        <h2 id="ps-title">See our insights first on Google</h2>
        <p>Add Darwish &amp; Co. as a preferred source, and Google is more likely to show our articles in Top Stories and search results.</p>
      </div>
      <a
        className="btn btn-line"
        href={DEEPLINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (!api) return; // not loaded yet or blocked: the link opens Google's page instead
          e.preventDefault();
          api.addPreferredSource();
        }}
      >
        Add as a preferred source on Google
      </a>
    </aside>
  );
}
