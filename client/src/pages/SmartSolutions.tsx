import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Compass,
  Command,
  Sparkles,
  Target,
  BarChart3,
  ShieldCheck,
  Users,
  TrendingUp,
  Layers,
  CheckCircle2,
  Zap,
  Link2,
  RefreshCw,
  Play,
} from "lucide-react";
import { Link } from "wouter";

// ─────────────────────────────────────────────────────────────────────────────
// Audex Compass — green accent
// ─────────────────────────────────────────────────────────────────────────────
function AudexCompass() {
  const capabilities = [
    { icon: Target, label: "Simulate future scenarios" },
    { icon: BarChart3, label: "Compare strategic options" },
    { icon: ShieldCheck, label: "Test operational readiness" },
    { icon: TrendingUp, label: "Evaluate financial impact" },
    { icon: Layers, label: "Identify risks and opportunities" },
    { icon: CheckCircle2, label: "Prioritize where attention is needed first" },
  ];

  return (
    <section id="audex-compass" className="py-24 bg-white" style={{ scrollMarginTop: "5rem" }}>
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            {/* Product badge */}
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full"
                style={{ background: "rgba(0,204,102,0.1)", color: "#00CC66" }}
              >
                <Compass className="w-3.5 h-3.5" />
                Audex Compass
              </span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Test Before You{" "}
              <span style={{ color: "#00CC66" }}>Commit</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Audex Compass helps leadership understand future possibilities before committing
              resources, investments, or strategic decisions. Simulate scenarios, compare options,
              and know where to act before deciding how to act.
            </p>

            <div className="w-20 h-1" style={{ background: "#00CC66" }} />

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="font-bold rounded-none px-8"
                  style={{ background: "#00CC66", color: "white" }}
                >
                  Request a Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Capability grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-4 border border-border rounded-sm bg-white"
                style={{ borderLeftWidth: "3px", borderLeftColor: "#00CC66" }}
              >
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#00CC66" }} />
                <span className="text-sm text-foreground font-medium leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Investor use-case strip */}
        <div
          className="mt-16 rounded-sm p-8 grid md:grid-cols-2 gap-10"
          style={{ background: "rgba(0,204,102,0.06)", border: "1px solid rgba(0,204,102,0.2)" }}
        >
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-foreground">Before Starting a New School</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Investment feasibility", "Revenue projections", "Break-even and payback periods", "Capacity requirements"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#00CC66" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-foreground">When Expanding a School</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Expansion scenarios", "Licensing & accreditation readiness", "Market and inflation sensitivity", "Conservative, balanced, and stress scenarios"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#00CC66" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Audex Command — orange accent
// ─────────────────────────────────────────────────────────────────────────────
function AudexCommand() {
  const capabilities = [
    { icon: Users, label: "Assign actions and track responsibilities" },
    { icon: ShieldCheck, label: "Manage approvals and collect evidence" },
    { icon: BarChart3, label: "Monitor execution in real time" },
    { icon: CheckCircle2, label: "Maintain accountability across teams" },
    { icon: TrendingUp, label: "Track outcomes and performance" },
    { icon: Zap, label: "Convert every recommendation into a tracked action" },
  ];

  const workflow = [
    { step: "01", label: "Recommendation", desc: "Insight identified and recommendation generated." },
    { step: "02", label: "Assigned Owner", desc: "Action assigned to the right owner with clear responsibility." },
    { step: "03", label: "Evidence Submitted", desc: "Owner submits required evidence to support execution." },
    { step: "04", label: "Approval Granted", desc: "Approvers review and grant approval to proceed." },
    { step: "05", label: "Completed Outcome", desc: "Action completed and outcome captured and measured." },
  ];

  return (
    <section
      id="audex-command"
      className="py-24"
      style={{ background: "#fafafa", scrollMarginTop: "5rem" }}
    >
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Capability grid — left */}
          <div className="grid sm:grid-cols-2 gap-4 order-2 lg:order-1">
            {capabilities.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-4 border border-border rounded-sm bg-white"
                style={{ borderLeftWidth: "3px", borderLeftColor: "#FF9900" }}
              >
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#FF9900" }} />
                <span className="text-sm text-foreground font-medium leading-snug">{label}</span>
              </div>
            ))}
          </div>

          {/* Text — right */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full"
                style={{ background: "rgba(255,153,0,0.1)", color: "#FF9900" }}
              >
                <Command className="w-3.5 h-3.5" />
                Audex Command
              </span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Governance{" "}
              <span style={{ color: "#FF9900" }}>Intelligence</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Audex Command connects leadership to a unified view of the real school — risks,
              priorities, financial exposure, and operational gaps — and turns every insight into
              a controlled, accountable action.
            </p>

            <blockquote
              className="border-l-4 pl-4 italic text-muted-foreground text-base"
              style={{ borderColor: "#FF9900" }}
            >
              "See it. Understand it. Act on it."
            </blockquote>

            <div className="w-20 h-1" style={{ background: "#FF9900" }} />

            <Link href="/contact">
              <Button
                size="lg"
                className="font-bold rounded-none px-8"
                style={{ background: "#FF9900", color: "white" }}
              >
                Request a Demo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Execution workflow */}
        <div className="mt-16">
          <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-10">
            Controlled Execution Workflow
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflow.map(({ step, label, desc }) => (
              <div
                key={step}
                className="relative p-5 bg-white border border-border rounded-sm text-center space-y-2"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto"
                  style={{ background: "#FF9900" }}
                >
                  {step}
                </div>
                <p className="font-bold text-sm text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-bold mt-8" style={{ color: "#FF9900" }}>
            From recommendation to measurable results.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Audex Perfect — blue accent (primary)
// ─────────────────────────────────────────────────────────────────────────────
function AudexPerfect() {
  const capabilities = [
    { icon: Target, label: "Compare simulation against real performance" },
    { icon: Zap, label: "Test future decisions using real data" },
    { icon: TrendingUp, label: "Forecast strategic outcomes" },
    { icon: RefreshCw, label: "Optimize operations continuously" },
    { icon: Link2, label: "Connect planning with execution" },
    { icon: Play, label: "Deliver the complete decision journey" },
  ];

  const pillars = [
    {
      title: "Simulation",
      color: "#00CC66",
      items: ["Strategic scenarios", "What-if analysis", "Forecast modelling"],
    },
    {
      title: "Real School Intelligence",
      color: "#FF9900",
      items: ["Live operational data", "ERP & SIS integration", "Real-time performance"],
    },
  ];

  return (
    <section id="audex-perfect" className="py-24 bg-white" style={{ scrollMarginTop: "5rem" }}>
      <div className="container">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full"
                style={{ background: "rgba(0,153,204,0.1)", color: "#0099CC" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Audex Perfect
              </span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Where Simulation Meets{" "}
              <span style={{ color: "#0099CC" }}>Reality</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Audex Perfect combines the strategic simulation power of Audex Compass with the
              live operational intelligence of Audex Command — in one complete platform. It is
              the school digital twin: plan, govern, act, and deliver results in a single
              connected environment.
            </p>

            <div className="w-20 h-1" style={{ background: "#0099CC" }} />

            <Link href="/contact">
              <Button
                size="lg"
                className="font-bold rounded-none px-8"
                style={{ background: "#0099CC", color: "white" }}
              >
                Request a Demo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Capability grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-4 border border-border rounded-sm bg-white"
                style={{ borderLeftWidth: "3px", borderLeftColor: "#0099CC" }}
              >
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#0099CC" }} />
                <span className="text-sm text-foreground font-medium leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two-pillar visual */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {pillars.map(({ title, color, items }) => (
            <div
              key={title}
              className="p-8 rounded-sm space-y-4"
              style={{ background: `${color}0D`, border: `1px solid ${color}33` }}
            >
              <h3
                className="font-heading text-xl font-bold"
                style={{ color }}
              >
                {title}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-sm font-bold mt-10 text-muted-foreground">
          Plan with Confidence &nbsp;·&nbsp; Govern with Control &nbsp;·&nbsp; Act with Clarity &nbsp;·&nbsp; Deliver Results
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Smart Solutions page
// ─────────────────────────────────────────────────────────────────────────────
export default function SmartSolutions() {
  const products = [
    {
      id: "audex-compass",
      name: "Audex Compass",
      tagline: "Test Before You Commit",
      desc: "Strategic simulation intelligence. Simulate, forecast, compare, and evaluate before committing resources or strategic decisions.",
      color: "#00CC66",
      bg: "rgba(0,204,102,0.08)",
      border: "rgba(0,204,102,0.25)",
      icon: Compass,
    },
    {
      id: "audex-command",
      name: "Audex Command",
      tagline: "Governance Intelligence",
      desc: "From insight to accountability. Assign actions, track responsibilities, manage approvals, and enforce controlled execution.",
      color: "#FF9900",
      bg: "rgba(255,153,0,0.08)",
      border: "rgba(255,153,0,0.25)",
      icon: Command,
    },
    {
      id: "audex-perfect",
      name: "Audex Perfect",
      tagline: "Where Simulation Meets Reality",
      desc: "The complete school digital twin. Combines strategic simulation with live operational intelligence in one platform.",
      color: "#0099CC",
      bg: "rgba(0,153,204,0.08)",
      border: "rgba(0,153,204,0.25)",
      icon: Sparkles,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Page Hero ── */}
      <section className="py-24 bg-foreground text-white">
        <div className="container">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Smart Solutions
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight">
              Decision Intelligence for{" "}
              <span className="text-primary">School Leadership</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              Audex is a decision intelligence layer built above your school systems. It connects
              data from across the organisation into a single, actionable view — so leadership
              can understand what matters most, which risks require attention, and what should
              happen next.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-bold rounded-none px-8"
                >
                  Schedule an Executive Session <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Audex Family Overview ── */}
      <section id="audex" className="py-20 bg-secondary/10" style={{ scrollMarginTop: "5rem" }}>
        <div className="container">
          <div className="text-center mb-14 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              The Audex Family
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Three Solutions. One Mission.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Better decisions. Stronger schools. Each Audex product targets a distinct phase of
              the decision journey — from simulation to execution to continuous optimisation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map(({ id, name, tagline, desc, color, bg, border, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="block p-8 rounded-sm space-y-5 transition-transform duration-300 hover:-translate-y-1 no-underline"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: `${color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>
                    {tagline}
                  </p>
                  <h3 className="font-heading text-xl font-bold text-foreground">{name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <span
                  className="inline-flex items-center gap-1 text-sm font-bold"
                  style={{ color }}
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Sections ── */}
      <AudexCompass />
      <AudexCommand />
      <AudexPerfect />

      {/* ── Business Impact ── */}
      <section className="py-20 bg-secondary/10">
        <div className="container max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Business Impact
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Real Insights. Controlled Execution. Measurable Results.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { label: "Better Executive Decisions", color: "#0099CC" },
              { label: "Revenue Protection", color: "#00CC66" },
              { label: "Lower Risk Exposure", color: "#FF9900" },
              { label: "Stronger Accountability", color: "#0099CC" },
              { label: "Faster Decision Cycles", color: "#00CC66" },
              { label: "Smarter Expansion Planning", color: "#FF9900" },
              { label: "Better Investment Outcomes", color: "#0099CC" },
              { label: "Stronger Schools", color: "#00CC66" },
            ].map(({ label, color }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 bg-white border border-border rounded-sm"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color }} />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-foreground text-white">
        <div className="container text-center max-w-3xl mx-auto space-y-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Ready to Make Better Decisions?
          </h2>
          <p className="text-xl text-white/80 font-light">
            Schedule an executive discovery session. We'll understand your organisation deeply,
            validate what matters most to leadership, and recommend the right Audex path.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 font-bold text-lg px-12 py-8 h-auto rounded-none mt-8 shadow-xl"
            >
              Schedule Executive Session <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
