import { SiteLayout } from "@/components/site/SiteLayout";
import { Sparkles } from "lucide-react";

export function PagePlaceholder({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <SiteLayout>
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero -z-10" />
        <div className="absolute inset-0 bg-grid-faint opacity-60 -z-10" />
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> {eyebrow}
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            {title}
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 md:py-24">
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 md:p-14 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Coming next
          </div>
          <div className="mt-3 text-lg md:text-xl font-medium text-foreground">
            Page content coming next
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
            We're finalizing this page. Full content, visuals and product story land in the next update.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
