/**
 * The guides: one hub and its spokes, as set out in `docs/positioning.md` §6 and
 * planned in `docs/content-plan.md`.
 *
 * This is the single source for the guide pages, their navigation entry, the
 * sitemap and their structured data — the same arrangement as `services.ts`.
 *
 * Every guide below is `published: false` until its text is written and
 * approved. An unpublished guide has no page, appears in no menu, is in no
 * sitemap and is not written out at build time: its address simply does not
 * exist yet. Nothing here advertises a gap.
 *
 * The addresses are deliberately `/guides/<slug>`, plural, so a second guide
 * later needs no redirects. While there is one guide the menu names it, rather
 * than offering a category holding a single item.
 */

export type GuideKind = "hub" | "spoke";

/** A point in a list, optionally led by a bold label and carrying sub-points. */
export type GuidePoint = { label?: string; text: string; sub?: string[] };

/**
 * A block of content inside a section, rendered in the order given.
 *
 * The earlier guides describe a section as prose, then one list or table, then
 * more prose, which `body` / `points` / `table` / `after` express. A section
 * that interleaves them — a list, a paragraph, a second list — needs the order
 * stated, which is what `blocks` is for. A section uses one form or the other.
 */
export type GuideBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "points"; items: GuidePoint[]; ordered?: boolean }
  | { kind: "table"; headers: string[]; rows: string[][] }
  /** An aside set apart from the text, such as a scope disclaimer. */
  | { kind: "note"; text: string }
  /** A self-contained specimen — a model policy, a worked form — set in a panel. */
  | {
      kind: "panel";
      title?: string;
      note?: string;
      intro?: string[];
      items?: GuidePoint[];
      ordered?: boolean;
    };

/** A block of guide text. The page renders these in order. */
export type GuideSection = {
  heading: string;
  /** Paragraphs of plain text. Markdown links are written as [text](url). */
  body?: string[];
  /** Points shown after the paragraphs. */
  points?: GuidePoint[];
  /** Numbers the points instead of bulleting them. */
  ordered?: boolean;
  /** A table, where one is part of the argument rather than decoration. */
  table?: { headers: string[]; rows: string[][] };
  /** A short aside set apart from the text, such as a scope disclaimer. */
  note?: string;
  /** Paragraphs shown after the points or table. */
  after?: string[];
  /** Ordered content, for a section that interleaves prose, lists and tables. */
  blocks?: GuideBlock[];
};

