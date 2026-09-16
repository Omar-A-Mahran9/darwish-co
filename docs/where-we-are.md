# Darwish & Co. website: where we are

16 Sep 2026 · branch `fix-website` · **nothing has been published**

Two parts. **Part one** is everything changed so far, why, and what it is worth.
**Part two** is what is left, what needs the founder, and the questions that block the rest.

For the detailed record, one entry per piece of work, see `docs/change-log.md`.

---

# Part one — what has been done

## The short version

The audit found a site that search engines and AI assistants could not read properly, that
claimed things nobody had confirmed, and that was organised around services rather than
around the problems clients arrive with. Ten pieces of work have addressed that.

| | Before | Now |
|---|---|---|
| What an AI assistant reads on a service page | **0 words** | The whole page |
| Page information | One title and one description for the whole site | A distinct title, description and address per page |
| Services | Seven, on one page, no hierarchy | Five, one page each, in three groups with governance leading |
| Claims | Ratings, client counts and a region we cannot evidence | Only what is traceable to a person, a work product or a published source |
| Typefaces | Four | Two |
| The homepage | Led with a service category | Leads with the two situations clients actually call about |

## 1. Scope, claims and positioning

**What we changed.** Removed everything the business could not evidence — a "4.9/5" rating,
a "200+ clients" figure, contradictory numbers and empty statistics. Cut the site back to
consulting only. Applied the agreed positioning wording.

**Why.** AI assistants were repeating untrue things about the firm, partly because the site
asserted them. An unsupported claim on your own site becomes a false claim in someone else's
answer.

**What it is worth.** Removing a wrong claim is worth more than adding a true one. This is
the part of the audit that was actually about trust rather than about technology.

## 2. Images

**What we changed.** Moved every image into the project and compressed them.

**Why.** They were loading from the old host, so they broke in preview and depended on a
platform the firm is likely to leave.

**What it is worth.** Pages load faster, especially on a phone, and the site no longer
depends on another company's servers to show its own pictures.

## 3. Page information — the single biggest technical fault

**What we changed.** Every public page now has its own title, description and address, built
into the page by the server before it is sent. Articles are published as articles. The client
login and admin pages are marked "do not index". A mistyped address now properly answers "not
found" instead of returning a normal page.

**Why.** The site was telling Google, on every single page, that the real page was the
homepage. Every page was competing with the homepage to exist at all, and every shared link
showed the same title and the same paragraph.

**What it is worth.** Individual services and articles can now be found, ranked and cited on
their own terms. Nothing else in the audit could improve until this was fixed.

## 4. One page per service

**What we changed.** Split the services onto their own pages, each answering the same five
things: what it is, who it is for, what you get, how an engagement runs, and common questions.
The questions and answers are published in a form assistants read directly. Every old address
still works.

**Why.** Seven services on one page could answer one search. Seven pages can answer seven.
Questions and answers are what gets a firm *quoted* rather than merely listed.

**What it is worth.** This is the "answer coverage" gap the audit identified, closed.

## 5. The service structure — positioning v3

**What we changed.** Five services in three groups, governance first. The old governance page
became two — Corporate & Family Governance, and Risk, Compliance & Integrity. Market research
folded into Growth & Market Entry. Digital marketing left the site. AI Governance is written
but hidden until someone is named to deliver it. The ISO 37001 wording was corrected:
readiness, implementation and certification are three different things, and no consultancy can
certify a company it advises.

**Why.** Seven equal services told no story. The agreed positioning leads with governance and
shows the rest as what makes governance work.

**What it is worth.** A buyer arriving with "I have to sign everything" or "a client sent us a
compliance questionnaire" now lands on a page that answers exactly that. And the ISO claim is
now one the firm can defend.

## 6. Who the firm is, to a machine

**What we changed.** One company record for the whole site instead of eleven. Partner firms
published as *partners*, not as parts of Darwish & Co. Area served set to **Egypt**;
"for SMEs in MENA" remains as positioning. Unconfirmed facts held back, each recorded with its
reason in `docs/entity-facts.md`.

**Why.** "For SMEs in MENA" and "delivers across MENA" are different sentences. The first is
positioning; the second is a capability claim, and it needs evidence. The old markup also made
VisionEthics look like a division of the firm.

**What it is worth.** This addresses the confusion in the audit where assistants mixed the
firm up with similarly named companies in Qatar. Withholding is reversible in one line;
publishing something wrong is not.

## 7. The homepage

**What we changed.** Removed a duplicate navigation bar left over from an old design.
Reordered the page: the two situations clients arrive with, then the services, then insights,
then the people, then how we work, then contact. Replaced three generic claims with four
checkable ones — including that we say when a question needs a lawyer or an accredited
certifier.

**Why.** Clients arrive with a problem, not with a service name in mind.

**What it is worth.** The first thing a visitor reads now matches the reason they came.

## 8. Pages readable without JavaScript — the largest audit finding

**What we changed.** All sixteen public pages are now written out in full when the site is
built. The server hands over a finished page; the browser takes over as before.

**Why.** The site was assembled in the visitor's browser. Most AI crawlers do not run that
code, so what they received was a correctly labelled, completely empty page. Measured: a
service page arrived with **zero words**.

**What it is worth.** Everything in points 1–7 only became legible to AI assistants at this
moment. The consultants page alone went from 0 to 12,433 characters of readable text. It also
works on the current hosting — no platform change was needed.

## 9. The design review

