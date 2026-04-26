import { useState, useEffect } from "react";
import { Users, Linkedin, Mail, Briefcase, Search, Globe, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Partner = {
  id: number;
  name: string;
  title: string;
  specialisation: string | null;
  bio: string | null;
  email: string | null;
  linkedin: string | null;
  website: string | null;
  photoUrl: string | null;
  certifications: string[];
  displayOrder: number;
  isVisible: boolean;
  createdAt: number;
};

// Verified real consultants — sourced from official CVs and company profiles
const VERIFIED_PARTNERS: Partner[] = [
  {
    id: 1,
    name: "Fouad Ismail Fouad Darwish",
    title: "Managing Partner — Political & Strategic Consultant",
    specialisation: "Anti-Corruption, Governance & Peacebuilding",
    bio: "Political and strategic consultant with over 20 years of experience at the intersection of anti-corruption policy, governance reform, and international relations. Former Director of the Research Centre for the Prevention and Combating of Corruption (CRSPCC) at the Egyptian Academy for Anti-Corruption, and former Director-General of Human Resources & Institutional Development at the Egyptian Space Agency (EgSA). Served for 15 years with Egypt's Administrative Control Authority (ACA) across roles in international cooperation, data analytics, and forensic investigation. Holds an MA in Political Science from Cairo University (thesis: corruption as a foreign policy variable — Ukraine case study), with a PhD in Political Science currently in progress. Published researcher and speaker on national anti-corruption strategy, forensic investigation, and public sector ethics. Deputy Editor of the Journal of Governance for the Prevention and Combating of Corruption (JGPCC).",
    email: "fouadarwish@gmail.com",
    linkedin: "https://linkedin.com/in/fouadarwish",
    website: null,
    photoUrl: null,
    certifications: [
      "PMP — Arab Academy for Science, Technology & Maritime Transport",
      "Certificate of Data Analysis for Business — IMP (Excel & Power BI, 40hrs)",
      "Digital Technologies in Anti-Corruption Policy — UNDP (2025)",
      "Anti-Corruption Programme — ENA France (2018)",
      "Corruption Risk Management — MACA Malaysia (2015)",
      "Advanced Cybercrime Investigations — UNODC (2015)",
    ],
    displayOrder: 0,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 2,
    name: "Sherin Hamouda Ibrahim",
    title: "Senior Consultant — Project Management & Quality",
    specialisation: "Project Management, IT & Construction",
    bio: "Senior project manager and strategic leader with over 26 years of experience spanning Information Technology and the Construction industry. Most recently served as Senior Project Lead at MetLife Egypt (2013–2025), managing complex multi-phase IT and business transformation projects. Previously Quality Control & QA Manager and Deputy Projects Manager at Talent Engineering Company (Egypt & UAE), where she led the company's ISO 9001:2008 certification programme as Management Representative. Holds an MBA in Globalisation & International Business from Maastricht School of Management (Netherlands), a BSc in Civil Engineering from Mansoura University, and a PMP® certification from PMI (USA). Also holds ASCE Certified Construction Project Manager (CPM), Professional Certified Trainer (PCT), and SAFe® 6 Scrum Master (SSM) credentials. Nominated by MetLife senior management to represent Egypt at the EMEA Emerging Women Leaders' Summit (Warsaw, 2016) and the EMEA Leadership & Innovation Summit (Lisbon, 2014).",
    email: "Sherin.Teg@gmail.com",
    linkedin: "https://www.linkedin.com/in/sherin-hamouda",
    website: null,
    photoUrl: null,
    certifications: [
      "PMP® — Project Management Institute, USA (#1728179)",
      "SAFe® 6 Scrum Master (SSM) — Scaled Agile, USA (2024)",
      "ASCE Certified Construction Project Manager (CPM) — AUC",
      "Professional Certified Trainer (PCT) — AUC",
      "ISO 9001 Lead Auditor — IRCA (Ref. A17497)",
    ],
    displayOrder: 1,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 3,
    name: "Teh Chau Chin",
    title: "Principal Consultant — Anti-Corruption & Risk Advisory",
    specialisation: "GRC, Anti-Bribery & Enterprise Risk Management",
    bio: "Principal Consultant and co-founder of VisionEthics Advisory Services Sdn Bhd (Malaysia), with over 25 years of experience in financial and internal audits, enterprise risk management, and governance, risk & compliance (GRC) advisory. Former Executive Director at KPMG Bangkok and Associate Director at KPMG Malaysia (Risk Advisory & Compliance Services). Served as Chief Risk Officer of a public listed company in Malaysia. Completed a 2-year Contract for Service with the Malaysian Anti-Corruption Commission (MACC), where he was one of three core team members who developed the Corruption Risk Management (CRM) methodology — later adopted as Malaysian Standard MS 2764:2022. Represented MACC in the Jabatan Standard Malaysia working group that made the CRM methodology an international standard. Certified HRDF Trainer and qualified Chartered Accountant (MIA). Works closely with Boards and senior management on ISO 37001 Anti-Bribery Management Systems, Adequate Procedures (S17A MACC Act), OACP development, and ERM frameworks.",
    email: "chauchin.teh@visionethics.com",
    linkedin: null,
    website: "https://visionethics.com",
    photoUrl: null,
    certifications: [
      "Chartered Accountant — Malaysian Institute of Accountants (MIA)",
      "Certified HRDF Trainer — HRD Corporation Malaysia",
      "ISO 37001 ABMS Specialist",
      "MS 2764:2022 CRM — Co-developer (MACC / Jabatan Standard Malaysia)",
    ],
    displayOrder: 2,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 4,
    name: "Ahmed Barakat",
    title: "HR Consultant & Educator — People Analytics Specialist",
    specialisation: "Human Resources, People Analytics & Talent Management",
    bio: "Experienced Human Resources educator and practitioner with a strong track record in professional training, higher education, and corporate HR leadership. Combines deep practical HR expertise with advanced teaching capability to deliver engaging, business-focused learning in HR Analytics, People Analytics, Organisational Development, Total Rewards, and Talent Management. Delivers SHRM-CP/SCP preparation and the ACHRM programme for AUC School of Business Executive Education, Morgan International, and Tharwah Training Institute (Riyadh). Previously HR Section Head at HCPC-CLX JV (Clorox Egypt) and HR Manager at Barminco Egypt. Holds a Post Graduate Program in Data Science & Business Analytics from the University of Texas (2024) and a SHRM-SCP certification. Skilled in Power BI, Tableau, SQL, and Python for data-driven HR decision-making.",
    email: "a.bahaaeldin@aucegypt.edu",
    linkedin: "https://www.linkedin.com/in/ahmed-barakat-1397712",
    website: null,
    photoUrl: null,
    certifications: [
      "SHRM-SCP — Society for Human Resource Management (2022)",
      "Post Graduate Program in Data Science & Business Analytics — University of Texas (2024)",
      "ACHRM Instructor — SHRM",
      "BSc Systems & Computers Engineering — Al-Azhar University",
    ],
    displayOrder: 3,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 5,
    name: "Ahmed Mohamed",
    title: "Principal Advisor — Executive GRC, Financial Crime & Sovereign Governance",
    specialisation: "Enterprise Risk Management, Business Modeling & Anti-Corruption",
    bio: "Sovereign Governance Architect and Strategic Risk Advisor with over 25 years of elite, multi-jurisdictional leadership spanning Enterprise Risk Management (ERM), Financial Crime Mitigation, Anti-Corruption Enforcement, and Institutional Transformation. He brings deep operational authority in Enterprise Fraud Risk Management (EFRM) within the banking sector, having architected enterprise fraud prevention frameworks, directed forensic investigations, and led high-stakes structural interventions across major financial institutions. A former Lieutenant Colonel at Egypt's Administrative Control Authority (ACA), he directed complex transnational financial crime investigations in direct collaboration with UNODC and ICPO–INTERPOL. During his tenure, he authored institutional architecture blueprints that drove the restructuring and merger of key government ministries. He subsequently pioneered the first integrated Risk & Crisis Management Unit at the Egyptian Ministry of Electricity and Renewable Energy, authoring ten foundational institutional guides—covering Strategy, ERM, Crisis Management, and Process Optimization—and training a specialized cohort into sector-leading experts. He holds practitioner-level mastery of COSO ERM, ISO 31000, ISO 22301, UNCAC, Basel III/IV, the Sendai Framework, and Lean Six Sigma (DMAIC/DMADV). Crucially, this technical rigor is complemented by advanced executive education in Business Management, Business Modeling, and CEO-level strategy. This dual proficiency allows him to align stringent sovereign de-risking and Public-Private Partnership (PPP) integrity assurance with sustainable commercial growth. A TOT-certified executive trainer, his operational background includes investigative leadership during high-profile national security events, underpinning a career defined by building resilience in the face of complex, systemic threats.",
    email: null,
    linkedin: "https://www.linkedin.com/in/ahmed-mohamed-executive-grc-financial-crime-advisor/",
    website: null,
    photoUrl: null,
    certifications: [
      // Executive GRC & Sovereign Resilience
      "Diploma in Enterprise Risk Management (ERM) — Bespoke Learning Solutions",
      "Executive Training on Good Governance & Digitalization — Hertie School, Germany",
      "Directors of Ministries Crisis Management Certification — Nasser Higher Military Academy",
      "Advanced Anti-Corruption Certification — UNODC",
      // Financial Crime & Forensic Investigation
      "Financial Investigation Methods Certification — French Interior Ministry",
      "Corruption Risk Management Workshop — Malaysian Anti-Corruption Academy (MACA)",
      // Executive Strategy & Business Modeling
      "Executive Diploma: CEO Program — MTF Institute of Management, Technology and Finance",
      "Executive Diploma in Business Management — MTF Institute of Management, Technology and Finance",
      "Professional Diploma in Business Models Development — MTF Institute of Management, Technology and Finance",
      // Operational Excellence & Capacity Building
      "Lean Six Sigma Green Belt — OPEXLEADER",
      "Lean Six Sigma Yellow Belt — Council for Six Sigma Certification (CSSC)",
      "Certified Training of Trainers (TOT) — Leadership Development Centre / EEHC",
    ],
    displayOrder: 4,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 6,
    name: "Dr. Amr Mohamed Fouad",
    title: "Senior Consultant — HR Digital Transformation & Organisational Development",
    specialisation: "HR Digital Transformation, ERP Implementation & Organisational Restructuring",
    bio: "Visionary HR and organisational transformation executive with over 19 years of progressive experience in Egypt's oil and gas sector, currently serving as Assistant General Manager at ENPPI (Engineering for Petroleum & Process Industries). Expert in leading enterprise-wide digital HR transformation, ERP implementations (SAP HCM & Oracle), and large-scale organisational restructuring programmes impacting up to 400,000 employees across EGPC subsidiaries. Holds a Doctorate in Business Administration (DBA) in Organisational Restructuring and an MBA in Human Resources Management from the Arab Academy for Science, Technology & Maritime Transport, complemented by a Certified Professional Trainer of Trainers (TOT) credential. His doctoral thesis — officially approved by ENPPI's Chairman and personally recognised by the CEO — used the company as a case study to explore applied restructuring frameworks. Founding academic team leader and Board Member of the ENPPI Applied Technology School of Artificial Intelligence. Published researcher with a 2023 paper on 'The Impact of Organisational Restructuring on Job Satisfaction and Productivity' in the Academic Journal of Contemporary Research, Cairo University. A bilingual (Arabic–English) leader known for integrating technology with strategy and driving sustainable, high-impact transformation across complex organisations.",
    email: "amrmohamedfouad@yahoo.com",
    linkedin: "https://linkedin.com/in/dr-amr-fouad-27232a141",
    website: null,
    photoUrl: null,
    certifications: [
      "DBA, Organisational Restructuring — Arab Academy for Science, Technology & Maritime Transport (2023)",
      "MBA, Human Resources Management — Arab Academy for Science, Technology & Maritime Transport (2018)",
      "Certified Professional Trainer of Trainers (TOT) — Eslesca University (2025)",
      "BSc, Commerce — Ain Shams University (2004)",
      "Best Employee Award — ENPPI (2013 & 2020)",
    ],
    displayOrder: 5,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 8,
    name: "Engy Saeed Morsy Ahmed",
    title: "Finance & Investment Consultant — Financial Analysis & Education",
    specialisation: "Financial Analysis, Investment Advisory & Finance Education",
    bio: "Finance and investment professional with over 20 years of experience spanning capital markets, corporate finance, investment analysis, and financial education. Currently serves as Investment Analyst at Al-Monairy Group and Board Member at Osool Holding, where she leads investment research, financial modelling, risk assessment, and macro-economic analysis. Previously Senior Financial Analyst at Osool ESB for Securities Brokerage (2005–2025), providing equity research, market commentary, and financial analysis to institutional and retail clients — including live appearances on CNBC Arabia, Al Arabiya, and Saudi Ektesadiya. Parallel to her investment career, she is an active finance educator: Finance Instructor at Beltone Academy and ESLSCA University, teaching Finance and Statistics to DBA candidates, and Business Studies for IGCSE students. Assistant Lecturer at Cairo University's Faculty of Engineering (Finance for Entrepreneurs and Finance for MBA students). Conducted the Finance for Non-Financials Workshop at the ESLSCA Executive Education Summit (2025). Winner of the Egyptian Ministry of Investment research competition (2008) for her study on the Egyptian Stock Market's effect on economic growth. DBA Researcher at Cairo University (in progress), holds an MBA in International Business from ESLSCA Business School (GPA 3.90, specialisation: Global Finance) and a BSc in Economics from Cairo University. Owner and co-founder of Stars Kids Club (2018–present).",
    email: "engy.saeed@gmail.com",
    linkedin: null,
    website: null,
    photoUrl: null,
    certifications: [
      "MBA in International Business (Global Finance) — ESLSCA Business School (GPA 3.90)",
      "DBA Researcher — Cairo University (In Progress)",
      "BSc Economics — Faculty of Economics & Political Sciences, Cairo University",
      "Introduction to Teaching Business Studies for IGCSE Students — Cambridge (2025)",
      "Digital Teacher Training Program — Ain Shams University (2023)",
      "Integrated Fundamental Analysis & Equity Valuation — ECMA (2006)",
      "Essentials of Technical Analysis of Stock Markets — Osool ESB (2010)",
      "Member, Syndicate of Commercials",
    ],
    displayOrder: 7,
    isVisible: true,
    createdAt: 0,
  },
  {
    id: 7,
    name: "Mohamed Ahmed Abdelsattar",
    title: "Strategic Media & Technical Operations Consultant",
    specialisation: "Digital Media, Strategic Communications & Generative AI",
    bio: "Digital media and communications professional with a distinguished 23-year career in the Egyptian Armed Forces Signal Corps, combining deep technical expertise in Automated Command & Control (C2) and wireless communication systems with extensive strategic media, public relations, and event management leadership. Currently WCS Technical Manager at Seniors Consultation (Diehl Defense Egypt) and Media & PR Executive Director at Innovera Software. Previously Media Director at the Future of Egypt Sustainable Development Authority. Visiting Lecturer at Cairo University's Faculty of Mass Communication, the Egyptian Chinese University, and the Arab Youth Media Creativity Summit, delivering specialised courses in Digital Marketing and Generative AI in Content Creation. Member of the Central Secretariat for AI at the National Front Party. Holds an MBA from AASTMT, a Master's in Digital Media and Information Security from Cairo University, and a DBA currently in progress at Helwan University. Certified in Digital Marketing (Udacity), Networking Essentials (CISCO), and holds a US Army Signal Captain Career Course Diploma. Expert in Adobe Creative Cloud, Generative AI tools, and multi-platform digital strategy.",
    email: "Mohammed.a.abdelsattar@gmail.com",
    linkedin: "https://linkedin.com/in/m0abdelsattar",
    website: null,
    photoUrl: null,
    certifications: [
      "MBA — Arab Academy for Science, Technology & Maritime Transport (AASTMT)",
      "MSc Digital Media & Information Security — Cairo University",
      "DBA — Helwan University (In Progress)",
      "Diploma in Signal Captain Career Course — US Army, USA (2014)",
      "Digital Marketing Professional — Udacity (2022)",
      "Networking Essentials — CISCO (2022)",
      "Digital Transformation Essentials Certificate — FDTC (2024)",
      "Management & Maintenance of Missile Communications System — DIEHL Defense, Germany (2022)",
    ],
    displayOrder: 6,
    isVisible: true,
    createdAt: 0,
  },
];

function CertBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-primary/5 text-primary border border-primary/20 px-2 py-0.5 font-medium">
      <Award className="w-3 h-3 flex-shrink-0" />
      {text}
    </span>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const [showCerts, setShowCerts] = useState(false);

  const initials = partner.name
    .split(" ")
    .filter((w) => /^[A-Za-z\u0600-\u06FF]/.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isFirst = partner.displayOrder === 0;

  return (
    <div
      className={cn(
        "group bg-white border hover:shadow-xl transition-all duration-300 flex flex-col",
        isFirst
          ? "border-primary/50 shadow-md ring-1 ring-primary/20"
          : "border-border hover:border-primary/30"
      )}
    >
      {/* Top accent */}
      <div
        className={cn(
          "h-1.5 w-full transition-colors duration-300",
          isFirst ? "bg-primary" : "bg-muted group-hover:bg-primary/60"
        )}
      />

      <div className="p-6 space-y-4 flex flex-col flex-1">
        {/* Avatar + Name */}
        <div className="flex items-start gap-4">
          {partner.photoUrl ? (
            <img
              src={partner.photoUrl}
              alt={partner.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-border flex-shrink-0"
            />
          ) : (
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 border-2 font-bold text-lg font-heading",
                isFirst
                  ? "bg-primary text-white border-primary"
                  : "bg-primary/10 text-primary border-primary/20"
              )}
            >
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-bold text-foreground text-lg leading-tight">
                {partner.name}
              </h3>
              {isFirst && (
                <span className="flex-shrink-0 text-xs font-bold bg-primary text-white px-2 py-0.5 uppercase tracking-wide">
                  Managing Partner
                </span>
              )}
            </div>
            <p
              className={cn(
                "text-sm font-semibold mt-0.5",
                isFirst ? "text-primary" : "text-primary/80"
              )}
            >
              {partner.title}
            </p>
            {partner.specialisation && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Briefcase className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-muted-foreground">{partner.specialisation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {partner.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4 flex-1">
            {partner.bio}
          </p>
        )}

        {/* Certifications toggle */}
        {partner.certifications.length > 0 && (
          <div className="border-t border-border pt-3 space-y-2">
            <button
              onClick={() => setShowCerts(!showCerts)}
              className="text-xs font-semibold text-primary hover:underline transition-colors"
            >
              {showCerts
                ? "Hide certifications ▲"
                : `View ${partner.certifications.length} certifications ▼`}
            </button>
            {showCerts && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {partner.certifications.map((cert) => (
                  <CertBadge key={cert} text={cert} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contact Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
          {partner.email && (
            <a
              href={`mailto:${partner.email}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          )}
          {partner.linkedin && (
            <a
              href={partner.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          )}
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/partners")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setPartners(json.data);
        } else {
          setPartners(VERIFIED_PARTNERS);
        }
      })
      .catch(() => setPartners(VERIFIED_PARTNERS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.specialisation ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen font-body">
      {/* Hero */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-secondary/30 to-transparent z-0" />
        <div className="container relative z-10">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Our People
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Partners &<br />
              <span className="text-primary">Consultants</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              The professionals behind Darwish & Co. — a curated network of senior consultants,
              subject-matter experts, and strategic advisors committed to delivering results across
              the MENA region and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Search + Grid */}
      <section className="py-16 bg-muted/20">
        <div className="container">
          {/* Search bar */}
          <div className="max-w-md mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, title, or specialisation…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-none border-border focus-visible:ring-primary"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No consultants found</p>
              <p className="text-sm mt-1">Try adjusting your search terms.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          )}

          {/* Join CTA */}
          <div className="mt-16 border border-dashed border-primary/40 bg-primary/5 p-8 text-center space-y-4">
            <h3 className="font-heading text-xl font-bold text-foreground">
              Interested in joining our network?
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              We are always looking for experienced consultants and subject-matter experts to
              collaborate with. Reach out and let's explore how we can work together.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
