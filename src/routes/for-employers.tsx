import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  Users,
  Inbox,
  ShieldCheck,
  Zap,
  UserCheck,
  Fingerprint,
  FileCheck2,
  Workflow,
  Clock,
  CheckCircle2,
  Filter,
  Download,
} from "lucide-react";
import {
  PageHero,
  Section,
  SplitSection,
  BenefitGrid,
  FinalCTA,
} from "@/components/product-pages/shared";
import { HR_WORKSPACE_URL, urlLabel } from "@/lib/domain-config";

const TITLE = "For Employers — KairoID";
const DESC =
  "Hire on verified Trust Passports and respond to employment verification requests — with consent at the centre of every action.";

export const Route = createFileRoute("/for-employers")({
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
  component: ForEmployersPage,
});

function PeopleDashboardMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-gradient-to-tr from-primary/25 via-info/15 to-transparent blur-3xl rounded-full -z-10" />
      <div className="rounded-2xl border border-border/80 bg-card shadow-premium overflow-hidden">
        <div className="border-b border-border px-4 py-2.5 flex items-center gap-2 bg-secondary/50">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
          <div className="ml-3 text-[11px] text-muted-foreground font-mono">
            {urlLabel(HR_WORKSPACE_URL, "/people")}
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { l: "In Progress", v: "8" },
              { l: "Verified", v: "24" },
              { l: "Shared", v: "12" },
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
              <div className="text-[11px] font-semibold">People</div>
              <div className="flex gap-1.5">
                <div className="h-5 w-5 rounded border border-border bg-card flex items-center justify-center">
                  <Filter className="h-3 w-3" />
                </div>
                <div className="h-5 w-5 rounded border border-border bg-card flex items-center justify-center">
                  <Download className="h-3 w-3" />
                </div>
              </div>
            </div>
            <div className="divide-y divide-border">
              {[
                { n: "Alex Mitchell", r: "Senior Engineer", s: "Verified" },
                { n: "Priya Raman", r: "Product Manager", s: "In Progress" },
                { n: "Sofia Alvarez", r: "Consultant", s: "Pending" },
              ].map((row) => (
                <div
                  key={row.n}
                  className="px-3 py-2 flex items-center gap-3"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/30 to-info/30 flex items-center justify-center text-[10px] font-bold text-foreground/70">
                    {row.n
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold truncate">
                      {row.n}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {row.r}
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-primary">
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

function InboxMock() {
  const rows = [
    {
      c: "Northstar Labs",
      r: "Employment · Alex Mitchell",
      s: "New",
      icon: Clock,
      tone: "text-warning",
    },
    {
      c: "Acme Financial",
      r: "Employment · Priya Raman",
      s: "Approved",
      icon: CheckCircle2,
      tone: "text-success",
    },
    {
      c: "Vertex Bank",
      r: "Employment · Kabir Mehta",
      s: "In review",
      icon: Clock,
      tone: "text-info",
    },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-tr from-primary/25 via-info/15 to-transparent blur-3xl rounded-full -z-10" />
      <div className="rounded-2xl border border-border/80 bg-card shadow-premium overflow-hidden">
        <div className="border-b border-border px-4 py-3 flex items-center justify-between bg-secondary/50">
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <Inbox className="h-3.5 w-3.5 text-primary" /> Employment
            Verification Inbox
          </div>
          <span className="text-[10px] text-muted-foreground">3 requests</span>
        </div>
        <div className="divide-y divide-border">
          {rows.map((r) => (
            <div key={r.r} className="px-4 py-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                <r.icon className={`h-4 w-4 ${r.tone}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold truncate">{r.c}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {r.r}
                </div>
              </div>
              <span className={`text-[10px] font-semibold ${r.tone}`}>
                {r.s}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ForEmployersPage() {
  return (
    <SiteLayout>
      <PageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Solutions", to: "/for-employers" },
          { label: "For Employers" },
        ]}
        eyebrow="For Employers"
        title="Hiring starts"
        gradientWord="with trust."
        intro="Invite candidates to share a verified Trust Passport, receive inbound employment verification requests, and reduce time to trust across every hire — all with consent at the centre."
        right={<PeopleDashboardMock />}
        ctaLabel="Open HR Workspace"
        ctaTo={HR_WORKSPACE_URL}
        secondaryLabel="Book a demo"
        secondaryTo="/contact"
      />

      <Section
        eyebrow="Hiring Starts With Trust"
        title="Every hire"
        gradientWord="is a trust decision."
        intro="Resumes are self-declared. Documents can be edited. Verification is repeated across every organisation a professional joins. KairoID makes trust portable — so employers can hire on verified facts instead of chasing them."
      >
        <BenefitGrid
          items={[
            {
              icon: ShieldCheck,
              title: "Verified at the source",
              desc: "Employment, education and identity confirmed with issuers — not self-declared.",
            },
            {
              icon: Fingerprint,
              title: "Consent-based sharing",
              desc: "Candidates explicitly approve what is shared with your organisation.",
            },
            {
              icon: Zap,
              title: "Less back-and-forth",
              desc: "Trust arrives ready — no re-verification of the same facts.",
            },
          ]}
        />
      </Section>

      <SplitSection
        alt
        eyebrow="Receive Trust Passports"
        title="Trusted profiles,"
        gradientWord="delivered directly."
        body="Invite candidates through a Trust Invitation. When they accept, their verified Trust Passport — with employment, education and credentials — arrives in your workspace, with their consent."
        bullets={[
          {
            icon: UserCheck,
            label: "Trust Invitations",
            desc: "Send a consent-first invitation to any candidate.",
          },
          {
            icon: ShieldCheck,
            label: "Verified content",
            desc: "Only verified facts, sourced from issuers.",
          },
          {
            icon: FileCheck2,
            label: "Structured records",
            desc: "Roles, dates and credentials, organised.",
          },
        ]}
        visual={<PeopleDashboardMock />}
      />

      <SplitSection
        reverse
        eyebrow="Employment Verification"
        title="One inbox for"
        gradientWord="inbound requests."
        body="When other organisations request verification for a former employee, requests land in a single inbox. Confirm employment details, add context, or decline — every response is consent-verified and audit-logged."
        bullets={[
          {
            icon: Inbox,
            label: "Central inbox",
            desc: "Every incoming request in one place.",
          },
          {
            icon: FileCheck2,
            label: "Structured responses",
            desc: "Confirm roles, dates and status.",
          },
          {
            icon: ShieldCheck,
            label: "Consent-verified",
            desc: "Requests carry the individual's consent.",
          },
        ]}
        visual={<InboxMock />}
      />

      <Section
        alt
        eyebrow="HR Workspace"
        title="Built for"
        gradientWord="hiring teams."
        intro="Bring HR, hiring managers and admins into one workspace with role-based access, shared workflows and a full audit trail."
      >
        <BenefitGrid
          items={[
            {
              icon: Users,
              title: "Role-based access",
              desc: "Owner, Admin, HR and Member roles with clear permissions.",
            },
            {
              icon: Workflow,
              title: "Shared workflows",
              desc: "Assign, comment and collaborate on verifications.",
            },
            {
              icon: ShieldCheck,
              title: "Full audit trail",
              desc: "Every action, request and response is logged.",
            },
          ]}
        />
      </Section>

      <Section
        eyebrow="Benefits"
        title="Why employers"
        gradientWord="choose KairoID."
      >
        <BenefitGrid
          items={[
            {
              icon: Zap,
              title: "Faster employment verification",
              desc: "Trust arrives verified, not requested.",
            },
            {
              icon: UserCheck,
              title: "Trusted candidate profiles",
              desc: "Hiring decisions grounded in verified facts.",
            },
            {
              icon: Fingerprint,
              title: "Consent at the centre",
              desc: "Every share is granular and revocable.",
            },
          ]}
        />
      </Section>

      <FinalCTA
        title="Hire on"
        gradientWord="trusted profiles."
        body="Open the HR Workspace to receive verified Trust Passports and respond to employment verification requests with consent at the centre."
        primary={{ label: "Open HR Workspace", to: HR_WORKSPACE_URL }}
        secondary={{ label: "Book a demo", to: "/contact" }}
      />
    </SiteLayout>
  );
}
