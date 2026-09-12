import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GraduationCap, BadgeCheck, ShieldCheck, FileCheck2, Inbox, Users, Landmark, Workflow, Send, Link2 } from "lucide-react";
import { PageHero, Section, SplitSection, BenefitGrid, FinalCTA } from "@/components/product-pages/shared";
import { BrowserShot } from "@/components/product-pages/BrowserShot";
import verificationsShot from "@/assets/institution-workspace/verifications.png.asset.json";
import verificationDetailShot from "@/assets/institution-workspace/verification-detail.png.asset.json";
import personDetailShot from "@/assets/institution-workspace/person-detail.png.asset.json";
import peopleShot from "@/assets/institution-workspace/people.png.asset.json";
import { UNIVERSITY_URL, urlLabel } from "@/lib/domain-config";

const TITLE = "Institution Workspace — KairoID";
const DESC = "The workspace for universities, colleges and credential issuers to verify education records and issue trusted credentials.";
const URL_LABEL = urlLabel(UNIVERSITY_URL);

export const Route = createFileRoute("/institution-workspace")({
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
  component: InstitutionWorkspacePage,
});

function InstitutionWorkspacePage() {
  return (
    <SiteLayout>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Product", to: "/product" }, { label: "Institution Workspace" }]}
        eyebrow="Institution Workspace"
        title="Credentials, issued"
        gradientWord="at the source."
        intro="A workspace for universities, colleges and credential issuers to verify education records, respond to verification requests, and issue trusted credentials into a professional's Trust Passport."
        right={<BrowserShot src={verificationsShot.url} alt="Institution verification requests dashboard" urlLabel={URL_LABEL} />}
        secondaryLabel="See how it fits together"
        secondaryTo="/product"
      />

      <SplitSection
        eyebrow="Verify Education"
        title="Confirm credentials"
        gradientWord="with confidence."
        body="Every incoming verification request opens into a side-by-side review — the candidate's claim, your institution's record, and the shared evidence — with clear actions to confirm, report a discrepancy, or request clarification."
        bullets={[
          { icon: FileCheck2, label: "Claim vs. record", desc: "Compare submitted claim against institution data." },
          { icon: ShieldCheck, label: "Consent-verified requests", desc: "Every request carries the individual's consent." },
          { icon: Users, label: "Assign & resolve", desc: "Route requests to the right reviewer." },
        ]}
        visual={<BrowserShot src={verificationDetailShot.url} alt="Verification request detail with claim, institution record and actions" urlLabel={URL_LABEL} />}
      />

      <SplitSection
        alt
        reverse
        eyebrow="Issue Verified Records"
        title="Push credentials"
        gradientWord="into the passport."
        body="Issue verified degrees, transcripts and certificates directly into a graduate's Trust Passport — every record signed at the source and visible from the institution's own person view."
        bullets={[
          { icon: Send, label: "Direct issuance", desc: "Deliver records to the individual, not a document." },
          { icon: BadgeCheck, label: "Tamper-evident", desc: "Signed at the source, verifiable anywhere." },
          { icon: GraduationCap, label: "Portable for life", desc: "The record travels with the graduate." },
        ]}
        visual={<BrowserShot src={personDetailShot.url} alt="Person detail with institution relationship, shared profile and issued credentials" urlLabel={URL_LABEL} />}
      />

      <SplitSection
        eyebrow="Connected Alumni Network"
        title="Trusted records,"
        gradientWord="for life."
        body="See every current student and alumnus connected to your institution in one place — with clear trust and passport status, so you can maintain long-lived, verified relationships beyond graduation."
        bullets={[
          { icon: GraduationCap, label: "Students and alumni", desc: "One directory across every cohort." },
          { icon: BadgeCheck, label: "Institution-verified", desc: "Records backed by your source data." },
          { icon: Landmark, label: "Passport connections", desc: "See who is carrying your credentials." },
        ]}
        visual={<BrowserShot src={peopleShot.url} alt="People directory of students and alumni with trust and passport status" urlLabel={URL_LABEL} />}
      />

      <SplitSection
        alt
        reverse
        eyebrow="Secure Verification"
        title="One-time links"
        gradientWord="without workspace access."
        body="Not every verifier needs a seat in your workspace. Share a secure, consent-backed verification link that lets an external party view the candidate's claim and shared evidence — nothing more, nothing less."
        bullets={[
          { icon: Link2, label: "Secure verification link", desc: "Time-boxed access for a single request." },
          { icon: FileCheck2, label: "Shared evidence", desc: "Only the documents the candidate approved." },
          { icon: ShieldCheck, label: "Consent received", desc: "Every link is backed by explicit consent." },
        ]}
        visual={<BrowserShot src={verificationDetailShot.url} alt="Education verification request with candidate claim, shared evidence and consent" urlLabel={URL_LABEL} />}
      />

      <Section
        eyebrow="Institution Benefits"
        title="Less overhead."
        gradientWord="More trust."
      >
        <BenefitGrid
          items={[
            { icon: Inbox, title: "One inbox for requests", desc: "Handle every verification in one workspace." },
            { icon: Workflow, title: "Reduce verification workload", desc: "Structured review replaces email back-and-forth." },
            { icon: ShieldCheck, title: "Protect institutional reputation", desc: "Every issued record is tamper-evident." },
          ]}
        />
      </Section>

      <FinalCTA
        title="Trusted credentials,"
        gradientWord="ready to travel."
        body="Verify education records, respond to requests and issue trusted credentials into the Trust Passport — from one institution workspace."
        secondary={{ label: "See the full product", to: "/product" }}
      />
    </SiteLayout>
  );
}
