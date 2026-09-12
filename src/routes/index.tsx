import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2,
  Clock, UserCheck, BarChart3,
  TrendingUp, Users, Filter, Download, Activity,
  LayoutDashboard, FileText, Settings, Bell,
  Fingerprint, BadgeCheck, Building2, Zap,
  GraduationCap,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

import { TrustResetsProblem } from "@/components/home/TrustResetsProblem";
import { TrustMovesWithYou } from "@/components/home/TrustMovesWithYou";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { HeroFloatingCards } from "@/components/motion/HeroFloatingCards";
import { Counter } from "@/components/motion/Counter";
import { motion } from "framer-motion";
import { PhoneFrame, productScreens } from "@/components/product/screens";
import { HR_WORKSPACE_URL, siteUrl, urlHost, urlLabel } from "@/lib/domain-config";
import { SmartLink } from "@/components/site/SmartLink";

const PAGE_URL = siteUrl("/");
const PAGE_TITLE = "KairoID — AI Verified Professional Identity Platform";
const PAGE_DESC =
  "KairoID: Verify once. Trusted everywhere. Build reusable Trust Profiles from source-verified professional information.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { name: "keywords", content: "AI background verification, candidate verification, employment verification, reusable verification, portable trust profile, hiring fraud prevention, verified professional identity, India background check" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: PAGE_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: PAGE_TITLE,
          url: PAGE_URL,
          description: PAGE_DESC,
          isPartOf: { "@type": "WebSite", name: "KairoID", url: siteUrl("/") },
          about: {
            "@type": "Thing",
            name: "AI-powered verified professional identity and trust infrastructure",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});




const trustPillars = [
  "Faster hiring",
  "Portable trust",
  "Reusable verification",
  "Individual-owned trust",
  "Source-verified records",
];

