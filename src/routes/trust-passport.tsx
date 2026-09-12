import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Fingerprint, Building2, GraduationCap, BadgeCheck, ShieldCheck, Lock, Share2, Clock, CheckCircle2, FileText } from "lucide-react";
import { PageHero, Section, SplitSection, BenefitGrid, FinalCTA } from "@/components/product-pages/shared";
import { PhoneFrame, productScreens } from "@/components/product/screens";

const TITLE = "Trust Passport — KairoID";
const DESC = "One verified professional identity that professionals own for life and share with consent.";

export const Route = createFileRoute("/trust-passport")({
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
  component: TrustPassportPage,
});

function TimelineVisual() {
  const items = [
    { t: "Identity verified", d: "Government ID confirmed", ok: true },
    { t: "Employment verified", d: "Acme Corp · 2022–2024", ok: true },
    { t: "Education verified", d: "Northstar University", ok: true },
    { t: "Certification verified", d: "Cloud Practitioner", ok: true },
    { t: "New employer verification", d: "Requested with consent", ok: false },
  ];
  return (
    <div className="relative rounded-2xl border border-border/80 bg-card shadow-premium p-6">
      <div className="absolute -inset-6 bg-gradient-to-tr from-primary/25 via-info/15 to-transparent blur-3xl rounded-full -z-10" />
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Verification timeline</div>
      <ol className="mt-4 relative border-l border-border ml-3 space-y-4">
        {items.map((it, i) => (
          <li key={i} className="pl-5 relative">
            <span className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 ${it.ok ? "bg-success/20 border-success" : "bg-warning/20 border-warning"} flex items-center justify-center`}>
              {it.ok ? <CheckCircle2 className="h-2.5 w-2.5 text-success" /> : <Clock className="h-2.5 w-2.5 text-warning" />}
            </span>
            <div className="text-sm font-semibold">{it.t}</div>
            <div className="text-xs text-muted-foreground">{it.d}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TrustPassportPage() {
  return (
    <SiteLayout>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Product", to: "/product" }, { label: "Trust Passport" }]}
        eyebrow="Trust Passport"
        title="Your professional trust,"
        gradientWord="owned for life."
        intro="A Trust Passport brings verified employment, education, certifications and identity into one portable profile — built once, owned by the individual, and shared only with consent."
        right={
          <div className="flex justify-center">
            <PhoneFrame src={productScreens.profile.src} alt={productScreens.profile.alt} size="lg" label="Trust Passport" caption="Verified · Portable · Owned" />
          </div>
        }
        secondaryLabel="See how it fits together"
        secondaryTo="/product"
      />

      <Section
        eyebrow="What is a Trust Passport?"
        title="One verified profile"
        gradientWord="that moves with you."
        intro="Professional trust today resets with every new opportunity. A Trust Passport turns verified facts about a professional into a portable, reusable profile — so trust is built once and carried forward."
      >
        <BenefitGrid
          items={[
            { icon: BadgeCheck, title: "Verified at the source", desc: "Facts are confirmed with employers, institutions and issuers directly." },
            { icon: Lock, title: "Owned by the individual", desc: "The passport belongs to the professional — for life." },
            { icon: Share2, title: "Shared with consent", desc: "Every share is granular, revocable and audit-logged." },
          ]}
        />
      </Section>

      <SplitSection
        alt
        eyebrow="What's inside it?"
        title="Every verified fact,"
        gradientWord="in one place."
        body="A Trust Passport is more than a resume. It is a verified record of a professional's identity, employment, education and credentials — updated over time as new facts are verified."
        bullets={[
          { icon: Fingerprint, label: "Identity", desc: "Verified name and government identity." },
          { icon: Building2, label: "Employment", desc: "Verified roles, dates and employers." },
          { icon: GraduationCap, label: "Education", desc: "Verified degrees and institutions." },
          { icon: BadgeCheck, label: "Certifications", desc: "Verified professional credentials." },
        ]}
        visual={
          <div className="flex justify-center">
            <PhoneFrame src={productScreens.vault.src} alt={productScreens.vault.alt} size="md" label="Inside the passport" caption="Verified facts, organised" />
          </div>
        }
      />

      <SplitSection
        reverse
        eyebrow="Consent & Sharing"
        title="Shared only"
        gradientWord="on your terms."
        body="Sharing a Trust Passport is always a deliberate action. Professionals choose what to share, with whom, and for how long — and can revoke access at any time."
        bullets={[
          { icon: Share2, label: "Granular consent", desc: "Choose exactly which facts to share." },
          { icon: Lock, label: "Revocable access", desc: "End access at any time." },
          { icon: FileText, label: "Audit trail", desc: "Every share is logged and visible." },
        ]}
        visual={
          <div className="flex justify-center">
            <PhoneFrame src={productScreens.share.src} alt={productScreens.share.alt} size="md" label="Consent-based sharing" caption="Share with a scan or a link" />
          </div>
        }
      />

      <Section
        alt
        eyebrow="Verification Timeline"
        title="Trust that"
        gradientWord="grows over time."
        intro="A Trust Passport is not a one-time snapshot. New verifications are added over a professional's career, so the profile deepens with every opportunity."
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <TimelineVisual />
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>Each verification is captured with the source, date and consent details, giving employers a clear, trustworthy record.</p>
            <p>Because the passport belongs to the individual, the timeline stays with them across every role, employer and institution.</p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Why professionals use it"
        title="Verify once."
        gradientWord="Own forever."
      >
        <BenefitGrid
          items={[
            { icon: ShieldCheck, title: "Skip repeat verification", desc: "Avoid re-submitting the same documents to every new employer." },
            { icon: Lock, title: "Stay in control", desc: "Nothing is shared without an explicit consent action." },
            { icon: BadgeCheck, title: "Build a trusted reputation", desc: "A verified profile that follows you across your career." },
          ]}
        />
      </Section>

      <FinalCTA
        title="Your professional trust,"
        gradientWord="ready when you are."
        body="Build a Trust Passport once and carry verified employment, education and identity across every opportunity."
        secondary={{ label: "See the full product", to: "/product" }}
      />
    </SiteLayout>
  );
}
