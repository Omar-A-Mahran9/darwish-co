# Phase 2: build the full prototype website from the homepage plus content data.
# - Moves the homepage's styles and script into assets/site.css and assets/site.js, shared by every page.
# - Reuses the homepage header and footer on every page; every internal link points at a real page file.
# - Generates the inner pages. Content not taken from the Corporate Profile carries a "Sample content" tag.
import re, sys, os, html
sys.path.insert(0, os.path.dirname(__file__))
from site_content import SERVICES, CHALLENGES, PEOPLE, PARTNER_GROUPS, INDUSTRIES, TOPICS, ARTICLES
from service_detail_content import SERVICE_DETAIL
from about_content import ABOUT
import service_detail as SX

OUT = sys.argv[1]                       # the artifact folder (holds darwish-homepage.html and assets/)
HOME = os.path.join(OUT, "darwish-homepage.html")
# Always build from the untouched single-file homepage, so the build can be re-run.
src = open(sys.argv[2], encoding="utf-8").read()
# "About us" is one page (decided 10 Oct 2026): no dropdown; People, Partner ecosystem and How we work live as About sections.
_about_desktop = src[src.index('<li class="nav-item">\n          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu-about">'):]
_about_desktop = _about_desktop[:_about_desktop.index('</div>\n        </li>') + len('</div>\n        </li>')]
src = src.replace(_about_desktop, '<li><a class="nav-link" href="/about">About us</a></li>', 1)
_about_mobile = src[src.index('<li class="m-row">\n          <button class="m-acc" type="button" aria-expanded="false" aria-controls="m-about">'):]
_about_mobile = _about_mobile[:_about_mobile.index('</div>\n        </li>') + len('</div>\n        </li>')]
src = src.replace(_about_mobile, '<li class="m-row"><a href="/about">About us</a></li>', 1)
src = src.replace('<li><a href="/people">People</a></li><li><a href="/corporate-partners">Partner ecosystem</a></li><li><a href="/how-we-work">How we work</a></li>', '', 1)
assert 'menu-about' not in src and 'm-about' not in src
SVC = {s["slug"]: s for s in SERVICES}
PPL = {p["slug"]: p for p in PEOPLE}
e = html.escape

# ------------------------------------------------------------------ routes
ROUTES = {"/": "./", "/about": "about.html", "/about/integrity": "integrity.html", "/services": "services.html",
          "/how-we-work": "about.html#how-we-work", "/industries": "industries.html", "/projects": "our-work.html",
          "/people": "about.html#experts", "/corporate-partners": "about.html#partners", "/blog": "insights.html",
          "/contact": "contact.html", "/privacy": "privacy.html", "/growth-360": "growth-360.html"}
for s in SERVICES: ROUTES["/services/" + s["slug"]] = "service-" + s["slug"] + ".html"
for p in PEOPLE: ROUTES["/people/" + p["slug"]] = "about.html#experts"   # profile pages removed 10 Oct 2026
def route(r): return ROUTES.get(r, r)
FOLDED = {"people.html": "about.html#experts", "partners.html": "about.html#partners", "how-we-work.html": "about.html#how-we-work"}
def relink(text):
    text = re.sub(r'href="(/[^"#?]*)"', lambda m: 'href="%s"' % route(m.group(1)), text)
    for old, new in FOLDED.items(): text = text.replace('href="%s"' % old, 'href="%s"' % new)
    return text

# ------------------------------------------------------------------ split the homepage
style = src[src.index("<style>") + 7: src.index("</style>")]
script = src[src.index("<script>") + 8: src.index("</script>")]
head_links = src[: src.index("<style>")]          # <title> + font links
header = src[src.index('<a class="skip"'): src.index("</header>") + len("</header>")]
main = src[src.index('<main id="main">'): src.index("</main>") + len("</main>")]
chrome = src[src.index('<footer class="site-footer">'): src.index("<script>")]

# Shared script changes: inner pages have a navy page hero; unmapped links (client portal) explain themselves.
script = script.replace('var hasDarkHero = !!document.querySelector(".hero");', 'var hasDarkHero = !!document.querySelector(".hero, .page-hero");')
assert ".hero, .page-hero" in script
script = script.replace("""    if (!hasDarkHero) { header.classList.add("is-solid"); return; }""",
  """    hasDarkHero = !!document.querySelector(".hero, .page-hero");
    header.classList.toggle("is-solid", !hasDarkHero);
    if (!hasDarkHero) return;""")
script = script.replace('if (hasDarkHero && "IntersectionObserver" in window) {', 'if ("IntersectionObserver" in window) {')
assert 'header.classList.toggle("is-solid", !hasDarkHero);' in script
script = script.replace('toast.innerHTML = "Homepage prototype only. This link goes to <code></code>";',
                        'toast.innerHTML = "This prototype does not include this page. On the live site it opens <code></code>";')

# --- Page-level pieces become re-runnable "page inits", so the in-viewer router can run them after swapping a page.
def cut_between(js, start, end):
    i = js.index(start); j = js.index(end, i)
    return js[:i], js[i:j], js[j:]
markers = ["  // Moving rows in", "  // Growth 360 headline", "  // Contact form (prototype)", "  // Social links are placeholders", "  // Hero video:", '  var list = document.getElementById("notes");']
i0 = script.index(markers[0]); i5 = script.index(markers[5])
segs = [script[script.index(markers[k]):script.index(markers[k + 1])] for k in range(5)]
page_inits = "".join("  window.PAGE_INITS.push(function () {\n%s  });\n" % seg for k, seg in enumerate(segs) if k != 3)
social = r"""  // Social links are placeholders until the official account addresses are confirmed (delegated, so swapped footers work too).
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-pending]");
    if (!a) return;
    e.preventDefault();
    var t = document.querySelector(".toast");
    t.textContent = "The official " + a.dataset.pending + " link will be added once the account address is confirmed.";
    t.hidden = false; clearTimeout(t._timer); t._timer = setTimeout(function () { t.hidden = true; }, 3500);
  });
"""
script = "window.PAGE_INITS = [];\n" + script[:i0] + page_inits + social + script[i5:]

