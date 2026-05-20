import { ArrowRight, Clock, MousePointerClick, Mic, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

/**
 * Spoty — A/B Testing Case Study
 * Light, warm pink-cream canvas. Forest-green type. Magenta primary. Peach accent.
 * Self-contained palette (does not affect rest of app).
 */

const spotyTheme: React.CSSProperties = {
  // Spoty palette
  ["--bg" as any]: "#FBEEE7",
  ["--bg-soft" as any]: "#F6E2D6",
  ["--ink" as any]: "#103826",
  ["--ink-2" as any]: "#3A5D4A",
  ["--primary" as any]: "#AE1F62",
  ["--primary-glow" as any]: "#D94B8C",
  ["--accent" as any]: "#F5C2A1",
  ["--highlight" as any]: "#F4D58D",
  ["--card" as any]: "#FFFFFF",
  ["--border" as any]: "#EBD6C6",
  fontFamily: "'Inter', 'Helvetica Neue', system-ui, sans-serif",
  background: "#FBEEE7",
  color: "#103826",
};

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em]"
    style={{ background: "var(--bg-soft)", color: "var(--ink)", border: "1px solid var(--border)" }}
  >
    {children}
  </span>
);

const KpiCard = ({
  label,
  value,
  delta,
  tone = "primary",
}: { label: string; value: string; delta: string; tone?: "primary" | "accent" | "ink" }) => {
  const toneBg =
    tone === "primary" ? "var(--primary)" : tone === "accent" ? "var(--accent)" : "var(--ink)";
  const toneFg = tone === "accent" ? "var(--ink)" : "#fff";
  return (
    <div
      className="rounded-3xl p-7 flex flex-col gap-4 shadow-sm"
      style={{ background: toneBg, color: toneFg }}
    >
      <span className="text-xs uppercase tracking-[0.18em] opacity-80">{label}</span>
      <span className="text-5xl md:text-6xl font-semibold tracking-tight leading-none">{value}</span>
      <span className="text-sm opacity-90 inline-flex items-center gap-1.5">
        <TrendingUp className="w-4 h-4" /> {delta}
      </span>
    </div>
  );
};

const Bar = ({
  label,
  value,
  max,
  suffix,
  variant,
}: { label: string; value: number; max: number; suffix: string; variant: "A" | "B" }) => {
  const pct = (value / max) * 100;
  const isB = variant === "B";
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
            style={{
              background: isB ? "var(--primary)" : "var(--bg-soft)",
              color: isB ? "#fff" : "var(--ink)",
              border: isB ? "none" : "1px solid var(--border)",
            }}
          >
            {variant}
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--ink-2)" }}>{label}</span>
        </div>
        <span className="text-2xl font-semibold tabular-nums" style={{ color: "var(--ink)" }}>
          {value}
          <span className="text-base font-normal opacity-60 ml-1">{suffix}</span>
        </span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-soft)" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: isB
              ? "linear-gradient(90deg, var(--primary), var(--primary-glow))"
              : "var(--ink-2)",
          }}
        />
      </div>
    </div>
  );
};

type TestProps = {
  index: string;
  title: string;
  axis: string;
  icon: React.ReactNode;
  goal: string;
  versionA: { label: string; desc: string };
  versionB: { label: string; desc: string };
  metric: string;
  suffix: string;
  a: number;
  b: number;
  max: number;
  better: "higher" | "lower";
  insight: string;
};

