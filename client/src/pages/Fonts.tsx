export default function Fonts() {
  const fonts = [
    {
      name: "Fustat",
      role: "Hero / Navbar Brand",
      stack: "'Fustat', sans-serif",
      weights: [
        { label: "Regular 400", weight: 400 },
        { label: "Bold 700", weight: 700 },
        { label: "ExtraBold 800", weight: 800 },
      ],
      color: "#1A73E8",
      description:
        "Used in the liquid-glass navbar logo, hero headings, and the animated brand tagline. A modern geometric Arabic-Latin typeface with strong personality — chosen to reflect the firm's MENA identity.",
      pangram: "A Wise Word In The Right Moment.",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789",
    },
    {
      name: "Playfair Display",
      role: "Section Headings (font-heading)",
      stack: "'Playfair Display', serif",
      weights: [
        { label: "Regular 400", weight: 400 },
        { label: "SemiBold 600", weight: 600 },
        { label: "Bold 700", weight: 700 },
      ],
      color: "#0D47A1",
      description:
        "Mapped to the Tailwind `font-heading` utility class and used for all major section titles across Services, Projects, Partners, and About pages. A high-contrast transitional serif that conveys authority and professionalism.",
      pangram: "Strategic Management & GRC Consulting for MENA SMEs.",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789",
    },
    {
      name: "Inter",
      role: "Body / UI (primary body font)",
      stack: "'Inter', sans-serif",
      weights: [
        { label: "Light 300", weight: 300 },
        { label: "Regular 400", weight: 400 },
        { label: "Medium 500", weight: 500 },
        { label: "SemiBold 600", weight: 600 },
      ],
      color: "#2ECC71",
      description:
        "The primary body font applied to the `<body>` element and used throughout the hero section, liquid-glass navbar links, CTA buttons, and all inline UI text. Optimised for screen legibility at small sizes.",
      pangram: "Empowering SMEs in the MENA region with expert advisory in governance, risk, compliance, and HR.",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789",
    },
    {
      name: "Lato",
      role: "Body fallback (font-body CSS variable)",
      stack: "'Lato', sans-serif",
      weights: [
        { label: "Light 300", weight: 300 },
        { label: "Regular 400", weight: 400 },
        { label: "Bold 700", weight: 700 },
      ],
      color: "#F5A623",
      description:
        "Defined as the `--font-body` CSS variable and used as the fallback body typeface when Inter is unavailable. Also applied via the `font-body` Tailwind utility class on some legacy page sections.",
      pangram: "Navigating complexity and unlocking potential for growth-stage businesses.",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center space-y-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">Typography</h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
            All fonts loaded on the Darwish &amp; Co. website — with live demos, weights, and usage context.
          </p>
        </div>
      </section>

      {/* Font cards */}
      <section className="py-16">
        <div className="container max-w-5xl mx-auto space-y-20">
          {fonts.map((font, idx) => (
            <div key={font.name} className="space-y-8">
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-b border-border pb-4">
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: font.color }}
                  >
                    Font {idx + 1} of {fonts.length}
                  </span>
                  <h2
                    className="text-5xl font-bold mt-1"
                    style={{ fontFamily: font.stack, color: font.color }}
                  >
                    {font.name}
                  </h2>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-semibold text-foreground">{font.role}</p>
                  <code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {font.stack}
                  </code>
                </div>
              </div>

              {/* Description */}
              <p
                className="text-base text-muted-foreground leading-relaxed max-w-3xl"
                style={{ fontFamily: font.stack }}
              >
                {font.description}
              </p>

              {/* Pangram */}
              <div
                className="rounded-xl p-6 md:p-10"
                style={{ background: `${font.color}10`, border: `1px solid ${font.color}30` }}
              >
                <p
                  className="text-3xl md:text-4xl leading-snug"
                  style={{ fontFamily: font.stack, fontWeight: 700, color: font.color }}
                >
                  {font.pangram}
                </p>
              </div>

              {/* Weight specimens */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Available Weights
                </h3>
                <div className="grid gap-4">
                  {font.weights.map((w) => (
                    <div
                      key={w.label}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border border-border rounded-lg px-5 py-4"
                    >
                      <span className="text-xs text-muted-foreground w-28 shrink-0">{w.label}</span>
                      <span
                        className="text-2xl text-foreground"
                        style={{ fontFamily: font.stack, fontWeight: w.weight }}
                      >
                        The quick brown fox jumps over the lazy dog.
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alphabet */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Character Set
                </h3>
                <p
                  className="text-lg text-muted-foreground leading-loose tracking-wide break-all"
                  style={{ fontFamily: font.stack }}
                >
                  {font.alphabet}
                </p>
              </div>

              {/* Size scale */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Size Scale
                </h3>
                {[
                  { label: "12px", size: "12px" },
                  { label: "14px", size: "14px" },
                  { label: "16px", size: "16px" },
                  { label: "20px", size: "20px" },
                  { label: "24px", size: "24px" },
                  { label: "32px", size: "32px" },
                  { label: "48px", size: "48px" },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline gap-4">
                    <span className="text-xs text-muted-foreground w-10 shrink-0">{s.label}</span>
                    <span
                      style={{ fontFamily: font.stack, fontSize: s.size, color: "var(--foreground)" }}
                    >
                      Darwish &amp; Co.
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
