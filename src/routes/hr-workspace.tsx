import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Users, FileCheck2, Workflow, Inbox, ShieldCheck, Zap, UserCheck, Fingerprint, Send, MailCheck, BarChart3 } from "lucide-react";
import { PageHero, Section, SplitSection, BenefitGrid, FinalCTA } from "@/components/product-pages/shared";
import { BrowserShot } from "@/components/product-pages/BrowserShot";
import overviewAsset from "@/assets/hr-workspace/overview.png.asset.json";
import peopleAsset from "@/assets/hr-workspace/people.png.asset.json";
import invitationsAsset from "@/assets/hr-workspace/invitations.png.asset.json";
import verificationsAsset from "@/assets/hr-workspace/verifications.png.asset.json";
import teamAsset from "@/assets/hr-workspace/team.png.asset.json";
import inviteModalAsset from "@/assets/hr-workspace/invite-modal.png.asset.json";
import { HR_WORKSPACE_URL, urlLabel } from "@/lib/domain-config";

const TITLE = "HR Workspace — KairoID";
const DESC = "The employer workspace for consent-based employment verification and trusted candidate profiles.";
const OVERVIEW_LABEL = urlLabel(HR_WORKSPACE_URL);

export const Route = createFileRoute("/hr-workspace")({
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
  component: HRWorkspacePage,
});

function HRWorkspacePage() {
  return (
    <SiteLayout>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Product", to: "/product" }, { label: "HR Workspace" }]}
        eyebrow="HR Workspace"
        title="Employment verification,"
        gradientWord="reimagined."
        intro="A workspace for HR and people teams to receive verified Trust Passports, respond to employment verification requests, and collaborate — with consent at the centre of every action."
        right={<BrowserShot src={overviewAsset.url} alt="KairoID Trust Workspace overview with KPIs and Needs Your Attention" urlLabel={OVERVIEW_LABEL} />}
        ctaLabel="Open HR Workspace"
        ctaTo={HR_WORKSPACE_URL}
        secondaryLabel="Book a demo"
        secondaryTo="/contact"
      />

      <SplitSection
        eyebrow="Receive Trust Passports"
        title="Trusted profiles,"
        gradientWord="delivered directly."
        body="Instead of chasing documents, invite candidates to share a verified Trust Passport. Employment history, education and credentials arrive already verified — with the candidate's consent."
        bullets={[
          { icon: Fingerprint, label: "Consent-first sharing", desc: "Candidates approve every share." },
          { icon: ShieldCheck, label: "Verified at the source", desc: "No self-declared claims." },
          { icon: Zap, label: "Faster time to trust", desc: "Skip the back-and-forth on documents." },
        ]}
        visual={<BrowserShot src={peopleAsset.url} alt="People directory showing candidates with relationship, verification and Trust Passport status" urlLabel={urlLabel(HR_WORKSPACE_URL, "/people")} />}
      />

      <SplitSection
        alt
        reverse
        eyebrow="Invite Candidates"
        title="From invitation"
        gradientWord="to shared trust."
        body="Start every relationship with a consent-first invitation. Candidates choose exactly what to share, and your team tracks every invitation from sent through to accepted — all in one place."
        bullets={[
          { icon: Send, label: "Guided invite flow", desc: "A five-step wizard for candidate, purpose and scope." },
          { icon: MailCheck, label: "Live status tracking", desc: "See opened, accepted and expiring soon at a glance." },
          { icon: ShieldCheck, label: "Consent-scoped", desc: "Every invitation carries its own permission set." },
        ]}
        visual={
          <div className="space-y-6">
            <BrowserShot src={inviteModalAsset.url} alt="Invite Candidate modal — step 1 of 5, candidate and purpose" urlLabel={`${OVERVIEW_LABEL} · Invite Candidate`} />
            <BrowserShot src={invitationsAsset.url} alt="Trust Invitations page tracking sent, opened and accepted invitations" urlLabel={urlLabel(HR_WORKSPACE_URL, "/invitations")} delay={0.1} />
          </div>
        }
      />

      <SplitSection
        eyebrow="Employment Verification"
        title="An inbox for"
        gradientWord="inbound requests."
        body="When other organisations request employment verification for a former employee, requests land in a single inbox. Confirm employment facts with a full audit trail — hiring decisions stay with the requester."
        bullets={[
          { icon: Inbox, label: "Central inbox", desc: "Every incoming request in one place." },
          { icon: FileCheck2, label: "Structured responses", desc: "Confirm roles, dates and status." },
          { icon: ShieldCheck, label: "Consent-verified", desc: "Requests carry the individual's consent." },
        ]}
        visual={<BrowserShot src={verificationsAsset.url} alt="Employment Verifications inbox with status cards, filters and verification queue" urlLabel={urlLabel(HR_WORKSPACE_URL, "/verifications")} />}
      />

      <SplitSection
        alt
        reverse
        eyebrow="Team Collaboration"
        title="Built for"
        gradientWord="hiring teams."
        body="Bring HR, hiring managers and admins into one workspace with the right level of access. Owners, Admins and Members collaborate on the same verifications — with guardrails around sensitive actions."
        bullets={[
          { icon: Users, label: "Role-based access", desc: "Owner, Admin, Hiring Manager and Member roles." },
          { icon: Workflow, label: "Shared workflows", desc: "Assign reviewers and track ownership." },
          { icon: ShieldCheck, label: "Ownership protection", desc: "Guardrails around removing owners and admins." },
        ]}
        visual={<BrowserShot src={teamAsset.url} alt="Team page showing members, roles, statuses and invite teammate" urlLabel={urlLabel(HR_WORKSPACE_URL, "/team")} />}
      />

      <Section
        eyebrow="Workspace Activity"
        title="One operational"
        gradientWord="workspace for HR."
        intro="Everything happening across invitations, verifications and shared passports — surfaced in one place, so nothing falls through the cracks."
      >
        <BrowserShot src={overviewAsset.url} alt="Overview page showing recent employment verifications and recent activity" urlLabel={OVERVIEW_LABEL} />
      </Section>

      <Section
        alt
        eyebrow="Benefits"
        title="Why teams"
        gradientWord="choose KairoID."
      >
        <BenefitGrid
          items={[
            { icon: Zap, title: "Faster employment verification", desc: "Trust arrives verified, not requested." },
            { icon: UserCheck, title: "Trusted candidate profiles", desc: "Decisions grounded in verified facts." },
            { icon: Fingerprint, title: "Consent at the centre", desc: "Every share is granular and revocable." },
            { icon: BarChart3, title: "Full operational visibility", desc: "Track every invitation and request end-to-end." },
          ]}
          columns={4}
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
