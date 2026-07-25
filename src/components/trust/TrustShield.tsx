import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  active?: boolean;
  className?: string;
  showCheck?: boolean;
}

/**
 * Kairo Trust Shield — proprietary mark used across the website
 * to symbolize verified, portable trust.
 */
export function TrustShield({ size = 72, active = true, className, showCheck = true }: Props) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        active && "animate-shield-assemble",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-60"
        style={{ background: "radial-gradient(circle, oklch(0.62 0.11 192 / 0.55), transparent 70%)" }}
      />
      <svg viewBox="0 0 64 72" width={size} height={size} className="relative">
        <defs>
          <linearGradient id="ts-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.74 0.13 220)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="oklch(0.62 0.11 192)" stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id="ts-stroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.74 0.13 220)" />
            <stop offset="100%" stopColor="oklch(0.62 0.11 192)" />
          </linearGradient>
        </defs>
        <path
          d="M32 2 L60 12 V34 C60 50 48 62 32 70 C16 62 4 50 4 34 V12 Z"
          fill="url(#ts-fill)"
          stroke="url(#ts-stroke)"
          strokeWidth="1.6"
        />
        {/* inner ring */}
        <path
          d="M32 8 L54 16 V34 C54 47 44 57 32 64 C20 57 10 47 10 34 V16 Z"
          fill="none"
          stroke="oklch(0.62 0.11 192 / 0.25)"
          strokeWidth="0.8"
        />
        {showCheck && (
          <path
            d="M22 35 L29 42 L43 26"
            fill="none"
            stroke="oklch(0.62 0.11 192)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={active ? "animate-check-draw" : undefined}
          />
        )}
      </svg>
    </div>
  );
}
