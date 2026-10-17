# The best version of this website — a proposal

16 Sep 2026. Written for a decision, not for engineers.

---

## 1. The problem, plainly

The website is doing two completely different jobs, and they are welded together.

**Job one is publishing.** Pages that explain the firm to buyers, to Google, and to AI
assistants. This is what the audit measured, and it is where nearly all the commercial value
sits. It needs to be fast, always up, and readable by machines.

**Job two is a small application.** A contact inbox, a client sign-in that hands people to
their portal, and an admin area. Perhaps a few dozen actions a week. It needs a database and
the ability to send email.

Right now job two dictates how job one is built. Because the application needs a running
server with a live database connection, *every page* — including the About page, which has
not changed in months — is assembled fresh by that server on every visit, and arrives in the
visitor's browser as an empty frame that JavaScript then fills in.

That single decision causes most of what the audit found:

- **AI assistants see an empty page.** They read the raw page and mostly do not run
  JavaScript. We measured it: a service page arrives with *zero* words of body text.
- **Everything depends on one server being up.** If it stops, the About page stops.
- **The site cannot move hosts easily**, because the pages are inseparable from the application.

## 2. The insight

**Stop letting the small application decide how the publication is built.**

Separate them. The publication becomes a set of finished pages that need no server at all.
The application becomes a handful of small, well-defined operations that run only when
someone actually does something.

This is not a rewrite. It is the same site, unbolted into its two natural halves.

## 3. The proposal

| | Today | Proposed |
|---|---|---|
| The pages | Assembled by a server on every visit, arriving empty | Finished HTML files, prepared in advance, delivered from servers close to the visitor |
| The contact form | A server endpoint saving to a database and sending Gmail | A small endpoint that runs only when a form is submitted |
| The database | MySQL, requiring a permanently connected server | Cloudflare's own database, reachable without a permanent connection |
| Email | A personal Gmail account with an app password | A proper sending service on your own domain |
| Admin access | One shared secret code, typed into the page | Real sign-in by named person, handled before the page loads |
| Client sign-in | Same server | Same small endpoint approach, unchanged in behaviour |

### What each piece becomes

**The pages become static.** Every page is generated once when the site is built, complete
with its words. A visitor — or an AI crawler — receives the finished article. Nothing to
assemble, nothing to wait for, nothing that can fail at the moment of reading.

**The application becomes about six operations:** submit a contact message; list, read and
delete messages; sign a client in; exchange a sign-in ticket for the portal. That is the
whole of it. Each runs on demand and costs nothing when idle.

**The database moves to Cloudflare's own.** The data is small — contact messages, a handful
of client accounts, short-lived sign-in tickets. It fits comfortably, and it removes the
requirement for a permanently connected server, which is the thing that makes the current
setup immovable. *(Keeping MySQL is technically possible through an extra Cloudflare
component. I would not: it is one more moving part to maintain for no benefit at this size.)*

**Email moves to a proper sending service on your own domain.** This fixes a real fragility
that predates any of this work: notifications currently go through a personal Gmail account
using an app password. That is a workaround, it ties your business notifications to one
person's Google account, and messages sent that way are more likely to land in spam.
Sending from `darwish-co.com` through a real service is more reliable, more professional,
and removes the dependency on an individual.

**Admin access becomes a real login.** Cloudflare can require a named person to sign in
*before* the admin page even loads — no code to write, no shared secret, and a record of who
did what. This replaces the single shared code, which is currently the weakest link.

## 4. What this fixes

| Problem | Fixed by |
|---|---|
| AI assistants see empty pages | Static pages carry their full text |
| Slow first load, especially on mobile | Nothing to assemble; files delivered from nearby servers |
| The whole site depends on one server | Pages have no server to depend on |
| Business email runs through a personal Gmail account | A sending service on your own domain |
| One shared admin code, no record of who did what | Named sign-in, handled by the platform |
| The site is locked to its current host | Static pages move anywhere; the six operations are small and portable |

Running cost, at this size: effectively the price of the domain. Static hosting and the
handful of operations sit inside free allowances, as does the admin sign-in for a small team.

## 5. The dependency nobody has named yet

The client sign-in does not do the work itself. It checks the password and then sends the
client to **Darwish Hub** or **Nabta Quest** — and both of those are separate applications
hosted on the current platform, at addresses ending in `manus.space`.

**Moving this website does not move those.** Before any hosting decision is final, three
questions need answers:

1. Do those two portals stay where they are, move too, or get retired?
2. Who maintains them?
3. Are they on a proper domain of yours? Today a client's browser visibly leaves
   `darwish-co.com` for a platform address, which undercuts the impression the rest of the
   site works to create.

This is a business question, not a technical one, and it is the largest unknown in the plan.

## 6. What I would not do

Worth stating, because each is a plausible-sounding mistake.

- **Do not rebuild the site in a new framework.** The site is fine. It needs unbolting, not replacing.
- **Do not add a content management system yet.** Publishing two articles a month does not
  justify it, and it introduces a system to maintain. Revisit when someone other than a
  developer genuinely needs to publish without help.
- **Do not build a custom admin login.** The platform can do it properly, for free, with no
  code to secure or maintain.
- **Do not move the client portals in the same project.** One thing at a time.

## 7. The order I would do it in

**First — make the pages readable (no hosting change required).**
Generate the finished pages at build time. This is the single highest-value engineering item
remaining from the audit, it works on the current host, and it is roughly an hour or two of
work. Everything already built becomes legible to AI assistants the moment it is live.

**Second — the content.** The governance guide and its supporting articles. This is the
audit's "answer coverage" gap, and it is what gets the firm quoted rather than merely listed.

**Third — publish.** Nothing we have done is live. No audit measurement can improve until it
is. This is the gate on everything.

**Fourth — the move.** Pages first, which is nearly free. Then the six operations, the
database, email and admin sign-in as one piece of work.

**Fifth — retest.** Re-run the fifteen audit questions against the published site and compare
honestly with the August baseline.

Note the order: **publishing comes before migrating.** A better-built site that nobody has
seen is worth less than the current one that is live.

## 8. What is still blocked on facts

None of the above unblocks these, and they matter more than the architecture:

- A named delivery lead for each service
- Engagement terms — how an engagement runs, and what it costs
- Written confirmation from VisionEthics and In Light of what each delivers
- The company facts withheld in `docs/entity-facts.md`
- The off-site profiles: LinkedIn and the Google Business listing, which are where much of
  the AI confusion with the Qatar companies actually lives

**The strongest version of this website is not the best-engineered one. It is the one that
can say true, specific things about who does the work, how an engagement runs and what it
costs.** The engineering makes those statements legible. It cannot supply them.
