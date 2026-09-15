# Darwish & Co. website: change log

A record of every fix made to the website, written so it can be shared with the client.
One entry per commit, newest first. Nothing in this log has been published to the live site yet.

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
