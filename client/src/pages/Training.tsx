import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  BookOpen,
  Users,
  Award,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Star,
  Globe,
  Shield,
  TrendingUp,
  Briefcase,
  Heart,
  Lightbulb,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Play,
  Cpu,
  Lock,
  UserPlus,
  MapPin,
  Laptop,
  ExternalLink,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "all",
    label: "All Programmes",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "grc",
    label: "Governance, Risk & Compliance",
    icon: Shield,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "hr",
    label: "Human Resources",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: "strategy",
    label: "Strategy & Performance",
    icon: TrendingUp,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    id: "bizdev",
    label: "Business Development",
    icon: Briefcase,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    id: "integrity",
    label: "Integrity & Anti-Corruption",
    icon: Heart,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    id: "leadership",
    label: "Leadership & Soft Skills",
    icon: Lightbulb,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
];

const COURSES = [
  // GRC
  {
    id: 1,
    category: "grc",
    title: "Corporate Governance Fundamentals",
    description:
      "Master the principles of effective corporate governance, board structures, accountability frameworks, and regulatory compliance for modern organisations.",
    duration: "3 Days",
    level: "Foundation",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Understand governance frameworks and board responsibilities",
      "Apply risk management principles in practice",
      "Design internal control systems",
    ],
    badge: "Most Popular",
    badgeColor: "bg-primary text-white",
  },
  {
    id: 2,
    category: "grc",
    title: "Enterprise Risk Management (ERM)",
    description:
      "Develop a comprehensive understanding of ERM frameworks including ISO 31000, COSO ERM, and practical risk identification, assessment, and treatment methodologies.",
    duration: "2 Days",
    level: "Intermediate",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Build and implement an ERM framework",
      "Conduct risk assessments and risk registers",
      "Report risk to senior management and boards",
    ],
    badge: null,
    badgeColor: "",
  },
  {
    id: 3,
    category: "grc",
    title: "ISO 9001 Quality Management Systems",
    description:
      "Understand the requirements of ISO 9001:2015, learn how to implement, audit, and maintain a Quality Management System that drives continuous improvement.",
    duration: "2 Days",
    level: "Intermediate",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Interpret ISO 9001:2015 requirements",
      "Implement a QMS in your organisation",
      "Prepare for internal and external audits",
    ],
    badge: null,
    badgeColor: "",
  },
  // HR
  {
    id: 4,
    category: "hr",
    title: "Strategic Human Resource Management",
    description:
      "Align HR strategy with business objectives. Cover workforce planning, talent acquisition, performance management, and HR analytics for MENA organisations.",
    duration: "3 Days",
    level: "Intermediate",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Develop an HR strategy aligned to business goals",
      "Design talent acquisition and retention programmes",
      "Use HR analytics to drive decisions",
    ],
    badge: "New",
    badgeColor: "bg-green-600 text-white",
  },
  {
    id: 5,
    category: "hr",
    title: "SHRM-CP / SHRM-SCP Exam Preparation",
    description:
      "Intensive preparation course for the SHRM Certified Professional and Senior Certified Professional examinations, aligned with the SHRM Body of Competency and Knowledge.",
    duration: "5 Days",
    level: "Advanced",
    format: "In-Person / Online",
    language: "English",
    outcomes: [
      "Master all SHRM BoCK competency clusters",
      "Practice with real exam-style questions",
      "Develop a personalised study plan",
    ],
    badge: "Certification Prep",
    badgeColor: "bg-blue-600 text-white",
  },
  {
    id: 6,
    category: "hr",
    title: "People Analytics & HR Data",
    description:
      "Learn to collect, analyse, and visualise HR data to make evidence-based workforce decisions. Covers dashboards, predictive analytics, and storytelling with data.",
    duration: "2 Days",
    level: "Intermediate",
    format: "Online",
    language: "English / Arabic",
    outcomes: [
      "Build HR dashboards and metrics frameworks",
      "Apply predictive analytics to workforce planning",
      "Present data insights to leadership",
    ],
    badge: null,
    badgeColor: "",
  },
  // Strategy
  {
    id: 7,
    category: "strategy",
    title: "Balanced Scorecard & KPI Design",
    description:
      "Learn to design, implement, and cascade a Balanced Scorecard system with meaningful KPIs that connect strategy to operational execution across all organisational levels.",
    duration: "2 Days",
    level: "Intermediate",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Design a Balanced Scorecard for your organisation",
      "Define SMART KPIs aligned to strategic objectives",
      "Cascade strategy from corporate to team level",
    ],
    badge: "Most Popular",
    badgeColor: "bg-primary text-white",
  },
  {
    id: 8,
    category: "strategy",
    title: "OKRs: Objectives & Key Results",
    description:
      "Master the OKR framework used by leading global organisations. Learn how to set ambitious objectives, define measurable key results, and build a culture of accountability.",
    duration: "1 Day",
    level: "Foundation",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Write effective OKRs at company, team, and individual levels",
      "Run OKR planning and review cycles",
      "Integrate OKRs with performance management",
    ],
    badge: null,
    badgeColor: "",
  },
  // Business Development
  {
    id: 9,
    category: "bizdev",
    title: "Market Entry Strategy for MENA",
    description:
      "Navigate the complexities of entering MENA markets. Covers regulatory landscapes, cultural intelligence, partnership models, and go-to-market strategy for SMEs.",
    duration: "2 Days",
    level: "Intermediate",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Assess market attractiveness and entry barriers",
      "Select the right market entry mode",
      "Build a MENA go-to-market plan",
    ],
    badge: null,
    badgeColor: "",
  },
  {
    id: 10,
    category: "bizdev",
    title: "Strategic Partnerships & Alliances",
    description:
      "Learn to identify, negotiate, and manage strategic partnerships that create sustainable competitive advantage. Includes joint ventures, licensing, and consortium models.",
    duration: "1 Day",
    level: "Foundation",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Identify and evaluate partnership opportunities",
      "Structure partnership agreements",
      "Manage and grow strategic alliances",
    ],
    badge: null,
    badgeColor: "",
  },
  // Integrity
  {
    id: 11,
    category: "integrity",
    title: "ISO 37001 Anti-Bribery Management System",
    description:
      "Comprehensive training on implementing and auditing an Anti-Bribery Management System (ABMS) in accordance with ISO 37001:2016, delivered in partnership with VisionEthics.",
    duration: "2 Days",
    level: "Intermediate",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Understand ISO 37001 requirements and structure",
      "Implement an ABMS in your organisation",
      "Conduct internal ABMS audits",
    ],
    badge: "VisionEthics Partner",
    badgeColor: "bg-red-700 text-white",
  },
  {
    id: 12,
    category: "integrity",
    title: "Corruption Risk Management",
    description:
      "Identify, assess, and mitigate corruption risks across business operations. Covers risk mapping, due diligence, third-party risk, and building an integrity culture.",
    duration: "1 Day",
    level: "Foundation",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Map and assess corruption risks in your context",
      "Design anti-corruption controls",
      "Build a speak-up and reporting culture",
    ],
    badge: "VisionEthics Partner",
    badgeColor: "bg-red-700 text-white",
  },
  // Leadership
  {
    id: 13,
    category: "leadership",
    title: "Leadership Excellence Programme",
    description:
      "Develop the mindset, skills, and tools of an effective leader. Covers adaptive leadership, emotional intelligence, decision-making under uncertainty, and team dynamics.",
    duration: "3 Days",
    level: "Intermediate",
    format: "In-Person",
    language: "English / Arabic",
    outcomes: [
      "Apply adaptive leadership principles",
      "Build high-performing teams",
      "Make confident decisions under pressure",
    ],
    badge: null,
    badgeColor: "",
  },
  {
    id: 14,
    category: "leadership",
    title: "Negotiation & Influence Skills",
    description:
      "Master principled negotiation techniques, persuasion frameworks, and stakeholder influence strategies for business professionals operating in complex environments.",
    duration: "1 Day",
    level: "Foundation",
    format: "In-Person / Online",
    language: "English / Arabic",
    outcomes: [
      "Apply interest-based negotiation techniques",
      "Influence without authority",
      "Manage difficult conversations professionally",
    ],
    badge: null,
    badgeColor: "",
  },
];

