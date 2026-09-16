# Darwish & Co. website: change log

A record of every fix made to the website, written so it can be shared with the client.
One entry per commit, newest first. Nothing in this log has been published to the live site yet.

---

## Entry 6 — The site now says only what can be evidenced

**Commit:** `da4a257` · **Date:** 16 Sep 2026 · **Branch:** `fix-website` (local only)
**Checks:** TypeScript passes · production build passes · 13 automated tests on this area · identity output and every redirect checked against the built server

### The problem

The entity map set a rule: every public claim should be traceable to a named person, a real
work product or a published source. Measured against it, the site was still asserting
things nobody had confirmed — and, in one place, confusing who the firm is *for* with where
it can actually *work*.

### What we changed

| Change | Result |
|---|---|
| Separated audience from delivery | The site still says it is for SMEs in the MENA region, because that is who you serve. But the machine-readable "area served" now says **Egypt**, which is where delivery is evidenced. Claiming a region as a service area because it is the target is exactly what makes an AI assistant repeat something untrue |
| One company record instead of one per page | Every page now points at a single identity record rather than restating the company. Search engines and AI assistants see one company, not eleven descriptions of it |
| Partners are named as partners | A partner is published as a *second provider* of that service — not as part of Darwish & Co. The previous markup made VisionEthics look like a division of the firm |
| Removed unconfirmed facts from the code | Legal name and form, registration number, founding year, founder, full postal address, the LinkedIn link and "certified consultants" are all held back until confirmed. Each is a one-line change once you answer |
| Deleted a stale list of services | The page code still advertised the old service list, including two services that no longer exist |
| The withdrawn service says so | `/services/digital-marketing` now answers "gone" with a short page explaining the service is no longer offered. Redirecting it to the services page would have told search engines a replacement exists when none does |
| The two halves of the old governance page link to each other | One old address can only lead to one page, so each half points to the other |
| About page rewritten | Approved wording, the three pillars, and "Book a consultation" |

### Why it matters

- **This is what the audit was actually about.** AI assistants repeated things about the business that were not true, partly because the site asserted them. Removing an unconfirmed claim is worth more than adding a true one.
- **Withholding is reversible; a wrong claim is not.** Everything held back is recorded in one file with the reason, so confirming a fact is a small edit rather than a rewrite.
- **"For SMEs in MENA" and "delivers across MENA" are different sentences.** The first is your positioning. The second is a capability claim, and it now waits for evidence.

### What needs your confirmation

`docs/entity-facts.md` is the new single record of what the site publishes, what it
publishes only as visible text, and what is withheld and why. The fastest wins:

1. **Who leads each service.** Every service page and every card on the services page now
   carries a visible **"needs delivery lead"** notice, marked as an internal review note.
   Send a name and role per service and the notice is replaced by a proper "Who leads this"
   section. The notice is deliberately kept out of the machine-readable data — a service
   record says nothing about people rather than asserting someone.
2. **Does the LinkedIn company page belong to you?** One line restores it as a confirmed identity link.
3. **Which address is registered and which is the office?** The agreement says Capital Mall; the site says RIO Mall.
4. **Engagement terms** — length, pricing model, response time. Without them the "how an engagement works" page cannot be written.

Note: the "4.9/5" rating and "200+ clients" figures the entity map flags were already
removed in Entry 1, before this work began.

---

## Entry 5 — The services now follow the agreed positioning

**Commit:** `144d65b` · **Date:** 16 Sep 2026 · **Branch:** `fix-website` (local only)
**Checks:** TypeScript passes · production build passes · 11 automated tests on this area · every page and every old address checked on desktop and phone width

### The problem

Entry 4 split the services into separate pages, but using the old list of seven. The
positioning document was recovered afterwards, and it sets out a different structure: three
pillars with governance leading, six services rather than seven, and digital marketing off
the site altogether.

### What we changed

