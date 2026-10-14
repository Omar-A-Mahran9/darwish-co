/* eslint-disable */
// Shared site content: people, the services overview and industries.
// Exported once from the approved prototype (prototype/tools/export_content.py); edit here from now on.

export const PEOPLE: Record<string, any> = {
  "fouad-darwish": {
    "slug": "fouad-darwish",
    "name": "Fouad Darwish",
    "title": "Founder & Managing Partner",
    "photo": "fouad-darwish-square.jpg",
    "founder": true,
    "areas": [
      "Strategy and institutional development",
      "Governance and decision quality",
      "Advisory leadership"
    ],
    "leads": []
  },
  "doha-monir": {
    "slug": "doha-monir",
    "name": "Dr. Doha Monir",
    "title": "Senior International Economic Policy & Development Finance Expert; Monitoring, Evaluation & Learning Consultant",
    "photo": "doha-monir.jpg",
    "areas": [
      "Economic policy",
      "Development finance",
      "Monitoring, evaluation and learning"
    ],
    "leads": [
      "market-research"
    ]
  },
  "teh-chau-chin": {
    "slug": "teh-chau-chin",
    "name": "Teh Chau Chin",
    "title": "Principal Consultant, Anti-Corruption & Risk Advisory",
    "photo": "teh-chau-chin.jpg",
    "areas": [
      "Anti-corruption programs",
      "Risk advisory",
      "Integrity frameworks"
    ],
    "leads": [
      "governance-risk-compliance"
    ]
  },
  "ahmed-barakat": {
    "slug": "ahmed-barakat",
    "name": "Ahmed Barakat",
    "title": "HR Consultant & Educator, People Analytics Specialist",
    "photo": "ahmed-barakat.jpg",
    "areas": [
      "People analytics",
      "HR practice",
      "Capability building"
    ],
    "leads": [
      "human-resources"
    ]
  },
  "amr-mohamed": {
    "slug": "amr-mohamed",
    "name": "Dr. Amr Mohamed",
    "title": "Senior Consultant, HR Digital Transformation & Organizational Development",
    "photo": "amr-mohamed.jpg",
    "areas": [
      "Organizational development",
      "HR digital transformation",
      "Change management"
    ],
    "leads": [
      "human-resources"
    ]
  },
  "engy-saeed": {
    "slug": "engy-saeed",
    "name": "Engy Saeed",
    "title": "Finance & Investment Consultant, Financial Analysis & Education",
    "photo": "engy-saeed.jpg",
    "areas": [
      "Financial analysis",
      "Investment appraisal",
      "Finance education"
    ],
    "leads": []
  },
  "ahmed-mohamed": {
    "slug": "ahmed-mohamed",
    "name": "Ahmed Mohamed",
    "title": "Principal Advisor, Executive GRC, Financial Crime & Sovereign Governance",
    "photo": "ahmed-mohamed.jpg",
    "areas": [
      "Executive governance, risk and compliance",
      "Financial crime",
      "Sovereign governance"
    ],
    "leads": [
      "governance-risk-compliance"
    ]
  },
  "mohamed-abdelsattar": {
    "slug": "mohamed-abdelsattar",
    "name": "Mohamed Abdelsattar",
    "title": "Strategic Media & Marketing Consultant",
    "photo": "mohamed-abdelsattar.jpg",
    "areas": [
      "Strategic media",
      "Marketing strategy",
      "Communications"
    ],
    "leads": []
  }
};

