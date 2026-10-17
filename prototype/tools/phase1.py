# Phase 1 of the founder's revision report, applied to the homepage prototype.
# Each step asserts the exact text it replaces, so a mismatch stops the script instead of silently skipping.
import re, sys

path = sys.argv[1]
s = open(path, encoding="utf-8").read()

def rep(old, new, count=1):
    global s
    n = s.count(old)
    assert n == count, f"expected {count} of: {old[:80]!r}, found {n}"
    s = s.replace(old, new)

def cut(start, end):
    """Return (i, j) spanning from `start` up to (not including) `end`."""
    i = s.index(start); j = s.index(end, i)
    return i, j

# ---------------------------------------------------------------- 1. Navigation (Marker 1)
# Remove Growth 360; About -> "About us" and move it ahead of "Our work".
rep('        <li><a class="nav-link" href="/growth-360">Growth 360</a></li>\n', '')
i, j = cut('        <li><a class="nav-link" href="/projects">Our work</a></li>\n', '        <li><a class="nav-link" href="/blog">Insights</a></li>')
block = s[i:j]
our_work = '        <li><a class="nav-link" href="/projects">Our work</a></li>\n'
about = block[len(our_work):]
s = s[:i] + about + our_work + s[j:]
rep('aria-controls="menu-about">About <svg', 'aria-controls="menu-about">About us <svg')

rep('        <li class="m-row"><a href="/growth-360">Growth 360</a></li>\n', '')
i, j = cut('        <li class="m-row"><a href="/projects">Our work</a></li>\n', '        <li class="m-row"><a href="/blog">Insights</a></li>')
block = s[i:j]
m_work = '        <li class="m-row"><a href="/projects">Our work</a></li>\n'
s = s[:i] + block[len(m_work):] + m_work + s[j:]
rep('aria-controls="m-about">About <svg', 'aria-controls="m-about">About us <svg')

# Every "Discuss your challenge" button goes to the form on this page.
s, n = re.subn(r'(<a class="btn [^"]*" )href="/contact"(><span class="cta-label">Discuss your challenge</span></a>)', r'\1href="#contact"\2', s)
assert n >= 4, n

# ---------------------------------------------------------------- 2. Hero value statement (Section 02)
rep('<p class="sub">We help organizations turn strategic priorities into informed decisions, stronger governance and measurable performance.</p>',
    '<p class="sub">We help organizations improve performance, strengthen governance, and turn growth priorities into practical action.</p>')

# ---------------------------------------------------------------- 3. About: new wording + founder (Markers 3 and 4)
# Lift the founder block out of the contact section; it moves into About unchanged.
i = s.index('      <div class="founder">'); j = s.index('      </div>\n', s.index('</figure>', i)) + len('      </div>\n')
founder = s[i:j]
s = s[:i] + '@@CONTACT_PHOTO@@\n' + s[j:]
founder = founder.replace('<div class="founder">', '<div class="founder" id="founder">')

i, j = cut('  <!-- Who we are -->', '  <!-- What we do -->')
s = s[:i] + '''  <!-- Who we are -->
  <section class="section" aria-labelledby="who-title" id="about">
    <div class="wrap about-grid">
      <div class="about-copy">
        <span class="pill">Who we are</span>
        <h2 id="who-title">Advisory that improves the <span class="acc">quality of decisions</span></h2>
        <p>Darwish &amp; Co. is a consulting firm based in Egypt, helping organizations improve performance, strengthen governance, and pursue sustainable growth.</p>
      </div>
''' + founder + '''    </div>
  </section>

''' + s[j:]

