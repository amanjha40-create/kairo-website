import { type ReactNode } from "react";
import { motion } from "framer-motion";

import {
  Clock,
  FileX2,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Building2,
  GraduationCap,
  Fingerprint,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PinnedHorizontalStory,
  type StoryFrame,
} from "@/components/motion/PinnedHorizontalStory";

const ease = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Shared shell                                                              */
/* -------------------------------------------------------------------------- */

function Shell({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[32rem] overflow-hidden rounded-[2rem] border p-6 shadow-premium backdrop-blur md:p-7",
        dark
          ? "border-foreground/15 bg-foreground text-background"
          : "border-border bg-card/90",
        className,
      )}
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Frame 1 — broken status quo                                               */
/* -------------------------------------------------------------------------- */

function BrokenVisual({ active }: { active: boolean }) {
  const issues = [
    { Icon: Clock, label: "8 days waiting", tone: "warning" },
    { Icon: FileX2, label: "Fabricated employer", tone: "destructive" },
    { Icon: AlertTriangle, label: "Inflated tenure", tone: "destructive" },
  ];
  return (
    <Shell>
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Legacy BGV
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-bold uppercase tracking-[0.18em] text-destructive"
          >
            Broken
          </motion.div>
        </div>
        {issues.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, x: -20 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.15, duration: 0.5, ease }}
            className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive">
              <it.Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 text-sm font-semibold">{it.label}</div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-2 rounded-lg border border-destructive/25 bg-destructive/5 px-3 py-2 text-[11px] font-semibold text-destructive"
        >
          Every hire repeats the same slow, manual checks.
        </motion.div>
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Frame 2 — the insight                                                     */
/* -------------------------------------------------------------------------- */

function InsightVisual({ active }: { active: boolean }) {
  return (
    <Shell>
      <div className="space-y-5 p-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            The insight
          </div>
          <div className="mt-3 text-2xl md:text-3xl font-bold leading-tight tracking-tight">
            Verify <span className="text-gradient-teal">once.</span>
            <br />
            Reuse <span className="text-gradient-teal">everywhere.</span>
          </div>
        </motion.div>
        <div className="grid grid-cols-3 gap-2">
          {["Identity", "Employment", "Education"].map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={active ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease }}
              className="rounded-xl border border-primary/25 bg-primary/5 px-2 py-3 text-center text-[11px] font-semibold text-primary"
            >
              {l}
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex items-center justify-center gap-2 text-[11px] font-semibold text-muted-foreground"
        >
          <Sparkles className="h-3 w-3 text-primary" /> Source-verified at the issuer
        </motion.div>
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Frame 3 — portable trust                                                  */
/* -------------------------------------------------------------------------- */

function PortableVisual({ active }: { active: boolean }) {
  const opps = ["Series B fintech", "Healthcare startup", "Enterprise SaaS"];
  return (
    <Shell dark>
      <div className="space-y-5">
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary/30 to-info/20 shadow-glow"
          >
            <ShieldCheck className="h-10 w-10 text-primary" />
          </motion.div>
        </div>
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-background/60">
            One trust profile
          </div>
          <div className="text-sm font-semibold text-background">Carried by the candidate</div>
        </div>
        <div className="space-y-2">
          {opps.map((o, i) => (
            <motion.div
              key={o}
              initial={{ opacity: 0, x: -16 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease }}
              className="flex items-center gap-3 rounded-xl border border-background/15 bg-background/5 p-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/15 text-primary">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="flex-1 text-xs font-semibold text-background">{o}</div>
              <ArrowRight className="h-3.5 w-3.5 text-primary" />
              <div className="rounded-md border border-success/40 bg-success/15 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-success">
                Reusable
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Frame 4 — trust layer                                                     */
/* -------------------------------------------------------------------------- */

function LayerVisual({ active }: { active: boolean }) {
  const layers = [
    { Icon: Fingerprint, label: "Identity layer" },
    { Icon: Building2, label: "Employment layer" },
    { Icon: GraduationCap, label: "Education layer" },
    { Icon: Layers, label: "Trust infrastructure" },
  ];
  return (
    <Shell>
      <div className="space-y-2.5">
        {layers.map((l, i) => (
          <motion.div
            key={l.label}
            initial={{ opacity: 0, y: 18 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.14, duration: 0.55, ease }}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-3.5",
              i === layers.length - 1
                ? "border-primary/40 bg-gradient-to-r from-primary/15 to-info/10 shadow-glow"
                : "border-border bg-background",
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border",
                i === layers.length - 1
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-primary/25 bg-primary/10 text-primary",
              )}
            >
              <l.Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 text-sm font-semibold">{l.label}</div>
            {i === layers.length - 1 && (
              <div className="rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                Kairo
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/*  Frames                                                                    */
/* -------------------------------------------------------------------------- */

const FRAMES: StoryFrame[] = [
  {
    key: "broken",
    step: "01",
    eyebrow: "The status quo",
    title: "Hiring still runs on broken trust.",
    body: "Background checks take weeks. Records get fabricated. Every employer repeats the same manual verification — and trust resets at every door.",
    Visual: ({ active }) => <BrokenVisual active={active} />,
  },
  {
    key: "insight",
    step: "02",
    eyebrow: "The insight",
    title: "What if trust was verified once?",
    body: "Identity, employment and education only need to be verified at the source one time. The hard work is already done — it just needs to be reusable.",
    Visual: ({ active }) => <InsightVisual active={active} />,
  },
  {
    key: "portable",
    step: "03",
    eyebrow: "Portable trust",
    title: "A trust profile the candidate owns.",
    body: "Verified once, the candidate carries their Trust Passport to every opportunity — and every hiring team reuses that verified trust instead of restarting checks from scratch.",
    Visual: ({ active }) => <PortableVisual active={active} />,
  },
  {
    key: "layer",
    step: "04",
    eyebrow: "What we're building",
    title: "The trust layer for modern hiring.",
    body: "Kairo is the infrastructure beneath every hire — identity, employment and education stitched into one source-verified, reusable trust graph.",
    Visual: ({ active }) => <LayerVisual active={active} />,
  },
];

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export function AboutScrollStory() {
  return (
    <PinnedHorizontalStory
      eyebrow="Our story"
      headline={
        <>
          Why we built <span className="text-gradient-teal">Kairo.</span>
        </>
      }
      intro="Four scenes — from the broken status quo to the trust layer modern hiring deserves."
      frames={FRAMES}
      className="border-b border-border"
      background="linear-gradient(180deg, oklch(0.985 0.004 240) 0%, oklch(1 0 0) 30%, oklch(0.975 0.012 230) 100%)"
    />
  );
}
