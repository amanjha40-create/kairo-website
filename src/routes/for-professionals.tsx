import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  BadgeCheck,
  Lock,
  Share2,
  ShieldCheck,
  Fingerprint,
  Building2,
  GraduationCap,
  RefreshCw,
  UserCheck,
  FileCheck2,
  Sparkles,
} from "lucide-react";
import {
  PageHero,
  Section,
  SplitSection,
  BenefitGrid,
  FinalCTA,
} from "@/components/product-pages/shared";
import { PhoneFrame, productScreens } from "@/components/product/screens";

const TITLE = "For Professionals — Kairo";
const DESC =
  "Build a Trust Passport you own for life and share with consent across every opportunity.";

export const Route = createFileRoute("/for-professionals")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForProfessionalsPage,
});

function ResetLoopVisual() {
  const stops = ["First job", "Second job", "Third job", "Next opportunity"];
  return (
    <div className="rounded-2xl border border-border/80 bg-card shadow-premium p-6">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Trust today
      </div>
      <div className="mt-5 space-y-3">
        {stops.map((s) => (
          <div
            key={s}
            className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5"
          >
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm font-medium">{s}</div>
            <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Verify again
            </span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
        Every new opportunity starts your professional trust from zero.
      </p>
    </div>
  );
}

function ForProfessionalsPage() {
  return (
    <SiteLayout>
      <PageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Solutions", to: "/for-professionals" },
          { label: "For Professionals" },
        ]}
        eyebrow="For Professionals"
        title="Your professional trust,"
        gradientWord="ready wherever you go."
        intro="Verify once. Own forever. Share with consent. Kairo gives professionals a Trust Passport that carries verified employment, education and identity across every opportunity."
        right={
          <div className="flex justify-center">
            <PhoneFrame
              src={productScreens.profile.src}
              alt={productScreens.profile.alt}
              size="lg"
              label="Your Trust Passport"
              caption="Verified · Portable · Owned"
            />
          </div>
        }
        ctaLabel="Get started"
        ctaTo="/signup"
        secondaryLabel="Learn about the Passport"
        secondaryTo="/trust-passport"
      />

      <Section
        eyebrow="The Problem"
        title="Professional trust"
        gradientWord="keeps starting over."
        intro="Every time you change jobs or pursue a new opportunity, the same verifications repeat — the same documents, the same waits, the same questions. Your professional history never travels with you."
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <ResetLoopVisual />
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              Resumes are self-declared. Certificates sit in inboxes. Employers
              re-verify what has already been verified — sometimes many times
              over.
            </p>
            <p>
              The trust you have built is real. It just doesn't move with you.
            </p>
          </div>
        </div>
      </Section>

      <SplitSection
        alt
        eyebrow="Your Trust Passport"
        title="One verified profile."
        gradientWord="Yours to carry."
        body="A Trust Passport brings your verified identity, employment, education and credentials into a single profile. It grows as new facts are verified and stays with you across roles and organisations."
        bullets={[
          {
            icon: Fingerprint,
            label: "Verified identity",
            desc: "Confirmed against trusted sources.",
          },
          {
            icon: Building2,
            label: "Employment history",
            desc: "Verified roles, dates and employers.",
          },
          {
            icon: GraduationCap,
            label: "Education & credentials",
            desc: "Verified degrees and certifications.",
          },
        ]}
        visual={
          <div className="flex justify-center">
            <PhoneFrame
              src={productScreens.vault.src}
              alt={productScreens.vault.alt}
              size="md"
              label="Inside your passport"
              caption="Verified facts, organised"
            />
          </div>
        }
      />

      <SplitSection
        reverse
        eyebrow="Own Your Professional Trust"
        title="Built once."
        gradientWord="Owned for life."
        body="Your Trust Passport belongs to you — not to an employer, an agency or a platform. It stays with you as you change jobs, industries and countries, and deepens as you add new verifications."
        bullets={[
          {
            icon: Lock,
            label: "Individual-owned",
            desc: "Your profile, under your control.",
          },
          {
            icon: Sparkles,
            label: "Grows over time",
            desc: "New verifications add to your record.",
          },
          {
            icon: ShieldCheck,
            label: "Portable",
            desc: "Moves with you across every opportunity.",
          },
        ]}
        visual={
          <div className="flex justify-center">
            <PhoneFrame
              src={productScreens.home.src}
              alt={productScreens.home.alt}
              size="md"
              label="Your dashboard"
              caption="Trust that follows your career"
            />
          </div>
        }
      />

      <SplitSection
        alt
        eyebrow="Share With Confidence"
        title="Shared only"
        gradientWord="on your terms."
        body="Sharing your Trust Passport is always a deliberate choice. Decide what to share, with whom, and for how long — and revoke access whenever you want."
        bullets={[
          {
            icon: Share2,
            label: "Granular consent",
            desc: "Choose exactly which facts to share.",
          },
          {
            icon: Lock,
            label: "Revocable access",
            desc: "End access at any time.",
          },
          {
            icon: FileCheck2,
            label: "Full audit trail",
            desc: "See every share and every request.",
          },
        ]}
        visual={
          <div className="flex justify-center">
            <PhoneFrame
              src={productScreens.share.src}
              alt={productScreens.share.alt}
              size="md"
              label="Consent-based sharing"
              caption="Share with a scan or a link"
            />
          </div>
        }
      />

      <Section
        eyebrow="How It Works"
        title="From onboarding"
        gradientWord="to trusted profile."
        intro="Building a Trust Passport is a simple, consent-first flow."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              i: UserCheck,
              t: "Create your profile",
              d: "Set up your Kairo account.",
            },
            {
              i: Fingerprint,
              t: "Verify your identity",
              d: "Confirm who you are, once.",
            },
            {
              i: BadgeCheck,
              t: "Add verified facts",
              d: "Employment, education, credentials.",
            },
            {
              i: Share2,
              t: "Share with consent",
              d: "Send your Passport where it's needed.",
            },
          ].map((s, i) => (
            <div
              key={s.t}
              className="relative rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="absolute -top-3 left-5 h-6 w-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center shadow-glow">
                {i + 1}
              </div>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center mt-2">
                <s.i className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-3 text-sm font-semibold">{s.t}</div>
              <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        alt
        eyebrow="Benefits"
        title="Why professionals"
        gradientWord="build a Trust Passport."
      >
        <BenefitGrid
          items={[
            {
              icon: ShieldCheck,
              title: "Skip repeat verification",
              desc: "Avoid re-submitting the same documents for every new opportunity.",
            },
            {
              icon: Lock,
              title: "Stay in control",
              desc: "Nothing is shared without an explicit consent action from you.",
            },
            {
              icon: BadgeCheck,
              title: "Carry a trusted reputation",
              desc: "A verified profile that follows you across roles and employers.",
            },
          ]}
        />
      </Section>

      <FinalCTA
        title="Your professional trust,"
        gradientWord="ready when you are."
        body="Build a Trust Passport once and carry verified employment, education and identity across every opportunity."
        primary={{ label: "Get started", to: "/signup" }}
        secondary={{ label: "Explore the Passport", to: "/trust-passport" }}
      />
    </SiteLayout>
  );
}
