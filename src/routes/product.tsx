import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Fingerprint, Building2, GraduationCap, BadgeCheck, ShieldCheck, Users, FileCheck2, Layers, Network, Lock, Share2, Workflow } from "lucide-react";
import { PageHero, Section, SplitSection, BenefitGrid, FinalCTA } from "@/components/product-pages/shared";
import { PhoneFrame, productScreens } from "@/components/product/screens";
import { Button } from "@/components/ui/button";
import { HR_WORKSPACE_URL, urlLabel } from "@/lib/domain-config";

const TITLE = "Product Overview — KairoID";
const DESC = "Portable professional trust infrastructure — the Trust Passport, HR Workspace and Institution Workspace working together.";

export const Route = createFileRoute("/product")({
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
  component: ProductOverview,
});

function ArchitectureDiagram() {
  const nodes = [
    { i: Fingerprint, l: "Trust Passport", d: "For professionals" },
    { i: Building2, l: "HR Workspace", d: "For employers" },
    { i: GraduationCap, l: "Institution Workspace", d: "For issuers" },
  ];
  return (
    <div className="relative rounded-2xl border border-border/80 bg-card shadow-premium p-6 sm:p-8">
      <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-tr from-primary/25 via-info/15 to-transparent blur-3xl rounded-full -z-10" />
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          <Network className="h-3 w-3" /> KairoID Trust Engine
        </div>
        <p className="mt-2 text-xs text-muted-foreground">The verification and consent layer connecting every workspace.</p>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {nodes.map((n) => (
          <div key={n.l} className="rounded-xl border border-border bg-secondary/30 p-4 text-center">
            <div className="mx-auto h-10 w-10 rounded-xl bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center">
              <n.i className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-3 text-sm font-semibold">{n.l}</div>
            <div className="text-[11px] text-muted-foreground">{n.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-dashed border-border p-4 text-center">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Underlying layer</div>
        <div className="mt-1 text-sm font-semibold">Consent · Verification · Portability</div>
      </div>
    </div>
  );
}

function ProductOverview() {
  return (
    <SiteLayout>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Product" }]}
        eyebrow="Product Overview"
        title="One trust network."
        gradientWord="Three workspaces."
        intro="KairoID is portable professional trust infrastructure — a Trust Passport owned by professionals, an HR Workspace for employers, and an Institution Workspace for credential issuers, all connected by consent."
        right={<ArchitectureDiagram />}
        secondaryLabel="Explore the Trust Passport"
        secondaryTo="/trust-passport"
      />

      <Section
        eyebrow="What is KairoID?"
        title="A trust layer for"
        gradientWord="professional information."
        intro="KairoID turns verified employment, education, identity and credential facts into a portable Trust Passport that professionals own and share with consent. Employers and institutions plug into the same network so trust is built once and reused everywhere."
      >
        <BenefitGrid
          columns={3}
          items={[
            { icon: ShieldCheck, title: "Verified at the source", desc: "Facts are verified with employers, institutions and issuers — not scraped or self-declared." },
            { icon: Lock, title: "Owned by the individual", desc: "A Trust Passport belongs to the professional. It moves with them across every opportunity." },
            { icon: Share2, title: "Shared with consent", desc: "Every share happens with a granular, revocable consent from the passport holder." },
          ]}
        />
      </Section>

      <Section
        alt
        eyebrow="Platform Architecture"
        title="How the pieces"
        gradientWord="fit together."
        intro="The KairoID Trust Engine handles verification, consent and portability. Three workspaces sit on top — one for each side of the trust relationship."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Layers, t: "KairoID Trust Engine", d: "The underlying verification and consent layer." },
            { i: Fingerprint, t: "Trust Passport", d: "Portable verified profile for professionals." },
            { i: Building2, t: "HR Workspace", d: "Where employers receive and act on trust." },
            { i: GraduationCap, t: "Institution Workspace", d: "Where issuers verify and issue records." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center">
                <c.i className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 text-base font-semibold">{c.t}</div>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <SplitSection
        eyebrow="Trust Passport"
        title="A verified profile"
        gradientWord="professionals own."
        body="A Trust Passport brings together verified employment, education, identity and credential facts into one portable profile. Professionals build it once and share it — with consent — across every opportunity."
        bullets={[
          { icon: BadgeCheck, label: "Verified facts, not claims", desc: "Every entry is verified at the source." },
          { icon: Lock, label: "Owned for life", desc: "The passport belongs to the individual." },
          { icon: Share2, label: "Shared on their terms", desc: "Consent is granular and revocable." },
        ]}
        visual={
          <div className="flex justify-center">
            <PhoneFrame src={productScreens.profile.src} alt={productScreens.profile.alt} size="md" label="Trust Passport" caption="A verified professional profile" />
          </div>
        }
      />

      <SplitSection
        alt
        reverse
        eyebrow="HR Workspace"
        title="Trust,"
        gradientWord="ready to act on."
        body="The HR Workspace is where employers receive verified Trust Passports, respond to inbound verification requests, and collaborate as a team — all with consent at the centre."
        bullets={[
          { icon: Users, label: "People directory", desc: "A single source of truth for every candidate and employee." },
          { icon: FileCheck2, label: "Employment verifications", desc: "Respond to verification requests from other organisations." },
          { icon: Workflow, label: "Team collaboration", desc: "Role-based access for HR, hiring managers and admins." },
        ]}
        visual={<DashboardVisual />}
      />

      <SplitSection
        eyebrow="Institution Workspace"
        title="Where credentials"
        gradientWord="become portable."
        body="Universities, colleges and credential issuers use the Institution Workspace to verify education records, respond to verification requests, and issue trusted credentials directly into a professional's Trust Passport."
        bullets={[
          { icon: GraduationCap, label: "Verify education records", desc: "Confirm degrees and credentials at the source." },
          { icon: BadgeCheck, label: "Issue verified records", desc: "Push trusted records into a Trust Passport." },
          { icon: ShieldCheck, label: "Alumni trust records", desc: "Maintain long-lived, trusted alumni credentials." },
        ]}
        visual={
          <div className="flex justify-center">
            <PhoneFrame src={productScreens.digilocker.src} alt={productScreens.digilocker.alt} size="md" label="Institution Workspace" caption="Credentials verified at the source" />
          </div>
        }
      />

      <Section
        alt
        eyebrow="Trust Infrastructure"
        title="Trust that"
        gradientWord="moves with people."
        intro="KairoID's role is to make professional trust portable — verified once, owned for life, shared with consent. That's the infrastructure the modern workforce is missing."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="btn-premium rounded-xl h-12 px-6">
            <Link to="/trust-passport">Explore the Trust Passport</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-xl h-12 px-6 border-border bg-card hover:border-primary/40">
            <Link to="/hr-workspace">See the HR Workspace</Link>
          </Button>
        </div>
      </Section>

      <FinalCTA secondary={{ label: "Explore the Trust Passport", to: "/trust-passport" }} />
    </SiteLayout>
  );
}

function DashboardVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-gradient-to-tr from-primary/25 via-info/15 to-transparent blur-3xl rounded-full -z-10" />
      <div className="rounded-2xl border border-border/80 bg-card shadow-premium overflow-hidden">
        <div className="border-b border-border px-4 py-2.5 flex items-center gap-2 bg-secondary/50">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
          <div className="ml-3 text-[11px] text-muted-foreground font-mono truncate">{urlLabel(HR_WORKSPACE_URL, "/people")}</div>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            {[{ l: "In Progress", v: "8" }, { l: "Verified", v: "24" }, { l: "Shared", v: "12" }].map((s) => (
              <div key={s.l} className="rounded-lg border border-border bg-card p-2.5">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.l}</div>
                <div className="text-base font-bold mt-1">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border divide-y divide-border">
            {[
              { n: "Alex Mitchell", r: "Senior Engineer", s: "Verified" },
              { n: "Priya Raman", r: "Product Manager", s: "In Progress" },
              { n: "Kabir Mehta", r: "Data Analyst", s: "Verified" },
            ].map((row) => (
              <div key={row.n} className="px-3 py-2 flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/30 to-info/30 flex items-center justify-center text-[10px] font-bold text-foreground/70">
                  {row.n.split(" ").map((x) => x[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold truncate">{row.n}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{row.r}</div>
                </div>
                <span className="text-[10px] font-medium text-primary">{row.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
