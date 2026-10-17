# Redesigned service-detail template. Layout follows the Devoteam service page (split hero, advisory strip,
# challenge list, benefits band, staged journey, tools, ecosystem, alternating grid, engagement examples,
# insights, advisors, contact, FAQ); typography, colour, square corners and copy are Darwish & Co.'s.
# Styles are scoped to .sx so the other pages are untouched.
import html
e = html.escape

# ------------------------------------------------------------------ small line icons (24px grid, stroke)
ICONS = {
  "target": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  "people": '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.6 2.7-6 6-6s6 2.4 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M16 14.2c2.8.2 5 2.3 5 5.8"/>',
  "gauge": '<path d="M3.5 17a8.5 8.5 0 1 1 17 0"/><path d="M12 17l4-6"/><path d="M3.5 17h17"/>',
  "check": '<rect x="4" y="4" width="16" height="16"/><path d="M8 12.5l3 3 5-6"/>',
  "bars": '<path d="M5 20V11M12 20V5M19 20v-6"/><path d="M3 20h18"/>',
  "cycle": '<path d="M19.5 12a7.5 7.5 0 0 1-13 5.1"/><path d="M4.5 12a7.5 7.5 0 0 1 13-5.1"/><path d="M17.5 3.5v3.4h-3.4M6.5 20.5v-3.4h3.4"/>',
  "search": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>',
  "org": '<rect x="9" y="3" width="6" height="5"/><rect x="3" y="16" width="6" height="5"/><rect x="15" y="16" width="6" height="5"/><path d="M12 8v4M6 16v-4h12v4"/>',
  "flow": '<rect x="3" y="9" width="5" height="6"/><rect x="16" y="9" width="5" height="6"/><path d="M8 12h8M13 9.5l3 2.5-3 2.5"/>',
  "process": '<path d="M3 6h11M3 12h16M3 18h8"/><path d="M16 15l4 3-4 3"/><circle cx="17" cy="6" r="2"/>',
  "project": '<rect x="3" y="4" width="18" height="16"/><path d="M3 9h18M9 9v11"/><path d="M12.5 13.5h5M12.5 16.5h3"/>',
  "doc": '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6M9 19h4"/>',
  "checklist": '<rect x="4" y="3" width="16" height="18"/><path d="M8 8.5l1.5 1.5 2.5-3M8 14.5l1.5 1.5 2.5-3M14 9h3M14 15h3"/>',
  "screen": '<rect x="3" y="4" width="18" height="12"/><path d="M8 20h8M12 16v4"/><path d="M7 12l3-3 2.5 2 4.5-4"/>',
}
def icon(name, cls="sx-ico"):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>'
CHEVRON = '<svg class="sx-chev" viewBox="0 0 20 28" aria-hidden="true"><path d="M4 3l11 11L4 25"/></svg>'
PLUS = '<svg class="sx-plus" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12"/></svg>'

# ------------------------------------------------------------------ diagrams (original SVG, conceptual only)
def hero_map(m):
    (n1, s1), (n2, s2), (n3, s3) = m["nodes"]
    l1, l2, l3, l4 = m["labels"]
    def node(x, y, idx, title, sub, hi=False):
        return (f'<rect class="hm-node{" hi" if hi else ""}" x="{x}" y="{y}" width="220" height="92"/>'
                f'<text class="hm-idx" x="{x+20}" y="{y+28}">{idx}</text>'
                f'<text class="hm-title" x="{x+20}" y="{y+58}">{e(title)}</text>'
                f'<text class="hm-sub" x="{x+20}" y="{y+80}">{e(sub)}</text>')
    def tag(x, y, w, t):
        return f'<rect class="hm-tag" x="{x}" y="{y}" width="{w}" height="36"/><text class="hm-tagt" x="{x+14}" y="{y+23}">{e(t)}</text>'
    return f'''<svg class="sx-map" viewBox="0 0 560 470" role="img" aria-labelledby="hm-t hm-d">
  <title id="hm-t">Strategy map: {e(n1)}, {e(n2)} and {e(n3)}</title>
  <desc id="hm-d">A conceptual diagram. {e(n1)} leads to {e(n2)}, which leads to {e(n3)}; a review loop feeds back into {e(n1)}. Supporting elements: {e(l1)}, {e(l2)}, {e(l3)} and {e(l4)}.</desc>
  <defs>
    <pattern id="hm-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="rgba(201,211,222,.07)"/></pattern>
    <marker id="hm-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#00A3F0"/></marker>
  </defs>
  <rect width="560" height="470" fill="url(#hm-grid)"/>
  <path class="hm-flow" d="M150 132V160H420V184" marker-end="url(#hm-arr)"/>
  <path class="hm-flow" d="M420 280V308H150V332" marker-end="url(#hm-arr)"/>
  <path class="hm-loop" d="M40 380H18V86H36" marker-end="url(#hm-arr)"/>
  <text class="hm-loopt" transform="translate(12 300) rotate(-90)">Review loop</text>
  <path class="hm-link" d="M260 86H300M190 234H310M260 352H300M260 404H300"/>
  {node(40, 40, "01", n1, s1)}
  {node(310, 188, "02", n2, s2, True)}
  {node(40, 336, "03", n3, s3)}
  {tag(300, 68, 150, l1)}
  {tag(40, 216, 150, l2)}
  {tag(300, 334, 120, l3)}
  {tag(300, 386, 170, l4)}
</svg>'''

def hero_map_compact(m):
    tags = [[m["labels"][0]], [m["labels"][1]], m["labels"][2:]]
    items = "".join(f'<li><span class="hmc-i">{i+1:02d}</span><strong>{e(t)}</strong><span class="hmc-s">{e(sub)}</span><span class="hmc-tags">{"".join(f"<span>{e(x)}</span>" for x in tags[i])}</span></li>'
                    for i, (t, sub) in enumerate(m["nodes"]))
    return f'<ol class="sx-map-c" aria-label="Strategy map">{items}<li class="hmc-loop">Review loop back to {e(m["nodes"][0][0])}</li></ol>'

def stage_visual(kind, uid):
    # Light diagrams for the journey panel. Labels are generic; no values, durations or results.
    head = f'<svg class="sx-dia" viewBox="0 0 600 440" role="img" aria-labelledby="{uid}-t">'
    if kind == "matrix":
        cells = [("Business direction", 40, 40), ("People", 310, 40), ("Operations", 40, 230), ("Performance", 310, 230)]
        body = "".join(f'<rect class="d-cell" x="{x}" y="{y}" width="250" height="170"/><text class="d-lab" x="{x+20}" y="{y + (34 if y < 100 else 150)}">{t}</text>'
                       + "".join(f'<rect class="d-line" x="{x+20}" y="{y + oy + (58 if y < 100 else 40)}" width="{w}" height="8"/>' for oy, w in ((0, 150), (20, 190), (40, 120))) for t, x, y in cells)
        body += '<rect class="d-core" x="225" y="176" width="150" height="88"/><text class="d-coret" x="300" y="215" text-anchor="middle">Priority</text><text class="d-coret" x="300" y="241" text-anchor="middle">issues</text>'
        return head + f'<title id="{uid}-t">Diagnostic matrix: business direction, people, operations and performance, converging on priority issues</title>' + body + '</svg>'
    if kind == "map":
        body = '<rect class="d-core" x="150" y="30" width="300" height="70"/><text class="d-coret" x="300" y="72" text-anchor="middle">Ambition</text>'
        px = [40, 220, 400]
        for i, x in enumerate(px):
            body += f'<path class="d-conn" d="M300 100V128H{x+80}V160"/>'
            body += f'<rect class="d-cell hi" x="{x}" y="160" width="160" height="64"/><text class="d-lab" x="{x+80}" y="198" text-anchor="middle">Priority {i+1}</text>'
            for j, ox in enumerate((x, x + 84)):
                body += f'<path class="d-conn" d="M{x+80} 224V256H{ox+38}V290"/>'
                body += f'<rect class="d-cell" x="{ox}" y="290" width="76" height="110"/><text class="d-sm d-xs" x="{ox+38}" y="318" text-anchor="middle">Objective</text>'
                body += f'<rect class="d-line" x="{ox+12}" y="340" width="52" height="7"/><rect class="d-line" x="{ox+12}" y="356" width="40" height="7"/><rect class="d-line" x="{ox+12}" y="372" width="48" height="7"/>'
        return head + f'<title id="{uid}-t">Strategy map from ambition to priorities to objectives</title>' + body + '</svg>'
    if kind == "roadmap":
        body = '<text class="d-sm" x="40" y="44">Initiative</text>'
        for i, ph in enumerate(("Phase 1", "Phase 2", "Phase 3")):
            x = 200 + i * 130
            body += f'<rect class="d-phase" x="{x}" y="26" width="126" height="28"/><text class="d-sm" x="{x+63}" y="45" text-anchor="middle">{ph}</text><path class="d-grid" d="M{x} 60V400"/>'
        body += '<path class="d-grid" d="M590 60V400"/>'
        rows = [("Initiative A", 200, 210, "Owner"), ("Initiative B", 260, 220, "Owner"), ("Initiative C", 330, 170, "Owner"), ("Initiative D", 420, 160, "Owner")]
        for i, (t, x, w, o) in enumerate(rows):
            y = 84 + i * 76
            body += f'<text class="d-lab" x="40" y="{y+26}">{t}</text><text class="d-sm" x="40" y="{y+46}">{o}</text>'
            body += f'<rect class="d-bar{" hi" if i == 1 else ""}" x="{x}" y="{y+8}" width="{w}" height="30"/>'
            body += f'<path class="d-mile" d="M{x+w} {y+12}l11 11-11 11-11-11z"/>'
        body += '<path class="d-dep" d="M410 115V160H460V176"/>'
        return head + f'<title id="{uid}-t">Illustrative roadmap: four initiatives across three phases, with owners, milestones and a dependency</title>' + body + '</svg>'
    # cycle
    pts = [("Measure", 300, 70), ("Review", 500, 220), ("Decide", 300, 370), ("Act", 100, 220)]
    body = '<circle class="d-ring" cx="300" cy="220" r="150"/>'
    body += '<rect class="d-core" x="210" y="180" width="180" height="80"/><text class="d-coret" x="300" y="216" text-anchor="middle">Review</text><text class="d-coret" x="300" y="242" text-anchor="middle">rhythm</text>'
    for t, x, y in pts:
        body += f'<rect class="d-cell hi" x="{x-70}" y="{y-28}" width="140" height="56"/><text class="d-lab" x="{x}" y="{y+6}" text-anchor="middle">{t}</text>'
    for d in ("M383 96l14 8-14 8", "M512 300l-6 15-12-10", "M217 344l-14-8 14-8", "M88 140l6-15 12 10"):
        body += f'<path class="d-arrow" d="{d}"/>'
    return head + f'<title id="{uid}-t">Review cycle: measure, review, decide and act around a review rhythm</title>' + body + '</svg>'

def insight_visual(kind):
    if kind == "momentum":
        return '''<svg class="sx-ivis" viewBox="0 0 640 400" role="img" aria-labelledby="iv-m"><title id="iv-m">Conceptual chart: momentum rising to an approval point, then fading</title>
<rect width="640" height="400" class="iv-bg"/><path class="iv-grid" d="M60 80H600M60 160H600M60 240H600M60 320H600"/>
<path class="iv-line" d="M60 320C150 300 220 180 300 120"/><path class="iv-fade" d="M300 120C380 140 460 240 600 300"/>
<path class="iv-mark" d="M300 70V340"/><rect class="iv-tag" x="250" y="40" width="100" height="30"/><text class="iv-tagt" x="300" y="60" text-anchor="middle">Approval</text>
<text class="iv-ax" x="60" y="370">Planning</text><text class="iv-ax" x="600" y="370" text-anchor="end">Execution</text></svg>'''
    return '''<svg class="sx-ivis" viewBox="0 0 400 300" role="img" aria-labelledby="iv-k"><title id="iv-k">Conceptual scorecard with objectives, measures and owners</title>
<rect width="400" height="300" class="iv-bg"/><rect class="iv-card" x="40" y="40" width="320" height="220"/>
<path class="iv-grid" d="M40 92H360M40 148H360M40 204H360M170 40V260M270 40V260"/>
<text class="iv-ax" x="56" y="72">Objective</text><text class="iv-ax" x="186" y="72">Measure</text><text class="iv-ax" x="286" y="72">Owner</text>
<rect class="iv-cell" x="56" y="112" width="90" height="16"/><rect class="iv-cell" x="186" y="112" width="64" height="16"/><rect class="iv-cell hi" x="286" y="112" width="52" height="16"/>
<rect class="iv-cell" x="56" y="168" width="76" height="16"/><rect class="iv-cell" x="186" y="168" width="70" height="16"/><rect class="iv-cell hi" x="286" y="168" width="52" height="16"/>
<rect class="iv-cell" x="56" y="224" width="96" height="16"/><rect class="iv-cell" x="186" y="224" width="58" height="16"/><rect class="iv-cell hi" x="286" y="224" width="52" height="16"/></svg>'''


# ------------------------------------------------------------------ shared contact block
def field(fid, label, typ="text", req=True, auto="", rule="text", empty=""):
    common = f'id="{fid}" name="{fid}" aria-describedby="{fid}-err" data-rule="{rule}" data-empty="{e(empty)}"{" required" if req else ""}'
    tag = f'<textarea {common} rows="4"></textarea>' if typ == "textarea" else f'<input {common} type="{typ}" autocomplete="{auto}">'
    opt = "" if req else ' <span class="sx-opt">(optional)</span>'
    return f'<div class="sx-field"><label for="{fid}">{e(label)}{opt}</label>{tag}<p class="sx-err" id="{fid}-err" hidden></p></div>'

def contact_section(title, text, fields, privacy, lead="", service=""):
    hidden = f'<input type="hidden" name="service" value="{e(service)}">' if service else ""
    lead_html = f'<p class="sx-flead">{e(lead)}</p>' if lead else ""
    return f'''<section class="sx-contact" id="contact" aria-labelledby="sx-ct-h"><div class="sx-wrap sx-ct">
  <div class="sx-ct-copy">
    <h2 id="sx-ct-h" class="sx-h2">{e(title)}</h2>
    <p>{e(text)}</p>
    <ul class="sx-ct-alt">
      <li><span>Email</span><a href="mailto:info@darwish-co.com">info@darwish-co.com</a></li>
      <li><span>Phone</span><a href="tel:+201101101090">+20 110 110 1090</a></li>
    </ul>
  </div>
  <form class="sx-form" novalidate>
    {lead_html}<p class="sx-req">All fields are required unless marked optional.</p>
    {hidden}{fields}
    <p class="sx-privacy">{privacy}</p>
    <button class="btn btn-navy sx-submit" type="submit"><span class="cta-label">Discuss your challenge</span></button>
    <div class="sx-status" role="status" tabindex="-1" hidden></div>
  </form>
</div></section>'''