export const SERVICES: any[] = [
  {
    "slug": "strategy-performance",
    "title": "Strategy & Performance Management",
    "decision": "Find direction",
    "promise": "Actionable strategic frameworks that align leadership vision with operational realities, with clear priorities, measurement models and practical pathways for implementation.",
    "support": [
      "Unclear strategic priorities or competing leadership agendas.",
      "Weak translation of strategy into operating priorities.",
      "Limited KPI discipline or inconsistent performance reviews."
    ],
    "do": [
      "Review and clarify strategic direction and priorities.",
      "Translate strategy into operating plans, initiatives and ownership.",
      "Define KPI architecture, scorecards and review cadence.",
      "Establish implementation governance and performance follow-up."
    ],
    "outputs": [
      "Strategic plan or strategy review",
      "Execution roadmap and operating plan",
      "KPI framework or scorecard",
      "Performance review model and governance cadence"
    ],
    "value": [
      "Clearer strategic direction and prioritization.",
      "Stronger alignment between leadership intent and execution.",
      "Improved accountability and visibility of performance."
    ],
    "partners": [
      [
        "Techno-Management",
        "Strategy execution and KPI tracking systems"
      ]
    ],
    "lead": null,
    "related": [
      "governance-risk-compliance",
      "operational-excellence"
    ]
  },
  {
    "slug": "governance-risk-compliance",
    "title": "Governance, Risk & Institutional Excellence",
    "decision": "Find direction",
    "promise": "Stronger institutional frameworks: clear authorities, formal policies, real accountability and practical risk and control structures.",
    "support": [
      "Unclear decision rights or overlapping authorities.",
      "Policies and controls that do not support growth or accountability.",
      "Risk management that is reactive, fragmented or undocumented."
    ],
    "do": [
      "Design governance structures and decision-rights frameworks.",
      "Review policy architecture and accountability mechanisms.",
      "Build practical risk registers and internal-control structures.",
      "Align governance recommendations with operating realities and institutional goals."
    ],
    "outputs": [
      "Corporate governance framework or code",
      "Authority matrix and decision-rights framework",
      "Risk register and control recommendations",
      "Policy architecture and internal control framework"
    ],
    "value": [
      "Stronger accountability and institutional discipline.",
      "Clearer ownership of decisions.",
      "Improved risk visibility and control."
    ],
    "partners": [
      [
        "VisionEthics",
        "Integrity, governance, anti-corruption and ESG advisory, including ISO 37001 anti-bribery management systems"
      ]
    ],
    "lead": [
      "ahmed-mohamed",
      "teh-chau-chin"
    ],
    "notice": "ISO 37001 support covers readiness and implementation assistance. Certification is carried out by independent certification bodies; Darwish & Co. is not a certifier.",
    "related": [
      "strategy-performance",
      "human-resources"
    ]
  },
  {
    "slug": "human-resources",
    "title": "Organizational Development & Human Capital Advisory",
    "decision": "Strengthen execution",
    "promise": "Clear structures, defined roles and people systems that connect performance to business priorities.",
    "support": [
      "Structural ambiguity, duplicated responsibilities or unclear reporting lines.",
      "Workforce capacity that is not aligned with business priorities.",
      "Performance systems that do not reinforce accountability or execution."
    ],
    "do": [
      "Review organizational structure and role clarity.",
      "Define responsibilities, coordination mechanisms and functional interfaces.",
      "Support workforce planning and capability-gap analysis.",
      "Design or improve performance-management and change-management approaches."
    ],
    "outputs": [
      "Organizational restructuring recommendations",
      "Role and responsibility framework",
      "Workforce planning or capability gap analysis",
      "Performance management system and change roadmap"
    ],
    "value": [
      "Clearer accountability and cross-functional coordination.",
      "Better alignment between structure, people and strategy.",
      "Stronger management and employee effectiveness."
    ],
    "partners": [
      [
        "Business Learning House (BLH)",
        "Learning and capability development"
      ],
      [
        "Cornerstone OnDemand",
        "HR AI and talent-technology solutions"
      ]
    ],
    "lead": [
      "amr-mohamed",
      "ahmed-barakat"
    ],
    "related": [
      "operational-excellence",
      "strategy-performance"
    ]
  },
  {
    "slug": "operational-excellence",
    "title": "Operational Excellence & Project Advisory",
    "decision": "Strengthen execution",
    "promise": "Simpler ways of working: clear handoffs, ownership, process flow and project governance.",
    "support": [
      "Multiple handoffs, unclear coordination or slow decision flow.",
      "Processes that create duplication, delay or inconsistent quality.",
      "Projects that lack governance, ownership or disciplined implementation."
    ],
    "do": [
      "Assess current processes, handoffs and ownership.",
      "Design target operating models and clearer process flows.",
      "Define implementation plans, governance and responsibilities.",
      "Support project structures that improve visibility and execution discipline."
    ],
    "outputs": [
      "Process assessment",
      "Target operating model",
      "Implementation plan",
      "Project governance framework"
    ],
    "value": [
      "More efficient workflows and clearer ownership.",
      "Reduced coordination friction.",
      "Improved project execution and management visibility."
    ],
    "partners": [],
    "lead": null,
    "related": [
      "human-resources",
      "strategy-performance"
    ]
  },
  {
    "slug": "business-development",
    "title": "Business Growth & Market Expansion",
    "decision": "Enable growth",
    "promise": "Clear growth choices: opportunities, market entry, business-model options and a go-to-market path.",
    "support": [
      "Need for new markets, partnerships, revenue models or customer segments.",
      "Uncertainty about market attractiveness or entry priorities.",
      "Growth initiatives that lack commercial structure or go-to-market direction."
    ],
    "do": [
      "Conduct market assessment and opportunity prioritization.",
      "Review business-model options and commercial expansion choices.",
      "Develop market-entry and go-to-market strategies.",
      "Support strategic partnership and expansion planning."
    ],
    "outputs": [
      "Market assessment",
      "Growth opportunities map",
      "Market entry strategy",
      "Go-to-market roadmap"
    ],
    "value": [
      "Prioritized growth options.",
      "More informed investment and market-entry decisions.",
      "An executable path for expansion and commercial development."
    ],
    "partners": [],
    "lead": null,
    "related": [
      "market-research",
      "negotiation-deal-advisory"
    ]
  },
  {
    "slug": "negotiation-deal-advisory",
    "title": "Strategic Negotiation & Deal Advisory",
    "decision": "Enable growth",
    "promise": "Better-prepared negotiations: clear priorities, counterpart insight, structured positions and commercially sound agreements.",
    "support": [
      "High-stakes commercial discussions with competing interests.",
      "Insufficient preparation on objectives, boundaries or trade-offs.",
      "Deal structures that require stronger strategic positioning and scenario analysis."
    ],
    "steps": [
      [
        "Position",
        "Define objectives, priorities and red lines."
      ],
      [
        "Prepare",
        "Analyze counterpart interests, leverage and scenarios."
      ],
      [
        "Negotiate",
        "Guide discussions and manage trade-offs."
      ],
      [
        "Structure",
        "Shape commercial positions and agreement terms."
      ],
      [
        "Agree",
        "Support finalization and execution under a defined mandate."
      ]
    ],
    "outputs": [
      "Negotiation brief",
      "Stakeholder map",
      "Deal scenarios and trade-off analysis",
      "Negotiation strategy and term positioning"
    ],
    "value": [
      "Stronger deal positioning.",
      "Better-prepared negotiation teams.",
      "More structured agreements and decision discipline."
    ],
    "partners": [],
    "lead": null,
    "notice": "Representation or direct negotiation support is provided only under a clearly defined formal client mandate and does not imply unrestricted legal representation or signing authority.",
    "related": [
      "business-development",
      "market-research"
    ]
  },
  {
    "slug": "market-research",
    "title": "Research, Feasibility & Business Intelligence",
    "decision": "Navigate complexity",
    "promise": "Evidence before decisions: research, feasibility and competitive intelligence that reduce uncertainty before investment or entry.",
    "support": [
      "Important investment or market choices without reliable evidence.",
      "Fragmented market information or inconsistent competitor understanding.",
      "Need for an executive view of sector, opportunity or feasibility."
    ],
    "do": [
      "Conduct market and sector research.",
      "Assess feasibility and investment opportunities.",
      "Build competitor and market landscapes.",
      "Synthesize findings into decision-focused executive recommendations."
    ],
    "outputs": [
      "Market study",
      "Feasibility assessment",
      "Competitive landscape",
      "Executive decision brief"
    ],
    "value": [
      "More evidence-based decisions.",
      "Reduced strategic uncertainty.",
      "Clearer view of opportunities, risks and alternatives."
    ],
    "partners": [
      [
        "In Light Consumer Insights",
        "Consumer, qualitative and mixed-method research, and AI-supported market insight"
      ]
    ],
    "lead": [
      "doha-monir"
    ],
    "related": [
      "business-development",
      "strategy-performance"
    ]
  },
  {
    "slug": "company-liquidation",
    "title": "Company Liquidation & Dissolution",
    "decision": "Navigate complexity",
    "promise": "A controlled, traceable closure: structured advisory and coordination for formally liquidating a company in Egypt.",
    "support": [
      "Complex closure requirements spread across multiple authorities and obligations.",
      "Unclear sequencing of corporate, tax, labor and regulatory steps.",
      "Outstanding contracts, liabilities, assets, employee matters or documentation to resolve before closure."
    ],
    "do": [
      "Assess the company's legal, financial, operational and regulatory position.",
      "Advise the appropriate liquidation and dissolution pathway.",
      "Support corporate resolutions, liquidator arrangements and required documentation.",
      "Coordinate with relevant authorities and professional advisers.",
      "Support resolution of outstanding obligations and final deregistration."
    ],
    "outputs": [
      "Liquidation roadmap",
      "Regulatory action plan",
      "Documentation and filing coordination",
      "Closure status tracker"
    ],
    "value": [
      "A more controlled and traceable closure process.",
      "Clearer ownership and sequencing of required actions.",
      "Structured coordination toward formal deregistration and closure."
    ],
    "partners": [],
    "lead": null,
    "notice": "Depending on legal form, activity and status, coordination may involve GAFI, tax, labor, licensing, industrial-development, customs, notarization and documentation offices and other applicable authorities, as well as auditors, accountants and tax advisers.",
    "related": [
      "governance-risk-compliance",
      "negotiation-deal-advisory"
    ]
  }
];

