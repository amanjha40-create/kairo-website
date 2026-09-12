import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AboutScrollStory } from "@/components/about/AboutScrollStory";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Linkedin,
  ShieldCheck,
  Zap,
  Globe2,
  Sparkles,
  CheckCircle2,
  Lock,
  Gauge,
  Building2,
  FileCheck2,
  UserCheck,
  Clock,
  Layers,
} from "lucide-react";
import { siteUrl } from "@/lib/domain-config";

const PAGE_URL = siteUrl("/about");
const PAGE_TITLE = "About KairoID — Building the Trust Layer for Modern Hiring";
const PAGE_DESC =
  "KairoID builds AI-powered verified identity infrastructure — replacing slow background checks with reusable, source-verified trust profiles.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: PAGE_TITLE,
          url: PAGE_URL,
          description: PAGE_DESC,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
            { "@type": "ListItem", position: 2, name: "About", item: PAGE_URL },
          ],
        }),
      },
    ],
  }),
  component: AboutPage,
});

const heroBullets = [
  { icon: CheckCircle2, label: "Source-verified records" },
  { icon: Gauge, label: "Real-time verification tracking" },
  { icon: Layers, label: "Portable trust profile" },
  { icon: UserCheck, label: "Candidate-owned identity" },
];

const missionCards = [
  {
    icon: Layers,
    title: "Portable trust",
    desc: "Candidates shouldn't repeatedly prove the same credentials across every employer.",
  },
  {
    icon: Zap,
    title: "Less repeat verification",
    desc: "Source-verified records live inside the candidate's Trust Passport, so hiring teams don't restart verification from scratch every time.",
  },
  {
    icon: Building2,
    title: "Reusable verification",
    desc: "One verified profile, used across every opportunity — no repeated background checks.",
  },
];

const team = [
  {
    name: "Aman Jha",
    role: "Co-Founder",
    bio: "Background across financial services, operations, and trust workflows. Previously worked with Morningstar and Baker Tilly.",
    initials: "AJ",
    linkedin: "https://www.linkedin.com/in/aman-jha40/",
  },
  {
    name: "Ankit Singh",
    role: "Co-Founder",
    bio: "Built scalable systems across payments, infrastructure, and identity platforms. Previously worked with Infosys and Juspay.",
    initials: "AS",
    linkedin: "https://www.linkedin.com/in/ankit-singh-85045b160/",
  },
];