# ------------------------------------------------------------------ page body
def render(s, d, people, crumbs_html, form_privacy):
    if d.get("layout") == "gov":
        return render_gov(s, d, people, crumbs_html)
    if d.get("layout") == "close":
        return render_close(s, d, people, crumbs_html)
    if d.get("layout") == "research":
        return render_research(s, d, people, crumbs_html)
    if d.get("layout") == "deal":
        return render_deal(s, d, people, crumbs_html)
    if d.get("layout") == "growth":
        return render_growth(s, d, people, crumbs_html)
    if d.get("layout") == "ops":
        return render_ops(s, d, people, crumbs_html)
    if d.get("layout") == "people":
        return render_people(s, d, people, crumbs_html)
    h = d["hero"]
    out = []
    # 1. Split hero
    out.append(f'''<div class="sx">
<section class="page-hero sx-hero gv-hero dark has-photo" aria-labelledby="page-title">
  {asset_slot(*h["slot"], "gv-hero-slot")}
  <div class="sx-wrap gv-hero-in">
    <div class="sx-hero-copy gv-hero-copy">
      {crumbs_html}
      <span class="sx-eyebrow">{e(h["label"])}</span>
      <h1 id="page-title">{e(h["title"])}</h1>
      <p class="sx-lede">{e(h["intro"])}</p>
      <div class="sx-ctas">
        <a class="btn btn-blue" href="#contact"><span class="cta-label">Discuss your challenge</span></a>
        <a class="btn btn-ghost" href="#journey"><span class="cta-label">Explore our approach</span></a>
      </div>
    </div>
  </div>
</section>''')
    # 2. Advisory strip
    out.append('<section class="sx-strip" aria-label="How we advise"><div class="sx-wrap"><ul class="sx-strip-list">' +
               "".join(f'<li><strong>{e(t)}</strong><span>{e(x)}</span></li>' for t, x in d["strip"]) + '</ul></div></section>')
    # 3. Business challenges
    c = d["challenges"]
    out.append(f'''<section class="sx-sec sx-white" aria-labelledby="sx-chal-h"><div class="sx-wrap">
  <h2 id="sx-chal-h" class="sx-h2">{e(c["title"])}</h2>
  <ul class="sx-chal">{"".join(f"<li>{CHEVRON}<span>{e(i)}</span></li>" for i in c["items"])}</ul>
</div></section>''')
    # 4. Benefits band + statement panel
    b = d["benefits"]
    out.append(f'''<section class="sx-sec sx-navy" aria-labelledby="sx-ben-h"><div class="sx-wrap sx-ben">
  <div>
    <h2 id="sx-ben-h" class="sx-h2">{e(b["title"])}</h2>
    <ul class="sx-ben-list">{"".join(f"<li>{icon(i)}<span>{e(t)}</span></li>" for i, t in b["items"])}</ul>
  </div>
  <figure class="sx-statement"><span class="sx-st-label">{e(b["panel_label"])}</span><p>{e(b["panel_text"])}</p><span class="sx-st-mark" aria-hidden="true"><img src="emblem.png" alt="" width="34" height="34">Darwish &amp; Co.</span></figure>
</div></section>''')
    # 5 + 6. Approach introduction and the four-stage journey share one white section
    a = d["approach"]; j = d["journey"]
    parts = "".join(f'<li><span class="sx-pi">{i+1:02d}</span><strong>{e(t)}</strong><span>{e(x)}</span></li>' for i, (t, x) in enumerate(a["parts"]))
    tabs, panels = "", ""
    for i, st in enumerate(j["stages"]):
        sel = i == 0
        tid, pid, xid = f'sx-tab-{st["key"]}', f'sx-panel-{st["key"]}', f'sx-inc-{st["key"]}'
        tabs += (f'<button class="sx-tab" role="tab" id="{tid}" aria-selected="{"true" if sel else "false"}" aria-controls="{pid}" tabindex="{0 if sel else -1}">'
                 f'<span class="sx-step">Step {i+1:02d}</span><span class="sx-tab-t">{e(st["title"])}</span><span class="sx-tick" aria-hidden="true"></span></button>')
        inc = "".join(f"<li>{e(x)}</li>" for x in st["includes"])
        panels += f'''<div class="sx-panel" role="tabpanel" id="{pid}" aria-labelledby="{tid}" tabindex="0"{"" if sel else " hidden"}>
      <div class="sx-panel-copy">
        <h3><span>{i+1}.</span> {e(st["title"])}</h3>
        <p>{e(st["desc"])}</p>
        <div class="sx-disc">
          <button class="sx-disc-btn" type="button" aria-expanded="false" aria-controls="{xid}" data-disclose>What this includes {PLUS}</button>
          <div class="sx-disc-body" id="{xid}" hidden><ul class="sx-dots">{inc}</ul></div>
        </div>
        <p class="sx-out"><strong>Outputs</strong>{e(st["outputs"])}</p>
      </div>
      <figure class="sx-panel-vis">{stage_visual(st["visual"], "sv-" + st["key"])}{'<figcaption>Illustrative roadmap. Phases and timing are set during the engagement.</figcaption>' if st["visual"] == "roadmap" else ''}</figure>
    </div>'''
    out.append(f'''<section class="sx-sec sx-white sx-approach" aria-labelledby="sx-app-h"><div class="sx-wrap">
  <h2 id="sx-app-h" class="sx-h2 sx-wide">{e(a["title"])}</h2>
  <div class="sx-app">
    <div class="sx-app-copy">{"".join(f"<p>{e(p)}</p>" for p in a["paras"])}</div>
    <div class="sx-app-panel"><p>{e(a["panel"])}</p><ol class="sx-parts">{parts}</ol></div>
  </div>
  <div class="sx-journey" id="journey">
    <h3 class="sx-kicker">Our four-stage approach</h3>
    <div data-tabs>
      <div class="sx-tabs" role="tablist" aria-label="Engagement stages">{tabs}</div>
      {panels}
    </div>
  </div>
</div></section>''')
    # 7. Tools and deliverables
    t = d["tools"]
    rows = ""
    for i, (title, desc, items) in enumerate(t["rows"]):
        rid = f"sx-tool-{i}"
        rows += f'''<li class="sx-row">
        <div class="sx-row-head"><h3>{e(title)}</h3><p>{e(desc)}</p></div>
        <button class="sx-row-btn" type="button" aria-expanded="false" aria-controls="{rid}" data-disclose><span class="sr-only">{e(title)}: </span>Sample contents {PLUS}</button>
        <div class="sx-row-body" id="{rid}" hidden><ul class="sx-dots">{"".join(f"<li>{e(x)}</li>" for x in items)}</ul></div>
      </li>'''
    out.append(f'''<section class="sx-sec sx-warm" aria-labelledby="sx-tools-h"><div class="sx-wrap">
  <h2 id="sx-tools-h" class="sx-h2 sx-wide">{e(t["title"])}</h2>
  <div class="sx-tools">
    <div class="sx-tools-l">
      <p class="sx-body">{e(t["text"])}</p>
      <ul class="sx-sum">{"".join(f"<li><strong>{e(a1)}</strong><span>{e(b1)}</span></li>" for a1, b1 in t["summary"])}</ul>
    </div>
    <ul class="sx-rows">{rows}</ul>
  </div>
</div></section>''')
    # 8. Specialist ecosystem
    eco = d["ecosystem"]
    out.append(f'''<section class="sx-sec sx-pale" aria-labelledby="sx-eco-h"><div class="sx-wrap sx-center">
  <h2 id="sx-eco-h" class="sx-h2">{e(eco["title"])}</h2>
  <p class="sx-body sx-measure">{e(eco["text"])}</p>
  <ul class="sx-eco">{"".join(f"<li>{icon(ic)}<strong>{e(n)}</strong><span>{e(x)}</span></li>" for ic, n, x in eco["blocks"])}</ul>
  <p class="sx-note">{e(eco["note"])} <a href="partners.html">See the partner ecosystem</a></p>
</div></section>''')
    # 9. Alternating grid (middle column reversed)
    g = d["grid"]
    (t1, x1), (t2, x2), (t3, x3) = g["themes"]
    (i1, a1, w1, h1), (i2, a2, w2, h2) = g["images"]
    text_tile = lambda n, tt, xx: f'<div class="sx-gt"><span class="sx-gn">{n:02d}</span><h3>{e(tt)}</h3><p>{e(xx)}</p></div>'
    out.append(f'''<section class="sx-sec sx-white" aria-labelledby="sx-grid-h"><div class="sx-wrap">
  <h2 id="sx-grid-h" class="sx-h2 sx-wide">{e(g["title"])}</h2>
  <div class="sx-alt">
    <div class="sx-alt-col">{text_tile(1, t1, x1)}<img class="sx-gi" src="{i1}" alt="{e(a1)}" width="{w1}" height="{h1}" loading="lazy" decoding="async"></div>
    <div class="sx-alt-col sx-rev">{text_tile(2, t2, x2)}<img class="sx-gi" src="{i2}" alt="{e(a2)}" width="{w2}" height="{h2}" loading="lazy" decoding="async"></div>
    <div class="sx-alt-col">{text_tile(3, t3, x3)}<div class="sx-words" role="img" aria-label="{e(' / '.join(g['words']))}">{"".join(f"<span>{e(w)}</span>" for w in g["words"])}</div></div>
  </div>
</div></section>''')
    # 10. Illustrative engagements
    cs = d["cases"]
    ctabs, cpanels = "", ""
    for i, it in enumerate(cs["items"]):
        sel = i == 0
        tid, pid, xid = f'sx-ctab-{it["key"]}', f'sx-case-{it["key"]}', f'sx-cdet-{it["key"]}'
        src, alt, w, hh = it["img"]
        ctabs += (f'<button class="sx-ctab" role="tab" id="{tid}" aria-selected="{"true" if sel else "false"}" aria-controls="{pid}" tabindex="{0 if sel else -1}">'
                  f'<img src="{src}" alt="" width="{w}" height="{hh}" loading="lazy"><span><span class="sx-ctab-k">{e(it["sector"])}</span><span class="sx-ctab-t">{e(it["title"])}</span></span></button>')
        cpanels += f'''<div class="sx-case" role="tabpanel" id="{pid}" aria-labelledby="{tid}"{"" if sel else " hidden"}>
      <img class="sx-case-img" src="{src}" alt="{e(alt)}" width="{w}" height="{hh}" loading="lazy" decoding="async">
      <div class="sx-case-copy">
        <span class="sx-illus">Illustrative engagement</span>
        <span class="sx-case-k">{e(it["sector"])}</span>
        <h3>{e(it["title"])}</h3>
        <p>{e(it["summary"])}</p>
        <button class="btn btn-line sx-case-btn" type="button" aria-expanded="false" aria-controls="{xid}" data-disclose data-open="Hide example" data-closed="View example"><span class="sx-dl">View example</span></button>
        <div class="sx-case-det" id="{xid}" hidden>
          <p class="sx-mini">Example scope</p><ul class="sx-dots">{"".join(f"<li>{e(x)}</li>" for x in it["scope"])}</ul>
          <p class="sx-mini">Example outputs</p><p>{e(it["outputs"])}</p>
        </div>
      </div>
    </div>'''
    out.append(f'''<section class="sx-sec sx-warm" aria-labelledby="sx-case-h"><div class="sx-wrap">
  <div class="sx-head-row"><div><h2 id="sx-case-h" class="sx-h2">{e(cs["title"])}</h2><p class="sx-body sx-measure">{e(cs["intro"])}</p></div><a class="sx-link" href="our-work.html">See our client work</a></div>
  <div data-tabs class="sx-cases">
    {cpanels}
    <div class="sx-ctabs" role="tablist" aria-label="Illustrative engagements">{ctabs}</div>
  </div>
</div></section>''')
    # 11. Insights
    ins = d["insights"]; f = ins["featured"]
    def concept(item, cls, idx):
        pid = f"sx-ins-{idx}"
        vis = insight_visual(item["visual"]) if item.get("visual") else f'<img src="{item["img"][0]}" alt="{e(item["img"][1])}" width="{item["img"][2]}" height="{item["img"][3]}" loading="lazy">'
        if item.get("href"):
            return f'''<article class="{cls}"><div class="sx-ins-vis">{vis}</div><div class="sx-ins-copy"><span class="sx-ins-k">Planned article</span><h3><a href="{item["href"]}">{e(item["title"])}</a></h3><a class="sx-pill-link" href="{item["href"]}" aria-hidden="true" tabindex="-1">Read more</a></div></article>'''
        return f'''<article class="{cls}"><div class="sx-ins-vis">{vis}</div><div class="sx-ins-copy"><span class="sx-ins-k">Article concept</span><h3>{e(item["title"])}</h3>
          <button class="sx-pill-link" type="button" aria-expanded="false" aria-controls="{pid}" data-disclose data-open="Hide preview" data-closed="Preview concept"><span class="sx-dl">Preview concept</span></button>
          <div class="sx-ins-prev" id="{pid}" hidden><p>{e(item["preview"])}</p><p class="sx-mini">Not yet published</p></div></div></article>'''
    side = "".join(concept(it, "sx-ins-item", i + 1) for i, it in enumerate(ins["items"]))
    out.append(f'''<section class="sx-sec sx-pale" aria-labelledby="sx-ins-h"><div class="sx-wrap">
  <div class="sx-head-row"><h2 id="sx-ins-h" class="sx-h2">{e(ins["title"])}</h2><a class="sx-link" href="insights.html#strategy">All strategy insights</a></div>
  <div class="sx-ins">{concept(f, "sx-ins-feat", 0)}<div class="sx-ins-side">{side}</div></div>
</div></section>''')
    # 12. Advisors
    ad = d["advisors"]; p = people[ad["person"]]
    st, sx = ad["support"]
    out.append(f'''<section class="sx-sec sx-white" aria-labelledby="sx-adv-h"><div class="sx-wrap sx-center">
  <h2 id="sx-adv-h" class="sx-h2">{e(ad["title"])}</h2>
  <div class="sx-adv">
    <div class="sx-person"><img src="assets/people/{p["photo"]}" alt="" width="400" height="400" loading="lazy"><strong>{e(p["name"])}</strong><span>{e(p["title"])}</span></div>
    <div class="sx-support">{icon("people", "sx-ico sx-ico-lg")}<strong>{e(st)}</strong><span>{e(sx)}</span><a class="sx-link" href="people.html">Meet our experts</a></div>
  </div>
</div></section>''')
    # 13. Contact
    ct = d["contact"]
    fields = (f'<div class="sx-frow">{field("sx-name", "Name", auto="name", empty="Please enter your name.")}'
              f'{field("sx-email", "Work email", "email", auto="email", rule="email", empty="Please enter your work email.")}</div>'
              f'<div class="sx-frow">{field("sx-org", "Organization", auto="organization", empty="Please enter your organization.")}'
              f'{field("sx-phone", "Phone", "tel", False, "tel", rule="phone")}</div>'
              + field("sx-msg", "What would you like to improve?", "textarea", rule="long", empty="Please describe what you would like to improve in a sentence or two."))
    out.append(contact_section(ct["title"], ct["text"], fields, form_privacy))
    # 14. FAQ
    out.append(f'''<section class="sx-sec sx-white" aria-labelledby="sx-faq-h"><div class="sx-wrap">
  <h2 id="sx-faq-h" class="sx-h2">Frequently asked questions</h2>
  <div class="sx-faq">{"".join(f"<details><summary>{e(q)}</summary><p>{e(a)}</p></details>" for q, a in d["faqs"])}</div>
</div></section>
</div>''')
    return "\n".join(out)


# ------------------------------------------------------------------ layout "gov" (build prompt 02; after Devoteam's cybersecurity page)
GOV_PRIVACY = 'We use these details to respond to your enquiry. See our <a href="privacy.html">privacy policy</a>.'
GOV_LEAD = "Share a brief overview of your challenge. Our team will review it and contact you to agree on the next step."

# Supplied photographs (Darwish-Service-Images package, 10 Oct 2026). All are AI-generated editorial illustrations with
# fictional people and places: never caption them as Darwish staff, offices, clients or engagements. Originals are kept
# in ~/Downloads/Darwish-Service-Images; these are WebP copies at the delivered size (smaller than the briefed targets).
# alt "" = background hero explained by the page copy; otherwise the guide's suggested informative alt.
IMG = "assets/services/"
IMAGES = {
  "STRAT-01": dict(src=IMG + "strategy-hero-desktop.webp", w=1672, h=941, alt="", mobile=(IMG + "strategy-hero-mobile.webp", 1122, 1402)),
  "GOV-01": dict(src=IMG + "governance-hero-desktop.webp", w=1672, h=941, alt="", mobile=(IMG + "governance-hero-mobile.webp", 1122, 1402)),
  "PEOPLE-01": dict(src=IMG + "human-capital-hero.webp", w=1182, h=1330, alt="Illustration of colleagues discussing responsibilities and ways of working."),
  "PEOPLE-02": dict(src=IMG + "human-capital-editorial.webp", w=1448, h=1086, alt="Illustration of two colleagues reviewing responsibilities at a table."),
  "OPS-01": dict(src=IMG + "operations-hero-desktop.webp", w=1672, h=941, alt="", mobile=(IMG + "operations-hero-mobile.webp", 1122, 1402)),
  "GROW-01": dict(src=IMG + "growth-hero-desktop.webp", w=1672, h=941, alt="", mobile=(IMG + "growth-hero-mobile.webp", 1122, 1402)),
  "GROW-02": dict(src=IMG + "growth-editorial.webp", w=1448, h=1086, alt="Illustration of two commercial professionals evaluating unbranded product samples."),
  "DEAL-01": dict(src=IMG + "negotiation-hero.webp", w=1182, h=1330, alt="Illustration of professional teams in a negotiation discussion."),
  "RES-01": dict(src=IMG + "research-hero.webp", w=1182, h=1330, alt="Illustration of analysts reviewing research materials."),
  "CLOSE-01": dict(src=IMG + "liquidation-hero.webp", w=1182, h=1330, alt="Illustration of neatly organized document folders on an executive desk."),
  "CLOSE-02": dict(src=IMG + "liquidation-editorial.webp", w=1448, h=1086, alt="Illustration of two professionals reviewing paperwork at a meeting table."),
}

def photo(asset_id, cls="", hero=False):
    im = IMAGES[asset_id]
    load = 'fetchpriority="high"' if hero else 'loading="lazy"'
    img = f'<img class="sx-photo {cls}" src="{im["src"]}" alt="{e(im["alt"])}" width="{im["w"]}" height="{im["h"]}" {load}>'
    if im.get("mobile"):
        msrc, mw, mh = im["mobile"]
        return f'<picture class="sx-pic"><source media="(max-width: 767px)" srcset="{msrc}" width="{mw}" height="{mh}">{img}</picture>'
    return img

def asset_slot(asset_id, kind, brief, cls=""):
    # Supplied photograph when there is one; otherwise a review-mode placeholder. Never a broken image.
    if asset_id in IMAGES:
        return photo(asset_id, cls, hero="hero" in cls)
    return f'<div class="sx-slot {cls}" role="img" aria-label="Image placeholder {e(asset_id)}"><span class="sx-slot-id">{e(asset_id)} · image pending</span><span class="sx-slot-k">{e(kind)}</span><span class="sx-slot-b">{e(brief)}</span></div>'

def render_gov(s, d, people, crumbs_html):
    h = d["hero"]; out = []
    sid, skind, sbrief = h["slot"]
    atext, aid = h["anchor"]
    out.append(f'''<div class="sx sx-gov">
<section class="page-hero sx-hero gv-hero dark{' has-photo' if sid in IMAGES else ''}" aria-labelledby="page-title">
  {asset_slot(sid, skind, sbrief, "gv-hero-slot")}
  <div class="sx-wrap gv-hero-in">
    <div class="gv-hero-copy">
      {crumbs_html}
      <span class="sx-eyebrow">{e(h["label"])}</span>
      <h1 id="page-title">{e(h["title"])}</h1>
      <p class="sx-lede">{e(h["intro"])}</p>
      <div class="gv-ctas">
        <a class="btn btn-blue" href="#contact"><span class="cta-label">Discuss your challenge</span></a>
        <a class="gv-anchor" href="#{aid}">{e(atext)}</a>
      </div>
    </div>
  </div>
</section>''')
    n = d["needs"]
    out.append(f'''<section class="sx-sec sx-warm gv-tight" aria-labelledby="gv-need-h"><div class="sx-wrap">
  <h2 id="gv-need-h" class="sx-h2">{e(n["title"])}</h2>
  <ul class="gv-needs">{"".join(f"<li><h3>{e(t)}</h3><p>{e(x)}</p></li>" for t, x in n["items"])}</ul>
</div></section>''')
    sc = d["scope"]; tabs = panels = ""
    for i, (key, label, head, body, outl) in enumerate(sc["tabs"]):
        sel = i == 0
        tid, pid = f"gv-tab-{key}", f"gv-panel-{key}"
        tabs += (f'<button class="gv-tab" role="tab" id="{tid}" aria-selected="{"true" if sel else "false"}" aria-controls="{pid}" tabindex="{0 if sel else -1}">'
                 f'<span class="gv-tab-n">{i+1:02d}</span><span>{e(label)}</span></button>')
        panels += (f'<div class="gv-panel{"" if sel else " is-off"}" role="tabpanel" id="{pid}" aria-labelledby="{tid}" tabindex="0">'
                   f'<p class="gv-panel-k">{e(label)}</p><h3>{e(head)}</h3><p>{e(body)}</p><p class="gv-out">{e(outl)}</p></div>')
    out.append(f'''<section class="sx-sec sx-white" id="scope" aria-labelledby="gv-scope-h"><div class="sx-wrap">
  <div class="gv-head"><h2 id="gv-scope-h" class="sx-h2">{e(sc["title"])}</h2><p class="gv-body">{e(sc["intro"])}</p></div>
  <div class="gv-scope" data-tabs data-stack>
    <div class="gv-tabs" role="tablist" aria-label="Scope areas" aria-orientation="vertical">{tabs}</div>
    <div class="gv-panels">{panels}</div>
  </div>
</div></section>''')
    o = d["outputs"]
    out.append(f'''<section class="sx-sec sx-navy" aria-labelledby="gv-out-h"><div class="sx-wrap">
  <h2 id="gv-out-h" class="sx-h2">{e(o["title"])}</h2>
  <ol class="gv-docs">{"".join(f'<li><span class="gv-doc-n">{i+1:02d}</span><h3>{e(t)}</h3><p>{e(x)}</p></li>' for i, (t, x) in enumerate(o["items"]))}</ol>
  <p class="gv-result">{e(o["result"])}</p>
</div></section>''')
    a = d["assessment"]
    out.append(f'''<section class="sx-sec sx-pale" aria-labelledby="gv-as-h"><div class="sx-wrap gv-split">
  <div class="gv-head"><h2 id="gv-as-h" class="sx-h2">{e(a["title"])}</h2><p class="gv-body">{e(a["text"])}</p></div>
  <ol class="gv-steps">{"".join(f'<li><span>{i+1:02d}</span><p>{e(x)}</p></li>' for i, x in enumerate(a["steps"]))}</ol>
</div></section>''')
    x = d["experts"]; pt = x["partner"]
    rows = "".join(f'''<li class="gv-person"><img src="assets/people/{people[slug]["photo"]}" alt="" width="400" height="400" loading="lazy"><div><h3>{e(people[slug]["name"])}</h3><p>{e(role)}</p></div></li>''' for slug, role in x["people"])
    lsrc, lw, lh = pt["logo"]
    out.append(f'''<section class="sx-sec sx-warm" aria-labelledby="gv-ex-h"><div class="sx-wrap">
  <div class="sx-head-row"><div><h2 id="gv-ex-h" class="sx-h2">{e(x["title"])}</h2><p class="gv-body">{e(x["intro"])}</p></div><a class="sx-link" href="people.html">Meet our experts</a></div>
  <ul class="gv-people">{rows}</ul>
  <div class="gv-partner">
    <img src="{lsrc}" alt="{e(pt["name"])}" width="{lw}" height="{lh}" loading="lazy">
    <div><h3>{e(pt["title"])}</h3><p>{e(pt["text"])}</p></div>
  </div>
</div></section>''')
    rel = "".join(f'<li><a class="sx-link" href="{href}">{e(t)}</a></li>' for t, href in d["related"])
    out.append(f'''<section class="sx-sec sx-white" aria-labelledby="gv-faq-h"><div class="sx-wrap">
  <h2 id="gv-faq-h" class="sx-h2">{e(d["faqs_title"])}</h2>
  <div class="sx-faq">{"".join(f"<details><summary>{e(q)}</summary><p>{e(a2)}</p></details>" for q, a2 in d["faqs"])}</div>
  <nav class="gv-related" aria-labelledby="gv-rel-h"><h2 id="gv-rel-h">Related services</h2><ul>{rel}</ul></nav>
</div></section>''')
    c = d["contact"]
    fields = (f'<div class="sx-frow">{field("gv-name", "Name", auto="name", empty="Please enter your name.")}'
              f'{field("gv-email", "Work email", "email", auto="email", rule="email", empty="Please enter your work email.")}</div>'
              + field("gv-org", "Organization", req=False, auto="organization")
              + field("gv-msg", "Your business challenge", "textarea", rule="long", empty="Please describe your business challenge in a sentence or two."))
    out.append(contact_section(c["title"], c["text"], fields, GOV_PRIVACY, GOV_LEAD, s["title"]) + "\n</div>")
    return "\n".join(out)

