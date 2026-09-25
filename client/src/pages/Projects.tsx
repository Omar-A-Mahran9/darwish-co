import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  ExternalLink,
  CheckCircle2,
  Users,
  FileText,
  BarChart3,
  Mail,
  Download,
  Layers,
  ArrowRight,
  Zap,
  Globe,
  MapPin,
  Factory,
  TrendingUp,
  Building2,
  Handshake,
  GraduationCap,
  ShieldCheck,
  Settings,
  Cpu,
  Award,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { Link } from "wouter";

const aiPocFeatures = [
  {
    icon: FileText,
    title: "7-Section Submission Form",
    description:
      "Comprehensive form covering project overview, technical requirements, integration points, timeline, team contacts, success metrics, and resource allocation — with real-time validation.",
  },
  {
    icon: BarChart3,
    title: "Submissions Dashboard",
    description:
      "Full dashboard with search, filter by company/status/type/date, and live status tracking across all POC submissions.",
  },
  {
    icon: Layers,
    title: "Detailed POC View",
    description:
      "Dedicated detail page for each submission with complete information, status history, and action controls.",
  },
  {
    icon: Download,
    title: "Browser-Based PDF Export",
    description:
      "Export any POC submission as a professionally formatted PDF document directly from the browser.",
  },
  {
    icon: Mail,
    title: "Automated Email Notifications",
    description:
      "Instant email alerts sent to both teams on every new POC submission, keeping all stakeholders informed.",
  },
  {
    icon: CheckCircle2,
    title: "End-to-End Status Tracking",
    description:
      "Track each POC through the full pipeline — from submission to evaluation, approval, and delivery.",
  },
];

const aiTechStack = [
  "React + TypeScript",
  "tRPC",
  "Drizzle ORM",
  "MySQL",
  "Zod Validation",
  "Resend Email",
  "Playfair Display",
  "Tailwind CSS",
];

const tradeFeatures = [
  {
    icon: Factory,
    title: "107 Industrial Cluster Directory",
    description:
      "Comprehensive catalogue of Hebei Province's industrial clusters, searchable by sector, size, and investment requirements — from manufacturing to renewable energy.",
  },
  {
    icon: MapPin,
    title: "Interactive Location Maps",
    description:
      "Geospatial visualization of industrial zones, Suez Canal Zone investments, and key Egyptian market entry points for informed partnership decisions.",
  },
  {
    icon: Handshake,
    title: "Partnership Matching Engine",
    description:
      "Intelligent matching system connecting Egyptian businesses with the most relevant Chinese industrial partners based on sector alignment and capacity.",
  },
  {
    icon: Building2,
    title: "Cluster Detail Profiles",
    description:
      "In-depth profiles for each cluster with investment requirements, market potential, production capacity, and direct contact forms for prospect inquiries.",
  },
  {
    icon: TrendingUp,
    title: "Sector Analysis & Insights",
    description:
      "Data-driven analysis across 8 key sectors: renewable energy, manufacturing, infrastructure, healthcare, military, Suez Canal Zone, agriculture, and water management.",
  },
  {
    icon: Globe,
    title: "Lead Capture & CRM Integration",
    description:
      "Built-in contact forms on every cluster page capture qualified leads and enable direct communication with prospective partners for follow-up.",
  },
];

