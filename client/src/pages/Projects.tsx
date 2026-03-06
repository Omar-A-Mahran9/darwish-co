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

const techStack = [
  "React + TypeScript",
  "tRPC",
  "Drizzle ORM",
  "MySQL",
  "Zod Validation",
  "Resend Email",
  "Playfair Display",
  "Tailwind CSS",
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />
        <div className="container relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-2">
            <Zap className="w-4 h-4" />
            Our Work
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold">
            Projects & Innovations
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-foreground/80">
            Transforming strategy into digital solutions — from consulting
            frameworks to AI-powered platforms for the MENA region.
          </p>
        </div>
      </section>

      {/* Projects Count Bar */}
      <section className="bg-muted/40 border-b border-border py-8">
        <div className="container flex flex-wrap justify-center gap-12 text-center">
          <div>
            <p className="font-heading text-3xl font-bold text-primary">1</p>
            <p className="text-sm text-muted-foreground mt-1">Live Platform</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">2</p>
            <p className="text-sm text-muted-foreground mt-1">
              Partner Organizations
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground mt-1">
              Core Features Built
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">9/9</p>
            <p className="text-sm text-muted-foreground mt-1">Tests Passing</p>
          </div>
        </div>
      </section>

      {/* AI POC Project Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto">
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

            {/* Partner Logos / Visual */}
            <div className="space-y-6">
              {/* Partnership Visual */}
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

                {/* Darwish & Co. facilitated */}
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
                  {techStack.map((tech) => (
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

      {/* More Projects Coming */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container max-w-3xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Have a Project in Mind?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you need a strategic framework, a digital platform, or an
            AI-powered solution — Darwish & Co. is your partner from concept to
            delivery.
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
