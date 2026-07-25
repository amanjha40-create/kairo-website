import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
  amount?: number;
}

/**
 * Scroll-triggered reveal — the building block for the site-wide
 * motion system. Cheap, GPU-friendly, and respects reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 18,
  direction = "up",
  className,
  once = true,
  amount = 0.2,
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = reduce ? 0 : y;
  const from =
    direction === "up" ? { y: offset } :
    direction === "down" ? { y: -offset } :
    direction === "left" ? { x: offset } :
    direction === "right" ? { x: -offset } :
    {};

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  amount?: number;
}

const containerVariants: Variants = {
  hidden: {},
  show: (custom: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: custom.stagger, delayChildren: custom.delay },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/** Container that staggers direct <StaggerItem/> children when scrolled into view. */
export function Stagger({ children, className, delay = 0, stagger = 0.08, amount = 0.15 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      custom={{ stagger, delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
