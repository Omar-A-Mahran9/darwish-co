# Darwish & Co. website: where we are now

28 Sep 2026 · branch `fix-website` · **nothing has been published**

Picks up from `docs/where-we-are.md` (16 Sep 2026). Everything there still stands — this is only what's happened since. Detailed record: `docs/change-log.md`, entries 11–16.

**Status:** three small commits are saved (a navigation fix). Everything else below is a real, working change on this computer — not committed, not pushed. A separate preview link exists on Cloudflare, updated to match.

---

## Things we've done

### UX/UI polish
A first pass, before the brand document arrived, fixing issues a design audit found:
- Darkened the primary color so text on it meets accessibility contrast (later replaced by the brand document's navy).
- Removed a setting that blocked visitors from pinch-zooming the page.
- Added a site-wide rule respecting "reduced motion" for visitors who ask for it.
- Lazy-loaded images that were loading immediately even when off-screen.
- Deleted an unused leftover component.
- Fixed one instance of too-small text.
- Replaced eight thick colored side-borders (a generic, templated-looking pattern) with plainer styling.

### Guides
- Built the governance guide hub, plus four full guides: Delegation of Authority, Anti-Bribery Questionnaires, Strategy into Decision Rights, Employee AI Use.
- Redesigned the guides library as a bookshelf: each guide is a navy "book," every one of its topic pages shown beside it (used to cap at three), and it scrolls sideways in its own strip on a phone instead of the whole page scrolling.

### The founder's brand document, applied
- New colors site-wide: navy as the primary color, a separate blue for links, the founder's actual gold used only where it's readable.
- One consistent type scale across every page.
- Button corners fixed to match cards and inputs (they were meant to match before and didn't).
- A favicon (there wasn't one).
- Every link on the site now looks and behaves the same way.
- Small buttons now meet the accessible tap-target size.
- A privacy line added to the contact form.
- Fixed two real bugs this surfaced: gold text that was unreadable in a few places, and the home page's orbiting animation only partly respecting "reduced motion."

### Home page
- New section: the five services from the brand document, in one row, with the founder's own generated imagery. Matches a working prototype the founder supplied.
- Hover effect: the picture inside each frame shifts slightly to show what's cropped at rest.
- Removed the old "Platforms we have built" section, at the founder's request.
- Partner logo row fixed — the gap was already even, three of the logo files had inconsistent padding, which is what looked uneven. Fixed all three.
- Growthino added as a sixth partner logo.

### Contact page
- Rebuilt around the enquiry: the form comes first, a short question replaces the old banner, direct contact is two plain links, and the office/map are one section instead of two.
- Removed a reply-time promise ("within 24 hours") that was never actually confirmed.

### Navigation
- Fixed the header dropdown menus: they used to stay open after the mouse moved away, with no keyboard support. Now closes properly, works with a keyboard, and is screen-reader accessible. (This is the one piece that's actually committed.)

---

## Things still needed

### Needs the founder
- A named person leading each service — still missing for all of them.
- A named lead for AI Governance, so that page can go live.
- Engagement terms: how a project runs, how long, how it's priced.
- A real case study, to replace the invented one on the home page.
- Real photos of the consultants, to replace the generated ones.
- Written confirmation from VisionEthics and In Light on what the site says they deliver.
- The company facts still being withheld: legal name, registration, founding date, address, LinkedIn.
- DNS access, so email notifications stop running through a personal Gmail account.
- A decision on the brand document's CTA wording ("Discuss Your Challenge") vs. the site's current, approved wording ("Book a consultation").
- A transparent-background version of the Keheilan logo — the current one has a solid fill, unlike the others.
- The three new guide-shelf description lines need a copy check — they're new wording, not yet approved.

### Needs building
- Five new service pages, matching the brand document's five services. Two are quick (close to existing pages). One is the big one — merging three existing pages into one. One can't be built until a delivery lead is named. One has no content to build from yet.
- Real analytics — there's currently no way to see which pages get read or how many people fill out the form.

### Still undecided, unrelated to this update
- Arabic / RTL — not decided either way.
- The founder's full brand asset package (vector logos, licensed fonts, a Figma kit) — not supplied yet.

---

**Nothing here has been published to the live site.** A Cloudflare preview link exists separately, kept in sync with this work — ask if you need it again.
