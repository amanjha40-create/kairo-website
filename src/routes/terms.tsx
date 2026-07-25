import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { siteUrl } from "@/lib/domain-config";

const PAGE_URL = siteUrl("/terms");
const PAGE_TITLE = "Terms of Service — Kairo";
const PAGE_DESC =
  "The terms governing your use of Kairo's verified professional identity and hiring trust infrastructure.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: PAGE_URL },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: TermsPage,
});

const UPDATED = "May 23, 2026";

function TermsPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <header className="mb-12 border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Legal</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated · {UPDATED}</p>
        </header>

        <div className="space-y-10 text-[15px] leading-relaxed text-foreground/90">
          <Section title="1. Agreement">
            These Terms govern access to and use of Kairo's website, dashboard and APIs (the
            "Service") operated by Kairo. By using the Service you agree to these Terms.
          </Section>
          <Section title="2. Accounts">
            You are responsible for the security of your account, for activity under your
            credentials, and for ensuring users in your organization comply with these Terms.
          </Section>
          <Section title="3. Acceptable use">
            You will not misuse the Service, attempt to bypass access controls, run unauthorized
            verifications, scrape data, or use Kairo to discriminate unlawfully or violate
            applicable employment, privacy or consumer-protection laws.
          </Section>
          <Section title="4. Candidate consent">
            Customers must obtain valid, informed consent from candidates before initiating any
            verification. Kairo may suspend accounts that we reasonably believe operate without
            proper consent.
          </Section>
          <Section title="5. Fees">
            Paid plans are billed per verification or per the subscription specified in your order.
            Fees are non-refundable except where required by law.
          </Section>
          <Section title="6. Intellectual property">
            Kairo retains all rights in the Service, brand and platform. You retain rights in the
            data you submit. You grant Kairo a license to process such data solely to provide the
            Service.
          </Section>
          <Section title="7. Confidentiality">
            Each party will protect the other's confidential information using reasonable care and
            use it only to perform under these Terms.
          </Section>
          <Section title="8. Warranties & disclaimers">
            The Service is provided "as is". Kairo disclaims all implied warranties to the maximum
            extent permitted by law. Verification results depend on source systems and are not a
            guarantee of any individual's future conduct.
          </Section>
          <Section title="9. Limitation of liability">
            To the maximum extent permitted by law, neither party will be liable for indirect,
            incidental, special or consequential damages. Each party's aggregate liability is
            limited to fees paid in the twelve months preceding the claim.
          </Section>
          <Section title="10. Indemnity">
            You will indemnify Kairo against third-party claims arising from your misuse of the
            Service or violation of these Terms.
          </Section>
          <Section title="11. Termination">
            Either party may terminate for material breach not cured within 30 days. Sections that
            by nature should survive termination will survive.
          </Section>
          <Section title="12. Governing law">
            These Terms are governed by the laws of India. Courts in Bengaluru have exclusive
            jurisdiction.
          </Section>
          <Section title="13. Changes">
            We may update these Terms; continued use after changes constitutes acceptance.
          </Section>
          <Section title="14. Contact">
            Kairo · Bengaluru, India ·{" "}
            <a href="mailto:contact@kairoid.com" className="text-primary underline-offset-4 hover:underline">contact@kairoid.com</a>
          </Section>
        </div>
      </article>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 text-muted-foreground">{children}</div>
    </section>
  );
}
