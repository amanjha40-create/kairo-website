import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

/**
 * Lightweight scroll-triggered count-up. Only animates once when the
 * element enters the viewport.
 */
export function Counter({ to, duration = 1.4, className, suffix = "" }: Props) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!start || reduce) return;
    const startTs = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTs) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration, reduce]);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => setStart(true)}
      viewport={{ once: true, amount: 0.6 }}
    >
      {value}
      {suffix}
    </motion.span>
  );
}