# --- In-viewer router: the claude.ai artifact viewer does not follow in-frame link clicks, so inside it,
# internal links fetch the target page and swap in its <main> and footer. Elsewhere links work normally.
router = r"""
  // In-viewer navigation (prototype only). Active only inside the claude.ai artifact frame.
  if (/claudeusercontent\.com$/.test(location.hostname) && window.fetch && window.DOMParser) {
    var internal = /^(\.\/|[\w-]+\.html)(#[\w-]*)?$/;
    function swapTo(href, push) {
      var parts = href.split("#"), path = parts[0] || "./", hash = parts[1] || "";
      fetch(path, { credentials: "same-origin" }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (text) {
        var doc = new DOMParser().parseFromString(text, "text/html");
        var newMain = doc.querySelector("main"), oldMain = document.querySelector("main");
        if (!newMain || !oldMain) throw new Error("no main");
        oldMain.replaceWith(document.importNode(newMain, true));
        var nf = doc.querySelector(".site-footer"), of = document.querySelector(".site-footer");
        if (nf && of) of.innerHTML = nf.innerHTML;
        var t = doc.querySelector("title"); if (t) document.title = t.textContent;
        // carry over the current-section markers in the header
        document.querySelectorAll(".site-header .nav-link").forEach(function (a) {
          var twin = doc.querySelector('.site-header .nav-link[href="' + a.getAttribute("href") + '"]');
          if (twin && twin.hasAttribute("aria-current")) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
        });
        document.querySelectorAll(".site-header .nav-toggle").forEach(function (b) {
          var twin = doc.querySelector('.site-header .nav-toggle[aria-controls="' + b.getAttribute("aria-controls") + '"]');
          b.classList.toggle("is-current", !!(twin && twin.classList.contains("is-current")));
        });
        if (!mobileNav.hidden) setMobileMenu(false);
        toggles.forEach(function (tg) { setMenu(tg, false); });
        window.__routeHash = hash;
        window.PAGE_INITS.forEach(function (f) { try { f(); } catch (err) { console.error(err); } });
        var target = hash && document.getElementById(hash);
        if (target && !document.querySelector(".topic-filter")) { target.scrollIntoView(); } else { window.scrollTo(0, 0); }
        var h1 = document.querySelector("main h1");
        if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
        updateHeader();
        if (push) { try { history.pushState({ href: href }, ""); } catch (err) {} }
      }).catch(function () {
        toast.textContent = "This page could not be loaded in the preview.";
        toast.hidden = false; clearTimeout(timer); timer = setTimeout(function () { toast.hidden = true; }, 3500);
      });
    }
    try { history.replaceState({ href: "./" }, ""); } catch (err) {}
    window.addEventListener("popstate", function (e) { if (e.state && e.state.href) swapTo(e.state.href, false); });
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target === "_blank") return;
      var href = a.getAttribute("href");
      if (!internal.test(href)) return;
      e.preventDefault();
      swapTo(href, true);
    });
  }
"""
k = script.rindex("})();")
script = script[:k] + router + script[k:]

script += r'''
// Insights listing: topic buttons filter the article cards; the address hash (#governance) preselects a topic.
window.PAGE_INITS.push(function () {
  var bar = document.querySelector(".topic-filter");
  if (!bar) return;
  var buttons = Array.prototype.slice.call(bar.querySelectorAll("button"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".in-card[data-topic]"));
  var empty = document.getElementById("topic-empty"), count = document.getElementById("topic-count");
  var known = (bar.getAttribute("data-topics") || "").split(" ");
  function apply(topic) {
    var shown = 0, label = "";
    buttons.forEach(function (b) { var on = b.dataset.value === topic; b.setAttribute("aria-pressed", on ? "true" : "false"); if (on && topic !== "all") label = b.textContent; });
    cards.forEach(function (c) { var on = topic === "all" || c.dataset.topic === topic; c.hidden = !on; if (on) shown++; });
    empty.hidden = shown > 0;
    if (!label && topic !== "all") label = topic.charAt(0).toUpperCase() + topic.slice(1);
    count.textContent = shown + (shown === 1 ? " article" : " articles") + (label ? " in " + label : "");
  }
  buttons.forEach(function (b) { b.addEventListener("click", function () { apply(b.dataset.value); }); });
  var reset = document.querySelector("[data-reset]");
  if (reset) reset.addEventListener("click", function () { apply("all"); bar.querySelector('[data-value="all"]').focus(); });
  var start = (window.__routeHash || location.hash || "").slice(1); window.__routeHash = "";
  apply(known.indexOf(start) > -1 ? start : "all");
});
''' + SX.JS + r'''// Homepage figures count up from zero when they scroll into view (once). Reduced motion or no observer: final numbers stay.
window.PAGE_INITS.push(function () {
  var figs = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  if (!figs.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  function run(el, delay) {
    var out = el.querySelector(".count"), end = parseInt(el.getAttribute("data-count"), 10), dur = 1600, t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      out.textContent = String(Math.round(end * eased));
      if (p < 1) requestAnimationFrame(step); else finish();
    }
    function finish() { if (el.classList.contains("is-counted")) return; out.textContent = String(end); el.classList.add("is-counted"); }
    setTimeout(function () { requestAnimationFrame(step); }, delay);
    setTimeout(finish, delay + dur + 400);   // the true number always lands, even if frames are throttled
  }
  var io = new IntersectionObserver(function (entries) {
    var shown = entries.filter(function (en) { return en.isIntersecting; });
    shown.forEach(function (en, i) { io.unobserve(en.target); run(en.target, i * 150); });
  }, { threshold: 0.5 });
  figs.forEach(function (el) { el.querySelector(".count").textContent = "0"; io.observe(el); });
});
// Run this page's interactive parts once on load (the router re-runs them after each swap).
window.PAGE_INITS.forEach(function (f) { try { f(); } catch (err) { console.error(err); } });
'''

