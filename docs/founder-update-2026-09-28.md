# Darwish & Co. website: brand system and home page update

28 Sep 2026 · branch `fix-website` · **nothing has been published or pushed**

This covers one session's work: applying your brand-identity document (`Darwish_Co_Complete_Brand_Identity_UI_UX.docx`) to the site's visual system, and building the new five-service section on the home page. It does not repeat what's already recorded in `docs/where-we-are.md` and `docs/change-log.md` — those cover the work before this.

**Where this stands:** three small fixes (a navigation bug) are committed locally. Everything else described below is a live, working change on this computer, not yet committed, not pushed, not published. You can see all of it by running `npm run dev` and opening the link it prints.

---

# Part one — what's been done

## The short version

Your brand document sets out a full visual system: colors, type, spacing, component rules, and five renamed services. Applying all of it at once would have meant rewriting the site's positioning too, since the document's own audience language ("executive leadership, public institutions") conflicts with the SME/Egypt/MENA positioning already approved on the site. We agreed to keep the approved positioning and hero wording exactly as they are, and apply everything else — the visual and technical system — on top of it. That's what this session did, plus a new home page section showing the five services from your document, built from a working prototype you supplied.

| | Before | Now |
|---|---|---|
| Primary color | Bright cyan blue, used for everything — buttons, headings, links, focus rings | Navy for buttons and headings, a separate blue reserved for links and focus, per your document |
| Gold accent | Orange, and used as small readable text in a few places (which fails contrast badly) | Your document's actual gold, used only where it's readable, with a dedicated darker version for text |
| Typography | Ad hoc sizes per page | One defined scale (exact sizes per your document), applied across every page |
| Button corners | Square, inconsistent with cards and inputs which were already rounded | 6px, matching cards and inputs, per your document |
| Favicon | None at all | Generated from your existing emblem |
| Home page services | A three-group list of six services | Your document's five services, in one row, with the imagery you generated |
| Nav dropdown menus | Stayed open after you moved the mouse away; no keyboard support | Closes properly, Escape works, screen-reader accessible |

## 1. Color, type and component system (your brand document)

- **Colors.** Rebuilt the color tokens to match your document: navy (`#172B43`) as the primary UI and heading color, a separate blue for links and focus states (darkened slightly from your document's exact value so it's actually readable — the raw value failed accessibility contrast), and your gold reserved for backgrounds, borders and one decorative moment on the home page, never as body text.
- **A real bug this uncovered:** several places on the site (a banner, some buttons, badges) used the old orange as solid text or as a button fill with white text. Under your document's actual gold, those became unreadable. Found and fixed all of them — the fix was already needed, your document just made it visible.
- **Typography.** Your document specifies exact sizes per heading level and per screen width. Built that as a shared scale and applied it across every page — the home page, about, services, projects, guides, blog, contact, client login.
- **Layout.** Content width brought to your document's 1200px (was 1280px). Button corners brought to 6px, matching cards and inputs, which fixes a real inconsistency: the code claimed "square corners throughout" but cards and inputs were never actually square — only buttons were. Corrected that claim in the project's own change log too, so it doesn't mislead anyone reading it later.
- **Consistency pass.** Every link on the site (breadcrumbs, footer links, "explore" links, contact details) now behaves the same way — one look, one hover behavior — instead of each page implementing its own slightly different version.
- **Touch targets.** Small buttons (icon buttons, compact buttons) now meet the 44×44px minimum your document specifies, without changing how they look — the tappable area is invisibly larger than the visible button.
- **Favicon.** The site had none. Generated one from your existing emblem graphic.
- **Contact form.** Added the short privacy line your document's forms section asks for.

## 2. The home page's orbiting emblem animation

Recolored from an all-blue effect to navy, with your gold reserved for the one moment two orbiting elements connect — matching your document's instruction that gold be rare and decorative. Also changed from spinning continuously forever to playing once when a visitor actually scrolls to it, and found and fixed a real accessibility gap while doing this: visitors who ask their device for reduced motion were still getting the full animation before this fix — only part of it was actually turned off for them.

