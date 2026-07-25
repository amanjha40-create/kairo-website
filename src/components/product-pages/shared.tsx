import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { ReactNode } from "react";
import { SmartLink } from "@/components/site/SmartLink";
import { HR_WORKSPACE_URL, urlHost } from "@/lib/domain-config";

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {it.to ? (
            <Link to={it.to} className="hover:text-foreground transition-colors">{it.label}</Link>
          ) : (
            <span className="text-foreground">{it.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-3 w-3 opacity-50" />}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  gradientWord,
  intro,
  breadcrumb,
  right,
  ctaLabel = "Book a demo",
  ctaTo = "/contact",
  secondaryLabel,
  secondaryTo,
}: {
  eyebrow: string;
  title: string;
  gradientWord?: string;
  intro: string;
  breadcrumb: { label: string; to?: string }[];
  right: ReactNode;
  ctaLabel?: string;
  ctaTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-mesh-hero -z-10" />
      <div className="absolute inset-0 bg-grid-faint -z-10 opacity-60" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 pt-8 sm:pt-10 pb-16 sm:pb-20 lg:pt-14 lg:pb-24">
        <Breadcrumb items={breadcrumb} />
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 sm:gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {eyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 sm:mt-6 text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-6xl font-bold tracking-tight">
                {title}{gradientWord && <> <span className="text-gradient-teal">{gradientWord}</span></>}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 sm:mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">{intro}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <Button asChild size="lg" className="btn-premium btn-glow rounded-xl h-12 px-6 text-sm font-semibold w-full sm:w-auto">
                  <SmartLink to={ctaTo}>{ctaLabel} <ArrowRight className="ml-1.5 h-4 w-4" /></SmartLink>
                </Button>
                {secondaryLabel && secondaryTo && (
                  <Button asChild size="lg" variant="outline" className="h-12 px-6 rounded-xl border-border bg-card shadow-soft hover:border-primary/40 hover:shadow-glow text-sm font-semibold w-full sm:w-auto transition-all">
                    <SmartLink to={secondaryTo}>{secondaryLabel} <ArrowRight className="ml-1.5 h-4 w-4" /></SmartLink>
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
          <div>{right}</div>
        </div>
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  gradientWord,
  intro,
  children,
  alt = false,
}: {
  eyebrow?: string;
  title: string;
  gradientWord?: string;
  intro?: string;
  children?: ReactNode;
  alt?: boolean;
}) {
  return (
    <section className={`border-b border-border ${alt ? "bg-secondary/30" : "bg-background"}`}>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-px w-8 bg-primary/40" />{eyebrow}
            </div>
          )}
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {title}{gradientWord && <> <span className="text-gradient-teal">{gradientWord}</span></>}
          </h2>
          {intro && <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{intro}</p>}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}

export function SplitSection({
  eyebrow,
  title,
  gradientWord,
  body,
  bullets,
  visual,
  reverse = false,
  alt = false,
}: {
  eyebrow: string;
  title: string;
  gradientWord?: string;
  body: string;
  bullets?: { icon: React.ComponentType<{ className?: string }>; label: string; desc?: string }[];
  visual: ReactNode;
  reverse?: boolean;
  alt?: boolean;
}) {
  return (
    <section className={`border-b border-border ${alt ? "bg-secondary/30" : "bg-background"}`}>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-px w-8 bg-primary/40" />{eyebrow}
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {title}{gradientWord && <> <span className="text-gradient-teal">{gradientWord}</span></>}
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{body}</p>
            {bullets && (
              <ul className="mt-8 space-y-4">
                {bullets.map((b) => (
                  <li key={b.label} className="flex gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center">
                      <b.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{b.label}</div>
                      {b.desc && <div className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{b.desc}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>{visual}</div>
        </div>
      </div>
    </section>
  );
}

export function BenefitGrid({
  items,
  columns = 3,
}: {
  items: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[];
  columns?: 2 | 3 | 4;
}) {
  const cols = columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <div className={`grid gap-5 ${cols}`}>
      {items.map((it) => (
        <div key={it.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-premium hover:border-primary/30 transition-all">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center">
            <it.icon className="h-4.5 w-4.5 text-primary" />
          </div>
          <div className="mt-4 text-base font-semibold tracking-tight">{it.title}</div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function FinalCTA({
  eyebrow = "Ready to get started?",
  title = "Professional trust",
  gradientWord = "should move with you.",
  body = "Whether you're building your professional reputation or hiring with confidence, Kairo makes trusted professional information portable, reusable, and always shared with your consent.",
  primary = { label: "Book a demo", to: "/contact" },
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  gradientWord?: string;
  body?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="relative bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark opacity-80" />
      <div className="absolute inset-0 bg-grid-faint opacity-10" />
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-background/10 bg-background/5 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {eyebrow}
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-background">
              {title} <span className="text-gradient-teal">{gradientWord}</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-background/70 max-w-xl leading-relaxed">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-xl h-12 px-6 shadow-premium font-semibold">
                <SmartLink to={primary.to}>{primary.label} <ArrowRight className="ml-1.5 h-4 w-4" /></SmartLink>
              </Button>
              {secondary && (
                <Button asChild size="lg" variant="outline" className="rounded-xl h-12 px-6 border-background/20 bg-background/5 text-background hover:bg-background/15 hover:text-background backdrop-blur font-semibold">
                  <SmartLink to={secondary.to}>{secondary.label}</SmartLink>
                </Button>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/30 to-info/20 blur-3xl rounded-full animate-pulse-glow" />
            <div className="relative rounded-2xl border border-background/10 glass-dark shadow-premium overflow-hidden">
              <div className="border-b border-background/10 px-4 py-2.5 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-background/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-background/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-background/20" />
                <div className="ml-3 text-[11px] text-background/50 font-mono">{urlHost(HR_WORKSPACE_URL)}</div>
              </div>
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { l: "Verified", v: "1,284" },
                    { l: "Active", v: "42" },
                    { l: "Shared", v: "318" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg border border-background/10 bg-background/5 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-background/50">{s.l}</div>
                      <div className="text-xl font-bold mt-1 text-gradient-teal">{s.v}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-background/10 bg-background/5 p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-semibold">Verification pipeline</div>
                    <BarChart3 className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex items-end gap-1.5 h-20">
                    {[40, 65, 35, 80, 55, 90, 70, 60, 85, 45, 75, 95].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