export type Guide = {
  slug: string;
  kind: GuideKind;
  published: boolean;
  /** Full title, used as the page heading. */
  title: string;
  /** Short label for menus, breadcrumbs and guide navigation. */
  navLabel: string;
  /**
   * The name a guide is known by on the library card — the full title without
   * its audience clause. Hubs set this; a topic page falls back to navLabel.
   */
  shortTitle?: string;
  /** Who the guide is for, shown under the name on the library card. */
  audience?: string;
  /**
   * One short line printed on the topic page's book in the `/guides` library,
   * where the full summary does not fit on a narrow spine. Falls back to the
   * summary when unset.
   */
  shelfDescription?: string;
  /** Browser tab and search-result title. */
  metaTitle: string;
  /** Search and social description, 50–160 characters. */
  metaDescription: string;
  /** One or two sentences: what the reader gets. Shown on cards and at the top. */
  summary: string;
  /** The thing the reader walks away with — a matrix, an agenda, a statement. */
  artefact?: string;
  /** Service page this guide belongs beside, as a slug from `services.ts`. */
  relatedService?: string;
  /** The hub a spoke belongs to. Hubs leave this empty. */
  hub?: string;
  /** The opening paragraphs, before the first heading. */
  intro?: string[];
  /** A list inside the opening, where the guide opens with one. */
  introPoints?: GuidePoint[];
  /** Opening paragraphs that follow that list. */
  introAfter?: string[];
  /**
   * Who wrote the guide, and who checked it on the subject matter. Both are
   * left unset until a real person is confirmed for each: a byline is a claim
   * about a named individual, and an unnamed reviewer is not a review. The page
   * shows nothing where these are absent rather than implying either.
   */
  author?: { name: string; role: string };
  reviewedBy?: { name: string; role: string; date: string };
  /** ISO date, set when the guide is published. */
  datePublished?: string;
  /** Social sharing image. */
  image?: string;
  sections?: GuideSection[];
  faqs?: { question: string; answer: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "governance-for-growing-smes",
    kind: "hub",
    published: true,
    datePublished: "2026-09-22",
    title:
      "Governance for Growing SMEs: A Practical Guide for Owners in Egypt and the MENA Region",
    navLabel: "Overview",
    shortTitle: "Governance for Growing SMEs",
    audience: "A practical guide for owners of SMEs in Egypt and the MENA region",
    metaTitle: "Governance for Growing SMEs — A Practical Guide | Darwish & Co",
    metaDescription:
      "A practical guide for owners of SMEs in Egypt and the MENA region: decision rights, accountability, controls and review routines, with a nine-question check.",
    summary:
      "What governance means in practice for an SME, the situations that make it urgent, and nine questions to find where to start.",
    artefact: "A nine-question self-assessment",
    intro: [
      "Governance is the set of rules and habits that let a business make decisions it can stand behind: who is allowed to decide what, who is accountable for it, what checks catch problems, and how the business verifies over time that decisions are actually being made well. Reducing what lands on the owner's desk is one visible effect of that — not the definition of it.",
      "Here is a question worth answering honestly before you read further: if you were unreachable for two weeks, which decisions in your business would simply stop happening? That question surfaces one situation — the founder bottleneck — not the whole picture. A business where nothing stops without the owner can still have no clear accountability, no real controls, and no review routine. Whatever your answer, the rest of this guide is about testing the other areas too.",
    ],
    sections: [
      {
        heading: "What governance actually means, practically",
        body: [
          "\u201CGovernance\u201D gets used to mean everything from a board charter to a values poster, which is part of why it is hard to act on. This guide works through four areas a growing SME can act on directly:",
        ],
        points: [
          {
            label: "Decision rights",
            text: "who is allowed to decide what, and under what conditions.",
          },
          {
            label: "Accountability",
            text: "who explains, reports on and corrects a decision once it is made, and to whom.",
          },
          {
            label: "Controls",
            text: "the checks that catch a decision going wrong before it does damage, or that create a record afterwards.",
          },
          {
            label: "Review routines",
            text: "how the business checks, on a schedule, whether decisions are actually being made the way it intended.",
          },
        ],
        after: [
          "These four are where this guide goes into detail. They are not the whole of governance: setting the organisation's direction, the oversight a governing body or owner exercises over management, and the responsibilities the business owes its owners and other relevant stakeholders all sit alongside them. [ISO 37000:2021, Governance of organizations — Guidance](https://www.iso.org/standard/65036.html) sets out principles covering that wider ground, as do the [G20/OECD Principles of Corporate Governance](https://www.oecd.org/en/publications/g20-oecd-principles-of-corporate-governance-2023_ed750b30-en.html) in their own context. Both are cited here as published reference points for the ideas, not as standards this guide certifies against or claims to implement.",
          "None of the four areas requires a board, a constitution or an org chart redesign to start. A five-person business can have working decision rights; a fifty-person business can have none. Governance is a set of habits a business builds, not a size threshold it crosses.",
        ],
      },
      {
        heading: "Five situations that make this urgent",
        body: [
          "Governance work usually starts when something makes the gap visible. Five situations bring owners to this question.",
        ],
        points: [
          {
            label: "A founder bottleneck",
            text: "decisions that could be closed elsewhere — a purchase, a discount, a hire — arrive with the owner, because no one else has been given authority to close them. It shows up in the owner's own calendar.",
          },
          {
            label: "A customer requirement",
            text: "a larger customer, during onboarding or a tender, asks for evidence of internal controls: an approval process, a conflicts-of-interest policy, records of how decisions get made. The business finds that practices it follows informally have no documented form, or that a documented policy is not the one being followed.",
          },
          {
            label: "Investment",
            text: "an investor's due diligence looks for decision rights, financial controls and clean records — not because governance is the product, but because it is how an outside party gauges whether the business can run without them in the room.",
          },
          {
            label: "Financing",
            text: "a bank or lender assessing a facility wants to see who approves what, particularly around financial commitments. Similar territory to investment diligence, usually narrower and focused on financial controls.",
          },
          {
            label: "Succession",
            text: "a founder planning to step back, formally or gradually, finds how much of the business's decision-making lived in their head rather than in any transferable structure — knowledge and relationships that were never written down, as much as rules that were never set.",
          },
        ],
        after: [
          "These are not mutually exclusive, and each draws on the same four areas — but not with the same weight. A customer questionnaire tests controls and records most directly. Investment and financing diligence concentrate on decision rights and financial controls. Succession exposes accountability, and knowledge the four areas describe but do not by themselves capture. Which area to start with depends on why you are here.",
        ],
      },
      {
        heading: "The four areas, one at a time",
        points: [
          {
            label: "Decision rights",
            text: "who can approve what, up to what limit, under what condition — and where it goes if that condition is not met. This is the most concrete of the four, and where the founder bottleneck sits most directly.",
          },
          {
            label: "Accountability",
            text: "decision rights work when accountability is attached to them: the person with authority to approve a purchase is also the person who explains it, reports on it and corrects course if it goes wrong. Authority is often delegated in passing — \u201Cjust check with Ahmed\u201D — without anyone being told they now own the responsibility, not only the approval.",
          },
          {
            label: "Controls",
            text: "the checks that catch problems before or after a decision: separation of duties, required records, approval thresholds, escalation routes. A control without a decision right behind it stays theoretical — a policy saying purchases over a set limit require approval means little if no one has been told they are the approver.",
          },
          {
            label: "Review routines",
            text: "a schedule for checking whether decisions are happening the way the business intended. A missed review is not visible the way a missed payment is: the distance between the rules on paper and what people actually do shows up only when someone looks.",
          },
        ],
      },
      {
        heading: "A short self-assessment",
        body: [
          "Nine questions to answer for your own business, one area at a time. Each states a safeguard: yes means it is in place. No, partly, or you are not sure means there is something to look into — not that the business has a problem, and not a score to add up.",
        ],
        table: {
          headers: ["Area", "The safeguard, as a question"],
          rows: [
            [
              "Decision rights",
              "Is someone other than you authorised to approve a routine purchase?\nDoes that authority carry a stated limit or condition, written down?\nIs there a named place the decision goes when that limit or condition is not met?",
            ],
            [
              "Accountability",
              "When a delegated decision goes wrong, is one named person responsible for explaining it and correcting it?\nHas each person holding approval authority been told explicitly that they hold it?",
            ],
            [
              "Controls",
              "Is a record created before a commitment is made, rather than only afterwards?\nDoes requesting, approving and paying for the same item involve more than one person, or an independent check where the team is too small for that?",
            ],
            [
              "Review routines",
              "Has anyone checked in the last quarter whether actual decisions match the rules on paper?\nIs there a defined way you would learn that a rule is being bypassed?",
            ],
          ],
        },
        after: [
          "A single no is worth acting on by itself, and several yes answers elsewhere do not offset it. What to do about it depends on which question it is and why the answer is what it is: one business may need to build decision rights from nothing, another may have them written down but no control or review habit behind them. Name the specific decision or area the answer points to before deciding how to close it.",
        ],
      },
      {
        heading: "Where to go next",
        body: [
          "This guide is a map, not a manual. Each area has more depth than fits here.",
          "[Delegation of Authority: How to Delegate Decisions Without Losing Oversight](/guides/delegation-of-authority) takes the decision-rights area in full: who may approve what, to which limit, on what record, and where a decision goes when a condition fails.",
          "[What to Do When a Major Client Sends an Anti-Bribery Questionnaire](/guides/anti-bribery-questionnaire) covers what happens when the controls area becomes externally visible, and how to organise a response using evidence you already have.",
          "[Setting the Rules for Employee AI Use: A Governance Starting Point](/guides/employee-ai-use) covers the tools your staff are already using: which uses are approved, what information may go into them, what a tool may do by itself, and who checks the result.",
          "A further guide, on turning decision rights into a working monthly review, is planned.",
        ],
      },
      {
        heading: "What this guide is not",
        points: [
          {
            label: "Governance advice is not legal work",
            text: "building decision rights, accountability and controls is an operational and organisational discipline. It is not legal authority to bind the company, drafting binding corporate documents, or interpreting a specific legal or regulatory obligation. Those need a qualified legal adviser, and nothing here should be read as legal advice.",
          },
          {
            label: "Governance is not certification",
            text: "a business can have working decision rights, accountability and review routines without holding, or needing, any certification. Where anti-bribery management specifically is the subject, ISO 37001:2025 is the current edition of that standard.",
          },
          {
            label: "A governance gap is not a verdict on the business",
            text: "growing past informal decision-making is an ordinary transition for an expanding company. The self-assessment above is a starting point for that transition, not a scorecard.",
          },
        ],
        after: [
          "On certification, keep three activities distinct. Readiness assessment reviews the current position against the requirements; implementation support helps establish or improve the management system and controls; certification is an independent assessment against the specified requirements. The same adviser may provide both readiness and implementation support. Certification requires an independent assessment, and cannot be provided by the adviser who did that work. ISO develops standards and does not certify organisations. Accreditation is a separate matter again — it concerns the certification body's own competence, and is not universally compulsory, though a buyer may require an accredited certification. See [ISO's own certification guidance](https://www.iso.org/certification.html).",
        ],
      },
    ],
  },
  {
    slug: "delegation-of-authority",
    kind: "spoke",
    published: true,
    datePublished: "2026-09-22",
    hub: "governance-for-growing-smes",
    relatedService: "corporate-family-governance",
    title: "Delegation of Authority: How to Delegate Decisions Without Losing Oversight",
    navLabel: "Delegation of authority",
    shelfDescription: "Delegate decisions without losing oversight.",
    metaTitle: "Delegation of Authority: Delegating Without Losing Oversight | Darwish & Co",
    metaDescription:
      "A delegation of authority matrix keeps each decision with the person authorised to take it while its conditions hold, and routes exceptions to a named role.",
    summary:
      "How to keep each decision with the person authorised to take it, and send only the exceptions further.",
    artefact: "A delegation of authority matrix",
    intro: [
      "A decision stays with the person the matrix authorises to take it for as long as every condition set for it holds — including where that person is the owner. Where a condition fails, or the decision is new, it follows the escalation route the matrix names for that case.",
      "Here is the gap worth sitting with: you could probably name the last five decisions that landed on your desk. Could you say which of those genuinely needed you, and which reached you only because no one else had been given the authority to close them out?",
      "Nadia is the managing director of a 40-person trading company. Last Tuesday, three decisions crossed her desk: a vendor purchase of EGP 45,000, a customer's request for a 15% discount, and a request to hire a Finance Controller. Each carries risks that approved conditions and controls need to address. They reached her only because no delegation rules existed yet to say who else could decide, under what conditions, and where the decision should go if those conditions were not met.",
    ],
    sections: [
      {
        heading: "Why this keeps happening",
        body: [
          "Some decisions genuinely need approval at a senior level — material financial exposure, legal consequence, reputational risk — and the matrix should name who that is for each case, which is not automatically the owner. The problem is not decisions reaching the appropriate authorised level. It is routine decisions reaching a higher level than they need to, because nobody has been handed clear, conditional authority to close them out lower down.",
          "That is not a management failure. It is an unmade decision about decisions, and it is the one gap here that is straightforward to close.",
        ],
      },
      {
        heading: "What delegation of authority actually means",
        body: [
          "This guide covers internal decision and approval authority — who inside the company signs off before something proceeds. It is not legal authority to bind the company to a contract, which is a separate question, covered near the end.",
          "Delegation of authority overlaps with documents you likely already have, without being identical to any of them. An organisation chart shows reporting lines, not decision rights. A job description may include delegated authority, but often does not specify limits. Approval and signature requirements may themselves sit inside the control framework. What matters is not which document holds the rule — it is that all of them agree.",
        ],
      },
      {
        heading: "Understand what approval actually covers",
        body: [
          "Before mapping anything, separate the stages a decision moves through, because they do not prove the same thing:",
          "Approval to commit → placing the order → receiving goods or services → checking the invoice → authorising payment.",
          "An invoice arriving later does not confirm a valid cost was incurred — it records a supplier's claim for payment, which still needs to be checked against what was actually approved and received. A signed offer confirms a hire was formalised, not that the hiring decision was approved first. The matrix below records the approval that happens before the commitment; everything after is a different record, checked for a different reason.",
        ],
      },
      {
        heading: "Follow Nadia's three decisions through the matrix",
        note: "Illustrative example — not a Darwish & Co. client case. The company, the roles, the thresholds, the percentages and the contract conditions are invented to make the mechanics concrete. They are teaching assumptions, not thresholds Darwish & Co. recommends: where a limit belongs in your company is a separate judgment, covered below.",
        body: [
          "Same company, same three decisions from the opening, now run against one consistent set of conditions — so you can see which stay delegated, which escalate, and where each one goes.",
        ],
        table: {
          headers: [
            "Decision type",
            "Authorised decision-maker",
            "Limit or condition",
            "Approval record (before commitment)",
            "Who is informed",
            "Escalation route",
          ],
          rows: [
            [
              "Operating purchase",
              "Department Head",
              "Up to EGP 50,000, within an approved budget line, applied to the total value of related purchases rather than to each invoice",
              "Signed purchase requisition, dated and referenced to the budget line",
              "Finance Manager, in the monthly summary",
              "Within budget, above EGP 50,000 and up to EGP 200,000 → Finance Manager\nWithin budget, above EGP 200,000 → Managing Director, within that role's approved authority; beyond it → the Board\nOutside the approved budget line, at any value → Finance Manager reviews and refers the budget exception to the Managing Director, within that role's approved authority; beyond it → the Board",
            ],
            [
              "Customer discount",
              "Sales Manager",
              "Up to 10% off standard list price, on pre-approved standard contract terms",
              "Discount approval noted on the order before it is issued",
              "Finance Manager, in the weekly summary",
              "Above 10%, or off standard terms → Commercial Director, up to that role's approved exception limit of 25%\nAbove 25% → Managing Director",
            ],
            [
              "Recruitment",
              "Hiring Manager",
              "Within the approved headcount plan and the approved salary band",
              "Signed hiring approval, before the offer is drafted",
              "HR Lead and Finance Manager, at approval stage",
              "Outside the approved headcount plan or salary band → Managing Director",
            ],
            [
              "Contractual commitment",
              "Managing Director",
              "Pre-approved standard terms, within the approved total value of the commitment across its full term",
              "Signed approval memo before the contract is signed",
              "Finance Manager",
              "Non-standard terms, or total value above the approved threshold → the Board, with legal review",
            ],
          ],
        },
        after: [
          "Standard terms, for this illustrative company: the company's own contract template, payment terms of 60 days or fewer, no exclusivity clause, no automatic renewal beyond 12 months. Anything else is non-standard by definition, whatever its value.",
          "Read the escalation routes in order: the first condition a decision fails is the route it takes. An out-of-budget purchase follows the budget-exception route whatever its value, so it cannot sit in two places at once. Where a route reaches a role whose own approved authority does not cover the decision, the route continues to the level that does.",
          "Run against this table, Nadia's Tuesday resolves three different ways.",
        ],
      },
      {
        heading: "What happens to each of the three",
        body: [
          "The EGP 45,000 purchase is within the Department Head's limit and inside the budget line, so it is delegated in full. Nadia takes no part in approving it. It reaches her only as one line in the Finance Manager's monthly summary, which is reporting, not approval.",
          "The 15% discount request exceeds the Sales Manager's 10% band but sits inside the Commercial Director's approved exception limit of 25%. The Commercial Director decides it. Nadia sees it in the Finance Manager's weekly summary of discounts above the standard band.",
          "The Finance Controller hire falls outside the current approved headcount plan. That is the condition the matrix reserves for the Managing Director, so this is the one decision that correctly still reaches Nadia, and she decides it herself.",
          "That is the actual test of a working matrix: not that fewer decisions reach the owner, but that the right ones do — each one delegated, escalated or reserved because of a stated condition, to a named person, rather than by habit.",
        ],
      },
      {
        heading: "What the owner receives, and when",
        body: [
          "Delegation only holds if the owner can see what was decided without being asked to approve it. In this illustrative company the arrangement is set out as three separate things, so notification is never mistaken for approval:",
        ],
        points: [
          {
            label: "Monthly",
            text: "the Finance Manager reports to the Managing Director on purchases approved under delegated authority, against the budget lines they were charged to.",
          },
          {
            label: "Weekly",
            text: "the Finance Manager reports discounts approved above the standard band, with the role that approved each one.",
          },
          {
            label: "Promptly, as it happens",
            text: "the Managing Director is notified of any decision that took an escalation route above the level at which it was first raised — an out-of-budget purchase at any value, a discount that exceeds the Commercial Director's limit, a hire outside the headcount plan — and of any decision taken outside the matrix.",
          },
        ],
        after: [
          "Being notified is not approving. Where a decision needs the Managing Director's approval, the matrix routes it there before the commitment is made; the reports above tell her what has already been decided by others under authority she granted.",
        ],
      },
      {
        heading: "Safeguards the matrix needs",
        table: {
          headers: ["Safeguard", "Why it matters"],
          rows: [
            [
              "Who approves the matrix itself",
              "The matrix takes effect only once approved by whoever is authorised to grant delegations — typically the board, or the owner where there is no board. A department cannot grant itself authority by filling in a row.",
            ],
            [
              "Separation of duties",
              "The person who requests, approves and pays should not routinely be one person. Where a small team makes full separation impractical, specify an independent check instead.",
            ],
            [
              "What the limit applies to",
              "State whether a limit covers a single transaction, a linked series of purchases, or a contract's full value across its term — as the purchase and contractual-commitment rows above both do, rather than defaulting to a per-invoice or annual figure that could understate the real exposure.",
            ],
            [
              "No artificial splitting",
              "Several smaller approvals should not be used to stay under a limit that a single larger one would have exceeded.",
            ],
          ],
        },
        after: [
          "These are design and review points, not claims about a universal legal requirement. The link between delegating authority and separating duties is stated directly in GAO's [Standards for Internal Control in the Federal Government](https://www.gao.gov/products/gao-25-107721), which says that management delegates authority only to the extent required to achieve the entity's objectives, and that as part of delegating authority management evaluates the delegation for proper segregation of duties. Approval and segregation of duties also appear among the typical control activities in GAO's [Financial Audit Manual, Volume 1](https://www.gao.gov/products/gao-26-108577). Both are United States federal public-sector documents, cited for the general control concept — not as rules that apply to a MENA SME by default.",
        ],
      },
      {
        heading: "How to set approval limits",
        body: [
          "Where a limit sits is a judgment call: financial exposure, the risk if it goes wrong, the decision-maker's competence and track record, and any obligations already in force — a loan covenant, a lease term, a regulatory condition. A business with strong monthly reporting and an experienced manager may reasonably set limits differently from one still building that record.",
          "There is no threshold that fits every SME. It is a decision to make deliberately, not to copy from an example — including the examples above.",
        ],
      },
      {
        heading: "Handle exceptions",
        points: [
          {
            label: "Absence",
            text: "a role's authority does not automatically transfer. Name the deputy explicitly, with stated scope and duration.",
          },
          {
            label: "Urgent decisions",
            text: "a fast-track route is reasonable, but it needs its own recorded approval and a prompt review afterwards. That review assesses whether the decision was reasonable; it does not stand in for the approval that was required beforehand, and any departure from the process goes through the designated escalation route afterwards.",
          },
          {
            label: "Conflicts of interest",
            text: "where the named decision-maker has a personal or financial stake, the substitute must be someone both authorised to take that decision and free of the same conflict — not simply the next name in the matrix.",
          },
          {
            label: "Matters exceeding authority",
            text: "the escalation route only works if it is followed under time pressure rather than quietly bypassed.",
          },
        ],
      },
      {
        heading: "Putting it into practice",
        ordered: true,
        points: [
          { text: "Select a small set of recurring decisions to start with." },
          { text: "Get the authority rules approved by whoever is authorised to grant delegations." },
          { text: "Assign role-holders and named, authorised deputies." },
          {
            text: "Communicate the rules to everyone named in them, and say what records they now need to keep.",
          },
          { text: "After a period, check a sample of actual decisions against the matrix." },
          {
            text: "Adjust conditions that do not fit reality, and address any departures from the approved rules.",
          },
        ],
        after: [
          "Run back through Nadia's Tuesday and this is what changes. The Department Head approves the purchase, on the record, and it goes no further. The discount exception goes to the Commercial Director. The hire, because it sits outside the approved headcount plan, is the one decision Nadia still takes herself — and she learns of the other two through the reports above, not by being asked.",
        ],
      },
      {
        heading: "Internal approval is not legal signing authority",
        body: [
          "Everything above is internal approval — who signs off before something proceeds. It is separate from legal authority to bind the company: whose signature is legally effective on a contract, and under what corporate authorisation. Someone can hold internal approval authority without holding legal signing authority for the same decision, and the two should never be assumed to match.",
          "Where a decision touches legal signing authority or corporate authorisations, that needs a qualified legal adviser. This guide sets out an internal-approval framework, not a legal opinion on binding authority.",
        ],
      },
      {
        heading: "Where this connects",
        body: [
          "Financial approval limits and the records behind them overlap directly with what a client anti-bribery questionnaire typically asks about. See [What to Do When a Major Client Sends an Anti-Bribery Questionnaire](/guides/anti-bribery-questionnaire) for how those same approval records are used in that context.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should approve the delegation matrix?",
        answer:
          "Whoever is authorised to grant delegations — typically the board, or the owner where there is no board. A department cannot grant itself authority by filling in a row, and the matrix takes effect only once that approval is in place.",
      },
      {
        question: "How should we set approval limits?",
        answer:
          "By judgment, against the financial exposure, the risk if the decision goes wrong, the decision-maker's competence and track record, and any obligations already in force such as a loan covenant, a lease term or a regulatory condition. A company with strong monthly reporting and an experienced manager may reasonably set limits differently from one still building that record. There is no threshold that fits every SME, and the figures used in the example above are illustrative rather than recommended.",
      },
      {
        question: "What should happen when someone approves outside their authority?",
        answer:
          "Treat it as a departure from the approved rules rather than a new limit. Record what happened, route the decision through the escalation path the matrix names for that case, and have the authorised role consider it. A review afterwards assesses whether the decision was reasonable; it does not retrospectively supply the approval that was required beforehand, and repeated departures are a sign that either the limits or the routes need to change.",
      },
      {
        question: "Is internal approval the same as legal signing authority?",
        answer:
          "No. Internal approval is who signs off before something proceeds inside the company. Legal authority to bind the company concerns whose signature is legally effective on a contract, and under what corporate authorisation. Someone can hold one without the other, and the two should not be assumed to match. Where a decision touches legal signing authority or corporate authorisations, that needs a qualified legal adviser.",
      },
    ],
  },
  {
    slug: "anti-bribery-questionnaire",
    kind: "spoke",
    published: true,
    datePublished: "2026-09-22",
    hub: "governance-for-growing-smes",
    relatedService: "risk-compliance-integrity",
    title: "What to Do When a Major Client Sends an Anti-Bribery Questionnaire",
    navLabel: "Anti-bribery questionnaires",
    shelfDescription: "When a major client asks about your controls.",
    metaTitle: "Answering a Client's Anti-Bribery Questionnaire | Darwish & Co",
    metaDescription:
      "Most questions on a client compliance questionnaire ask for four things: a policy, a procedure, a record and a named responsible person. How to answer honestly.",
    summary:
      "What the questionnaire is really asking for, and what to do when the honest answer is not yet.",
    artefact: "A question-to-evidence map",
    intro: [
      "A major client has sent your company an anti-bribery questionnaire. There is a deadline, several questions need input from colleagues, and some answers require documents you may not have in one place.",
      "Start by organising the response: identify what each question asks, check the company's actual position, collect supporting evidence and assign someone to approve the answer. A questionnaire may expose a need for stronger controls, but completing the form and fixing those gaps are separate tasks. Planned improvements should not be presented as controls already in place.",
      "For an SME, the most useful starting point is a simple question-to-evidence map. It connects each request to the relevant policy, procedure, record or responsible person — and makes missing information visible before submission.",
    ],
    sections: [
      {
        heading: "Before you answer, confirm the scope",
        body: [
          "Identify which legal entity the questionnaire covers, the deadline, the reporting period and the person coordinating the response. A question about one company should not automatically be answered using a group-wide policy or certificate without checking its coverage.",
          "Read the instructions and attachment requirements together. Note who must sign any declaration and where questions or clarification requests should go. The person who received the form may coordinate it, but finance, operations, HR and management may each hold part of the answer.",
          "If the deadline looks unrealistic, raise that with the client early. Do not assume an extension has been granted.",
        ],
      },
      {
        heading: "Why a client asks for an anti-bribery questionnaire",
        body: [
          "A questionnaire can form part of supplier onboarding, a tender or a periodic review. Receiving one does not, by itself, mean the client suspects misconduct.",
          "The request may reflect the client's supplier policy, obligations applicable to its business, or its approach to managing bribery risks. Supply-chain corruption risks and the responsibilities of customers and suppliers are addressed in the [UN Global Compact's supply-chain guidance](https://unglobalcompact.org/library/153).",
          "The client's instructions determine what it is requesting. A supplier questionnaire, a legal declaration and a requirement for certification are different things. If the wording refers to an unfamiliar law or standard, ask the client's compliance contact what information it requires; obtain qualified advice where interpreting your own obligations is necessary.",
          "For businesses in Egypt and across the MENA region, the geographic label alone does not establish which laws apply. Keep the response specific to the company, transaction and request.",
        ],
      },
      {
        heading: "What evidence is the client asking for?",
        body: ["For questions about controls, use four lenses:"],
        points: [
          { label: "Policy", text: "What approved rule applies?" },
          { label: "Procedure", text: "How is that rule put into practice?" },
          { label: "Record", text: "What evidence shows the activity occurred, and when?" },
          {
            label: "Responsible person",
            text: "Who owns the control, confirms the facts or approves the response?",
          },
        ],
        after: [
          "These lenses help organise information; they are not a certification method. A policy shows what should happen. It does not, on its own, show that employees follow it.",
          "Some questions need a different approach. Ownership, affiliations, previous incidents and certification status require verified factual disclosures. Identify the person who holds the information and the person authorised to approve its release. These need not be the same person.",
        ],
      },
      {
        heading: "Map each question to evidence and an owner",
        body: [
          "Use the following table as an illustrative starting point. Adapt it to the wording and scope of the actual questionnaire. The evidence listed is material to inspect internally, not an instruction to send every record to the client.",
        ],
        table: {
          headers: [
            "Request category",
            "What to establish",
            "Evidence to inspect",
            "Important qualification",
          ],
          rows: [
            [
              "Anti-bribery policy",
              "Is a current policy approved and applicable to the company?",
              "Policy version, approval and communication records",
              "A draft is not an approved policy.",
            ],
            [
              "Gifts and hospitality",
              "What rules and approvals operate in practice?",
              "Procedure, relevant approvals and register, where used",
              "Distinguish written limits from actual implementation.",
            ],
            [
              "Conflicts of interest",
              "How are conflicts declared, reviewed and handled?",
              "Procedure and relevant declaration or review records",
              "Collecting declarations is different from acting on them.",
            ],
            [
              "Third-party due diligence",
              "Which relationships are reviewed, and how?",
              "Review criteria, records and escalation decisions",
              "State the actual coverage; do not imply universal screening.",
            ],
            [
              "Training",
              "Who completed relevant training, and when?",
              "Materials, attendance or completion records",
              "Assigned training is not completed training.",
            ],
            [
              "Reporting concerns",
              "Can people access a functioning reporting route?",
              "Channel details, handling procedure and appropriate testing records",
              "No reported concerns does not establish that the channel works or fails.",
            ],
            [
              "Financial approvals",
              "Who can approve relevant transactions?",
              "Delegation-of-authority matrix and approval records",
              "Check whether the documented authority is applied.",
            ],
            [
              "Ownership, affiliations or incidents",
              "What facts and period does the question cover?",
              "Verified company information and appropriate internal review",
              "Escalate sensitive or legally ambiguous disclosures.",
            ],
            [
              "Certification",
              "What certificate is held, by which entity and for what scope?",
              "Certificate, issuer and validity information",
              "Do not imply certification beyond its actual coverage.",
            ],
          ],
        },
        after: [
          "In your working tracker, add columns for the question reference, current status, evidence date, owner, unresolved issue and approver. This keeps clarification requests and gaps attached to the relevant answer.",
        ],
      },
      {
        heading: "A worked example: training completed by only part of the team",
        note: "Illustrative example — not a Darwish & Co. client case.",
        body: [
          "A questionnaire asks whether all employees in relevant roles completed anti-bribery training during the previous 12 months.",
          "The company identifies 20 employees within that scope. Records show that 14 completed the training. Six recent joiners have been assigned a session but have not completed it.",
        ],
        table: {
          headers: ["Step", "What the team should establish"],
          rows: [
            ["Interpret the question", "Confirm which roles and dates the client means."],
            [
              "Check the evidence",
              "Reconcile the employee list with dated completion records.",
            ],
            ["Establish the current position", "Fourteen completed; six remain outstanding."],
            [
              "Separate the improvement plan",
              "A scheduled session is a future action, not evidence of completion.",
            ],
            [
              "Review the response",
              "Have the responsible manager confirm the facts and the authorised approver review the answer.",
            ],
          ],
        },
        after: [
          "The response needs to disclose the incomplete coverage rather than imply that everyone has completed training. If the form permits an explanation, distinguish the documented position from the planned next step. If its response options cannot represent the facts accurately, ask the client how to record the qualification.",
          "This approach does not guarantee acceptance. It gives the client an accurate basis for its decision and gives the company a specific gap to address.",
        ],
      },
      {
        heading: "What if a policy, control or record is missing?",
        body: [
          "Different gaps need different treatment. Before finalising an answer, place it in one of these categories:",
        ],
        ordered: true,
        points: [
          {
            label: "Control operating, evidence available",
            text: "Check that the evidence matches the requested company, activity and period.",
          },
          {
            label: "Informal practice",
            text: "Establish what actually happens and what supports that account. Do not describe an informal arrangement as a documented programme.",
          },
          {
            label: "Policy exists, implementation incomplete",
            text: "State the distinction. Approval of a policy does not prove that its procedures are operating.",
          },
          {
            label: "Control absent",
            text: "Record the current position. A proposed policy or future action does not change today's answer.",
          },
          {
            label: "Facts unknown or question unclear",
            text: "Assign someone to investigate or seek clarification before approval.",
          },
          {
            label: "Not applicable",
            text: "Use this only where the reason is relevant, checked and consistent with the question's instructions.",
          },
        ],
        after: [
          "Do not backdate documents or create records suggesting an activity happened when it did not. If a control is introduced during the response process, record its actual effective date and avoid suggesting that it operated throughout an earlier reporting period.",
          "Where a gap requires improvement, assign an owner and a realistic next action. Only communicate a completion commitment that the business has authorised and can support. The client decides whether that proposal meets its requirements.",
        ],
      },
      {
        heading: "What to check before sending the response",
        body: ["Review the questionnaire as one document, not only as separate answers:"],
        points: [
          {
            label: "Consistency",
            text: "Do the answers refer to the same entity, scope and reporting period?",
          },
          {
            label: "Evidence",
            text: "Do the documents support the claims, and are the cited versions attached where requested?",
          },
          {
            label: "Responsibility",
            text: "Have named owners checked the information attributed to them?",
          },
          {
            label: "Qualifications",
            text: "Are gaps, limitations and future actions clearly distinguished?",
          },
          {
            label: "Disclosure",
            text: "Is the information appropriate to share through the proposed channel?",
          },
          {
            label: "Approval",
            text: "Has someone authorised to approve the company's external response signed off?",
          },
        ],
        after: [
          "Sensitive employee, investigation or commercial records need particular care. Where necessary, clarify acceptable redaction, summaries or secure transfer arrangements with the client and the appropriate internal adviser. Do not silently change evidence in a way that makes it misleading.",
          "Retain the approved response and the supporting evidence references so that future updates can be checked against what was actually submitted.",
        ],
      },
      {
        heading: "When do you need an adviser, lawyer or certification body?",
        body: [
          "Operational support can help organise evidence, identify control gaps and clarify responsibilities. Routine company facts can often be checked against reliable records. Legal declarations, ambiguous obligations or questions involving suspected misconduct may need qualified legal review before submission.",
          "Certification is a separate matter. [ISO 37001:2025](https://www.iso.org/standard/37001) concerns anti-bribery management systems. Its scope is broader than answering one client questionnaire, and receiving a questionnaire does not automatically mean certification is required.",
          "Keep three activities distinct:",
        ],
        points: [
          {
            label: "Readiness assessment",
            text: "reviewing the current position against relevant requirements.",
          },
          {
            label: "Implementation support",
            text: "helping establish or improve the management system and controls.",
          },
          {
            label: "Independent certification",
            text: "a certification body assessing the system against the specified requirements.",
          },
        ],
        after: [
          "An adviser may provide both readiness and implementation support; certification requires an independent assessment. ISO develops standards and does not certify organisations. Accreditation concerns the certification body's competence and is not universally compulsory, although the client may require an accredited certification. Confirm the precise requirement rather than assuming it. See [ISO's own certification guidance](https://www.iso.org/certification.html).",
        ],
      },
      {
        heading: "Turning the questionnaire into a practical next step",
        body: [
          "Start with the response map: what the client asks, what exists, what supports it and who approves the answer. Use the gaps it reveals to prioritise the next piece of work, whether that is clearer documentation, consistent implementation or specialist advice.",
          "Where the gap is in financial approvals — who may approve what, to which limit, and on what record — [Delegation of Authority: How to Delegate Decisions Without Losing Oversight](/guides/delegation-of-authority) sets out how those approval rules and records are built.",
          "Darwish & Co. is an Egypt-based governance and management consultancy for SMEs in the MENA region. A first conversation can establish the challenge and whether the firm's available expertise fits the support required.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does receiving a questionnaire mean the client suspects us?",
        answer:
          "No. A questionnaire can form part of supplier onboarding, a tender or a periodic review, and may reflect the client's supplier policy, obligations applicable to its business, or its approach to managing bribery risks. Receiving one does not, by itself, mean the client suspects misconduct.",
      },
      {
        question: "What if we cannot meet the deadline?",
        answer:
          "Raise it with the client early, through the contact its instructions name for questions. An extension applies only if the client agrees to it, so do not assume one has been granted or let an unconfirmed extension hold up the parts of the response you can already complete.",
      },
      {
        question: "Do we need ISO 37001 certification to respond?",
        answer:
          "Not automatically. ISO 37001:2025 concerns anti-bribery management systems, and its scope is broader than answering one client questionnaire. Some clients do require certification, and some require it from an accredited certification body. Confirm the precise requirement rather than assuming it, and keep readiness assessment, implementation support and independent certification distinct.",
      },
      {
        question: "What if the honest answer is no?",
        answer:
          "Record the current position. A proposed policy or a scheduled action does not change today's answer, and a planned improvement should not be presented as a control already in place. Where the form allows an explanation, distinguish the documented position from the planned next step; where its response options cannot represent the facts accurately, ask the client how to record the qualification.",
      },
    ],
  },
  {
    slug: "strategy-decision-rights",
    kind: "spoke",
    published: false,
    hub: "governance-for-growing-smes",
    relatedService: "strategy-execution",
    title: "How to Turn Strategy into Decision Rights, Measures and Monthly Reviews",
    navLabel: "Strategy into decision rights",
    metaTitle: "Turning Strategy into Decision Rights and Monthly Reviews | Darwish & Co",
    metaDescription:
      "Why strategies stall, and how an objective becomes an owner, a measure and a decision right — reviewed on a rhythm the company can keep.",
    summary:
      "Why a strategy stops happening, and the monthly rhythm that keeps it happening.",
    artefact: "A monthly review agenda",
  },
  {
    slug: "employee-ai-use",
    kind: "spoke",
    // In preview for review. Positioning §6 holds this topic back from
    // production until AI Governance has a named delivery lead, and the draft
    // itself is marked "not subject-reviewed": both are recorded in
    // docs/content-plan.md and reported with the guide.
    published: true,
    datePublished: "2026-09-25",
    hub: "governance-for-growing-smes",
    relatedService: "ai-governance",
    title: "Setting the Rules for Employee AI Use: A Governance Starting Point",
    navLabel: "Employee AI use",
    shelfDescription: "A governance starting point for setting the rules.",
    metaTitle: "Employee AI Use Rules: A Governance Starting Point | Darwish & Co",
    metaDescription:
      "How owners of growing SMEs can set practical rules for employee AI use: an inventory, approved uses, information categories, action limits and human review.",
    summary:
      "The few rules worth writing down first, while staff are already using these tools.",
    artefact: "An illustrative acceptable-use statement",
    intro: [
      "If people in your company use AI tools to draft emails, summarise documents or work through spreadsheets, you need answers to a few practical questions:",
    ],
    introPoints: [
      { text: "Which uses are acceptable, and which should not happen at all?" },
      { text: "Which tools and accounts may be used?" },
      { text: "What information may go into them?" },
      { text: "What may the tools do by themselves?" },
      { text: "Who checks the result before the company relies on it?" },
    ],
    introAfter: [
      "This article sets out a starting point for answering those questions without a large programme. It is a governance starting point, not a complete AI management system, a legal opinion or a technical security review.",
    ],
    sections: [
      {
        heading: "What this starting point covers",
        blocks: [
          {
            kind: "paragraph",
            text: "The rules cover people using AI tools in company work. That includes standalone assistants, AI features inside software you already use, transcription tools and browser extensions.",
          },
          {
            kind: "paragraph",
            text: "Decide whether the rules also apply to contractors, freelancers or advisers who do work for you. An internal policy does not automatically bind a supplier. If you want it to apply to them, their contract or engagement terms need to say so.",
          },
          { kind: "paragraph", text: "The rules do not cover:" },
          {
            kind: "points",
            items: [
              { text: "Building AI into your products." },
              { text: "Automated decisions about customers." },
              { text: "Using AI to evaluate people." },
            ],
          },
          {
            kind: "paragraph",
            text: "Each of those needs a broader assessment with technical and legal input.",
          },
          {
            kind: "paragraph",
            text: "Employee AI use carries several distinct risks. NIST's generative-AI risk profile, a voluntary US framework, treats them separately ([NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)). Among them are:",
          },
          {
            kind: "points",
            items: [
              { text: "Confidently stated false content." },
              { text: "Data privacy." },
              { text: "Over-reliance on automated output." },
              { text: "Information security." },
            ],
          },
          {
            kind: "paragraph",
            text: "A rule that looks only at what goes into a tool addresses one of these. The rules below therefore check the activity, the tool, the information, what the tool may do by itself, and how the output is reviewed.",
          },
        ],
      },
      {
        heading: "Step 1: Find out how AI is already used",
        blocks: [
          {
            kind: "paragraph",
            text: "Explain to each team that the inventory exists to set workable rules, then ask what they use and how. For each use, record:",
          },
          {
            kind: "points",
            items: [
              {
                label: "Tool and account",
                text: "for example, a general AI assistant on a personal free account.",
              },
              {
                label: "Connected to",
                text: "email, files, calendars or other systems the tool can reach.",
              },
              { label: "Who uses it, and what for", text: "the team and the task." },
              { label: "Information that goes in", text: "the categories in Step 4." },
              { label: "Where the output goes", text: "internal use, or out of the company." },
              {
                label: "Whether the tool takes actions itself",
                text: "for example, sending messages or updating records.",
              },
            ],
          },
          {
            kind: "paragraph",
            text: "Include personal accounts used for work and AI features switched on inside other software. An inventory records what people report. It does not prove it is complete, so repeat it at each review and whenever a new tool is proposed.",
          },
        ],
      },
      {
        heading: "Step 2: Assign responsibilities",
        blocks: [
          {
            kind: "note",
            text: "The role assignments below are an illustrative model. Adapt them to your existing governance and delegation-of-authority matrix.",
          },
          {
            kind: "table",
            headers: ["Role", "In this model"],
            rows: [
              [
                "Owner or general manager",
                "Approves the rules. Approves uses involving Restricted information.",
              ],
              [
                "Policy owner (a named manager)",
                "Keeps the inventory and the approved-use register. Takes requests through review. Approves uses up to the Internal category. Receives reports of mistakes. Runs the periodic review.",
              ],
              [
                "Technical reviewer (someone with IT responsibility, or an external adviser)",
                "Reviews tools, accounts, settings, connections and any tool actions before approval.",
              ],
              [
                "Qualified adviser",
                "Reviews contractual and privacy questions for uses involving personal or confidential information.",
              ],
              [
                "Person responsible for each client relationship",
                "Confirms what that client's contract and instructions say.",
              ],
            ],
          },
          {
            kind: "paragraph",
            text: "Another appropriately authorised role can take the approval decisions instead. Some safeguards should hold within this proposed policy whoever holds the roles:",
          },
          {
            kind: "points",
            items: [
              { text: "Uses are approved before they start." },
              { text: "Each new use gets technical review." },
              { text: "Personal or confidential information gets contractual and privacy review." },
              { text: "No approval permits what a law, contract or client instruction prohibits." },
            ],
          },
        ],
      },
      {
        heading: "Step 3: Approve uses, not just tools",
        blocks: [
          {
            kind: "paragraph",
            text: "Approving a tool in general says little about what people will do with it. Instead, record each approved use in a register. Each entry states:",
          },
          {
            kind: "points",
            items: [
              { label: "The activity", text: 'for example, "drafting marketing content".' },
              { label: "The tool and specific account", text: "named, not a category." },
              { label: "Who may use it", text: "the named team or role." },
              {
                label: "The highest information category allowed",
                text: "from Step 4. For Restricted information, the entry also names the specific types allowed.",
              },
              {
                label: "Any actions the tool may take by itself",
                text: "the default is none.",
              },
              {
                label: "Conditions and an expiry date",
                text: "conditions might include settings that must stay in place.",
              },
            ],
          },
          {
            kind: "paragraph",
            text: "Once a use is approved, people can work within it without asking permission for each task. Anything outside an entry — a different activity, account, information type or action — needs approval first, even if the information is public.",
          },
          { kind: "paragraph", text: "Approval. Requests go to the policy owner." },
          {
            kind: "points",
            items: [
              {
                label: "Technical review (every request)",
                text: "the technical reviewer checks:",
                sub: [
                  "whether the account is company-managed",
                  "the vendor's terms and settings on training use, retention and access (these differ between plans and can change)",
                  "what the tool can reach",
                  "whether those permissions are needed for the activity",
                ],
              },
              {
                label: "Contractual and privacy review (personal or confidential information)",
                text: "a qualified adviser reviews the position, and the person responsible for any affected client relationship confirms what the contract and instructions say.",
              },
              {
                label: "Decision",
                text: "the decision is made by the role with authority for that category.",
              },
            ],
          },
          { kind: "paragraph", text: "Approvals and refusals are both recorded." },
          {
            kind: "paragraph",
            text: "UK guidance illustrates why the tool checks matter. The National Cyber Security Centre notes that information given to consumer AI services may be stored, retained or used to improve the service unless specific privacy controls are in place. It also notes that a compromised AI agent can expose whatever the agent has access to ([NCSC](https://www.ncsc.gov.uk/blogs/the-hidden-risks-of-shadow-ai)).",
          },
          {
            kind: "paragraph",
            text: "Tools that act. In this starting point, a tool may draft, summarise or suggest. Any action the tool takes by itself — sending messages or invitations, changing records inside or outside the company, or reaching further systems — is excluded unless the register entry explicitly approves that action after technical review. Reviewing a tool's output is not the same as authorising it to act.",
          },
          {
            kind: "paragraph",
            text: "When approval lapses. Permission for a use ends when either of these happens:",
          },
          {
            kind: "points",
            items: [
              { text: "Its expiry date passes." },
              {
                text: "One of its conditions stops being met, for example:",
                sub: [
                  "a setting is changed",
                  "a new connection is added",
                  "the vendor changes relevant terms",
                ],
              },
            ],
          },
          {
            kind: "paragraph",
            text: "People must then stop that use. Anyone who becomes aware of a change tells the policy owner. The policy owner arranges renewal, or removal of access.",
          },
          {
            kind: "paragraph",
            text: "Unless you have set up a technical control, nothing stops the tool working at expiry. The rule relies on people stopping, and on the policy owner acting on renewal dates.",
          },
        ],
      },
      {
        heading: "Step 4: Classify the information",
        blocks: [
          {
            kind: "note",
            text: "The definitions below are illustrative, so adapt them to your business.",
          },
          {
            kind: "points",
            items: [
              {
                label: "Public",
                text: "information that has been published, by your company or others, and is neither personal information nor held in confidence. Examples: your published product details, or an official summary of a standard. Drafts approved for publication stay Internal until they are published.",
              },
              {
                label: "Internal",
                text: "your company's non-public information that is not personal, not held in confidence and not Prohibited.",
              },
              {
                label: "Restricted",
                text: "information needing specific approval, including:",
                sub: [
                  "personal information about anyone, including personal information that is publicly available elsewhere",
                  "information received in confidence from clients or partners",
                  "bank or payment details",
                  "unannounced bids and pricing",
                  "legal matters",
                ],
              },
              {
                label: "Prohibited",
                text: "live passwords, authentication codes and tokens, private keys and similar credentials. These are never entered into an AI tool, and no approval can permit it.",
              },
            ],
          },
          { kind: "paragraph", text: "Four rules apply:" },
          {
            kind: "points",
            items: [
              {
                text: "Information may be used only up to the category, and for Restricted information only the types, named in the register entry.",
              },
              { text: "Where content mixes categories, the most restrictive applies." },
              {
                text: "Public availability does not remove Restricted status from personal information or from information held in confidence.",
              },
              {
                text: "If you remove passages to lower the category, reclassify what remains. Remaining details can still reveal a client's plans or identify a person.",
              },
            ],
          },
        ],
      },
      {
        heading: "Step 5: Check the output, and keep a boundary on decisions about people",
        blocks: [
          {
            kind: "paragraph",
            text: "AI output can be fluent and still wrong, and people can rely on it more than it deserves. The level of checking depends on where the output goes:",
          },
          {
            kind: "points",
            items: [
              {
                label: "Internal working use",
                text: "the person using the tool checks the output before relying on it.",
              },
              {
                label: "Output that leaves the company or supports a financial or contractual decision",
                text: "the person accountable for that work reviews it first, checking facts, figures, names, references and calculations against the sources. They are responsible for the content as if they had written it.",
              },
            ],
          },
          {
            kind: "paragraph",
            text: "A sign-off record shows that a review took place, not that it was thorough. The periodic review looks at a sample.",
          },
          { kind: "paragraph", text: "Decisions about people." },
          {
            kind: "points",
            items: [
              {
                label: "Administrative uses can be approved",
                text: "for example:",
                sub: [
                  "drafting a job advertisement from approved content",
                  "drafting interview invitations that a person checks and sends",
                ],
              },
              {
                label: "Evaluative uses are outside this starting point",
                text: "for example:",
                sub: [
                  "ranking, scoring, screening or shortlisting candidates",
                  "assessing performance",
                  "recommending decisions on pay, discipline or dismissal",
                ],
              },
            ],
          },
          {
            kind: "paragraph",
            text: "This applies even if a person makes the final decision. Some jurisdictions have specific rules on automated decisions about people, so treat any such use as a separate project with legal and technical input.",
          },
        ],
      },
      {
        heading: "When something goes wrong",
        blocks: [
          {
            kind: "paragraph",
            text: "Mistakes follow a separate route. Examples include entering Prohibited or Restricted information, using an unapproved tool, or letting a tool take an unapproved action.",
          },
          { kind: "paragraph", text: "The employee:" },
          {
            kind: "points",
            ordered: true,
            items: [
              { text: "Stops further sharing." },
              { text: "Tells the policy owner promptly." },
              {
                text: "Does not delete history, change settings or close the account unless asked. Those steps can remove information needed to understand what happened.",
              },
            ],
          },
          { kind: "paragraph", text: "The policy owner:" },
          {
            kind: "points",
            ordered: true,
            items: [
              {
                label: "Contains the incident",
                text: "for example, suspends the tool's access to company systems.",
              },
              {
                label: "Records securely",
                text: "what was entered, when, through which account and who is affected.",
              },
              {
                label: "Takes technical and, where relevant, privacy advice",
                text: "before anything is deleted. Deleting visible history does not show that the provider has erased every copy.",
              },
              {
                label: "Decides on that advice",
                text: "whether anyone must be informed.",
              },
              {
                label: "Considers",
                text: "whether the rules, approved uses or training need to change.",
              },
            ],
          },
          {
            kind: "paragraph",
            text: "If credentials were entered, the technical reviewer also advises on changing them.",
          },
          {
            kind: "paragraph",
            text: "Say in the rules that prompt reporting is expected, and explain how reports will be handled.",
          },
        ],
      },
      {
        heading: "An illustrative acceptable-use statement",
        blocks: [
          {
            kind: "panel",
            title: "[Company] — Use of AI tools in company work",
            note: "Illustrative, standalone example. It restates the rules above in policy form so it can be read on its own. It is not a recommended policy for your company. Adapt roles, categories and intervals to your business, and obtain technical, privacy and qualified review before adopting it.",
            ordered: true,
            items: [
              {
                label: "Scope",
                text: "This statement applies to [employees, and to contractors whose engagement terms apply it] using AI tools for company work. This includes AI features within other software, browser extensions and personal accounts.",
              },
              {
                label: "Approved uses only",
                text: "Use AI for company work only within an entry in the approved-use register kept by [policy owner]. Each entry states the activity, tool and account, users, highest information category, any permitted tool actions, conditions and expiry date. You may work within an entry without further approval. Anything outside it needs approval first.",
              },
              {
                label: "Information",
                text: "Information is Public, Internal, Restricted or Prohibited.",
                sub: [
                  "Public means published and neither personal nor held in confidence.",
                  "Restricted includes personal information (even if publicly available), information received in confidence, payment details, unannounced bids and pricing, and legal matters.",
                  "Prohibited means passwords, authentication codes, tokens and keys.",
                  "Never enter Prohibited information.",
                  "Use other information only up to the category, and for Restricted information only the types, named in the entry.",
                  "Mixed content takes the most restrictive category.",
                  "Reclassify anything left after removing passages.",
                ],
              },
              {
                label: "Tool actions",
                text: "AI tools may draft, summarise or suggest. They may not send, schedule, change records or access other systems unless the entry explicitly approves that action.",
              },
              {
                label: "Approval",
                text: "Requests go to [policy owner].",
                sub: [
                  "Every request receives technical review.",
                  "Requests involving personal or confidential information also receive contractual and privacy review.",
                  "[Policy owner] approves uses up to Internal. [Owner/general manager] decides uses involving Restricted information.",
                  "No approval may permit what a law, contract or client instruction prohibits.",
                ],
              },
              {
                label: "Lapse",
                text: "Permission ends at the expiry date, or when a condition is no longer met.",
                sub: [
                  "Stop the use and tell [policy owner] about any change you become aware of.",
                  "[Policy owner] manages renewal or removal of access.",
                ],
              },
              {
                label: "Checking output",
                text: "Check output before relying on it. Output that leaves the company, or supports a financial or contractual decision, must be reviewed first by the person accountable for that work, who is responsible for its content.",
              },
              {
                label: "People decisions",
                text: "AI tools must not be used to rank, score, screen, shortlist or otherwise evaluate candidates or employees, or to recommend decisions about them. This applies even if a person makes the final decision.",
              },
              {
                label: "Client requirements",
                text: "Client contract terms or instructions on AI use also apply. Where they are stricter, they take precedence.",
              },
              {
                label: "Mistakes",
                text: "Stop further sharing and tell [policy owner] promptly.",
                sub: ["Do not delete history, change settings or close accounts unless asked."],
              },
              {
                label: "Review",
                text: "[Policy owner] reviews this statement, the inventory and the register every [interval], and after any significant incident or new tool. Changes are approved by [owner/general manager].",
              },
            ],
          },
        ],
      },
      {
        heading: "Three worked examples",
        note: "These concern a fictional company. They illustrate the rules and do not describe a Darwish & Co. client or engagement.",
        blocks: [
          { kind: "paragraph", text: "A social media post. The register has one entry:" },
          {
            kind: "points",
            items: [
              { label: "Activity", text: "drafting marketing content." },
              { label: "Tool and account", text: "a company-managed AI assistant account." },
              { label: "Who", text: "the marketing team." },
              { label: "Information", text: "up to Internal." },
              { label: "Tool actions", text: "none." },
              { label: "Validity", text: "expiry date not yet reached, conditions met." },
            ],
          },
          {
            kind: "paragraph",
            text: "A marketing coordinator drafts a post from product details already on the company website. The checks run in order:",
          },
          {
            kind: "points",
            ordered: true,
            items: [
              { label: "Activity", text: "drafting marketing content, which the entry covers." },
              { label: "Tool and account", text: "the listed company account." },
              { label: "Information", text: "Public, which is within Internal." },
              { label: "Approval", text: "still valid." },
              {
                label: "Actions",
                text: "the assistant offers to publish directly through a connected social account. The entry approves no actions, so she declines.",
              },
              {
                label: "Output review",
                text: "the post leaves the company, so the marketing lead reviews it before she publishes it herself.",
              },
            ],
          },
          { kind: "paragraph", text: "Result: permitted, as described." },
          {
            kind: "paragraph",
            text: "Meeting notes with a client's confidential plans. An account manager wants to use the same account to summarise notes that mix internal follow-up actions with a client's unannounced expansion plans, shared under a confidentiality agreement.",
          },
          {
            kind: "points",
            ordered: true,
            items: [
              {
                label: "Activity",
                text: "summarising client meeting notes. The only entry covers drafting marketing content, so this is not approved, and the check stops here.",
              },
              {
                label: "For completeness, the information also fails",
                text: "the notes are Restricted, beyond the entry's Internal limit.",
              },
            ],
          },
          { kind: "paragraph", text: "Removing the confidential passages would fix neither problem:" },
          {
            kind: "points",
            items: [
              { text: "The activity would still be unapproved." },
              {
                text: 'One remaining action — "prepare a quotation for the client\'s new site" — still reveals the plans.',
              },
            ],
          },
          {
            kind: "paragraph",
            text: "Result: the account manager writes the summary without AI. If such summaries are needed regularly, the policy owner can start a request for a specific use. That request needs technical review, the client relationship owner's check of the agreement, contractual and privacy review, and a decision by the role authorised for Restricted information.",
          },
          {
            kind: "paragraph",
            text: "CVs in a personal account. An HR assistant has pasted candidate CVs into a personal AI account to produce a shortlist.",
          },
          {
            kind: "points",
            ordered: true,
            items: [
              { label: "Activity", text: "shortlisting is evaluative, so it is outside the rules." },
              { label: "Tool and account", text: "a personal account is not in the register." },
              {
                label: "Information",
                text: "CVs contain personal information, which is Restricted.",
              },
            ],
          },
          { kind: "paragraph", text: "This is a mistake, so the incident route applies:" },
          {
            kind: "points",
            ordered: true,
            items: [
              {
                text: "The assistant stops, tells the policy owner as soon as she realises, and leaves the account as it is.",
              },
              { text: "The policy owner records what happened." },
              {
                text: "The policy owner takes technical and privacy advice before anything is deleted, and decides on that advice whether anyone must be informed.",
              },
              { text: "The HR manager shortlists without using the AI output." },
            ],
          },
          {
            kind: "paragraph",
            text: "Follow-up: the review then considers whether an administrative use, such as drafting interview invitations, should be approved. Screening remains outside scope.",
          },
        ],
      },
      {
        heading: "Keep it under review",
        blocks: [
          { kind: "paragraph", text: "At each review, the policy owner:" },
          {
            kind: "points",
            items: [
              { text: "Updates the inventory." },
              { text: "Checks each entry's settings, connections and expiry date." },
              { text: "Renews or removes entries." },
              { text: "Samples reviewed outputs." },
              { text: "Reports incidents and proposed changes for approval." },
            ],
          },
          {
            kind: "paragraph",
            text: "A signed acknowledgement shows that people received the rules, not that they follow them. The review is where you find out what actually happens.",
          },
        ],
      },
      {
        heading: "Where this fits",
        blocks: [
          { kind: "paragraph", text: "These rules give you a defined starting point:" },
          {
            kind: "points",
            items: [
              { text: "You know how AI is used." },
              { text: "You know who is responsible." },
              {
                text: "You know which uses are approved, with what information and what actions.",
              },
              { text: "You know who checks the results." },
              { text: "You know what is out of scope." },
            ],
          },
          {
            kind: "paragraph",
            text: "They are not an AI management system. ISO/IEC 42001:2023 specifies requirements for establishing, implementing, maintaining and continually improving an AI management system. It is intended for organisations that develop, provide or use AI-based products or services ([ISO](https://www.iso.org/standard/42001)). The rules above can feed into such a system. Adopting them does not amount to conformity with the standard or to certification.",
          },
          {
            kind: "paragraph",
            text: "Plan a broader assessment, with technical and legal input, if you want AI to evaluate people, shape decisions about customers, act across your systems beyond narrowly approved actions, or form part of what you sell.",
          },
        ],
      },
    ],
  },
];

export const PUBLISHED_GUIDES = GUIDES.filter((guide) => guide.published);

/**
 * Reading time in whole minutes, counted from the guide's own text at 220 words
 * a minute — the usual rate for considered prose. Counted rather than typed in,
 * so it cannot drift away from the article after an edit.
 */
export function readingMinutes(guide: Guide): number {
  const text = [
    guide.title,
    guide.summary,
    ...(guide.intro ?? []),
    ...(guide.introPoints ?? []).flatMap((point) => [point.label ?? "", point.text]),
    ...(guide.introAfter ?? []),
    ...(guide.sections ?? []).flatMap((section) => [
      section.heading,
      section.note ?? "",
      ...(section.body ?? []),
      ...(section.points ?? []).flatMap((point) => [point.label ?? "", point.text]),
      ...(section.table ? [...section.table.headers, ...section.table.rows.flat()] : []),
      ...(section.after ?? []),
      ...(section.blocks ?? []).flatMap((block) => {
        if (block.kind === "paragraph" || block.kind === "note") return [block.text];
        if (block.kind === "points")
          return block.items.flatMap((item) => [item.label ?? "", item.text, ...(item.sub ?? [])]);
        if (block.kind === "table") return [...block.headers, ...block.rows.flat()];
        return [
          block.title ?? "",
          block.note ?? "",
          ...(block.intro ?? []),
          ...(block.items ?? []).flatMap((item) => [item.label ?? "", item.text, ...(item.sub ?? [])]),
        ];
      }),
    ]),
    ...(guide.faqs ?? []).flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");

  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function getGuide(slug: string): Guide | undefined {
  return PUBLISHED_GUIDES.find((guide) => guide.slug === slug);
}

/** The published hub, if there is one. */
export function hubGuide(): Guide | undefined {
  return PUBLISHED_GUIDES.find((guide) => guide.kind === "hub");
}

/** Published spokes belonging to a hub. */
export function spokesOf(hubSlug: string): Guide[] {
  return PUBLISHED_GUIDES.filter((guide) => guide.kind === "spoke" && guide.hub === hubSlug);
}

/** Published guides that point at a service page. */
export function guidesForService(serviceSlug: string): Guide[] {
  return PUBLISHED_GUIDES.filter((guide) => guide.relatedService === serviceSlug);
}

/**
 * True once there is more than one published guide, at which point `/guides`
 * earns an index page and the menu can say "Guides" rather than naming one.
 */
export function guidesIndexIsWorthHaving(): boolean {
  return PUBLISHED_GUIDES.length > 1;
}

/**
 * A guide and the topic pages inside it — the shape the library cards, the
 * contents list and the guide navigation are all built from, so adding a guide
 * or a topic page is a data change rather than a layout change.
 */
export type GuideGroup = {
  hub: Guide;
  topics: Guide[];
};

/**
 * Every published guide, each with its topic pages. A spoke whose hub is not
 * published yet stands as its own group, so it is still reachable and still
 * described honestly — as a guide of one page, not as part of something that
 * does not exist.
 */
export function guideGroups(): GuideGroup[] {
  const hubs = PUBLISHED_GUIDES.filter((guide) => guide.kind === "hub");
  const grouped = hubs.map((hub) => ({ hub, topics: spokesOf(hub.slug) }));

  const orphans = PUBLISHED_GUIDES.filter(
    (guide) =>
      guide.kind === "spoke" && !hubs.some((hub) => hub.slug === guide.hub),
  ).map((guide) => ({ hub: guide, topics: [] as Guide[] }));

  return [...grouped, ...orphans];
}

/** The group a guide belongs to, whether it is the hub or one of its topics. */
export function groupOf(slug: string): GuideGroup | undefined {
  return guideGroups().find(
    (group) => group.hub.slug === slug || group.topics.some((topic) => topic.slug === slug),
  );
}

/** The guide's own name, for cards, navigation and breadcrumbs. */
export function guideName(guide: Guide): string {
  return guide.shortTitle ?? guide.navLabel;
}