const educationPillars = [
  {
    icon: Settings,
    title: "Organizational Design & Strategic Planning",
    description:
      "Redesigning academic and operational frameworks to align with strategic goals. We establish clear workflows, define departmental responsibilities, develop unified policy frameworks, and standardize procedures across multiple campuses.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance & Accreditation Readiness",
    description:
      "Holistic QA systems spanning academic and operational departments. We guide institutions through IB, IGCSE, and regional quality framework accreditation by establishing data-driven QA databases and tracking institutional metrics.",
    color: "text-chart-2 bg-chart-2/10",
  },
  {
    icon: Users,
    title: "HR & Talent Development for Education",
    description:
      "Strategic HR planning, staffing strategies, and training programs that ensure sustainable workforce growth. Capability building for new campus locations, people analytics, and performance management tailored to educational institutions.",
    color: "text-chart-3 bg-chart-3/10",
  },
  {
    icon: Cpu,
    title: "Digital Transformation & EdTech Integration",
    description:
      "Comprehensive digital strategy roadmaps, platform implementation plans, and change management programs. Systems support adoption tracking, performance optimization, and ongoing advisory to maximize technology ROI.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: BarChart3,
    title: "Financial Governance & Risk Management",
    description:
      "Applying Darwish & Co.'s proven GRC expertise to educational finance — budget governance frameworks, risk registers, compliance programs, and financial controls that protect institutional assets and ensure regulatory adherence.",
    color: "text-chart-2 bg-chart-2/10",
  },
  {
    icon: MessageSquare,
    title: "Communications & Stakeholder Engagement",
    description:
      "Strategic communications frameworks for parents, staff, regulators, and the wider community. Digital marketing, brand positioning, and stakeholder engagement strategies that build institutional reputation across the MENA region.",
    color: "text-chart-3 bg-chart-3/10",
  },
];

const educationSegments = [
  {
    label: "Multi-Campus School Networks",
    description: "Unified policy & coordination across locations",
    color: "text-primary bg-primary/10",
  },
  {
    label: "Growing Schools (Expansion-Stage)",
    description: "Scalable systems for new campus launches",
    color: "text-chart-2 bg-chart-2/10",
  },
  {
    label: "Accreditation-Seeking Institutions",
    description: "IB, IGCSE & regional quality frameworks",
    color: "text-chart-3 bg-chart-3/10",
  },
  {
    label: "Digital Transformation-Focused",
    description: "EdTech adoption & change management",
    color: "text-primary bg-primary/10",
  },
];

