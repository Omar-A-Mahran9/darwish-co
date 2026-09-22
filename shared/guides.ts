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

/** A point in a list, optionally led by a bold label. */
export type GuidePoint = { label?: string; text: string };

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
};

export type Guide = {
  slug: string;
  kind: GuideKind;
  published: boolean;
  /** Full title, used as the page heading. */
  title: string;
  /** Short label for menus, cards and breadcrumbs. */
  navLabel: string;
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
    published: false,
    title:
      "Governance for Growing SMEs: A Practical Guide for Owners in Egypt and the MENA Region",
    navLabel: "Governance Guide",
    metaTitle: "Governance for Growing SMEs — A Practical Guide | Darwish & Co",
    metaDescription:
      "What governance means for a company of 50–300 people in Egypt and the MENA region: who decides what, to which limit, and on what record.",
    summary:
      "What governance actually means at SME scale, the moments that make a company need it, and where to start.",
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
    published: false,
    hub: "governance-for-growing-smes",
    relatedService: "ai-governance",
    title: "Setting the Rules for Employee AI Use: A Governance Starting Point",
    navLabel: "Employee AI use",
    metaTitle: "Rules for Employee AI Use: A Governance Starting Point | Darwish & Co",
    metaDescription:
      "Staff are already using AI on company information. The three or four rules worth writing down first, and who approves the exceptions.",
    summary:
      "The few rules worth writing down first, while staff are already using these tools.",
    artefact: "A one-page acceptable use statement",
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
    ...(guide.sections ?? []).flatMap((section) => [
      section.heading,
      section.note ?? "",
      ...(section.body ?? []),
      ...(section.points ?? []).flatMap((point) => [point.label ?? "", point.text]),
      ...(section.table ? [...section.table.headers, ...section.table.rows.flat()] : []),
      ...(section.after ?? []),
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