# ------------------------------------------------------------------ layout "people" (build prompt 03; after Devoteam's digital-workplace page)
def experts_block(x, people, hid):
    pt = x["partner"]; lsrc, lw, lh = pt["logo"]
    rows = "".join(f'<li class="gv-person"><img src="assets/people/{people[slug]["photo"]}" alt="" width="400" height="400" loading="lazy"><div><h3>{e(people[slug]["name"])}</h3><p>{e(role)}</p></div></li>' for slug, role in x["people"])
    return f'''<div class="sx-head-row"><div><h2 id="{hid}" class="sx-h2">{e(x["title"])}</h2><p class="gv-body">{e(x["intro"])}</p></div><a class="sx-link" href="people.html">Meet our experts</a></div>
  <ul class="gv-people">{rows}</ul>
  <div class="gv-partner{' gv-partner-mark' if abs(lw - lh) <= lw * 0.2 else ''}">
    <span class="gv-plogo"><img src="{lsrc}" alt="" width="{lw}" height="{lh}" loading="lazy"><span>{e(pt["name"])}</span></span>
    <div><h3>{e(pt["title"])}</h3><p>{e(pt["text"])}</p></div>
  </div>'''

def faq_related(d, hid):
    rel = "".join(f'<li><a class="sx-link" href="{href}">{e(t)}</a></li>' for t, href in d["related"])
    return f'''<h2 id="{hid}" class="sx-h2">{e(d["faqs_title"])}</h2>
  <div class="sx-faq">{"".join(f"<details><summary>{e(q)}</summary><p>{e(a)}</p></details>" for q, a in d["faqs"])}</div>
  <nav class="gv-related" aria-labelledby="{hid}-rel"><h2 id="{hid}-rel">Related service{"s" if len(d["related"]) > 1 else ""}</h2><ul>{rel}</ul></nav>'''

def shared_contact(s, d, prefix):
    c = d["contact"]
    fields = (f'<div class="sx-frow">{field(prefix + "-name", "Name", auto="name", empty="Please enter your name.")}'
              f'{field(prefix + "-email", "Work email", "email", auto="email", rule="email", empty="Please enter your work email.")}</div>'
              + field(prefix + "-org", "Organization", req=False, auto="organization")
              + field(prefix + "-msg", "Your business challenge", "textarea", rule="long", empty="Please describe your business challenge in a sentence or two."))
    return contact_section(c["title"], c["text"], fields, GOV_PRIVACY, GOV_LEAD, s["title"])

def render_people(s, d, people, crumbs_html):
    h = d["hero"]; out = []
    t1, t2 = h["title"]; atext, aid = h["anchor"]
    out.append(f'''<div class="sx sx-gov sx-ppl">
<section class="pp-hero" aria-labelledby="page-title">
  <div class="pp-hero-copy">
    {crumbs_html}
    <span class="pp-eyebrow">{e(h["label"])}</span>
    <h1 id="page-title">{e(t1)} <span class="acc">{e(t2)}</span></h1>
    <p class="pp-lede">{e(h["intro"])}</p>
    <div class="gv-ctas">
      <a class="btn btn-navy" href="#contact"><span class="cta-label">Discuss your challenge</span></a>
      <a class="pp-anchor" href="#{aid}">{e(atext)}</a>
    </div>
  </div>
  {asset_slot(*h["slot"], "pp-hero-slot")}
</section>''')
    n = d["needs"]
    out.append(f'''<section class="sx-sec sx-white" aria-labelledby="pp-need-h"><div class="sx-wrap pp-needs-grid">
  <h2 id="pp-need-h" class="sx-h2">{e(n["title"])}</h2>
  <ul class="pp-needs">{"".join(f"<li><h3>{e(t)}</h3><p>{e(x)}</p></li>" for t, x in n["items"])}</ul>
</div></section>''')
    sc = d["scope"]; A = sc["a"]; B = sc["b"]
    pts = lambda xs: '<ul class="pp-points">' + "".join(f"<li>{e(x)}</li>" for x in xs) + "</ul>"
    dia = "".join(f'<li><span class="pp-dn">{i+1:02d}</span><span>{e(x)}</span></li>' for i, x in enumerate(B["diagram"]))
    out.append(f'''<section class="sx-sec sx-warm" id="scope" aria-labelledby="pp-scope-h"><div class="sx-wrap">
  <div class="gv-head"><h2 id="pp-scope-h" class="sx-h2">{e(sc["title"])}</h2><p class="gv-body">{e(sc["intro"])}</p></div>
  <div class="pp-block">
    {asset_slot(*A["slot"], "pp-block-slot")}
    <div class="pp-block-copy"><h3>{e(A["title"])}</h3><p>{e(A["body"])}</p>{pts(A["points"])}</div>
  </div>
  <div class="pp-block pp-rev">
    <div class="pp-block-copy"><h3>{e(B["title"])}</h3><p>{e(B["body"])}</p>{pts(B["points"])}</div>
    <figure class="pp-dia"><ol aria-label="Conceptual relationship">{dia}</ol><figcaption>A conceptual relationship, not an organization chart.</figcaption></figure>
  </div>
</div></section>''')
    o = d["outputs"]
    out.append(f'''<section class="sx-sec sx-white" aria-labelledby="pp-out-h"><div class="sx-wrap">
  <h2 id="pp-out-h" class="sx-h2">{e(o["title"])}</h2>
  <ol class="pp-rows">{"".join(f'<li><span class="pp-rn">{i+1:02d}</span><h3>{e(t)}</h3><p>{e(x)}</p></li>' for i, (t, x) in enumerate(o["items"]))}</ol>
  <p class="pp-result">{e(o["result"])}</p>
</div></section>''')
    c = d["case"]; src, w, hh = c["img"]
    gate = "" if c["approved"] else f'<p class="pp-gate"><strong>Draft · not for publication</strong>{e(c["gate"])}</p>'
    out.append(f'''<section class="sx-sec sx-pale" aria-labelledby="pp-case-h"><div class="sx-wrap pp-case{' is-draft' if not c['approved'] else ''}">
  <figure class="pp-case-img"><img src="{src}" alt="" width="{w}" height="{hh}" loading="lazy" decoding="async"><figcaption>Illustrative photograph. It does not show the client.</figcaption></figure>
  <div class="pp-case-copy">
    {gate}<span class="pp-eyebrow">{e(c["eyebrow"])}</span>
    <h2 id="pp-case-h" class="sx-h2">{e(c["title"])}</h2>
    <dl class="pp-dl">{"".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in c["rows"])}</dl>
  </div>
</div></section>''')
    out.append(f'''<section class="sx-sec sx-warm" aria-labelledby="pp-ex-h"><div class="sx-wrap">
  {experts_block(d["experts"], people, "pp-ex-h")}
</div></section>''')
    out.append(f'''<section class="sx-sec sx-white" aria-labelledby="pp-faq-h"><div class="sx-wrap">
  {faq_related(d, "pp-faq-h")}
</div></section>''')
    out.append(shared_contact(s, d, "pp") + "\n</div>")
    return "\n".join(out)

# ------------------------------------------------------------------ layout "ops" (build prompt 04; after Devoteam's managed-services pages)
def dark_hero(h, crumbs_html):
    atext, aid = h["anchor"]
    if h.get("image"):
        src, w, ht = h["image"]
        media = f'<img class="ab-hero-img" src="{src}" alt="" width="{w}" height="{ht}" fetchpriority="high">'
    else:
        media = asset_slot(*h["slot"], "gv-hero-slot")
    has = h.get("image") or h.get("slot", ("",))[0] in IMAGES
    return f"""<section class="page-hero sx-hero gv-hero dark{' has-photo' if has else ''}" aria-labelledby="page-title">
  {media}
  <div class="sx-wrap gv-hero-in">
    <div class="gv-hero-copy">
      {crumbs_html}
      <span class="sx-eyebrow">{e(h["label"])}</span>
      <h1 id="page-title">{e(h["title"])}</h1>
      <p class="sx-lede">{e(h["intro"])}</p>
      <div class="gv-ctas">
        <a class="btn btn-blue" href="#contact"><span class="cta-label">Discuss your challenge</span></a>
        <a class="gv-anchor" href="#{aid}">{e(atext)}</a>
      </div>
    </div>
  </div>
</section>"""

def partner_strip(pt):
    lsrc, lw, lh = pt["logo"]
    return f'<div class="gv-partner"><img src="{lsrc}" alt="{e(pt["name"])}" width="{lw}" height="{lh}" loading="lazy"><div><h3>{e(pt["title"])}</h3><p>{e(pt["text"])}</p></div></div>'

def render_ops(s, d, people, crumbs_html):
    out = ['<div class="sx sx-gov sx-ops">', dark_hero(d["hero"], crumbs_html)]
    f = d["friction"]
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="op-fr-h"><div class="sx-wrap">
  <h2 id="op-fr-h" class="sx-h2">{e(f["title"])}</h2>
  <ul class="op-fric">{"".join(f"<li>{icon(i)}<h3>{e(t)}</h3><p>{e(x)}</p></li>" for i, t, x in f["items"])}</ul>
</div></section>""")
    a = d["approach"]
    out.append(f"""<section class="sx-sec sx-warm" id="approach" aria-labelledby="op-ap-h"><div class="sx-wrap">
  <div class="gv-head"><h2 id="op-ap-h" class="sx-h2">{e(a["title"])}</h2><p class="gv-body">{e(a["intro"])}</p></div>
  <ol class="op-ribbon">{"".join(f'<li><p class="op-step"><span>{i+1:02d}</span> · {e(t)}</p><p class="op-desc">{e(x)}</p></li>' for i, (t, x) in enumerate(a["steps"]))}</ol>
</div></section>""")
    t = d["table"]; c1, c2 = t["cols"]
    out.append(f"""<section class="sx-sec sx-warm op-table-sec" aria-labelledby="op-tb-h"><div class="sx-wrap">
  <h2 id="op-tb-h" class="sx-h2">{e(t["title"])}</h2>
  <table class="op-table"><thead><tr><th scope="col">{e(c1)}</th><th scope="col">{e(c2)}</th></tr></thead>
  <tbody>{"".join(f'<tr><th scope="row">{e(o)}</th><td><span class="op-ml" aria-hidden="true">{e(c2)}</span>{e(x)}</td></tr>' for o, x in t["rows"])}</tbody></table>
</div></section>""")
    b = d["band"]
    out.append(f"""<section class="sx-sec sx-navy" aria-labelledby="op-bd-h"><div class="sx-wrap op-band">
  <h2 id="op-bd-h" class="sx-h2">{e(b["title"])}</h2>
  <div><ul class="op-ben">{"".join(f"<li>{e(x)}</li>" for x in b["items"])}</ul><p class="op-note">{e(b["note"])}</p></div>
</div></section>""")
    st = d["start"]
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="op-st-h"><div class="sx-wrap">
  <div class="gv-split op-start">
    <div class="gv-head"><h2 id="op-st-h" class="sx-h2">{e(st["title"])}</h2><p class="gv-body">{e(st["text"])}</p></div>
    <ul class="op-labels" aria-label="Typical starting points">{"".join(f"<li>{e(x)}</li>" for x in st["labels"])}</ul>
  </div>
  {partner_strip(st["partner"])}
</div></section>""")
    ad = d["advisor"]; p = people[ad["person"]]
    out.append(f"""<section class="sx-sec sx-warm" aria-labelledby="op-ad-h"><div class="sx-wrap">
  <div class="op-adv">
    <img src="assets/people/{p["photo"]}" alt="" width="400" height="400" loading="lazy">
    <div>
      <h2 id="op-ad-h" class="sx-h2">{e(ad["title"])}</h2>
      <p class="op-adv-name"><strong>{e(p["name"])}</strong><span>{e(ad["role"])}</span></p>
      <p class="gv-body">{e(ad["text"])}</p>
      <a class="sx-link" href="people.html">Meet our experts</a>
    </div>
  </div>
</div></section>""")
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="op-faq-h"><div class="sx-wrap">
  {faq_related(d, "op-faq-h")}
</div></section>""")
    out.append(shared_contact(s, d, "op") + "\n</div>")
    return "\n".join(out)

# ------------------------------------------------------------------ layout "growth" (build prompt 05)
def case_block(c, hid):
    src, w, hh = c["img"]
    gate = "" if c["approved"] else f'<p class="pp-gate"><strong>Draft · not for publication</strong>{e(c["gate"])}</p>'
    return f"""<div class="sx-wrap pp-case">
  <figure class="pp-case-img"><img src="{src}" alt="" width="{w}" height="{hh}" loading="lazy" decoding="async"><figcaption>Illustrative photograph. It does not show the client.</figcaption></figure>
  <div class="pp-case-copy">
    {gate}<span class="pp-eyebrow">{e(c["eyebrow"])}</span>
    <h2 id="{hid}" class="sx-h2">{e(c["title"])}</h2>
    <dl class="pp-dl">{"".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in c["rows"])}</dl>
  </div>
</div>"""

def advisor_block(ad, people, hid):
    p = people[ad["person"]]
    return f"""<div class="op-adv">
    <img src="assets/people/{p["photo"]}" alt="" width="400" height="400" loading="lazy">
    <div>
      <h2 id="{hid}" class="sx-h2">{e(ad["title"])}</h2>
      <p class="op-adv-name"><strong>{e(p["name"])}</strong><span>{e(ad["role"])}</span></p>
      <p class="gv-body">{e(ad["text"])}</p>
      <a class="sx-link" href="people.html">Meet our experts</a>
    </div>
  </div>"""

def render_growth(s, d, people, crumbs_html):
    out = ['<div class="sx sx-gov sx-grow">', dark_hero(d["hero"], crumbs_html)]
    dc = d["decisions"]
    out.append(f"""<section class="sx-sec sx-warm gv-tight" aria-labelledby="gr-dc-h"><div class="sx-wrap">
  <h2 id="gr-dc-h" class="sx-h2">{e(dc["title"])}</h2>
  <ul class="gv-needs">{"".join(f"<li><h3>{e(t)}</h3><p>{e(x)}</p></li>" for t, x in dc["items"])}</ul>
</div></section>""")
    ch = d["chapters"]
    rows = ""
    for i, (t, x) in enumerate(ch["items"]):
        media = asset_slot(*ch["slot"], "gr-slot") if i == 1 else ""
        rows += f'<li class="gr-ch{" has-media" if media else ""}"><span class="gr-n">{i+1:02d}</span><div class="gr-ch-copy"><h3>{e(t)}</h3><p>{e(x)}</p></div>{media}</li>'
    out.append(f"""<section class="sx-sec sx-white" id="scope" aria-labelledby="gr-ch-h"><div class="sx-wrap">
  <h2 id="gr-ch-h" class="sx-h2">{e(ch["title"])}</h2>
  <ol class="gr-chapters">{rows}</ol>
</div></section>""")
    o = d["outputs"]
    out.append(f"""<section class="sx-sec sx-warm" aria-labelledby="gr-out-h"><div class="sx-wrap">
  <h2 id="gr-out-h" class="sx-h2">{e(o["title"])}</h2>
  <ul class="gr-grid">{"".join(f"<li><h3>{e(t)}</h3><p>{e(x)}</p></li>" for t, x in o["items"])}</ul>
  <p class="gr-result">{e(o["result"])}</p>
</div></section>""")
    g = d["g360"]; lt, lh = g["link"]
    def stage(i, name, who, logo):
        lg = f'<img class="gr-st-logo" src="{logo[0]}" alt="" width="{logo[1]}" height="{logo[2]}" loading="lazy">' if logo else ""
        return f'<li><span class="gr-st-n">{i+1}</span><span class="gr-st-t"><strong>{e(name)}</strong><span>{e(who)}</span></span>{lg}</li>'
    def contrib(name, text, logo, wordmark):
        src, w, hh = logo
        mark = (f'<span class="gr-plate"><img src="{src}" alt="{e(name)}" width="{w}" height="{hh}" loading="lazy"></span>' if wordmark
                else f'<span class="gr-plate gr-plate-mark"><img src="{src}" alt="" width="{w}" height="{hh}" loading="lazy"><span>{e(name)}</span></span>')
        return f'<li>{mark}<p>{e(text)}</p></li>'
    out.append(f"""<section class="sx-sec sx-navy" aria-labelledby="gr-g3-h"><div class="sx-wrap">
  <div class="gr-g3">
    <div class="gr-g3-copy"><h2 id="gr-g3-h" class="sx-h2">{e(g["title"])}</h2><p>{e(g["text"])}</p><a class="gr-g3-link" href="{lh}">{e(lt)}</a></div>
    <ol class="gr-seq" aria-label="Growth 360 stages">{"".join(stage(i, *x) for i, x in enumerate(g["stages"]))}</ol>
  </div>
  <ul class="gr-contrib" aria-label="Activation arms">{"".join(contrib(*x) for x in g["partners"])}</ul>
</div></section>""")
    out.append(f"""<section class="sx-sec sx-pale" aria-labelledby="gr-case-h">{case_block(d["case"], "gr-case-h")}</section>""")
    out.append(f"""<section class="sx-sec sx-warm" aria-labelledby="gr-ad-h"><div class="sx-wrap">{advisor_block(d["advisor"], people, "gr-ad-h")}</div></section>""")
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="gr-faq-h"><div class="sx-wrap">
  {faq_related(d, "gr-faq-h")}
</div></section>""")
    out.append(shared_contact(s, d, "gr") + "\n</div>")
    return "\n".join(out)

# ------------------------------------------------------------------ layout "deal" (build prompt 06)
def light_hero(h, crumbs_html, accent=None):
    atext, aid = h["anchor"]
    title = e(h["title"]) if not accent else f'{e(accent[0])} <span class="acc">{e(accent[1])}</span>'
    return f"""<section class="pp-hero" aria-labelledby="page-title">
  <div class="pp-hero-copy">
    {crumbs_html}
    <span class="pp-eyebrow">{e(h["label"])}</span>
    <h1 id="page-title">{title}</h1>
    <p class="pp-lede">{e(h["intro"])}</p>
    <div class="gv-ctas">
      <a class="btn btn-navy" href="#contact"><span class="cta-label">Discuss your challenge</span></a>
      <a class="pp-anchor" href="#{aid}">{e(atext)}</a>
    </div>
  </div>
  {asset_slot(*h["slot"], "pp-hero-slot")}
</section>"""

def render_deal(s, d, people, crumbs_html):
    out = ['<div class="sx sx-gov sx-ppl sx-deal">', light_hero(d["hero"], crumbs_html)]
    n = d["needs"]
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="dl-nd-h"><div class="sx-wrap">
  <h2 id="dl-nd-h" class="sx-h2">{e(n["title"])}</h2>
  <ol class="gv-needs dl-needs">{"".join(f'<li><span class="dl-lab">{i+1:02d}</span><h3>{e(t)}</h3><p>{e(x)}</p></li>' for i, (t, x) in enumerate(n["items"]))}</ol>
</div></section>""")
    m = d["mandate"]; st = d["stages"]
    out.append(f"""<section class="sx-sec sx-warm dl-mandate-sec" aria-labelledby="dl-md-h"><div class="sx-wrap">
  <div class="dl-mandate"><h2 id="dl-md-h">{e(m["title"])}</h2><p>{e(m["text"])}</p></div>
</div></section>
<section class="sx-sec sx-warm dl-stages-sec" id="approach" aria-labelledby="dl-st-h"><div class="sx-wrap dl-stages-grid">
  <div class="gv-head"><h2 id="dl-st-h" class="sx-h2">{e(st["title"])}</h2><p class="gv-body">{e(st["intro"])}</p></div>
  <ol class="dl-stages">{"".join(f'<li><span class="dl-n">{i+1:02d}</span><div><h3>{e(t)}</h3><p>{e(x)}</p></div></li>' for i, (t, x) in enumerate(st["items"]))}</ol>
</div></section>""")
    o = d["outputs"]
    out.append(f"""<section class="sx-sec sx-navy" aria-labelledby="dl-out-h"><div class="sx-wrap">
  <h2 id="dl-out-h" class="sx-h2">{e(o["title"])}</h2>
  <ul class="gv-docs dl-docs">{"".join(f"<li><h3>{e(t)}</h3><p>{e(x)}</p></li>" for t, x in o["items"])}</ul>