PAGE_CSS = r'''
/* Count-up figures: brief settle when the count finishes (skipped with reduced motion). */
[data-count] .count { display: inline-block; margin: 0; font: inherit; letter-spacing: inherit; color: inherit; }   /* not the .fact span label style */
@media (prefers-reduced-motion: no-preference) { [data-count].is-counted .count { animation: count-settle 360ms ease-out; } }
@keyframes count-settle { 0% { transform: scale(1.08); } 100% { transform: none; } }
/* ================= Phase 2: inner pages ================= */
.page-hero { background: var(--navy-deep); color: var(--on-navy); padding-block: calc(var(--header-h) + 64px) 72px; }
.page-hero .wrap { display: grid; gap: 18px; justify-items: start; }
.page-hero h1 { color: var(--white); font-size: 52px; line-height: 1.1; max-width: 20ch; }
.page-hero .sub { color: var(--on-navy); max-width: 62ch; font-size: 19px; }
@media (max-width: 767px) { .page-hero { padding-block: calc(var(--header-h) + 40px) 48px; } .page-hero h1 { font-size: 36px; } .page-hero .sub { font-size: 17px; } }
.crumbs { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 4px 8px; font: 500 14px/1.4 var(--sans); color: var(--on-navy); }
.crumbs li + li::before { content: "/"; margin-inline-end: 8px; color: rgba(201, 211, 222, .6); }
.crumbs a { color: var(--on-navy); }
.crumbs a:hover { color: #8FD6F8; }
.band { padding-block: 80px; }
.band.white { background: var(--white); }
.band.navy { background: var(--navy); color: var(--on-navy); }
.band.navy h2, .band.navy h3 { color: var(--white); }
@media (max-width: 599px) { .band { padding-block: 56px; } }
.band-head { display: grid; gap: 14px; justify-items: start; margin-block-end: 40px; max-width: 760px; }
.band-head h2 { font-size: 38px; }
@media (max-width: 767px) { .band-head h2 { font-size: 28px; } }
.band-head p { font-size: 17px; color: var(--muted); }
.band.navy .band-head p { color: var(--on-navy); }
.grid { display: grid; gap: 20px; }
.grid.c2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid.c3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid.c4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
@media (max-width: 1079px) { .grid.c3, .grid.c4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 639px) { .grid.c2, .grid.c3, .grid.c4 { grid-template-columns: minmax(0, 1fr); } }
.tile { background: var(--white); border: 1px solid var(--line); padding: 28px; display: grid; gap: 10px; align-content: start; min-width: 0; }
.band.white .tile { background: var(--warm); border-color: var(--bg); }
.band.navy .tile { background: var(--navy-2); border-color: var(--line-navy); }
.band.navy .tile p { color: var(--on-navy); }
.tile h3 { font: 600 20px/1.3 var(--serif); }
.tile p { font-size: 16px; color: var(--muted); }
.tile .k { font: 600 14px/1.3 var(--sans); color: #006BA3; }
.band.navy .tile .k { color: #8FD6F8; }
a.tile { text-decoration: none; color: inherit; transition: border-color 200ms ease-out, box-shadow 200ms ease-out, transform 200ms ease-out; }
a.tile:hover { border-color: #7CC4EA; box-shadow: 0 10px 28px rgba(0, 163, 240, .12); }
a.tile:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
a.tile .go { font: 600 15px/1.3 var(--sans); color: var(--blue-text); margin-block-start: 6px; }
.cols { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 48px; align-items: start; }
@media (max-width: 899px) { .cols { grid-template-columns: minmax(0, 1fr); gap: 20px; } }
.cols h2 { font-size: 32px; }
@media (max-width: 767px) { .cols h2 { font-size: 26px; } }
.ticks { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
.ticks li { position: relative; padding-inline-start: 28px; font-size: 17px; line-height: 1.55; color: var(--charcoal); }
.ticks li::before { content: ""; position: absolute; inset-inline-start: 2px; inset-block-start: .55em; width: 10px; height: 10px; background: var(--blue); }
.band.navy .ticks li { color: var(--on-navy); }
.outputs { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
@media (max-width: 599px) { .outputs { grid-template-columns: minmax(0, 1fr); } }
.outputs li { padding: 16px 18px; border: 1px solid #9CCBE6; background: #F2F9FD; font: 500 16px/1.4 var(--sans); color: var(--navy); }
.numbered { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; counter-reset: n; border-block-start: 1px solid var(--line); }
.numbered li { counter-increment: n; display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 4px 16px; padding-block: 18px; border-block-end: 1px solid var(--line); }
.numbered li::before { content: counter(n, decimal-leading-zero); grid-row: 1 / span 2; font: 600 18px/1.3 var(--sans); color: #006BA3; }
.numbered strong { font: 600 18px/1.35 var(--sans); color: var(--navy); }
.numbered span { font-size: 16px; color: var(--muted); }
.notice { display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 14px; padding: 20px 22px; border: 1px solid #9CCBE6; background: #F2F9FD; margin-block-start: 28px; }
.notice svg { width: 22px; height: 22px; fill: none; stroke: #006BA3; stroke-width: 1.8; stroke-linecap: round; }
.notice p { font-size: 16px; color: var(--charcoal); }
.sample-tag { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border: 1px dashed #A7B1BB; background: var(--white); color: #4A5563; font: 600 14px/1.3 var(--sans); }
.sample-tag::before { content: ""; width: 8px; height: 8px; background: #A7B1BB; }
.band.navy .sample-tag, .page-hero .sample-tag { background: transparent; color: var(--on-navy); border-color: rgba(201, 211, 222, .5); }
.pending-text { color: #4A5563; font-style: italic; }
.cta-band { background: var(--navy-deep); color: var(--on-navy); padding-block: 72px; }
.cta-band .wrap { display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: center; justify-content: space-between; }
.cta-band h2 { color: var(--white); font-size: 36px; max-width: 22ch; }
.cta-band p { margin-block-start: 10px; max-width: 52ch; }
@media (max-width: 767px) { .cta-band h2 { font-size: 28px; } }
.person-card { display: grid; gap: 12px; align-content: start; text-decoration: none; color: inherit; }
.person-card img { width: 100%; aspect-ratio: 1; object-fit: cover; background: var(--bg); }
.person-card strong { font: 600 19px/1.3 var(--serif); color: var(--navy); }
.person-card span { font-size: 15px; line-height: 1.5; color: var(--muted); }
.person-card:hover strong { color: var(--blue-text); text-decoration: underline; text-underline-offset: 3px; }
.person-card:focus-visible { outline: 2px solid var(--blue); outline-offset: 4px; }
.person-card.featured { background: var(--navy); padding: 14px 14px 18px; }
.person-card.featured strong { color: var(--white); }
.person-card.featured span { color: var(--on-navy); }
.person-hero { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 32px; align-items: center; }
.person-hero img { width: 220px; height: 220px; object-fit: cover; border: 2px solid rgba(255, 255, 255, .25); }
@media (max-width: 639px) { .person-hero { grid-template-columns: minmax(0, 1fr); } .person-hero img { width: 160px; height: 160px; } }
.partner-row { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 18px; align-items: start; }
.partner-row img { width: 64px; height: 64px; object-fit: contain; background: var(--white); border: 1px solid var(--line); padding: 8px; }
.partner-row img.is-filled { padding: 0; }
.partner-row h3 { font: 600 19px/1.3 var(--sans); color: var(--navy); }
.partner-row p { font-size: 16px; color: var(--muted); margin-block-start: 4px; }
.topic-filter { display: flex; flex-wrap: wrap; gap: 10px; margin-block-end: 28px; }
.topic-filter button { min-height: 44px; padding: 8px 16px; border: 1px solid var(--line); background: var(--white); color: var(--navy); font: 500 15px/1.2 var(--sans); cursor: pointer; }
.topic-filter button:hover { border-color: #7CC4EA; }
.topic-filter button[aria-pressed="true"] { background: var(--navy); border-color: var(--navy); color: var(--white); }
.topic-filter button:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
.topic-count { font-size: 15px; color: var(--muted); margin-block-end: 16px; }
.article-card { display: grid; gap: 10px; align-content: start; padding: 26px; background: var(--white); border: 1px solid var(--line); text-decoration: none; color: inherit; }
.article-card .k { font: 600 14px/1.3 var(--sans); color: #006BA3; }
.article-card h3 { font: 600 21px/1.3 var(--serif); color: var(--navy); }
.article-card p { font-size: 16px; color: var(--muted); }
a.article-card:hover h3 { color: var(--blue-text); text-decoration: underline; text-underline-offset: 3px; }
a.article-card:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
.empty-state { padding: 28px; border: 1px dashed var(--line); background: var(--white); color: var(--muted); font-size: 16px; }
.prose { max-width: 70ch; display: grid; gap: 18px; }
.prose h2 { font-size: 28px; margin-block-start: 12px; }
.prose p, .prose li { font-size: 17px; line-height: 1.7; color: var(--charcoal); }
.contact-cols { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 56px; align-items: start; }
@media (max-width: 899px) { .contact-cols { grid-template-columns: minmax(0, 1fr); } }
.contact-panel { background: var(--white); border: 1px solid var(--line); padding: 28px; display: grid; gap: 18px; }
.contact-panel dt { font: 600 14px/1.3 var(--sans); color: var(--muted); }
.contact-panel dd { margin: 4px 0 0; font-size: 17px; color: var(--navy); }
.contact-panel dd a { color: var(--navy); }
.map-slot { aspect-ratio: 16 / 10; display: grid; place-items: center; text-align: center; padding: 16px; background: repeating-linear-gradient(135deg, #E4E8EC 0 12px, #EDF0F2 12px 24px); color: #4A5563; font-size: 15px; border: 1px dashed #A7B1BB; }
.form-light .cf-field label { color: var(--navy); }
.form-light .cf-field input, .form-light .cf-field textarea { border-color: #B7C1CB; }
.form-light .cf-privacy { color: var(--muted); }
.form-light .cf-privacy a { color: var(--blue-text); }
.form-light .cf-err, .form-light .cf-status.is-error { color: #B42318; }
.form-light .cf-field [aria-invalid="true"] { border-color: #B42318; }
.form-light .cf-status { color: var(--muted); }
.form-light .cf-field input:focus-visible, .form-light .cf-field textarea:focus-visible { outline-color: var(--blue); border-color: var(--navy); }
.form-light + .cf-success, .form-light ~ .cf-success { background: #F2F9FD; border-color: #9CCBE6; }
.form-light ~ .cf-success p { color: var(--navy); }
.nav-link[aria-current="page"], .nav-toggle.is-current { color: #8FD6F8; }
.big-404 { font: 700 96px/1 var(--sans); color: var(--blue); }
.article-card .sample-tag, .tile .sample-tag { justify-self: start; }
@media (max-width: 639px) { .grid.people-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; } .people-grid .person-card strong { font-size: 16px; } .people-grid .person-card span { font-size: 14px; } }
.arrow-link { display: inline-flex; align-items: center; min-height: 44px; font: 600 16px/1.3 var(--sans); color: var(--blue-text); }
.grid .wcard { width: auto; }
/* Our work: compact intro, two case cards, static logo grid, short contact band */
.page-hero.ow-hero { padding-block: calc(var(--header-h) + 64px) 64px; }
.ow-hero .wrap { gap: 16px; }
.ow-hero h1 { font-size: 48px; line-height: 1.15; }
.ow-hero .crumbs a { display: inline-block; padding-block: 13px; margin-block: -13px; min-width: 44px; }
.ow-cases { padding-block: 64px 88px; }
.ow-cases h2, .ow-clients h2 { font-size: 32px; line-height: 1.2; }
.ow-grid { list-style: none; margin: 32px 0 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
.ow-card { position: relative; display: flex; flex-direction: column; background: var(--white); border: 1px solid var(--line); transition: border-color 200ms ease-out; }
.ow-card img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 10; object-fit: cover; }
.ow-body { display: flex; flex-direction: column; gap: 12px; flex: 1; padding: 24px; }
.ow-sector { margin: 0; font: 600 14px/1.4 var(--sans); color: var(--blue-text); }
.ow-card h3 { font: 600 24px/1.3 var(--serif); color: var(--navy); }
.ow-text { margin: 0; font: 400 16px/1.6 var(--sans); color: var(--muted); }
.ow-service { margin: auto 0 0; padding-block-start: 14px; border-block-start: 1px solid var(--line); font: 500 14px/1.4 var(--sans); color: var(--muted); }
.ow-more { align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; font: 600 16px/1.3 var(--sans); color: var(--blue-text); text-decoration: none; }
.ow-more::after { content: ""; position: absolute; inset: 0; }
.ow-more:focus-visible { outline: none; }
.ow-card:has(.ow-more:focus-visible) { outline: 2px solid var(--blue); outline-offset: 3px; border-color: var(--navy); }
.ow-more:focus-visible .cta-label { background-size: 100% 1px; }
@media (hover: hover) { .ow-card:hover { border-color: var(--navy); } .ow-card:hover .cta-label { background-size: 100% 1px; } }
.ow-clients { background: var(--bg); padding-block: 80px; }
.ow-lede { margin: 12px 0 0; font-size: 17px; color: var(--muted); }
.ow-logos { list-style: none; margin: 40px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 40px 32px; }
.ow-logos li { display: grid; place-items: center; height: 90px; }
.ow-logos img { width: 180px; max-width: 100%; height: 90px; object-fit: contain; }
.ow-logo-name { font: 600 16px/1.3 var(--sans); color: var(--navy); text-align: center; }
.cta-band.ow-cta { padding-block: 56px; scroll-margin-top: var(--header-h); }
.ow-cta h2 { font-size: 32px; line-height: 1.2; }
@media (max-width: 767px) {
  .page-hero.ow-hero { padding-block: calc(var(--header-h) + 40px) 40px; }
  .ow-hero h1 { font-size: 34px; }
  .ow-cases { padding-block: 48px 64px; }
  .ow-cases h2, .ow-clients h2, .ow-cta h2 { font-size: 26px; }
  .ow-grid { grid-template-columns: minmax(0, 1fr); gap: 24px; margin-top: 24px; }
  .ow-card h3 { font-size: 22px; }
  .ow-clients { padding-block: 56px; }
  .ow-logos { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 20px; margin-top: 28px; }
  .ow-logos li { height: 72px; }
  .ow-logos img { height: 72px; }
  .cta-band.ow-cta { padding-block: 48px; }
  .ow-cta .wrap { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) { .ow-card { transition: none; } }
/* Insights listing: same intro and contact band as Our work; typographic cards */
.in-list { padding-block: 56px 88px; }
.in-list .topic-filter { gap: 8px; margin-block-end: 16px; }
.in-list .topic-filter button { border-color: #B7C1CB; }
.in-list .topic-filter button:hover { border-color: var(--navy); }
.in-list .topic-count { margin-block-end: 24px; }
.in-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.in-card { position: relative; display: flex; flex-direction: column; gap: 12px; padding: 24px; background: var(--white); border: 1px solid var(--line); transition: border-color 200ms ease-out; }
.in-card[hidden] { display: none; }
.in-topic { margin: 0; font: 600 14px/1.4 var(--sans); color: var(--blue-text); }
.in-card h3 { font: 600 22px/1.3 var(--serif); color: var(--navy); }
.in-sum { margin: 0; font: 400 16px/1.6 var(--sans); color: var(--muted); }
.in-meta { margin: 0; font: 500 14px/1.4 var(--sans); color: var(--muted); }
.in-foot { margin-block-start: auto; padding-block-start: 8px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 16px; }
.in-more { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; font: 600 16px/1.3 var(--sans); color: var(--blue-text); text-decoration: none; }
.in-more::after { content: ""; position: absolute; inset: 0; }
.in-arrow { display: inline-block; transition: transform 200ms ease-out; }
.in-more:focus-visible { outline: none; }
.in-card:has(.in-more:focus-visible) { outline: 2px solid var(--blue); outline-offset: 3px; border-color: var(--navy); }
.in-card:has(.in-more:focus-visible) .cta-label { background-size: 100% 1px; }
.in-card:has(.in-more:focus-visible) .in-arrow { transform: translateX(3px); }
@media (hover: hover) { .in-card:hover { border-color: var(--navy); } .in-card:hover .cta-label { background-size: 100% 1px; } .in-card:hover .in-arrow { transform: translateX(3px); } }
.in-empty { display: grid; gap: 12px; justify-items: start; padding: 28px; border: 1px solid var(--line); background: var(--warm); color: var(--charcoal); font-size: 17px; }
.in-empty[hidden] { display: none; }
.in-empty p { margin: 0; }
.in-reset { min-height: 44px; padding: 8px 18px; border: 1px solid var(--navy); background: var(--white); color: var(--navy); font: 600 15px/1.2 var(--sans); cursor: pointer; }
.in-reset:hover { background: var(--navy); color: var(--white); }
.in-reset:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
@media (max-width: 1079px) { .in-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 639px) { .in-grid { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 767px) { .in-list { padding-block: 40px 64px; } }
@media (prefers-reduced-motion: reduce) { .in-card, .in-arrow { transition: none; } .in-card:hover .in-arrow { transform: none; } }
'''
css = style + PAGE_CSS + SX.CSS
os.makedirs(os.path.join(OUT, "assets"), exist_ok=True)
open(os.path.join(OUT, "assets", "site.css"), "w", encoding="utf-8").write(css)
open(os.path.join(OUT, "assets", "site.js"), "w", encoding="utf-8").write(script)

