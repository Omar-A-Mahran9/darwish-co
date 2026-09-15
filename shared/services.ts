/**
 * The consulting services, one entry per page under /services.
 *
 * Structure follows docs/positioning.md (v3): three pillars, governance leading.
 * This is the single source for the services hub, each service page, the
 * navigation and footer, the sitemap, and the metadata in shared/seo.ts.
 *
 * A service with `published: false` is written but not listed, routed, or put in
 * the sitemap — v3 requires a named delivery lead, a defined scope, a sample
 * output and relevant experience before a service goes live.
 *
 * Newly drafted wording is listed in docs/services-copy-review.md for the client
 * to confirm or correct.
 */

/** Visual accent, mapped to concrete classes in the page components. */
export type ServiceAccent = "primary" | "teal" | "amber" | "blue" | "emerald";

/** The three pillars of the service structure. */
export type ServicePillar = "governance" | "strategy-organisation" | "growth";

export const PILLARS: Record<ServicePillar, { name: string; description: string }> = {
  governance: {
    name: "Governance",
    description:
      "The structures that let a company show how decisions are made, what its risks are, and that its obligations are met.",
  },
  "strategy-organisation": {
    name: "Strategy & Organisation",
    description:
      "What turns governance into performance: a strategy the organisation runs monthly, and a structure that holds as it grows.",
  },
  growth: {
    name: "Growth",
    description:
      "Entering a new market on evidence rather than assumption, with the governance prerequisites handled first.",
  },
};

export type ServiceOffering = {
  title: string;
  description: string;
  /** lucide-react icon name, resolved in the page component. */
  icon: string;
  /** Optional grouping heading, used where a service has many offerings. */
  group?: string;
  /** Set where this component is delivered by the partner rather than by us. */
  byPartner?: boolean;
};

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: string;
  pillar: ServicePillar;
  /**
   * False until the service passes the four-part test in docs/positioning.md §4:
   * named delivery lead, defined scope, sample output, relevant experience.
   */
  published: boolean;
  /** Page heading. */
  name: string;
  /** Short label for menus and cards. */
  navLabel: string;
  /** One line under the heading: the promise, in plain words. */
  tagline: string;
  /** Two or three sentences that open the page and answer "what is this". */
  intro: string;
  metaTitle: string;
  metaDescription: string;
  accent: ServiceAccent;
  icon: string;
  /** Set when the service is delivered with a partner firm. */
  partner?: { name: string; url: string; note: string; accountability: string };
  /** Figures a partner publishes about its own capability. */
  stats?: { value: string; label: string }[];
  offerings: ServiceOffering[];
  /** "Is this you?" — the situations in the owner's own words. */
  isThisYou: string[];
  whatYouGet: string[];
  howItWorks: { title: string; description: string }[];
  /** Only standards genuinely applied in the work. */
  standards?: { name: string; note: string }[];
  faqs: ServiceFaq[];
};

const ENGAGEMENT_STEPS = (subject: string) => [
  {
    title: "Scoping conversation",
    description:
      "A first discussion to understand your organisation, what has prompted the work, and what a good outcome looks like. No cost and no obligation.",
  },
  {
    title: "Assessment",
    description: `We review ${subject} as they stand today, against the standards and practices the work will be measured by, and agree the priorities with you.`,
  },
  {
    title: "Design and build",
    description:
      "We produce the frameworks, documents and systems agreed in the scope, working with your team rather than in isolation so the result fits how you actually operate.",
  },
  {
    title: "Handover and support",
    description:
      "We train the people who will own the work, hand over the documentation, and stay available for review as it beds in.",
  },
];