## 3. New home page section: the five services

Built from a working prototype (HTML/CSS) you supplied, matching it closely rather than reinterpreting it:

- **Content:** your five services (Strategy & Performance, Governance & Organizational Excellence, Growth & Market Expansion, Digital & AI Transformation Advisory, Research & Feasibility), in one row on desktop, two columns on tablet, one column on mobile — exactly as specified.
- **Imagery:** the five gold/steel-blue renders you generated are wired in.
- **Interaction:** the hover effect (panel fades in, heading and text change color, arrow shifts), keyboard focus, and a details view on click all match your prototype, checked against it directly — color values, timing, and spacing confirmed to match, not approximated.
- **Refinements after your review:**
  - Fonts corrected from the prototype's plain system font to the site's actual typefaces (Playfair Display for headings, Inter for body).
  - The dark background now spans the full width of the browser, matching how the site's other dark sections behave, instead of stopping at a fixed width.
  - More breathing room added on both sides of this section, since it's the most important block on the page.
  - A hover effect where each image pans slightly within its frame to reveal the part of the picture that's cropped at rest — the frame itself never moves, only the picture inside it.
- **Removed:** the old dark "Platforms we have built" section that used to sit near the bottom of the home page, at your request.

## 4. Navigation bug (committed separately, earlier in this session)

The services/insights dropdown menus in the header would stay open after you moved the mouse away, and had no keyboard or screen-reader support. Fixed: closes properly on mouse-out, on Escape, and is now operable by keyboard with visible focus. This is the one piece of this session that's actually committed (three small commits), because it was finished and confirmed before the larger brand-document work began.

---

# Part two — what's left

## Decisions only you can make

Everything below is blocked on you, not on more work from this end.

1. **The five new service pages.** Each of the five services needs its own full page (the way the current six services each have one). I've written a separate plan for this — the short version:
   - **Strategy & Performance** and **Growth & Market Expansion** are light work — they map almost directly onto two of the current pages.
   - **Governance & Organizational Excellence** is the heaviest piece — it has to combine three of the current pages (Corporate & Family Governance, Risk/Compliance/Integrity, and People & Organisation) into one, including the VisionEthics partnership and ISO certifications mentioned on the risk page, which need to carry over exactly.
   - **Digital & AI Transformation Advisory** needs a real decision from you: the current page it's closest to (AI Governance) isn't published yet, because it doesn't yet have a named person leading that work, a defined scope, a sample output, and relevant experience — the same bar every other published service met before going live. Renaming it doesn't change that; broadening it to "transformation advisory" is a bigger promise, not a smaller one.
   - **Research & Feasibility** has no existing content to build from at all. Per your own instruction, this stays a placeholder until you've decided what it actually covers.

2. **CTA wording.** Your document uses "Discuss Your Challenge." The site's current, approved wording is "Book a consultation." These are two different decisions about what you're asking a visitor to do, not a copy tweak — needs your call.

3. **Arabic / RTL.** Still open, unrelated to this session's work — the site is English-only today and this hasn't been decided either way.

4. **Analytics.** The site has a placeholder for visitor analytics that's never been filled in — there's no way to measure form completions or which pages people actually read until this is set up. Needs a real analytics account before this can be finished.

## Smaller, lower-risk items

- The founder's full brand asset package — vector logo files, licensed fonts, a Figma kit — hasn't been supplied yet. Not blocking anything today, but will be needed for anything beyond what's already been built.
- A few remaining small inconsistencies in card styling and spacing that don't affect anything visible today but are worth a pass once the five service pages are settled, so the whole site is touched once rather than twice.

---

**Nothing in this document has been published, pushed, or made visible to site visitors.** To see any of it, run `npm run dev` in the project and open the address it prints.
