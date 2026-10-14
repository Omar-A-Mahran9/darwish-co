// Our work content: case cards, the client logo grid and the two case-study pages.
// Copied word for word from the approved prototype (prototype/tools/build_site.py); edit here from now on.

/** Organizations listed in the corporate profile. Logo use on the public site still needs each organization's approval. */
export const CLIENTS: { file: string; name: string; sector: string; w: number; h: number }[] = [
  { file: "mas-sofabed", name: "MAS Sofabed", sector: "Manufacturing and retail", w: 329, h: 95 },
  { file: "ministry-water", name: "Egyptian Ministry of Water Resources & Irrigation", sector: "Government", w: 169, h: 169 },
  { file: "tanmia", name: "Tanmia Petroleum Company", sector: "Energy and petroleum", w: 175, h: 174 },
  { file: "nabta", name: "Nabta Advertising", sector: "Media and advertising", w: 410, h: 180 },
  { file: "firewall", name: "Firewall Security", sector: "Security", w: 164, h: 161 },
  { file: "nadim", name: "NADIM Group", sector: "Furniture design and manufacturing", w: 268, h: 141 },
  { file: "itouch-plus", name: "iTouch Plus", sector: "Electronics retail", w: 274, h: 68 },
  { file: "mafa-organic", name: "MAFA Organic", sector: "Organic farming", w: 357, h: 89 },
];

export type CaseStudy = {
  slug: string;
  /** false keeps an entry off the site (the illustrative example is for demos only). */
  public: boolean;
  sector: string;
  title: string;
  text: string;
  service: string;
  img: [src: string, w: number, h: number, alt: string];
  page?: { challenge: string; scope: string; deliverables: string; outcome: string; outcomePending?: string; img: string; alt: string };
};

export const CASES: CaseStudy[] = [
  {
    slug: "furniture",
    public: true,
    sector: "Furniture manufacturing",
    title: "From low digital visibility to a GEO strategy",
    text: "A focused assessment of marketing performance, digital presence, and search visibility identified Generative Engine Optimization as a growth opportunity.",
    service: "Search visibility & GEO",
    img: ["/media/work/furniture.jpg", 720, 510, "Illustrative photo: a living room furnished with a sofa and dining set."], // generic stock, not the client's product
    page: {
      challenge: "Limited digital visibility was restricting the brand’s ability to reach potential customers and support sales growth.",
      scope: "A focused assessment of marketing performance, digital presence and search visibility, which identified generative engine optimization (GEO) as a key growth opportunity.",
      deliverables: "Digital presence assessment; GEO strategy; content and visibility recommendations; implementation guidance.",
      outcome: "Improved visibility across AI-powered search environments.",
      outcomePending: "[Measured result pending]",
      img: "/media/work/furniture.jpg",
      alt: "Living room furnished with a sofa and dining set.",
    },
  },
  {
    slug: "organization",
    public: true,
    sector: "Organizational development",
    title: "From a performance question to a management development roadmap",
    text: "A management assessment identified capability gaps in management practices, workplace communication, and employee effectiveness, informing a development roadmap.",
    service: "Management development",
    img: ["/media/work/org-development.jpg", 720, 566, "Illustrative photo: a team reviewing documents around a meeting table."], // generic stock, not the client's staff
    page: {
      challenge:
        "The organization sought management advisory to improve internal performance. The assessment found underlying capability gaps in management practices, workplace communication and employee effectiveness.",
      scope: "Management assessment, capability gap analysis and learning needs assessment.",
      deliverables: "Management development roadmap; priority skills framework.",
      outcome: "Improved management awareness and workplace practices, supporting stronger employee effectiveness and organizational productivity.",
      img: "/media/work/org-development.jpg",
      alt: "Leadership team reviewing documents around a boardroom table.",
    },
  },
  // Fictional. Kept for demo use only, labelled "Illustrative example — not a completed client engagement." Never public.
  {
    slug: "illustrative-expansion",
    public: false,
    sector: "Illustrative example — not a completed client engagement.",
    title: "Turning expansion ambitions into a focused market-entry plan",
    text: "",
    service: "Growth & market expansion",
    img: ["/media/work/illustrative-expansion.jpg", 720, 480, "Illustrative photo: a professional holding a hard hat and plans in a shared office."],
  },
];

export const PUBLIC_CASES = CASES.filter((c) => c.public && c.page);
