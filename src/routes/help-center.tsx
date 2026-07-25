import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Search, Sparkles, Rocket, Fingerprint, Briefcase, Banknote,
  Building2, BookOpen, MessageSquare, Mail, ShieldCheck, Activity, Clock,
  PlayCircle, LifeBuoy,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { buildSeoHead, type SeoFaq } from "@/components/site/SeoLandingTemplate";
import { siteUrl } from "@/lib/domain-config";

const URL = siteUrl("/help-center");
const TITLE = "Help Center — Onboarding, FAQs & Support | Kairo";
const DESC = "Answers about Trust Profiles, employment verification, pricing, and getting started with Kairo.";

type FaqItem = SeoFaq & { category: string };

const categories = [
  { id: "getting-started", label: "Getting started", i: Rocket, desc: "Set up Kairo and run your first verification." },
  { id: "trust-profiles", label: "Trust Profiles", i: Fingerprint, desc: "Portable, candidate-owned verified identity." },
  { id: "employment", label: "Employment", i: Briefcase, desc: "Source-verified tenure, role and designation." },
  { id: "pricing", label: "Pricing & billing", i: Banknote, desc: "Plans, invoices and volume pricing." },
  { id: "enterprise", label: "Enterprise & API", i: Building2, desc: "API access, ATS integrations, SSO and SLAs." },
];

const popular = [
  { t: "How does Kairo verify employment?", to: "employment", read: "3 min" },
  { t: "What is a Trust Profile?", to: "trust-profiles", read: "2 min" },
  { t: "How candidate consent works", to: "trust-profiles", read: "2 min" },
  { t: "Pricing & per-verification cost", to: "pricing", read: "2 min" },
  { t: "Integrating Kairo with your ATS", to: "enterprise", read: "4 min" },
  { t: "How verification timing works", to: "employment", read: "1 min" },
];

const faqs: FaqItem[] = [
  { category: "getting-started", q: "How does Kairo work?", a: "Kairo verifies a candidate's identity, employment, education, and references directly with the source, then assembles the results into a portable Trust Profile owned by the candidate." },
  { category: "getting-started", q: "How do I start using Kairo?", a: "Book a demo or sign up. Our team helps you set up your verification workflow, invite your first candidates, and integrate with your ATS if needed." },
  { category: "trust-profiles", q: "What is a Trust Profile?", a: "A Trust Profile is a candidate-owned, source-verified record of professional identity that can be reused across jobs, platforms, and opportunities." },
  { category: "trust-profiles", q: "Can candidates reuse verified records?", a: "Yes. Once a record is verified, the candidate can share it with future employers without re-running the check." },
  { category: "trust-profiles", q: "How does candidate consent work?", a: "Every verification requires explicit candidate consent. Candidates control what is verified, who sees their Trust Profile, and can revoke access at any time." },
  { category: "employment", q: "How is employment verified?", a: "Kairo contacts the candidate's employer directly using verified employer channels. Records are confirmed at the source — never inferred from documents alone." },
  { category: "employment", q: "How long does verification take?", a: "Timing depends on how quickly employers and issuers respond. Records already verified inside a candidate's Trust Passport can be reused with consent, so repeat verifications are faster." },
  { category: "pricing", q: "How much does verification cost?", a: "Kairo starts at ₹99 per verification with volume pricing for growing teams. International and enterprise plans are available." },
  { category: "pricing", q: "Do I need a long-term contract?", a: "No. Kairo offers pay-as-you-go pricing with no long-term commitments. Enterprise contracts are available on request." },
  { category: "enterprise", q: "Do you offer API access?", a: "Yes. Kairo provides verification APIs and webhooks for platforms, marketplaces, and enterprise hiring teams." },
  { category: "enterprise", q: "Can Kairo integrate with our ATS?", a: "We support common ATS integrations and offer API-first workflows for custom systems." },
];