const STATS = [
  { label: "Training Programmes", value: "14+", icon: BookOpen },
  { label: "Expert Facilitators", value: "5", icon: Users },
  { label: "Years of Experience", value: "25+", icon: Award },
  { label: "Countries Served", value: "10+", icon: Globe },
];

const LEVEL_COLORS: Record<string, string> = {
  Foundation: "bg-green-100 text-green-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-purple-100 text-purple-700",
};

export default function Training() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory =
      activeCategory === "all" || course.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCategoryData = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="flex flex-col min-h-screen font-body">
      {/* Hero */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-chart-2/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="container relative z-10 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Darwish & Co. Training Academy
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight mb-6">
              Build Expertise.<br />
              <span className="text-chart-2">Drive Performance.</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              Professional training programmes in GRC, HR, Strategy, Business Development,
              and Integrity — delivered by seasoned practitioners with deep MENA expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#courses">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 font-bold rounded-none px-8 h-14"
                >
                  Explore Programmes
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold rounded-none px-8 h-14 bg-transparent"
                >
                  Request Custom Training
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-foreground text-white py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-chart-2" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-heading text-chart-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Train With Us */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Practitioner-Led Training for Real-World Impact
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Our training programmes are designed and delivered by active consultants — not
                academics. Every module is grounded in real case studies from MENA organisations,
                ensuring participants leave with skills they can apply immediately.
              </p>
              <div className="space-y-4">
                {[
                  "Bilingual delivery in English and Arabic",
                  "Customisable content for your industry and context",
                  "Certificates of completion for all participants",
                  "Post-training coaching and implementation support",
                  "Group discounts for 5+ participants",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-chart-2 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Play,
                  title: "Live & Interactive",
                  desc: "Workshops, case studies, and group exercises — not passive lectures.",
                  color: "text-primary",
                  bg: "bg-secondary/50",
                },
                {
                  icon: Globe,
                  title: "MENA-Focused",
                  desc: "Content tailored to regional regulations, culture, and business context.",
                  color: "text-chart-2",
                  bg: "bg-chart-2/10",
                },
                {
                  icon: Award,
                  title: "Certified Trainers",
                  desc: "All facilitators hold internationally recognised professional certifications.",
                  color: "text-chart-3",
                  bg: "bg-chart-3/10",
                },
                {
                  icon: Calendar,
                  title: "Flexible Scheduling",
                  desc: "Public, in-house, and online delivery options to fit your calendar.",
                  color: "text-purple-600",
                  bg: "bg-purple-50",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`${item.bg} p-6 rounded-none`}
                  >
                    <Icon className={`w-8 h-8 ${item.color} mb-3`} />
                    <h3 className="font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Training Programmes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our full catalogue of professional development programmes across six
              specialisation areas.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search programmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-none"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-none border ${
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Showing {filteredCourses.length} programme
              {filteredCourses.length !== 1 ? "s" : ""}
              {activeCategoryData && activeCategory !== "all"
                ? ` in ${activeCategoryData.label}`
                : ""}
            </span>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const catData = CATEGORIES.find((c) => c.id === course.category);
                const CatIcon = catData?.icon || BookOpen;
                return (
                  <div
                    key={course.id}
                    className="bg-white border border-border flex flex-col hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Card Header */}
                    <div className={`p-5 ${catData?.bg || "bg-gray-50"} border-b border-border`}>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <CatIcon className={`w-6 h-6 ${catData?.color || "text-primary"} flex-shrink-0 mt-0.5`} />
                        {course.badge && (
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${course.badgeColor}`}>
                            {course.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-lg text-foreground leading-snug">
                        {course.title}
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                        {course.description}
                      </p>

                      {/* Meta */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[course.level] || "bg-gray-100 text-gray-600"}`}>
                            {course.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Globe className="w-3.5 h-3.5" />
                          {course.language}
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {course.format}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div className="mb-5">
                        <div className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                          Key Outcomes
                        </div>
                        <ul className="space-y-1">
                          {course.outcomes.map((outcome) => (
                            <li key={outcome} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <Star className="w-3 h-3 text-chart-2 mt-0.5 flex-shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link href="/contact">
                        <Button
                          className="w-full rounded-none bg-primary text-white hover:bg-primary/90 font-bold"
                          size="sm"
                        >
                          Enquire & Enrol
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No programmes match your search.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="mt-3 text-primary hover:underline text-sm font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Custom Training CTA */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="bg-foreground text-white p-12 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Need a Custom Training Programme?
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                We design bespoke training solutions tailored to your organisation's specific
                challenges, industry context, and learning objectives. From half-day workshops
                to multi-week academies — we build it around you.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Needs assessment and learning design",
                "Custom case studies from your industry",
                "Delivery in English, Arabic, or bilingual",
                "Blended learning (in-person + online modules)",
                "Post-training assessment and certification",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-chart-2 flex-shrink-0" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-chart-2 text-white hover:bg-chart-2/90 font-bold rounded-none px-8 mt-4"
                >
                  Request a Custom Programme
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Teaser */}
      <section className="py-16 bg-secondary/30">
        <div className="container text-center">
          <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
            Upcoming Public Workshops
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
            Join our scheduled open-enrolment workshops. Dates are announced quarterly —
            register your interest to be notified first.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 font-bold rounded-none px-8"
            >
              Register Your Interest
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Instructor Registration Section */}
      <section id="join-roster" className="py-24 bg-white scroll-mt-20">
        <div className="container">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 bg-chart-2/10 border border-chart-2/30 rounded-full px-4 py-1.5 text-sm font-medium text-chart-2 mb-6">
              <UserPlus className="w-4 h-4" />
              Join Our Trainer Roster
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Are You an Experienced <span className="text-primary">Corporate Trainer</span>?<br />
              <span className="text-chart-2">We Want to Hear From You.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Darwish &amp; Co. is building a roster of experienced freelance corporate trainers
              and subject-matter experts. We deliver customised corporate training programmes for
              private-sector organisations, government entities, educational institutions, and
              development projects across Egypt and the MENA region.
            </p>
          </div>

          {/* Open Training Areas */}
          <div className="mb-16">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-8">
              Open Training Areas
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Management & Leadership */}
              <div className="border border-border bg-white hover:shadow-md transition-shadow duration-300">
                <div className="p-5 bg-blue-50 border-b border-border flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <h4 className="font-heading font-bold text-foreground">Management &amp; Leadership</h4>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />Leadership, People Management &amp; Executive Communication</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />Change Management &amp; Organisational Development</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />KPIs, Balanced Scorecard &amp; OKRs</li>
                  </ul>
                </div>
              </div>

              {/* Projects & Contracts */}
              <div className="border border-border bg-white hover:shadow-md transition-shadow duration-300">
                <div className="p-5 bg-orange-50 border-b border-border flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-orange-600 flex-shrink-0" />
                  <h4 className="font-heading font-bold text-foreground">Projects &amp; Contracts</h4>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />Project Management, PMP &amp; Agile</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />Primavera P6 &amp; Microsoft Project</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />Contracts, Procurement &amp; Project Risk</li>
                  </ul>
                </div>
              </div>

              {/* HSE & Process Safety */}
              <div className="border border-border bg-white hover:shadow-md transition-shadow duration-300">
                <div className="p-5 bg-green-50 border-b border-border flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <h4 className="font-heading font-bold text-foreground">HSE &amp; Process Safety</h4>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Health, Safety &amp; Environment</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Process Safety Management</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Incident Investigation &amp; Root Cause Analysis</li>
                  </ul>
                </div>
              </div>

              {/* AI, Data & Digital Transformation */}
              <div className="border border-border bg-white hover:shadow-md transition-shadow duration-300">
                <div className="p-5 bg-purple-50 border-b border-border flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  <h4 className="font-heading font-bold text-foreground">AI, Data &amp; Digital Transformation</h4>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />Artificial Intelligence for Organisations</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />Generative AI &amp; Prompt Engineering</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />Data Analytics, Power BI &amp; Management Dashboards</li>
                  </ul>
                </div>
              </div>

              {/* Cybersecurity & IT */}
              <div className="border border-border bg-white hover:shadow-md transition-shadow duration-300 md:col-span-2 lg:col-span-2">
                <div className="p-5 bg-red-50 border-b border-border flex items-center gap-3">
                  <Lock className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <h4 className="font-heading font-bold text-foreground">Cybersecurity &amp; IT</h4>
                </div>
                <div className="p-5">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      "Cybersecurity Fundamentals, SOC, SIEM &amp; Threat Analysis",
                      "Ethical Hacking, Penetration Testing &amp; Digital Forensics",
                      "GRC, ISO 27001, ISO 27701, ISO 22301, ISO 42001, GDPR &amp; Data Protection",
                      "Cloud Computing &amp; Cloud Security — Azure, AWS &amp; Google Cloud",
                      "Identity &amp; Access Management, EDR/XDR &amp; OT/Industrial Security",
                      "IT Infrastructure &amp; Networking",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements + Engagement Details */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            {/* Preferred Applicant Requirements */}
            <div className="bg-gray-50 border border-border p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-chart-2" />
                Preferred Applicant Profile
              </h3>
              <ul className="space-y-4">
                {[
                  "Strong practical experience in your area of specialisation.",
                  "Previous experience delivering corporate or institutional training.",
                  "Relevant professional or vendor certifications, where applicable.",
                  "Ability to customise programmes based on client needs and industry context.",
                  "Ability to deliver training in Arabic, English, or both.",
                  "Practical case studies, exercises, labs, or assessment methods.",
                ].map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-chart-2/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-chart-2" />
                    </div>
                    <span className="text-muted-foreground text-sm leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engagement Details */}
            <div className="bg-primary/5 border border-primary/20 p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary" />
                Engagement Details
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">Engagement Type</div>
                    <div className="text-muted-foreground text-sm">Freelance / Project-Based Roster</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Laptop className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">Delivery Mode</div>
                    <div className="text-muted-foreground text-sm">In-person, online, or hybrid</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">Location</div>
                    <div className="text-muted-foreground text-sm">Egypt and selected MENA assignments</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">Clients Served</div>
                    <div className="text-muted-foreground text-sm">Private sector, government entities, educational institutions, and development projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Block */}
          <div className="bg-foreground text-white p-12 text-center">
            <UserPlus className="w-12 h-12 text-chart-2 mx-auto mb-5" />
            <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Trainer Roster?
            </h3>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Selected professionals will join Darwish &amp; Co.'s trainer and subject-matter expert
              roster and may be contacted based on programme requirements, client needs, location,
              and availability.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeNflbSZl6T3fA95Sg5eMhFR-_dzx8Kl20VcYMg-S8aIwLOUg/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-chart-2 text-white hover:bg-chart-2/90 font-bold rounded-none px-10 h-14 text-base"
              >
                Apply to Join the Roster
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <p className="text-white/50 text-sm mt-5">
              Applications are reviewed on a rolling basis. Please share this opportunity with qualified trainers in your network.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