# ---------------------------------------------------------------- 4. Contact: photo placeholder + inline form (Markers 9 and 10)
rep('@@CONTACT_PHOTO@@\n', '''      <div class="contact-photo" role="img" aria-label="Placeholder for a photograph of an office meeting table">
        <span>Office meeting photograph<br>to be supplied</span>
      </div>
''')
i, j = cut('        <div class="contact-cta">', '        <div class="contact-direct">')
s = s[:i] + '''        <p class="contact-hint">Share a brief overview of your challenge. Our team will review it and contact you to agree on the next step.</p>
        <form class="cform" id="contact-form" novalidate aria-label="Discuss your challenge">
          <div class="cf-row">
            <div class="cf-field">
              <label for="cf-name">Name</label>
              <input id="cf-name" name="name" type="text" autocomplete="name" required aria-describedby="cf-name-err">
              <p class="cf-err" id="cf-name-err" hidden></p>
            </div>
            <div class="cf-field">
              <label for="cf-company">Company</label>
              <input id="cf-company" name="company" type="text" autocomplete="organization" required aria-describedby="cf-company-err">
              <p class="cf-err" id="cf-company-err" hidden></p>
            </div>
          </div>
          <div class="cf-field">
            <label for="cf-contact">Email or phone</label>
            <input id="cf-contact" name="contact" type="text" autocomplete="email" required aria-describedby="cf-contact-err">
            <p class="cf-err" id="cf-contact-err" hidden></p>
          </div>
          <div class="cf-field">
            <label for="cf-challenge">Your business challenge</label>
            <textarea id="cf-challenge" name="challenge" rows="4" required aria-describedby="cf-challenge-err"></textarea>
            <p class="cf-err" id="cf-challenge-err" hidden></p>
          </div>
          <p class="cf-privacy">We use these details only to respond to your enquiry. See our <a href="/privacy">privacy policy</a>.</p>
          <div class="cf-actions">
            <button class="btn btn-blue" type="submit"><span class="cta-label">Discuss your challenge</span></button>
            <p class="cf-status" role="status" aria-live="polite"></p>
          </div>
        </form>
        <div class="cf-success" id="cf-success" tabindex="-1" hidden>
          <p>Thank you. Your request has been received. Our team will review the information and contact you to agree on the next step.</p>
        </div>
''' + s[j:]

# ---------------------------------------------------------------- 5. Insights label (Marker 11)
rep('      <div class="mag-left">\n        <h2 id="in-title">Insights</h2>',
    '      <div class="mag-left">\n        <span class="pill">Our perspectives</span>\n        <h2 id="in-title">Insights</h2>')

# ---------------------------------------------------------------- 6. FAQs: buyer questions, no pricing (Marker 12)
i, j = cut('      <div class="faqs">', '    </div>\n  </section>\n</main>')
s = s[:i] + '''      <div class="faqs">
        <details open><summary>Do I need to know which service I require before contacting you?</summary><p>No. We begin by understanding your business challenge and priorities to identify the appropriate advisory scope.</p></details>
        <details><summary>What does an engagement include?</summary><p>Each proposal defines the advisory sessions, reviews, deliverables and follow-up activities. Any additional work is specified separately.</p></details>
        <details><summary>Do you support implementation or only provide recommendations?</summary><p>Darwish &amp; Co. provides diagnosis, strategy, advisory oversight and performance review. Specialist implementation is delivered by the entities identified in the project scope.</p></details>
        <details><summary>How are consulting results measured?</summary><p>We agree success measures linked to the project objective, such as performance improvement, cost reduction or operational efficiency, and review progress against the engagement plan.</p></details>
      </div>
''' + s[j:]

# ---------------------------------------------------------------- 7. Footer: client portal, socials, privacy (Marker 13)
icon = {
 "LinkedIn": '<path d="M5 3.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM1.2 8h3.6v13H1.2zM8.2 8h3.5v1.8h.05c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V21h-3.6v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V21H8.2z"/>',
 "Facebook": '<path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z"/>',
 "Instagram": '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.2"/>',
 "X": '<path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/>',
}
socials = "\n".join(
    f'        <li><a href="#social" data-pending="{name}" aria-label="Darwish &amp; Co. on {name} (link to be confirmed)"><svg viewBox="0 0 24 24" aria-hidden="true">{svg}</svg></a></li>'
    for name, svg in icon.items())
rep('    <div class="foot-bottom"><span>© 2026 Darwish &amp; Co.</span><a href="/privacy">Privacy</a></div>',
    '''    <div class="foot-bottom">
      <span>© 2026 Darwish &amp; Co.</span>
      <div class="foot-util">
        <a class="portal-link" href="/client-login"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Client portal</a>
        <a href="/privacy">Privacy</a>
      </div>
      <ul class="socials" aria-label="Darwish &amp; Co. on social media">
''' + socials + '''
      </ul>
    </div>''')