| Change | Result |
|---|---|
| Grouped the services into three pillars | Governance first, then Strategy & Organisation, then Growth — the order the positioning sets out |
| Split the old GRC page in two | **Corporate & Family Governance** (decision rights, delegation, boards, family roles) and **Risk, Compliance & Integrity** (risk, anti-bribery, due diligence) |
| Merged integrity into Risk, Compliance & Integrity | One page for everything a client compliance questionnaire asks about, instead of two |
| Merged market research into **Growth & Market Entry** | Research is now shown as part of deciding whether to enter a market, which is what clients buy it for |
| Renamed the other two | **Strategy & Execution** and **People & Organisation** |
| Removed Digital Marketing from the site | As agreed. Its address now leads to the services page rather than to nothing |
| Wrote the **AI Governance** page but did not publish it | It goes live when you name who will deliver it. Until then it is invisible to visitors and search engines |
| Marked every partner-delivered component individually | Each card carrying VisionEthics or In Light work says so, and each page has a block stating who contracts, who delivers and who is accountable |
| Added a "Standards we work with" section | Only where standards are genuinely applied |
| Corrected the ISO 37001 wording | Readiness, implementation and certification are now stated as three different things. Certification is granted by an accredited body — not by us, and not by ISO, which writes the standard but does not certify. The page also cites the current 2025 edition |
| Kept every previous address working | The seven addresses from Entry 4 and the seven older `#anchor` links all lead to the page that replaced them |

### Why it matters

- **One clear story:** governance leads, and the other services are shown as what makes it work — instead of seven equal practices with no hierarchy.
- **The two situations clients actually arrive with** — "I have to sign everything" and "a client sent us a compliance questionnaire" — now each have a page that answers them directly.
- **Honesty about the ISO claim:** the previous wording implied we could take a company through certification. We cannot; no consultancy can certify a company it advises.
- **Nothing published before it is real:** AI Governance is complete but hidden until someone is named to deliver it.

### What needs your confirmation

`docs/services-copy-review.md` is updated. Two items matter most:

1. **Nobody is named on any service page yet.** The positioning requires a named lead for
   each service, and none of the five carries one. That is the largest remaining gap.
2. **Both partners should confirm, in writing, the roles now described on their behalf** —
   the pages state what VisionEthics and In Light deliver and who is accountable.

Ten components are new rather than renamed — delegation of authority, board design, family
governance, job architecture, succession, entry readiness and others. Each is listed for
you to confirm or strike.

---

## Entry 4 — Each service now has its own page

**Commit:** `13503be` · **Date:** 16 Sep 2026 · **Branch:** `fix-website` (local only)
**Checks:** TypeScript passes · production build passes · 9 new automated tests · every page checked on desktop and phone width, including the old links, the menus and the served HTML

### The problem

All seven services sat on one page. That page could carry one title, one description and
one address — for governance, human resources, strategy, business development, digital
marketing, integrity, and market research together. Nothing could be found on its own.
Someone searching for market research in MENA, or for ISO 37001 support, had no page to
find; an AI assistant had nothing specific to cite.

The page also mixed work you deliver yourself with work delivered by partner firms,
without always making clear which was which.

### What we changed

| Change | Result |
|---|---|
| Split the seven services into seven pages | Each can be found, ranked and cited on its own terms, with its own title and description |
| Made `/services` a hub | It now introduces the seven and links to them, rather than being a very long scroll |
| Separated partner-delivered work on that hub | Integrity is shown as delivered with VisionEthics, market research with In Light. Both carry the partner's name on the page itself |
| Put strategy first | Matches the homepage, which already leads with strategic management |
| Gave every service page the same five answers | What it is · who it's for · what you get · how an engagement runs · common questions |
| Added machine-readable service and question data | Search engines and AI assistants can read the questions and answers directly, which is how a page gets quoted rather than just listed |
| Kept every old link working | `/services#grc` and the other six anchors now take the visitor to the page that replaced them |
| Updated the menu, footer, homepage cards and sitemap | All point at the new pages; the sitemap lists all seven |

### Why it matters

- **Findability:** seven pages can answer seven different searches. One page could answer none of them well.
- **AI retrieval:** the questions and answers on each page are published in a form assistants read directly. This is the "answer coverage" gap the audit identified.
- **Honesty about partners:** a partner's capability is now clearly a partner's, on the page where a buyer sees it — not only on the partners page.

### What needs your confirmation

