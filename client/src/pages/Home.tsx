import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Shield, Users, TrendingUp, Brain, Globe, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-body">
      {/* Hero Section - Clean, White, Swiss Style */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Geometric Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-secondary/30 to-transparent z-0" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-chart-2/10 to-transparent z-0" />
        
        <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center pt-20 pb-12">
          <div className="space-y-8 animate-in slide-in-from-left-10 duration-700 fade-in">
            <div className="mb-4">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary tracking-tight mb-2">
                Darwish & Co.
              </h2>
              <div className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary font-bold text-sm tracking-wide uppercase">
                Consulting & Business Development
              </div>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.1] text-foreground tracking-tight">
              A Wise Word <br/>
              <span className="text-primary">In The Right Moment.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-light">
              Navigating complexity and unlocking potential for SMEs in the MENA region through expert GRC and HR consulting.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 font-bold text-base px-10 h-14 rounded-none">
                  Get Started
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-base px-10 h-14 rounded-none transition-all">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Hero Visual - Geometric & Logo Centric */}
          <div className="relative hidden lg:flex justify-center items-center animate-in slide-in-from-right-10 duration-1000 fade-in delay-200">
             <div className="relative w-full max-w-md aspect-square">
                {/* Abstract Geometric Shapes mimicking the logo */}
                <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-secondary rounded-tr-[100px] z-0 opacity-50" />
                <div className="absolute bottom-0 left-10 w-1/2 h-1/2 bg-chart-2/20 rounded-bl-[80px] z-0" />
                <div className="absolute top-10 left-0 w-20 h-20 bg-chart-3/20 rounded-full z-0" />
                
                <img 
                  src="/images/logo.png" 
                  alt="Darwish & Co. Emblem" 
                  className="relative z-10 w-full h-full object-contain p-12 drop-shadow-2xl"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section - White with High Contrast */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <h2 className="font-heading text-4xl font-bold text-foreground leading-tight">
                Guiding SMEs with <span className="text-chart-2">Precision</span> and <span className="text-chart-3">Care</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We understand that SMEs often face critical decision points where the right advice can define their future trajectory. Our mission is to be there at those pivotal moments.
              </p>
              <div className="w-20 h-1 bg-primary mt-8" />
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-3 gap-6">
              {/* Card 1: Governance (Blue) */}
              <Card className="border-t-4 border-t-primary border-x-0 border-b-0 shadow-lg hover:-translate-y-2 transition-transform duration-300 bg-white rounded-none">
                <CardHeader>
                  <Shield className="w-10 h-10 text-primary mb-4" />
                  <CardTitle className="font-heading text-xl text-foreground">Governance & Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    Establish robust frameworks that protect your business while enabling sustainable growth.
                  </p>
                  <Link href="/services">
                    <span className="text-primary font-bold text-sm flex items-center hover:underline cursor-pointer group">
                      Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </CardContent>
              </Card>

              {/* Card 2: HR (Green) */}
              <Card className="border-t-4 border-t-chart-2 border-x-0 border-b-0 shadow-lg hover:-translate-y-2 transition-transform duration-300 bg-white rounded-none">
                <CardHeader>
                  <Users className="w-10 h-10 text-chart-2 mb-4" />
                  <CardTitle className="font-heading text-xl text-foreground">Human Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    Build a thriving workforce with strategic HR planning and talent acquisition tailored for MENA.
                  </p>
                  <Link href="/services">
                    <span className="text-chart-2 font-bold text-sm flex items-center hover:underline cursor-pointer group">
                      Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </CardContent>
              </Card>

              {/* Card 3: Biz Dev (Orange) */}
              <Card className="border-t-4 border-t-chart-3 border-x-0 border-b-0 shadow-lg hover:-translate-y-2 transition-transform duration-300 bg-white rounded-none">
                <CardHeader>
                  <TrendingUp className="w-10 h-10 text-chart-3 mb-4" />
                  <CardTitle className="font-heading text-xl text-foreground">Business Dev</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    Strategic partnerships and market entry strategies to accelerate your business expansion.
                  </p>
                  <Link href="/services">
                    <span className="text-chart-3 font-bold text-sm flex items-center hover:underline cursor-pointer group">
                      Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Image Break Section - Clean & Impactful */}
      <section className="relative py-32 bg-secondary/30">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-chart-3/20 z-0" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 z-0" />
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/meeting-insight_58b81ff9.jpg" 
              alt="Strategic Meeting" 
              className="relative z-10 w-full h-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="space-y-8">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight">
              "The difference between a missed opportunity and a <span className="text-primary">strategic breakthrough</span>."
            </h2>
            <p className="text-lg text-muted-foreground">
              We don't just advise; we partner. Our integrated approach ensures that your governance structures support your people, and your people drive your growth.
            </p>
            <Link href="/about">
              <Button size="lg" className="bg-foreground text-white hover:bg-foreground/90 font-bold rounded-none px-8">
                Read Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Minimalist List */}
      <section className="py-32 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Partner with Darwish & Co?
            </h2>
            <div className="w-16 h-1 bg-chart-2 mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto text-primary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-foreground">Regional Expertise</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Deeply rooted in MENA culture and regulations, ensuring compliance and cultural alignment.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto text-chart-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-foreground">Tailored for SMEs</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Agile, practical strategies designed specifically for growth-stage companies, not corporations.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto text-chart-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-foreground">Integrated Approach</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Bridging the gap between GRC and HR for a holistic business strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Teaser Section */}
      <section className="py-24 bg-foreground text-white">
        <div className="container">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Work</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
                Platforms We've Built
              </h2>
              <p className="text-white/60 text-lg max-w-xl">
                Beyond consulting, we deliver digital solutions that create lasting operational impact for our clients.
              </p>
            </div>
            <Link href="/projects">
              <span className="flex items-center gap-2 text-primary font-bold text-sm hover:underline cursor-pointer whitespace-nowrap">
                View all projects <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Project Cards */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Card 1: AI POC Platform */}
            <div className="group relative bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-primary" />
              <div className="p-8 space-y-6">
                {/* Icon + Label */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">AI Initiative</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="font-heading text-2xl font-bold text-white">
                    AI POC Collaboration Platform
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    A full-stack platform enabling Techno-Management and Widebot to collaboratively manage AI proof-of-concept projects — from structured submission through evaluation, approval, and delivery.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {["React", "tRPC", "MySQL", "Resend Email"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-white/10 text-white/70 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex gap-8 pt-2 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-bold text-primary font-heading">7</div>
                    <div className="text-xs text-white/50 mt-0.5">Form Sections</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary font-heading">2</div>
                    <div className="text-xs text-white/50 mt-0.5">Partner Orgs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary font-heading">100%</div>
                    <div className="text-xs text-white/50 mt-0.5">Digital Pipeline</div>
                  </div>
                </div>

                {/* CTA */}
                <Link href="/projects#ai-poc">
                  <span className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline cursor-pointer group-hover:gap-3 transition-all">
                    Explore platform <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Card 2: Hebei-Egypt Trade Portal */}
            <div className="group relative bg-white/5 border border-white/10 hover:border-chart-3/50 transition-all duration-300 overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-chart-3" />
              <div className="p-8 space-y-6">
                {/* Icon + Label */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-chart-3/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-chart-3" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-chart-3">International Trade</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="font-heading text-2xl font-bold text-white">
                    Hebei–Egypt Industrial Partnership Portal
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    A bilingual trade intelligence platform connecting Egyptian investors with Hebei Province's 107 industrial clusters — bridging two economies across 8 strategic sectors.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {["React", "Bilingual", "Trade Data", "Sector Maps"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-white/10 text-white/70 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex gap-8 pt-2 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-bold text-chart-3 font-heading">107</div>
                    <div className="text-xs text-white/50 mt-0.5">Industrial Clusters</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-chart-3 font-heading">8</div>
                    <div className="text-xs text-white/50 mt-0.5">Sectors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-chart-3 font-heading">2</div>
                    <div className="text-xs text-white/50 mt-0.5">Countries</div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-6">
                  <Link href="/projects#trade-portal">
                    <span className="inline-flex items-center gap-2 text-chart-3 font-bold text-sm hover:underline cursor-pointer group-hover:gap-3 transition-all">
                      Explore platform <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <a href="https://hebeiegypt-c9cmqhug.manus.space" target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-medium transition-colors cursor-pointer">
                      <ExternalLink className="w-3.5 h-3.5" /> Live site
                    </span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section - Bold Footer */}
      <section className="py-24 bg-primary text-white">
        <div className="container text-center max-w-3xl mx-auto space-y-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Ready to Navigate Your Future?
          </h2>
          <p className="text-xl text-white/90 font-light">
            Let's build a resilient and thriving future for your business, together.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-12 py-8 h-auto rounded-none mt-8 shadow-xl">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