# ------------------------------------------------------------------ homepage: shared assets + real links
home = head_links + '<link rel="stylesheet" href="assets/site.css">\n\n' + header + "\n\n" + main + "\n\n" + chrome + '<script src="assets/site.js"></script>\n'
topic_ids = {"Strategy": "strategy", "Governance": "governance", "People": "people", "Operations": "operations", "Growth": "growth", "Research": "research"}
home = re.sub(r'<li><a href="/blog">(<svg[^>]*>.*?</svg>)(\w+)</a></li>', lambda m: '<li><a href="insights.html#%s">%s%s</a></li>' % (topic_ids[m.group(2)], m.group(1), m.group(2)), home)
home = home.replace('<a class="mag-feature" href="/blog"', '<a class="mag-feature" href="article-delegation-of-authority.html"')
home = home.replace('<a class="wcard" href="/projects" id="case-1">', '<a class="wcard" href="case-furniture.html" id="case-1">')
home = home.replace('<a class="wcard" href="/projects" id="case-2">', '<a class="wcard" href="case-organization.html" id="case-2">')
# Count-up figures: the final number stays in the HTML and is what screen readers hear; the visible copy animates.
count_html = lambda n: '<span class="sr-only">%s</span><span class="count" aria-hidden="true">%s</span>' % (n, n)
home = re.sub(r'<div class="fact"><strong>(\d+)</strong>', lambda m: '<div class="fact"><strong data-count="%s">%s</strong>' % (m.group(1), count_html(m.group(1))), home)
home = re.sub(r'<span class="big">(\d+)</span>', lambda m: '<span class="big" data-count="%s">%s</span>' % (m.group(1), count_html(m.group(1))), home)
assert home.count('data-count=') == 5
# Homepage contact: the old "Let's talk" block is replaced by the About page's contact section, placed last before the footer.
home, n = re.subn(r'\n\s*<section class="section dark deep" aria-labelledby="ct-title" id="contact">.*?</section>\n', '\n', home, count=1, flags=re.S)
assert n == 1
home = home.replace('</main>', '<div class="sx sx-gov sx-about">\n' + SX.about_contact(ABOUT) + '\n</div>\n</main>', 1)
home = re.sub(r'\s*<div class="foot-top">.*?</div>\n', '\n', home, count=1, flags=re.S)
home = relink(home)
open(HOME, "w", encoding="utf-8").write(home)

