import { useState, useEffect } from "react";
import { Users, Linkedin, Mail, Briefcase, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Partner = {
  id: number;
  name: string;
  title: string;
  specialisation: string | null;
  bio: string | null;
  email: string | null;
  linkedin: string | null;
  photoUrl: string | null;
  displayOrder: number;
  isVisible: boolean;
  createdAt: number;
};

// Placeholder data shown while the database is empty
const PLACEHOLDER_PARTNERS: Partner[] = [
  {
    id: 1,
    name: "Ahmed Darwish",
    title: "Managing Partner",
    specialisation: "GRC & Business Development",
    bio: "Over 15 years of experience guiding SMEs across the MENA region in governance, risk management, and strategic growth.",
    email: "info@darwish-co.com",
    linkedin: null,
    photoUrl: null,
    displayOrder: 0,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 2,
    name: "Senior HR Consultant",
    title: "HR & Talent Acquisition Lead",
    specialisation: "Human Resources & Organisational Design",
    bio: "Specialist in building people-first organisations, with deep expertise in MENA labour law, talent acquisition, and performance management frameworks.",
    email: null,
    linkedin: null,
    photoUrl: null,
    displayOrder: 1,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 3,
    name: "Strategy Consultant",
    title: "Strategy & Performance Advisor",
    specialisation: "Strategy & Performance Management",
    bio: "Certified strategy professional helping SMEs translate vision into measurable outcomes through OKRs, KPIs, and balanced scorecards.",
    email: null,
    linkedin: null,
    photoUrl: null,
    displayOrder: 2,
    isVisible: true,
    createdAt: 0,
  },
];

function PartnerCard({ partner }: { partner: Partner }) {
  const initials = partner.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group bg-white border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300">
      {/* Top accent */}
      <div className="h-1 w-full bg-primary group-hover:bg-chart-2 transition-colors duration-300" />

      <div className="p-6 space-y-4">
        {/* Avatar + Name */}
        <div className="flex items-start gap-4">
          {partner.photoUrl ? (
            <img
              src={partner.photoUrl}
              alt={partner.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-border flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
              <span className="text-primary font-bold text-lg font-heading">{initials}</span>
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-heading font-bold text-foreground text-lg leading-tight">
              {partner.name}
            </h3>
            <p className="text-primary text-sm font-semibold mt-0.5">{partner.title}</p>
            {partner.specialisation && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Briefcase className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-muted-foreground">{partner.specialisation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {partner.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
            {partner.bio}
          </p>
        )}

        {/* Contact Links */}
        {(partner.email || partner.linkedin) && (
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            {partner.email && (
              <a
                href={`mailto:${partner.email}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            )}
            {partner.linkedin && (
              <a
                href={partner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/partners")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setPartners(json.data);
        } else {
          // Show placeholder cards when DB is empty
          setPartners(PLACEHOLDER_PARTNERS);
        }
      })
      .catch(() => setPartners(PLACEHOLDER_PARTNERS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.specialisation ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen font-body">
      {/* Hero */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-secondary/30 to-transparent z-0" />
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Our People
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Partners &<br />
              <span className="text-primary">Consultants</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              The professionals behind Darwish & Co. — a curated network of senior consultants,
              subject-matter experts, and strategic advisors committed to delivering results across
              the MENA region.
            </p>
          </div>
        </div>
      </section>

      {/* Search + Grid */}
      <section className="py-16 bg-muted/20">
        <div className="container">
          {/* Search bar */}
          <div className="max-w-md mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, title, or specialisation…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-none border-border focus-visible:ring-primary"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No consultants found</p>
              <p className="text-sm mt-1">Try adjusting your search terms.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          )}

          {/* Join CTA */}
          <div className="mt-16 border border-dashed border-primary/40 bg-primary/5 p-8 text-center space-y-4">
            <h3 className="font-heading text-xl font-bold text-foreground">
              Interested in joining our network?
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              We are always looking for experienced consultants and subject-matter experts to
              collaborate with. Reach out and let's explore how we can work together.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
