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
            Governance and management consultancy for SMEs in the MENA region
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
                Darwish &amp; Co. is a <strong>governance and management consultancy</strong> based in{" "}
                <strong>New Cairo, Egypt</strong>, for Small and Medium-sized Enterprises in the MENA
                region. We help you build the governance, controls and growth strategy that
                investors, major clients and regulators expect.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The work covers <strong>corporate and family governance</strong>,{" "}
                <strong>risk, compliance and integrity</strong>,{" "}
                <strong>strategy and execution</strong>, <strong>people and organisation</strong>,
                and <strong>growth and market entry</strong>. Where a service is delivered with a
                partner firm, the service page says so and names who is accountable for what.
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
                title: "Governance",
                body: "Decision rights, delegation of authority, board and committee structures and family governance — and the risk, compliance and integrity work that evidences them to a client, a lender or a regulator.",
              },
              {
                title: "Strategy & Organisation",
                body: "A strategy the organisation runs monthly, with owners and measures against it, and a structure, job architecture and people system that hold as the company grows.",
              },
              {
                title: "Growth",
                body: "Market readiness, demand validation and partner selection, with the governance and compliance prerequisites a new market expects handled before entry rather than after.",
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
              SMEs reach decision points where the right advice changes what happens next: an investor
              asking how decisions are made, a major client sending a compliance questionnaire, a
              founder who can no longer sign everything. Our work is to be useful at those moments —
              with the governance, controls and growth strategy that make the answer defensible.
            </p>
            <div className="pt-4">
              <Link href="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Book a consultation
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