# ---------------------------------------------------------------- 8. Styles
css = '''
/* ---- Phase 1 (founder revision report, 9 Oct 2026) ---- */
/* About: copy beside the founder portrait and quote */
.about-grid { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 64px; align-items: center; }
.about-copy { display: grid; gap: 22px; justify-items: start; }
.about-copy p { font-size: 19px; line-height: 1.6; color: var(--charcoal); max-width: 50ch; }
@media (max-width: 899px) { .about-grid { grid-template-columns: minmax(0, 1fr); gap: 44px; } .about-copy p { font-size: 17px; } }

/* Contact: photo placeholder until a real office photograph is supplied */
.contact-photo { width: min(100%, 440px); aspect-ratio: 4 / 5; justify-self: end; display: grid; place-items: center; padding: 24px; text-align: center;
  background: repeating-linear-gradient(135deg, #22405F 0 14px, #1E3652 14px 28px); border: 1px dashed rgba(201, 211, 222, .45); color: var(--on-navy); font: 500 15px/1.5 var(--sans); }
@media (max-width: 899px) { .contact-photo { justify-self: center; aspect-ratio: 16 / 10; } }

/* Contact form on navy */
.cform { display: grid; gap: 18px; width: 100%; max-width: 560px; }
.cf-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
@media (max-width: 599px) { .cf-row { grid-template-columns: minmax(0, 1fr); } }
.cf-field { display: grid; gap: 6px; min-width: 0; }
.cf-field label { font: 600 15px/1.3 var(--sans); color: var(--white); }
.cf-field input, .cf-field textarea { width: 100%; min-height: 48px; padding: 12px 14px; border: 1px solid rgba(201, 211, 222, .5); background: var(--white); color: var(--charcoal); font: 400 16px/1.5 var(--sans); }
.cf-field textarea { resize: vertical; min-height: 120px; }
.cf-field input:focus-visible, .cf-field textarea:focus-visible { outline: 3px solid #8FD6F8; outline-offset: 1px; border-color: var(--white); }
.cf-field [aria-invalid="true"] { border: 2px solid #FF9C9C; }
.cf-err { font: 500 14px/1.4 var(--sans); color: #FFC2C2; }
.cf-privacy { font: 400 14px/1.5 var(--sans); color: var(--on-navy); }
.cf-privacy a { color: #8FD6F8; }
.cf-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 18px; }
.cf-status { font: 500 15px/1.4 var(--sans); color: var(--on-navy); }
.cf-status.is-error { color: #FFC2C2; }
.cform button[disabled] { opacity: .7; cursor: progress; }
.cf-success { width: 100%; max-width: 560px; padding: 24px; border: 1px solid rgba(143, 214, 248, .5); background: rgba(255, 255, 255, .06); }
.cf-success p { font: 500 17px/1.6 var(--sans); color: var(--white); }
.cf-success:focus-visible { outline: 2px solid #8FD6F8; outline-offset: 3px; }

/* Insights label on the gradient panel */
.mag-left .pill { align-self: flex-start; background: rgba(255, 255, 255, .1); border-color: rgba(255, 255, 255, .4); color: var(--white); }

/* Footer utility row: client portal, privacy, social icons */
.foot-bottom { align-items: center; }
.foot-util { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 24px; }
.foot-util a { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; color: var(--on-navy); }
.foot-util a:hover { color: #8FD6F8; }
.portal-link svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linejoin: round; }
.socials { list-style: none; margin: 0; padding: 0; display: flex; gap: 8px; }
.socials a { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid var(--line-navy); color: var(--white); }
.socials a:hover { color: #8FD6F8; border-color: #8FD6F8; }
.socials a:focus-visible, .foot-util a:focus-visible { outline: 2px solid #8FD6F8; outline-offset: 2px; }
.socials svg { width: 18px; height: 18px; fill: currentColor; }

/* Readability on phones: descriptive text at 16px */
@media (max-width: 599px) {
  .m p, .ch-desc p, .mag-glass p, .industry p, .arm p, .g-card p, .svc-tag, .contact-hint, .fact small, .wcard-label, .faqs details p { font-size: 16px; }
}
'''
i = s.rindex('</style>'); s = s[:i] + css + s[i:]

# Sharp corners everywhere (Section 03 / Marker 6), except things that are round by nature (50%).
def square(m):
    return m.group(0) if "50%" in m.group(2) or "inherit" in m.group(2) else m.group(1) + "0"
