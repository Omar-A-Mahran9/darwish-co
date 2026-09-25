import { useState, useEffect } from "react";
import { Building2, Globe, ExternalLink, Award, Handshake, BadgeCheck, Users2, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type CorporatePartner = {
  id: number;
  name: string;
  type: "partner" | "licence" | "affiliation" | "client";
  description: string | null;
  website: string | null;
  logoUrl: string | null;
  country: string | null;
  displayOrder: number;
  isVisible: boolean;
  createdAt: number;
};

const TYPE_CONFIG: Record<
  CorporatePartner["type"],
  { label: string; labelPlural: string; color: string; bgColor: string; borderColor: string; Icon: React.ElementType }
> = {
  partner: {
    label: "Strategic Partner",
    labelPlural: "Strategic Partners",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    Icon: Handshake,
  },
  licence: {
    label: "Licensed From",
    labelPlural: "Licences",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    borderColor: "border-chart-2/30",
    Icon: Award,
  },
  affiliation: {
    label: "Affiliated Body",
    labelPlural: "Affiliated Bodies",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    borderColor: "border-chart-3/30",
    Icon: BadgeCheck,
  },
  client: {
    label: "Key Client",
    labelPlural: "Key Clients",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    Icon: Users2,
  },
};

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "partner", label: "Strategic Partners" },
  { value: "licence", label: "Licences" },
  { value: "affiliation", label: "Affiliations" },
  { value: "client", label: "Key Clients" },
] as const;

// Verified real partner data — shown as default when DB is empty
// All entries have been researched and confirmed with real websites and contact data
const VERIFIED_PARTNERS: CorporatePartner[] = [
  {
    id: 1,
    name: "VisionEthics",
    type: "partner",
    description:
      "Advisory firm specialising in integrity, governance, and corruption prevention across public and private sectors. Services include ISO 37001 Anti-Bribery Management Systems, Corruption Risk Management, Organisational Anti-Corruption Plans, and ESG advisory. Contributors to Malaysia's National Anti-Corruption Plan (NACP) and the GIACC.",
    website: "https://visionethics.com",
    logoUrl: null,
    country: "Malaysia",
    displayOrder: 0,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 2,
    name: "WideBot AI",
    type: "partner",
    description:
      "Arabic-first AI-as-a-Service platform for governments and enterprises. Offers Conversational AI, Omnichannel Inbox, AI Agents, Digital Humans, WhatsApp Business API, and a full suite of Arabic NLP models (LLM, RAG, OCR, TTS, STT, Sentiment Analysis). Meta Business Partner and NVIDIA Inception Program member. Technology partner for Darwish & Co.'s AI POC projects.",
    website: "https://widebot.ai",
    logoUrl: null,
    country: "Egypt",
    displayOrder: 1,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 3,
    name: "Techno-Management",
    type: "partner",
    description:
      "A pioneering management consulting firm specialising in Strategy Development, Strategy Execution & Tracking, Project Management, and Performance Management. Delivers world-class consulting services and training programmes to help organisations better manage their operations. Offers Microsoft Project Portfolio Management (PPM) implementation and a proprietary Strategy Tracking System for monitoring Strategic Objectives, KPIs, and Initiatives. Training is conducted by practising consultants in interactive workshops.",
    website: "https://techno-management.com",
    logoUrl: null,
    country: "Egypt",
    displayOrder: 2,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 4,
    name: "Keheilan Asset Management",
    type: "partner",
    description:
      "A diversified investment and asset management firm dedicated to delivering sophisticated investment solutions aligned with global trends. Services span Hedge Funds (broad market exposure, stable long-term returns), Venture Capital (funding innovative startups from seed stage to market leader), and Venture Building (active startup development with resources, mentorship, and strategic guidance). Advisory services cater to corporations, family offices, high-net-worth individuals, fund managers, and policymakers — providing strategic guidance for corporate venture programmes, tailored investment advice, and policy advisory for sustainable economic growth.",
    website: "https://www.keheilan.com",
    logoUrl: "/images/partners/keheilan.webp",
    country: "International",
    displayOrder: 3,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 5,
    name: "In Light Consumer Insights",
    type: "partner",
    description:
      "Consumer research company with a proprietary competitive online panel, delivering fast, flexible, and technology-enabled market insights. Specialises in online qualitative and mixed-method research using AI-supported tools to generate actionable understanding of consumer behaviour. Serves leading global brands across healthcare, FMCG, luxury, and technology sectors. With 10,500+ panel respondents, 405 projects completed in 2025, 20,000+ surveys, and 600+ in-depth interviews, In Light provides the data intelligence layer that informs Darwish & Co.'s market entry and business development strategies across the MENA region.",
    website: "https://in-light.tech",
    logoUrl: "/images/partners/inlight.webp",
    country: "Egypt / MENA",
    displayOrder: 4,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 6,
    name: "Hebei Provincial Government — Industrial Cooperation",
    type: "affiliation",
    description:
      "Official cooperation framework for the Hebei–Egypt Industrial Partnership Portal, connecting Egyptian investors and businesses with Hebei Province's 107 industrial clusters across 8 key sectors. The portal facilitates B2B introductions, investment facilitation, and bilateral trade development between China and Egypt.",
    website: null,
    logoUrl: null,
    country: "China",
    displayOrder: 5,
    isVisible: true,
    createdAt: 0,
  },
];