# ------------------------------------------------------------------ page shell for inner pages
FONTS = head_links[head_links.index("<link"):]
def shell(file, title, desc, body, section=None, full_title=None):
    h = relink(header).replace('href="#contact"', 'href="contact.html"')
    if section in ("projects", "blog"):
        target = {"projects": "our-work.html", "blog": "insights.html"}[section]
        h = h.replace('<a class="nav-link" href="%s">' % target, '<a class="nav-link" href="%s" aria-current="page">' % target)
    if section == "services": h = h.replace('<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu-practices">', '<button class="nav-toggle is-current" type="button" aria-expanded="false" aria-controls="menu-practices">')
    if section == "about": h = h.replace('<a class="nav-link" href="about.html">', '<a class="nav-link" href="about.html" aria-current="page">', 1)
    c = relink(chrome).replace('href="#contact"', 'href="contact.html"')
    if 'class="cta-band' in body or 'class="sx-contact"' in body:
        c = re.sub(r'\s*<div class="foot-top">.*?</div>\n', '\n', c, count=1, flags=re.S)
    doc = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(full_title or title + ' | Darwish & Co.')}</title>
<meta name="description" content="{e(desc)}">
{FONTS}<link rel="stylesheet" href="assets/site.css">
</head>
<body>
{h}

<main id="main">
{relink(body)}
</main>

{c}<script src="assets/site.js"></script>
</body>
</html>
'''
    open(os.path.join(OUT, file), "w", encoding="utf-8").write(doc)

def hero(pill, title, sub="", crumbs=None, extra=""):
    cr = ""
    if crumbs:
        items = "".join(f'<li><a href="{href}">{e(t)}</a></li>' if href else f'<li aria-current="page">{e(t)}</li>' for t, href in crumbs)
        cr = f'<nav aria-label="Breadcrumb"><ol class="crumbs">{items}</ol></nav>'
    p = f'<span class="pill">{e(pill)}</span>' if pill else ""
    s = f'<p class="sub">{sub}</p>' if sub else ""
    return f'''<section class="page-hero dark" aria-labelledby="page-title">
  <div class="wrap">
    {cr}{p}
    <h1 id="page-title">{title}</h1>
    {s}{extra}
  </div>
</section>'''

def cta(title="Let’s discuss your next strategic priority.", text="Tell us what your organization is facing. We’ll help you frame the challenge and identify a practical next step."):
    return f'''<section class="cta-band" aria-labelledby="cta-title">
  <div class="wrap">
    <div><h2 id="cta-title">{title}</h2><p>{text}</p></div>
    <a class="btn btn-blue" href="contact.html"><span class="cta-label">Discuss your challenge</span></a>
  </div>
</section>'''

SAMPLE = '<span class="sample-tag">Sample content</span>'
INFO = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>'
def ticks(items): return '<ul class="ticks">' + "".join(f"<li>{e(i)}</li>" for i in items) + "</ul>"
def person_link(slug): return ROUTES["/people/" + slug]
def svc_link(slug): return ROUTES["/services/" + slug]

# ------------------------------------------------------------------ About (complete build prompt; layout and copy in about_content.py / service_detail.py)
about_crumbs = '<nav aria-label="Breadcrumb"><ol class="crumbs"><li><a href="./">Home</a></li><li aria-current="page">About us</li></ol></nav>'
shell("about.html", "About us", ABOUT["meta"], SX.render_about(ABOUT, about_crumbs), "about", full_title=ABOUT["title"])

# ------------------------------------------------------------------ Integrity (sample)
shell("integrity.html", "Integrity commitments", "Darwish & Co. commitments on independence, confidentiality and conflicts of interest.",
hero("About us", "Integrity commitments", "How we protect independence, confidentiality and trust in every engagement.", [("Home", "./"), ("About us", "about.html"), ("Integrity commitments", None)], f'<p>{SAMPLE}</p>') + '''
<section class="band white" aria-label="Commitments">
  <div class="wrap">
    <div class="prose">
      <p class="pending-text">The approved policy text will replace this page. The headings below show the intended structure only.</p>
      <h2>Independence and objectivity</h2>
      <p class="pending-text">[Policy text pending approval]</p>
      <h2>Confidentiality of client information</h2>
      <p class="pending-text">[Policy text pending approval]</p>
      <h2>Conflicts of interest</h2>
      <p class="pending-text">[Policy text pending approval]</p>
      <h2>Partner and supplier conduct</h2>
      <p class="pending-text">[Policy text pending approval]</p>
    </div>
  </div>
