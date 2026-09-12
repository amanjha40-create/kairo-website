import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Lock,
  Sparkles,
  FileCheck2,
  Fingerprint,
  Layers,
  Building2,
  Eye,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { buildSeoHead, type SeoFaq } from "@/components/site/SeoLandingTemplate";
import { siteUrl } from "@/lib/domain-config";

const URL = siteUrl("/trust-center");
const TITLE = "Trust Center — Verification Methodology, Privacy & Consent | KairoID";
const DESC =
  "How KairoID verifies records, how candidate consent works, and the principles behind portable trust infrastructure.";

const faqs: SeoFaq[] = [
  { q: "Who owns a KairoID Trust Profile?", a: "The candidate. Trust Profiles are individual-owned and shared only with explicit consent." },
  { q: "How does consent work?", a: "Every verification is initiated by the candidate. They authorize the records to be verified and choose who can see the resulting Trust Profile." },
  { q: "What gets verified?", a: "Identity, employment history, education, references, certifications, and platform records — each verified directly with the issuing source." },
];

export const Route = createFileRoute("/trust-center")({
  head: () => buildSeoHead({ url: URL, title: TITLE, description: DESC, faqs, breadcrumbName: "Trust Center" }),
  component: Page,
});

const steps = [
  { i: UserCheck, t: "Candidate consent", d: "Every verification begins with explicit, granular consent from the candidate." },
  { i: Layers, t: "Record collection", d: "Candidates submit professional records — employment, education, identity — through a secure flow." },
  { i: Building2, t: "Source verification", d: "KairoID's engine routes each record to the issuing source — employers, universities, identity registries." },
  { i: FileCheck2, t: "Verification outcome", d: "Each record is marked verified, unverifiable, or flagged — with a full audit trail." },
  { i: Fingerprint, t: "Trust profile generation", d: "Verified records assemble into a portable Trust Profile that travels with the candidate." },
];

const principles = [
  { i: ShieldCheck, t: "Source Verified", d: "Every record is verified directly with the issuing institution — never inferred." },
  { i: UserCheck, t: "Candidate Controlled", d: "The individual decides what is shared, with whom, and for how long." },
  { i: Layers, t: "Reusable Trust", d: "A verified record can be reused across employers, platforms, and opportunities." },
  { i: Eye, t: "Transparent Process", d: "Candidates and employers see verification status, sources, and timestamps." },
  { i: Lock, t: "Enterprise Ready", d: "Encrypted handling of documents, consent trails, and audit-ready records." },
];

function Page() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero -z-10" />
        <div className="absolute inset-0 bg-grid-faint opacity-60 -z-10" />
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Trust Center
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04]">
            Built on <span className="text-gradient-teal">transparency</span> and verification.
          </h1>
          <p className="mx-auto mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            KairoID helps organizations verify employment information while giving individuals ownership over their professional trust records.
          </p>
          <p className="mt-4 text-xs text-muted-foreground/80 max-w-xl mx-auto">
            This page is maintained by KairoID to answer common questions about our verification methodology, privacy, and consent practices.
          </p>
        </div>
      </section>

      {/* HOW VERIFICATION WORKS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">How verification works</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">From consent to verified profile.</h2>
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <motion.li
                key={s.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-card transition-all"
              >
                <div className="text-xs font-mono text-muted-foreground">0{i + 1}</div>
                <div className="mt-3 h-9 w-9 rounded-lg bg-primary/10 text-primary inline-flex items-center justify-center">
                  <s.i className="h-4.5 w-4.5" />
                </div>
                <div className="mt-4 font-semibold">{s.t}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CANDIDATE OWNERSHIP + PRIVACY */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <Fingerprint className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-2xl font-bold">Candidate ownership</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Trust Profiles belong to the individual, not the employer. Candidates control which records are added, which records are shared, and which organisations have access. When access is revoked, sharing stops.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <Lock className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-2xl font-bold">Privacy & consent</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Verification only happens with explicit candidate consent. Documents are encrypted in transit and at rest. Every action is logged in an audit trail visible to the candidate.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Verification principles</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">The standards behind every check.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {principles.map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card-lift rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-card"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center">
                  <p.i className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold text-lg">{p.t}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Questions about our methodology?</h2>
          <p className="mt-4 text-muted-foreground text-lg">We're happy to walk security and compliance teams through every layer.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="btn-premium rounded-xl h-12 px-6 font-semibold">
              <Link to="/contact">Talk to our team <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 rounded-xl">
              <Link to="/privacy">Privacy policy</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
