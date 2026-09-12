import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  GraduationCap,
  BadgeCheck,
  ShieldCheck,
  FileCheck2,
  Inbox,
  Users,
  Landmark,
  Send,
  CheckCircle2,
  Clock,
  Workflow,
} from "lucide-react";
import {
  PageHero,
  Section,
  SplitSection,
  BenefitGrid,
  FinalCTA,
} from "@/components/product-pages/shared";
import { PhoneFrame, productScreens } from "@/components/product/screens";
import { UNIVERSITY_URL, urlLabel } from "@/lib/domain-config";

const TITLE = "For Institutions — KairoID";
const DESC =
  "Universities, colleges and credential issuers verify education records, respond to requests, and issue trusted credentials into a professional's Trust Passport.";

export const Route = createFileRoute("/for-institutions")({
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
  component: ForInstitutionsPage,
});

function InstitutionDashboardMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-gradient-to-tr from-primary/25 via-info/15 to-transparent blur-3xl rounded-full -z-10" />
      <div className="rounded-2xl border border-border/80 bg-card shadow-premium overflow-hidden">
        <div className="border-b border-border px-4 py-2.5 flex items-center gap-2 bg-secondary/50">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
          <div className="ml-3 text-[11px] text-muted-foreground font-mono">
            {urlLabel(UNIVERSITY_URL, "/institution")}
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { l: "Requests", v: "34" },
              { l: "Issued", v: "128" },
              { l: "Alumni", v: "2.4k" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-lg border border-border bg-card p-2.5"
              >
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {s.l}
                </div>
                <div className="text-base font-bold mt-1">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="px-3 py-2 bg-secondary/40 border-b border-border flex items-center justify-between">
              <div className="text-[11px] font-semibold">
                Verification requests
              </div>
              <span className="text-[10px] text-muted-foreground">Today</span>
            </div>
            <div className="divide-y divide-border">
              {[
                {
                  n: "R. Iyer",
                  d: "B.Tech · 2019",
                  s: "Approved",
                  i: CheckCircle2,
                  c: "text-success",
                },
                {
                  n: "A. Sharma",
                  d: "M.Sc · 2021",
                  s: "Pending",
                  i: Clock,
                  c: "text-warning",
                },
                {
                  n: "K. Devan",
                  d: "B.A · 2017",
                  s: "Approved",
                  i: CheckCircle2,
                  c: "text-success",
                },
              ].map((row) => (
                <div key={row.n} className="px-3 py-2 flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center">
                    <row.i className={`h-3.5 w-3.5 ${row.c}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold truncate">
                      {row.n}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {row.d}
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold ${row.c}`}>
                    {row.s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForInstitutionsPage() {
  return (
    <SiteLayout>
      <PageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Solutions", to: "/for-institutions" },
          { label: "For Institutions" },
        ]}
        eyebrow="For Institutions"
        title="Credentials, verified"
        gradientWord="at the source."
        intro="KairoID helps universities, colleges and credential issuers verify education records, respond to verification requests, and issue verified credentials directly into a professional's Trust Passport."
        right={<InstitutionDashboardMock />}
        ctaLabel="Book a demo"
        ctaTo="/contact"
        secondaryLabel="See how it fits together"
        secondaryTo="/product"
      />

      <Section
        eyebrow="Education Is Part Of Professional Trust"
        title="Every degree"
        gradientWord="is a trust anchor."
        intro="Education records are among the most-verified facts in any professional's career — often re-verified with the issuing institution for every new role. KairoID makes those records portable, verified at the source, and reusable across a professional's lifetime."
      >
        <BenefitGrid
          items={[
            {
              icon: GraduationCap,
              title: "Source of truth",
              desc: "Records verified directly by the issuing institution.",
            },
            {
              icon: BadgeCheck,
              title: "Reusable credentials",
              desc: "Verified once, carried by the alumnus for life.",
            },
            {
              icon: ShieldCheck,
              title: "Consent-based",
              desc: "Records are shared only when the individual approves.",
            },
          ]}
        />
      </Section>

      <SplitSection
        alt
        eyebrow="Issue Verified Records"
        title="Issue credentials"
        gradientWord="into the Passport."
        body="Institutions can issue verified degrees, transcripts and certificates directly into a graduate's Trust Passport — turning a static document into a portable, verifiable credential."
        bullets={[
          {
            icon: Send,
            label: "Direct issuance",
            desc: "Push verified records to the graduate's Passport.",
          },
          {
            icon: BadgeCheck,
            label: "Verified provenance",
            desc: "Every record carries the institution as the source.",
          },
          {
            icon: Landmark,
            label: "Alumni records",
            desc: "Maintain a trusted record of every alumnus.",
          },
        ]}
        visual={
          <div className="flex justify-center">
            <PhoneFrame
              src={productScreens.license.src}
              alt={productScreens.license.alt}
              size="md"
              label="Issued credential"
              caption="Verified by the institution"
            />
          </div>
        }
      />

      <SplitSection
        reverse
        eyebrow="Respond To Verification Requests"
        title="An inbox for"
        gradientWord="credential verification."
        body="Employers and other institutions send credential verification requests through KairoID. Every request lands in a single inbox with the individual's consent attached — approve, decline or add context."
        bullets={[
          {
            icon: Inbox,
            label: "Central inbox",
            desc: "Every incoming request in one place.",
          },
          {
            icon: FileCheck2,
            label: "Structured responses",
            desc: "Confirm degrees, dates and standing.",
          },
          {
            icon: ShieldCheck,
            label: "Consent-verified",
            desc: "Requests carry the graduate's consent.",
          },
        ]}
        visual={<InstitutionDashboardMock />}
      />

      <Section
        alt
        eyebrow="Institution Workspace"
        title="Built for"
        gradientWord="registrars and issuers."
        intro="Bring registrars, verification officers and administrators into one workspace with role-based access and a full audit trail."
      >
        <BenefitGrid
          items={[
            {
              icon: Users,
              title: "Role-based access",
              desc: "Clear permissions for every team member.",
            },
            {
              icon: Workflow,
              title: "Shared workflows",
              desc: "Assign, review and collaborate on requests.",
            },
            {
              icon: ShieldCheck,
              title: "Full audit trail",
              desc: "Every issuance and response is logged.",
            },
          ]}
        />
      </Section>

      <Section
        eyebrow="Benefits"
        title="Why institutions"
        gradientWord="join KairoID."
      >
        <BenefitGrid
          items={[
            {
              icon: BadgeCheck,
              title: "Trusted issuance",
              desc: "Credentials leave the institution verified and portable.",
            },
            {
              icon: Inbox,
              title: "One place for requests",
              desc: "Handle incoming verifications without inbox chaos.",
            },
            {
              icon: Landmark,
              title: "Stronger alumni trust",
              desc: "A lasting, verified record for every graduate.",
            },
          ]}
        />
      </Section>

      <FinalCTA
        title="Credentials that"
        gradientWord="travel with your alumni."
        body="Issue verified education records into a professional's Trust Passport and respond to credential verification requests from a single workspace."
        secondary={{ label: "See the full product", to: "/product" }}
      />
    </SiteLayout>
  );
}
