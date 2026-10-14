# One-time export of the prototype's content into TypeScript data files for the React site
# (client/src/site/content/). Text is copied word for word; prototype file links become site routes
# and asset paths become /media paths. After the export, the TypeScript files are the source of truth.
import json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
import site_content as sc
from service_detail_content import SERVICE_DETAIL
from about_content import ABOUT

OUT = os.path.join(os.path.dirname(__file__), "..", "..", "client", "src", "site", "content")
FILES = {"./": "/", "about.html": "/about", "integrity.html": "/about/integrity", "services.html": "/services",
         "industries.html": "/industries", "our-work.html": "/projects", "insights.html": "/insights",
         "contact.html": "/contact", "privacy.html": "/privacy", "growth-360.html": "/growth-360",
         "case-furniture.html": "/projects/furniture", "case-organization.html": "/projects/organization",
         "people.html": "/about#experts", "partners.html": "/about#partners", "how-we-work.html": "/about#how-we-work"}
LINK = re.compile(r"^(\./|[\w-]+\.html)(#[\w-]*)?$")

def route(file):
    if file in FILES: return FILES[file]
    if file.startswith("service-"): return "/services/" + file[len("service-"):-5]
    if file.startswith("article-"): return "/insights/" + file[len("article-"):-5]
    if file.startswith("person-"): return "/about#experts"
    raise ValueError("unmapped link " + file)

def fix(v):
    if isinstance(v, str):
        m = LINK.match(v)
        if m:
            base = route(m.group(1)); h = m.group(2) or ""
            return base if (h and "#" in base) else base + h
        if v.startswith("assets/"): return "/media/" + v[len("assets/"):]
        if v == "emblem.png": return "/media/emblem.png"
        return v
    if isinstance(v, (list, tuple)): return [fix(x) for x in v]
    if isinstance(v, dict): return {k: fix(x) for k, x in v.items()}
    return v

def write(name, header, exports):
    os.makedirs(OUT, exist_ok=True)
    body = "".join(f"\nexport const {k}: {t} = {json.dumps(fix(v), indent=2, ensure_ascii=False)};\n" for k, t, v in exports)
    open(os.path.join(OUT, name), "w", encoding="utf-8").write(
        "/* eslint-disable */\n// " + header + "\n// Exported once from the approved prototype (prototype/tools/export_content.py); edit here from now on.\n" + body)

write("services.ts", "Service page content: one entry per service, with the layout it uses.",
      [("SERVICE_DETAIL", "Record<string, any>", SERVICE_DETAIL)])
write("about.ts", "About us page content.", [("ABOUT", "any", ABOUT)])
write("site.ts", "Shared site content: people, the services overview and industries.",
      [("PEOPLE", "Record<string, any>", {p["slug"]: p for p in sc.PEOPLE}),
       ("SERVICES", "any[]", sc.SERVICES), ("CHALLENGES", "any[]", sc.CHALLENGES), ("INDUSTRIES", "any[]", sc.INDUSTRIES)])
# Topics and articles were moved to shared/insights.ts (the server needs them too), and the Our work content to shared/work.ts.
print("exported to", os.path.normpath(OUT))
