import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Shield, Users, Lightbulb } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-primary text-primary-foreground">
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 z-0" />
        
        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight text-chart-1">
              A Wise Word in the <br/>
              <span className="text-white">Right Moment.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-lg leading-relaxed">
              Navigating complexity and unlocking potential for SMEs in the MENA region through expert GRC and HR consulting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-chart-1 text-primary hover:bg-chart-1/90 font-bold text-base px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-chart-1 text-chart-1 hover:bg-chart-1/10 font-bold text-base px-8">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative animate-in slide-in-from-right-10 duration-1000 fade-in delay-200">
             {/* Abstract visual representation of "Insight" */}
             <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 border-2 border-chart-1/30 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 border border-chart-1/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/grc-icon.png" 
                    alt="GRC Excellence" 
                    className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
              Guiding SMEs with Precision and Care
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We understand that SMEs often face critical decision points where the right advice can define their future trajectory. Our mission is to be there at those pivotal moments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-card hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-primary">Governance & Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Establish robust frameworks that protect your business while enabling sustainable growth. We turn compliance into a competitive advantage.
                </p>
                <Link href="/services">
                  <a className="text-chart-2 font-bold text-sm flex items-center hover:underline">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-card hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-primary">Human Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Build a thriving workforce with strategic HR planning, talent acquisition, and policy development tailored for the MENA region.
                </p>
                <Link href="/services">
                  <a className="text-chart-2 font-bold text-sm flex items-center hover:underline">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-card hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-primary">Strategic Insight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Receive the "wise word" exactly when you need it. Our advisory services provide clarity during complex business transitions.
                </p>
                <Link href="/services">
                  <a className="text-chart-2 font-bold text-sm flex items-center hover:underline">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Break Section */}
      <section className="relative py-32 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/images/meeting-insight.jpg')" }}>
        <div className="absolute inset-0 bg-primary/80" />
        <div className="container relative z-10 text-center text-primary-foreground">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            "The difference between a missed opportunity <br/>and a strategic breakthrough."
          </h2>
          <Link href="/about">
            <Button size="lg" className="bg-chart-1 text-primary hover:bg-chart-1/90 font-bold mt-8">
              Read Our Story
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
                Why Partner with Darwish & Co?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary">Deep Regional Expertise</h3>
                    <p className="text-muted-foreground">Rooted in the MENA region, we understand the unique cultural and regulatory nuances that impact your business.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary">Tailored for SMEs</h3>
                    <p className="text-muted-foreground">We don't offer one-size-fits-all corporate solutions. Our strategies are agile, practical, and designed for growth-stage companies.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary">Integrated Approach</h3>
                    <p className="text-muted-foreground">We bridge the gap between GRC and HR, ensuring your people and your policies work in perfect harmony.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-chart-1/20 rounded-xl transform rotate-3" />
              <img 
                src="/images/meeting-insight.jpg" 
                alt="Consulting Session" 
                className="relative rounded-xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container text-center max-w-2xl mx-auto space-y-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Ready to Navigate Your Future?
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Let's build a resilient and thriving future for your business, together. Contact us today for a consultation.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-chart-1 text-primary hover:bg-chart-1/90 font-bold text-lg px-10 py-6 h-auto">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
