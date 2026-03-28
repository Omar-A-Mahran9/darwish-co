import { useState, useEffect } from "react";
import { Building2, Globe, ExternalLink, Award, Handshake, BadgeCheck, Users2 } from "lucide-react";
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
  { label: string; color: string; bgColor: string; Icon: React.ElementType }
> = {
  partner: {
    label: "Strategic Partner",
    color: "text-primary",
    bgColor: "bg-primary/10",
    Icon: Handshake,
  },
  licence: {
    label: "Licensed From",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    Icon: Award,
  },
  affiliation: {
    label: "Affiliated Body",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    Icon: BadgeCheck,
  },
  client: {
    label: "Key Client",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
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

// Placeholder data shown while the database is empty
const PLACEHOLDER_PARTNERS: CorporatePartner[] = [
  {
    id: 1,
    name: "Widebot",
    type: "partner",
    description:
      "AI and automation solutions partner. Darwish & Co. collaborates with Widebot to deliver AI proof-of-concept projects for enterprise clients.",
    website: "https://widebot.net",
    logoUrl: null,
    country: "Egypt",
    displayOrder: 0,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 2,
    name: "Techno-Management",
    type: "partner",
    description:
      "Technology and management consulting partner. Joint delivery of the AI POC Collaboration Platform enabling structured project evaluation pipelines.",
    website: null,
    logoUrl: null,
    country: "Egypt",
    displayOrder: 1,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 3,
    name: "Hebei Provincial Government",
    type: "partner",
    description:
      "Official cooperation for the Hebei–Egypt Industrial Partnership Portal, connecting Egyptian investors with Hebei's 107 industrial clusters.",
    website: null,
    logoUrl: null,
    country: "China",
    displayOrder: 2,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 4,
    name: "Professional Certification Body",
    type: "licence",
    description:
      "Licence holder for delivering accredited GRC and HR professional development programmes in the MENA region.",
    website: null,
    logoUrl: null,
    country: "International",
    displayOrder: 3,
    isVisible: true,
    createdAt: 0,
  },
];

function CorporateCard({ cp }: { cp: CorporatePartner }) {
  const cfg = TYPE_CONFIG[cp.type];
  const Icon = cfg.Icon;

  const initials = cp.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group bg-white border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Coloured top accent */}
      <div className={cn("h-1 w-full transition-colors duration-300", cfg.bgColor.replace("/10", ""))} />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Logo / Initials + Type badge */}
        <div className="flex items-start justify-between gap-3">
          {cp.logoUrl ? (
            <img
              src={cp.logoUrl}
              alt={cp.name}
              className="h-12 w-auto max-w-[120px] object-contain"
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
  const [items, setItems] = useState<CorporatePartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | CorporatePartner["type"]>("all");

  useEffect(() => {
    fetch("/api/corporate-partners")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setItems(json.data);
        } else {
          setItems(PLACEHOLDER_PARTNERS);
        }
      })
      .catch(() => setItems(PLACEHOLDER_PARTNERS))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === "all" ? items : items.filter((i) => i.type === activeFilter);

  // Count per type for filter badges
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
        <div className="container relative z-10">
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
              digital solutions across the MENA region.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/10">
            {(["partner", "licence", "affiliation", "client"] as const).map((type) => {
              const cfg = TYPE_CONFIG[type];
              const Icon = cfg.Icon;
              return (
                <div key={type} className="space-y-1">
                  <div className={cn("flex items-center gap-2", cfg.color)}>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{cfg.label}s</span>
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
        <div className="container">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTER_OPTIONS.map((opt) => {
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
