/**
 * The consulting services, one entry per page under /services.
 *
 * This is the single source for the services hub, each service page, the
 * navigation and footer, the sitemap, and the search and social metadata in
 * shared/seo.ts. Copy lives here so it can be edited without touching layout.
 *
 * Wording drawn from the previous single services page is kept as it was.
 * Newly drafted wording (whoItsFor, whatYouGet, howItWorks, faqs) is listed in
 * docs/services-copy-review.md for the client to confirm or correct.
 */

/** Visual accent, mapped to concrete classes in the page components. */
export type ServiceAccent = "primary" | "teal" | "amber" | "blue" | "emerald";

export type ServiceOffering = {
  title: string;
  description: string;
  /** lucide-react icon name, resolved in the page component. */
  icon: string;
  /** Optional grouping heading, used where a service has many offerings. */
  group?: string;
};

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: string;
  /** Page heading. */
  name: string;
  /** Short label for menus and cards. */
  navLabel: string;
  /** One line under the heading. */
  tagline: string;
  /** Two or three sentences that open the page and answer "what is this". */
  intro: string;
  metaTitle: string;
  metaDescription: string;
  accent: ServiceAccent;
  icon: string;
  /** Set when the service is delivered with a partner firm. */
  partner?: { name: string; url: string; note: string };
  /** Figures a partner publishes about its own capability. */
  stats?: { value: string; label: string }[];
  offerings: ServiceOffering[];
  whoItsFor: string[];
  whatYouGet: string[];
  howItWorks: { title: string; description: string }[];
  faqs: ServiceFaq[];
  /** Anchor on the old single services page, kept so old links still work. */
  legacyAnchor: string;
};

const ENGAGEMENT_STEPS = (subject: string) => [
  {
    title: "Scoping conversation",
    description: `A first discussion to understand your organisation, what has prompted the work, and what a good outcome looks like. No cost and no obligation.`,
  },
  {
    title: "Assessment",
    description: `We review ${subject} as they stand today, against the standards and practices the work will be measured by, and agree the priorities with you.`,
  },
  {
    title: "Design and build",
    description: `We produce the frameworks, documents and systems agreed in the scope, working with your team rather than in isolation so the result fits how you actually operate.`,
  },
  {
    title: "Handover and support",
    description: `We train the people who will own the work, hand over the documentation, and stay available for review as it beds in.`,
  },
];