const TestSection = ({
  index, title, axis, icon, goal, versionA, versionB, metric, suffix, a, b, max, better, insight,
}: TestProps) => {
  const lift =
    better === "higher"
      ? `+${Math.round(((b - a) / a) * 100)}% lift`
      : `−${Math.round(((a - b) / a) * 100)}% faster`;

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Chip>Test {index}</Chip>
          <Chip>{axis}</Chip>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end mb-14">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            {title}
          </h2>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "var(--ink)", color: "#fff" }}
          >
            {icon}
          </div>
        </div>

        <p className="text-lg md:text-xl max-w-2xl mb-12" style={{ color: "var(--ink-2)" }}>
          <span className="font-semibold" style={{ color: "var(--ink)" }}>Goal — </span>
          {goal}
        </p>

        {/* A vs B comparison cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {[{ v: "A" as const, d: versionA }, { v: "B" as const, d: versionB }].map(({ v, d }) => {
            const isB = v === "B";
            return (
              <div
                key={v}
                className="rounded-3xl p-7 md:p-9 flex flex-col gap-4 transition-transform hover:-translate-y-1"
                style={{
                  background: isB ? "var(--ink)" : "var(--card)",
                  color: isB ? "#fff" : "var(--ink)",
                  border: `1px solid ${isB ? "var(--ink)" : "var(--border)"}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold"
                    style={{
                      background: isB ? "var(--primary)" : "var(--bg-soft)",
                      color: isB ? "#fff" : "var(--ink)",
                    }}
                  >
                    {v}
                  </span>
                  {isB && (
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ background: "var(--accent)", color: "var(--ink)" }}
                    >
                      Winner
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{d.label}</h3>
                <p className="text-base opacity-80 leading-relaxed">{d.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Chart panel */}
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--ink-2)" }}>
                Metric measured
              </p>
              <h4 className="text-2xl font-semibold mt-1">{metric}</h4>
            </div>
            <span
              className="text-sm font-semibold px-4 py-2 rounded-full"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              {lift}
            </span>
          </div>
          <div className="space-y-6">
            <Bar label={versionA.label} value={a} max={max} suffix={suffix} variant="A" />
            <Bar label={versionB.label} value={b} max={max} suffix={suffix} variant="B" />
          </div>
        </div>

        {/* Insight */}
        <div
          className="mt-8 rounded-3xl p-7 md:p-8 flex gap-5 items-start"
          style={{ background: "var(--accent)", color: "var(--ink)" }}
        >
          <Sparkles className="w-6 h-6 shrink-0 mt-1" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-2 opacity-70">UX Insight</p>
            <p className="text-lg md:text-xl leading-snug font-medium">{insight}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ABTesting = () => {
  return (
    <div style={spotyTheme} className="min-h-screen">
      {/* Header */}
      <header
        className="px-6 md:px-16 py-6 flex items-center justify-between border-b sticky top-0 z-10 backdrop-blur"
        style={{ borderColor: "var(--border)", background: "rgba(251,238,231,0.85)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            S
          </div>
          <span className="font-semibold tracking-tight text-lg">Spoty</span>
          <span className="text-xs px-2 py-0.5 rounded-full ml-2" style={{ background: "var(--bg-soft)", color: "var(--ink-2)" }}>
            UX Case Study
          </span>
        </div>
        <Chip>v 1.0 · 2026</Chip>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-16 pt-20 md:pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <Chip>A/B & A/A Testing</Chip>
          <h1 className="mt-8 text-5xl md:text-8xl font-semibold tracking-tight leading-[0.95]">
            Measuring what makes
            <br />
            <span style={{ color: "var(--primary)" }}>the perfect bite</span>.
          </h1>
          <p className="mt-10 text-lg md:text-2xl max-w-3xl leading-relaxed" style={{ color: "var(--ink-2)" }}>
            Three controlled experiments on Spoty's core decision journey — visual choice,
            personalization, and reservation flow — measuring how UX refinements impact
            <span style={{ color: "var(--ink)" }} className="font-medium"> speed, trust, and completion</span>.
          </p>

          {/* KPI summary */}
          <div className="grid md:grid-cols-3 gap-5 mt-16">
            <KpiCard label="Decision time" value="−50%" delta="9s vs 18s" tone="ink" />
            <KpiCard label="Trust in suggestion" value="+86%" delta="78% vs 42% CTR" tone="primary" />
            <KpiCard label="Reservation completion" value="+65%" delta="84% vs 51%" tone="accent" />
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="px-6 md:px-16 py-16 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Method</h2>
          <div className="space-y-5 text-base md:text-lg" style={{ color: "var(--ink-2)" }}>
            <p>
              Users were split into two cohorts. <strong style={{ color: "var(--ink)" }}>Version A</strong> received
              the baseline experience; <strong style={{ color: "var(--ink)" }}>Version B</strong> received the
              proposed UX refinement. An A/A control run confirmed the segmentation produced
              statistically equivalent baselines (Δ &lt; 1.5%), validating the test rig.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                "Simulated cohort: 1,200 sessions",
                "A/A control delta: 1.2%",
                "Confidence interval: 95%",
                "Three independent variants",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 p-4 rounded-2xl"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                  <span className="text-sm">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tests */}
      <TestSection
        index="01"
        axis="Emotional UX"
        title="Quick Mode visuals: place or plate?"
        icon={<Clock className="w-7 h-7" />}
        goal="Identify which type of imagery helps users decide faster in Spoty's swipe-based Quick Mode."
        versionA={{ label: "Restaurant exterior", desc: "Architectural photo of the venue — neutral, informative, but emotionally distant." }}
        versionB={{ label: "Dish close-up", desc: "Hero shot of the signature plate — appetite-driven, instantly evocative." }}
        metric="Average decision time per card"
        suffix="s"
        a={18}
        b={9}
        max={20}
        better="lower"
        insight="Food imagery triggers immediate emotional engagement, cutting decision time in half."
      />

      <TestSection
        index="02"
        axis="Personalization"
        title="A visible match score builds trust."
        icon={<MousePointerClick className="w-7 h-7" />}
        goal="Measure whether displaying an AI compatibility score increases interaction with the first recommendation."
        versionA={{ label: "Plain suggestion", desc: "Restaurant card without any personalization signal." }}
        versionB={{ label: "96% Match for you", desc: "Same card with a visible compatibility score driven by taste profile." }}
        metric="Click-through rate on first suggestion"
        suffix="%"
        a={42}
        b={78}
        max={100}
        better="higher"
        insight="Visible personalization reassures users — quantified relevance reduces hesitation."
      />

      <TestSection
        index="03"
        axis="Innovation"
        title="Voice AI removes reservation friction."
        icon={<Mic className="w-7 h-7" />}
        goal="Compare the classic form with a conversational voice flow on full reservation completion."
        versionA={{ label: "Classic form", desc: "Multi-step form with date, time, party size and contact details." }}
        versionB={{ label: "Voice AI assistant", desc: "Hands-free conversational reservation handled in a single turn." }}
        metric="Reservation completion rate"
        suffix="%"
        a={51}
        b={84}
        max={100}
        better="higher"
        insight="Voice interaction reduces friction and improves accessibility — especially on mobile contexts."
      />

      {/* Synthesis */}
      <section className="px-6 md:px-16 py-24 md:py-32 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <Chip>Synthesis</Chip>
          <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
            Three UX levers, one coherent direction.
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mt-14">
            {[
              { axis: "Emotion", lever: "Food-first imagery", impact: "−50% decision time" },
              { axis: "Trust", lever: "Visible match score", impact: "+86% CTR" },
              { axis: "Frictionless", lever: "Voice reservation", impact: "+65% completion" },
            ].map((row) => (
              <div
                key={row.axis}
                className="rounded-3xl p-7 flex flex-col gap-3"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <span className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--ink-2)" }}>
                  {row.axis}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight">{row.lever}</h3>
                <span
                  className="self-start text-sm font-semibold px-3 py-1.5 rounded-full mt-2"
                  style={{ background: "var(--primary)", color: "#fff" }}
                >
                  {row.impact}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-16 rounded-3xl p-10 md:p-14"
            style={{ background: "var(--ink)", color: "#fff" }}
          >
            <p className="text-xs uppercase tracking-[0.2em] opacity-70">Conclusion</p>
            <p className="mt-6 text-2xl md:text-4xl leading-tight font-medium tracking-tight max-w-4xl">
              Spoty's experience gains the most when it speaks to <span style={{ color: "var(--accent)" }}>appetite</span>,
              demonstrates <span style={{ color: "var(--accent)" }}>relevance</span>, and removes
              <span style={{ color: "var(--accent)" }}> effort</span> — exactly the three pillars
              tested above.
            </p>
            <button
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-transform hover:translate-x-1"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              Ship the winning variants <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <footer
        className="px-6 md:px-16 py-10 text-xs flex flex-wrap items-center justify-between gap-3 border-t"
        style={{ borderColor: "var(--border)", color: "var(--ink-2)" }}
      >
        <span>Spoty — UX Case Study · A/B & A/A Testing</span>
        <span>Simulated dataset · Presented for jury review</span>
      </footer>
    </div>
  );
};

export default ABTesting;