</section>
''' + cta(), "about")

# ------------------------------------------------------------------ Services overview
blocks = ""
for name, line, pairs in CHALLENGES:
    cards = "".join(f'''<a class="tile" href="{svc_link(s["slug"])}"><span class="k">{e(s["decision"])}</span><h3>{e(s["title"])}</h3><p>{e(s["promise"])}</p><span class="go">Explore the service →</span></a>''' for s in SERVICES if s["decision"] == name)
    pr = "".join(f"<li>{e(a)} → {e(b)}</li>" for a, b in pairs)
    blocks += f'''
<section class="band{' white' if CHALLENGES.index((name, line, pairs)) % 2 == 0 else ''}" aria-label="{e(name)}">
  <div class="wrap cols">
    <div class="band-head" style="margin:0"><h2>{e(name)}</h2><p>{e(line)}</p><ul class="ticks" style="margin-top:8px">{pr}</ul></div>
    <div class="grid c2">{cards}</div>
  </div>
</section>'''
shell("services.html", "Services", "Eight consulting services organized around the four decisions leaders face.",
hero("Our services", "Eight practices. <span class=\"acc\">Four decisions you face.</span>",
     "Our consulting interventions are designed around the business result that needs to change, not around disconnected service activity.",
     [("Home", "./"), ("Services", None)]) + blocks + cta(), "services")

# ------------------------------------------------------------------ Service pages
for s in SERVICES:
    if s["slug"] in SERVICE_DETAIL:
        crumbs = [("Home", "./"), ("Services", "services.html"), (s["title"], None)]
        cr = '<nav aria-label="Breadcrumb"><ol class="crumbs">' + "".join(f'<li><a href="{href}">{e(t)}</a></li>' if href else f'<li aria-current="page">{e(t)}</li>' for t, href in crumbs) + '</ol></nav>'
        privacy = 'We use these details only to respond to your enquiry. See our <a href="privacy.html">privacy policy</a>.'
        shell(ROUTES["/services/" + s["slug"]], s["title"], SERVICE_DETAIL[s["slug"]].get("meta") or SERVICE_DETAIL[s["slug"]]["hero"]["intro"],
              SX.render(s, SERVICE_DETAIL[s["slug"]], PPL, cr, privacy), "services")
        continue
    if s.get("steps"):
        what = '<ol class="numbered">' + "".join(f"<li><strong>{e(a)}</strong><span>{e(b)}</span></li>" for a, b in s["steps"]) + "</ol>"
    else:
        what = ticks(s["do"])
    notice = f'<div class="notice">{INFO}<p>{e(s["notice"])}</p></div>' if s.get("notice") else ""
    if s["lead"]:
        lead = "".join(f'''<a class="person-card" href="{person_link(x)}"><img src="assets/people/{PPL[x]["photo"]}" alt="" width="400" height="400" loading="lazy"><strong>{e(PPL[x]["name"])}</strong><span>{e(PPL[x]["title"])}</span></a>''' for x in s["lead"])
        lead_html = f'<p>{SAMPLE}</p><p class="pending-text">Likely lead, to be confirmed by Darwish &amp; Co.</p><div class="grid c3" style="margin-top:16px">{lead}</div>'
    else:
        lead_html = f'<p>{SAMPLE}</p><p class="pending-text">[Lead advisor to be confirmed]</p>'
    partners = ""
    if s["partners"]:
        rows = "".join(f'<div class="tile"><h3>{e(n)}</h3><p>{e(r)}</p></div>' for n, r in s["partners"])
        partners = f'''<section class="band white" aria-labelledby="partners-h"><div class="wrap cols"><div class="band-head" style="margin:0"><h2 id="partners-h">Specialist partners</h2><p>Delivered by the partner named, within the agreed engagement scope.</p></div><div class="grid c2">{rows}</div></div></section>'''
    related = "".join(f'<a class="tile" href="{svc_link(r)}"><span class="k">{e(SVC[r]["decision"])}</span><h3>{e(SVC[r]["title"])}</h3><span class="go">Explore the service →</span></a>' for r in s["related"])
    shell(ROUTES["/services/" + s["slug"]], s["title"], s["promise"],
    hero(s["decision"], e(s["title"]), e(s["promise"]), [("Home", "./"), ("Services", "services.html"), (s["title"], None)]) + f'''
<section class="band white" aria-labelledby="need-h">
  <div class="wrap cols"><h2 id="need-h">When clients call us</h2>{ticks(s["support"])}</div>
</section>
<section class="band" aria-labelledby="do-h">
  <div class="wrap cols"><h2 id="do-h">What we do</h2><div>{what}{notice}</div></div>
</section>
<section class="band white" aria-labelledby="out-h">
  <div class="wrap cols"><h2 id="out-h">What you receive</h2><ul class="outputs">{"".join(f"<li>{e(o)}</li>" for o in s["outputs"])}</ul></div>
</section>
<section class="band navy" aria-labelledby="val-h">
  <div class="wrap cols"><h2 id="val-h">Business value</h2>{ticks(s["value"])}</div>
</section>
<section class="band" aria-labelledby="lead-h">
  <div class="wrap cols"><h2 id="lead-h">Who leads this</h2><div>{lead_html}</div></div>
</section>
{partners}
<section class="band{' white' if not s['partners'] else ''}" aria-labelledby="rel-h">
  <div class="wrap"><div class="band-head"><h2 id="rel-h">Related services</h2></div><div class="grid c2">{related}</div>
  <p style="margin-top:24px"><a class="arrow-link" href="how-we-work.html">How engagements run →</a></p></div>
</section>
''' + cta(), "services")

# (how-we-work.html folded into about.html)
# ------------------------------------------------------------------ Industries
tiles = "".join(f'<div class="tile"><h3>{e(n)}</h3><p>{e(t)}</p></div>' for n, t in INDUSTRIES)
shell("industries.html", "Industries", "Sectors Darwish & Co. serves across Egypt.",
hero("Industries", "Industries &amp; markets <span class=\"acc\">we serve</span>", "Localized strategic impact across Egypt, with selective regional relevance supported by specialized cross-market partnerships.", [("Home", "./"), ("Services", "services.html"), ("Industries", None)]) + f'''
<section class="band white" aria-label="Sectors">
  <div class="wrap">
    <div class="grid c3">{tiles}</div>
    <div class="notice">{INFO}<p>We work across government institutions, private-sector enterprises and development stakeholders. Sector assignments are accepted where relevant expertise, evidence and delivery capability can be clearly demonstrated.</p></div>
  </div>