The service descriptions are unchanged. Four blocks per page are newly drafted: who it's
for, what you get, how an engagement runs, and the questions. They are listed for review in
`docs/services-copy-review.md`, along with the facts the drafts deliberately avoid stating
because there was no source for them — engagement length, pricing model, team size and
client examples. Those are among the most valuable things these pages could carry.

Separately, `docs/positioning.md` reconstructs the approved positioning. The original was
agreed in conversation and never saved into the project; the reconstruction is marked where
it is inferring.

---

## Entry 3 — Every page now has its own title, description and address

**Commit:** `f65ec9e` · **Date:** 16 Sep 2026 · **Branch:** `fix-website` (local only)
**Checks:** TypeScript passes · production build passes · 6 new automated tests · every route verified in a local preview, in the served HTML and after clicking through the site

### The problem

The website is built as a single page that swaps its content as you move around it. Every address — the services page, the blog, each article — was delivered with the *same* underlying page information: the homepage's title, the homepage's description, and a line of code telling search engines that every page "is really" the homepage (the canonical address).

The consequences:

- Google and Bing were told, on every page, that the real page is the homepage. Individual pages were competing to be indexed at all.
- Every search result and every link shared on LinkedIn or WhatsApp showed the same title and the same description, whatever page it pointed to.
- AI assistants (ChatGPT, Perplexity, Google's AI answers, Claude) mostly read the raw page without running the site's code. They saw one description repeated across the whole site, with nothing to tell one page from another.
- Private pages — the client login and the admin area — carried no instruction to stay out of search results.

### What we changed

| Change | Result |
|---|---|
| Wrote a title, a description and a correct address for each of the 11 public pages | Each page can be found, indexed and ranked on its own terms |
| The server now builds the correct page information into the HTML before sending it | Search engines and AI assistants see the right information without running any code — this is the part that matters for AI retrieval |
| The browser keeps it correct as visitors click between pages | The tab title and any shared link stay accurate |
| Added article information for each of the three blog articles | Articles can appear as articles in search results, with their own image, headline and publication date |
| Marked the client login and admin pages "do not index" | They stay out of search results |
| Unknown addresses now answer "page not found" properly | Previously a mistyped address returned a normal, indexable page — search engines call this a "soft 404" and treat it as a quality problem |
| Social sharing images now match the page | Articles share their own illustration instead of the company logo |

### Why it matters

- **This was the single biggest technical issue in the audit.** A site that tells search engines every page is the homepage cannot rank its individual services or articles.
- **AI readiness:** assistants that summarise or cite the business now get a distinct, accurate description of each page rather than one repeated paragraph.
- **Sharing:** a link to an article now shows that article's headline and image.

### Notes

- Page information lives in one file (`shared/seo.ts`), so titles and descriptions can be edited in a single place.
- The descriptions are all within the 50–160 characters search engines display, and this is now checked automatically by the tests.

---

## Entry 2 — All images moved into the website and made far lighter

**Commit:** `99803af` · **Date:** 16 Sep 2026 · **Branch:** `fix-website` (local only)
**Checks:** TypeScript passes · production build passes · all images verified loading in a local preview

### The problem

Every image on the site was loaded from two external stores belonging to the current hosting platform. That meant the website could not display its own pictures without that platform, the files could not be optimised, and some were extremely large: the meeting photograph used on the homepage and About page was a 5.5 MB file, roughly 2,752 pixels wide, for a space that never needs more than 1,600.

### What we changed

| Change | Result |
|---|---|
| Brought all 15 images into the website itself | The site no longer depends on an external image store |
| Converted them to WebP, a modern format, at the sizes actually used | **7.5 MB → 576 KB**, a 92% reduction |
| The homepage/About photograph specifically | 5.5 MB → 88 KB |
| Gave files clear names | e.g. `article-ai-human-oversight-cover.webp` instead of `blog-article1-ai-oversight_c469ef22.jpeg` |
| Set each large image's dimensions in the page | Stops the page jumping around while images load |
| Images below the visible area now load only when needed | The first screen appears sooner |

### Why it matters

- **Speed:** images were the single biggest cause of the slow mobile loading times recorded in the audit. This is the largest part of that fix.
- **Independence:** the site can move to any host without images breaking.
- **Ranking and AI retrieval:** page speed affects search ranking, and slow pages are read less reliably by AI crawlers.

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
