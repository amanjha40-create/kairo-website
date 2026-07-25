import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  urlLabel?: string;
  className?: string;
  delay?: number;
};

/**
 * Premium browser-framed screenshot for product pages.
 * Uses semantic tokens; preserves screenshot readability.
 */
export function BrowserShot({ src, alt, urlLabel = "app.kairo.com", className, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative", className)}
    >
      <div className="absolute -inset-8 bg-gradient-to-tr from-primary/25 via-info/15 to-transparent blur-3xl rounded-full -z-10" />
      <div className="rounded-2xl border border-border/80 bg-card shadow-premium overflow-hidden">
        <div className="border-b border-border px-4 py-2.5 flex items-center gap-2 bg-secondary/50">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
          <div className="ml-3 text-[11px] text-muted-foreground font-mono truncate">{urlLabel}</div>
        </div>
        <img src={src} alt={alt} loading="lazy" className="block w-full h-auto" />
      </div>
    </motion.div>
  );
}
