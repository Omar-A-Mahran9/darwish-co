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
  body: string[];
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
    published: false,
    hub: "governance-for-growing-smes",
    relatedService: "corporate-family-governance",
    title: "Delegation of Authority: How to Delegate Decisions Without Losing Oversight",
    navLabel: "Delegation of authority",
    metaTitle: "Delegation of Authority: Delegating Without Losing Oversight | Darwish & Co",
    metaDescription:
      "How to build a delegation of authority matrix: who decides what, to which financial limit, and on what record — so decisions stop routing to one signature.",
    summary:
      "How to stop every decision routing to one signature, without losing sight of any of them.",
    artefact: "A delegation of authority matrix",
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
          "Darwish & Co. is an Egypt-based governance and management consultancy for SMEs in the MENA region. For a business facing this situation, the relevant service area is Risk, Compliance & Integrity. A consultation can establish the challenge and whether the firm's available expertise fits the support required.",
        ],
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