const tradeTechStack = [
  "React + TypeScript",
  "Tailwind CSS",
  "Interactive Maps",
  "Lead Capture Forms",
  "Darwish & Co. Branding",
  "Responsive Design",
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
        <div className="site-container relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-2">
            <Zap className="w-4 h-4" />
            Our Work
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold">
            Projects & Innovations
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-foreground/80">
            Transforming strategy into digital solutions — AI-powered platforms
            and intelligent tools built for the MENA region.
          </p>
        </div>
      </section>

      {/* Projects Count Bar */}
      <section className="bg-muted/40 border-b border-border py-8">
        <div className="site-container flex flex-wrap justify-center gap-12 text-center">
          <div>
            <p className="font-heading text-3xl font-bold text-primary">1</p>
            <p className="text-sm text-muted-foreground mt-1">Active Initiative</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">2</p>
            <p className="text-sm text-muted-foreground mt-1">
              Partner Organizations
            </p>
          </div>
        </div>
      </section>

      {/* ── PROJECT 1: AI POC Platform ── */}
      <section id="ai-poc" className="py-20 border-b border-border" style={{ scrollMarginTop: '5rem' }}>
        <div className="site-container">
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-bold text-primary uppercase tracking-widest">
              AI Initiative
            </span>
          </div>

          {/* Project Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    AI / Machine Learning
                  </Badge>
                  <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/20">
                    POC Platform
                  </Badge>
                  <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20 hover:bg-chart-3/20">
                    Live
                  </Badge>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  POC Collaboration Platform
                </h2>
                <p className="text-lg text-primary font-semibold">
                  Techno-Management × Widebot
                </p>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                A fully operational digital platform bridging{" "}
                <strong className="text-foreground">
                  Techno-Management's
                </strong>{" "}
                strategy & project management expertise with{" "}
                <strong className="text-foreground">Widebot's</strong>{" "}
                Arabic-first AI capabilities — enabling structured Proof of
                Concept submissions, evaluation, and delivery for MENA
                enterprises.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Darwish & Co. facilitated this strategic partnership and
                designed the collaboration framework, ensuring both teams could
                efficiently manage POC requests through a unified, professional
                digital interface aligned with our brand identity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://poc-form-owpjpqpv.manus.space"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-none px-8 gap-2">
                    View Live Platform
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-none px-8 gap-2"
                  >
                    Partner With Us
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Partner Cards */}
            <div className="space-y-6">
              <div className="bg-muted/30 border border-border rounded-2xl p-8 space-y-6">
                <h3 className="font-heading text-lg font-bold text-foreground text-center">
                  Strategic Partnership
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://techno-management.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="bg-background border border-border rounded-xl p-6 text-center space-y-3 hover:border-primary/50 hover:shadow-md transition-all">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <BarChart3 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">
                          Techno-Management
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Strategy & Project Management
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs text-primary group-hover:underline">
                        Visit <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://widebot.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="bg-background border border-border rounded-xl p-6 text-center space-y-3 hover:border-chart-2/50 hover:shadow-md transition-all">
                      <div className="w-12 h-12 rounded-full bg-chart-2/10 flex items-center justify-center mx-auto">
                        <Brain className="w-6 h-6 text-chart-2" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">
                          Widebot
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Arabic-First AI Capabilities
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs text-chart-2 group-hover:underline">
                        Visit <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="border-t border-border pt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Partnership facilitated by
                  </p>
                  <p className="font-heading font-bold text-primary mt-1">
                    Darwish & Co.
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {aiTechStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Platform Capabilities
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Eight core features built to streamline the entire POC lifecycle
                — from submission to delivery.
              </p>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiPocFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const colors = [
                  "text-primary bg-primary/10",
                  "text-chart-2 bg-chart-2/10",
                  "text-chart-3 bg-chart-3/10",
                  "text-primary bg-primary/10",
                  "text-chart-2 bg-chart-2/10",
                  "text-chart-3 bg-chart-3/10",
                ];
                return (
                  <Card
                    key={index}
                    className="border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[index]}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Results Banner */}
          <div className="mt-16 bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="font-heading text-2xl md:text-3xl font-bold">
                  Project Delivered Successfully
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  The POC Collaboration Platform is fully operational with all 9
                  server tests passing, a complete submission workflow, and both
                  partner teams actively using the system.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">9/9</p>
                  <p className="text-sm text-primary-foreground/80 mt-1">
                    Tests Passing
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">8</p>
                  <p className="text-sm text-primary-foreground/80 mt-1">
                    Features Delivered
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">2</p>
                  <p className="text-sm text-primary-foreground/80 mt-1">
                    Partner Teams
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">Live</p>
                  <p className="text-sm text-primary-foreground/80 mt-1">
                    Platform Status
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT 2: Hebei-Egypt International Trade Portal ── HIDDEN ── */}
      {false && (<section id="trade-portal" className="py-20 border-b border-border bg-muted/20" style={{ scrollMarginTop: '5rem' }}>
        <div className="site-container">
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-chart-3/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-chart-3" />
            </div>
            <span className="text-sm font-bold text-chart-3 uppercase tracking-widest">
              International Trade
            </span>
          </div>

          {/* Project Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20 hover:bg-chart-3/20">
                    International Trade
                  </Badge>
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    Business Development
                  </Badge>
                  <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/20">
                    Live
                  </Badge>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Hebei-Egypt Industrial Partnership Portal
                </h2>
                <p className="text-lg text-chart-3 font-semibold">
                  Unlocking Growth — Future Opportunities for Local Partnerships in Egypt
                </p>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                A comprehensive digital platform built to facilitate industrial
                partnerships between{" "}
                <strong className="text-foreground">
                  Hebei Province, China
                </strong>{" "}
                (107 industrial clusters) and the{" "}
                <strong className="text-foreground">Egyptian market</strong> —
                serving as a strategic bridge for international trade,
                investment, and economic collaboration.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Darwish & Co. designed and delivered this platform as part of
                its international business development mandate, enabling
                Egyptian SMEs and enterprises to discover, evaluate, and connect
                with Chinese industrial partners across 8 key economic sectors
                aligned with Egypt's industrial development priorities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://hebeiegypt-c9cmqhug.manus.space"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-chart-3 text-white hover:bg-chart-3/90 font-bold rounded-none px-8 gap-2">
                    View Live Portal
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-2 border-chart-3 text-chart-3 hover:bg-chart-3 hover:text-white font-bold rounded-none px-8 gap-2"
                  >
                    Explore Partnership
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sectors & Tech Stack */}
            <div className="space-y-6">
              {/* Key Sectors */}
              <div className="bg-background border border-border rounded-2xl p-8 space-y-6">
                <h3 className="font-heading text-lg font-bold text-foreground text-center">
                  Key Sectors Covered
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Renewable Energy", color: "text-chart-2 bg-chart-2/10" },
                    { label: "Manufacturing", color: "text-primary bg-primary/10" },
                    { label: "Infrastructure", color: "text-chart-3 bg-chart-3/10" },
                    { label: "Healthcare", color: "text-chart-2 bg-chart-2/10" },
                    { label: "Suez Canal Zone", color: "text-primary bg-primary/10" },
                    { label: "Agriculture & Food", color: "text-chart-3 bg-chart-3/10" },
                    { label: "Water Management", color: "text-primary bg-primary/10" },
                    { label: "Military & Defense", color: "text-chart-2 bg-chart-2/10" },
                  ].map((sector) => (
                    <div
                      key={sector.label}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${sector.color}`}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      {sector.label}
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Business development initiative by
                  </p>
                  <p className="font-heading font-bold text-primary mt-1">
                    Darwish & Co.
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tradeTechStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Portal Capabilities
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Six core capabilities enabling seamless discovery and execution
                of industrial partnership opportunities between China and Egypt.
              </p>
              <div className="w-16 h-1 bg-chart-3 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tradeFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const colors = [
                  "text-chart-3 bg-chart-3/10",
                  "text-primary bg-primary/10",
                  "text-chart-2 bg-chart-2/10",
                  "text-chart-3 bg-chart-3/10",
                  "text-primary bg-primary/10",
                  "text-chart-2 bg-chart-2/10",
                ];
                return (
                  <Card
                    key={index}
                    className="border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[index]}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Results Banner */}
          <div className="mt-16 bg-foreground text-background rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="font-heading text-2xl md:text-3xl font-bold">
                  Bridging Two Economies
                </h3>
                <p className="text-background/80 leading-relaxed">
                  The Hebei-Egypt Industrial Partnership Portal is live and
                  actively connecting Egyptian businesses with 107 Chinese
                  industrial clusters across 8 strategic sectors, supporting
                  Egypt's industrial development agenda.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">107</p>
                  <p className="text-sm text-background/80 mt-1">
                    Industrial Clusters
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">8</p>
                  <p className="text-sm text-background/80 mt-1">
                    Key Sectors
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">2</p>
                  <p className="text-sm text-background/80 mt-1">
                    Countries Connected
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">Live</p>
                  <p className="text-sm text-background/80 mt-1">
                    Portal Status
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      )}

      {/* ── PROJECT 3: Education Organization Development ── HIDDEN ── */}
      {false && (<section id="education" className="py-20 border-b border-border" style={{ scrollMarginTop: '5rem' }}>
        <div className="site-container">
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-chart-2" />
            </div>
            <span className="text-sm font-bold text-chart-2 uppercase tracking-widest">
              Education Segment
            </span>
          </div>

          {/* Project Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20 hover:bg-chart-2/20">
                    Education Consulting
                  </Badge>
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    GRC + HR + Strategy
                  </Badge>
                  <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20 hover:bg-chart-3/20">
                    MENA Region
                  </Badge>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Education Organization Development
                </h2>
                <p className="text-lg text-chart-2 font-semibold">
                  Transform Your Institution Through Strategic Excellence
                </p>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                A specialized consulting segment that integrates Darwish & Co.'s core competencies —{" "}
                <strong className="text-foreground">Governance & Risk</strong>,{" "}
                <strong className="text-foreground">Human Resources</strong>,{" "}
                <strong className="text-foreground">Strategy & Performance</strong>, and{" "}
                <strong className="text-foreground">Digital Transformation</strong> — with deep expertise in educational institution management.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Serving mid-to-large-scale educational organizations across the MENA region that are navigating expansion, accreditation, operational optimization, or digital transformation. We bridge the gap between academic excellence, operational efficiency, strategic growth, and digital innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/contact">
                  <Button className="bg-chart-2 text-white hover:bg-chart-2/90 font-bold rounded-none px-8 gap-2">
                    Request a Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-2 border-chart-2 text-chart-2 hover:bg-chart-2 hover:text-white font-bold rounded-none px-8 gap-2"
                  >
                    Explore Our Services
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats & Segments */}
            <div className="space-y-6">
              {/* Key Stats */}
              <div className="bg-muted/30 border border-border rounded-2xl p-8 space-y-6">
                <h3 className="font-heading text-lg font-bold text-foreground text-center">
                  Programme Highlights
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background border border-border rounded-xl p-5 text-center space-y-1">
                    <p className="font-heading text-3xl font-bold text-chart-2">6</p>
                    <p className="text-xs text-muted-foreground">Service Pillars</p>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-5 text-center space-y-1">
                    <p className="font-heading text-3xl font-bold text-primary">4</p>
                    <p className="text-xs text-muted-foreground">Client Segments</p>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-5 text-center space-y-1">
                    <p className="font-heading text-3xl font-bold text-chart-3">19+</p>
                    <p className="text-xs text-muted-foreground">Years Sector Experience</p>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-5 text-center space-y-1">
                    <p className="font-heading text-3xl font-bold text-chart-2">100%</p>
                    <p className="text-xs text-muted-foreground">Accreditation Rate</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4 text-center">
                  <p className="text-xs text-muted-foreground">An integrated initiative by</p>
                  <p className="font-heading font-bold text-primary mt-1">Darwish & Co.</p>
                </div>
              </div>

              {/* Client Segments */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">
                  Target Client Segments
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {educationSegments.map((seg) => (
                    <div
                      key={seg.label}
                      className={`flex items-start gap-3 px-4 py-3 rounded-lg ${seg.color}`}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold">{seg.label}</p>
                        <p className="text-xs opacity-80">{seg.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Six Pillars Grid */}
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Six Integrated Service Pillars
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Each pillar draws on Darwish & Co.'s core competencies, delivering comprehensive end-to-end solutions for educational institutions.
              </p>
              <div className="w-16 h-1 bg-chart-2 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {educationPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Card
                    key={index}
                    className="border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${pillar.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-2">{pillar.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Results Banner */}
          <div className="mt-16 bg-chart-2 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="font-heading text-2xl md:text-3xl font-bold">
                  Strategic Planning · Operational Excellence · Digital Innovation
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Our integrated approach distinguishes Darwish & Co. from competitors who typically specialize in a single dimension of education consulting. We deliver holistic solutions that address the full complexity of institutional development across the MENA region.
                </p>
                <Link href="/contact">
                  <Button className="bg-white text-chart-2 hover:bg-white/90 font-bold rounded-none px-8 gap-2 mt-2">
                    Start the Conversation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">20–30%</p>
                  <p className="text-sm text-white/80 mt-1">Reduction in Operational Costs</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">100%</p>
                  <p className="text-sm text-white/80 mt-1">Accreditation Achievement Rate</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">19+</p>
                  <p className="text-sm text-white/80 mt-1">Years Education Sector Experience</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-heading text-3xl font-bold">6</p>
                  <p className="text-sm text-white/80 mt-1">Core Service Pillars</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* More Projects Coming */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="site-container content-narrow text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Have a Project in Mind?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you need a strategic framework, a digital platform, or an
            international trade solution — Darwish & Co. is your partner from
            concept to delivery.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-none px-10 h-14 gap-2"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