export const SERVICES: Service[] = [
  // ───────────────────────────────────────────────────────────── strategy ──
  {
    slug: "strategy-performance",
    name: "Strategy & Performance Management",
    navLabel: "Strategy & Performance",
    tagline: "Turning strategy into measures your leadership team can act on.",
    intro:
      "Most SMEs have a strategy. Fewer have a way of telling, month to month, whether it is working. We build the measurement layer between the two: clear objectives, indicators that reflect them, and reporting that reaches leadership in time to change something.",
    metaTitle: "Strategy & Performance Management for SMEs | Darwish & Co",
    metaDescription:
      "Balanced scorecards, OKRs and performance dashboards that connect strategy to measurable results for SMEs in Egypt and the wider MENA region.",
    accent: "primary",
    icon: "Scale",
    legacyAnchor: "strategy",
    offerings: [
      {
        title: "Balanced Scorecard Implementation",
        description:
          "Design and deploy BSC frameworks that align strategic objectives with measurable KPIs across all organizational levels.",
        icon: "Scale",
      },
      {
        title: "OKR Framework Design",
        description:
          "Implement Objectives and Key Results methodology to drive focus, alignment, and accountability throughout your organization.",
        icon: "Target",
      },
      {
        title: "Performance Dashboard Systems",
        description:
          "Build real-time digital dashboards that give leadership instant visibility into business performance and strategic progress.",
        icon: "BarChart3",
      },
    ],
    whoItsFor: [
      "Businesses with a written strategy that is not reflected in how teams are measured day to day",
      "Leadership teams reviewing performance from figures that arrive too late, or that nobody agrees on",
      "Companies preparing for investment, where an investor will ask how performance is tracked",
      "Organisations that have grown past the point where the founder can hold the whole picture",
    ],
    whatYouGet: [
      "An objectives map that connects the strategy to the parts of the business responsible for it",
      "A defined set of indicators, each with an owner, a source and a reporting frequency",
      "A performance dashboard your leadership team can read without needing it explained",
      "A review routine — who meets, how often, and what decisions that meeting is allowed to make",
    ],
    howItWorks: ENGAGEMENT_STEPS("your current objectives, measures and reporting"),
    faqs: [
      {
        question: "What is the difference between a balanced scorecard and OKRs?",
        answer:
          "A balanced scorecard organises performance across several perspectives — usually financial, customer, internal process, and learning and growth — so that one is not improved at the cost of another. OKRs set a small number of objectives with measurable key results over a short cycle, normally a quarter. Scorecards suit organisations that need a stable, complete picture; OKRs suit those that need focus and pace. They can be used together, with the scorecard as the standing frame and OKRs driving the current priorities.",
      },
      {
        question: "Is this worth doing for a company of our size?",
        answer:
          "The work scales to the organisation. A company of thirty people does not need the reporting apparatus of a listed group; it needs a short set of measures its managers trust and use. The point at which it becomes worthwhile is usually when the leadership team can no longer see the whole business directly.",
      },
      {
        question: "Do we need new software?",
        answer:
          "Not necessarily. Many organisations already hold the data they need across their accounting, HR and operational systems, and the gap is in definition and reporting rather than tooling. Where a dashboard is needed, we build on what you have before proposing anything new.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────── grc ──
  {
    slug: "governance-risk-compliance",
    name: "Governance, Risk & Compliance",
    navLabel: "Governance & Risk (GRC)",
    tagline: "Protecting your business and ensuring sustainable operations.",
    intro:
      "Governance is what lets a business demonstrate that decisions are made properly, risks are known, and obligations are met. For an SME, that usually matters first when someone external asks: an investor, a major client, a lender or a regulator. We build the structures and evidence that answer them.",
    metaTitle: "Governance, Risk & Compliance Consulting for SMEs | Darwish & Co",
    metaDescription:
      "Governance frameworks, risk management and ongoing compliance support for SMEs in Egypt and MENA — built so you can evidence how decisions are made.",
    accent: "primary",
    icon: "Shield",
    legacyAnchor: "grc",
    offerings: [
      {
        title: "Governance Framework Development",
        description:
          "Assisting clients in establishing clear and effective governance structures, including defining roles and responsibilities, establishing board and committee charters, and developing policies and procedures.",
        icon: "Scale",
      },
      {
        title: "Risk Management Solutions",
        description:
          "Providing comprehensive risk assessments, developing and implementing risk management frameworks, and advising on risk mitigation strategies tailored to your industry.",
        icon: "Shield",
      },
      {
        title: "Compliance as a Service",
        description:
          "Offering ongoing compliance support to ensure clients adhere to relevant laws, regulations, and industry standards. This includes regulatory monitoring, compliance training, and policy management.",
        icon: "CheckCircle",
      },
    ],
    whoItsFor: [
      "SMEs asked by an investor, lender or corporate client to show a governance structure",
      "Founder-led businesses where authority and decision rights have never been written down",
      "Companies entering a regulated relationship or a tender that carries compliance conditions",
      "Boards that want an independent view of what could go wrong and what is being done about it",
    ],
    whatYouGet: [
      "A governance structure document: who decides what, within which limits, and who is accountable",
      "Board and committee charters, and the policies and procedures that sit under them",
      "A risk register with owners, assessed likelihood and impact, and agreed mitigations",
      "Ongoing compliance support where you want it maintained rather than handed over",
    ],
    howItWorks: ENGAGEMENT_STEPS("your governance structure, risk exposure and current controls"),
    faqs: [
      {
        question: "We are a small company. Do we really need formal governance?",
        answer:
          "Formal is not the same as heavy. A small company needs to be able to show who is authorised to commit it, how significant decisions are recorded, and what its main risks are. That can be a short set of documents. The cost of not having them appears when a client, investor or regulator asks and there is nothing to show.",
      },
      {
        question: "Which regulations does this cover?",
        answer:
          "The obligations that apply to your business depend on your sector, your markets and how you are structured, so the scope is set during the assessment rather than assumed. Where a specialist legal opinion is required, we say so and work alongside your legal advisers rather than substituting for them.",
      },
      {
        question: "How is this different from an audit?",
        answer:
          "An audit examines what happened and reports on it. This work builds the structures and controls that determine what happens next, and prepares the evidence an auditor or a counterparty will later look for.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────── hr ──
  {
    slug: "human-resources",
    name: "Human Resources Consulting",
    navLabel: "Human Resources",
    tagline: "Empowering your workforce to drive business success.",
    intro:
      "Growth exposes the parts of an organisation that were never designed — reporting lines that formed by accident, hiring done under pressure, and policies that exist in people's heads. We help SMEs put a deliberate structure in place, and keep it compliant with the labour obligations that apply to them.",
    metaTitle: "HR Consulting for SMEs — Structure, Talent & Compliance | Darwish & Co",
    metaDescription:
      "HR strategy, organisational design, talent acquisition and HR compliance for growing SMEs across Egypt and the MENA region.",
    accent: "teal",
    icon: "Users",
    legacyAnchor: "hr",
    offerings: [
      {
        title: "HR Strategy and Planning",
        description:
          "Aligning HR strategies with business objectives, including workforce planning, organizational design, and change management to support your growth.",
        icon: "BarChart3",
      },
      {
        title: "Talent Acquisition & Management",
        description:
          "Supporting clients in attracting, recruiting, and retaining top talent. This includes developing recruitment processes, implementing performance management systems, and creating employee development programs.",
        icon: "Users",
      },
      {
        title: "HR Compliance & Policy",
        description:
          "Ensuring clients are compliant with labor laws and regulations. This includes developing employee handbooks, creating HR policies and procedures, and advising on employee relations issues.",
        icon: "FileText",
      },
    ],
    whoItsFor: [
      "Companies that have grown faster than their organisational structure",
      "Businesses hiring for roles they have never hired for before",
      "Organisations with no written handbook, policies or performance process",
      "Leadership teams dealing with turnover they cannot explain",
    ],
    whatYouGet: [
      "An organisation chart with defined roles, reporting lines and decision rights",
      "A workforce plan tied to what the business intends to do over the next period",
      "A recruitment process you can run repeatedly, with role profiles and assessment criteria",
      "An employee handbook and the HR policies that sit behind it",
      "A performance management cycle your managers are trained to run",
    ],
    howItWorks: ENGAGEMENT_STEPS("your structure, roles, HR policies and hiring practice"),
    faqs: [
      {
        question: "Do you recruit on our behalf?",
        answer:
          "The focus is on building the process — role definition, assessment criteria, interview structure and onboarding — so your team can hire consistently. Where you want support running a specific search, discuss it during scoping and we will tell you plainly what we can and cannot take on.",
      },
      {
        question: "Can you advise on labour law?",
        answer:
          "We build HR policies and practices that reflect the labour obligations applying to your business, and flag where a matter needs a legal opinion. We are consultants, not a law firm, and we say so when the question has crossed that line.",
      },
      {
        question: "Our managers have never run performance reviews. Is that a problem?",
        answer:
          "It is the normal starting point. A review process only works if the people running it understand what it is for, so training managers is part of the work rather than an addition to it.",
      },
    ],
  },

  // ───────────────────────────────────────────────────── business development ──
  {
    slug: "business-development",
    name: "Business Development",
    navLabel: "Business Development",
    tagline: "Accelerating growth and unlocking new market opportunities.",
    intro:
      "Entering a new market or signing a cross-border partnership fails more often on preparation than on ambition. We work through the questions that decide it: whether the demand is there, who the right partner is, and how the arrangement should be structured.",
    metaTitle: "Business Development & Market Entry Consulting | Darwish & Co",
    metaDescription:
      "Market entry strategy, partnership development and international trade support for SMEs expanding across the MENA region.",
    accent: "amber",
    icon: "TrendingUp",
    legacyAnchor: "bizdev",
    offerings: [
      {
        title: "Market Entry Strategy",
        description:
          "Comprehensive market research and entry strategies to help SMEs expand into new MENA markets with confidence and clarity.",
        icon: "Globe2",
      },
      {
        title: "Strategic Partnerships",
        description:
          "Identifying and facilitating high-value partnerships, joint ventures, and alliances that create sustainable competitive advantage.",
        icon: "Handshake",
      },
      {
        title: "International Trade Facilitation",
        description:
          "End-to-end support for cross-border trade, including regulatory navigation, partner identification, and deal structuring.",
        icon: "TrendingUp",
      },
    ],
    whoItsFor: [
      "Businesses considering a new market and wanting the case tested before committing",
      "Companies looking for a distributor, joint venture partner or local representative",
      "Exporters and importers dealing with cross-border requirements for the first time",
      "Organisations with an opportunity in hand that needs structuring into an agreement",
    ],
    whatYouGet: [
      "A market assessment covering demand, competition, pricing context and entry requirements",
      "A shortlist of candidate partners with the basis on which each was assessed",
      "An entry plan setting out route, sequence, cost and the risks that could stop it",
      "Support through negotiation and deal structuring, alongside your legal advisers",
    ],
    howItWorks: ENGAGEMENT_STEPS("the market, the opportunity and your readiness to enter it"),
    faqs: [
      {
        question: "Which markets do you cover?",
        answer:
          "Egypt and the wider MENA region are where our own presence and network sit. Where a piece of work reaches beyond that, we say at the outset whether we are drawing on direct experience or on partner capability, so you know which you are buying.",
      },
      {
        question: "Can you introduce us to partners directly?",
        answer:
          "Introductions happen where our network genuinely reaches, and we will tell you when it does not rather than promising access we do not have. Identification and assessment of candidates is part of the work in either case.",
      },
      {
        question: "Do you handle the legal side of a partnership agreement?",
        answer:
          "We structure the commercial terms and work with your legal advisers on drafting and execution. Legal instruments are signed off by lawyers, not by us.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────── digital marketing ──
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    navLabel: "Digital Marketing",
    tagline:
      "Strategic digital presence, content creation, and AI-driven marketing for Egyptian, Gulf, MENA and African businesses.",
    intro:
      "Marketing activity without a strategy produces volume, not results. We start from positioning and audience, then build the channel plan, the content operation and the measurement that shows what is working — including where generative AI genuinely reduces cost.",
    metaTitle: "Digital Marketing Strategy, Content & AI Production | Darwish & Co",
    metaDescription:
      "Digital strategy, social media management, generative AI content, multimedia production and PR for businesses across Egypt, the Gulf, MENA and Africa.",
    accent: "amber",
    icon: "Globe2",
    legacyAnchor: "digital-marketing",
    offerings: [
      {
        title: "Digital Strategy & Brand Development",
        description:
          "Crafting comprehensive digital strategies that align your brand identity with target audiences across Egyptian, Gulf markets, MENA and African markets. Includes brand positioning, visual identity direction, and multi-platform content architecture.",
        icon: "Globe2",
      },
      {
        title: "Social Media Management & Growth",
        description:
          "End-to-end management of social media channels (Meta, LinkedIn, TikTok, YouTube) with data-driven content calendars, community engagement, and performance analytics to drive measurable audience growth.",
        icon: "BarChart3",
      },
      {
        title: "Generative AI Content Production",
        description:
          "Leveraging cutting-edge Generative AI tools for high-impact content creation — AI-driven imagery, video production, motion graphics, and automated content workflows that reduce cost while elevating quality.",
        icon: "Cpu",
      },
      {
        title: "Multimedia Production & Motion Graphics",
        description:
          "Full-service multimedia production using Adobe Creative Cloud (Premiere Pro, After Effects, Photoshop, Illustrator) — from corporate video and promotional reels to animated explainers and branded presentations.",
        icon: "BookOpen",
      },
      {
        title: "PR Strategy & Stakeholder Communications",
        description:
          "Designing and executing public relations strategies that build institutional credibility, manage stakeholder narratives, and strengthen visibility with government bodies, media, and key industry partners.",
        icon: "ShieldCheck",
      },
      {
        title: "Digital Marketing Training & Capacity Building",
        description:
          "Customised corporate training programmes in Digital Marketing, AI-powered content creation, and social media strategy — delivered by an active visiting lecturer at Cairo University and the Egyptian Chinese University.",
        icon: "FileText",
      },
    ],
    whoItsFor: [
      "Businesses posting regularly without knowing what any of it returns",
      "Companies whose brand presentation no longer matches what the business has become",
      "Organisations producing video and campaign content at a cost they want to bring down",
      "In-house marketing teams that need capability built rather than work outsourced",
    ],
    whatYouGet: [
      "A digital strategy covering positioning, audiences and the channels that suit them",
      "A content plan and calendar your team or ours can run",
      "Produced content — imagery, video, motion graphics — to an agreed schedule",
      "Reporting against the measures agreed at the start, not vanity figures",
      "Training for your team where you want the capability kept in-house",
    ],
    howItWorks: ENGAGEMENT_STEPS("your current positioning, channels, content and results"),
    faqs: [
      {
        question: "Do you run our channels, or teach us to?",
        answer:
          "Either. Some clients want the operation managed; others want the strategy, the templates and the training, then run it themselves. The second usually costs less over time and is worth considering if you have someone to own it.",
      },
      {
        question: "How do you use AI in content production?",
        answer:
          "For imagery, video elements, motion graphics and production workflow — the stages where it removes cost without removing judgement. Strategy, messaging and anything published in your name stays under human review.",
      },
      {
        question: "Can you work in Arabic and English?",
        answer:
          "Yes. Work across Egyptian, Gulf, MENA and African markets is delivered in both, with the choice driven by the audience for each channel.",
      },
    ],
  },

  // ──────────────────────────────────────────── integrity (partner-delivered) ──
  {
    slug: "integrity-anti-corruption",
    name: "Integrity & Anti-Corruption Services",
    navLabel: "Integrity & Anti-Corruption",
    tagline:
      "Corruption risk, anti-bribery management systems, and the evidence that a compliance programme works.",
    intro:
      "Anti-corruption compliance is judged on whether an organisation can demonstrate adequate procedures — not on whether it intended well. These services build that demonstrable programme, from corruption risk assessment through to ISO 37001 certification and effectiveness reporting.",
    metaTitle: "Integrity & Anti-Corruption Services — ISO 37001, Risk & Compliance | Darwish & Co",
    metaDescription:
      "Corruption risk management, ISO 37001 anti-bribery systems, integrity assessment and compliance technology, delivered with our partner VisionEthics.",
    accent: "blue",
    icon: "ShieldCheck",
    legacyAnchor: "integrity",
    partner: {
      name: "VisionEthics",
      url: "https://visionethics.com",
      note: "Delivered in partnership with VisionEthics (Malaysia) — specialists in governance, integrity, and corruption prevention across public and private sectors.",
    },
    offerings: [
      {
        group: "Anti-Corruption Compliance",
        title: "Corruption Risk Management (CRM)",
        description:
          "Identifies areas of potential corruption risk and develops targeted preventative measures. Based on international risk management principles and adaptable into Enterprise Risk Management (ERM) frameworks. Covers consultation, risk profiling, action plans, and continuous dashboard reporting.",
        icon: "ShieldCheck",
      },
      {
        group: "Anti-Corruption Compliance",
        title: "Anti-Bribery Management System (ISO 37001 ABMS)",
        description:
          "Globally recognised ISO standard for Anti-Bribery Management Systems. Covers bribery risk assessment, leadership responsibilities, HR practices, due diligence, anti-corruption policies, financial controls, supply chain integrity, whistle-blowing, and monitoring. VisionEthics guides organisations through full certification.",
        icon: "ShieldCheck",
      },
      {
        group: "Anti-Corruption Compliance",
        title: "Organisational Anti-Corruption Plan (OACP)",
        description:
          "A structured plan helping organisations systematically address corruption risks at the organisational level. Covers governance structures, risk identification, policy development, and monitoring frameworks — aligned with internationally recognised anti-corruption standards and best practices.",
        icon: "ShieldCheck",
      },
      {
        group: "Anti-Corruption Compliance",
        title: "Corporate Liability & Adequate Procedures Advisory",
        description:
          "Advisory on corporate liability obligations under applicable anti-corruption legislation. Helps organisations understand their legal responsibilities, implement adequate procedures, and build a defensible compliance programme. Covers board responsibilities, compliance design, and evidence of top-management commitment.",
        icon: "Scale",
      },
      {
        group: "Anti-Corruption Compliance",
        title: "Adequate Procedures & Gap Analysis",
        description:
          "Assessment and gap analysis of an organisation's existing anti-corruption controls against internationally recognised adequate procedures guidelines. Identifies weaknesses, prioritises remediation actions, and provides a clear roadmap to full compliance.",
        icon: "CheckCircle",
      },
      {
        group: "Anti-Corruption Compliance",
        title: "Anti-Corruption Policies & Procedures — Monitoring and Evaluation",
        description:
          "Development, review, and monitoring of anti-corruption policies and procedures. Covers gifts and hospitality, donations and sponsorship controls, conflict of interest declarations, and whistle-blowing procedures. Includes ongoing monitoring and evaluation to ensure policies remain effective.",
        icon: "FileText",
      },
      {
        group: "Anti-Corruption Compliance",
        title: "Integrity Assessment Advisory (IAA)",
        description:
          "Independent assessment of an organisation's integrity culture, governance practices, and anti-corruption controls. Provides a structured evaluation of existing integrity programmes and recommends improvements to support boards and senior management in demonstrating commitment to ethical governance.",
        icon: "Search",
      },
      {
        group: "Anti-Corruption Compliance",
        title: "Effectiveness Indicators Assessment",
        description:
          "Measurement and evaluation of the effectiveness of anti-corruption compliance programmes using defined indicators. Provides evidence-based reporting to boards, regulators, and stakeholders on the performance of compliance initiatives.",
        icon: "BarChart3",
      },
      {
        group: "Training & Education",
        title: "Interactive Training with Prosecutors' Perspectives",
        description:
          "Practical, interactive workshops on anti-corruption, integrity, and compliance. Features real case studies and lessons learned from prosecutors' perspectives to bring legal consequences to life. Designed for boards, management, compliance officers, and employees.",
        icon: "BookOpen",
      },
      {
        group: "Training & Education",
        title: "E-Learning Portal",
        description:
          "Digital learning platform providing accessible anti-corruption and integrity training for organisations. Enables scalable, trackable compliance training across large workforces and supports continuous learning and certification.",
        icon: "BookOpen",
      },
      {
        group: "Advanced Compliance Technology",
        title: "Corporate Integrity Compliance Framework (CICF)",
        description:
          "A comprehensive GRC technology tool supporting Compliance teams and Internal Audit departments. Evaluates the effectiveness of anti-corruption compliance programmes, monitors adherence to adequate corruption prevention procedures, and provides dashboard reporting for boards and senior management.",
        icon: "Cpu",
      },
      {
        group: "Advanced Compliance Technology",
        title: "ETIKALY — Compliance Intelligence Platform",
        description:
          "VisionEthics' proprietary advanced compliance intelligence and reporting platform. Provides real-time insights, analytics, and dashboard reporting to support governance decision-making and enhance organisational integrity management.",
        icon: "Cpu",
      },
      {
        group: "Community Integrity & ESG",
        title: "Community Integrity Building (CIB) & Collective Action",
        description:
          "Fosters a collaborative approach to integrity and transparency within communities and organisations. Champions community integrity building and collective action, providing governance software tools that enable precise dashboard reporting with real-time insights and analytics.",
        icon: "Globe2",
      },
      {
        group: "Community Integrity & ESG",
        title: "Sustainability Building & ESG Principles",
        description:
          "Helps organisations integrate sustainable practices into their operations, promoting Environmental, Social, and Governance (ESG) principles to drive ethical excellence across all spheres of business activity.",
        icon: "Globe2",
      },
    ],
    whoItsFor: [
      "Organisations that must show adequate anti-corruption procedures to a client, regulator or funder",
      "Companies pursuing ISO 37001 certification, or assessing whether to",
      "Boards wanting an independent view of their integrity culture and controls",
      "Groups with supply chains or intermediaries where bribery exposure sits outside the company",
    ],
    whatYouGet: [
      "A corruption risk profile for your organisation, with prioritised preventative measures",
      "A gap analysis against internationally recognised adequate procedures guidance",
      "The policies, controls and whistle-blowing arrangements a defensible programme requires",
      "Training for boards, management and staff, and reporting that evidences effectiveness",
    ],
    howItWorks: ENGAGEMENT_STEPS("your corruption risk exposure and existing compliance controls"),
    faqs: [
      {
        question: "Who delivers this work?",
        answer:
          "It is delivered in partnership with VisionEthics, a Malaysian firm specialising in governance, integrity and corruption prevention. Darwish & Co. is your point of contact and manages the engagement; the specialist capability, including the ETIKALY platform, is theirs.",
      },
      {
        question: "What is ISO 37001?",
        answer:
          "ISO 37001 is the international standard for anti-bribery management systems. It sets requirements across risk assessment, leadership responsibility, due diligence, financial and commercial controls, whistle-blowing and monitoring. An organisation can align with it, or go through certification by an accredited body.",
      },
      {
        question: "Is this relevant outside heavily regulated sectors?",
        answer:
          "It is increasingly driven by counterparties rather than regulators. Large customers, international partners and funders often require evidence of anti-bribery controls from their suppliers, whatever the sector.",
      },
    ],
  },

  // ─────────────────────────────────────── market research (partner-delivered) ──
  {
    slug: "market-research",
    name: "Market Research & Consumer Insights",
    navLabel: "Market Research & Insights",
    tagline: "Evidence about your market and your customers, gathered to a defined method.",
    intro:
      "Strategic decisions taken on assumption are expensive to reverse. These services test the assumption first — through consumer panels, brand tracking, competitive analysis and qualitative research across MENA markets.",
    metaTitle: "Market Research & Consumer Insights in MENA | Darwish & Co",
    metaDescription:
      "Consumer panel studies, brand health tracking, market entry research and qualitative studies across MENA, delivered with In Light Consumer Insights.",
    accent: "emerald",
    icon: "Search",
    legacyAnchor: "market-research",
    partner: {
      name: "In Light Consumer Insights",
      url: "https://in-light.tech",
      note: "Delivered in partnership with In Light Consumer Insights — a proprietary MENA consumer panel with 10,500+ respondents and 405+ research projects delivered in 2025.",
    },
    stats: [
      { value: "10,500+", label: "Panel Respondents" },
      { value: "405+", label: "Projects in 2025" },
      { value: "MENA", label: "Regional Coverage" },
      { value: "Quantitative & Qualitative", label: "Research Methods" },
    ],
    offerings: [
      {
        title: "Consumer Research & Panel Studies",
        description:
          "Access In Light's proprietary online consumer panel with 10,500+ pre-screened respondents. Quantitative surveys designed to deliver statistically robust insights on consumer attitudes, behaviours, and preferences at speed.",
        icon: "Users",
      },
      {
        title: "Brand Health Tracking",
        description:
          "Continuous brand tracking studies measuring awareness, perception, consideration, and loyalty over time. Benchmark your brand against competitors and identify shifts in consumer sentiment before they impact performance.",
        icon: "TrendingUp",
      },
      {
        title: "Market Entry Research",
        description:
          "Comprehensive market sizing, opportunity assessment, and consumer landscape analysis to support market entry decisions. Covers demand estimation, segment profiling, competitive mapping, and regulatory context for MENA markets.",
        icon: "Globe2",
      },
      {
        title: "Competitive Intelligence",
        description:
          "Systematic monitoring and analysis of competitor activity, market positioning, pricing strategies, and product developments. Delivers actionable intelligence to sharpen your competitive strategy and identify white-space opportunities.",
        icon: "Search",
      },
      {
        title: "Data Analytics & Consumer Insights",
        description:
          "Advanced analytics translating raw research data into clear strategic insights. Includes cross-tabulation, segmentation analysis, predictive modelling, and executive-ready dashboards tailored to business decision-making needs.",
        icon: "Database",
      },
      {
        title: "Qualitative Research — FGDs & IDIs",
        description:
          "In-depth qualitative research through Focus Group Discussions (FGDs) and In-Depth Interviews (IDIs). Uncovers the 'why' behind consumer behaviour, explores unmet needs, and tests concepts, messaging, and product ideas before launch.",
        icon: "MessageSquare",
      },
    ],
    whoItsFor: [
      "Companies about to commit to a market, a product or a positioning decision",
      "Brands that need to know how they are perceived, and against whom",
      "Businesses testing a concept, a price or a message before launch",
      "Teams holding research data they have not been able to turn into a decision",
    ],
    whatYouGet: [
      "A research design stating the method, sample and what the study can and cannot conclude",
      "Fieldwork through a pre-screened MENA consumer panel, or qualitative sessions where the question needs them",
      "Analysis that answers the business question, not just a tabulation of responses",
      "A presented readout your leadership team can take a decision from",
    ],
    howItWorks: [
      {
        title: "Define the decision",
        description:
          "We start from the decision the research has to support. That determines the method — a panel survey, a tracker, focus groups — rather than the other way round.",
      },
      {
        title: "Research design",
        description:
          "Sample, questionnaire or discussion guide, and analysis plan are agreed in writing before fieldwork, including what the study will not be able to tell you.",
      },
      {
        title: "Fieldwork",
        description:
          "Data is collected through In Light's consumer panel or qualitative sessions, with quality controls on screening and completion.",
      },
      {
        title: "Analysis and readout",
        description:
          "Findings are analysed against the original question and presented to your team, with the underlying data handed over.",
      },
    ],
    faqs: [
      {
        question: "Who carries out the fieldwork?",
        answer:
          "In Light Consumer Insights, our research partner, using their proprietary MENA consumer panel. Darwish & Co. scopes the study with you, frames it around the decision you face, and works with you on what the findings mean for the business.",
      },
      {
        question: "How large a sample do we need?",
        answer:
          "It depends on the precision the decision requires and how finely you need to read sub-groups. The research design states the sample and the confidence it supports before fieldwork begins, so you are not presented with a number afterwards that the sample cannot carry.",
      },
      {
        question: "Can you research business audiences, not just consumers?",
        answer:
          "Qualitative work — in-depth interviews and discussion groups — extends to business and professional audiences. For a specific B2B population, raise it during scoping and we will tell you whether it can be reached to a standard worth paying for.",
      },
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map((service) => service.slug);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

/** Old single-page anchors (/services#grc) mapped to the page that replaced them. */
export const LEGACY_ANCHOR_REDIRECTS: Record<string, string> = SERVICES.reduce(
  (map, service) => {
    map[service.legacyAnchor] = `/services/${service.slug}`;
    return map;
  },
  {} as Record<string, string>,
);
