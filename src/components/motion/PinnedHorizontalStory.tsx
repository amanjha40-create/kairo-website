import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type StoryFrame = {
  key: string;
  step?: string;
  eyebrow: string;
  title: string;
  body: string;
  Visual: (props: { active: boolean; reduce: boolean }) => ReactNode;
};

interface Props {
  eyebrow?: string;
  headline?: ReactNode;
  intro?: string;
  frames: StoryFrame[];
  className?: string;
  background?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function PinnedHorizontalStory({
  eyebrow,
  headline,
  intro,
  frames,
  className,
  background,
}: Props) {
  const reduce = !!useReducedMotion();
  const n = frames.length;

  const header =
    eyebrow || headline || intro ? (
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-10 md:pt-28 md:pb-14 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary shadow-soft backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {eyebrow}
          </div>
        )}
        {headline && (
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.04]">
            {headline}
          </h2>
        )}
        {intro && (
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {intro}
          </p>
        )}
      </div>
    ) : null;

  return (
    <section className={cn("relative", className)} style={background ? { background } : undefined}>
      {header}

      <div className="md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {frames.map((f, i) => (
            <div key={f.key} className="snap-center shrink-0 w-[88vw]">
              <FrameCard frame={f} index={i} total={n} active reduce={reduce} />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 pb-8" aria-hidden>
          {frames.map((f) => (
            <span key={f.key} className="h-1.5 w-1.5 rounded-full bg-border" />
          ))}
        </div>
      </div>

      <div className="hidden md:block pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="relative">
            <div className="absolute left-4 top-3 bottom-3 hidden w-px bg-gradient-to-b from-transparent via-border to-transparent lg:block" />
            <div className="space-y-8 lg:space-y-10">
              {frames.map((f, i) => (
                <StoryScene
                  key={f.key}
                  frame={f}
                  index={i}
                  total={n}
                  reduce={reduce}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryScene({
  frame,
  index,
  total,
  reduce,
}: {
  frame: StoryFrame;
  index: number;
  total: number;
  reduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.42, margin: "-12% 0px -18% 0px" });
  const active = reduce || inView;

  return (
    <motion.div
      ref={ref}
      className="relative py-8 lg:pl-14"
      initial={false}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0.72, y: 18 }}
      transition={{ duration: 0.5, ease }}
    >
      <div
        className={cn(
          "absolute left-0 top-16 hidden h-8 w-8 items-center justify-center rounded-full border text-[10px] font-bold tabular-nums transition-colors duration-300 lg:flex",
          active
            ? "border-primary bg-primary text-primary-foreground shadow-glow"
            : "border-border bg-card text-muted-foreground",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <FrameCard frame={frame} index={index} total={total} active={active} reduce={reduce} />
    </motion.div>
  );
}

function FrameCard({
  frame,
  index,
  total,
  active,
  reduce,
}: {
  frame: StoryFrame;
  index: number;
  total: number;
  active: boolean;
  reduce: boolean;
}) {
  return (
    <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 24 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
          <span className="tabular-nums">
            {frame.step ?? String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          {frame.eyebrow}
        </div>
        <h3 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.06] tracking-tight">
          {frame.title}
        </h3>
        <p className="mt-5 max-w-lg text-base md:text-lg leading-relaxed text-muted-foreground">
          {frame.body}
        </p>
        <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
          Scene {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0.4, scale: 0.94, y: 16 }}
        transition={{ duration: 0.7, ease, delay: 0.05 }}
        className="relative"
      >
        <frame.Visual active={active} reduce={reduce} />
      </motion.div>
    </div>
  );
}
