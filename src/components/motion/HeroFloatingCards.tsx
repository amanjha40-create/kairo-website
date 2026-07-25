import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Fingerprint, ShieldCheck, GraduationCap, Building2 } from "lucide-react";

/**
 * Floating verification cards that orbit the hero dashboard mock.
 * Pure decorative — pointer-events disabled. Hidden on small screens
 * to keep mobile layouts clean (the cards would overflow / overlap).
 */
export function HeroFloatingCards() {
  const reduce = useReducedMotion();

  const cards = [
    {
      icon: Fingerprint,
      label: "Identity verified",
      sub: "Aadhaar · PAN",
      tone: "primary" as const,
      // top-left
      style: "left-[-3%] top-[6%]",
      delay: 0.15,
      drift: [0, -6, 0],
    },
    {
      icon: Building2,
      label: "Employer confirmed",
      sub: "Acme Corp · 2021–2024",
      tone: "info" as const,
      style: "right-[-4%] top-[18%]",
      delay: 0.35,
      drift: [0, -8, 0],
    },
    {
      icon: GraduationCap,
      label: "Degree authenticated",
      sub: "B.Tech · IIT-Madras",
      tone: "success" as const,
      style: "left-[-6%] bottom-[18%]",
      delay: 0.55,
      drift: [0, 6, 0],
    },
    {
      icon: ShieldCheck,
      label: "Trust score · 96",
      sub: "Portable profile ready",
      tone: "primary" as const,
      style: "right-[-2%] bottom-[6%]",
      delay: 0.75,
      drift: [0, 7, 0],
    },
  ];

  const toneClass: Record<string, string> = {
    primary: "border-primary/30 bg-card/90 text-primary",
    info: "border-info/30 bg-card/90 text-info",
    success: "border-success/30 bg-card/90 text-success",
  };

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.style} z-10`}
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={
            reduce
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 1, scale: 1, y: c.drift }
          }
          transition={
            reduce
              ? { duration: 0.4, delay: c.delay }
              : {
                  opacity: { duration: 0.6, delay: c.delay },
                  scale: { duration: 0.6, delay: c.delay, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: c.delay },
                }
          }
        >
          <div className="flex items-center gap-2.5 rounded-2xl border bg-card/90 backdrop-blur-md px-3 py-2.5 shadow-elevated">
            <div className={`h-8 w-8 rounded-xl border flex items-center justify-center ${toneClass[c.tone]}`}>
              <c.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold leading-tight flex items-center gap-1">
                {c.label}
                <BadgeCheck className="h-3 w-3 text-primary" />
              </div>
              <div className="text-[10px] text-muted-foreground leading-tight">{c.sub}</div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* connecting glow ring around the dashboard */}
      {!reduce && (
        <motion.div
          className="absolute inset-6 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, oklch(0.62 0.11 192 / 0.12), transparent 70%)",
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
