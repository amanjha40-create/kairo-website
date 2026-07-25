import { motion } from "framer-motion";

/**
 * Logo / social-proof strip. Uses placeholder wordmarks (text-based) so the
 * design stays cohesive while real partner logos are pending. Replace the
 * `logos` array with <img> wordmarks once available.
 */
const logos = [
  { name: "Northwind", style: "font-serif italic tracking-tight" },
  { name: "AXIOM", style: "font-bold tracking-[0.18em]" },
  { name: "Lumen", style: "font-light tracking-[0.3em] uppercase" },
  { name: "Helix·Co", style: "font-semibold tracking-tight" },
  { name: "VECTORA", style: "font-black tracking-[0.12em]" },
  { name: "kindred", style: "font-medium tracking-tight lowercase" },
];

export function TrustedByStrip({
  label = "Trusted by modern hiring teams",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <section className={`border-y border-border bg-secondary/30 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-10 lg:py-12">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </p>
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-6 items-center">
          {logos.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-center justify-center"
            >
              <span
                className={`text-xl md:text-2xl text-foreground/55 hover:text-foreground/85 transition-colors ${l.style}`}
              >
                {l.name}
              </span>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          Onboarding partners · launching 2026
        </p>
      </div>
    </section>
  );
}
