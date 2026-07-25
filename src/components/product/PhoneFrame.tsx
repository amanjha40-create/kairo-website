import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
  className?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "max-w-[220px]",
  md: "max-w-[260px]",
  lg: "max-w-[300px]",
};

/**
 * Premium iPhone-style frame for product screenshots.
 * Uses semantic tokens; works on light & dark surfaces.
 */
export function PhoneFrame({ src, alt, label, caption, className, delay = 0, size = "md" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative mx-auto w-full", sizeMap[size], className)}
    >
      {/* ambient glow */}
      <div className="absolute -inset-8 -z-10 bg-gradient-to-tr from-primary/25 via-info/15 to-transparent blur-3xl rounded-full opacity-70" />

      {/* device shell */}
      <div className="relative rounded-[2.4rem] p-[3px] bg-gradient-to-b from-foreground/15 via-foreground/5 to-foreground/15 shadow-premium">
        <div className="relative rounded-[2.25rem] bg-foreground p-[6px] overflow-hidden">
          {/* screen */}
          <div className="relative rounded-[1.9rem] overflow-hidden bg-card aspect-[9/19.5]">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* subtle inner highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] ring-1 ring-inset ring-white/5" />
          </div>
        </div>
        {/* side buttons */}
        <span className="absolute left-[-3px] top-[22%] h-10 w-[3px] rounded-l bg-foreground/30" />
        <span className="absolute left-[-3px] top-[34%] h-16 w-[3px] rounded-l bg-foreground/30" />
        <span className="absolute right-[-3px] top-[28%] h-20 w-[3px] rounded-r bg-foreground/30" />
      </div>

      {(label || caption) && (
        <div className="mt-5 text-center">
          {label && (
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">{label}</div>
          )}
          {caption && (
            <div className="mt-1.5 text-sm font-semibold text-foreground/85 tracking-tight">{caption}</div>
          )}
        </div>
      )}
    </motion.div>
  );
}