export const Route = createFileRoute("/help-center")({
  head: () => buildSeoHead({ url: URL, title: TITLE, description: DESC, faqs, breadcrumbName: "Help Center" }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchCat = !active || f.category === active;
      const matchQ = !q.trim() || (f.q + " " + f.a).toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [q, active]);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero -z-10" />
        <div className="absolute inset-0 bg-grid-faint opacity-60 -z-10" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full bg-primary/10 blur-3xl -z-10" />
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] shadow-soft"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Help Center
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.02]"
          >
            How can we <span className="text-gradient-teal">help?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-5 text-muted-foreground text-lg max-w-xl"
          >
            Search guides, FAQs, and step-by-step answers on Kairo's verification platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles, guides, FAQs…"
              className="w-full h-16 pl-14 pr-32 rounded-2xl border border-border bg-card/90 backdrop-blur shadow-elevated text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-glow transition-all"
            />
            <kbd className="hidden md:inline-flex absolute right-5 top-1/2 -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-secondary/60 px-2 py-1 text-[10px] font-semibold text-muted-foreground">
              ⌘ K
            </kbd>
          </motion.div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-success" /> All systems normal</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary" /> We aim to respond within 1 business day</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Privacy-first, consent-based platform</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-8 bg-primary/40" /> Browse by topic
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Find what you need, faster.</h2>
            <p className="mt-3 text-muted-foreground">Five focused areas covering everything from onboarding to enterprise integrations.</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <motion.button
                key={c.id}
                onClick={() => setActive(c.id === active ? null : c.id)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className={`group text-left rounded-2xl border bg-card p-6 shadow-soft transition-all ${active === c.id ? "border-primary/50 shadow-glow" : "border-border hover:border-primary/30 hover:shadow-card"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center">
                    <c.i className="h-5 w-5 text-primary" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <div className="mt-5 text-base font-semibold">{c.label}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {faqs.filter(f => f.category === c.id).length} articles
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR + FAQ */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 grid gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Sidebar: filter + popular */}
          <aside className="lg:sticky lg:top-24 self-start space-y-8">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Filter</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setActive(null)}
                  className={`px-3 h-8 rounded-full text-xs font-medium border transition-all ${!active ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground hover:border-primary/30"}`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActive(c.id)}
                    className={`px-3 h-8 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 transition-all ${active === c.id ? "bg-primary/10 border-primary/40 text-primary" : "bg-card border-border text-muted-foreground hover:border-primary/30"}`}
                  >
                    <c.i className="h-3 w-3" /> {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                <BookOpen className="h-3.5 w-3.5" /> Popular reads
              </div>
              <ul className="mt-4 divide-y divide-border">
                {popular.map((p) => (
                  <li key={p.t}>
                    <button
                      onClick={() => { setActive(p.to); setQ(""); }}
                      className="group w-full text-left py-3 flex items-start justify-between gap-3"
                    >
                      <span className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">{p.t}</span>
                      <span className="text-[10px] text-muted-foreground tabular-nums shrink-0 mt-0.5">{p.read}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Articles */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {active ? categories.find(c => c.id === active)?.label : "All articles"}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{filtered.length} result{filtered.length === 1 ? "" : "s"}</div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
                <div className="text-base font-semibold">No matches</div>
                <p className="mt-2 text-sm text-muted-foreground">Try a broader search or pick a different category.</p>
              </div>
            ) : (
              <div className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
                {filtered.map((f, i) => (
                  <motion.details
                    key={f.q}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.02 }}
                    className="group p-6 hover:bg-secondary/40 transition-colors"
                  >
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex items-center justify-center h-6 px-2 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                          {categories.find(c => c.id === f.category)?.label.split(" ")[0]}
                        </span>
                        <span className="font-semibold text-foreground">{f.q}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90 mt-1 shrink-0" />
                    </summary>
                    <p className="mt-3 ml-[68px] text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </motion.details>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SUPPORT CHANNELS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-8 bg-primary/40" /> Still stuck? <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Talk to a human.</h2>
            <p className="mt-3 text-muted-foreground">Three ways to reach the Kairo team. We respond fast.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { Icon: MessageSquare, t: "Live chat", d: "Best for product questions and quick fixes.", cta: "Start a chat", to: "/contact" },
              { Icon: Mail, t: "Email support", d: "Detailed questions or shared account issues.", cta: "Email us", to: "/contact" },
              { Icon: LifeBuoy, t: "Talk to sales", d: "Enterprise rollouts, API access, custom plans.", cta: "Book a call", to: "/contact" },
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border bg-card p-7 shadow-soft hover:border-primary/30 hover:shadow-card transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center">
                  <c.Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-5 text-lg font-semibold">{c.t}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                <Button asChild variant="outline" className="mt-5 rounded-xl group-hover:border-primary/40">
                  <Link to={c.to}>{c.cta} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS / RELATED */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/40 p-10 md:p-14 shadow-elevated">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <PlayCircle className="h-3.5 w-3.5" /> See it in action
                </div>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Still need help?</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Talk to the Kairo team about verification, consent, or your Trust Passport — we usually reply within one business day.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="btn-premium rounded-xl h-12 px-6 font-semibold">
                    <Link to="/contact">Contact us <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl h-12 px-6 font-semibold">
                    <Link to="/blog">Read the blog</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { t: "Blog", to: "/blog" },
                  { t: "Trust Center", to: "/trust-center" },
                  { t: "About Kairo", to: "/about" },
                  { t: "Contact", to: "/contact" },
                ].map((l) => (
                  <Link
                    key={l.t}
                    to={l.to}
                    className="group rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-soft transition-all flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold">{l.t}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
