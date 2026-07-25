import { motion, useReducedMotion } from "framer-motion";
import { Building2, Upload, CheckCircle2, RotateCcw, FileText, GraduationCap, BadgeCheck, ArrowRight, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type Fact = { icon: typeof Building2; label: string };

const facts: Fact[] = [
  { icon: Building2, label: "Employment" },
  { icon: GraduationCap, label: "Education" },
  { icon: BadgeCheck, label: "Certifications" },
];

function VerifiedCard({ delay = 0 }: { delay?: number }) {
  return (
    <div className="rounded-2xl border border-success/25 bg-card shadow-card p-4 sm:p-5 h-full">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Step 1 · First employer
        </div>
        <div className="inline-flex items-center gap-1 rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
          <CheckCircle2 className="h-3 w-3" /> Verified
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center">
          <Building2 className="h-4 w-4 text-success" />
        </div>
        <div className="text-sm font-semibold tracking-tight">Verification complete</div>
      </div>
      <ul className="mt-4 space-y-2">
        {facts.map((f, i) => (
          <motion.li
            key={f.label}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: delay + i * 0.08, duration: 0.35 }}
            className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-secondary/30 px-2.5 py-2"
          >
            <f.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="text-[12px] font-medium flex-1">{f.label}</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success">
              <CheckCircle2 className="h-3 w-3" /> Verified
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function RepeatCard({ step, label, delay }: { step: number; label: string; delay: number }) {
  const reduce = useReducedMotion();
  const cycle = 4.5; // seconds per loop

  return (
    <div className="rounded-2xl border border-border bg-card shadow-card p-4 sm:p-5 h-full">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Step {step} · {label}
        </div>
        <motion.div
          className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold text-warning-foreground"
          animate={reduce ? {} : { opacity: [1, 0.55, 1] }}
          transition={reduce ? {} : { duration: cycle, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <RotateCcw className="h-3 w-3" /> Starts over
        </motion.div>
      </div>

      <div className="mt-3 flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-xl bg-muted border border-border flex items-center justify-center">
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-sm font-semibold tracking-tight text-foreground/80">Upload all documents again</div>
      </div>

      <ul className="mt-4 space-y-2">
        {facts.map((f, i) => (
          <li
            key={f.label}
            className="relative overflow-hidden flex items-center gap-2.5 rounded-lg border border-dashed border-border bg-secondary/20 px-2.5 py-2"
          >
            <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="text-[12px] font-medium flex-1 text-foreground/75">Upload {f.label.toLowerCase()} proof</span>
            <motion.span
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary"
              animate={reduce ? {} : { opacity: [0.4, 1, 0.4] }}
              transition={reduce ? {} : { duration: cycle, repeat: Infinity, delay: delay + i * 0.25, ease: "easeInOut" }}
            >
              <Upload className="h-3 w-3" /> Uploading
            </motion.span>
            {/* restarting progress bar */}
            <motion.span
              className="pointer-events-none absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-primary via-info to-primary"
              initial={{ width: "0%" }}
              animate={reduce ? { width: "70%" } : { width: ["0%", "85%", "0%"] }}
              transition={
                reduce
                  ? { duration: 0.4 }
                  : { duration: cycle, repeat: Infinity, delay: delay + i * 0.2, ease: "easeInOut" }
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrustResetsProblem() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 bg-grid-faint opacity-25 -z-10" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-20 sm:py-24 lg:py-28">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              The problem
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06]">
              Professional trust{" "}
              <span className="text-gradient-teal">keeps starting over.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Every time you change employers, you&apos;re asked to prove the same professional history again.
              </p>
              <p className="mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1 text-foreground/85 font-medium">
                <span>Employment.</span>
                <span>Education.</span>
                <span>Certifications.</span>
              </p>
              <p className="mt-4">
                The facts stay the same. The verification starts over.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Journey */}
        <div className="mt-14 sm:mt-16 lg:mt-20">
          {/* Desktop: horizontal row with arrows between cards */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-4">
            <Reveal>
              <VerifiedCard />
            </Reveal>

            <div className="flex items-center justify-center px-1">
              <StepArrow />
            </div>
            <Reveal delay={0.06}>
              <RepeatCard step={2} label="New employer" delay={0} />
            </Reveal>

            <div className="flex items-center justify-center px-1">
              <StepArrow />
            </div>
            <Reveal delay={0.12}>
              <RepeatCard step={3} label="Next employer" delay={0.6} />
            </Reveal>

            <div className="flex items-center justify-center px-1">
              <StepArrow />
            </div>
            <Reveal delay={0.18}>
              <RepeatCard step={4} label="Another employer" delay={1.2} />
            </Reveal>
          </div>

          {/* Tablet / Mobile: stacked with down arrows */}
          <div className="lg:hidden space-y-4">
            <Reveal><VerifiedCard /></Reveal>
            <div className="flex justify-center"><StepArrow direction="down" /></div>
            <Reveal delay={0.05}><RepeatCard step={2} label="New employer" delay={0} /></Reveal>
            <div className="flex justify-center"><StepArrow direction="down" /></div>
            <Reveal delay={0.1}><RepeatCard step={3} label="Next employer" delay={0.6} /></Reveal>
            <div className="flex justify-center"><StepArrow direction="down" /></div>
            <Reveal delay={0.15}><RepeatCard step={4} label="Another employer" delay={1.2} /></Reveal>
          </div>
        </div>

        {/* Bottom statement */}
        <Reveal delay={0.2}>
          <div className="mt-16 sm:mt-20 text-center">
            <p className="mx-auto max-w-3xl text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight leading-snug text-foreground/85">
              Professional trust stays inside organisations{" "}
              <span className="text-gradient-teal">instead of moving with the individual.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StepArrow({ direction = "right" }: { direction?: "right" | "down" }) {
  const reduce = useReducedMotion();
  const Icon = direction === "right" ? ArrowRight : ArrowDown;
  return (
    <motion.div
      className="flex items-center justify-center h-9 w-9 rounded-full border border-border bg-card shadow-soft text-muted-foreground"
      animate={reduce ? {} : direction === "right" ? { x: [0, 4, 0] } : { y: [0, 4, 0] }}
      transition={reduce ? {} : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <Icon className="h-4 w-4" />
    </motion.div>
  );
}