</div></section>""")
    oc = d["outcomes"]
    out.append(f"""<section class="sx-sec sx-warm" aria-labelledby="dl-oc-h"><div class="sx-wrap op-band dl-out">
  <h2 id="dl-oc-h" class="sx-h2">{e(oc["title"])}</h2>
  <div><ul class="dl-oc">{"".join(f"<li>{e(x)}</li>" for x in oc["items"])}</ul><p class="dl-note">{e(oc["note"])}</p></div>
</div></section>""")
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="dl-ad-h"><div class="sx-wrap">{advisor_block(d["advisor"], people, "dl-ad-h")}</div></section>""")
    out.append(f"""<section class="sx-sec sx-warm" aria-labelledby="dl-faq-h"><div class="sx-wrap">
  {faq_related(d, "dl-faq-h")}
</div></section>""")
    out.append(shared_contact(s, d, "dl") + "\n</div>")
    return "\n".join(out)

# ------------------------------------------------------------------ layout "research" (build prompt 07)
def render_research(s, d, people, crumbs_html):
    h = d["hero"]; atext, aid = h["anchor"]
    out = [f"""<div class="sx sx-gov sx-ppl sx-res">
<section class="page-hero pp-hero rs-hero dark" aria-labelledby="page-title">
  <div class="pp-hero-copy">
    {crumbs_html}
    <span class="sx-eyebrow">{e(h["label"])}</span>
    <h1 id="page-title">{e(h["title"])}</h1>
    <p class="pp-lede">{e(h["intro"])}</p>
    <div class="gv-ctas">
      <a class="btn btn-blue" href="#contact"><span class="cta-label">Discuss your challenge</span></a>
      <a class="gv-anchor" href="#{aid}">{e(atext)}</a>
    </div>
  </div>
  {asset_slot(*h["slot"], "pp-hero-slot rs-hero-slot")}
</section>"""]
    g = d["gaps"]
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="rs-gp-h"><div class="sx-wrap">
  <h2 id="rs-gp-h" class="sx-h2">{e(g["title"])}</h2>
  <ul class="gv-needs dl-needs">{"".join(f"<li><h3>{e(t)}</h3><p>{e(x)}</p></li>" for t, x in g["items"])}</ul>
</div></section>""")
    sc = d["scope"]; tabs = panels = ""
    for i, (key, label, head, body, output) in enumerate(sc["tabs"]):
        sel = i == 0; tid, pid = f"rs-tab-{key}", f"rs-panel-{key}"
        tabs += (f'<button class="rs-tab" role="tab" id="{tid}" aria-selected="{"true" if sel else "false"}" aria-controls="{pid}" tabindex="{0 if sel else -1}">'
                 f'<span class="gv-tab-n">{i+1:02d}</span><span>{e(label)}</span></button>')
        panels += (f'<div class="rs-panel{"" if sel else " is-off"}" role="tabpanel" id="{pid}" aria-labelledby="{tid}" tabindex="0">'
                   f'<div class="rs-panel-copy"><p class="gv-panel-k">{e(label)}</p><h3>{e(head)}</h3><p>{e(body)}</p></div>'
                   f'<div class="rs-output">{icon("doc", "sx-ico rs-doc")}<span><span class="rs-out-k">Output</span><strong>{e(output)}</strong></span></div></div>')
    out.append(f"""<section class="sx-sec sx-warm" id="scope" aria-labelledby="rs-sc-h"><div class="sx-wrap">
  <div class="gv-head"><h2 id="rs-sc-h" class="sx-h2">{e(sc["title"])}</h2><p class="gv-body">{e(sc["intro"])}</p></div>
  <div class="rs-scope" data-tabs data-stack>
    <div class="rs-tabs" role="tablist" aria-label="Research lenses">{tabs}</div>
    <div class="rs-panels">{panels}</div>
  </div>
</div></section>""")
    b = d["brief"]
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="rs-br-h"><div class="sx-wrap gv-split">
  <div class="gv-head"><h2 id="rs-br-h" class="sx-h2">{e(b["title"])}</h2><p class="gv-body">{e(b["text"])}</p></div>
  <div class="rs-brief"><p class="rs-brief-k">{e(b["label"])}</p><dl>{"".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in b["rows"])}</dl></div>
</div></section>""")
    bd = d["band"]
    out.append(f"""<section class="rs-band sx-navy" aria-labelledby="rs-bd-h"><div class="sx-wrap">
  <h2 id="rs-bd-h" class="rs-band-t">{e(bd["title"])}</h2>
  <ul class="rs-band-list">{"".join(f"<li>{e(x)}</li>" for x in bd["items"])}</ul>
</div></section>""")
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="rs-ex-h"><div class="sx-wrap">
  {experts_block(d["experts"], people, "rs-ex-h")}
</div></section>""")
    st = d["start"]
    out.append(f"""<section class="sx-sec sx-warm rs-start-sec" aria-labelledby="rs-st-h"><div class="sx-wrap">
  <div class="rs-start"><h2 id="rs-st-h" class="sx-h2">{e(st["title"])}</h2><p class="gv-body">{e(st["text"])}</p></div>
</div></section>""")
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="rs-faq-h"><div class="sx-wrap">
  {faq_related(d, "rs-faq-h")}
</div></section>""")
    out.append(shared_contact(s, d, "rs") + "\n</div>")
    return "\n".join(out)

# ------------------------------------------------------------------ layout "close" (build prompt 08)
def render_close(s, d, people, crumbs_html):
    out = ['<div class="sx sx-gov sx-ppl sx-close">', light_hero(d["hero"], crumbs_html)]
    n = d["needs"]
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="cl-nd-h"><div class="sx-wrap">
  <h2 id="cl-nd-h" class="sx-h2">{e(n["title"])}</h2>
  <ul class="gv-needs dl-needs">{"".join(f"<li><h3>{e(t)}</h3><p>{e(x)}</p></li>" for t, x in n["items"])}</ul>
</div></section>""")
    po = d["position"]
    out.append(f"""<section class="sx-sec sx-warm" id="scope" aria-labelledby="cl-po-h"><div class="sx-wrap gv-split">
  <div class="gv-head"><h2 id="cl-po-h" class="sx-h2">{e(po["title"])}</h2><p class="gv-body">{e(po["text"])}</p></div>
  <p class="cl-inset">{e(po["note"])}</p>
</div></section>""")
    a = d["areas"]; items = ""
    for i, (t, x) in enumerate(a["items"]):
        rid = f"cl-area-{i+1}"; op = i == 0
        items += (f'<li><h3><button class="cl-acc-btn" type="button" aria-expanded="{"true" if op else "false"}" aria-controls="{rid}" data-disclose>'
                  f'<span class="cl-n">{i+1:02d}</span><span class="cl-t">{e(t)}</span>{PLUS}</button></h3>'
                  f'<div class="cl-acc-body" id="{rid}"{"" if op else " hidden"}><p>{e(x)}</p></div></li>')
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="cl-ar-h"><div class="sx-wrap">
  <div class="gv-head"><h2 id="cl-ar-h" class="sx-h2">{e(a["title"])}</h2><p class="gv-body">{e(a["intro"])}</p></div>
  <div class="cl-areas">
    <ol class="cl-acc">{items}</ol>
    {asset_slot(*a["slot"], "cl-slot")}
  </div>
</div></section>""")
    o = d["outputs"]
    out.append(f"""<section class="sx-sec sx-warm" aria-labelledby="cl-out-h"><div class="sx-wrap">
  <h2 id="cl-out-h" class="sx-h2">{e(o["title"])}</h2>
  <ul class="gr-grid cl-grid">{"".join(f"<li>{icon(ic, 'sx-ico cl-ico')}<h3>{e(t)}</h3><p>{e(x)}</p></li>" for ic, t, x in o["items"])}</ul>
  <p class="cl-result">{e(o["result"])}</p>
</div></section>""")
    c = d["coord"]
    out.append(f"""<section class="sx-sec sx-white" aria-labelledby="cl-co-h"><div class="sx-wrap">
  <h2 id="cl-co-h" class="sx-h2">{e(c["title"])}</h2>
  <p class="gv-body cl-co-intro">{e(c["intro"])}</p>
  <dl class="cl-coord">{"".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in c["rows"])}</dl>
</div></section>""")
    out.append(f"""<section class="sx-sec sx-warm" aria-labelledby="cl-faq-h"><div class="sx-wrap">
  {faq_related(d, "cl-faq-h")}
</div></section>""")
    out.append(shared_contact(s, d, "cl") + "\n</div>")
    return "\n".join(out)

# ------------------------------------------------------------------ About page (complete build prompt; after Devoteam's About page)
def render_about(a, crumbs_html):
    out = ['<div class="sx sx-gov sx-about">', dark_hero(a["hero"], crumbs_html).replace('class="page-hero sx-hero gv-hero dark', 'class="page-hero sx-hero gv-hero ab-hero dark', 1)]
    out.append(f"""<section class="ab-props" aria-labelledby="ab-props-h"><div class="sx-wrap">
  <h2 id="ab-props-h" class="sr-only">Our strengths</h2>
  <ul class="ab-props-list">{"".join(f"<li>{icon(i, 'sx-ico ab-pico')}<h3>{e(t)}</h3><p>{e(x)}</p></li>" for i, t, x in a["props"])}</ul>
</div></section>""")
    w = a["who"]; lt, lh = w["link"]
    out.append(f"""<section class="sx-sec sx-white ab-who" aria-labelledby="ab-who-h"><div class="sx-wrap">
  <div class="ab-who-grid">
    <div class="gv-head"><h2 id="ab-who-h" class="sx-h2">{e(w["title"])}</h2>{"".join(f'<p class="gv-body">{e(x)}</p>' for x in w["paras"])}</div>
    {(lambda src, iw, ih, alt: f'<img class="ab-who-img" src="{src}" alt="{e(alt)}" width="{iw}" height="{ih}" loading="lazy">')(*w["image"]) if w.get("image") else asset_slot(*w["slot"], "ab-who-slot")}
  </div>
  <h3 class="ab-sub">{e(w["advise_title"])}</h3>
  <dl class="cl-coord ab-advise">{"".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in w["advise"])}</dl>
  <p class="ab-links"><a class="sx-link" href="{lh}">{e(lt)}</a></p>
</div></section>""")
    f = a["founder"]; src, fw, fh = f["photo"]
    out.append(f"""<section class="sx-sec sx-navy ab-founder" aria-labelledby="ab-fd-h"><div class="sx-wrap ab-founder-grid">
  <img class="ab-founder-img" src="{src}" alt="{e(f["alt"])}" width="{fw}" height="{fh}" loading="lazy" decoding="async">
  <figure class="ab-quote">
    <h2 id="ab-fd-h" class="ab-eyebrow">{e(f["eyebrow"])}</h2>
    <blockquote><p>“{e(f["quote"])}”</p></blockquote>
    <p class="ab-qtext">{e(f["text"])}</p>
    <figcaption><strong>{e(f["name"])}</strong><span>{e(f["role"])}</span></figcaption>
  </figure>
</div></section>""")
    g = a["guides"]
    out.append(f"""<section class="sx-sec sx-warm" aria-labelledby="ab-gd-h"><div class="sx-wrap">
  <h2 id="ab-gd-h" class="sx-h2">{e(g["title"])}</h2>
  <div class="ab-guides">
    <div class="ab-purpose"><h3>Purpose</h3><p>{e(g["purpose"])}</p></div>
    <div class="ab-mv"><div><h3>Mission</h3><p>{e(g["mission"])}</p></div><div><h3>Vision</h3><p>{e(g["vision"])}</p></div></div>
  </div>
</div></section>""")
    m = a["method"]
    out.append(f"""<section class="sx-sec sx-white" id="how-we-work" aria-labelledby="ab-md-h"><div class="sx-wrap">
  <div class="gv-head"><h2 id="ab-md-h" class="sx-h2">{e(m["title"])}</h2><p class="gv-body">{e(m["intro"])}</p></div>
  <ol class="ab-method">{"".join(f'<li><p class="ab-step"><span>{i+1:02d}</span>{e(t)}</p><p class="ab-step-d">{e(x)}</p></li>' for i, (t, x) in enumerate(m["steps"]))}</ol>
</div></section>""")
    x = a["experts"]
    cards = "".join(f'<li><div class="ab-person"><img src="assets/people/{slug}.jpg" alt="" width="400" height="400" loading="lazy" decoding="async"><strong>{e(n)}</strong><span>{e(r)}</span></div></li>' for slug, n, r in x["people"])
    out.append(f"""<section class="sx-sec sx-warm" id="experts" aria-labelledby="ab-ex-h"><div class="sx-wrap">
  <div class="gv-head"><h2 id="ab-ex-h" class="sx-h2">{e(x["title"])}</h2><p class="gv-body">{e(x["intro"])}</p></div>
  <ul class="ab-people">{cards}</ul>
</div></section>""")
    pr = a["principles"]
    out.append(f"""<section class="sx-sec sx-pale" aria-labelledby="ab-pr-h"><div class="sx-wrap">
  <h2 id="ab-pr-h" class="sx-h2">{e(pr["title"])}</h2>
  <ul class="ab-princ">{"".join(f'<li{" class=is-featured" if i == 0 else ""}>{icon(ic)}<h3>{e(t)}</h3><p>{e(d)}</p></li>' for i, (ic, t, d) in enumerate(pr["items"]))}</ul>
</div></section>""")
    pa = a["partners"]
    groups = ""
    for gname, items in pa["groups"]:
        rows = "".join(f'<li><span class="ab-logo"><img src="{src}" alt="" loading="lazy" decoding="async"></span><div><h4>{e(n)}</h4><p>{e(t)}</p></div></li>' for n, src, t in items)
        groups += f'<div class="ab-pgroup"><h3>{e(gname)}</h3><ul>{rows}</ul></div>'
    out.append(f"""<section class="sx-sec sx-white" id="partners" aria-labelledby="ab-pa-h"><div class="sx-wrap">
  <div class="gv-head"><h2 id="ab-pa-h" class="sx-h2">{e(pa["title"])}</h2><p class="gv-body">{e(pa["intro"])}</p></div>
  <div class="ab-partners">{groups}</div>
  <p class="ab-closing">{e(pa["closing"])}</p>
</div></section>""")
    sc = a["sectors"]
    out.append(f"""<section class="sx-sec sx-warm" aria-labelledby="ab-sc-h"><div class="sx-wrap gv-split">
  <div class="gv-head"><h2 id="ab-sc-h" class="sx-h2">{e(sc["title"])}</h2><p class="gv-body">{e(sc["text"])}</p></div>
  <div><ul class="ab-sectors">{"".join(f"<li>{e(t)}</li>" for t in sc["items"])}</ul><p class="ab-note">{e(sc["note"])}</p>
  <p class="ab-links">{"".join(f'<a class="sx-link" href="{h}">{e(t)}</a>' for t, h in sc["links"])}</p></div>
</div></section>""")
    out.append(about_contact(a) + "\n</div>")
    return "\n".join(out)

def about_contact(a):
    # The About page's contact section; the homepage reuses it as its closing section.
    c = a["contact"]
    fields = (f'<div class="sx-frow">{field("ab-name", "Name", auto="name", empty="Please enter your name.")}'
              f'{field("ab-email", "Work email", "email", auto="email", rule="email", empty="Please enter your work email.")}</div>'
              + field("ab-org", "Organization", req=False, auto="organization")
              + field("ab-msg", "Your business challenge", "textarea", rule="long", empty="Please describe your business challenge in a sentence or two."))
    return contact_section(c["title"], c["text"], fields, GOV_PRIVACY, GOV_LEAD)

