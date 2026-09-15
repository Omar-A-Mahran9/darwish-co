# Darwish & Co. website: change log

A record of every fix made to the website, written so it can be shared with the client.
One entry per commit, newest first. Nothing in this log has been published to the live site yet.

---

## Entry 1 — Scope cleanup, unsupported claims and new positioning

**Commit:** `7c99416` · **Date:** 16 Sep 2026 · **Branch:** `fix-website` (local only)
**Checks:** TypeScript passes · production build passes · 25 of 27 tests pass (the 2 failures need email and admin settings that aren't present locally, and they fail the same way before these changes)

### 1. The website now covers consulting only

| What we changed | Detail |
|---|---|
| Removed the Smart Solutions / Audex section | Page, menu items, footer links and the homepage block. Audex becomes its own brand later |
| Removed the Training Academy | Page, menu items, footer links, trainer-roster section and the training statistics |
| Removed the `/fonts` page | An internal typography page that was publicly visible |
| Removed the Hebei–Egypt project card | It was promoted on the homepage but linked to a section that had been hidden, so the link led nowhere |

**Why it matters:** visitors, search engines and AI assistants now see one clear business (consulting) instead of three unrelated ones.

### 2. Removed claims the business cannot evidence

| Claim removed | Where it was | Reason |
|---|---|---|
| "Rated 4.9/5 by 200+ clients" | Homepage hero | No review source, date or method behind it |
| "Trusted by top-tier companies across MENA" | Above the logo strip | Named no company. Replaced with "Our partner network", which is what those logos are |
| Three blog cards for articles that were never written | Blog page | The cards led to the contact form, not an article. One stated specific Egyptian labour-law changes with no source |
| "MENA's leading" / "MENA's first" | Partner services and partner profiles | Superlatives about partner companies with no source |
| "Deeply rooted in MENA culture and regulations" | Homepage | Implied regulatory expertise that isn't evidenced. Reworded to describe local presence and understanding |

**Why it matters:** these were the highest-risk items in the audit. Unsupported claims can be repeated by AI assistants as fact, and contradictory figures undermine trust with buyers who check.

### 3. Fixed contradictions and empty figures

| What was wrong | What it shows now |
|---|---|
| The projects page showed two different "Partner Organizations" counters (2 and 4) | One accurate counter |
| The corporate partners page showed "Licences 0" and "Key Clients 0" | Empty categories are hidden until there is something to show |
| Category headings read "LICENSED FROMS" and "AFFILIATED BODYS" | "Licences" and "Affiliated Bodies" |

### 4. Applied the approved positioning

| Where | New wording |
|---|---|
| Homepage headline | A wise word in the right moment. *(unchanged brand line)* |
| Homepage subheading | Darwish & Co. is an Egypt-based governance and management consultancy for SMEs in the MENA region. We help you build the governance, controls and growth strategy that investors, major clients and regulators expect. |
| Every main button | "Book a consultation" (previously "Get Started") |
| Browser tab and Google result title | Darwish & Co — Governance & Management Consultancy for SMEs \| Egypt & MENA |
| Search and social description | The approved company description |
| Footer tagline | A wise word in the right moment. Governance and management consulting for SMEs in the MENA region. |
| Services page subtitle | Governance, risk and compliance, strategy, people and growth services for SMEs in the MENA region |
| Company description read by search engines and AI (structured data) | The approved company description |

### 5. Search and navigation housekeeping

| What we changed | Detail |
|---|---|
| Rebuilt the sitemap | Removed the deleted pages, removed part-page links that should never have been listed as pages, and added the three published articles, which had been missing |
| Added missing services to the footer | Market Research and Marketing Strategy were reachable only from inside the services page |
| Updated robots.txt | The admin area and client login are no longer offered to search engines |
| Removed the keywords tag | Ignored by search engines for many years |

### Known and deliberate, to be handled later

- Every page still shares one description and one canonical address in the underlying page code. This is the single biggest technical issue and is the next phase of work.
- The services page still uses the old seven-section layout. Restructuring it needs the confirmations listed in the positioning document.
- Site images still load from the current host, so they don't display in local previews. They move into the project in the next phase.