export const CHALLENGES: any[] = [
  [
    "Find direction",
    "Turn uncertainty into clear priorities.",
    [
      [
        "Unclear strategic direction",
        "Clear priorities"
      ],
      [
        "Governance and accountability gaps",
        "Stronger controls"
      ]
    ]
  ],
  [
    "Strengthen execution",
    "Build more efficient and resilient organizations.",
    [
      [
        "Organizational inefficiency",
        "Improved efficiency"
      ],
      [
        "Operational performance challenges",
        "Measurable execution"
      ]
    ]
  ],
  [
    "Enable growth",
    "Make informed decisions to scale with confidence.",
    [
      [
        "Growth and market expansion decisions",
        "Informed scaling"
      ],
      [
        "Complex negotiations and deal structuring",
        "Stronger deal positioning"
      ]
    ]
  ],
  [
    "Navigate complexity",
    "Address high-stakes and specialized situations.",
    [
      [
        "Limited market and business intelligence",
        "Data-driven clarity"
      ],
      [
        "Complex liquidation and closure requirements",
        "Structured, compliant closure"
      ]
    ]
  ]
];

export const INDUSTRIES: any[] = [
  [
    "Government & public institutions",
    "Advisory for institutional performance, governance and public-sector priorities."
  ],
  [
    "Agriculture & agribusiness",
    "Growth, operating and management advisory in agriculture and agribusiness contexts."
  ],
  [
    "Manufacturing & industry",
    "Operational, growth and organizational advisory for industrial and manufacturing organizations."
  ],
  [
    "Energy & petroleum",
    "Management and institutional advisory in energy, petroleum and related environments."
  ],
  [
    "Business & professional services",
    "Strategy, growth, performance and organizational advisory for service businesses."
  ],
  [
    "Education & institutional development",
    "Institutional development, capability and performance advisory in education-related contexts."
  ]
];