# ------------------------------------------------------------------ styles (scoped to .sx)
CSS = r'''
/* ================= Service-detail template (.sx), layout after the Devoteam service page ================= */
body:has(.sx:not(.sx-about)) { --max: 1360px; --gutter: 40px; }
@media (max-width: 1023px) { body:has(.sx:not(.sx-about)) { --gutter: 24px; } }
@media (max-width: 599px) { body:has(.sx:not(.sx-about)) { --gutter: 20px; } }
.sx { --sx-max: 1360px; --sx-g: 40px; --sx-pad: 96px; --sx-gap: 56px; background: var(--white); }
@media (max-width: 1023px) { .sx { --sx-g: 24px; --sx-pad: 64px; --sx-gap: 40px; } }
@media (max-width: 599px) { .sx { --sx-g: 20px; --sx-pad: 52px; --sx-gap: 32px; } }
.sx-wrap { max-width: calc(var(--sx-max) + var(--sx-g) * 2); margin-inline: auto; padding-inline: var(--sx-g); }
.sx *, .sx *::before, .sx *::after { border-radius: 0; }
.sx-sec { padding-block: var(--sx-pad); }
.sx-white { background: var(--white); } .sx-warm { background: var(--warm); } .sx-pale { background: var(--bg); }
.sx-navy { background: var(--navy); color: var(--on-navy); }
.sx-h2 { font: 600 clamp(28px, 1.5vw + 18px, 44px)/1.15 var(--serif); color: var(--navy); max-width: 30ch; }
.sx-navy .sx-h2, .sx-contact .sx-h2 { color: var(--white); }
.sx-h2.sx-wide { max-width: 42ch; }
.sx-body { font-size: 18px; line-height: 1.65; color: var(--charcoal); }
.sx-measure { max-width: 62ch; }
.sx-mini { font: 600 14px/1.4 var(--sans); color: var(--muted); margin-block: 14px 6px; }
.sx-link { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; font: 600 16px/1.3 var(--sans); color: var(--blue-text); text-decoration: none; white-space: nowrap; }
.sx-link::after { content: ""; width: 8px; height: 8px; border: solid currentColor; border-width: 2px 2px 0 0; transform: rotate(45deg); transition: transform 200ms ease-out; }
.sx-link:hover { text-decoration: underline; } .sx-link:hover::after { transform: translateX(3px) rotate(45deg); }
.sx-dots { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.sx-dots li { position: relative; padding-inline-start: 20px; font-size: 16px; line-height: 1.5; color: var(--charcoal); }
.sx-dots li::before { content: ""; position: absolute; inset-inline-start: 0; top: .6em; width: 7px; height: 7px; background: var(--blue); }
.sx-ico { width: 28px; height: 28px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: square; stroke-linejoin: miter; }
.sx-plus { width: 14px; height: 14px; flex: none; fill: none; stroke: currentColor; stroke-width: 2; transition: transform 200ms ease-out; }
[aria-expanded="true"] > .sx-plus { transform: rotate(45deg); }
.sx button:focus-visible, .sx a:focus-visible, .sx [tabindex]:focus-visible, .sx summary:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }

/* 1. hero */
.sx-hero { padding-block: calc(var(--header-h) + 56px) 72px; background: linear-gradient(100deg, rgba(15, 31, 51, .97) 0%, rgba(15, 31, 51, .9) 46%, rgba(23, 43, 67, .78) 100%), url("../hero-poster.jpg") center / cover no-repeat, var(--navy-deep); }
.sx-hero-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 64px; align-items: center; }
.sx-hero-copy { display: grid; gap: 22px; justify-items: start; }
.sx-eyebrow { font: 600 15px/1.3 var(--sans); color: var(--link-on-navy); padding-inline-start: 14px; border-inline-start: 3px solid var(--blue); }
.sx-hero h1 { font: 600 clamp(36px, 2.6vw + 22px, 62px)/1.08 var(--serif); color: var(--white); max-width: 19ch; }
.sx-lede { font-size: clamp(18px, .4vw + 16px, 21px); line-height: 1.6; color: var(--on-navy); max-width: 56ch; }
.sx-ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-block-start: 6px; }
.sx-hero-panel { background: rgba(15, 31, 51, .72); border: 1px solid var(--line-navy); padding: 28px; }
.sx-map { width: 100%; height: auto; display: block; }
.sx-map-c { display: none; list-style: none; margin: 0; padding: 0; }
@media (max-width: 599px) {
  .sx-map { display: none; }
  .sx-map-c { display: grid; gap: 22px; position: relative; padding-inline-start: 18px; border-inline-start: 1.5px dashed rgba(143, 214, 248, .7); }
  .sx-map-c > li { display: grid; gap: 4px; padding: 14px 16px; background: rgba(30, 54, 82, .9); border: 1px solid rgba(201, 211, 222, .35); position: relative; }
  .sx-map-c > li:nth-child(2) { border: 2px solid var(--blue); background: #0F2F4D; }
  .sx-map-c > li:not(.hmc-loop):not(:nth-child(3))::after { content: ""; position: absolute; left: 32px; bottom: -22px; width: 2px; height: 22px; background: var(--blue); }
  .hmc-i { font: 600 13px/1.2 var(--sans); color: var(--link-on-navy); }
  .sx-map-c strong { font: 600 22px/1.2 var(--serif); color: var(--white); }
  .hmc-s { font-size: 15px; color: var(--on-navy); }
  .hmc-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
  .hmc-tags span { padding: 4px 10px; font: 500 14px/1.3 var(--sans); color: var(--white); background: rgba(0, 163, 240, .12); border: 1px solid rgba(143, 214, 248, .55); }
  .sx-map-c > li.hmc-loop { padding: 0; background: none; border: 0; font: 500 14px/1.3 var(--sans); color: var(--link-on-navy); }
}
.hm-node { fill: rgba(30, 54, 82, .9); stroke: rgba(201, 211, 222, .35); stroke-width: 1.2; }
.hm-node.hi { fill: #0F2F4D; stroke: #00A3F0; stroke-width: 2; }
.hm-idx { font: 600 13px var(--sans); fill: #8FD6F8; }
.hm-title { font: 600 26px var(--serif); fill: #FFFFFF; }
.hm-sub { font: 400 14px var(--sans); fill: #C9D3DE; }
.hm-tag { fill: rgba(0, 163, 240, .12); stroke: rgba(143, 214, 248, .55); }
.hm-tagt { font: 500 14px var(--sans); fill: #FFFFFF; }
.hm-flow { fill: none; stroke: #00A3F0; stroke-width: 2; }
.hm-link { fill: none; stroke: rgba(143, 214, 248, .5); stroke-width: 1.2; stroke-dasharray: 3 4; }
.hm-loop { fill: none; stroke: rgba(143, 214, 248, .7); stroke-width: 1.5; stroke-dasharray: 6 5; }
.hm-loopt { font: 500 12px var(--sans); fill: #8FD6F8; text-anchor: middle; }
@media (max-width: 1023px) { .sx-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; } .sx-hero-panel { max-width: 640px; } }
@media (max-width: 599px) { .sx-hero { padding-block: calc(var(--header-h) + 36px) 52px; } .sx-ctas { display: grid; width: 100%; } .sx-ctas .btn { width: 100%; } .sx-hero-panel { padding: 14px; } }

/* 2. advisory strip */
.sx-strip { background: var(--bg); border-block-end: 1px solid var(--line); }
.sx-strip-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
.sx-strip-list li { display: grid; gap: 6px; align-content: start; padding: 32px 28px; border-inline-start: 1px solid var(--line); }
.sx-strip-list li:first-child { border-inline-start: 0; padding-inline-start: 0; }
.sx-strip-list strong { font: 700 17px/1.3 var(--sans); color: var(--navy); }
.sx-strip-list span { font-size: 15.5px; line-height: 1.5; color: var(--muted); }
@media (max-width: 1023px) { .sx-strip-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } .sx-strip-list li { padding: 24px 20px; } .sx-strip-list li:nth-child(odd) { border-inline-start: 0; padding-inline-start: 0; } .sx-strip-list li:nth-child(n+3) { border-block-start: 1px solid var(--line); } }
@media (max-width: 479px) { .sx-strip-list { grid-template-columns: minmax(0, 1fr); } .sx-strip-list li { border-inline-start: 0; padding: 18px 0; } .sx-strip-list li + li { border-block-start: 1px solid var(--line); } }

/* 3. challenges */
.sx-chal { list-style: none; margin: 40px 0 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 64px; grid-auto-flow: column; grid-template-rows: repeat(4, auto); }
.sx-chal li { display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: 18px; align-items: center; padding-block: 18px; border-block-end: 1px solid var(--line); font-size: 18px; line-height: 1.5; color: var(--charcoal); }
.sx-chev { width: 20px; height: 28px; fill: none; stroke: var(--blue); stroke-width: 3; stroke-linecap: square; }
@media (max-width: 767px) { .sx-chal { grid-template-columns: minmax(0, 1fr); grid-auto-flow: row; grid-template-rows: none; margin-top: 28px; } .sx-chal li { font-size: 17px; padding-block: 14px; } }

/* 4. benefits */
.sx-ben { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 64px; align-items: center; }
.sx-ben-list { list-style: none; margin: 40px 0 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 40px; }
.sx-ben-list li { display: flex; align-items: center; gap: 16px; padding-block: 18px; border-block-end: 1px solid var(--line-navy); font: 500 17px/1.4 var(--sans); color: var(--white); }
.sx-ben-list .sx-ico { color: var(--link-on-navy); }
.sx-statement { margin: 0; background: var(--warm); color: var(--navy); padding: 44px 40px; display: grid; gap: 22px; border-block-start: 4px solid var(--blue); }
.sx-st-label { font: 600 14px/1.3 var(--sans); color: var(--blue-text); }
.sx-statement p { font: 500 clamp(22px, .9vw + 16px, 30px)/1.35 var(--serif); color: var(--navy); }
.sx-st-mark { display: inline-flex; align-items: center; gap: 10px; font: 600 15px/1.3 var(--sans); color: var(--navy); }
.sx-st-mark img { width: 30px; height: 30px; }
@media (max-width: 1023px) { .sx-ben { grid-template-columns: minmax(0, 1fr); gap: 40px; } }
@media (max-width: 599px) { .sx-ben-list { grid-template-columns: minmax(0, 1fr); margin-top: 24px; } .sx-statement { padding: 28px 24px; } }

/* 5. approach intro */
.sx-app { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); gap: 64px; margin-block-start: 40px; align-items: start; }
.sx-app-copy { display: grid; gap: 18px; max-width: 62ch; }
.sx-app-copy p { font-size: 18px; line-height: 1.7; color: var(--charcoal); }
.sx-app-panel { background: var(--navy); color: var(--on-navy); padding: 36px; display: grid; gap: 26px; }
.sx-app-panel > p { font: 500 clamp(21px, .6vw + 17px, 26px)/1.35 var(--serif); color: var(--white); }
.sx-parts { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-block-start: 1px solid var(--line-navy); }
.sx-parts li { display: grid; gap: 4px; align-content: start; padding: 16px 14px 0 0; position: relative; }
.sx-parts li::before { content: ""; position: absolute; top: -1px; inset-inline-start: 0; width: 32px; height: 3px; background: var(--blue); }
.sx-pi { font: 600 13px/1.3 var(--sans); color: var(--link-on-navy); }
.sx-parts strong { font: 600 16px/1.3 var(--sans); color: var(--white); }
.sx-parts span:last-child { font-size: 14px; line-height: 1.45; color: var(--on-navy); }
@media (max-width: 1023px) { .sx-app { grid-template-columns: minmax(0, 1fr); gap: 32px; } }
@media (max-width: 599px) { .sx-app-panel { padding: 24px; } .sx-parts { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 0; border: 0; } .sx-parts li { border-block-start: 1px solid var(--line-navy); } }

/* 6. journey */
.sx-journey { margin-block-start: var(--sx-gap); scroll-margin-top: calc(var(--header-h) + 16px); }
.sx-kicker { font: 600 15px/1.3 var(--sans); color: var(--blue-text); margin-block-end: 18px; }
.sx-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.sx-tab { position: relative; display: grid; gap: 8px; align-content: start; min-height: 104px; padding: 18px 44px 18px 20px; text-align: start; background: var(--white); border: 1px solid var(--line); color: var(--navy); cursor: pointer; transition: border-color 200ms ease-out, background-color 200ms ease-out; }
.sx-tab:hover { border-color: #7CC4EA; }
.sx-tab[aria-selected="true"] { border: 2px solid var(--blue); padding: 17px 43px 17px 19px; background: #F2F9FD; box-shadow: inset 0 -4px 0 var(--blue); }
.sx-step { font: 600 13px/1.2 var(--sans); color: var(--muted); }
.sx-tab[aria-selected="true"] .sx-step { color: var(--blue-text); }
.sx-tab-t { font: 600 17px/1.3 var(--sans); }
.sx-tick { position: absolute; top: 16px; inset-inline-end: 16px; width: 18px; height: 18px; border: 1.5px solid #A7B1BB; }
.sx-tab[aria-selected="true"] .sx-tick { background: var(--blue); border-color: var(--blue); }
.sx-tab[aria-selected="true"] .sx-tick::after { content: ""; position: absolute; left: 5px; top: 1px; width: 5px; height: 10px; border: solid var(--navy-deep); border-width: 0 2px 2px 0; transform: rotate(45deg); }
.sx-panel { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 56px; align-items: center; padding-block-start: 40px; }
.sx-panel:focus-visible { outline-offset: 6px; }
@media (prefers-reduced-motion: no-preference) { .sx-panel:not([hidden]), .sx-case:not([hidden]) { animation: sx-in 260ms ease-out; } }
@keyframes sx-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.sx-panel-copy { display: grid; gap: 18px; align-content: start; }
.sx-panel-copy h3 { font: 600 clamp(24px, .8vw + 18px, 32px)/1.2 var(--serif); color: var(--navy); }
.sx-panel-copy h3 span { color: var(--blue-text); }
.sx-panel-copy > p { font-size: 18px; line-height: 1.65; color: var(--charcoal); }
.sx-disc { background: var(--bg); }
.sx-disc-btn { width: 100%; min-height: 52px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 20px; background: none; border: 0; font: 600 16px/1.3 var(--sans); color: var(--navy); cursor: pointer; text-align: start; }
.sx-disc-btn:hover { color: var(--blue-text); }
.sx-disc-body { padding: 0 20px 20px; }
.sx-out { display: grid; gap: 4px; padding-inline-start: 16px; border-inline-start: 3px solid var(--blue); font-size: 16px; line-height: 1.55; color: var(--charcoal); }
.sx-out strong { font: 600 14px/1.3 var(--sans); color: var(--blue-text); }
.sx-panel-vis { margin: 0; background: var(--warm); border: 1px solid var(--line); padding: 20px; }
.sx-panel-vis figcaption { font-size: 14px; line-height: 1.45; color: var(--muted); padding: 10px 4px 0; }
.sx-dia { width: 100%; height: auto; display: block; }
.d-cell { fill: #FFFFFF; stroke: #DCE1E6; stroke-width: 1.2; } .d-cell.hi { stroke: #00A3F0; stroke-width: 1.6; }
.d-lab { font: 600 16px var(--sans); fill: #172B43; } .d-sm { font: 500 13px var(--sans); fill: #4A5563; }
.d-line { fill: #EDF0F2; } .d-core { fill: #172B43; } .d-coret { font: 600 22px var(--serif); fill: #FFFFFF; }
.d-conn { fill: none; stroke: #9CCBE6; stroke-width: 1.5; } .d-grid { stroke: #DCE1E6; stroke-dasharray: 3 4; }
.d-phase { fill: #EDF0F2; } .d-bar { fill: #172B43; } .d-bar.hi { fill: #00A3F0; } .d-mile { fill: #FFFFFF; stroke: #0B6FA4; stroke-width: 2; }
.d-dep { fill: none; stroke: #0B6FA4; stroke-width: 1.5; stroke-dasharray: 4 4; } .d-cap { font: 500 13px var(--sans); fill: #4A5563; }
.d-ring { fill: none; stroke: #9CCBE6; stroke-width: 2; stroke-dasharray: 6 6; } .d-arrow { fill: none; stroke: #0B6FA4; stroke-width: 2.4; }
@media (max-width: 599px) { .d-lab { font-size: 22px; } .d-sm { font-size: 20px; } .d-coret { font-size: 28px; } .d-xs { display: none; } }
@media (max-width: 1023px) { .sx-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; } .sx-panel { grid-template-columns: minmax(0, 1fr); gap: 28px; padding-block-start: 28px; } }
@media (max-width: 599px) { .sx-tab { min-height: 96px; padding: 14px 36px 14px 14px; } .sx-tab[aria-selected="true"] { padding: 13px 35px 13px 13px; } .sx-tab-t { font-size: 15px; } .sx-tick { top: 12px; inset-inline-end: 12px; } .sx-panel-vis { padding: 10px; } .sx-disc-btn { padding-inline: 16px; } .sx-disc-body { padding: 0 16px 16px; } }

/* 7. tools */
.sx-tools { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; margin-block-start: 40px; align-items: start; }
.sx-tools-l { display: grid; gap: 32px; }
.sx-sum { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.sx-sum li { background: var(--white); border: 1px solid var(--line); padding: 22px; display: grid; gap: 6px; align-content: start; }
.sx-sum strong { font: 600 21px/1.25 var(--serif); color: var(--navy); }
.sx-sum span { font-size: 15px; line-height: 1.5; color: var(--muted); }
.sx-rows { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; }
.sx-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px 24px; align-items: center; background: var(--white); border: 1px solid var(--line); border-inline-start: 4px solid var(--blue); padding: 24px 28px; }
.sx-row-head { display: grid; gap: 6px; }
.sx-row h3 { font: 600 20px/1.3 var(--sans); color: var(--navy); }
.sx-row p { font-size: 16px; line-height: 1.55; color: var(--muted); }
.sx-row-btn { display: inline-flex; align-items: center; gap: 10px; min-height: 44px; padding: 8px 16px; background: none; border: 1px solid var(--navy); font: 600 15px/1.2 var(--sans); color: var(--navy); cursor: pointer; white-space: nowrap; }
.sx-row-btn:hover, .sx-row-btn[aria-expanded="true"] { background: var(--navy); color: var(--white); }
.sx-row-body { grid-column: 1 / -1; padding-block-start: 12px; border-block-start: 1px solid var(--line); margin-block-start: 8px; }
@media (max-width: 1023px) { .sx-tools { grid-template-columns: minmax(0, 1fr); gap: 32px; } }
@media (max-width: 599px) { .sx-row { grid-template-columns: minmax(0, 1fr); padding: 20px; } .sx-row-btn { justify-self: start; } .sx-sum { gap: 10px; } .sx-sum li { padding: 16px; } .sx-sum strong { font-size: 18px; } }

/* 8. ecosystem */
.sx-center { display: grid; justify-items: center; text-align: center; gap: 18px; }
.sx-center .sx-h2 { max-width: 30ch; }
.sx-eco { list-style: none; margin: 24px 0 0; padding: 0; width: 100%; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-block: 1px solid #C9D1D9; }
.sx-eco li { display: grid; justify-items: center; gap: 10px; align-content: start; padding: 32px 24px; border-inline-start: 1px solid #C9D1D9; }
.sx-eco li:first-child { border-inline-start: 0; }
.sx-eco .sx-ico { width: 36px; height: 36px; color: var(--blue-text); }
.sx-eco strong { font: 600 21px/1.25 var(--serif); color: var(--navy); }
.sx-eco span { font-size: 15.5px; line-height: 1.5; color: var(--muted); max-width: 30ch; }
.sx-note { font-size: 15px; color: var(--muted); }
.sx-note a { font-weight: 600; color: var(--blue-text); }
@media (max-width: 1023px) { .sx-eco { grid-template-columns: repeat(2, minmax(0, 1fr)); } .sx-eco li:nth-child(3) { border-inline-start: 0; } .sx-eco li:nth-child(n+3) { border-block-start: 1px solid #C9D1D9; } }
@media (max-width: 479px) { .sx-eco { grid-template-columns: minmax(0, 1fr); } .sx-eco li { border-inline-start: 0; padding: 22px 8px; } .sx-eco li + li { border-block-start: 1px solid #C9D1D9; } }

/* 9. alternating grid */
.sx-alt { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; margin-block-start: 48px; }
.sx-alt-col { display: flex; flex-direction: column; gap: 32px; }
.sx-alt-col.sx-rev { flex-direction: column-reverse; justify-content: flex-end; }
.sx-gt { display: grid; gap: 12px; align-content: start; padding: 8px 0; }
.sx-gn { font: 600 14px/1 var(--sans); color: var(--blue-text); padding-block-end: 12px; border-block-end: 2px solid var(--blue); justify-self: start; }
.sx-gt h3 { font: 600 clamp(22px, .5vw + 18px, 26px)/1.25 var(--serif); color: var(--navy); }
.sx-gt p { font-size: 17px; line-height: 1.6; color: var(--muted); }
.sx-gi { width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; background: var(--bg); }
.sx-words { aspect-ratio: 4 / 5; background: var(--grad-blue); display: flex; flex-direction: column; justify-content: flex-end; gap: 6px; padding: 32px; }
.sx-words span { font: 600 clamp(28px, 1.4vw + 16px, 40px)/1.15 var(--serif); color: var(--white); }
.sx-words span:nth-child(2) { color: var(--link-on-navy); }
@media (max-width: 1023px) { .sx-alt { grid-template-columns: repeat(2, minmax(0, 1fr)); } .sx-alt-col:last-child { grid-column: 1 / -1; flex-direction: row; } .sx-alt-col:last-child > * { flex: 1 1 0; min-width: 0; } .sx-alt-col:last-child .sx-words { aspect-ratio: auto; min-height: 280px; } }
@media (max-width: 599px) { .sx-alt { grid-template-columns: minmax(0, 1fr); gap: 40px; margin-top: 32px; } .sx-alt-col, .sx-alt-col.sx-rev, .sx-alt-col:last-child { flex-direction: column; gap: 18px; } .sx-gi { aspect-ratio: 4 / 3; } .sx-alt-col:last-child .sx-words { min-height: 220px; } }

/* 10. engagement examples */
.sx-head-row { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px 40px; margin-block-end: 40px; }
.sx-head-row > div { display: grid; gap: 14px; }
.sx-cases { display: grid; }
.sx-case { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); background: var(--white); border: 1px solid var(--line); }
.sx-case-img { width: 100%; height: 100%; min-height: 420px; object-fit: cover; }
.sx-case-copy { display: grid; gap: 16px; align-content: center; justify-items: start; padding: 48px; }
.sx-illus { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; background: var(--navy); color: var(--white); font: 600 13px/1.2 var(--sans); }
.sx-illus::before { content: ""; width: 7px; height: 7px; background: var(--blue); }
.sx-case-k { font: 600 15px/1.3 var(--sans); color: var(--blue-text); }
.sx-case-copy h3 { font: 600 clamp(24px, .9vw + 18px, 34px)/1.2 var(--serif); color: var(--navy); }
.sx-case-copy > p { font-size: 17px; line-height: 1.6; color: var(--charcoal); }
.sx-case-det { width: 100%; border-block-start: 1px solid var(--line); padding-block-start: 4px; }
.sx-case-det p { font-size: 16px; line-height: 1.55; color: var(--charcoal); }
.sx-ctabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-block-start: 16px; }
.sx-ctab { display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: 14px; align-items: center; padding: 12px; text-align: start; background: var(--white); border: 1px solid var(--line); border-block-end: 3px solid transparent; cursor: pointer; color: var(--navy); }
.sx-ctab img { width: 88px; height: 66px; object-fit: cover; }
.sx-ctab > span { display: grid; gap: 4px; }
.sx-ctab-k { font: 600 13px/1.2 var(--sans); color: var(--muted); }
.sx-ctab-t { font: 600 15px/1.35 var(--sans); }
.sx-ctab:hover { border-color: #7CC4EA; }
.sx-ctab[aria-selected="true"] { border-color: var(--line); border-block-end-color: var(--blue); background: #F2F9FD; }
.sx-ctab[aria-selected="true"] .sx-ctab-k { color: var(--blue-text); }
@media (max-width: 1023px) { .sx-case { grid-template-columns: minmax(0, 1fr); } .sx-case-img { min-height: 0; aspect-ratio: 16 / 9; height: auto; } .sx-case-copy { padding: 32px; } }
@media (max-width: 767px) { .sx-ctabs { grid-template-columns: minmax(0, 1fr); gap: 8px; } }
@media (max-width: 599px) { .sx-case-copy { padding: 24px 20px; } .sx-ctab { grid-template-columns: 64px minmax(0, 1fr); } .sx-ctab img { width: 64px; height: 48px; } }

/* 11. insights */
.sx-ins { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 32px; align-items: start; }
.sx-ins-feat { display: grid; gap: 20px; }
.sx-ins-feat .sx-ins-vis { aspect-ratio: 16 / 10; }
.sx-ins-side { display: grid; gap: 24px; }
.sx-ins-item { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 20px; align-items: start; padding-block-end: 24px; border-block-end: 1px solid #C9D1D9; }
.sx-ins-item:last-child { border: 0; padding: 0; }
.sx-ins-vis { background: var(--navy); overflow: hidden; aspect-ratio: 4 / 3; }
.sx-ins-vis img, .sx-ins-vis svg { width: 100%; height: 100%; object-fit: cover; display: block; }
.sx-ins-copy { display: grid; gap: 10px; justify-items: start; }
.sx-ins-k { font: 600 14px/1.3 var(--sans); color: var(--blue-text); }
.sx-ins-feat h3 { font: 600 clamp(24px, .8vw + 18px, 32px)/1.2 var(--serif); color: var(--navy); }
.sx-ins-item h3 { font: 600 19px/1.3 var(--serif); color: var(--navy); }
.sx-ins-copy h3 a { color: inherit; text-decoration: none; }
.sx-ins-copy h3 a:hover { color: var(--blue-text); text-decoration: underline; }
.sx-pill-link { display: inline-flex; align-items: center; min-height: 44px; padding: 8px 18px; border: 1px solid var(--blue-text); background: transparent; color: var(--blue-text); font: 600 15px/1.2 var(--sans); text-decoration: none; cursor: pointer; }
.sx-pill-link:hover, .sx-pill-link[aria-expanded="true"] { background: var(--blue-text); color: var(--white); }
.sx-ins-prev { display: grid; gap: 4px; padding: 14px 16px; background: var(--white); border-inline-start: 3px solid var(--blue); }
.sx-ins-prev p { font-size: 16px; line-height: 1.55; color: var(--charcoal); }
.sx-ins-prev .sx-mini { margin: 4px 0 0; }
.iv-bg { fill: #172B43; } .iv-grid { stroke: rgba(201, 211, 222, .16); stroke-width: 1; fill: none; }
.iv-line { fill: none; stroke: #00A3F0; stroke-width: 4; } .iv-fade { fill: none; stroke: #8FD6F8; stroke-width: 4; stroke-dasharray: 2 10; stroke-linecap: square; }
.iv-mark { stroke: rgba(255, 255, 255, .5); stroke-dasharray: 4 5; } .iv-tag { fill: #FFFFFF; } .iv-tagt { font: 600 14px var(--sans); fill: #172B43; }
.iv-ax { font: 500 14px var(--sans); fill: #C9D3DE; } .iv-card { fill: rgba(255, 255, 255, .05); stroke: rgba(201, 211, 222, .35); }
.iv-cell { fill: rgba(201, 211, 222, .35); } .iv-cell.hi { fill: #00A3F0; }
@media (max-width: 1023px) { .sx-ins { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 479px) { .sx-ins-item { grid-template-columns: minmax(0, 1fr); } }

/* 12. advisors */
.sx-adv { display: grid; grid-template-columns: repeat(2, minmax(0, 300px)); gap: 48px; justify-content: center; margin-block-start: 24px; }
.sx-person, .sx-support { display: grid; gap: 8px; justify-items: center; align-content: start; text-align: center; text-decoration: none; color: inherit; }
.sx-person img { width: 220px; height: 220px; object-fit: cover; margin-block-end: 10px; background: var(--bg); }
.sx-person strong, .sx-support strong { font: 600 21px/1.3 var(--serif); color: var(--navy); }
.sx-person span, .sx-support > span { font-size: 15.5px; line-height: 1.5; color: var(--muted); }
.sx-ico-lg { width: 220px; height: 220px; padding: 70px; color: var(--blue-text); background: var(--bg); stroke-width: .9; margin-block-end: 10px; box-sizing: border-box; }
@media (max-width: 599px) { .sx-adv { grid-template-columns: minmax(0, 1fr); gap: 40px; } .sx-person img, .sx-ico-lg { width: 180px; height: 180px; } .sx-ico-lg { padding: 56px; } }

/* 13. contact */
.sx-contact { padding-block: var(--sx-pad); color: var(--on-navy); scroll-margin-top: var(--header-h);
  background: radial-gradient(ellipse at 15% 85%, rgba(0, 163, 240, .28), transparent 55%), linear-gradient(135deg, #0F1F33 0%, #172B43 45%, #075985 100%); position: relative; }
.sx-contact::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(115deg, transparent 0 46px, rgba(143, 214, 248, .05) 46px 47px); pointer-events: none; }
.sx-ct { position: relative; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; align-items: center; }
.sx-ct-copy { display: grid; gap: 20px; align-content: center; }
.sx-ct-copy > p { font-size: 18px; line-height: 1.65; max-width: 46ch; }
.sx-ct-alt { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 12px; }
.sx-ct-alt li { display: grid; gap: 0; }
.sx-ct-alt span { font: 600 13px/1.3 var(--sans); color: var(--on-navy); }
.sx-ct-alt a { font: 600 18px/1.4 var(--sans); color: var(--white); text-decoration: underline; text-decoration-color: rgba(143, 214, 248, .6); text-underline-offset: 4px; display: inline-flex; align-items: center; min-height: 44px; justify-self: start; }
.sx-ct-alt a:hover { color: var(--link-on-navy); }
.sx-form { background: var(--white); padding: 40px; display: grid; gap: 18px; color: var(--charcoal); }
.sx-req { font-size: 14px; color: var(--muted); }
.sx-frow { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.sx-field { display: grid; gap: 6px; min-width: 0; align-content: start; }
.sx-field label { font: 600 15px/1.3 var(--sans); color: var(--navy); }
.sx-opt { font-weight: 400; color: var(--muted); }
.sx-field input, .sx-field textarea { width: 100%; min-height: 48px; padding: 12px 14px; border: 1px solid #B7C1CB; background: var(--white); color: var(--charcoal); font: 400 16px/1.5 var(--sans); }
.sx-field textarea { resize: vertical; min-height: 120px; }
.sx-field input:focus-visible, .sx-field textarea:focus-visible { outline: 2px solid var(--blue); outline-offset: 1px; border-color: var(--navy); }
.sx-field [aria-invalid="true"] { border: 2px solid #B42318; }
.sx-err { font: 500 14px/1.4 var(--sans); color: #B42318; }
.sx-privacy { font-size: 14px; line-height: 1.5; color: var(--muted); }
.sx-privacy a { color: var(--blue-text); }
.sx-submit { justify-self: start; }
.sx-status { padding: 16px 18px; border-inline-start: 4px solid var(--blue-text); background: #F2F9FD; font-size: 15.5px; line-height: 1.55; color: var(--navy); }
.sx-status.is-error { border-color: #B42318; background: #FEF3F2; color: #7A271A; }
.sx-status a { color: var(--blue-text); font-weight: 600; }
@media (max-width: 1023px) { .sx-ct { grid-template-columns: minmax(0, 1fr); gap: 40px; } }
@media (max-width: 599px) { .sx-form { padding: 24px 20px; } .sx-frow { grid-template-columns: minmax(0, 1fr); } .sx-submit { width: 100%; } }

/* 14. FAQ */
.sx-faq { margin-block-start: 36px; border-block-start: 1px solid var(--line); }
.sx-faq details { border-block-end: 1px solid var(--line); }
.sx-faq summary { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 20px; min-height: 64px; padding: 18px 4px; font: 600 18px/1.4 var(--sans); color: var(--navy); }
.sx-faq summary::-webkit-details-marker { display: none; }
.sx-faq summary::after { content: ""; flex: none; width: 10px; height: 10px; border: solid var(--blue-text); border-width: 0 2px 2px 0; transform: rotate(45deg) translate(-2px, -2px); transition: transform 200ms ease-out; }
.sx-faq details[open] > summary::after { transform: rotate(225deg); }
.sx-faq summary:hover { color: var(--blue-text); }
.sx-faq details p { padding: 0 4px 22px; max-width: 75ch; font-size: 17px; line-height: 1.65; color: var(--muted); }
@media (max-width: 599px) { .sx-faq summary { font-size: 16.5px; } .sx-faq details p { font-size: 16px; } }

/* ---- layout "gov": brand baseline type scale (H1 48/34, H2 32/26, H3 24/22, body 16) ---- */
.sx-gov .sx-h2 { font: 600 32px/1.2 var(--serif); max-width: 34ch; }
.sx-gov h3 { font: 600 24px/1.3 var(--serif); color: var(--navy); }
.sx-gov p { font-size: 16px; line-height: 1.6; }
.gv-body { color: var(--charcoal); max-width: 64ch; }
@media (max-width: 767px) { .sx-gov .sx-h2 { font-size: 26px; line-height: 1.25; } .sx-gov h3 { font-size: 22px; } }
.gv-hero { position: relative; overflow: hidden; padding-block: calc(var(--header-h) + 88px) 104px; background: linear-gradient(90deg, rgba(15, 31, 51, .98) 0%, rgba(15, 31, 51, .9) 55%, rgba(23, 43, 67, .72) 100%), var(--navy-2); }
.gv-hero-in { position: relative; }
.gv-hero-copy { width: min(100%, 60%); display: grid; gap: 22px; justify-items: start; }
.sx-gov .gv-hero h1 { font: 600 48px/1.15 var(--serif); color: var(--white); max-width: 20ch; }
.sx-gov .gv-hero .sx-lede { font-size: 19px; line-height: 1.6; max-width: 54ch; }
.gv-ctas { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; margin-block-start: 6px; }
.gv-anchor { display: inline-flex; align-items: center; min-height: 44px; font: 600 16px/1.3 var(--sans); color: var(--white); text-decoration: underline; text-decoration-color: rgba(143, 214, 248, .7); text-underline-offset: 5px; }
.gv-anchor:hover { color: var(--link-on-navy); }
.sx-slot { display: grid; gap: 4px; align-content: end; padding: 16px; border: 1px dashed #A7B1BB; background: repeating-linear-gradient(135deg, #E4E8EC 0 12px, #EDF0F2 12px 24px); color: var(--muted); font: 400 13px/1.45 var(--sans); }
.sx-slot-id { font-weight: 600; color: var(--navy); }
.gv-hero-slot { position: absolute; inset: 0 0 0 auto; width: 40%; background: rgba(255, 255, 255, .02); border: 0; border-inline-start: 1px dashed rgba(201, 211, 222, .25); color: rgba(201, 211, 222, .75); padding: 24px var(--sx-g) 24px 24px; }
.gv-hero-slot .sx-slot-id { color: var(--on-navy); }
.gv-hero-slot .sx-slot-b { max-width: 42ch; }
@media (max-width: 1023px) { .gv-hero-copy { width: 100%; } .gv-hero-slot { position: static; width: auto; margin: 32px var(--sx-g) 0; order: 2; border: 1px dashed rgba(201, 211, 222, .25); padding: 14px 16px; } .gv-hero { display: flex; flex-direction: column; } }
@media (max-width: 767px) { .sx-gov .gv-hero h1 { font-size: 34px; line-height: 1.2; } .sx-gov .gv-hero .sx-lede { font-size: 17px; } .gv-hero { padding-block: calc(var(--header-h) + 40px) 48px; } }
.gv-tight { padding-block: 72px; }
.gv-needs { list-style: none; margin: 32px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.gv-needs li { display: grid; gap: 10px; align-content: start; padding: 4px 32px; border-inline-start: 1px solid var(--line); }
.gv-needs li:first-child { border: 0; padding-inline-start: 0; }
.gv-needs p { color: var(--muted); }
@media (max-width: 767px) { .gv-tight { padding-block: 52px; } .gv-needs { grid-template-columns: minmax(0, 1fr); margin-top: 20px; } .gv-needs li { border: 0; border-block-start: 1px solid var(--line); padding: 20px 0; } .gv-needs li:first-child { border-block-start: 0; padding-top: 4px; } }
.gv-head { display: grid; gap: 14px; align-content: start; }
.gv-scope { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 48px; margin-block-start: 40px; align-items: start; }
.gv-tabs { display: grid; border-block-start: 1px solid var(--line); }
.gv-tab { display: flex; align-items: center; gap: 16px; min-height: 64px; padding: 14px 20px; text-align: start; background: none; border: 0; border-block-end: 1px solid var(--line); border-inline-start: 3px solid transparent; font: 600 17px/1.3 var(--sans); color: var(--navy); cursor: pointer; transition: background-color 200ms ease-out, border-color 200ms ease-out; }
.gv-tab:hover { background: var(--warm); }
.gv-tab[aria-selected="true"] { background: var(--warm); border-inline-start-color: var(--blue); color: var(--navy); }
.gv-tab-n { font: 600 14px/1 var(--sans); color: var(--muted); }
.gv-tab[aria-selected="true"] .gv-tab-n { color: var(--blue-text); }
.gv-panels { background: var(--warm); border: 1px solid var(--line); }
.gv-panel { display: grid; gap: 16px; align-content: start; padding: 48px; min-height: 100%; }
.gv-panel-k { display: none; font: 600 14px/1.3 var(--sans); color: var(--blue-text); }
.gv-panel > p:not(.gv-panel-k):not(.gv-out) { font-size: 18px; color: var(--charcoal); max-width: 60ch; }
.gv-out { padding-inline-start: 16px; border-inline-start: 3px solid var(--blue); color: var(--navy); font-weight: 500; }
@media (min-width: 768px) { .gv-panel.is-off { display: none; } }
@media (prefers-reduced-motion: no-preference) and (min-width: 768px) { .gv-panel:not(.is-off) { animation: sx-in 260ms ease-out; } }
@media (max-width: 767px) { .gv-scope { grid-template-columns: minmax(0, 1fr); margin-top: 24px; } .gv-tabs { display: none; } .gv-panels { background: none; border: 0; display: grid; gap: 12px; } .gv-panel { padding: 22px 20px; background: var(--warm); border: 1px solid var(--line); border-inline-start: 3px solid var(--blue); } .gv-panel-k { display: block; } .gv-panel > p:not(.gv-panel-k):not(.gv-out) { font-size: 16px; } }
.gv-docs { list-style: none; margin: 40px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
.gv-docs li { display: grid; gap: 14px; align-content: start; padding: 28px 24px 32px; background: var(--navy-2); border: 1px solid var(--line-navy); border-block-start: 3px solid var(--blue); }
.gv-doc-n { font: 600 15px/1 var(--sans); color: var(--link-on-navy); }
.sx-gov .gv-docs h3 { font-size: 21px; color: var(--white); }
.gv-docs p { color: var(--on-navy); }
.sx-gov .gv-result { margin-block-start: 32px; font: 500 18px/1.5 var(--sans); color: var(--white); }
@media (max-width: 1023px) { .gv-docs { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 599px) { .gv-docs { grid-template-columns: minmax(0, 1fr); gap: 12px; } .gv-docs li { padding: 22px 20px; } }
.gv-split { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; align-items: start; }
.gv-steps { list-style: none; margin: 0; padding: 0; border-block-start: 1px solid #C9D1D9; }
.gv-steps li { display: grid; grid-template-columns: 56px minmax(0, 1fr); gap: 16px; align-items: baseline; padding-block: 22px; border-block-end: 1px solid #C9D1D9; }
.gv-steps span { font: 600 16px/1 var(--sans); color: var(--blue-text); }
.sx-gov .gv-steps p { font: 500 18px/1.45 var(--sans); color: var(--navy); }
@media (max-width: 1023px) { .gv-split { grid-template-columns: minmax(0, 1fr); gap: 28px; } }
.gv-people { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.gv-person { display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 24px; align-items: center; padding: 20px; background: var(--white); border: 1px solid var(--line); }
.gv-person img { width: 160px; height: 160px; object-fit: cover; background: var(--bg); }
.gv-person > div { display: grid; gap: 8px; }
.gv-person p { color: var(--muted); }
.gv-partner { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 32px; align-items: center; margin-block-start: 32px; padding: 24px 28px; border-block: 1px solid var(--line); }
.gv-partner img { width: 180px; height: auto; }
.gv-partner > div { display: grid; gap: 6px; }
.sx-gov .gv-partner h3 { font: 600 17px/1.3 var(--sans); }
.gv-partner p { color: var(--muted); max-width: 70ch; }
@media (max-width: 899px) { .gv-people { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 599px) { .gv-person { grid-template-columns: 104px minmax(0, 1fr); gap: 16px; padding: 14px; } .gv-person img { width: 104px; height: 104px; } .sx-gov .gv-person h3 { font-size: 20px; } .gv-partner { grid-template-columns: minmax(0, 1fr); gap: 16px; padding: 20px 0; } .gv-partner img { width: 150px; } }
.gv-related { margin-block-start: 48px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 32px; padding-block-start: 24px; border-block-start: 1px solid var(--line); }
.sx-gov .gv-related h2 { font: 600 15px/1.3 var(--sans); color: var(--muted); }
.gv-related ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0 32px; }
.gv-related .sx-link { white-space: normal; }
.sx-flead { color: var(--charcoal); }
.sx-gov .sx-faq summary { font-size: 17px; }
/* ---- layout "people": light split hero, alternating editorial blocks ---- */
.pp-hero { display: grid; grid-template-columns: minmax(0, 55fr) minmax(0, 45fr); background: var(--warm); padding-block-start: var(--header-h); border-block-end: 1px solid var(--line); }
.pp-hero-copy { display: grid; gap: 22px; justify-items: start; align-content: center; padding-block: 72px 80px; padding-inline: max(var(--sx-g), calc((100% - var(--sx-max)) / 2)) 56px; }
.pp-hero .crumbs, .pp-hero .crumbs a { color: var(--muted); }
.pp-hero .crumbs a:hover { color: var(--blue-text); }
.pp-hero .crumbs li + li::before { color: #A7B1BB; }
.pp-eyebrow { font: 600 15px/1.3 var(--sans); color: var(--blue-text); padding-inline-start: 14px; border-inline-start: 3px solid var(--blue); }
.sx-ppl .pp-hero h1 { font: 600 48px/1.15 var(--serif); color: var(--navy); max-width: 18ch; }
.sx-ppl .pp-lede { font-size: 19px; line-height: 1.6; color: var(--charcoal); max-width: 52ch; }
.pp-anchor { display: inline-flex; align-items: center; min-height: 44px; font: 600 16px/1.3 var(--sans); color: var(--blue-text); text-decoration: underline; text-underline-offset: 5px; }
.pp-anchor:hover { color: var(--navy); }
.pp-hero-slot { aspect-ratio: 8 / 9; min-height: 100%; border: 0; border-inline-start: 1px dashed #A7B1BB; padding: 28px; }
@media (max-width: 899px) { .pp-hero { grid-template-columns: minmax(0, 1fr); } .pp-hero-copy { padding: 48px var(--sx-g) 40px; } .pp-hero-slot { aspect-ratio: 4 / 3; min-height: 0; border: 0; border-block-start: 1px dashed #A7B1BB; } }
@media (max-width: 767px) { .sx-ppl .pp-hero h1 { font-size: 34px; line-height: 1.2; } .sx-ppl .pp-lede { font-size: 17px; } .pp-hero-copy { padding-block: 36px 36px; } .pp-hero-slot { padding: 18px var(--sx-g); } }
.pp-needs-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; align-items: start; }
.pp-needs { list-style: none; margin: 0; padding: 0; border-block-start: 1px solid var(--line); }
.pp-needs li { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 8px 32px; padding-block: 24px; border-block-end: 1px solid var(--line); }
.sx-ppl .pp-needs h3 { font-size: 22px; }
.pp-needs p { color: var(--muted); }
@media (max-width: 1023px) { .pp-needs-grid { grid-template-columns: minmax(0, 1fr); gap: 24px; } }
@media (max-width: 599px) { .pp-needs li { grid-template-columns: minmax(0, 1fr); padding-block: 18px; } }
.pp-block { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); gap: 64px; align-items: center; margin-block-start: 56px; }
.pp-block + .pp-block { margin-block-start: 64px; }
.pp-block-slot { aspect-ratio: 4 / 3; }
.pp-block-copy { display: grid; gap: 16px; align-content: start; }
.pp-block-copy > p { color: var(--charcoal); max-width: 58ch; }
.pp-points { list-style: none; margin: 4px 0 0; padding: 0; border-block-start: 1px solid var(--line); }
.pp-points li { position: relative; padding: 14px 0 14px 24px; border-block-end: 1px solid var(--line); font: 500 16px/1.5 var(--sans); color: var(--navy); }
.pp-points li::before { content: ""; position: absolute; left: 0; top: 22px; width: 10px; height: 2px; background: var(--blue); }
.pp-dia { margin: 0; display: grid; gap: 14px; padding: 40px 32px; background: var(--white); border: 1px solid var(--line); }
.pp-dia ol { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 36px; }
.pp-dia li { position: relative; display: grid; gap: 10px; align-content: start; min-height: 120px; padding: 18px 16px; background: var(--warm); border: 1px solid var(--line); border-block-start: 3px solid var(--navy); font: 600 17px/1.3 var(--sans); color: var(--navy); }
.pp-dia li:last-child { background: var(--navy); color: var(--white); border-color: var(--navy); border-block-start-color: var(--blue); }
.pp-dia li:last-child .pp-dn { color: var(--link-on-navy); }
.pp-dia li + li::before { content: ""; position: absolute; left: -30px; top: 50%; width: 22px; height: 2px; background: var(--blue-text); }
.pp-dia li + li::after { content: ""; position: absolute; left: -14px; top: calc(50% - 5px); width: 8px; height: 8px; border: solid var(--blue-text); border-width: 2px 2px 0 0; transform: rotate(45deg); }
.pp-dn { font: 600 14px/1 var(--sans); color: var(--blue-text); }
.pp-dia figcaption { font-size: 14px; color: var(--muted); }
@media (max-width: 1023px) { .pp-block, .pp-block.pp-rev { grid-template-columns: minmax(0, 1fr); gap: 28px; } .pp-rev .pp-block-copy { order: -1; } }
@media (min-width: 1024px) { .pp-rev .pp-block-copy { order: 0; } }
@media (max-width: 599px) { .pp-dia { padding: 22px 18px; } .pp-dia ol { grid-template-columns: minmax(0, 1fr); gap: 28px; } .pp-dia li { min-height: 0; }
  .pp-dia li + li::before { left: 24px; top: -24px; width: 2px; height: 20px; } .pp-dia li + li::after { left: 20px; top: -12px; transform: rotate(135deg); } }
.pp-rows { list-style: none; margin: 36px 0 0; padding: 0; border-block-start: 1px solid var(--navy); }
.pp-rows li { display: grid; grid-template-columns: 64px minmax(0, 5fr) minmax(0, 6fr); gap: 8px 32px; align-items: baseline; padding-block: 26px; border-block-end: 1px solid var(--line); }
.pp-rn { font: 600 16px/1 var(--sans); color: var(--blue-text); }
.sx-ppl .pp-rows h3 { font-size: 22px; }
.pp-rows p { color: var(--muted); max-width: 60ch; }
.sx-ppl .pp-result { margin-block-start: 36px; font: 500 italic 26px/1.35 var(--serif); color: var(--navy); max-width: 40ch; }
@media (max-width: 767px) { .pp-rows li { grid-template-columns: 44px minmax(0, 1fr); } .pp-rows p { grid-column: 2; } .sx-ppl .pp-rows h3 { font-size: 20px; } .sx-ppl .pp-result { font-size: 22px; } }
.pp-case { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; align-items: start; }
.pp-case-img { margin: 0; display: grid; gap: 8px; }
.pp-case-img img { width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; }
.pp-case-img figcaption { font-size: 14px; color: var(--muted); }
.pp-case-copy { display: grid; gap: 18px; justify-items: start; }
.pp-gate { display: grid; gap: 4px; width: 100%; padding: 14px 16px; background: var(--pending-bg); border: 1px dashed var(--pending-line); color: var(--pending-fg); font-size: 15px; line-height: 1.5; }
.pp-gate strong { font: 600 14px/1.3 var(--sans); }
.pp-dl { margin: 0; width: 100%; border-block-start: 1px solid #C9D1D9; }
.pp-dl > div { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 8fr); gap: 6px 24px; padding-block: 18px; border-block-end: 1px solid #C9D1D9; }
.pp-dl dt { font: 600 15px/1.5 var(--sans); color: var(--navy); }
.pp-dl dd { margin: 0; font-size: 16px; line-height: 1.6; color: var(--charcoal); }
@media (max-width: 1023px) { .pp-case { grid-template-columns: minmax(0, 1fr); gap: 32px; } .pp-case-img { max-width: 520px; } }
@media (max-width: 599px) { .pp-dl > div { grid-template-columns: minmax(0, 1fr); } }
.gv-plogo { display: inline-flex; align-items: center; gap: 12px; font: 600 16px/1.3 var(--sans); color: var(--navy); }
.gv-plogo > span { display: none; }
.gv-partner-mark .gv-plogo img { width: 56px; height: 56px; }
.gv-partner-mark .gv-plogo > span { display: inline; }
/* ---- layout "ops": friction panels, step ribbon, output table ---- */
.op-fric { list-style: none; margin: 36px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.op-fric li { display: grid; gap: 12px; align-content: start; padding: 32px 28px; background: var(--warm); border: 1px solid var(--line); }
.op-fric .sx-ico { width: 32px; height: 32px; color: var(--blue-text); }
.op-fric p { color: var(--muted); }
@media (max-width: 899px) { .op-fric { grid-template-columns: minmax(0, 1fr); gap: 12px; } .op-fric li { padding: 22px 20px; } }
.op-ribbon { list-style: none; margin: 40px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0 4px; }
.op-ribbon li { display: grid; grid-template-rows: auto 1fr; gap: 20px; }
.sx-ops .op-step { position: relative; display: flex; align-items: center; gap: 4px; min-height: 64px; padding: 14px 40px 14px 22px; background: var(--navy); color: var(--white); font: 600 17px/1.3 var(--sans);
  clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%); }
.op-ribbon li:not(:first-child) .op-step { clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 18px 50%); padding-inline-start: 34px; }
.op-ribbon li:last-child .op-step { background: var(--blue-text); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 18px 50%); padding-inline-end: 22px; }
.op-step span { color: var(--link-on-navy); }
.op-ribbon li:last-child .op-step span { color: var(--white); }
.sx-ops .op-desc { padding: 0 20px 0 22px; color: var(--charcoal); }
@media (max-width: 899px) {
  .op-ribbon { grid-template-columns: minmax(0, 1fr); gap: 0; border-inline-start: 2px solid var(--navy); margin-inline-start: 8px; }
  .op-ribbon li { gap: 8px; padding: 0 0 28px 24px; position: relative; }
  .op-ribbon li::before { content: ""; position: absolute; left: -9px; top: 22px; width: 16px; height: 16px; background: var(--warm); border: 2px solid var(--navy); }
  .op-ribbon li:last-child { padding-bottom: 0; }
  .sx-ops .op-step, .op-ribbon li:not(:first-child) .op-step, .op-ribbon li:last-child .op-step { clip-path: none; min-height: 56px; padding: 12px 16px; }
  .sx-ops .op-desc { padding: 0; } }
.op-table-sec { padding-block-start: 0; }
.op-table { width: 100%; margin-block-start: 32px; border-collapse: collapse; border-block-start: 2px solid var(--navy); }
.op-table thead th { padding: 14px 24px 14px 0; text-align: start; font: 600 14px/1.3 var(--sans); color: var(--muted); border-block-end: 1px solid var(--line); }
.op-table tbody th { width: 38%; padding: 24px 24px 24px 0; text-align: start; vertical-align: top; font: 600 21px/1.3 var(--serif); color: var(--navy); border-block-end: 1px solid var(--line); }
.op-table td { padding: 24px 0; vertical-align: top; font-size: 17px; line-height: 1.6; color: var(--charcoal); border-block-end: 1px solid var(--line); }
.op-ml { display: none; }
@media (max-width: 767px) {
  .op-table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .op-table, .op-table tbody, .op-table tr, .op-table th, .op-table td { display: block; width: auto; }
  .op-table tr { padding-block: 18px; border-block-end: 1px solid var(--line); }
  .op-table tbody th, .op-table td { padding: 0; border: 0; } .op-table tbody th { width: auto; font-size: 20px; margin-bottom: 8px; }
  .op-ml { display: block; font: 600 13px/1.3 var(--sans); color: var(--muted); margin-bottom: 2px; } .op-table td { font-size: 16px; } }
.op-band { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; align-items: start; }
.sx-ops .op-band .sx-h2 { font-size: 40px; line-height: 1.15; }
.op-ben { list-style: none; margin: 0; padding: 0; border-block-start: 1px solid var(--line-navy); }
.op-ben li { position: relative; padding: 20px 0 20px 28px; border-block-end: 1px solid var(--line-navy); font: 500 19px/1.45 var(--sans); color: var(--white); }
.op-ben li::before { content: ""; position: absolute; left: 0; top: 30px; width: 12px; height: 2px; background: var(--blue); }
.sx-ops .op-note { margin-block-start: 22px; color: var(--on-navy); }
@media (max-width: 899px) { .op-band { grid-template-columns: minmax(0, 1fr); gap: 28px; } .sx-ops .op-band .sx-h2 { font-size: 28px; } .op-ben li { font-size: 17px; } }
.op-labels { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 12px; align-content: start; }
.op-labels li { padding: 10px 16px; border: 1px solid var(--navy); font: 500 16px/1.3 var(--sans); color: var(--navy); background: var(--white); }
.op-start + .gv-partner { margin-block-start: 48px; }
.gv-partner img { max-height: 76px; width: auto; max-width: 180px; }
.op-adv { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 48px; align-items: center; max-width: 980px; }
.op-adv > img { width: 240px; height: 240px; object-fit: cover; background: var(--bg); }
.op-adv > div { display: grid; gap: 16px; justify-items: start; }
.op-adv-name { display: grid; gap: 2px; }
.op-adv-name strong { font: 600 22px/1.3 var(--serif); color: var(--navy); }
.op-adv-name span { font-size: 15px; color: var(--muted); }
@media (max-width: 599px) { .op-adv { grid-template-columns: minmax(0, 1fr); gap: 24px; } .op-adv > img { width: 180px; height: 180px; } }
/* ---- layout "growth": typographic chapters, output grid, Growth 360 handoff ---- */
.gr-chapters { list-style: none; margin: 40px 0 0; padding: 0; border-block-start: 1px solid var(--line); }
.gr-ch { display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 16px 40px; align-items: start; padding-block: 40px; border-block-end: 1px solid var(--line); }
.gr-ch.has-media { grid-template-columns: 120px minmax(0, 6fr) minmax(0, 5fr); align-items: center; }
.gr-n { font: 600 64px/1 var(--sans); color: var(--blue-text); letter-spacing: -.02em; }
.gr-ch-copy { display: grid; gap: 12px; max-width: 60ch; }
.gr-ch-copy p { color: var(--charcoal); font-size: 17px; }
.gr-slot { aspect-ratio: 4 / 3; }
@media (max-width: 899px) { .gr-ch, .gr-ch.has-media { grid-template-columns: 72px minmax(0, 1fr); gap: 16px 20px; padding-block: 28px; } .gr-n { font-size: 44px; } .gr-slot { grid-column: 1 / -1; } }
@media (max-width: 479px) { .gr-ch, .gr-ch.has-media { grid-template-columns: minmax(0, 1fr); } .gr-n { font-size: 36px; } }
.gr-grid { list-style: none; margin: 36px 0 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.gr-grid li { display: grid; gap: 10px; align-content: start; padding: 32px; background: var(--white); border: 1px solid var(--line); }
.gr-grid p { color: var(--muted); }
.sx-grow .gr-result { margin-block-start: 28px; font: 500 18px/1.5 var(--sans); color: var(--navy); max-width: 70ch; }
@media (max-width: 767px) { .gr-grid { grid-template-columns: minmax(0, 1fr); gap: 12px; } .gr-grid li { padding: 22px 20px; } }
.gr-g3 { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; align-items: start; }
.gr-g3-copy { display: grid; gap: 18px; justify-items: start; }
.gr-g3-copy p { color: var(--on-navy); max-width: 52ch; }
.gr-g3-link { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; font: 600 16px/1.3 var(--sans); color: var(--link-on-navy); text-underline-offset: 4px; }
.gr-g3-link:hover { color: var(--white); }
.gr-seq { list-style: none; margin: 0; padding: 0; border-block-start: 1px solid var(--line-navy); }
.gr-seq li { display: grid; grid-template-columns: 44px minmax(0, 1fr) auto; gap: 16px; align-items: center; min-height: 72px; padding-block: 12px; border-block-end: 1px solid var(--line-navy); }
.gr-st-n { display: grid; place-items: center; width: 36px; height: 36px; border: 1px solid var(--link-on-navy); font: 600 15px/1 var(--sans); color: var(--white); }
.gr-seq li:nth-child(4) .gr-st-n { background: var(--blue); border-color: var(--blue); color: var(--navy-deep); }
.gr-st-t { display: grid; gap: 2px; }
.gr-st-t strong { font: 600 19px/1.3 var(--sans); color: var(--white); }
.gr-st-t span { font-size: 15px; color: var(--on-navy); }
.gr-st-logo { width: 48px; height: 48px; object-fit: contain; background: var(--white); padding: 4px; }
.gr-contrib { list-style: none; margin: 48px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.gr-contrib li { display: grid; gap: 14px; align-content: start; padding: 20px; border: 1px solid var(--line-navy); background: var(--navy-2); }
.gr-plate { display: flex; align-items: center; gap: 12px; height: 72px; padding: 0 18px; background: var(--white); }
.gr-plate img { max-height: 30px; width: auto; max-width: 100%; }
.gr-plate-mark img { width: 40px; height: 40px; max-height: none; }
.gr-plate-mark span { font: 600 16px/1.25 var(--sans); color: var(--navy); }
.sx-grow .gr-contrib p { color: var(--on-navy); font-size: 15.5px; }
@media (max-width: 1023px) { .gr-g3 { grid-template-columns: minmax(0, 1fr); gap: 32px; } .gr-contrib { grid-template-columns: minmax(0, 1fr); gap: 12px; } }
/* ---- layout "deal": mandate callout, vertical five stages ---- */
.dl-lab { font: 600 15px/1 var(--sans); color: var(--blue-text); padding-block-end: 10px; border-block-end: 2px solid var(--blue); justify-self: start; }
.dl-needs { margin-top: 36px; }
.dl-mandate-sec { padding-block-end: 0; }
.dl-mandate { display: grid; gap: 10px; max-width: 900px; padding: 28px 32px; background: var(--white); border: 1px solid var(--line); border-inline-start: 4px solid var(--blue); }
.sx-deal .dl-mandate h2 { font: 600 15px/1.3 var(--sans); color: var(--blue-text); }
.sx-deal .dl-mandate p { font: 500 20px/1.55 var(--serif); color: var(--navy); }
.dl-stages-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 64px; align-items: start; }
.dl-stages { list-style: none; margin: 0; padding: 0; position: relative; }
.dl-stages::before { content: ""; position: absolute; left: 31px; top: 40px; bottom: 60px; width: 1px; background: var(--blue); }
.dl-stages li { position: relative; display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 24px; align-items: start; padding-block: 20px; }
.dl-stages li + li { border-block-start: 1px solid var(--line); }
.dl-n { position: relative; display: grid; place-items: center; width: 64px; height: 64px; background: var(--warm); border: 1px solid var(--navy); font: 600 26px/1 var(--sans); color: var(--navy); }
.dl-stages li:last-child .dl-n { background: var(--navy); color: var(--white); }
.dl-stages li > div { display: grid; gap: 6px; padding-block-start: 8px; }
.dl-stages p { color: var(--charcoal); font-size: 17px; }
.dl-docs li { gap: 12px; }
.dl-oc { list-style: none; margin: 0; padding: 0; border-block-start: 1px solid var(--line); }
.dl-oc li { padding: 20px 0; border-block-end: 1px solid var(--line); font: 500 20px/1.4 var(--serif); color: var(--navy); }
.sx-deal .dl-note { margin-block-start: 22px; color: var(--muted); max-width: 64ch; }
.sx-deal .dl-out .sx-h2 { color: var(--navy); }
@media (max-width: 1023px) { .dl-stages-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; } }
@media (max-width: 599px) { .dl-mandate { padding: 20px; } .sx-deal .dl-mandate p { font-size: 18px; }
  .dl-stages li { grid-template-columns: 48px minmax(0, 1fr); gap: 16px; } .dl-n { width: 48px; height: 48px; font-size: 20px; } .dl-stages::before { left: 23px; }
  .dl-stages li > div { padding-block-start: 2px; } .dl-oc li { font-size: 18px; } }
/* ---- layout "research": navy split hero, horizontal lenses, executive-brief panel ---- */
.rs-hero { background: var(--navy); color: var(--on-navy); border: 0; padding-block-end: 0; }
.sx-res .rs-hero h1 { color: var(--white); }
.sx-res .rs-hero .pp-lede { color: var(--on-navy); }
.rs-hero .crumbs, .rs-hero .crumbs a { color: var(--on-navy); }
.rs-hero .crumbs a:hover { color: var(--link-on-navy); }
.rs-hero-slot { background: rgba(255, 255, 255, .03); border-color: rgba(201, 211, 222, .3); color: rgba(201, 211, 222, .8); }
.rs-hero-slot .sx-slot-id { color: var(--on-navy); }
.rs-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-block-start: 36px; border-block-end: 1px solid var(--line); }
.rs-tab { display: flex; align-items: center; gap: 12px; min-height: 64px; padding: 14px 18px; text-align: start; background: none; border: 0; border-block-end: 3px solid transparent; margin-block-end: -1px; font: 600 17px/1.3 var(--sans); color: var(--navy); cursor: pointer; transition: background-color 200ms ease-out, border-color 200ms ease-out; }
.rs-tab:hover { background: var(--white); }
.rs-tab[aria-selected="true"] { background: var(--white); border-block-end-color: var(--blue); }
.rs-tab[aria-selected="true"] .gv-tab-n { color: var(--blue-text); }
.rs-panels { background: var(--white); border: 1px solid var(--line); border-block-start: 0; }
.rs-panel { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 48px; align-items: center; padding: 48px; }
.rs-panel-copy { display: grid; gap: 14px; }
.rs-panel-copy > p:not(.gv-panel-k) { font-size: 18px; color: var(--charcoal); max-width: 58ch; }
.rs-output { display: flex; align-items: center; gap: 18px; padding: 24px; background: var(--warm); border: 1px solid var(--line); border-inline-start: 3px solid var(--blue); }
.rs-doc { width: 40px; height: 40px; color: var(--blue-text); }
.rs-output > span { display: grid; gap: 4px; }
.rs-out-k { font: 600 13px/1.3 var(--sans); color: var(--muted); }
.rs-output strong { font: 600 21px/1.3 var(--serif); color: var(--navy); }
@media (min-width: 768px) { .rs-panel.is-off { display: none; } }
@media (prefers-reduced-motion: no-preference) and (min-width: 768px) { .rs-panel:not(.is-off) { animation: sx-in 260ms ease-out; } }
@media (max-width: 1023px) { .rs-panel { grid-template-columns: minmax(0, 1fr); gap: 24px; padding: 32px; } .rs-tab { font-size: 15px; padding: 12px; } }
@media (max-width: 767px) { .rs-tabs { display: none; } .rs-panels { background: none; border: 0; display: grid; gap: 12px; margin-top: 24px; }
  .rs-panel { padding: 22px 20px; gap: 18px; background: var(--white); border: 1px solid var(--line); border-inline-start: 3px solid var(--blue); }
  .rs-panel .gv-panel-k { display: block; } .rs-panel-copy > p:not(.gv-panel-k) { font-size: 16px; } .rs-output { padding: 16px; } .rs-output strong { font-size: 19px; } }
.rs-brief { background: var(--warm); border: 1px solid var(--line); padding: 32px; }
.rs-brief-k { font: 600 14px/1.3 var(--sans); color: var(--blue-text); margin-block-end: 12px; }
.rs-brief dl { margin: 0; }
.rs-brief dl > div { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: 4px 24px; padding-block: 18px; border-block-start: 1px solid var(--line); }
.rs-brief dt { font: 600 20px/1.3 var(--serif); color: var(--navy); }
.rs-brief dd { margin: 0; font-size: 16px; line-height: 1.6; color: var(--charcoal); }
@media (max-width: 599px) { .rs-brief { padding: 20px; } .rs-brief dl > div { grid-template-columns: minmax(0, 1fr); } .rs-brief dt { font-size: 19px; } }
.rs-band { padding-block: 48px; }
.rs-band-t { font: 600 15px/1.3 var(--sans); color: var(--link-on-navy); margin-block-end: 20px; }
.rs-band-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.rs-band-list li { padding: 4px 32px; border-inline-start: 1px solid var(--line-navy); font: 500 22px/1.35 var(--serif); color: var(--white); }
.rs-band-list li:first-child { border: 0; padding-inline-start: 0; }
@media (max-width: 767px) { .rs-band { padding-block: 40px; } .rs-band-list { grid-template-columns: minmax(0, 1fr); } .rs-band-list li { border: 0; border-block-start: 1px solid var(--line-navy); padding: 16px 0; font-size: 20px; } .rs-band-list li:first-child { border: 0; padding-top: 0; } }
.rs-start { display: grid; gap: 14px; max-width: 760px; padding-block-start: 28px; border-block-start: 1px solid var(--navy); }
.rs-start-sec { padding-block: 72px; }
.gv-partner-mark .gv-plogo img[src*="inlight"] { width: 72px; height: 72px; background: var(--white); }
/* ---- layout "close": scope inset, numbered accordion, coordination rows ---- */
.sx-close .cl-inset { align-self: center; padding: 28px 32px; background: var(--white); border: 1px solid var(--navy); font: 500 20px/1.5 var(--serif); color: var(--navy); }
.cl-areas { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 56px; align-items: start; margin-block-start: 36px; }
.cl-acc { list-style: none; margin: 0; padding: 0; border-block-start: 1px solid var(--navy); }
.cl-acc > li { border-block-end: 1px solid var(--line); }
.sx-close .cl-acc h3 { margin: 0; font: inherit; }
.cl-acc-btn { width: 100%; display: grid; grid-template-columns: 52px minmax(0, 1fr) auto; gap: 16px; align-items: center; min-height: 72px; padding: 16px 4px; background: none; border: 0; text-align: start; cursor: pointer; color: var(--navy); }
.cl-n { font: 600 18px/1 var(--sans); color: var(--blue-text); }
.cl-t { font: 600 21px/1.3 var(--serif); }
.cl-acc-btn:hover .cl-t { color: var(--blue-text); }
.cl-acc-btn[aria-expanded="true"] { padding-block-end: 8px; }
.cl-acc-body { padding: 0 48px 22px 72px; }
.cl-acc-body p { color: var(--charcoal); font-size: 17px; }
.cl-slot { aspect-ratio: 4 / 3; position: sticky; top: calc(var(--header-h) + 24px); }
@media (max-width: 1023px) { .cl-areas { grid-template-columns: minmax(0, 1fr); gap: 28px; } .cl-slot { position: static; } }
@media (max-width: 599px) { .cl-slot { display: none; } .cl-acc-btn { grid-template-columns: 40px minmax(0, 1fr) auto; gap: 12px; } .cl-t { font-size: 19px; } .cl-acc-body { padding: 0 8px 18px 52px; } .sx-close .cl-inset { padding: 20px; font-size: 18px; } }
.cl-ico { width: 32px; height: 32px; color: var(--blue-text); }
.sx-close .cl-result { margin-block-start: 28px; font: 500 18px/1.5 var(--sans); color: var(--navy); max-width: 70ch; }
.cl-co-intro { margin-block: 14px 24px; font-weight: 500; }
.cl-coord { margin: 0; border-block-start: 1px solid var(--navy); }
.cl-coord > div { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 6px 32px; padding-block: 22px; border-block-end: 1px solid var(--line); }
.cl-coord dt { font: 600 21px/1.3 var(--serif); color: var(--navy); }
.cl-coord dd { margin: 0; font-size: 17px; line-height: 1.6; color: var(--charcoal); }
@media (max-width: 767px) { .cl-coord > div { grid-template-columns: minmax(0, 1fr); } .cl-coord dt { font-size: 19px; } .cl-coord dd { font-size: 16px; } }
/* ---- Supplied service photographs (replace the review placeholders) ---- */
.sx-photo { display: block; max-width: 100%; border: 0; padding: 0; margin: 0; background: none; object-fit: cover; }
img.pp-block-slot, img.gr-slot, img.cl-slot { width: 100%; height: auto; }
img.pp-hero-slot { width: 100%; height: 100%; aspect-ratio: 8 / 9; min-height: 100%; object-position: 50% 40%; }
@media (max-width: 899px) { img.pp-hero-slot { height: auto; aspect-ratio: 4 / 3; min-height: 0; object-position: 50% 35%; padding: 0; border: 0; } }
/* Dark photo heroes (Governance, Operations, Growth): photo full-bleed behind the copy at 1200px+, below the copy on smaller screens */
.gv-hero.has-photo { background: var(--navy-deep); }
.gv-hero.has-photo .sx-pic { display: block; position: absolute; inset: 0; }
.gv-hero.has-photo img.gv-hero-slot { position: absolute; inset: 0; width: 100%; height: 100%; object-position: 72% 35%; }
.gv-hero.has-photo::before { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(15, 31, 51, .7) 0, rgba(15, 31, 51, 0) 150px), linear-gradient(90deg, rgba(15, 31, 51, .92) 0%, rgba(15, 31, 51, .8) 40%, rgba(15, 31, 51, .3) 60%, rgba(15, 31, 51, 0) 74%); }
.sx-grow .gv-hero.has-photo::before { background: linear-gradient(180deg, rgba(15, 31, 51, .75) 0, rgba(15, 31, 51, 0) 160px), linear-gradient(90deg, rgba(15, 31, 51, .95) 0%, rgba(15, 31, 51, .9) 42%, rgba(15, 31, 51, .55) 60%, rgba(15, 31, 51, .1) 78%); }
.gv-hero.has-photo .gv-hero-in { z-index: 2; }
@media (min-width: 1200px) { .sx:not(.sx-gov) .gv-hero.has-photo .gv-hero-copy { width: min(100%, 52%); } .sx:not(.sx-gov) .gv-hero.has-photo .sx-lede { max-width: 42ch; } }
@media (max-width: 1023px) { .sx-chal-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; } .sx-map-panel { max-width: 640px; } }
.sx-ops .gv-hero.has-photo img.gv-hero-slot { object-position: 70% 0%; }
@media (max-width: 1199px) {
  .gv-hero.has-photo { display: flex; flex-direction: column; padding-block-end: 0; }
  .gv-hero.has-photo::before { display: none; }
  .gv-hero.has-photo .gv-hero-copy { width: 100%; }
  .gv-hero.has-photo .sx-pic { position: static; order: 2; margin-block-start: 40px; }
  .gv-hero.has-photo img.gv-hero-slot { position: static; height: auto; aspect-ratio: 16 / 9; }
}
@media (max-width: 767px) {
  .gv-hero.has-photo .sx-pic { margin-block-start: 28px; }
  .gv-hero.has-photo img.gv-hero-slot { aspect-ratio: 1 / 1; object-position: 50% 88%; }
}
/* ---- About page: standard 1200px container, people-led hero, overlapping strengths ---- */
.sx-about { --sx-max: 1200px; --sx-g: 24px; }
@media (max-width: 599px) { .sx-about { --sx-g: 20px; } }
.ab-hero { padding-block: calc(var(--header-h) + 80px) 112px; min-height: 600px; display: flex; align-items: center; }
.ab-hero > .sx-wrap { width: 100%; }
.sx-about .ab-hero .gv-hero-copy { width: min(100%, 55%); }
@media (min-width: 1024px) { .ab-hero .gv-hero-slot { padding-block-end: 64px; } }
.ab-props { position: relative; z-index: 2; margin-block-start: -32px; background: linear-gradient(transparent 32px, var(--white) 32px); }
.ab-props-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.ab-props-list li { display: grid; gap: 10px; align-content: start; padding: 28px; background: var(--warm); border: 1px solid var(--line); box-shadow: 0 8px 24px rgba(23, 43, 67, .08); }
.ab-pico { width: 30px; height: 30px; color: var(--blue-text); }
.sx-about .ab-props-list h3 { font: 600 22px/1.3 var(--serif); color: var(--navy); }
.ab-props-list p { color: var(--muted); }
@media (max-width: 1023px) { .sx-about .ab-hero .gv-hero-copy { width: 100%; } .ab-hero { min-height: 0; flex-direction: column; align-items: stretch; } .ab-hero .gv-hero-slot { margin-block-end: 40px; } }
@media (max-width: 767px) { .ab-hero { padding-block: calc(var(--header-h) + 40px) 0; } .ab-props { margin-block-start: 0; background: var(--white); padding-block-start: 40px; }
  .ab-props-list { grid-template-columns: minmax(0, 1fr); gap: 12px; } .ab-props-list li { padding: 20px; box-shadow: none; } }
/* ABOUT-01 photo: full-bleed behind the copy on desktop (people on the right, dark wall under the text); below the copy on smaller screens */
.ab-hero.has-photo { background: var(--navy-deep); }
.ab-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 70% 30%; }
.ab-hero.has-photo::before { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(15, 31, 51, .7) 0, rgba(15, 31, 51, 0) 150px), linear-gradient(90deg, rgba(15, 31, 51, .9) 0%, rgba(15, 31, 51, .78) 38%, rgba(15, 31, 51, .25) 58%, rgba(15, 31, 51, 0) 72%); }
.ab-hero.has-photo .gv-hero-in { z-index: 2; }
@media (max-width: 1199px) {
  .ab-hero.has-photo { display: flex; flex-direction: column; align-items: stretch; min-height: 0; padding-block-end: 0; }
  .ab-hero.has-photo::before { display: none; }
  .sx-about .ab-hero.has-photo .gv-hero-copy { width: 100%; }
  .ab-hero-img { position: static; order: 2; height: auto; aspect-ratio: 16 / 9; object-position: 75% 30%; margin-block-start: 40px; }
}
@media (max-width: 767px) { .ab-hero-img { aspect-ratio: 4 / 3; object-position: 80% 30%; margin-block-start: 28px; } }
.ab-who { padding-block-start: 72px; }
.ab-who-grid { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); gap: 56px; align-items: center; }
.ab-who-grid .gv-head { gap: 16px; }
.ab-who-slot { aspect-ratio: 4 / 3; }
.ab-who-img { display: block; width: 100%; height: auto; aspect-ratio: 4 / 3; object-fit: cover; object-position: 45% 60%; }
.sx-about .ab-sub { margin-block: 64px 16px; font: 600 24px/1.3 var(--serif); color: var(--navy); }
.ab-links { display: flex; flex-wrap: wrap; gap: 4px 32px; margin-block-start: 20px; }
@media (max-width: 899px) { .ab-who-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; } .sx-about .ab-sub { margin-block-start: 44px; } }
@media (max-width: 767px) { .sx-about .ab-sub { font-size: 22px; } }
.ab-founder-grid { display: grid; grid-template-columns: minmax(0, 35fr) minmax(0, 65fr); gap: 64px; align-items: center; }
.ab-founder-img { width: 100%; height: auto; aspect-ratio: 505 / 670; object-fit: cover; }
.ab-quote { margin: 0; display: grid; gap: 22px; }
.sx-about .ab-eyebrow { font: 600 15px/1.3 var(--sans); color: var(--link-on-navy); padding-inline-start: 14px; border-inline-start: 3px solid var(--blue); }
.ab-quote blockquote { margin: 0; }
.sx-about .ab-quote blockquote p { font: italic 500 clamp(26px, 1.4vw + 16px, 36px)/1.3 var(--serif); color: var(--white); max-width: 30ch; }
.sx-about .ab-qtext { color: #DCE3EA; font-size: 17px; max-width: 60ch; }
.ab-quote figcaption { display: grid; gap: 2px; padding-block-start: 16px; border-block-start: 1px solid var(--line-navy); }
.ab-quote figcaption strong { font: 600 18px/1.3 var(--sans); color: var(--white); }
.ab-quote figcaption span { font-size: 15px; color: var(--on-navy); }
@media (max-width: 767px) { .ab-founder-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; } .ab-founder-img { max-width: 300px; } }
.ab-guides { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); gap: 64px; margin-block-start: 40px; align-items: start; }
.sx-about .ab-guides h3 { font: 600 15px/1.3 var(--sans); color: var(--blue-text); margin-block-end: 10px; }
.sx-about .ab-purpose p { font: 500 clamp(26px, 1.2vw + 18px, 34px)/1.3 var(--serif); color: var(--navy); }
.ab-mv { display: grid; }
.ab-mv > div { padding-block: 0 24px; }
.ab-mv > div + div { padding-block: 24px 0; border-block-start: 1px solid var(--line); }
.sx-about .ab-mv p { font-size: 17px; color: var(--charcoal); }
@media (max-width: 899px) { .ab-guides { grid-template-columns: minmax(0, 1fr); gap: 32px; } }
.ab-method { list-style: none; margin: 36px 0 0; padding: 0; border-block-start: 1px solid var(--navy); }
.ab-method li { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 8px 32px; align-items: baseline; padding-block: 24px; border-block-end: 1px solid var(--line); }
.sx-about .ab-step { display: flex; align-items: baseline; gap: 16px; font: 600 20px/1.3 var(--sans); color: var(--navy); }
.ab-step span { font: 600 16px/1 var(--sans); color: var(--blue-text); min-width: 28px; }
.sx-about .ab-step-d { font-size: 17px; color: var(--charcoal); }
@media (max-width: 767px) { .ab-method li { grid-template-columns: minmax(0, 1fr); padding-block: 18px; } .sx-about .ab-step-d { font-size: 16px; padding-inline-start: 44px; } }
.ab-people { list-style: none; margin: 40px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 40px 24px; }
.ab-person { display: grid; gap: 8px; align-content: start; padding-block-end: 18px; border-block-end: 1px solid var(--line); text-decoration: none; color: inherit; height: 100%; }
.ab-person img { width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; background: var(--bg); margin-block-end: 8px; }
.ab-person strong { font: 600 20px/1.3 var(--serif); color: var(--navy); }
.ab-person span { font-size: 15px; line-height: 1.5; color: var(--muted); }
@media (max-width: 1023px) { .ab-people { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 479px) { .ab-people { grid-template-columns: minmax(0, 1fr); } .ab-person img { max-width: 280px; } }
.ab-princ { list-style: none; margin: 36px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.ab-princ li { display: grid; gap: 12px; align-content: start; padding: 28px; background: var(--warm); border: 1px solid var(--line); }
.ab-princ .sx-ico { width: 30px; height: 30px; color: var(--blue-text); }
.ab-princ p { color: var(--muted); }
.ab-princ li.is-featured { background: var(--grad-blue); border-color: transparent; }
.sx-about .ab-princ li.is-featured h3, .ab-princ li.is-featured p, .ab-princ li.is-featured .sx-ico { color: var(--white); }
@media (max-width: 899px) { .ab-princ { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 599px) { .ab-princ { grid-template-columns: minmax(0, 1fr); gap: 12px; } .ab-princ li { padding: 22px 20px; } }
.ab-partners { margin-block-start: 40px; border-block-start: 1px solid var(--navy); }
.ab-pgroup { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 16px 40px; padding-block: 28px; border-block-end: 1px solid var(--line); }
.sx-about .ab-pgroup > h3 { font-size: 22px; }
.ab-pgroup ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 20px; }
.ab-pgroup li { display: grid; grid-template-columns: 132px minmax(0, 1fr); gap: 20px; align-items: center; }
.ab-logo { display: grid; place-items: center; width: 132px; height: 64px; padding: 8px 12px; background: var(--white); border: 1px solid var(--line); }
.ab-logo img { max-width: 100%; max-height: 46px; width: auto; height: auto; object-fit: contain; }
.ab-pgroup h4 { margin: 0 0 4px; font: 600 17px/1.3 var(--sans); color: var(--navy); }
.ab-pgroup p { color: var(--muted); font-size: 15.5px; }
.sx-about .ab-closing { margin-block-start: 24px; color: var(--charcoal); max-width: 75ch; }
@media (max-width: 899px) { .ab-pgroup { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 479px) { .ab-pgroup li { grid-template-columns: 96px minmax(0, 1fr); gap: 14px; align-items: start; } .ab-logo { width: 96px; height: 52px; } .ab-logo img { max-height: 36px; } }
.ab-sectors { list-style: none; margin: 0; padding: 0; border-block-start: 1px solid var(--navy); }
.ab-sectors li { padding-block: 16px; border-block-end: 1px solid var(--line); font: 600 19px/1.35 var(--serif); color: var(--navy); }
.sx-about .ab-note { margin-block-start: 18px; color: var(--muted); }
'''