**What we changed.** A new logo, rebuilt with a genuinely transparent background and reduced
from 980 KB to 43 KB. A header that sits over the homepage picture and picks up a blurred
background on scroll, at one fixed size. Two typefaces instead of four, and one button system —
square, one weight, no glow. On a phone, the headline and the consultation button now come
before the animation, which previously pushed them 745 pixels below the fold.

**Why.** The header broke at tablet width — the row overflowed the screen by 89 pixels, which
squeezed the logo to nothing and clipped the main button. And the page changed visual language
halfway down, which reads as two sites stitched together.

**What it is worth.** On a phone, a visitor now learns what the firm does without scrolling.
At every width, the main call to action is visible and intact.

## 10. Evidence of results on the homepage

**What we changed.** Added a worked engagement — three outcomes beside a photograph, with a
"Read the full case study" button. Replaced the "people behind the work" section, which showed
a stock meeting photograph and two links, with three named consultants, their roles, expertise
and portraits. Removed the client-login section, which competed with the consultation as the
end of the page.

**Why.** The review's point: partner logos and a software platform do not show what a
consulting engagement *achieves*.

**What it is worth.** The homepage now has faces, names and outcomes — with the important
caveat in the next section.

---

# Part two — what is left

## ⚠️ Read this first: what on the homepage is not real

Four images and one engagement are **generated or invented**:

| On the page | Status |
|---|---|
| The client meeting photograph in the case example | Generated image |
| The three consultant portraits | Generated images — not photographs of these people. Their names, roles and expertise **are** real |
| The engagement: client, "3 of 4", "11 weeks", "facility approved", the quotation | Entirely invented |
| "Read the full case study" | Points at the contact page. No case study page exists |

These carried visible warning notices on the page. **The notices were removed on 16 Sep 2026
at the client's instruction**, on the basis that the founder would be told directly. The
warnings now exist only in the code and in these documents.

**Nothing here is published, so no harm has been done.** But the founder needs to know before
it is, because these two sections exist precisely to establish credibility, and a reader
cannot tell which parts are real.

## Needs the founder's decision or confirmation

| # | What is needed | What it unblocks | Cost of not having it |
|---|---|---|---|
| 1 | **The positioning, signed off** | The governance guide and its four supporting articles | All content work is stopped waiting for this |
| 2 | **A named delivery lead for each of the five services** | Removes the visible "needs delivery lead" notice from every service page | The positioning requires it; the pages currently advertise the gap |
| 3 | **A named lead for AI Governance** | Publishes a finished page | Written, complete, invisible |
| 4 | **Engagement terms** — how an engagement runs, how long, how priced | The "how we work" page; the most-asked question on any consultancy site | Buyers leave to find out elsewhere |
| 5 | **A real case study** | Replaces the invented one | See the warning above |
| 6 | **Real photographs of the consultants** | Replaces the generated portraits | See the warning above |
| 7 | **Written confirmation from VisionEthics and In Light** | The service pages describe what each delivers and who is accountable | We are publishing statements on their behalf |
| 8 | **The withheld company facts** | Legal name and form, registration, founding date, registered address, the LinkedIn page | Each is a one-line change once answered |
| 9 | **DNS access** | The email fix | Notifications run through a personal Gmail account |

## The open questions

**About the facts**

1. **Does the LinkedIn company page belong to Darwish & Co.?** Much of the AI confusion with
   the Qatari companies lives in off-site profiles, not on the website.
2. **Which address is registered and which is the office?** The agreement says Capital Mall;
   the site says RIO Mall. Both cannot be the registered address.
3. **What is the legal name, form and founding date?** Withheld rather than guessed.

**About the business**

4. **Is there a real engagement that can be published** — named with the client's written
   permission, or anonymised with their agreement?
5. **Who leads each service, and what has each of them actually delivered?** The strongest
   version of this website is not the best-engineered one. It is the one that can say true,
   specific things about who does the work.

**About the platform**

6. **The client portals.** Client sign-in hands people to Darwish Hub and Nabta Quest, both
   hosted elsewhere at `manus.space` addresses. Do they stay, move, or get retired? Who
   maintains them? A client's browser visibly leaves `darwish-co.com`, which undercuts
   everything the rest of the site is doing. **This is the largest unknown.**
7. **Admin access is one shared code**, typed into a public page. Replace it with a real
   sign-in per person.
8. **Business email runs through a personal Gmail account** using an app password. It ties
   company notifications to one individual's Google account and lands in spam more often.

## The order I would do it in

1. **Sign off the positioning.** Everything in content waits on it.
2. **Write the governance guide and its four supporting articles.** This is the audit's
   answer-coverage gap, and it is what gets the firm quoted rather than listed.
3. **Replace the invented case study and the generated portraits,** or decide knowingly to
   publish them as they are.
4. **Publish.** Nothing done here is live. No audit measurement can improve until it is.
   **Publishing comes before migrating** — a better-built site nobody has seen is worth less
   than the current one that is live.
5. **Fix email, then admin sign-in.**
6. **Re-run the fifteen audit questions** and compare honestly with the August baseline.
7. **Then**, if still wanted, the hosting move — and only after the portal question above is
   answered.

## Still outstanding, minor

- The sitemap does not carry "last modified" dates.
- `Projects.tsx` holds a hidden section behind `{false && …}` — dead code to remove.
- `AnnouncementBanner.tsx` is unused.
- Two automated tests fail locally because email and admin settings are absent from this
  machine. They failed identically before this work began.
