import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

// ─── Chart helpers ────────────────────────────────────────────────────────────
// Each article can define inline chart blocks rendered via Chart.js
type ChartBlock = {
  type: "bar" | "doughnut" | "horizontalBar";
  title: string;
  caption: string;
  chartId: string;
  // serialised chart config passed to Chart.js
  config: object;
};

type ImageBlock = {
  src: string;
  alt: string;
  caption: string;
};

type Section = {
  heading?: string;
  body: string[];
  list?: string[];
  image?: ImageBlock;   // optional photo from DOCX
  chart?: ChartBlock;   // optional Chart.js diagram
};

type ArticleData = {
  slug: string;
  title: string;
  metaTitle: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  keywords: string[];
  coverImage: string;
  ctaText: string;
  ctaButton: string;
  sections: Section[];
};

// ─── Article data ─────────────────────────────────────────────────────────────
const articles: ArticleData[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // ARTICLE 1 — AI Human Oversight & Governance
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "ai-human-oversight-governance",
    title: "When AI Accelerates the Wrong Decision: Why Human Oversight Is a Governance Requirement",
    metaTitle: "Why AI Decisions Still Require Human Oversight",
    excerpt:
      "AI can accelerate decisions, but without effective governance, it can also scale outdated data, hidden bias, and institutional error. The central question is not whether to use AI — it is who remains responsible when an AI-supported decision causes harm.",
    date: "July 2026",
    readTime: "8 min read",
    category: "AI Governance",
    categoryColor: "text-primary bg-primary/10",
    keywords: ["AI human oversight", "AI governance", "automation bias", "responsible AI", "AI decision-making", "human-in-the-loop"],
    coverImage: "/images/article-ai-human-oversight-figure.webp",
    ctaText:
      "Is your organization using AI without a defined decision-governance framework? Darwish & Co. supports organizations in assessing AI readiness, prioritizing responsible use cases, and establishing practical governance principles linked to operational value.",
    ctaButton: "Assess Your AI Decision Governance",
    sections: [
      {
        body: [
          "Artificial intelligence is often presented as a way to make organizational decisions faster, more consistent, and more objective. In many cases, it can. AI systems can analyze large volumes of information, identify patterns, prioritize cases, generate recommendations, and reduce the time required to reach a decision.",
          "But speed is not the same as accuracy. Consistency is not the same as fairness. And an algorithmic recommendation is not the same as an accountable institutional decision.",
          "The greater the impact of a decision, the more dangerous it becomes to treat AI-generated output as an automatic instruction rather than one source of evidence within a governed decision process.",
        ],
        image: {
          src: "/images/article-ai-human-oversight-cover.webp",
          alt: "Executive reviewing AI-generated analytics dashboard with governance workflow",
          caption: "AI systems can surface powerful insights — but without human oversight, a confident-looking recommendation can mask flawed data, outdated assumptions, or hidden bias.",
        },
      },
      {
        heading: "What Under-Governed AI Really Means",
        body: [
          "Under-governed AI does not necessarily mean that a system operates without any human involvement. A person may still click the final approval button. A manager may still receive the recommendation. A committee may still officially authorize the decision.",
          "However, human involvement becomes meaningless when decision-makers cannot understand how the recommendation was produced, cannot verify the underlying data, do not know the system's confidence level, lack the authority or time to challenge the result, or automatically approve recommendations because they appear technically credible.",
          "In these situations, the organization may have a human in the process, but it does not have meaningful human oversight. Human oversight should not be a ceremonial approval stage. It should be an active control that can question, delay, reject, escalate, or reverse an AI-supported recommendation.",
        ],
      },
      {
        heading: "The Risk of Automation Bias",
        body: [
          "One of the most important risks in AI-supported decision-making is automation bias — the tendency to place excessive trust in recommendations generated by automated systems, particularly when the output appears precise, confident, or mathematically sophisticated.",
          "The algorithm does not remove weaknesses in the underlying data. It packages them in a form that may be harder to question. This creates a dangerous form of false objectivity: an error begins to appear neutral simply because it has been produced by a system.",
        ],
        chart: {
          type: "doughnut",
          chartId: "chart-automation-bias",
          title: "Where Automation Bias Enters the Decision Process",
          caption: "Research consistently shows that decision-makers override AI recommendations far less often than the error rate of those systems would warrant — a direct consequence of automation bias.",
          config: {
            type: "doughnut",
            data: {
              labels: [
                "Overconfidence in AI output",
                "Lack of explainability",
                "Time pressure on reviewers",
                "No authority to reject",
                "Missing escalation route",
              ],
              datasets: [{
                data: [28, 22, 20, 18, 12],
                backgroundColor: ["#1a56db", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6"],
                borderWidth: 2,
                borderColor: "#ffffff",
              }],
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: "right", labels: { font: { size: 12 }, padding: 16 } },
                tooltip: {
                  callbacks: {
                    label: (ctx: { label: string; parsed: number }) => ` ${ctx.label}: ${ctx.parsed}%`,
                  },
                },
              },
            },
          },
        },
      },
      {
        heading: "When Old Data Produces New Harm",
        body: [
          "AI systems are highly dependent on the quality and relevance of the information they process. An advanced model operating on unreliable data can produce a highly sophisticated version of the wrong answer.",
          "Consider a system that classifies a location, organization, supplier, employee, or student using data collected several years earlier. The model may perform exactly as designed. The failure is not necessarily technical — it may be institutional: nobody confirmed whether the data was still valid, warnings were ignored to meet a deadline, the decision process rewarded speed over verification.",
          "AI can accelerate these failures because it compresses the time between information, recommendation, and action. Without a governance checkpoint, an outdated assumption can become an operational decision within seconds.",
        ],
      },
      {
        heading: "Human Oversight Must Include the Power to Disagree",
        body: [
          "Organizations frequently state that their AI systems are subject to human review. That statement is not enough. Effective oversight requires more than the presence of a reviewer.",
        ],
        list: [
          "Access to Relevant Evidence — Decision-makers should be able to examine the most important data sources, assumptions, exceptions, and limitations behind the recommendation.",
          "Sufficient Time — A review process that gives a manager only a few seconds to approve hundreds of recommendations is not meaningful oversight. It is automated execution with a human signature.",
          "The Authority to Reject the Recommendation — Employees should not be penalized for challenging the system when evidence indicates that the recommendation may be wrong.",
          "Clear Escalation Routes — High-risk or uncertain cases should automatically move to a higher level of review rather than being processed as routine decisions.",
          "Accountability — The organization must define who owns the final decision. Responsibility cannot be transferred to the software, the vendor, the data team, or an unspecified algorithm.",
        ],
      },
      {
        heading: "A Practical AI Decision Governance Model",
        body: ["Organizations can reduce the risks of AI-supported decisions by introducing six governance controls."],
        list: [
          "Data Validation — Confirm where the data came from, when it was collected, whether it remains relevant, which populations may be underrepresented, and whether the data contains known historical bias.",
          "Risk Classification — Not every AI use case requires the same controls. The higher the potential harm, the stronger the oversight requirements should be.",
          "Explainability and Decision Context — Decision-makers should understand the factors that influenced the recommendation, the system's level of uncertainty, and known limitations.",
          "Meaningful Human Review — High-impact decisions should require documented human verification confirming the recommendation is consistent with current evidence and organizational policy.",
          "Decision Logging — Maintain an audit trail showing what the system recommended, who reviewed the case, whether the recommendation was accepted or rejected, and why.",
          "Continuous Monitoring — Regularly examine error rates, complaints and appeals, differences in outcomes between groups, override patterns, data drift, and unexpected consequences.",
        ],
        chart: {
          type: "bar",
          chartId: "chart-governance-controls",
          title: "Governance Control Strength by Decision Impact Level",
          caption: "Higher-impact decisions require proportionally stronger governance controls. This framework maps six control types against three decision-impact tiers.",
          config: {
            type: "bar",
            data: {
              labels: ["Data Validation", "Risk Classification", "Explainability", "Human Review", "Decision Logging", "Monitoring"],
              datasets: [
                {
                  label: "Low Impact",
                  data: [2, 1, 2, 1, 2, 1],
                  backgroundColor: "rgba(22, 163, 74, 0.6)",
                },
                {
                  label: "Medium Impact",
                  data: [3, 3, 3, 3, 3, 3],
                  backgroundColor: "rgba(245, 158, 11, 0.7)",
                },
                {
                  label: "High Impact",
                  data: [5, 5, 5, 5, 5, 5],
                  backgroundColor: "rgba(26, 86, 219, 0.8)",
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 6,
                  ticks: { display: false },
                  title: { display: true, text: "Control Strength Required" },
                },
              },
              plugins: {
                legend: { position: "top" },
                tooltip: {
                  callbacks: {
                    label: (ctx: { dataset: { label: string }; parsed: { y: number } }) =>
                      ` ${ctx.dataset.label}: ${["Minimal", "Basic", "Standard", "Enhanced", "Full"][ctx.parsed.y - 1] ?? ""}`,
                  },
                },
              },
            },
          },
        },
      },
      {
        heading: "The Executive Responsibility",
        body: [
          "AI governance is not only a technical responsibility. It is an executive and institutional responsibility. Technology teams can build and maintain systems. Data specialists can assess performance. Vendors can explain product capabilities. But leadership must decide which decisions should be automated, which decisions must remain human-led, what level of risk is acceptable, who can stop the process, and who remains accountable when the decision fails.",
          "Organizations should use AI to improve judgment, not to avoid judgment. The ultimate governance principle is simple: AI may inform the decision, but the institution must remain accountable for the outcome.",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "Artificial intelligence can help organizations analyze more information and respond more quickly. But without effective human oversight, it can also scale inaccurate data, hidden bias, and poor institutional judgment.",
          "Responsible AI is therefore not achieved by adding a final approval button. It requires a governed decision system in which humans can understand, challenge, document, and take responsibility for AI-supported recommendations. The strongest organizations will not be those that automate the greatest number of decisions — they will be those that know which decisions should never be automated without meaningful human judgment.",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ARTICLE 2 — AI in MENA Education
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "ai-bias-mena-education",
    title: "AI in MENA Education: When Automation Reinforces Existing Inequality",
    metaTitle: "AI Bias and Governance in MENA Education",
    excerpt:
      "AI can improve education across the MENA region, but biased historical data and weak institutional oversight may reinforce inequality in admissions, grading, scholarships, and student monitoring.",
    date: "July 2026",
    readTime: "9 min read",
    category: "AI & Education",
    categoryColor: "text-chart-2 bg-chart-2/10",
    keywords: ["AI in MENA education", "AI education governance", "algorithmic bias in education", "responsible AI in schools", "AI admissions", "automated grading"],
    coverImage: "/images/article-ai-bias-education-figure.webp",
    ctaText:
      "Is your educational institution exploring AI without a clear adoption and governance framework? Darwish & Co. supports educational institutions in assessing AI readiness, prioritizing practical use cases, strengthening governance, and building role-based capabilities for responsible adoption.",
    ctaButton: "Explore Responsible AI for Education",
    sections: [
      {
        body: [
          "Artificial intelligence has the potential to improve education across the Middle East and North Africa. Educational institutions can use AI to support personalized learning, reduce administrative workload, identify students requiring additional support, improve resource planning, and provide decision-makers with faster access to performance data.",
          "However, AI does not enter an educational system as a neutral force. It enters an existing institutional environment shaped by differences in access, income, geography, gender, language, disability, technology availability, and educational quality.",
          "When these differences are reflected in historical data, an AI system may reproduce them at scale. The risk is not simply that an algorithm might make an occasional mistake. The greater risk is that existing inequality becomes automated, standardized, and presented as an objective result.",
        ],
        image: {
          src: "/images/article-ai-bias-education-cover.webp",
          alt: "Students and educator at a MENA university campus using AI-enabled tablet technology",
          caption: "AI adoption in MENA education is accelerating — but without local validation and governance frameworks, systems trained on non-regional data may disadvantage the very students they are meant to support.",
        },
      },
      {
        heading: "Historical Data Is Not Automatically Fair Data",
        body: [
          "Most AI systems learn from historical information. In education, this information may include previous examination results, attendance records, school rankings, scholarship awards, university admissions, disciplinary records, family income, geographic location, student engagement data, and teacher assessments.",
          "These records describe what happened in the past. They do not necessarily represent what should happen in the future. For example, if students from a particular region historically received fewer educational opportunities, their performance data may reflect underinvestment rather than lower potential.",
          "An algorithm trained to identify 'high-potential' students using historical outcomes may therefore favor those who already benefited from stronger educational conditions. The system may not be intentionally discriminatory — but it can still convert unequal opportunity into a mathematical prediction.",
        ],
        chart: {
          type: "bar",
          chartId: "chart-bias-entry-points",
          title: "AI Bias Entry Points in Education Systems",
          caption: "Bias can enter at multiple stages of the AI pipeline in education — from the data collection phase through to the final decision output. Each stage requires a specific governance control.",
          config: {
            type: "bar",
            data: {
              labels: ["Data Collection", "Feature Selection", "Model Training", "Threshold Setting", "Output Review", "Appeals Process"],
              datasets: [{
                label: "Relative Bias Risk (1–10)",
                data: [8, 7, 9, 6, 4, 3],
                backgroundColor: [
                  "rgba(220, 38, 38, 0.75)",
                  "rgba(234, 88, 12, 0.75)",
                  "rgba(220, 38, 38, 0.85)",
                  "rgba(245, 158, 11, 0.75)",
                  "rgba(22, 163, 74, 0.7)",
                  "rgba(22, 163, 74, 0.6)",
                ],
                borderRadius: 4,
              }],
            },
            options: {
              indexAxis: "y",
              responsive: true,
              scales: {
                x: { beginAtZero: true, max: 10, title: { display: true, text: "Risk Level (1 = Low, 10 = High)" } },
              },
              plugins: { legend: { display: false } },
            },
          },
        },
      },
      {
        heading: "Where AI Bias Can Enter the Education System",
        body: [
          "Admissions and Student Selection — AI can be used to rank applicants, review documents, assess eligibility, or predict academic performance. These systems may reduce processing time, but they can also disadvantage students whose educational backgrounds do not match historical patterns of successful applicants. Without careful governance, the system may reward privilege while describing the result as academic merit.",
          "Scholarships and Financial Support — Scholarship systems often need to balance academic performance, financial need, geographic distribution, and institutional priorities. If earlier decisions contained bias, political influence, or unequal regional representation, the AI system may reproduce the same pattern.",
          "Automated Grading — Grading systems may perform differently across languages, writing styles, and cultural expressions. A model trained primarily on one linguistic or educational context may misunderstand valid answers produced in another. Automated grading should support educators, not remove professional judgment from the assessment process.",
          "Student Monitoring and Behavioral Analytics — A student who frequently changes devices, has inconsistent internet access, or interacts differently with an online platform may be classified as disengaged or high-risk. The system may interpret economic or technical barriers as behavioral problems.",
        ],
      },
      {
        heading: "The Regional Context Matters",
        body: [
          "AI governance frameworks cannot be imported without considering the realities of each educational environment. Across the MENA region, institutions operate under very different conditions. Some have advanced digital infrastructure and mature data systems. Others continue to rely on fragmented records, paper-based processes, inconsistent data collection, or limited technical resources.",
          "Language adds another layer of complexity. Many global AI systems are developed primarily using English-language data. Arabic includes different dialects, writing styles, educational terminology, and local contexts that may not be represented adequately in the model. A technically successful system in one market may therefore produce weaker or less equitable outcomes when transferred into another. Responsible adoption requires local testing, not assumptions.",
        ],
        chart: {
          type: "doughnut",
          chartId: "chart-mena-ai-readiness",
          title: "AI Readiness Dimensions in MENA Educational Institutions",
          caption: "Effective AI adoption in education requires readiness across five dimensions. Gaps in any area increase the risk of biased or inequitable outcomes.",
          config: {
            type: "doughnut",
            data: {
              labels: [
                "Digital Infrastructure",
                "Data Quality & Coverage",
                "Educator AI Literacy",
                "Governance Frameworks",
                "Local Language Support",
              ],
              datasets: [{
                data: [22, 20, 18, 25, 15],
                backgroundColor: ["#1a56db", "#16a34a", "#f59e0b", "#8b5cf6", "#ef4444"],
                borderWidth: 2,
                borderColor: "#ffffff",
              }],
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: "right", labels: { font: { size: 12 }, padding: 14 } },
              },
            },
          },
        },
      },
      {
        heading: "Responsible AI Principles for Educational Institutions",
        body: ["Educational institutions should establish clear controls before using AI in decisions that affect students."],
        list: [
          "Define the Decision Boundary — Determine what the system is allowed to do. Can it recommend? Can it rank? Can it reject? High-impact decisions should not be delegated entirely to an automated system.",
          "Conduct an Educational Impact Assessment — Before deployment, evaluate which students may benefit, which may be disadvantaged, and what the likely effects are on different demographic groups.",
          "Require Local Validation — Any AI system used in the MENA educational context should be tested on local data before deployment, not assumed to perform equivalently to results from other markets.",
          "Maintain Educator Authority — Teachers and administrators should retain the ability to review, challenge, and override AI recommendations. Professional judgment should not be subordinated to algorithmic output.",
          "Establish a Student Appeal Process — Students and families should have a clear route to request review of AI-influenced decisions, particularly in admissions, grading, and scholarship allocation.",
          "Monitor for Differential Outcomes — Institutions should regularly examine whether AI systems are producing different results for different student groups, and investigate the cause of any significant disparities.",
        ],
      },
      {
        heading: "The Institutional Responsibility",
        body: [
          "Educational institutions that adopt AI without adequate governance do not simply risk technical failure. They risk embedding and amplifying the inequalities that education is meant to reduce.",
          "The responsibility is institutional, not technical. Vendors can provide products. Data teams can assess performance. But institutional leadership must decide which values the system is required to reflect, which student populations must be protected, and who is accountable when the system produces an unfair result.",
          "AI can be a powerful tool for improving education in the MENA region. But its value depends entirely on the governance environment in which it is deployed.",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ARTICLE 3 — AI Institutional Bias
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "ai-institutional-bias-governance",
    title: "AI Does Not Eliminate Institutional Bias — It Can Scale It",
    metaTitle: "How AI Can Scale Institutional Bias and Weak Governance",
    excerpt:
      "Organizations invest in AI expecting more objective decisions. But AI learns from institutional data. If that data reflects unfair practices, weak governance, or corruption, the system may automate and accelerate those problems rather than fix them.",
    date: "July 2026",
    readTime: "10 min read",
    category: "AI Governance",
    categoryColor: "text-primary bg-primary/10",
    keywords: ["AI institutional bias", "AI and corruption", "AI governance", "algorithmic accountability", "public sector AI", "responsible digital transformation"],
    coverImage: "/images/article-ai-institutional-bias-figure.webp",
    ctaText:
      "Before automating an institutional process, verify that the process is ready to be automated. Darwish & Co. supports organizations in reviewing AI readiness, process maturity, governance controls, use-case risk, and implementation priorities.",
    ctaButton: "Request an Institutional AI Governance Review",
    sections: [
      {
        body: [
          "Organizations frequently invest in artificial intelligence with the expectation that technology will make decisions more objective. The assumption is understandable. Unlike people, an algorithm does not have personal relationships, political loyalties, emotional reactions, or financial interests.",
          "But this does not mean that the decisions produced by the system are neutral. AI learns from institutional data. It operates within institutional rules. It reflects institutional priorities. And it is deployed through institutional processes.",
          "If those processes are unfair, inconsistent, politically influenced, poorly documented, or vulnerable to corruption, AI will not automatically correct them. It may make them faster, less visible, and more difficult to challenge.",
        ],
        image: {
          src: "/images/article-ai-institutional-bias-cover.webp",
          alt: "MENA governance professionals reviewing AI-driven institutional workflow and process documentation",
          caption: "AI-driven governance workflows can dramatically improve institutional efficiency — but only when the underlying processes are fair, well-documented, and free from systemic bias before automation begins.",
        },
      },
      {
        heading: "AI Learns from What the Institution Has Done",
        body: [
          "Machine-learning systems identify patterns in historical data. In a well-governed institution, historical data may provide a useful basis for forecasting demand, allocating resources, identifying risk, or improving operations.",
          "But historical records may also reflect preferential treatment, unequal access, inconsistent enforcement, informal influence, unexplained exceptions, political pressure, weak documentation, manipulated performance indicators, and procurement decisions shaped by relationships rather than value.",
          "When AI learns from these records, it may interpret abnormal institutional behavior as the normal pattern that should be repeated. For example, imagine an organization using historical procurement data to recommend preferred suppliers. If previous supplier selections were influenced by personal relationships or incomplete competition, the model may continue recommending the same suppliers. The recommendation may appear data-driven. In reality, the system has learned the history of institutional favoritism.",
        ],
        chart: {
          type: "bar",
          chartId: "chart-bias-amplification",
          title: "How AI Amplifies Existing Institutional Bias Over Time",
          caption: "Without governance intervention, AI systems trained on biased historical data tend to amplify disparities in each decision cycle — creating a self-reinforcing loop that is harder to detect and correct over time.",
          config: {
            type: "bar",
            data: {
              labels: ["Cycle 1", "Cycle 2", "Cycle 3", "Cycle 4", "Cycle 5"],
              datasets: [
                {
                  label: "Advantaged Group",
                  data: [55, 62, 70, 79, 88],
                  backgroundColor: "rgba(26, 86, 219, 0.75)",
                  borderRadius: 4,
                },
                {
                  label: "Disadvantaged Group",
                  data: [45, 38, 30, 21, 12],
                  backgroundColor: "rgba(239, 68, 68, 0.7)",
                  borderRadius: 4,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  stacked: false,
                  title: { display: true, text: "Resource / Opportunity Share (%)" },
                },
                x: { title: { display: true, text: "AI Decision Cycle" } },
              },
              plugins: { legend: { position: "top" } },
            },
          },
        },
      },
      {
        heading: "How Bias Becomes Automated",
        body: [
          "Institutional bias does not always appear as an explicit instruction. An organization rarely tells a system to favor connected individuals or well-resourced institutions. Bias often enters indirectly through variables that appear operationally reasonable.",
          "A resource-allocation model may use historical spending, previous performance, existing infrastructure, past funding absorption, and previous compliance records. Each variable may appear legitimate. But institutions that historically received more resources are more likely to have stronger infrastructure, higher capacity, and better performance records. A model optimizing for past performance may therefore direct additional resources toward already advantaged institutions, while underfunded organizations continue to receive less support because their historical data shows weaker results. The algorithm turns a historical imbalance into a self-reinforcing cycle.",
        ],
      },
      {
        heading: "The Black Box as an Accountability Shield",
        body: [
          "One of the most serious risks of institutional AI is not only that the system may produce an unfair decision. It is that the system can make responsibility less visible. When decision-makers are challenged, they may claim: 'The system generated the ranking. The software identified the risk. The model selected the supplier. The algorithm recommended the allocation.'",
          "This language creates the impression that the decision was technical and unavoidable. But every AI system reflects human decisions: which problem the system was asked to solve, which data was included or excluded, which outcome was optimized, and who approved deployment. The algorithm does not remove institutional responsibility. It can only make that responsibility easier to hide when governance is weak.",
        ],
      },
      {
        heading: "AI Procurement Is a Governance Issue",
        body: [
          "Organizations often focus on what an AI product can do. They pay less attention to how the product was selected, evaluated, contracted, and monitored. An AI procurement process that evaluates only features and price is incomplete. The organization is not simply purchasing software. It is introducing a new decision-making actor into its operating model.",
        ],
        list: [
          "What data was used to develop the system?",
          "Has the system been tested in our market and language?",
          "Can the organization independently audit the outputs?",
          "Who owns the data and generated insights?",
          "Can decisions be explained to regulators, employees, citizens, or customers?",
        ],
      },
      {
        heading: "The Problem Must Be Fixed Before It Is Automated",
        body: [
          "Digital transformation initiatives often begin with a desire to automate existing processes. But automating a weak process does not make it strong. It makes the weakness faster.",
          "Before deploying AI, organizations should examine whether the underlying process is clearly documented, consistently applied, legally and ethically defensible, supported by reliable data, protected from conflicts of interest, subject to review and appeal, and owned by an accountable role. Where these conditions are missing, process redesign should come before automation.",
        ],
      },
      {
        heading: "Six Controls for Institutional AI Governance",
        body: ["Organizations can significantly reduce institutional AI risk by implementing these six governance controls:"],
        list: [
          "Process Integrity Review — Before selecting a technology, review the process the system will support. Identify exceptions, informal practices, approval gaps, conflicts of interest, and areas of inconsistent application.",
          "Data Provenance — Know where each important data source originated, who entered or approved the information, whether the data can be verified, and whether it contains unexplained gaps or manipulation.",
          "Segregation of Duties — No single individual or department should control the data, model configuration, approval process, and final decision. Roles should be separated to reduce manipulation and strengthen review.",
          "Independent Audit — High-impact systems should be reviewed by parties independent from the system owner and vendor. Audits should examine data quality, bias, security, governance, performance, and decision outcomes.",
          "Decision and Override Logs — Every significant AI-supported decision should leave a trace. Document the recommendation, reviewer, final decision, justification, and any override.",
          "Accessible Appeals and Reporting — Affected employees, suppliers, students, citizens, or customers should have a route to request review or report suspected unfairness.",
        ],
        chart: {
          type: "bar",
          chartId: "chart-governance-maturity",
          title: "Institutional AI Governance Maturity Model",
          caption: "Organizations progress through four maturity levels in AI governance. Most institutions in the MENA region currently operate at Level 1 or 2 — creating significant risk exposure for high-impact AI deployments.",
          config: {
            type: "bar",
            data: {
              labels: ["Process Integrity", "Data Provenance", "Duty Segregation", "Independent Audit", "Decision Logging", "Appeals Process"],
              datasets: [
                { label: "Level 1 — Ad Hoc", data: [1, 1, 1, 0, 1, 0], backgroundColor: "rgba(239, 68, 68, 0.7)", borderRadius: 3 },
                { label: "Level 2 — Defined", data: [1, 1, 1, 1, 1, 1], backgroundColor: "rgba(245, 158, 11, 0.7)", borderRadius: 3 },
                { label: "Level 3 — Managed", data: [1, 1, 1, 1, 1, 1], backgroundColor: "rgba(22, 163, 74, 0.65)", borderRadius: 3 },
                { label: "Level 4 — Optimized", data: [1, 1, 1, 1, 1, 1], backgroundColor: "rgba(26, 86, 219, 0.75)", borderRadius: 3 },
              ],
            },
            options: {
              responsive: true,
              scales: {
                x: { stacked: true },
                y: { stacked: true, max: 4, ticks: { stepSize: 1 }, title: { display: true, text: "Maturity Level" } },
              },
              plugins: { legend: { position: "top" } },
            },
          },
        },
      },
      {
        heading: "AI Governance Is Part of Institutional Governance",
        body: [
          "AI governance should not operate as an isolated technical policy. It should connect with corporate governance, risk management, procurement, compliance, data protection, internal audit, human resources, performance management, ethics and integrity, and crisis and reputation management.",
          "This is especially important in public institutions, development programs, education systems, healthcare organizations, and regulated industries. The stronger the impact on people and public resources, the stronger the governance framework must be.",
          "AI can be a powerful instrument for institutional improvement. But it will only deliver that value in organizations that are willing to govern it with the same rigor they apply to their most consequential institutional decisions.",
        ],
      },
    ],
  },
];

// ─── Chart renderer component ─────────────────────────────────────────────────
function ArticleChart({ block }: { block: ChartBlock }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartInstance: unknown = null;

    const initChart = async () => {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      if (!canvasRef.current) return;
      // Destroy existing instance if any
      const existing = Chart.getChart(canvasRef.current);
      if (existing) existing.destroy();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chartInstance = new Chart(canvasRef.current, block.config as any);
    };

    initChart();

    return () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        import("chart.js").then(({ Chart }) => {
          const existing = Chart.getChart(canvas);
          if (existing) existing.destroy();
        });
      }
    };
  }, [block.chartId]);

  return (
    <div className="my-10 border border-border p-6 bg-secondary/20">
      <h3 className="font-heading text-base font-bold text-foreground mb-4">{block.title}</h3>
      <div style={{ height: "300px" }}>
        <canvas ref={canvasRef} />
      </div>
      <p className="text-xs text-muted-foreground mt-3 italic border-t pt-3">{block.caption}</p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center gap-6 font-body">
        <h1 className="font-heading text-3xl font-bold text-foreground">Article not found</h1>
        <Link href="/blog">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-body bg-white">
      {/* Hero */}
      <section className="relative">
        <div className="w-full h-72 md:h-96 overflow-hidden">
          <img
            src={article.coverImage}
            loading="lazy"
            decoding="async"
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container max-w-4xl mx-auto">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${article.categoryColor}`}>
              {article.category}
            </span>
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <div className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container max-w-4xl mx-auto py-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link href="/blog">
            <span className="flex items-center gap-1 text-primary font-medium hover:underline cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> All Articles
            </span>
          </Link>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {article.readTime}
          </span>
          <div className="flex flex-wrap gap-2 ml-auto">
            {article.keywords.slice(0, 3).map((kw) => (
              <span key={kw} className="flex items-center gap-1 text-xs bg-secondary px-2 py-0.5 rounded-full">
                <Tag className="w-3 h-3" /> {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="py-16">
        <div className="container max-w-3xl mx-auto">
          {/* Lead */}
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 font-light border-l-4 border-primary pl-6">
            {article.excerpt}
          </p>

          {/* Sections */}
          {article.sections.map((section, i) => (
            <div key={i} className="mb-10">
              {section.heading && (
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4 mt-10">
                  {section.heading}
                </h2>
              )}
              {section.body.map((para, j) => (
                <p key={j} className="text-base text-foreground/80 leading-relaxed mb-4">
                  {para}
                </p>
              ))}
              {/* DOCX image */}
              {section.image && (
                <figure className="my-8">
                  <img
                    src={section.image.src}
                    loading="lazy"
                    decoding="async"
                    alt={section.image.alt}
                    className="w-full object-cover"
                    style={{ maxHeight: "420px" }}
                  />
                  <figcaption className="text-xs text-muted-foreground mt-2 italic border-l-2 border-primary/40 pl-3">
                    {section.image.caption}
                  </figcaption>
                </figure>
              )}
              {section.list && (
                <ul className="mt-4 space-y-3">
                  {section.list.map((item, k) => {
                    const [label, ...rest] = item.split(" — ");
                    return (
                      <li key={k} className="flex gap-3">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                        <span className="text-foreground/80 leading-relaxed">
                          {rest.length > 0 ? (
                            <>
                              <strong className="text-foreground">{label}</strong>
                              {" — "}
                              {rest.join(" — ")}
                            </>
                          ) : (
                            item
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
              {/* Chart.js diagram */}
              {section.chart && <ArticleChart block={section.chart} />}
            </div>
          ))}

          {/* Divider */}
          <div className="my-16 border-t" />

          {/* CTA block */}
          <div className="bg-primary/5 border border-primary/20 p-8 space-y-4">
            <p className="text-base text-foreground/80 leading-relaxed">{article.ctaText}</p>
            <Link href="/contact">
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-none font-bold">
                {article.ctaButton} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Back */}
          <div className="mt-12">
            <Link href="/blog">
              <Button variant="outline" className="rounded-none border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Articles
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
