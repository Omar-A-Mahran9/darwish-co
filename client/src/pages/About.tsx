import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container text-center space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">
            About Darwish &amp; Co.
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-foreground/80">
            Strategic Management &amp; GRC Consulting for SMEs in the MENA Region
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto space-y-16">

          {/* Tagline Section */}
          <div className="text-center space-y-6">
            <h2 className="font-heading text-3xl font-bold text-chart-2">
              A Wise Word in the Right Moment
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In the complex and fast-paced business environment of the Middle East and North Africa,
              timing and insight are everything. At Darwish &amp; Co., we believe that{" "}
              <strong>a wise word in the right moment</strong> can be the difference between a missed
              opportunity and a strategic breakthrough. This philosophy is the cornerstone of our
              strategic management consulting practice.
            </p>
          </div>

          {/* Who We Are */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-heading text-2xl font-bold text-primary">
                Who We Are
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Darwish &amp; Co. is a specialised <strong>business consulting firm</strong> dedicated
                to empowering Small and Medium-sized Enterprises (SMEs) with expert guidance in{" "}
                <strong>Governance, Risk, and Compliance (GRC)</strong>,{" "}
                <strong>Human Resources (HR)</strong>, and{" "}
                <strong>strategic management</strong>. Based in Egypt and serving clients across the
                MENA region, we combine deep regional knowledge with international best practice.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of certified consultants brings hands-on experience in{" "}
                <strong>compliance advisory</strong>, organisational design, talent acquisition,
                digital marketing strategy, and market research — giving SMEs access to the same
                calibre of expertise typically reserved for large corporations.
              </p>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <img
                src="/images/meeting-insight.webp"
                width={1600}
                height={893}
                loading="lazy"
                decoding="async"
                alt="Darwish & Co. consulting team in a strategic planning session"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* What We Do */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Strategic Management",
                body: "We design performance systems, balanced scorecards, and organisational strategies that align your people, processes, and goals — driving sustainable growth across the MENA market.",
              },
              {
                title: "GRC Consulting",
                body: "From governance frameworks and risk registers to regulatory compliance programmes, we help SMEs build resilient structures that satisfy regulators and protect long-term value.",
              },
              {
                title: "HR & People Advisory",
                body: "Our HR consulting services cover talent acquisition, job architecture, HR policy design, and workforce planning — tailored to the cultural and regulatory landscape of Egypt and the Gulf.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border rounded-xl p-6 space-y-3 hover:shadow-md transition-shadow"
              >
                <h4 className="font-heading font-bold text-lg text-primary">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="bg-muted/30 p-8 md:p-12 rounded-2xl space-y-6 text-center">
            <h3 className="font-heading text-2xl font-bold text-primary">
              Our Mission: Strategic Clarity at the Right Moment
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We understand that SMEs face critical decision points where the right advice defines their
              future trajectory. Our mission is to be present at those pivotal moments — providing the
              clarity, direction, and <strong>strategic management expertise</strong> you need to
              navigate regulations, manage risks, and build a thriving workforce across the MENA region.
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Work With Us
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
