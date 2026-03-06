import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, CheckCircle, BarChart3, FileText, Scale } from "lucide-react";

export default function Services() {
  const grcServices = [
    {
      title: "Governance Framework Development",
      description: "Assisting clients in establishing clear and effective governance structures, including defining roles and responsibilities, establishing board and committee charters, and developing policies and procedures.",
      icon: <Scale className="w-6 h-6 text-chart-1" />
    },
    {
      title: "Risk Management Solutions",
      description: "Providing comprehensive risk assessments, developing and implementing risk management frameworks, and advising on risk mitigation strategies tailored to your industry.",
      icon: <Shield className="w-6 h-6 text-chart-1" />
    },
    {
      title: "Compliance as a Service",
      description: "Offering ongoing compliance support to ensure clients adhere to relevant laws, regulations, and industry standards. This includes regulatory monitoring, compliance training, and policy management.",
      icon: <CheckCircle className="w-6 h-6 text-chart-1" />
    }
  ];

  const hrServices = [
    {
      title: "HR Strategy and Planning",
      description: "Aligning HR strategies with business objectives, including workforce planning, organizational design, and change management to support your growth.",
      icon: <BarChart3 className="w-6 h-6 text-chart-2" />
    },
    {
      title: "Talent Acquisition & Management",
      description: "Supporting clients in attracting, recruiting, and retaining top talent. This includes developing recruitment processes, implementing performance management systems, and creating employee development programs.",
      icon: <Users className="w-6 h-6 text-chart-2" />
    },
    {
      title: "HR Compliance & Policy",
      description: "Ensuring clients are compliant with labor laws and regulations. This includes developing employee handbooks, creating HR policies and procedures, and advising on employee relations issues.",
      icon: <FileText className="w-6 h-6 text-chart-2" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container text-center space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">Our Services</h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-foreground/80">
            Comprehensive GRC and HR solutions tailored for SMEs in the MENA region.
          </p>
        </div>
      </section>

      {/* GRC Section */}
      <section id="grc" className="py-20">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary">Governance, Risk & Compliance</h2>
              <p className="text-muted-foreground">Protecting your business and ensuring sustainable operations.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {grcServices.map((service, index) => (
              <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="font-heading text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HR Section */}
      <section id="hr" className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-chart-2/10 rounded-xl">
              <Users className="w-8 h-8 text-chart-2" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary">Human Resources Consulting</h2>
              <p className="text-muted-foreground">Empowering your workforce to drive business success.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {hrServices.map((service, index) => (
              <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow bg-background">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="font-heading text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Development Section */}
      <section id="bizdev" className="py-20">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-chart-3/10 rounded-xl">
              <BarChart3 className="w-8 h-8 text-chart-3" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary">Business Development</h2>
              <p className="text-muted-foreground">Accelerating growth and unlocking new market opportunities.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Market Entry Strategy",
                description: "Comprehensive market research and entry strategies to help SMEs expand into new MENA markets with confidence and clarity.",
              },
              {
                title: "Strategic Partnerships",
                description: "Identifying and facilitating high-value partnerships, joint ventures, and alliances that create sustainable competitive advantage.",
              },
              {
                title: "International Trade Facilitation",
                description: "End-to-end support for cross-border trade, including regulatory navigation, partner identification, and deal structuring.",
              },
            ].map((service, index) => (
              <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4"><BarChart3 className="w-6 h-6 text-chart-3" /></div>
                  <CardTitle className="font-heading text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy & Performance Section */}
      <section id="strategy" className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary">Strategy & Performance Management</h2>
              <p className="text-muted-foreground">Digital excellence for MENA SMEs through integrated performance systems.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Balanced Scorecard Implementation",
                description: "Design and deploy BSC frameworks that align strategic objectives with measurable KPIs across all organizational levels.",
              },
              {
                title: "OKR Framework Design",
                description: "Implement Objectives and Key Results methodology to drive focus, alignment, and accountability throughout your organization.",
              },
              {
                title: "Performance Dashboard Systems",
                description: "Build real-time digital dashboards that give leadership instant visibility into business performance and strategic progress.",
              },
            ].map((service, index) => (
              <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow bg-background">
                <CardHeader>
                  <div className="mb-4"><Scale className="w-6 h-6 text-primary" /></div>
                  <CardTitle className="font-heading text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
