import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container text-center space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">About Darwish & Co.</h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-foreground/80">
            Empowering Growth, Ensuring Compliance
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto space-y-16">
          
          {/* Tagline Section */}
          <div className="text-center space-y-6">
            <h2 className="font-heading text-3xl font-bold text-chart-2">A Wise Word in the Right Moment</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In the complex and fast-paced business environment of the Middle East and North Africa, timing and insight are everything. At Darwish & Co., we believe that <strong>a wise word in the right moment</strong> can be the difference between a missed opportunity and a strategic breakthrough. This philosophy is the cornerstone of our practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-heading text-2xl font-bold text-primary">Guiding SMEs with Precision and Care</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are a specialized consultancy firm dedicated to empowering Small and Medium-sized Enterprises (SMEs) with timely, expert guidance in Governance, Risk, and Compliance (GRC) and Human Resources (HR).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We understand that SMEs often face critical decision points where the right advice can define their future trajectory. Our mission is to be there at those pivotal moments, providing the clarity and direction you need to navigate regulations, manage risks, and build a thriving workforce.
              </p>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
               <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028612285/LHPNBN3zGrpoTVXQgWZTZw/meeting-insight_58b81ff9.jpg" 
                alt="Team Collaboration" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="bg-muted/30 p-8 md:p-12 rounded-2xl space-y-6 text-center">
            <h3 className="font-heading text-2xl font-bold text-primary">Your Partner for Strategic Clarity</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Our approach goes beyond standard consulting. We strive to be your trusted advisors, offering insights that are not only expert but also perfectly timed to your business lifecycle. Whether you are establishing your governance framework, mitigating a new risk, or shaping your company culture, we provide the "wise word" that turns challenges into stepping stones for growth.
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
