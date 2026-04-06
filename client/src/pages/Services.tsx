import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, CheckCircle, BarChart3, FileText, Scale, ShieldCheck, BookOpen, Cpu, Globe2, ExternalLink } from "lucide-react";

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
      <section id="grc" className="py-20" style={{ scrollMarginTop: '5rem' }}>
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
      <section id="hr" className="py-20 bg-muted/30" style={{ scrollMarginTop: '5rem' }}>
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
      <section id="bizdev" className="py-20" style={{ scrollMarginTop: '5rem' }}>
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

      {/* Digital Marketing Section */}
      <section id="digital-marketing" className="py-20 bg-muted/30" style={{ scrollMarginTop: '5rem' }}>
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-chart-3/10 rounded-xl">
              <Globe2 className="w-8 h-8 text-chart-3" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary">Digital Marketing</h2>
              <p className="text-muted-foreground">Strategic digital presence, content creation, and AI-driven marketing for MENA businesses.</p>
            </div>
          </div>


          {/* Service grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {[
              {
                icon: <Globe2 className="w-6 h-6 text-chart-3" />,
                title: "Digital Strategy & Brand Development",
                description: "Crafting comprehensive digital strategies that align your brand identity with target audiences across Egyptian, Gulf markets, MENA and African markets. Includes brand positioning, visual identity direction, and multi-platform content architecture.",
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-chart-3" />,
                title: "Social Media Management & Growth",
                description: "End-to-end management of social media channels (Meta, LinkedIn, TikTok, YouTube) with data-driven content calendars, community engagement, and performance analytics to drive measurable audience growth.",
              },
              {
                icon: <Cpu className="w-6 h-6 text-chart-3" />,
                title: "Generative AI Content Production",
                description: "Leveraging cutting-edge Generative AI tools for high-impact content creation — AI-driven imagery, video production, motion graphics, and automated content workflows that reduce cost while elevating quality.",
              },
              {
                icon: <BookOpen className="w-6 h-6 text-chart-3" />,
                title: "Multimedia Production & Motion Graphics",
                description: "Full-service multimedia production using Adobe Creative Cloud (Premiere Pro, After Effects, Photoshop, Illustrator) — from corporate video and promotional reels to animated explainers and branded presentations.",
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-chart-3" />,
                title: "PR Strategy & Stakeholder Communications",
                description: "Designing and executing public relations strategies that build institutional credibility, manage stakeholder narratives, and strengthen visibility with government bodies, media, and key industry partners.",
              },
              {
                icon: <FileText className="w-6 h-6 text-chart-3" />,
                title: "Digital Marketing Training & Capacity Building",
                description: "Customised corporate training programmes in Digital Marketing, AI-powered content creation, and social media strategy — delivered by an active visiting lecturer at Cairo University and the Egyptian Chinese University.",
              },
            ].map((service, index) => (
              <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow bg-background">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="font-heading text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA strip */}
          <div className="bg-chart-3/5 border border-chart-3/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-1">Ready to elevate your digital presence?</h3>
              <p className="text-muted-foreground text-sm">Our Digital Marketing consultant brings 23+ years of strategic communications and AI-driven content expertise to your brand.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a href="/contact" className="inline-flex items-center gap-2 bg-chart-3 text-white font-bold px-6 py-3 hover:bg-chart-3/90 transition-colors text-sm">
                Request a Consultation
              </a>
              <a href="/partners" className="inline-flex items-center gap-2 border-2 border-chart-3 text-chart-3 font-bold px-6 py-3 hover:bg-chart-3/5 transition-colors text-sm">
                Meet Our Expert <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy & Performance Section */}
      <section id="strategy" className="py-20" style={{ scrollMarginTop: '5rem' }}>
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

      {/* VisionEthics Partnership Services Section */}
      <section id="integrity" className="py-20" style={{ scrollMarginTop: '5rem' }}>
        <div className="container">
          {/* Section header with partnership badge */}
          <div className="mb-14">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="p-3 bg-blue-600/10 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="font-heading text-3xl font-bold text-primary">Integrity & Anti-Corruption Services</h2>
                  <a
                    href="https://visionethics.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 transition-colors"
                  >
                    In partnership with VisionEthics <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-muted-foreground">Delivered in partnership with VisionEthics (Malaysia) — specialists in governance, integrity, and corruption prevention across public and private sectors.</p>
              </div>
            </div>
          </div>

          {/* Category 1: Anti-Corruption Compliance */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="font-heading text-xl font-bold text-foreground">Anti-Corruption Compliance</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Corruption Risk Management (CRM)",
                  description: "Identifies areas of potential corruption risk and develops targeted preventative measures. Based on international risk management principles and adaptable into Enterprise Risk Management (ERM) frameworks. Covers consultation, risk profiling, action plans, and continuous dashboard reporting.",
                },
                {
                  title: "Anti-Bribery Management System (ISO 37001 ABMS)",
                  description: "Globally recognised ISO standard for Anti-Bribery Management Systems. Covers bribery risk assessment, leadership responsibilities, HR practices, due diligence, anti-corruption policies, financial controls, supply chain integrity, whistle-blowing, and monitoring. VisionEthics guides organisations through full certification.",
                },
                {
                  title: "Organisational Anti-Corruption Plan (OACP)",
                  description: "A structured plan helping organisations systematically address corruption risks at the organisational level. Covers governance structures, risk identification, policy development, and monitoring frameworks — aligned with internationally recognised anti-corruption standards and best practices.",
                },
                {
                  title: "Corporate Liability & Adequate Procedures Advisory",
                  description: "Advisory on corporate liability obligations under applicable anti-corruption legislation. Helps organisations understand their legal responsibilities, implement adequate procedures, and build a defensible compliance programme. Covers board responsibilities, compliance design, and evidence of top-management commitment.",
                },
                {
                  title: "Adequate Procedures & Gap Analysis",
                  description: "Assessment and gap analysis of an organisation's existing anti-corruption controls against internationally recognised adequate procedures guidelines. Identifies weaknesses, prioritises remediation actions, and provides a clear roadmap to full compliance.",
                },
                {
                  title: "Anti-Corruption Policies & Procedures — Monitoring and Evaluation",
                  description: "Development, review, and monitoring of anti-corruption policies and procedures. Covers gifts and hospitality, donations and sponsorship controls, conflict of interest declarations, and whistle-blowing procedures. Includes ongoing monitoring and evaluation to ensure policies remain effective.",
                },
                {
                  title: "Integrity Assessment Advisory (IAA)",
                  description: "Independent assessment of an organisation's integrity culture, governance practices, and anti-corruption controls. Provides a structured evaluation of existing integrity programmes and recommends improvements to support boards and senior management in demonstrating commitment to ethical governance.",
                },
                {
                  title: "Effectiveness Indicators Assessment",
                  description: "Measurement and evaluation of the effectiveness of anti-corruption compliance programmes using defined indicators. Provides evidence-based reporting to boards, regulators, and stakeholders on the performance of compliance initiatives.",
                },
              ].map((service, index) => (
                <Card key={index} className="border-blue-200/60 shadow-sm hover:shadow-md transition-shadow bg-background">
                  <CardHeader>
                    <div className="mb-3"><ShieldCheck className="w-5 h-5 text-blue-600" /></div>
                    <CardTitle className="font-heading text-base text-primary leading-snug">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Category 2: Training and Education */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="font-heading text-xl font-bold text-foreground">Training & Education</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Interactive Training with Prosecutors' Perspectives",
                  description: "Practical, interactive workshops on anti-corruption, integrity, and compliance. Features real case studies and lessons learned from prosecutors' perspectives to bring legal consequences to life. Designed for boards, management, compliance officers, and employees.",
                },
                {
                  title: "E-Learning Portal",
                  description: "Digital learning platform providing accessible anti-corruption and integrity training for organisations. Enables scalable, trackable compliance training across large workforces and supports continuous learning and certification.",
                },
              ].map((service, index) => (
                <Card key={index} className="border-blue-200/60 shadow-sm hover:shadow-md transition-shadow bg-background">
                  <CardHeader>
                    <div className="mb-3"><BookOpen className="w-5 h-5 text-blue-600" /></div>
                    <CardTitle className="font-heading text-base text-primary leading-snug">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Category 3: Technology Solutions */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="w-5 h-5 text-blue-600" />
              <h3 className="font-heading text-xl font-bold text-foreground">Advanced Compliance Technology</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Corporate Integrity Compliance Framework (CICF)",
                  description: "A comprehensive GRC technology tool supporting Compliance teams and Internal Audit departments. Evaluates the effectiveness of anti-corruption compliance programmes, monitors adherence to adequate corruption prevention procedures, and provides dashboard reporting for boards and senior management.",
                },
                {
                  title: "ETIKALY — Compliance Intelligence Platform",
                  description: "VisionEthics' proprietary advanced compliance intelligence and reporting platform. Provides real-time insights, analytics, and dashboard reporting to support governance decision-making and enhance organisational integrity management.",
                },
              ].map((service, index) => (
                <Card key={index} className="border-blue-200/60 shadow-sm hover:shadow-md transition-shadow bg-background">
                  <CardHeader>
                    <div className="mb-3"><Cpu className="w-5 h-5 text-blue-600" /></div>
                    <CardTitle className="font-heading text-base text-primary leading-snug">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Category 4: Community & ESG */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Globe2 className="w-5 h-5 text-blue-600" />
              <h3 className="font-heading text-xl font-bold text-foreground">Community Integrity & ESG</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Community Integrity Building (CIB) & Collective Action",
                  description: "Fosters a collaborative approach to integrity and transparency within communities and organisations. Champions community integrity building and collective action, providing governance software tools that enable precise dashboard reporting with real-time insights and analytics.",
                },
                {
                  title: "Sustainability Building & ESG Principles",
                  description: "Helps organisations integrate sustainable practices into their operations, promoting Environmental, Social, and Governance (ESG) principles to drive ethical excellence across all spheres of business activity.",
                },
              ].map((service, index) => (
                <Card key={index} className="border-blue-200/60 shadow-sm hover:shadow-md transition-shadow bg-background">
                  <CardHeader>
                    <div className="mb-3"><Globe2 className="w-5 h-5 text-blue-600" /></div>
                    <CardTitle className="font-heading text-base text-primary leading-snug">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA strip */}
          <div className="mt-14 p-8 bg-blue-600/5 border border-blue-200/60 rounded-none flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-heading font-bold text-foreground text-lg">Interested in Integrity & Anti-Corruption services?</p>
              <p className="text-muted-foreground text-sm mt-1">These services are delivered in partnership with VisionEthics. Contact us to discuss your organisation's needs.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="https://visionethics.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors"
              >
                Visit VisionEthics <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