function StatusChip({ label, tone }: { label: string; tone: "success" | "warning" | "info" | "muted" }) {
  const tones = {
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/15 text-warning-foreground border-warning/30",
    info: "bg-primary/10 text-primary border-primary/20",
    muted: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function TrustPassportFlow() {
  return (
    <div className="relative w-full max-w-full">
      <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-tr from-primary/30 via-info/20 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10 hidden sm:block" />

      <div className="rounded-2xl border border-border/80 bg-card shadow-premium overflow-hidden w-full">
        <div className="border-b border-border px-4 py-2.5 flex items-center justify-between bg-secondary/50">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
            <Fingerprint className="h-3.5 w-3.5 text-primary" />
            Trust Infrastructure
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Consent-based sharing
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-3"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-info/30 flex items-center justify-center text-xs font-bold text-foreground/70 shrink-0">
              AR
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Professional</div>
              <div className="text-sm font-semibold truncate">Aarav R.</div>
            </div>
            <StatusChip label="Individual-owned" tone="info" />
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="h-4 w-px bg-gradient-to-b from-primary/60 to-primary/20 origin-top"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="rounded-xl border border-border bg-card p-3"
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Verified facts</div>
              <BadgeCheck className="h-3.5 w-3.5 text-success" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { i: Fingerprint, l: "Identity" },
                { i: Building2, l: "Employment" },
                { i: GraduationCap, l: "Education" },
                { i: BadgeCheck, l: "Credentials" },
              ].map((f, idx) => (
                <motion.div
                  key={f.l}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 + idx * 0.08, duration: 0.3 }}
                  className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/30 px-2 py-1.5"
                >
                  <f.i className="h-3 w-3 text-primary shrink-0" />
                  <span className="text-[11px] font-medium truncate">{f.l}</span>
                  <CheckCircle2 className="h-3 w-3 text-success ml-auto shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.05, duration: 0.4 }}
              className="h-4 w-px bg-gradient-to-b from-primary/60 to-primary/20 origin-top"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-info/5 to-transparent p-4 shadow-glow"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Trust Passport</div>
                <div className="mt-1 text-base font-bold tracking-tight">Reusable · Portable · Owned</div>
                <div className="mt-1 text-[11px] text-muted-foreground">Verified once. Carried across every opportunity.</div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Trust score</div>
                <div className="text-2xl font-bold tabular-nums text-gradient-teal leading-none mt-0.5">
                  <Counter to={96} />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.35, duration: 0.4 }}
              className="h-4 w-px bg-gradient-to-b from-primary/60 to-primary/20 origin-top"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-3"
          >
            <div className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
              <Building2 className="h-4 w-4 text-info" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Shared with consent</div>
              <div className="text-sm font-semibold truncate">Northstar Labs · Hiring team</div>
            </div>
            <StatusChip label="Access granted" tone="success" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="relative w-full max-w-full">
      <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-tr from-primary/30 via-info/20 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10 hidden sm:block" />
      <div className="rounded-2xl border border-border/80 bg-card shadow-premium overflow-hidden w-full">
        <div className="border-b border-border px-3 sm:px-4 py-2.5 flex items-center gap-2 bg-secondary/50">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
          <div className="ml-3 text-[10px] sm:text-[11px] text-muted-foreground font-mono truncate">{urlLabel(HR_WORKSPACE_URL, "/people")}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr]">
          <div className="border-r border-border bg-secondary/30 p-3 space-y-1 hidden sm:block">
            {[
              { i: LayoutDashboard, l: "Overview" },
              { i: Users, l: "People", active: true },
              { i: FileText, l: "Verifications" },
              { i: Activity, l: "Reports" },
              { i: Settings, l: "Settings" },
            ].map((it) => (
              <div key={it.l} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] ${it.active ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"}`}>
                <it.i className="h-3.5 w-3.5" />
                {it.l}
              </div>
            ))}
          </div>
          <div className="p-4 space-y-3 min-w-0">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { l: "In Progress", v: "8", i: Clock, c: "text-info" },
                { l: "Verified", v: "24", i: CheckCircle2, c: "text-success" },
                { l: "Shared", v: "12", i: TrendingUp, c: "text-primary" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border border-border bg-card p-2.5">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.l}</div>
                    <s.i className={`h-3 w-3 ${s.c}`} />
                  </div>
                  <div className="text-base font-bold mt-1">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="px-3 py-2 bg-secondary/40 border-b border-border flex items-center justify-between">
                <div className="text-[11px] font-semibold">People</div>
                <div className="flex gap-1.5">
                  <div className="h-5 w-5 rounded border border-border bg-card flex items-center justify-center"><Filter className="h-3 w-3" /></div>
                  <div className="h-5 w-5 rounded border border-border bg-card flex items-center justify-center"><Download className="h-3 w-3" /></div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {[
                  { n: "Alex Mitchell", r: "Senior Engineer", s: "Verified", t: "success" as const, p: 100 },
                  { n: "Priya Raman", r: "Product Manager", s: "In Progress", t: "info" as const, p: 65 },
                  { n: "Sofia Alvarez", r: "Consultant", s: "Pending", t: "warning" as const, p: 25 },
                  { n: "Kabir Mehta", r: "Data Analyst", s: "Verified", t: "success" as const, p: 100 },
                ].map((row) => (
                  <div key={row.n} className="px-3 py-2 flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/30 to-info/30 flex items-center justify-center text-[10px] font-bold text-foreground/70 shrink-0">
                      {row.n.split(" ").map(x => x[0]).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-semibold truncate">{row.n}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{row.r}</div>
                    </div>
                    <div className="hidden sm:block w-16 h-1 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-info" style={{ width: `${row.p}%` }} />
                    </div>
                    <StatusChip label={row.s} tone={row.t} />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-2.5">
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <Bell className="h-3 w-3 text-primary" />
                <span className="font-semibold text-foreground">Recent activity</span>
                <span>· Priya R. shared their Trust Passport</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-mesh-hero -z-10" />
        <div className="absolute inset-0 bg-grid-faint -z-10 opacity-60" />
        <div className="mx-auto max-w-7xl px-5 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 sm:gap-12 lg:gap-16 items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary shadow-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Introducing Portable Trust
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-5 sm:mt-6 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  Professional trust{" "}
                  <span className="text-gradient-teal">shouldn&apos;t reset.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 sm:mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Every time you change jobs or pursue a new opportunity, your professional trust starts from zero.
                </p>
                <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  KairoID is building the Trust Infrastructure that transforms verified professional facts into a reusable Trust Passport that you own and share with consent.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                  <Button asChild size="lg" className="btn-premium btn-glow rounded-xl h-12 px-6 text-sm font-semibold w-full sm:w-auto">
                    <Link
                      to="/contact"
                      onClick={() => trackEvent("cta_click", { location: "hero", label: "book_a_demo" })}
                    >
                      Book a demo <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 px-6 rounded-xl border-border bg-card shadow-soft hover:bg-card hover:border-primary/40 hover:shadow-glow text-sm font-semibold w-full sm:w-auto transition-all">
                    <Link
                      to="/portable-trust-profiles"
                      onClick={() => trackEvent("cta_click", { location: "hero", label: "explore_trust_passport" })}
                    >
                      Explore the Trust Passport <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
              <Stagger className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground" delay={0.3} stagger={0.1}>
                {[
                  { l: "Individual-owned", i: UserCheck },
                  { l: "Verified facts", i: BadgeCheck },
                  { l: "Shared with consent", i: Fingerprint },
                ].map((b) => (
                  <StaggerItem key={b.l} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-success" /> <span className="font-medium text-foreground/80">{b.l}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroFloatingCards />
              <TrustPassportFlow />
            </motion.div>
          </div>



          <div className="mt-20 lg:mt-28">
            <Reveal>
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Built for the next generation of hiring
              </p>
            </Reveal>
            <Stagger className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5" stagger={0.06}>
              {trustPillars.map((l, i) => (
                <StaggerItem key={l} className="flex items-center gap-x-10">
                  {i > 0 && <span className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground/40" />}
                  <span className="text-lg md:text-xl font-semibold tracking-tight text-foreground/80 hover:text-primary transition-colors">
                    {l}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

        </div>
      </section>

      {/* THE PROBLEM — trust resets */}
      <TrustResetsProblem />

      {/* A BETTER WAY — trust moves with you */}
      <TrustMovesWithYou />



      {/* SEE KairoID IN ACTION — product preview */}
      <section className="relative border-b border-border overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-faint opacity-40 -z-10" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full bg-primary/10 blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-5 sm:px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> The Trust Passport
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              One trusted profile. <span className="text-gradient-teal">Yours to carry.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              Your Trust Passport brings together your verified employment, education, certifications, and professional identity into one secure profile.
            </p>
            <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed">
              Own it throughout your career. Share it only with your consent.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-end">
            <div className="md:translate-y-6">
              <PhoneFrame {...productScreens.profile} label="Trust Score" caption="Employment, education and certifications, verified." size="sm" delay={0} />
            </div>
            <div>
              <PhoneFrame {...productScreens.vault} label="Verification History" caption="Every verified record, in one profile you own." size="md" delay={0.1} />
            </div>
            <div className="md:translate-y-6">
              <PhoneFrame {...productScreens.share} label="Secure Sharing" caption="Share your Trust Passport only with your consent." size="sm" delay={0.2} />
            </div>
          </div>


          <div className="mt-14 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="btn-premium rounded-xl h-12 px-6 font-semibold">
              <Link to="/portable-trust-profiles">Explore the platform <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 rounded-xl border-border bg-card shadow-soft hover:border-primary/40 font-semibold">
              <Link to="/how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>
      </section>



      {/* EMPLOYERS — employment verification reimagined */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-px w-8 bg-primary/40" />For employers
              </div>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Employment verification, <span className="text-gradient-teal">reimagined.</span>
              </h2>
              <div className="mt-5 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Hiring shouldn&apos;t begin with chasing documents and repeating the same employment checks.
                </p>
                <p>
                  With KairoID, candidates share a trusted professional profile built from verified employment history, education, and certifications—giving employers faster, more reliable verification with the individual&apos;s consent.
                </p>
                <p>
                  Employment verification is the first application of KairoID&apos;s Trust Infrastructure, making trust portable instead of rebuilding it for every hiring process.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { i: Zap, t: "Faster employment verification" },
                  { i: UserCheck, t: "Trusted candidate profiles" },
                  { i: Fingerprint, t: "Consent-based access to verified information" },
                ].map((b) => (
                  <div key={b.t} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center">
                      <b.i className="h-4 w-4 text-primary" />
                    </div>
                    <div className="mt-3 text-sm font-semibold leading-snug">{b.t}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild size="lg" className="btn-premium rounded-xl h-12 px-6">
                  <SmartLink to={HR_WORKSPACE_URL}>Open HR Workspace <ArrowRight className="ml-1.5 h-4 w-4" /></SmartLink>
                </Button>
              </div>
            </div>
            <DashboardMock />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark opacity-80" />
        <div className="absolute inset-0 bg-grid-faint opacity-10" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-background/10 bg-background/5 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Ready to get started?
              </div>
              <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-background">
                Professional trust{" "}
                <span className="text-gradient-teal">should move with you.</span>
              </h2>
              <p className="mt-5 text-base md:text-lg text-background/70 max-w-xl leading-relaxed">
                Whether you&apos;re building your professional reputation or hiring with confidence, KairoID makes trusted professional information portable, reusable, and always shared with your consent.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-xl h-12 px-6 shadow-premium font-semibold">
                  <Link to="/contact">Book a demo <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl h-12 px-6 border-background/20 bg-background/5 text-background hover:bg-background/15 hover:text-background backdrop-blur font-semibold">
                  <Link to="/portable-trust-profiles">Explore the Trust Passport</Link>
                </Button>
              </div>
            </div>
            {/* dark mode dashboard */}
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
                      { l: "TAT avg", v: "1.9d" },
                      { l: "Active", v: "42" },
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
                  <div className="rounded-lg border border-background/10 bg-background/5 divide-y divide-background/5">
                    {[
                      { n: "Ravi Kumar", s: "Verified" },
                      { n: "Anita Desai", s: "In Review" },
                    ].map((r) => (
                      <div key={r.n} className="px-3 py-2 flex items-center justify-between text-[11px]">
                        <span className="font-medium">{r.n}</span>
                        <span className="text-primary">{r.s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
