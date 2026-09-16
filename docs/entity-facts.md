# Company facts the website publishes

One record, maintained here, from which page copy, profiles and structured data are kept
consistent. It implements the Ground the Entity register for the parts the website
controls. **A missing value is not a reason to invent one.** Anything marked ⛔ is withheld
from the site and from structured data until it is confirmed.

Last reviewed 16 Sep 2026.

---

## 1. Published — on the site and in structured data

| Field | Value | Source |
|---|---|---|
| Public brand | Darwish & Co. | Client direction; used with this exact spelling everywhere |
| Category | Governance and management consultancy | Positioning v3 |
| Base | New Cairo, Egypt | Agreement and current Contact page |
| Official website | `https://www.darwish-co.com/` | Canonical form on every page |
| Public email | info@darwish-co.com | Agreement and site |
| Headline | A wise word in the right moment. | Approved |
| Subheadline | The approved company description | Approved |
| Primary action | Book a consultation | Approved |
| `areaServed` | **Egypt** | Where delivery is evidenced today — see §3 |

## 2. Published on the site, but not asserted as structured data

These appear as visible page content because they are operational details the business
publishes for visitors. They are not repeated as machine-readable identity claims until
verified, so a wrong value does not propagate into the entity graph.

| Field | Value on site | Why it is not in structured data |
|---|---|---|
| Office address | RIO Mall, New Cairo (Contact page) | Which address is registered and which is operational is unresolved — the agreement gives Capital Mall |
| Telephone | +20 110 110 1090 | Ownership and routing unconfirmed |
| WhatsApp | wa.me/201101101090 | Same |
| Working hours | Mon–Fri, 9:00–18:00 | Actual hours, holidays and timezone unconfirmed |
| Google Maps link | The share link on the Contact page | Destination, ownership and duplicate status unconfirmed |

## 3. The coverage distinction

The approved wording says Darwish & Co. is **for SMEs in the MENA region**. That names who
the firm is for. It is not the same claim as where it can deliver.

- **Audience** — SMEs in the MENA region. Published freely in page copy.
- **Delivery footprint** — Egypt, until coverage elsewhere is confirmed. This is what
  `areaServed` carries, on the Organization record and on every Service record.

The entity descriptor used on profiles and in the Organization record is therefore the
narrower form: *"Darwish & Co. is a governance and management consultancy based in New
Cairo, Egypt, for SMEs in the MENA region."* Widen `areaServed` only when country-by-country
capacity is confirmed.

## 4. ⛔ Withheld until confirmed

Not on any page and not in any structured data. Each is a one-line change once answered.

| Field | Why it is withheld |
|---|---|
| Legal name and legal form | The agreement names Fouad Darwish Business & Consulting Development; its registered spelling, form and relationship to the brand are unconfirmed. "Partnership" came from an AI answer, not a record |
| Registration identifier (291746) | Issuing registry, identifier type and validity unconfirmed. Never label it a VAT or tax number without evidence |
| Founding date (2009) | Appears in an AI answer citing LinkedIn, which was inaccessible at verification |
| Founder | No documentary confirmation. Contract representative and founder are different roles |
| Fouad Darwish's public title | "Managing Partner" is an AI-recorded title, not a confirmed appointment |
| Full postal address | Pending the registered/operational split above |
| LinkedIn `sameAs` | The profile URL was observed in the audit workbooks, but ownership is unconfirmed. Restore as `sameAs` on the Organization record once confirmed |
| Other social profiles | None confirmed. No speculative links |
| Review aggregate | "4.9/5" and "200+ clients" were removed from the site in change-log Entry 1. They do not return without the platform, count, period and permission |
| Consultant credentials | Individual credential, issuer, scope and permission unconfirmed, so the About page no longer refers to "certified consultants" |
| Named delivery leads | No service page names a lead. Positioning v3 requires one per service |
| Partner relationships in schema | VisionEthics and In Light appear as named providers in visible copy and in the Service records; no partner is given a `sameAs`, parent or subsidiary relationship to Darwish & Co. |
| Commercial terms | No fees, deposits, retainers or response-time promises anywhere. `/how-we-work` waits on these |
| Arabic name | درويش وشركاه is a linguistic proposal, not an approved commercial name. No Arabic pages, so nothing publishes |

## 5. Entities kept out of the identity graph

Never connected as parent, subsidiary, founder, partner or `sameAs` on the basis of a
similar name. No affiliation is established by any evidence supplied.

- Darwish & Company Ltd. (Qatar)
- Darwish Holding (Qatar)
- Darwish Bin Ahmed & Sons (UAE)

The disambiguation sentence for the About page — "not affiliated with similarly named
Darwish companies in Qatar" — is **not published yet**: it is a factual claim about
affiliation and needs confirmation before it goes on a page.

## 6. Brands kept separate

| Brand | Status on this site |
|---|---|
| Training | Not present. Removed in change-log Entry 1 |
| Smart Solutions / Audex | Not present. Removed in Entry 1. Audex's school-leadership association belongs on its own product surface |

Names, legal operators, ownership and product rights for both are unconfirmed, so this site
makes no claim about either.

## 7. Structured-data records in use

| Record | Where | Notes |
|---|---|---|
| Organization | `client/index.html`, `@id` `.../#organization` | Single identity; every other record references it rather than restating it |
| WebSite | `client/index.html`, `@id` `.../#website` | `publisher` points at the Organization |
| AboutPage | `/about` | `mainEntity` points at the Organization |
| ItemList | `/services` | The published service pages |
| Service + FAQPage + BreadcrumbList | each `/services/<slug>` | `provider` references the Organization; a partner is a second named provider, never a sub-organisation of Darwish & Co. |
| Article | each `/blog/<slug>` | Headline, image, publication date, publisher |

Generated from `shared/seo.ts` and `shared/services.ts`. Nothing is hand-written per page,
so a fact corrected here propagates everywhere it appears.
