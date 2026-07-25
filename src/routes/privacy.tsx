import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { siteUrl } from "@/lib/domain-config";

const PAGE_URL = siteUrl("/privacy");
const PAGE_TITLE = "Privacy Policy — Kairo";
const PAGE_DESC =
  "How Kairo collects, uses, and protects personal data for verified professional identity and hiring workflows.";

export const Route = createFileRoute("/privacy")({
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
  component: PrivacyPage,
});

const UPDATED = "May 23, 2026";

function PrivacyPage() {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <header className="mb-12 border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Legal</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated · {UPDATED}</p>
        </header>

        <div className="prose-kairo space-y-10 text-[15px] leading-relaxed text-foreground/90">
          <Section title="1. Introduction">
            Kairo ("we", "us") is building portable trust infrastructure, starting with
            employment verification. This policy explains what personal information we collect,
            how we use it, the legal bases we rely on, and the rights available to you.
          </Section>

          <Section title="2. Information we collect">
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Account data</b> — name, work email, company, role.</li>
              <li><b>Verification inputs</b> — government IDs, education, employment history, and supporting documents you choose to share.</li>
              <li><b>Verification results</b> — outcomes returned by source systems and partners.</li>
              <li><b>Usage data</b> — device, browser, IP, pages visited and product interactions.</li>
              <li><b>Communications</b> — messages, demo requests, and support tickets.</li>
            </ul>
          </Section>

          <Section title="3. How we use information">
            We use personal information to run verifications you authorize, deliver and improve the
            product, prevent fraud and abuse, comply with legal obligations, and communicate with
            you about your account.
          </Section>

          <Section title="4. Legal bases">
            We rely on your consent (for candidate verifications), contract performance (for
            customer accounts), legitimate interests (for product analytics and security), and
            legal obligations where applicable.
          </Section>

          <Section title="5. Sharing">
            We share data with verification sources and partners strictly to perform the checks you
            initiate, with infrastructure sub-processors (cloud hosting, analytics, email), and
            when required by law. We do not sell personal information.
          </Section>

          <Section title="6. Data retention">
            Verification records are retained for the period required by applicable law and our
            customer agreements. Candidates may request deletion of their Trust Profile at any time.
          </Section>

          <Section title="7. Security">
            We apply privacy-first controls: encryption in transit and at rest, role-based
            access on restricted-document workflows, consent-based sharing that can be revoked,
            and audit logs of verification actions. Formal third-party certifications (such as
            SOC 2 or ISO 27001) are on our roadmap and not claimed today.
          </Section>

          <Section title="8. International transfers">
            Data may be processed in India and other jurisdictions where our infrastructure
            providers operate, under appropriate safeguards.
          </Section>

          <Section title="9. Your rights">
            Subject to applicable law you may access, correct, delete or port your personal
            information, withdraw consent, and lodge a complaint with a regulator. Email{" "}
            <a href="mailto:privacy@kairoid.com" className="text-primary underline-offset-4 hover:underline">privacy@kairoid.com</a> to exercise any right.
          </Section>

          <Section title="10. Cookies & analytics">
            We use essential cookies and privacy-respecting analytics (Google Analytics 4) to
            understand product usage. You may opt out via your browser controls.
          </Section>

          <Section title="11. Children">
            Kairo is not directed to children under 18.
          </Section>

          <Section title="12. Changes">
            We will post updates to this page and adjust the "Last updated" date above.
          </Section>

          <Section title="13. Contact">
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