</section>
''' + cta(), "services")

# ------------------------------------------------------------------ Our work + case pages
clients = [("mas-sofabed", "MAS Sofabed", "Manufacturing and retail"), ("ministry-water", "Egyptian Ministry of Water Resources & Irrigation", "Government"),
           ("tanmia", "Tanmia Petroleum Company", "Energy and petroleum"), ("nabta", "Nabta Advertising", "Media and advertising"),
           ("firewall", "Firewall Security", "Security"), ("nadim", "NADIM Group", "Furniture design and manufacturing"),
           ("itouch-plus", "iTouch Plus", "Electronics retail"), ("mafa-organic", "MAFA Organic", "Organic farming")]
# Logo use on the public site still needs each organization's approval (profile listing only). Approval notes live here, not on the page.
# Case cards come from this list; add an approved case by appending an entry. "public": False keeps an entry off the page.
WORK_CASES = [
    dict(public=True, href="case-furniture.html", sector="Furniture manufacturing",
         title="From low digital visibility to a GEO strategy",
         text="A focused assessment of marketing performance, digital presence, and search visibility identified Generative Engine Optimization as a growth opportunity.",
         service="Search visibility & GEO",
         img=("assets/work/furniture.jpg", 720, 510, "Illustrative photo: a living room furnished with a sofa and dining set.")),  # generic stock, not the client's product
    dict(public=True, href="case-organization.html", sector="Organizational development",
         title="From a performance question to a management development roadmap",
         text="A management assessment identified capability gaps in management practices, workplace communication, and employee effectiveness, informing a development roadmap.",
         service="Management development",
         img=("assets/work/org-development.jpg", 720, 566, "Illustrative photo: a team reviewing documents around a meeting table.")),  # generic stock, not the client's staff
    # Fictional. Kept for demo use only, labelled "Illustrative example — not a completed client engagement." Never public.
    dict(public=False, href=None, sector="Illustrative example — not a completed client engagement.",
         title="Turning expansion ambitions into a focused market-entry plan", text="", service="Growth & market expansion",
         img=("assets/work/illustrative-expansion.jpg", 720, 480, "Illustrative photo: a professional holding a hard hat and plans in a shared office.")),
]
def work_card(c):
    src, w, h, alt = c["img"]
    return f'''<li class="ow-card">
        <img src="{src}" alt="{e(alt)}" width="{w}" height="{h}" loading="lazy">
        <div class="ow-body">
          <p class="ow-sector">{e(c["sector"])}</p>
          <h3>{e(c["title"])}</h3>
          <p class="ow-text">{e(c["text"])}</p>
          <p class="ow-service">{e(c["service"])}</p>
          <a class="ow-more" href="{c["href"]}"><span class="cta-label">Read case study</span><span class="sr-only">: {e(c["title"])}</span><span aria-hidden="true"> →</span></a>
        </div>
      </li>'''
def logo_cell(f, n):
    if os.path.exists(os.path.join(OUT, "assets", "clients", f + ".png")):
        from struct import unpack
        w, h = unpack(">II", open(os.path.join(OUT, "assets", "clients", f + ".png"), "rb").read()[16:24])
        return f'<li><img src="assets/clients/{f}.png" alt="{e(n)}" width="{w}" height="{h}" loading="lazy"></li>'
    return f'<li><span class="ow-logo-name">{e(n)}</span></li>'
shell("our-work.html", "Our work", "Explore selected Darwish & Co. engagements in business diagnosis, organizational development, and growth advisory.", f'''<section class="page-hero dark ow-hero" aria-labelledby="page-title">
  <div class="wrap">
    <nav aria-label="Breadcrumb"><ol class="crumbs"><li><a href="./">Home</a></li><li aria-current="page">Our work</li></ol></nav>
    <h1 id="page-title">Our work</h1>
    <p class="sub">Selected engagements showing how diagnosis, advisory, and implementation guidance address business challenges.</p>
  </div>
</section>
<section class="band white ow-cases" aria-labelledby="cases-h">
  <div class="wrap">
    <h2 id="cases-h">Selected engagements</h2>
    <ul class="ow-grid">
      {"".join(work_card(c) for c in WORK_CASES if c["public"])}
    </ul>
  </div>
</section>
<section class="band ow-clients" aria-labelledby="clients-h">
  <div class="wrap">
    <h2 id="clients-h">Organizations we work with</h2>
    <p class="ow-lede">Selected organizations included in our corporate profile.</p>
    <ul class="ow-logos">{"".join(logo_cell(f, n) for f, n, _ in clients)}</ul>
  </div>
</section>
''' + cta("Have a similar challenge?").replace('<section class="cta-band"', '<section class="cta-band ow-cta" id="contact"', 1), "projects", full_title="Our Work | Darwish & Co.")

def case_page(file, label, title, challenge, scope, deliverables, outcome, img, alt):
    shell(file, title, challenge,
    hero(label, e(title), "", [("Home", "./"), ("Our work", "our-work.html"), (title, None)], f'<p>{SAMPLE}</p>') + f'''
<section class="band white" aria-label="Engagement">
  <div class="wrap cols">
    <img src="assets/work/{img}" alt="{e(alt)}" style="width:100%;aspect-ratio:4/3;object-fit:cover" loading="lazy">
    <ol class="numbered">
      <li><strong>Challenge</strong><span>{e(challenge)}</span></li>
      <li><strong>Darwish &amp; Co.’s role</strong><span>{e(scope)}</span></li>
      <li><strong>Deliverables</strong><span>{e(deliverables)}</span></li>
      <li><strong>Outcome</strong><span>{outcome}</span></li>
    </ol>
  </div>
</section>
''' + cta(), "projects")
case_page("case-furniture.html", "Furniture manufacturing", "From low digital visibility to a GEO strategy",
          "Limited digital visibility was restricting the brand’s ability to reach potential customers and support sales growth.",
          "A focused assessment of marketing performance, digital presence and search visibility, which identified generative engine optimization (GEO) as a key growth opportunity.",
          "Digital presence assessment; GEO strategy; content and visibility recommendations; implementation guidance.",
          'Improved visibility across AI-powered search environments. <span class="pending-text">[Measured result pending]</span>', "furniture.jpg", "Living room furnished with a sofa and dining set.")
case_page("case-organization.html", "Organizational development", "From a performance question to a management development roadmap",
          "The organization sought management advisory to improve internal performance. The assessment found underlying capability gaps in management practices, workplace communication and employee effectiveness.",
          "Management assessment, capability gap analysis and learning needs assessment.",
          "Management development roadmap; priority skills framework.",
          "Improved management awareness and workplace practices, supporting stronger employee effectiveness and organizational productivity.", "org-development.jpg", "Leadership team reviewing documents around a boardroom table.")

# ------------------------------------------------------------------ People + person pages
# (people.html folded into about.html)
# (individual expert profile pages removed 10 Oct 2026; experts live on about.html#experts)

# ------------------------------------------------------------------ Insights + article pages
# "preview" shows planned and sample articles with their status (the review prototype); "public" lists published articles only.
INSIGHTS_MODE = os.environ.get("INSIGHTS_MODE", "preview")
STATUS_TAG = {"planned": ("Planned article", "Preview draft"), "sample": ("Sample article", "Preview example"), "published": (None, "Read article")}
def insights_page(mode):
    shown = [a for a in ARTICLES if a["status"] == "published" or mode == "preview"]
    topics = [(k, v) for k, v in TOPICS if any(a["topic"] == k for a in shown)]
    def card(a):
        tag, verb = STATUS_TAG[a["status"]]
        meta = " · ".join(e(x) for x in (a.get("author"), a.get("date")) if x)
        return f'''<li class="in-card" data-topic="{a["topic"]}">
        <p class="in-topic">{e(dict(TOPICS)[a["topic"]])}</p>
        <h3>{e(a["title"])}</h3>
        <p class="in-sum">{e(a["listing"])}</p>
        {f'<p class="in-meta">{meta}</p>' if meta else ""}
        <div class="in-foot">{f'<span class="sample-tag">{tag}</span>' if tag else ""}<a class="in-more" href="article-{a["slug"]}.html"><span class="cta-label">{verb}</span><span class="sr-only">: {e(a["title"])}</span><span class="in-arrow" aria-hidden="true">→</span></a></div>
      </li>'''
    intro = '''<section class="page-hero dark ow-hero" aria-labelledby="page-title">
  <div class="wrap">
    <nav aria-label="Breadcrumb"><ol class="crumbs"><li><a href="./">Home</a></li><li aria-current="page">Insights</li></ol></nav>
    <h1 id="page-title">Insights</h1>
    <p class="sub">Practical perspectives on strategy, governance, people, operations, and growth.</p>
  </div>