export const SERVICES: Service[] = [
  // ══════════════════════════════════════════════════════════════ GOVERNANCE ══
  {
    slug: "corporate-family-governance",
    pillar: "governance",
    published: true,
    name: "Corporate & Family Governance",
    navLabel: "Corporate & Family Governance",
    tagline: "Clear decision rights, so the company no longer waits on one person.",
    intro:
      "In most owner-led companies, authority was never written down — it accumulated. That works until the volume of decisions outgrows the person making them, or until someone outside asks how the company is actually governed. This work sets out who decides what, within which limits, and on what record.",
    metaTitle: "Corporate & Family Governance for Owner-Led SMEs | Darwish & Co",
    metaDescription:
      "Decision rights, delegation of authority, board and committee structures and family governance for owner-led SMEs in Egypt and the MENA region.",
    accent: "primary",
    icon: "Scale",
    offerings: [
      {
        title: "Governance framework development",
        description:
          "Establishing clear and effective governance structures: defining roles and responsibilities, establishing board and committee charters, and developing the policies and procedures that sit under them.",
        icon: "Scale",
      },
      {
        title: "Delegation of authority",
        description:
          "A written matrix setting out which decisions sit with the owner, the board, management and below — with financial limits, and the approval route for each. The artefact that makes delegation real rather than intended.",
        icon: "CheckCircle",
      },
      {
        title: "Board and committee design",
        description:
          "Structure, composition and meeting rhythm for a board or advisory board, with the charters that define what it decides and what it only reviews.",
        icon: "Users",
      },
      {
        title: "Family governance",
        description:
          "Separating family, ownership and management roles: how family members hold positions, how decisions involving the family are taken, and how that is recorded.",
        icon: "Handshake",
      },
      {
        title: "Governance for investors and lenders",
        description:
          "Preparing the governance evidence an investor or bank asks for in due diligence — structure, decision records, policies and controls — assembled as a pack rather than gathered under pressure.",
        icon: "FileText",
      },
    ],
    isThisYou: [
      "You sign everything, and decisions wait for you when you travel",
      "Family members hold roles, but their authority has never been defined",
      "An investor or a bank has asked about your board and how decisions are recorded",
      "You are preparing for the next generation, or for a professional CEO",
    ],
    whatYouGet: [
      "A governance structure document: who decides what, within which limits, and who is accountable",
      "A delegation of authority matrix, with the approval route for each decision type",
      "Board or committee charters, and the policies and procedures beneath them",
      "A governance pack you can hand to an investor, lender or major client",
    ],
    howItWorks: ENGAGEMENT_STEPS("your decision rights, governance structure and records"),
    faqs: [
      {
        question: "We are a small company. Do we really need formal governance?",
        answer:
          "Formal is not the same as heavy. A small company needs to be able to show who is authorised to commit it, how significant decisions are recorded, and what its main risks are. That can be a short set of documents. The cost of not having them appears when a client, investor or regulator asks and there is nothing to show.",
      },
      {
        question: "Does this mean giving up control?",
        answer:
          "The opposite of delegation is not control; it is being the bottleneck. A delegation of authority matrix defines what others may decide and up to what limit, which means the owner keeps the decisions that matter and stops being asked about the ones that do not. Control becomes explicit rather than personal.",
      },
      {
        question: "Do we need an actual board of directors?",
        answer:
          "Not necessarily, and not immediately. Some companies are better served by an advisory board with no statutory authority, which is easier to form and to change. What matters first is that decision rights are defined; the forum that exercises them follows from that.",
      },
    ],
  },

  {
    slug: "risk-compliance-integrity",
    pillar: "governance",
    published: true,
    name: "Risk, Compliance & Integrity",
    navLabel: "Risk, Compliance & Integrity",
    tagline: "Evidence that your company can be trusted by clients, regulators and investors.",
    intro:
      "Compliance is judged on what you can demonstrate, not on what you intended. When a multinational client sends a questionnaire, or a partner asks about anti-bribery controls, the answer has to be a document, a procedure and a record. This work builds them, and the anti-bribery elements are delivered with our partner VisionEthics.",
    metaTitle: "Risk, Compliance & Integrity — Anti-Bribery & ISO 37001 | Darwish & Co",
    metaDescription:
      "Risk management, anti-bribery programmes, third-party due diligence and compliance controls for SMEs, with ISO 37001 support delivered with VisionEthics.",
    accent: "blue",
    icon: "ShieldCheck",
    partner: {
      name: "VisionEthics",
      url: "https://visionethics.com",
      note: "The anti-bribery and integrity components are delivered in partnership with VisionEthics (Malaysia) — specialists in governance, integrity, and corruption prevention across public and private sectors.",
      accountability:
        "Darwish & Co. contracts with you, scopes the engagement and is your point of contact throughout. The anti-bribery management system, ISO 37001 support, integrity assessment and the ETIKALY platform are VisionEthics' capability and are delivered by their specialists. Components marked below are theirs; the rest are ours.",
    },
    offerings: [
      {
        group: "Risk and compliance",
        title: "Enterprise risk assessment",
        description:
          "Comprehensive risk assessment and the development of a risk management framework, with mitigation strategies tailored to your industry. Produces a risk register with owners, assessed likelihood and impact.",
        icon: "Shield",
      },
      {
        group: "Risk and compliance",
        title: "Compliance as a service",
        description:
          "Ongoing compliance support to ensure adherence to relevant laws, regulations and industry standards, including regulatory monitoring, compliance training and policy management.",
        icon: "CheckCircle",
      },
      {
        group: "Risk and compliance",
        title: "Responding to client compliance questionnaires",
        description:
          "Working through the compliance questionnaire a major client or Gulf partner has sent you: what each question is really asking, what evidence satisfies it, and what has to be built before you can answer honestly.",
        icon: "FileText",
      },
      {
        group: "Anti-bribery and integrity",
        title: "Corruption Risk Management (CRM)",
        description:
          "Identifies areas of potential corruption risk and develops targeted preventative measures. Based on international risk management principles and adaptable into Enterprise Risk Management (ERM) frameworks. Covers consultation, risk profiling, action plans, and continuous dashboard reporting.",
        icon: "ShieldCheck",
        byPartner: true,
      },
      {
        group: "Anti-bribery and integrity",
        title: "Anti-bribery management system — ISO 37001 readiness and implementation",
        description:
          "Gap assessment against ISO 37001:2025 and implementation of the management system: bribery risk assessment, leadership responsibilities, HR practices, due diligence, anti-corruption policies, financial controls, supply chain integrity, whistle-blowing, and monitoring. Certification itself is carried out by an accredited certification body, not by us and not by ISO.",
        icon: "ShieldCheck",
        byPartner: true,
      },
      {
        group: "Anti-bribery and integrity",
        title: "Adequate procedures and gap analysis",
        description:
          "Assessment of existing anti-corruption controls against internationally recognised adequate procedures guidance. Identifies weaknesses, prioritises remediation, and provides a roadmap to compliance.",
        icon: "Search",
        byPartner: true,
      },
      {
        group: "Anti-bribery and integrity",
        title: "Anti-corruption policies, monitoring and evaluation",
        description:
          "Development, review and monitoring of anti-corruption policies and procedures. Covers gifts and hospitality, donations and sponsorship controls, conflict of interest declarations, and whistle-blowing procedures, with ongoing evaluation that they remain effective.",
        icon: "FileText",
        byPartner: true,
      },
      {
        group: "Anti-bribery and integrity",
        title: "Third-party due diligence",
        description:
          "A vetting procedure for agents, distributors and suppliers, with risk-tiered checklists — the exposure that most often sits outside the company but is still attributed to it.",
        icon: "Search",
        byPartner: true,
      },
      {
        group: "Anti-bribery and integrity",
        title: "Integrity Assessment Advisory (IAA)",
        description:
          "Independent assessment of integrity culture, governance practices and anti-corruption controls, with recommendations that let a board demonstrate its commitment to ethical governance.",
        icon: "Search",
        byPartner: true,
      },
      {
        group: "Anti-bribery and integrity",
        title: "Effectiveness indicators assessment",
        description:
          "Measurement of how well an anti-corruption compliance programme actually works, using defined indicators, producing evidence-based reporting for boards, regulators and stakeholders.",
        icon: "BarChart3",
        byPartner: true,
      },
      {
        group: "Training and technology",
        title: "Interactive training with prosecutors' perspectives",
        description:
          "Practical, interactive workshops on anti-corruption, integrity and compliance, using real case studies and lessons from prosecutors' perspectives. Designed for boards, management, compliance officers and employees.",
        icon: "BookOpen",
        byPartner: true,
      },
      {
        group: "Training and technology",
        title: "E-learning portal",
        description:
          "A digital learning platform for anti-corruption and integrity training, making compliance training scalable and trackable across a large workforce.",
        icon: "BookOpen",
        byPartner: true,
      },
      {
        group: "Training and technology",
        title: "Compliance technology — CICF and ETIKALY",
        description:
          "The Corporate Integrity Compliance Framework, a GRC tool for compliance teams and internal audit, and ETIKALY, VisionEthics' compliance intelligence and reporting platform. Both provide dashboard reporting for boards and senior management.",
        icon: "Cpu",
        byPartner: true,
      },
    ],
    isThisYou: [
      "A multinational or Gulf client has sent you a compliance questionnaire",
      "Someone has asked whether you hold ISO 37001, or intend to",
      "You rely on agents or distributors you have never formally vetted",
      "Staff have no way to raise a concern other than telling their manager",
    ],
    whatYouGet: [
      "A risk register with owners, assessed likelihood and impact, and agreed mitigations",
      "An anti-bribery policy set: gifts and hospitality, conflicts of interest, donations and sponsorship",
      "A third-party due diligence procedure with risk-tiered checklists",
      "A speak-up route and a case procedure behind it",
      "The evidence pack a client questionnaire or an investor asks to see",
    ],
    standards: [
      {
        name: "ISO 37001:2025",
        note: "The international standard for anti-bribery management systems. We support readiness and implementation; certification is granted by an accredited certification body.",
      },
      {
        name: "ISO 31000",
        note: "Risk management principles and guidelines, used as the frame for risk assessment work.",
      },
      {
        name: "OECD anti-corruption guidance",
        note: "Referenced where adequate procedures and third-party controls are being designed.",
      },
    ],
    howItWorks: ENGAGEMENT_STEPS("your risk exposure, existing controls and compliance evidence"),
    faqs: [
      {
        question: "What is ISO 37001, and do we need to be certified?",
        answer:
          "ISO 37001 is the international standard for anti-bribery management systems, currently in its 2025 edition. It sets requirements across risk assessment, leadership responsibility, due diligence, financial and commercial controls, whistle-blowing and monitoring. There are three different things you can buy: readiness (a gap assessment against the standard), implementation (building the management system), and certification (an independent audit). Certification is granted by an accredited certification body — not by us, and not by ISO, which writes standards but does not certify organisations. Many companies implement the standard without certifying, because their client wanted the controls rather than the certificate. Establish which you are being asked for before spending.",
      },
      {
        question: "Who delivers the anti-bribery work?",
        answer:
          "Darwish & Co. contracts with you and manages the engagement. The anti-bribery management system, ISO 37001 support, integrity assessment and the ETIKALY platform are delivered by VisionEthics, our partner firm, whose specialists carry that capability. Each component on this page is marked so you can see which is which.",
      },
      {
        question: "A client sent us a compliance questionnaire. Where do we start?",
        answer:
          "Start by separating the questions you can already evidence from those you cannot. Most questionnaires ask for a policy, a procedure, a record and a named responsible person. The gap is usually documentation rather than practice — companies often already behave correctly without having written it down. Answer honestly about what exists today; a questionnaire answered falsely is a worse exposure than one answered with a remediation date.",
      },
    ],
  },

  {
    slug: "ai-governance",
    pillar: "governance",
    // Not live: docs/positioning.md §4 requires a named delivery lead first (assumption A5).
    published: false,
    name: "AI Governance",
    navLabel: "AI Governance",
    tagline: "Use AI with rules your board, your clients and your staff can rely on.",
    intro:
      "Staff in most companies are already using AI tools on company information, usually without a rule saying whether they may. This work establishes what is being used, who is responsible for it, what staff may and may not do, and where a human has to review a decision before it takes effect.",
    metaTitle: "AI Governance for SMEs — Policy, Oversight & Vendor Review | Darwish & Co",
    metaDescription:
      "AI use policies, risk assessment, human oversight controls and vendor evaluation for SMEs adopting AI across Egypt and the MENA region.",
    accent: "teal",
    icon: "Cpu",
    offerings: [
      {
        title: "AI use inventory and risk assessment",
        description:
          "Establishing what AI tools are actually in use across the business, what information goes into them, and rating each use by the impact of it going wrong.",
        icon: "Search",
      },
      {
        title: "Acceptable-use policy",
        description:
          "A staff policy and a short quick-guide covering what may be put into an AI tool, what may not, and what has to be checked before output is used or sent.",
        icon: "FileText",
      },
      {
        title: "Human oversight controls",
        description:
          "Defining which decisions require human review before they take effect, who performs that review, and how it is recorded — applied to the decisions your business actually makes.",
        icon: "CheckCircle",
      },
      {
        title: "Vendor and procurement evaluation",
        description:
          "The questions to ask before buying a tool that makes or supports decisions: what the vendor does with your data, how the system was evaluated, and what happens when it is wrong.",
        icon: "Shield",
      },
      {
        title: "Leadership briefing",
        description:
          "A short executive session on what AI governance requires of a board, and what it does not.",
        icon: "BookOpen",
      },
    ],
    isThisYou: [
      "Staff are already using ChatGPT or Copilot, sometimes with client information",
      "You are buying a tool that will make or support decisions about people or money",
      "A client has asked how you control your use of AI",
      "Nobody in the company owns the question of what is permitted",
    ],
    whatYouGet: [
      "A register of AI uses across the business, rated by impact",
      "An acceptable-use policy and a one-page staff guide",
      "A defined human-review requirement for the decisions that need one",
      "A procurement checklist to use before the next tool is bought",
    ],
    standards: [
      {
        name: "ISO/IEC 42001",
        note: "The international standard for AI management systems. It addresses a broader management system than a use policy alone; work here is positioned in relation to it, not as a substitute for it.",
      },
    ],
    howItWorks: ENGAGEMENT_STEPS("the AI tools in use, who owns them, and what they touch"),
    faqs: [
      {
        question: "Our staff already use these tools. Is it too late to set rules?",
        answer:
          "No, and that is the normal starting position. The first step is an inventory of what is genuinely in use, which is usually more than leadership expects. Rules written without that inventory tend to ban things people will keep doing quietly.",
      },
      {
        question: "Does Egypt regulate AI?",
        answer:
          "This answer is pending qualified review before publication. Any statement this page makes about Egyptian or Gulf regulation will carry a named reviewer and a date.",
      },
      {
        question: "Is a policy enough?",
        answer:
          "A policy sets expectations; it does not create oversight. The part that changes outcomes is deciding which decisions require a human review before they take effect, and recording that the review happened. ISO/IEC 42001 describes a fuller management system for organisations that need to go further.",
      },
    ],
  },

  // ═══════════════════════════════════════════════ STRATEGY & ORGANISATION ══
  {
    slug: "strategy-execution",
    pillar: "strategy-organisation",
    published: true,
    name: "Strategy & Execution",
    navLabel: "Strategy & Execution",
    tagline: "A strategy the organisation actually runs every month.",
    intro:
      "Most SMEs have a strategy. Fewer have a way of telling, month to month, whether it is working. This work builds the layer between the two: objectives with named owners, measures that reflect them, and a review rhythm where decisions actually get taken.",
    metaTitle: "Strategy & Execution — Decision Rights, KPIs & Reviews | Darwish & Co",
    metaDescription:
      "Growth strategy turned into clear responsibilities, measures and monthly management reviews for SMEs in Egypt and the MENA region.",
    accent: "primary",
    icon: "Target",
    offerings: [
      {
        title: "Strategy diagnostic",
        description:
          "An assessment of why the plan is not translating into results: where objectives lose their owner, where measures do not reflect them, and where the review process fails to change anything.",
        icon: "Search",
      },
      {
        title: "Strategic plan with scenarios",
        description:
          "A multi-year plan built with scenario ranges rather than a single forecast — relevant where currency and cost volatility can invalidate a budget mid-year.",
        icon: "Scale",
      },
      {
        title: "KPI and OKR cascade",
        description:
          "Objectives translated from company level to team level, each measure with an owner, a source and a reporting frequency. Balanced scorecard or OKR, chosen to fit how the company is run.",
        icon: "BarChart3",
      },
      {
        title: "Management review rhythm",
        description:
          "The design of the monthly and quarterly review: who attends, what is tabled, and what decisions that meeting is empowered to make.",
        icon: "Users",
      },
      {
        title: "Performance dashboards",
        description:
          "Reporting your leadership team can read without it being explained, built on the data the business already holds wherever possible.",
        icon: "Database",
      },
    ],
    isThisYou: [
      "The plan exists as a slide deck and nothing since has referred to it",
      "KPIs exist, but no individual owns any of them",
      "Priorities change every quarter and nothing finishes",
      "Currency or cost volatility made last year's budget meaningless by mid-year",
    ],
    whatYouGet: [
      "An objectives map connecting the strategy to the people responsible for each part",
      "A defined set of measures, each with an owner, a source and a reporting frequency",
      "A dashboard your leadership team can read unaided",
      "A review routine: who meets, how often, and what that meeting decides",
    ],
    howItWorks: ENGAGEMENT_STEPS("your objectives, measures, ownership and review process"),
    faqs: [
      {
        question: "What is the difference between a balanced scorecard and OKRs?",
        answer:
          "A balanced scorecard organises performance across several perspectives — usually financial, customer, internal process, and learning and growth — so that one is not improved at the cost of another. OKRs set a small number of objectives with measurable key results over a short cycle, normally a quarter. Scorecards suit organisations that need a stable, complete picture; OKRs suit those that need focus and pace. They can be used together, with the scorecard as the standing frame and OKRs driving current priorities.",
      },
      {
        question: "Why do our strategic plans keep failing in execution?",
        answer:
          "In most cases the plan was never converted into decision rights. An objective without a named owner, a measure they control and a meeting where they answer for it is a statement of intent. The diagnostic starts by tracing a few objectives from the plan to the person who is supposed to deliver them, which usually locates the break quickly.",
      },
      {
        question: "Do we need new software?",
        answer:
          "Not necessarily. Many organisations already hold the data across their accounting, HR and operational systems, and the gap is in definition and reporting rather than tooling. Where a dashboard is needed, we build on what you have before proposing anything new.",
      },
    ],
  },

  {
    slug: "people-organisation",
    pillar: "strategy-organisation",
    published: true,
    name: "People & Organisation",
    navLabel: "People & Organisation",
    tagline: "A structure and people system that holds as the company grows past 100.",
    intro:
      "Growth exposes the parts of an organisation that were never designed — reporting lines that formed by accident, titles that mean different things in different departments, and policies that exist only in people's heads. This work puts a deliberate structure in place and keeps it compliant with the labour obligations that apply to you.",
    metaTitle: "People & Organisation — Structure, Roles & Succession | Darwish & Co",
    metaDescription:
      "Organisational structure, role clarity, performance management and succession planning for growing SMEs across Egypt and the MENA region.",
    accent: "teal",
    icon: "Users",
    offerings: [
      {
        title: "Organisation design",
        description:
          "Structure, spans and layers, and role profiles — aligning how the company is organised with what it is trying to do, including workforce planning and change management.",
        icon: "BarChart3",
      },
      {
        title: "Job architecture and grading",
        description:
          "Job families and a grade structure, so that titles mean the same thing across departments and pay decisions have a frame.",
        icon: "Scale",
      },
      {
        title: "Talent acquisition",
        description:
          "A recruitment process you can run repeatedly: role profiles, assessment criteria, interview structure and onboarding.",
        icon: "Users",
      },
      {
        title: "Performance management",
        description:
          "Objectives, a review cycle and calibration — with training for the managers who have to run it, which is usually the part that decides whether it works.",
        icon: "CheckCircle",
      },
      {
        title: "Succession for critical roles",
        description:
          "Identifying the roles the company cannot afford to lose, and the development plans that make someone ready to take them.",
        icon: "TrendingUp",
      },
      {
        title: "HR policy and compliance",
        description:
          "An employee handbook and the HR policies behind it, reflecting the labour obligations that apply to your business, with employee relations advice where needed.",
        icon: "FileText",
      },
    ],
    isThisYou: [
      "Roles overlap, and titles mean different things in different departments",
      "Performance reviews happen, but nothing follows from them",
      "Good people are leaving for Gulf salaries",
      "If a key manager left tomorrow, nobody is ready to replace them",
    ],
    whatYouGet: [
      "An organisation chart with defined roles, reporting lines and decision rights",
      "A job architecture and grade structure",
      "A recruitment process with role profiles and assessment criteria",
      "A performance cycle your managers are trained to run",
      "A succession map for critical roles, with development plans",
      "An employee handbook and the HR policies behind it",
    ],
    howItWorks: ENGAGEMENT_STEPS("your structure, roles, HR policies and people processes"),
    faqs: [
      {
        question: "Do you recruit on our behalf?",
        answer:
          "The focus is on building the process — role definition, assessment criteria, interview structure and onboarding — so your team can hire consistently. Where you want support running a specific search, raise it during scoping and we will tell you plainly what we can and cannot take on.",
      },
      {
        question: "Can you advise on labour law?",
        answer:
          "We build HR policies and practices that reflect the labour obligations applying to your business, and flag where a matter needs a legal opinion. We are consultants, not a law firm, and we say so when a question has crossed that line.",
      },
      {
        question: "Our managers have never run performance reviews. Is that a problem?",
        answer:
          "It is the normal starting point, and it is why training the managers is part of the work rather than an addition to it. A review process only works if the people running it understand what it is for.",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════ GROWTH ══
  {
    slug: "growth-market-entry",
    pillar: "growth",
    published: true,
    name: "Growth & Market Entry",
    navLabel: "Growth & Market Entry",
    tagline: "Enter a new market with evidence, not assumptions.",
    intro:
      "Entering a market fails more often on preparation than on ambition. This work tests the assumption first — whether the demand is real, who the right partner is, and what governance and compliance the market expects before you arrive. Consumer and panel research is delivered with our partner In Light.",
    metaTitle: "Growth & Market Entry — Demand Validation & Expansion | Darwish & Co",
    metaDescription:
      "Market readiness, demand validation, partner selection and expansion planning for SMEs, with consumer research delivered with In Light Consumer Insights.",
    accent: "emerald",
    icon: "Globe2",
    partner: {
      name: "In Light Consumer Insights",
      url: "https://in-light.tech",
      note: "Consumer and panel research is delivered in partnership with In Light Consumer Insights — a proprietary MENA consumer panel with 10,500+ respondents and 405+ research projects delivered in 2025.",
      accountability:
        "Darwish & Co. scopes the study around the decision you face, and works with you on what the findings mean for the business. Fieldwork, the consumer panel and the research operation are In Light's. Components marked below are theirs.",
    },
    stats: [
      { value: "10,500+", label: "Panel respondents (In Light)" },
      { value: "405+", label: "Projects in 2025 (In Light)" },
      { value: "MENA", label: "Regional coverage" },
      { value: "Quantitative & Qualitative", label: "Research methods" },
    ],
    offerings: [
      {
        title: "Market-entry readiness assessment",
        description:
          "A go/no-go scorecard covering demand, competition, pricing context, entry requirements and the governance and compliance prerequisites the market expects of a supplier.",
        icon: "CheckCircle",
      },
      {
        title: "Demand validation",
        description:
          "Testing whether the demand you are assuming is real, through consumer panel surveys or qualitative sessions, designed around the decision rather than around the method.",
        icon: "Users",
        byPartner: true,
      },
      {
        title: "Brand health tracking",
        description:
          "Continuous tracking of awareness, perception, consideration and loyalty, benchmarked against competitors, so shifts in sentiment surface before they affect performance.",
        icon: "TrendingUp",
        byPartner: true,
      },
      {
        title: "Competitive intelligence",
        description:
          "Systematic analysis of competitor activity, positioning, pricing and product development, to sharpen strategy and identify where nobody is currently competing.",
        icon: "Search",
        byPartner: true,
      },
      {
        title: "Qualitative research — FGDs and IDIs",
        description:
          "Focus group discussions and in-depth interviews that explain the reasoning behind behaviour, and test concepts, pricing and messaging before launch.",
        icon: "MessageSquare",
        byPartner: true,
      },
      {
        title: "Partner and distributor selection",
        description:
          "A shortlist of candidate partners with the basis on which each was assessed — including the due diligence that Risk, Compliance & Integrity covers, since a distributor's conduct is attributed to you.",
        icon: "Handshake",
      },
      {
        title: "Entry roadmap",
        description:
          "A phased plan setting out route, sequence, cost, the governance and compliance prerequisites, and the risks that could stop it.",
        icon: "Globe2",
      },
    ],
    isThisYou: [
      "You are considering Saudi Arabia or the UAE and want the case tested before committing",
      "You are not certain the demand you are assuming is actually there",
      "You need a distributor or partner, not an office",
      "You hold research data you have never been able to turn into a decision",
    ],
    whatYouGet: [
      "A go/no-go readiness scorecard for the market in question",
      "Research findings from a designed study, stating what it can and cannot conclude",
      "A shortlist of candidate partners, each with the basis for its assessment",
      "A phased entry roadmap including the compliance prerequisites",
    ],
    howItWorks: [
      {
        title: "Define the decision",
        description:
          "We start from the decision the work has to support. That determines whether you need a readiness assessment, a panel survey, focus groups, or none of them.",
      },
      {
        title: "Design",
        description:
          "Scope, sample, questionnaire or discussion guide, and analysis plan are agreed in writing before fieldwork — including what the study will not be able to tell you.",
      },
      {
        title: "Evidence",
        description:
          "Fieldwork through In Light's consumer panel or qualitative sessions, and assessment of candidate partners where the work includes selection.",
      },
      {
        title: "Decision and roadmap",
        description:
          "Findings are presented against the original question, with a phased entry plan and the governance prerequisites for the market.",
      },
    ],
    faqs: [
      {
        question: "Which markets do you cover?",
        answer:
          "Egypt is where our own presence sits, and the Gulf — principally Saudi Arabia and the UAE — is the most common expansion question we are asked. Where a piece of work reaches beyond that, we say at the outset whether we are drawing on direct experience or on partner capability, so you know which you are buying.",
      },
      {
        question: "Who carries out the research?",
        answer:
          "In Light Consumer Insights, our research partner, using their proprietary MENA consumer panel. Darwish & Co. scopes the study with you, frames it around the decision you face, and works with you on what the findings mean for the business.",
      },
      {
        question: "What governance do Gulf clients and partners expect?",
        answer:
          "Larger buyers increasingly ask suppliers for the same evidence wherever they operate: an anti-bribery policy, third-party due diligence, a speak-up route and named responsibility for compliance. That is why entry readiness here includes the compliance prerequisites rather than treating them as a later problem.",
      },
    ],
  },
];

/** Services that are live on the site. */
export const PUBLISHED_SERVICES = SERVICES.filter((service) => service.published);

export const SERVICE_SLUGS = PUBLISHED_SERVICES.map((service) => service.slug);

export function getService(slug: string): Service | undefined {
  return PUBLISHED_SERVICES.find((service) => service.slug === slug);
}

export function servicesInPillar(pillar: ServicePillar): Service[] {
  return PUBLISHED_SERVICES.filter((service) => service.pillar === pillar);
}

/**
 * Addresses that existed before the v3 restructure, mapped to the page that
 * replaced them. Keys are paths; the server answers these with a 301 and the
 * hub handles the old `#anchor` form for links already in circulation.
 *
 * Digital Marketing was removed from the site entirely (positioning v3 §4), so
 * it points at the services hub rather than at a replacement that does not exist.
 */
export const SERVICE_REDIRECTS: Record<string, string> = {
  // Slugs from the first split, 16 Sep 2026
  "/services/strategy-performance": "/services/strategy-execution",
  "/services/governance-risk-compliance": "/services/risk-compliance-integrity",
  "/services/human-resources": "/services/people-organisation",
  "/services/business-development": "/services/growth-market-entry",
  "/services/market-research": "/services/growth-market-entry",
  "/services/integrity-anti-corruption": "/services/risk-compliance-integrity",
  "/services/digital-marketing": "/services",
};

/** Old single-page anchors (/services#grc) mapped to the page that replaced them. */
export const LEGACY_ANCHOR_REDIRECTS: Record<string, string> = {
  strategy: "/services/strategy-execution",
  grc: "/services/risk-compliance-integrity",
  hr: "/services/people-organisation",
  bizdev: "/services/growth-market-entry",
  "market-research": "/services/growth-market-entry",
  integrity: "/services/risk-compliance-integrity",
  "digital-marketing": "/services",
};