style_i, style_j = s.index("<style>"), s.index("</style>")
css_all = s[style_i:style_j]
css_all = re.sub(r"(border(?:-(?:start|end)-(?:start|end))?-radius\s*:\s*)([^;}]+)", square, css_all)
# Small text up to 14px minimum (Section 03): only inside font declarations.
def bump(m):
    return re.sub(r"(?<![\d.])(?:12|12\.5|13|13\.5)px", "14px", m.group(0))
css_all = re.sub(r"font(?:-size)?\s*:[^;{}]*", bump, css_all)
s = s[:style_i] + css_all + s[style_j:]

# ---------------------------------------------------------------- 9. Script: form behaviour + pending social links
js = '''
  // Contact form (prototype): checks the four fields, then simulates sending. On success the form is replaced by the
  // founder's confirmation message; on failure the visitor's text stays in place. Real delivery is wired up in Phase 3.
  (function () {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var ok = document.getElementById("cf-success");
    var status = form.querySelector(".cf-status");
    var btn = form.querySelector('button[type="submit"]');
    var rules = {
      "cf-name": function (v) { return v ? "" : "Please enter your name."; },
      "cf-company": function (v) { return v ? "" : "Please enter your company or organization."; },
      "cf-contact": function (v) {
        if (!v) return "Please enter an email address or phone number.";
        var email = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v), phone = /^\\+?[\\d\\s()-]{7,}$/.test(v);
        return email || phone ? "" : "Enter a valid email address or a phone number with at least 7 digits.";
      },
      "cf-challenge": function (v) { return v.length >= 10 ? "" : "Please describe your challenge in a sentence or two."; }
    };
    function check(id) {
      var el = document.getElementById(id), err = document.getElementById(id + "-err");
      var msg = rules[id](el.value.trim());
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      err.textContent = msg; err.hidden = !msg;
      return !msg;
    }
    Object.keys(rules).forEach(function (id) {
      document.getElementById(id).addEventListener("blur", function () { if (this.getAttribute("aria-invalid")) check(id); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(rules).forEach(function (id) { if (!check(id) && !firstBad) firstBad = document.getElementById(id); });
      if (firstBad) { status.className = "cf-status is-error"; status.textContent = "Please check the highlighted fields."; firstBad.focus(); return; }
      btn.disabled = true; status.className = "cf-status"; status.textContent = "Sending…";
      setTimeout(function () {
        btn.disabled = false;
        if (navigator.onLine === false) {
          status.className = "cf-status is-error";
          status.textContent = "We couldn’t send your request. Please check your connection and try again. Your details are still in the form.";
          return;
        }
        status.textContent = "";
        form.hidden = true; ok.hidden = false; ok.focus();
      }, 900);
    });
  })();

  // Social links are placeholders until the official account addresses are confirmed.
  document.querySelectorAll("a[data-pending]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var t = document.querySelector(".toast");
      t.textContent = "The official " + a.dataset.pending + " link will be added once the account address is confirmed.";
      t.hidden = false; clearTimeout(t._timer); t._timer = setTimeout(function () { t.hidden = true; }, 3500);
    });
  });
'''
marker = '  // Hero video: plays muted on loop'
rep(marker, js.lstrip("\n") + "\n" + marker)

# ---------------------------------------------------------------- 10. Review notes (kept, hidden)
rep('{ id: "n-founder-photo", target: "contact",', '{ id: "n-founder-photo", target: "founder",')
rep('    { id: "n-photos", target: "work",',
    '    { id: "n-contact-photo", target: "contact", title: "Contact photo", text: "The contact section shows a placeholder until a real photograph of the office meeting table is supplied (founder report, Marker 9)." },\n'
    '    { id: "n-form", target: "contact", title: "Contact form", text: "The form validates and shows the approved confirmation message, but sending is simulated in this prototype. Phase 3 connects it to the real contact system and tests a live enquiry." },\n'
    '    { id: "n-social", target: "contact", title: "Social and portal links", text: "LinkedIn, Facebook, Instagram and X links are placeholders until the official account addresses are confirmed; hide any platform without an active account. Confirm the client portal address." },\n'
    '    { id: "n-photos", target: "work",')

open(path, "w", encoding="utf-8").write(s)
print("phase 1 applied")