</section>'''
    if shown:
        buttons = '<button type="button" data-value="all" aria-pressed="true">All topics</button>' + "".join(f'<button type="button" data-value="{k}" aria-pressed="false">{e(v)}</button>' for k, v in topics)
        body = f'''<div class="topic-filter" role="group" aria-label="Filter by topic" data-topics="{" ".join(k for k, _ in TOPICS)}">{buttons}</div>
    <p class="topic-count" id="topic-count" aria-live="polite">{len(shown)} article{"s" if len(shown) != 1 else ""}</p>
    <ul class="in-grid">{"".join(card(a) for a in shown)}</ul>
    <div class="in-empty" id="topic-empty" hidden><p>No articles are available in this topic yet.</p><button type="button" class="in-reset" data-reset>View all insights</button></div>'''
    else:
        body = '<div class="in-empty"><p><strong>Our first insights are being prepared.</strong></p><p>Please check back for practical perspectives from Darwish &amp; Co.</p></div>'
    return intro + f'''
<section class="band white in-list" aria-labelledby="list-h">
  <div class="wrap">
    <h2 id="list-h" class="sr-only">Articles</h2>
    {body}
  </div>
</section>
''' + cta("Have a challenge behind the question?", "Tell us what your organization is facing. We’ll help you frame the issue and identify a practical next step.").replace('<section class="cta-band"', '<section class="cta-band ow-cta" id="contact"', 1)
shell("insights.html", "Insights", "Explore Darwish & Co. perspectives on strategy, governance, organizational performance, operations, and business growth.",
      insights_page(INSIGHTS_MODE), "blog")
for a in ARTICLES:
    topic = dict(TOPICS)[a["topic"]]
    byline = '''<div class="mag-author" style="margin-top:8px"><img src="assets/people/fouad-darwish-avatar.jpg" alt="" width="44" height="44"><div><strong>Fouad Darwish</strong><span>Founder &amp; Managing Partner</span></div></div>''' if a.get("featured") else ""
    shell(f'article-{a["slug"]}.html', a["title"], a["summary"],
    hero(topic, e(a["title"]), e(a["summary"]), [("Home", "./"), ("Insights", "insights.html"), (a["title"], None)], byline + f'<p style="margin-top:6px">{SAMPLE}</p>') + f'''
<section class="band white" aria-label="Article">
  <div class="wrap cols">
    <div style="display:grid;gap:14px;align-content:start">
      <span class="k" style="font:600 14px/1.3 var(--sans);color:#006BA3">Related service</span>
      <a class="arrow-link" href="{svc_link(a["service"])}">{e(SVC[a["service"]]["title"])} →</a>
    </div>
    <div class="prose">
      <p class="pending-text">The approved article will replace this text. Articles naming Egyptian or Gulf laws or regulators need a named, qualified reviewer before publishing.</p>
      <h2>Why this matters</h2><p class="pending-text">[Approved text pending]</p>
      <h2>What good practice looks like</h2><p class="pending-text">[Approved text pending]</p>
      <h2>Where to start</h2><p class="pending-text">[Approved text pending]</p>
      <p><a class="arrow-link" href="insights.html">← Back to all insights</a></p>
    </div>
  </div>
</section>
''' + cta(), "blog")

# ------------------------------------------------------------------ Contact
form = src[src.index('<form class="cform" id="contact-form"'): src.index('</div>\n', src.index('<div class="cf-success"')) + len('</div>\n')]
form = form.replace('<form class="cform" id="contact-form"', '<form class="cform form-light" id="contact-form"')
shell("contact.html", "Contact", "Discuss your business challenge with Darwish & Co.",
hero("Let’s talk", "Discuss your <span class=\"acc\">business challenge</span>", "Share a brief overview of your challenge. Our team will review it and contact you to agree on the next step.", [("Home", "./"), ("Contact", None)]) + f'''
<section class="band white" aria-label="Contact form and details">
  <div class="wrap contact-cols">
    <div>{form}</div>
    <div class="contact-panel">
      <dl style="display:grid;gap:18px;margin:0">
        <div><dt>Office</dt><dd>Office T-10, 3rd Floor, RIO Mall, Dr. Ahmed Okasha St., off Sadat Axis, New Cairo, Cairo Governorate, Egypt</dd></div>
        <div><dt>Phone</dt><dd><a href="tel:+201101101090">+20 110 110 1090</a></dd></div>
        <div><dt>Email</dt><dd><a href="mailto:info@darwish-co.com">info@darwish-co.com</a></dd></div>
        <div><dt>Hours</dt><dd class="pending-text">[Office hours to be confirmed]</dd></div>
      </dl>
      <div class="map-slot" role="img" aria-label="Placeholder for the office map">Office map<br>(Google Business Profile link to be confirmed)</div>
    </div>
  </div>
</section>
''')

# ------------------------------------------------------------------ Privacy, Growth 360, 404
shell("privacy.html", "Privacy policy", "How Darwish & Co. handles personal information.",
hero("", "Privacy policy", "", [("Home", "./"), ("Privacy policy", None)], f'<p>{SAMPLE}</p>') + '''
<section class="band white" aria-label="Policy">
  <div class="wrap"><div class="prose">
    <p class="pending-text">The approved privacy policy will replace this page. The headings show the intended structure only.</p>
    <h2>Information we collect</h2><p class="pending-text">[Policy text pending approval]</p>
    <h2>How we use it</h2><p class="pending-text">[Policy text pending approval]</p>
    <h2>How long we keep it</h2><p class="pending-text">[Policy text pending approval]</p>
    <h2>Your rights and how to contact us</h2><p class="pending-text">[Policy text pending approval]</p>
  </div></div>
</section>
''')
shell("growth-360.html", "Growth 360", "Growth 360: from business diagnosis to integrated growth execution.",
hero("Growth 360", "Growth <span class=\"acc\">360</span>", "From business diagnosis to integrated growth execution.", [("Home", "./"), ("Growth 360", None)], f'<p>{SAMPLE}</p>') + f'''
<section class="band white" aria-label="Status">
  <div class="wrap"><div class="notice" style="margin:0">{INFO}<p>This page’s format is being agreed between Darwish &amp; Co. and Growthino: a standalone joint product page, or no separate page. Content will be added once that decision is made.</p></div></div>
</section>
''' + cta())
shell("404.html", "Page not found", "The page you were looking for does not exist.",
hero("", '<span class="big-404">404</span><br>Page not found', "The page may have moved, or the address may be mistyped.", None,
     '<div class="btns" style="margin-top:8px"><a class="btn btn-blue" href="./"><span class="cta-label">Go to the homepage</span></a><a class="btn btn-ghost" href="services.html"><span class="cta-label">Browse services</span></a></div>'))

pages = sorted(f for f in os.listdir(OUT) if f.endswith(".html"))
print(len(pages), "pages:", ", ".join(pages))
