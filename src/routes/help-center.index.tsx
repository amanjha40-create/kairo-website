import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ElementType } from "react";
import {
  Search,
  ArrowRight,
  LifeBuoy,
  ShieldAlert,
  Building2,
  Briefcase,
  GraduationCap,
  Wrench,
  UserRound,
  Phone,
  Mail,
} from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { buildSeoHead, type SeoFaq } from "@/components/site/SeoLandingTemplate";
import {
  featuredHelpJourneys,
  getHelpArticlesBySection,
  helpArticleUrl,
  helpSections,
  searchHelpArticles,
  type HelpSection,
} from "@/lib/help-center";
import { siteUrl } from "@/lib/domain-config";
import {
  SUPPORT_EMAIL,
  SUPPORT_HOURS,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
} from "@/lib/support";

const URL = siteUrl("/help-center");
const TITLE = "KairoID Help Centre — Candidate, HR, Institution, Security & Support";
const DESC =
  "Official KairoID Help Centre for Candidate, HR Workspace, Institution Workspace, account security, troubleshooting, and support.";

const faqs: SeoFaq[] = [
  {
    q: "What is the KairoID Help Centre?",
    a: "It is the official KairoID support experience for Candidate, HR Workspace, Institution Workspace, account security, and troubleshooting.",
  },
  {
    q: "Where do I go if I forgot my password or did not receive an OTP?",
    a: "Use the Account & Security section or open Contact Support for direct help from KairoID.",
  },
  {
    q: "Where can HR teams troubleshoot Trust Invitations?",
    a: "Open the HR / Employers section and the Trust Invitation delivery troubleshooting articles.",
  },
];

const sectionIcons: Record<HelpSection, ElementType> = {
  candidate: UserRound,
  hr: Briefcase,
  institution: GraduationCap,
  "account-security": ShieldAlert,
  troubleshooting: Wrench,
  "contact-support": LifeBuoy,
};

export const Route = createFileRoute("/help-center/")({
  head: () =>
    buildSeoHead({
      url: URL,
      title: TITLE,
      description: DESC,
      faqs,
      breadcrumbName: "Help Centre",
    }),
  component: HelpCenterHome,
});

function HelpCenterHome() {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<HelpSection | null>(null);

  const results = useMemo(
    () => searchHelpArticles(query, activeSection ?? undefined),
    [query, activeSection],
  );

  const showingSearchResults = query.trim().length > 0;

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-mesh-hero -z-10" />
        <div className="absolute inset-0 bg-grid-faint opacity-60 -z-10" />
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-soft">
            <LifeBuoy className="h-3.5 w-3.5" /> Official KairoID Help Centre
          </div>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_0.9fr] lg:items-start">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Find help for Candidate, HR, Institution, and account security.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Start with the product you use, search by the problem you are seeing, or open
                Contact Support if you need direct help from KairoID.
              </p>

              <div className="mt-8 relative max-w-3xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search help: invite not received, OTP not received, verification pending..."
                  className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-sm shadow-soft outline-none transition focus:border-primary/40 focus:shadow-card"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {helpSections.map((section) => {
                  const Icon = sectionIcons[section.id];
                  const active = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(active ? null : section.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                        active
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {section.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card/90 p-6 shadow-card">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Need help right now?
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Contact KairoID Support</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Use the support hub for product issues, onboarding help, or account-security
                concerns. Never send KairoID your password, OTP, access token, refresh token, or a
                private key.
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <a
                  href={SUPPORT_PHONE_TEL}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/30 p-3 hover:border-primary/30"
                >
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{SUPPORT_PHONE_DISPLAY}</div>
                    <div className="text-muted-foreground">{SUPPORT_HOURS}</div>
                  </div>
                </a>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/30 p-3 hover:border-primary/30"
                >
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{SUPPORT_EMAIL}</div>
                    <div className="text-muted-foreground">Customer and product support</div>
                  </div>
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild className="btn-premium rounded-xl">
                  <Link to="/help-center/contact-support">Open support hub</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/contact">General contact</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Top-level paths
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Choose the path that matches your problem.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-muted-foreground">
              The Help Centre is organized by product and by task, so first-time users can choose
              the right route without learning KairoID jargon first.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {helpSections.map((section) => {
              const Icon = sectionIcons[section.id];
              const articles = getHelpArticlesBySection(section.id).slice(0, 3);
              return (
                <div
                  key={section.id}
                  className="rounded-3xl border border-border bg-card p-6 shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">{section.summary}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {articles.map((article) => (
                      <li key={article.slug}>
                        <a
                          href={helpArticleUrl(article.slug)}
                          className="group flex items-start justify-between gap-3 rounded-2xl border border-transparent bg-secondary/40 px-4 py-3 hover:border-primary/30 hover:bg-secondary/70"
                        >
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {article.title}
                            </div>
                            <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {article.summary}
                            </div>
                          </div>
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
                        </a>
                      </li>
                    ))}
                    {section.id === "contact-support" && (
                      <li>
                        <Link
                          to="/help-center/contact-support"
                          className="group flex items-start justify-between gap-3 rounded-2xl border border-transparent bg-secondary/40 px-4 py-3 hover:border-primary/30 hover:bg-secondary/70"
                        >
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              Submit a support request
                            </div>
                            <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              Product help, onboarding help, and security/account-access concerns.
                            </div>
                          </div>
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/20">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                First-touch help
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Common starting points</h2>
            </div>
            <p className="max-w-xl text-sm text-muted-foreground">
              These are the problems people usually search first: invitation delivery, reset links,
              OTPs, verification delays, and public-link failures.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredHelpJourneys.map((journey) => (
              <a
                key={journey.slug}
                href={helpArticleUrl(journey.slug)}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {journey.slug.includes("password") ? (
                      <ShieldAlert className="h-5 w-5" />
                    ) : journey.slug.includes("invitation") ? (
                      <Briefcase className="h-5 w-5" />
                    ) : journey.slug.includes("institution") ? (
                      <Building2 className="h-5 w-5" />
                    ) : (
                      <Wrench className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{journey.title}</h3>
                    <p className="text-sm text-muted-foreground">{journey.summary}</p>
                  </div>
                </div>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open article <ArrowRight className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Search results
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                {showingSearchResults
                  ? "Matching help articles"
                  : "Browse all Help Centre articles"}
              </h2>
            </div>
            {showingSearchResults && (
              <p className="max-w-xl text-sm text-muted-foreground">
                Results update as you type. Clear the search box to browse every help article by
                section.
              </p>
            )}
          </div>

          {results.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((article) => (
                <a
                  key={article.slug}
                  href={helpArticleUrl(article.slug)}
                  className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/30"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {helpSections.find((section) => section.id === article.section)?.title} ·{" "}
                    {article.category}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {article.summary}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read article <ArrowRight className="h-4 w-4" />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-border bg-card/60 p-8 text-center shadow-soft">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                No matching Help Centre articles yet
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Try a different keyword, browse by product, or open Contact Support if you need help
                from the KairoID team.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button asChild className="btn-premium rounded-xl">
                  <Link to="/help-center/contact-support">Contact Support</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/contact">General contact</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
