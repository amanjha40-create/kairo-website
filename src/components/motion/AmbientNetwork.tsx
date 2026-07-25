import { motion, useReducedMotion } from "framer-motion";

/**
 * Ambient, site-wide background — a faint network of trust nodes
 * with slow-drifting connection lines. Sits behind all content with
 * pointer-events disabled. Low opacity to remain premium and subtle.
 */
export function AmbientNetwork() {
  const reduce = useReducedMotion();
  const nodes = [
    { cx: 8, cy: 14 }, { cx: 22, cy: 8 }, { cx: 38, cy: 22 },
    { cx: 55, cy: 12 }, { cx: 72, cy: 26 }, { cx: 88, cy: 16 },
    { cx: 14, cy: 38 }, { cx: 32, cy: 48 }, { cx: 50, cy: 40 },
    { cx: 68, cy: 52 }, { cx: 84, cy: 44 }, { cx: 6, cy: 62 },
    { cx: 26, cy: 72 }, { cx: 44, cy: 66 }, { cx: 62, cy: 78 },
    { cx: 80, cy: 70 }, { cx: 94, cy: 84 }, { cx: 18, cy: 90 },
  ];
  const links: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [2, 8],
    [4, 9], [5, 10], [6, 7], [7, 8], [8, 9], [9, 10], [6, 11],
    [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [12, 17],
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ contain: "strict" }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-[0.35]"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.62 0.11 192)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.62 0.11 192)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="linkStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.11 192)" stopOpacity="0.0" />
            <stop offset="50%" stopColor="oklch(0.62 0.11 192)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="oklch(0.74 0.13 230)" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={nodes[b].cx}
            y2={nodes[b].cy}
            stroke="url(#linkStroke)"
            strokeWidth="0.12"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r="1.4" fill="url(#nodeGlow)" />
            {!reduce && (
              <motion.circle
                cx={n.cx}
                cy={n.cy}
                r="0.55"
                fill="oklch(0.62 0.11 192)"
                animate={{ opacity: [0.2, 0.85, 0.2] }}
                transition={{
                  duration: 4 + (i % 5),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i * 0.3) % 5,
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* soft gradient wash to keep readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/70" />
    </div>
  );
}