// Contact details for verified partners (shown in expanded view)
const PARTNER_CONTACTS: Record<string, { phone?: string; email?: string; address?: string }> = {
  VisionEthics: {
    phone: "+603 2722 4630",
    email: "info@visionethics.com",
    address: "Platinum Sentral, Jalan Stesen Sentral 2, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Malaysia",
  },
  "WideBot AI": {
    phone: "+20 1111 320132",
    email: "nabil@widebot.net",
    address: "Cairo, Egypt",
  },
  "Techno-Management": {
    address: "Egypt",
  },
  "Keheilan Asset Management": {
    email: "info@keheilan.com",
  },
  "In Light Consumer Insights": {
    email: "info@in-light.tech",
    address: "Cairo, Egypt",
  },
};

function CorporateCard({ cp }: { cp: CorporatePartner }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = TYPE_CONFIG[cp.type];
  const Icon = cfg.Icon;
  const contact = PARTNER_CONTACTS[cp.name];

  const initials = cp.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "group bg-white border hover:shadow-lg transition-all duration-300 flex flex-col",
        cfg.borderColor
      )}
    >
      {/* Coloured top accent */}
      <div className={cn("h-1 w-full", cfg.bgColor.replace("/10", "").replace("bg-", "bg-"))} />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Logo / Initials + Type badge */}
        <div className="flex items-start justify-between gap-3">
          {cp.logoUrl ? (
            <img
              src={cp.logoUrl}
              alt={cp.name}
              className="h-12 w-auto max-w-[120px] object-contain"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm",
                cfg.bgColor,
                cfg.color
              )}
            >
              {initials}
            </div>
          )}
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap",
              cfg.bgColor,
              cfg.color
            )}
          >
            <Icon className="w-3 h-3" />
            {cfg.label}
          </span>
        </div>

        {/* Name + Country */}
        <div>
          <h3 className="font-heading font-bold text-foreground text-lg leading-tight">
            {cp.name}
          </h3>
          {cp.country && (
            <div className="flex items-center gap-1.5 mt-1">
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{cp.country}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {cp.description && (
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {cp.description}
          </p>
        )}

        {/* Contact details (expandable) */}
        {contact && (
          <div className="border-t border-border pt-3 space-y-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className={cn("text-xs font-semibold transition-colors", cfg.color, "hover:underline")}
            >
              {expanded ? "Hide contact details ▲" : "Show contact details ▼"}
            </button>
            {expanded && (
              <div className="space-y-1.5 pt-1">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{contact.email}</span>
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{contact.phone}</span>
                  </a>
                )}
                {contact.address && (
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Globe className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>{contact.address}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Website link */}
        {cp.website && (
          <a
            href={cp.website}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium mt-auto hover:underline transition-colors",
              cfg.color
            )}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Visit website
          </a>
        )}
      </div>
    </div>
  );
}

export default function CorporatePartners() {
  // Start from the verified list held in this file rather than an empty loading
  // state: it is what these pages fall back to anyway, it removes the skeleton
  // flash, and it means the prerendered page carries the real content instead of
  // a placeholder. A successful database response still replaces it below.
  const [items, setItems] = useState<CorporatePartner[]>(VERIFIED_PARTNERS);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | CorporatePartner["type"]>("all");

  useEffect(() => {
    fetch("/api/corporate-partners")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setItems(json.data);
        } else {
          // Use verified real data when DB is empty
          setItems(VERIFIED_PARTNERS);
        }
      })
      .catch(() => setItems(VERIFIED_PARTNERS))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === "all" ? items : items.filter((i) => i.type === activeFilter);

  const counts = items.reduce(
    (acc, i) => {
      acc[i.type] = (acc[i.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="flex flex-col min-h-screen font-body">
      {/* Hero */}
      <section className="relative py-24 bg-foreground text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/10 to-transparent z-0" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-gradient-to-tl from-chart-3/10 to-transparent z-0" />
        <div className="site-container relative z-10">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/20 rounded-lg">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Our Ecosystem
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight">
              Corporate Partners<br />
              <span className="text-primary">&amp; Licences</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-xl">
              The organisations, institutions, and licensing bodies that Darwish & Co. cooperates
              with — forming the backbone of our ability to deliver world-class consulting and
              digital solutions across the MENA region and beyond.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/10">
            {(["partner", "licence", "affiliation", "client"] as const)
              .filter((type) => (counts[type] ?? 0) > 0)
              .map((type) => {
              const cfg = TYPE_CONFIG[type];
              const Icon = cfg.Icon;
              return (
                <div key={type} className="space-y-1">
                  <div className={cn("flex items-center gap-2", cfg.color)}>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{cfg.labelPlural}</span>
                  </div>
                  <div className="text-3xl font-bold text-white font-heading">
                    {counts[type] ?? 0}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 bg-muted/20">
        <div className="site-container">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTER_OPTIONS.filter(
              (opt) => opt.value === "all" || (counts[opt.value] ?? 0) > 0
            ).map((opt) => {
              const count =
                opt.value === "all" ? items.length : counts[opt.value] ?? 0;
              return (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium border transition-colors",
                    activeFilter === opt.value
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
                  )}
                >
                  {opt.label}
                  <span
                    className={cn(
                      "ml-2 text-xs px-1.5 py-0.5 rounded-full",
                      activeFilter === opt.value
                        ? "bg-white/20 text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Building2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No entries in this category</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((cp) => (
                <CorporateCard key={cp.id} cp={cp} />
              ))}
            </div>
          )}

          {/* Become a partner CTA */}
          <div className="mt-16 grid md:grid-cols-2 gap-0">
            <div className="bg-primary p-10 space-y-4">
              <Handshake className="w-8 h-8 text-white/70" />
              <h3 className="font-heading text-2xl font-bold text-white">
                Become a Strategic Partner
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                We actively seek partnerships with organisations that share our commitment to
                excellence in governance, HR, and business development across the MENA region.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-6 py-3 hover:bg-gray-100 transition-colors"
              >
                Partner with Us
              </a>
            </div>
            <div className="bg-foreground p-10 space-y-4">
              <Award className="w-8 h-8 text-chart-2/70" />
              <h3 className="font-heading text-2xl font-bold text-white">
                Licensing Enquiries
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Interested in licensing our methodology, frameworks, or training programmes for
                delivery in your market? We welcome discussions with regional distributors and
                training providers.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-chart-2 text-white font-bold text-sm px-6 py-3 hover:bg-chart-2/90 transition-colors"
              >
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