# ------------------------------------------------------------------ behaviour (registered as page inits for the in-viewer router)
JS = r'''
// Service-detail template: tabs (journey stages, engagement examples), disclosure buttons and the contact form.
window.PAGE_INITS.push(function () {
  var root = document.querySelector(".sx");
  if (!root) return;
  root.querySelectorAll("[data-tabs]").forEach(function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        // data-stack: every panel stays in the page (stacked on phones); desktop CSS hides the inactive ones
        if (box.hasAttribute("data-stack")) panel.classList.toggle("is-off", !on); else panel.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t, false); });
      t.addEventListener("keydown", function (e) {
        var n = null, k = e.key, last = tabs.length - 1;
        if (k === "ArrowRight" || k === "ArrowDown") n = tabs[i === last ? 0 : i + 1];
        else if (k === "ArrowLeft" || k === "ArrowUp") n = tabs[i === 0 ? last : i - 1];
        else if (k === "Home") n = tabs[0];
        else if (k === "End") n = tabs[last];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  });
  root.querySelectorAll("[data-disclose]").forEach(function (b) {
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", open ? "false" : "true");
      document.getElementById(b.getAttribute("aria-controls")).hidden = open;
      var label = b.querySelector(".sx-dl");
      if (label && b.dataset.open) label.textContent = open ? b.dataset.closed : b.dataset.open;
    });
  });
  // Contact forms (prototype): validate, then state plainly that nothing was sent. Real delivery is a production task.
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, PHONE = /^\+?[\d\s()-]{7,}$/;
  function problem(el) {
    var v = el.value.trim(), r = el.dataset.rule;
    if (!v) return el.required ? el.dataset.empty : "";
    if (r === "email") return EMAIL.test(v) ? "" : "Enter an email address like name@company.com.";
    if (r === "phone") return PHONE.test(v) ? "" : "Enter a phone number with at least 7 digits, or leave it blank.";
    if (r === "long") return v.length >= 10 ? "" : el.dataset.empty;
    return "";
  }
  root.querySelectorAll(".sx-form").forEach(function (form) {
    var status = form.querySelector(".sx-status");
    var fields = Array.prototype.slice.call(form.querySelectorAll("[data-rule]"));
    function check(el) {
      var msg = problem(el), err = document.getElementById(el.id + "-err");
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      err.textContent = msg; err.hidden = !msg;
      return !msg;
    }
    fields.forEach(function (el) { el.addEventListener("blur", function () { if (el.hasAttribute("aria-invalid")) check(el); }); });
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var first = null;
      fields.forEach(function (el) { if (!check(el) && !first) first = el; });
      status.hidden = false;
      if (first) {
        status.className = "sx-status is-error";
        status.textContent = "Please check the highlighted fields.";
        first.focus();
        return;
      }
      status.className = "sx-status";
      status.innerHTML = "<strong>Preview only: no message was sent.</strong> This form is not connected yet. To reach Darwish &amp; Co. now, email <a href=\"mailto:info@darwish-co.com\">info@darwish-co.com</a> or call <a href=\"tel:+201101101090\">+20 110 110 1090</a>. Your details are still in the form.";
      status.focus();
    });
  });
});
'''
