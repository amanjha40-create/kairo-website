import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  Lock,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowDown,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/* ---------- TODAY column ---------- */

function TodayNode({
  label,
  tone = "muted",
  delay = 0,
}: {
  label: string;
  tone?: "muted" | "employer";
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay, duration: 0.4 }}
      className={
        tone === "employer"
          ? "flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 shadow-soft"
          : "inline-flex items-center gap-1.5 rounded-full border border-dashed border-border bg-secondary/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
      }
    >
      {tone === "employer" ? (
        <>
          <div className="h-8 w-8 rounded-lg bg-muted border border-border flex items-center justify-center">
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground/80">{label}</span>
        </>
      ) : (
        <>
          <RotateCcw className="h-3 w-3" />
          {label}
        </>
      )}
    </motion.div>
  );
}

function TodayColumn() {
  const reduce = useReducedMotion();
  const items: Array<{ kind: "employer" | "verify"; label: string }> = [
    { kind: "employer", label: "Employer A" },
    { kind: "verify", label: "Verify" },
    { kind: "employer", label: "Employer B" },
    { kind: "verify", label: "Verify again" },
    { kind: "employer", label: "Employer C" },
    { kind: "verify", label: "Verify again" },
  ];

  return (
    <div className="relative rounded-3xl border border-border bg-card/60 backdrop-blur p-6 sm:p-8 shadow-card h-full">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          Today
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
          <Clock className="h-3 w-3" /> Repeats every move
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        {items.map((it, i) => (
          <div key={i} className="flex flex-col items-center gap-3 w-full">
            <TodayNode label={it.label} tone={it.kind === "employer" ? "employer" : "muted"} delay={i * 0.06} />
            {i < items.length - 1 && (
              <motion.div
                className="h-6 w-px bg-gradient-to-b from-border via-muted-foreground/30 to-border origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 + 0.05, duration: 0.3 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Loop hint */}
      {!reduce && (
        <motion.div
          className="mt-6 mx-auto inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <RotateCcw className="h-3 w-3" /> Trust resets each time
        </motion.div>
      )}
    </div>
  );
}

/* ---------- WITH KairoID column ---------- */

function KairoColumn() {
  const reduce = useReducedMotion();
  const employers = ["Employer A", "Employer B", "Employer C"];

  return (
    <div className="relative rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/5 via-info/5 to-transparent p-6 sm:p-8 shadow-premium h-full overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
          With KairoID
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/10 px-2.5 py-0.5 text-[10px] font-semibold text-success">
          <ShieldCheck className="h-3 w-3" /> Verified once
        </div>
      </div>

      {/* Professional */}
      <div className="relative mt-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-info/30 flex items-center justify-center text-xs font-bold text-foreground/70">
            AR
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Professional
            </div>
            <div className="text-sm font-semibold tracking-tight">Aarav R.</div>
          </div>
          <div className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
            <UserCheck className="h-3 w-3" /> Owner
          </div>
        </motion.div>

        {/* animated flow line down */}
        <FlowLine delay={0.2} />

        {/* Trust Passport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 relative w-full max-w-[280px] rounded-2xl border border-primary/30 bg-card p-4 shadow-glow"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                Trust Passport
              </div>
              <div className="mt-1 text-sm font-bold tracking-tight">
                Yours. Portable. Always current.
              </div>
            </div>
            <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Employment", "Education", "Certifications"].map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold text-primary"
              >
                <CheckCircle2 className="h-2.5 w-2.5" /> {f}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Fan out to 3 employers */}
        <div className="mt-6 w-full">
          <div className="mx-auto flex justify-center">
            <FlowLine delay={0.35} />
          </div>
          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card/70 px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
              <Lock className="h-3 w-3 text-primary" /> Shared with consent
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {employers.map((e, i) => (
              <motion.div
                key={e}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 + i * 0.08, duration: 0.4 }}
                className="relative flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card px-2 py-2.5 shadow-soft"
              >
                <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="text-[10px] font-semibold text-foreground/80 truncate max-w-full">
                  {e}
                </div>
                {!reduce && (
                  <motion.span
                    className="absolute -top-1.5 right-1.5 h-2 w-2 rounded-full bg-success"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: 0.5 + i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowLine({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-8 w-px overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40" />
      {!reduce && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary shadow-glow"
          initial={{ top: "-10%", opacity: 0 }}
          animate={{ top: ["-10%", "110%"], opacity: [0, 1, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      )}
      <ArrowDown className="hidden" aria-hidden />
    </div>
  );
}

/* ---------- Section ---------- */

export function TrustMovesWithYou() {
  const principles = [
    { icon: Sparkles, label: "Built once" },
    { icon: Clock, label: "Grows over time" },
    { icon: Lock, label: "Shared with consent" },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 bg-grid-faint opacity-25 -z-10" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[820px] h-[460px] rounded-full bg-primary/8 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-20 sm:py-24 lg:py-28">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              A better way
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06]">
              What if your professional trust{" "}
              <span className="text-gradient-teal">moved with you?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Your employment history, education, and verified achievements shouldn&apos;t be recreated every time you change employers.
              </p>
              <p className="mt-4">
                They should become part of a trusted professional record that stays with you throughout your career.
              </p>
              <p className="mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1 text-foreground/85 font-medium">
                <span>Built once.</span>
                <span>Verified over time.</span>
                <span>Shared only with your consent.</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Comparison */}
        <div className="mt-14 sm:mt-16 lg:mt-20 grid gap-6 lg:gap-8 md:grid-cols-2 items-stretch">
          <Reveal>
            <TodayColumn />
          </Reveal>
          <Reveal delay={0.1}>
            <KairoColumn />
          </Reveal>
        </div>

        {/* Principles */}
        <Reveal delay={0.2}>
          <div className="mt-16 sm:mt-20">
            <div className="grid gap-4 sm:grid-cols-3">
              {principles.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-card/70 backdrop-blur px-5 py-4 shadow-soft"
                >
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center">
                    <p.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold tracking-tight">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
