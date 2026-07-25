import { Link } from "@tanstack/react-router";
import { SiteLayout } from "./SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, ShieldCheck, Lock, UserCheck, Fingerprint } from "lucide-react";
import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { siteUrl } from "@/lib/domain-config";

export interface SeoFaq { q: string; a: string }
export interface SeoStep { title: string; body: string }

export interface SeoLandingProps {
  eyebrow: string;
  h1: string;
  intro: string; // answer block — used by AI overviews
  bullets: string[];
  steps: SeoStep[];
  faqs: SeoFaq[];
  body?: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  ctaAnalyticsLabel?: string;
}

const trustSignals = [
  { i: ShieldCheck, l: "Source-verified records" },
  { i: UserCheck, l: "Consent-based verification" },
  { i: Fingerprint, l: "Candidate-owned identity" },
  { i: Lock, l: "Encrypted document handling" },
];

export function SeoLandingTemplate(p: SeoLandingProps) {
  const analyticsLabel = p.ctaAnalyticsLabel ?? "seo_landing_primary";
  return (
    <SiteLayout>
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero -z-10" />
        <div className="absolute inset-0 bg-grid-faint opacity-60 -z-10" />
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground mb-6 reveal-up">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {p.eyebrow}
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05] reveal-up reveal-delay-1">
            {p.h1}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl reveal-up reveal-delay-2">
            {p.intro}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 reveal-up reveal-delay-3">
            <Button asChild size="lg" className="btn-premium btn-glow rounded-xl w-full sm:w-auto">
              <Link
                to={p.ctaHref ?? "/contact"}
                onClick={() => trackEvent("cta_click", { location: "seo_landing_hero", label: analyticsLabel })}
              >
                {p.ctaLabel ?? "Book a demo"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl w-full sm:w-auto hover:border-primary/40 hover:shadow-glow transition-all">
              <Link
                to="/how-it-works"
                onClick={() => trackEvent("cta_click", { location: "seo_landing_hero", label: "see_portable_trust" })}
              >
                See portable trust in action
              </Link>
            </Button>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {trustSignals.slice(0, 3).map((s) => (
              <div key={s.l} className="inline-flex items-center gap-1.5">
                <s.i className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium text-foreground/75">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What you get</h2>
          <ul className="mt-8 grid sm:grid-cols-2 gap-4">
            {p.bullets.map((b) => (
              <li key={b} className="card-lift flex items-start gap-3 rounded-xl border border-border bg-card/60 p-4 hover:border-primary/30 hover:shadow-card">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/90 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {trustSignals.map((s) => (
              <div key={s.l} className="inline-flex items-center gap-1.5">
                <s.i className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium text-foreground/75">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How it works</h2>
          <ol className="mt-8 space-y-5">
            {p.steps.map((s, i) => (
              <li key={s.title} className="card-lift flex gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-card">
                <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center text-sm font-semibold">{i + 1}</div>
                <div>
                  <div className="font-medium text-foreground">{s.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {p.body ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-20 prose-invert">
            {p.body}
          </div>
        </section>
      ) : null}

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-card">
            {p.faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-medium text-foreground">
                  {f.q}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Ready to ship verified hires faster?</h2>
          <p className="mt-4 text-muted-foreground">Reusable, source-verified trust infrastructure built for modern hiring teams.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg" className="btn-premium btn-glow rounded-xl w-full sm:w-auto">
              <Link
                to="/contact"
                onClick={() => trackEvent("cta_click", { location: "seo_landing_footer", label: "book_a_demo" })}
              >
                Book a demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl w-full sm:w-auto hover:border-primary/40 hover:shadow-glow transition-all">
              <Link
                to="/how-it-works"
                onClick={() => trackEvent("cta_click", { location: "seo_landing_footer", label: "see_portable_trust" })}
              >
                See portable trust in action
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export function buildSeoHead(opts: {
  url: string;
  title: string;
  description: string;
  faqs: SeoFaq[];
  breadcrumbName: string;
}) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
      { "@type": "ListItem", position: 2, name: opts.breadcrumbName, item: opts.url },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: opts.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: opts.url },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
    ],
    links: [{ rel: "canonical", href: opts.url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  };
}