const values = [
  {
    icon: ShieldCheck,
    eyebrow: "Trust by default",
    desc: "Every verification should strengthen confidence, not create friction.",
    span: "md:col-span-2",
    tone: "from-primary/15 via-primary/5 to-transparent",
  },
  {
    icon: Lock,
    eyebrow: "Privacy first",
    desc: "Candidates control sensitive information with explicit consent workflows.",
    span: "",
    tone: "from-info/15 via-info/5 to-transparent",
  },
  {
    icon: Clock,
    eyebrow: "Speed matters",
    desc: "Hiring delays cost companies time, talent, and momentum.",
    span: "",
    tone: "from-primary/10 via-info/5 to-transparent",
  },
  {
    icon: Globe2,
    eyebrow: "Built to scale",
    desc: "From startups to enterprise hiring teams operating across geographies.",
    span: "md:col-span-2",
    tone: "from-info/10 via-primary/5 to-transparent",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero -z-10" />
        <div className="absolute inset-0 bg-grid-faint opacity-60 -z-10" />
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-primary/15 blur-3xl -z-10" />
        <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-info/10 blur-3xl -z-10" />

        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> About KairoID
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04]">
              Building the <span className="text-gradient-teal">trust layer</span> for modern hiring.
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              KairoID helps companies verify candidates faster with trusted employment, education, identity, and background verification — all through one unified platform.
            </p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3 max-w-xl">
              {heroBullets.map((b) => (
                <li key={b.label} className="flex items-center gap-3 rounded-xl border border-border bg-card/70 backdrop-blur px-4 py-3 shadow-soft">
                  <span className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <b.icon className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-sm font-medium">{b.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="btn-premium rounded-xl h-12 px-6 font-semibold">
                <Link to="/contact">Book a demo <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 rounded-xl border-border bg-card shadow-soft hover:bg-card hover:border-primary/40 hover:-translate-y-0.5 transition-all font-semibold">
                <Link to="/contact">Talk to us</Link>
              </Button>

            </div>
          </div>

          {/* Right — dashboard mockup */}
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/30 via-info/20 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />
            <div className="relative rounded-3xl border border-border bg-card shadow-premium p-6 md:p-7 overflow-hidden">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Verification queue</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Live · 24 in progress</div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] font-semibold text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Active
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {[
                  { name: "Priya Sharma", check: "Employment · Infosys", status: "Verified", tone: "primary" },
                  { name: "Rohan Mehta", check: "Education · IIT Bombay", status: "In review", tone: "info" },
                  { name: "Anika Iyer", check: "Identity · Aadhaar", status: "Verified", tone: "primary" },
                  { name: "Vikram Patel", check: "Address · Bengaluru", status: "Source check", tone: "info" },
                ].map((r) => (
                  <div key={r.name} className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3.5 py-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-info/20 border border-border flex items-center justify-center text-[10px] font-bold">
                        {r.name.split(" ").map((s) => s[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{r.name}</div>
                        <div className="text-[10px] text-muted-foreground truncate">{r.check}</div>
                      </div>
                    </div>
                    <div className={`text-[10px] font-semibold px-2 py-1 rounded-md ${r.tone === "primary" ? "bg-primary/10 text-primary" : "bg-info/10 text-info"}`}>
                      {r.status}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {[
                  { l: "Avg TAT", v: "2.1d" },
                  { l: "Pass rate", v: "94%" },
                  { l: "Sources", v: "120+" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-border bg-background/60 p-3 text-center">
                    <div className="text-base font-bold text-gradient-teal">{s.v}</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL STORY — Identity → Trust */}
      <AboutScrollStory />

      {/* MISSION / WHY */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-faint opacity-40" />
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3 w-3" /> Our story
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
              Why we built <span className="text-gradient-teal">KairoID.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              Hiring still runs on fragmented documents, manual calls, and unverifiable claims. KairoID replaces outdated verification workflows with a faster, trusted, and reusable infrastructure layer for modern hiring teams.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {missionCards.map((c) => (
              <div key={c.title} className="group relative rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-elevated hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/5 group-hover:bg-primary/15 blur-2xl transition-colors" />
                <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="relative border-b border-border bg-secondary/30 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero opacity-40 -z-10" />
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              <UserCheck className="h-3 w-3" /> Founders
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
              Built by operators who understand <span className="text-gradient-teal">hiring infrastructure.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              KairoID is being built to modernize trust and verification infrastructure for the next generation of hiring.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {team.map((m) => (
              <div key={m.name} className="group relative rounded-3xl border border-border bg-card shadow-premium p-8 md:p-10 overflow-hidden hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-primary/20 via-info/10 to-transparent blur-2xl" />
                <div className="relative flex items-start gap-6">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-primary to-info opacity-30 blur-md group-hover:opacity-60 transition-opacity" />
                    <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full bg-gradient-to-br from-primary to-info text-white flex items-center justify-center text-2xl md:text-3xl font-bold shadow-premium ring-4 ring-card">
                      {m.initials}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight">{m.name}</h3>
                    <div className="mt-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{m.role}</div>
                    <p className="mt-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed">{m.bio}</p>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs font-semibold hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:-translate-y-0.5 transition-all"
                    >
                      <Linkedin className="h-3.5 w-3.5" /> Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES — bento */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-faint opacity-40" />
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3 w-3" /> Principles
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
              What we <span className="text-gradient-teal">believe.</span>
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {values.map((v) => (
              <div
                key={v.eyebrow}
                className={`group relative rounded-2xl border border-border bg-card p-7 md:p-8 shadow-card hover:shadow-elevated hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 overflow-hidden ${v.span}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${v.tone} opacity-60`} />
                <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl bg-card/80 backdrop-blur border border-border flex items-center justify-center shadow-soft">
                    <v.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">{v.eyebrow}</div>
                  <p className="mt-2 text-base md:text-lg font-semibold leading-snug text-foreground/90">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark opacity-70" />
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 relative">
          <div className="rounded-3xl border border-background/10 glass-dark p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-premium">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-2xl">
                See how KairoID transforms hiring verification.
              </h2>
              <p className="mt-3 text-background/70 max-w-xl">
                Book a walkthrough tailored to your hiring volume and verification workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 rounded-xl h-12 px-6 font-semibold shadow-premium">
                <Link to="/contact">Book a demo <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl h-12 px-6 font-semibold border-background/20 bg-transparent text-background hover:bg-background/10">
                <Link to="/blog">Read the blog</Link>
              </Button>

            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
