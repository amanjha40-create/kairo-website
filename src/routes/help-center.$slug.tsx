import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, ArrowRight, Clock3, LifeBuoy, ShieldAlert } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  getHelpArticle,
  getRelatedHelpArticles,
  helpArticleUrl,
  helpSections,
  type HelpArticle,
} from "@/lib/help-center";
import { siteUrl } from "@/lib/domain-config";

export const Route = createFileRoute("/help-center/$slug")({
  loader: ({ params }): { article: HelpArticle } => {
    const article = getHelpArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    const article = loaderData?.article;
    if (!article) return {};
    const url = siteUrl(`/help-center/${params.slug}`);
    return {
      meta: [
        { title: `${article.title} | Kairo Help Centre` },
        { name: "description", content: article.summary },
        { property: "og:title", content: `${article.title} | Kairo Help Centre` },
        { property: "og:description", content: article.summary },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: `${article.title} | Kairo Help Centre` },
        { name: "twitter:description", content: article.summary },
        { name: "keywords", content: article.keywords.join(", ") },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.summary,
            author: { "@type": "Organization", name: "Kairo" },
            publisher: { "@type": "Organization", name: "Kairo", url: siteUrl("/") },
            mainEntityOfPage: url,
            keywords: article.keywords.join(", "),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
              {
                "@type": "ListItem",
                position: 2,
                name: "Help Centre",
                item: siteUrl("/help-center"),
              },
              { "@type": "ListItem", position: 3, name: article.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: HelpArticlePage,
});

function HelpArticlePage() {
  const { article } = Route.useLoaderData() as { article: HelpArticle };
  const related = getRelatedHelpArticles(article);

  return (
    <SiteLayout>
      <article className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <Link
          to="/help-center"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Help Centre
        </Link>

        <div className="mt-8 rounded-[2rem] border border-border bg-card p-8 shadow-card">
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            <span>{helpSections.find((section) => section.id === article.section)?.title}</span>
            <span>·</span>
            <span>{article.category}</span>
            <span>·</span>
            <span>{article.readMinutes} min read</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{article.summary}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <InfoCard title="Who this is for" body={article.whoItsFor} />
            <InfoCard title="What this means" body={article.whatThisMeans} />
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight">Step-by-step instructions</h2>
            <ol className="mt-5 space-y-3">
              {article.steps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-2xl border border-border bg-secondary/20 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight">What happens next</h2>
            <ul className="mt-5 space-y-3">
              {article.whatHappensNext.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-border bg-secondary/20 p-4 text-sm leading-relaxed text-foreground/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight">Common problems</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {article.commonProblems.map((problem) => (
                <div
                  key={problem.title}
                  className="rounded-2xl border border-border bg-secondary/20 p-5"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{problem.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {problem.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">Related articles</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {related.map((item) => (
                  <a
                    key={item.slug}
                    href={helpArticleUrl(item.slug)}
                    className="rounded-2xl border border-border bg-secondary/20 p-5 transition hover:border-primary/30"
                  >
                    <div className="text-base font-semibold text-foreground">{item.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read article <ArrowRight className="h-4 w-4" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className="mt-10 rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(14,165,164,0.1),rgba(255,255,255,0.9))] p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <ShieldAlert className="h-4 w-4" /> Still need help?
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Contact Kairo Support
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  For account access, delivery, verification, or onboarding issues, use the support
                  hub. Never send Kairo your password, OTP, access token, refresh token, or private
                  key.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="btn-premium rounded-xl">
                  <Link
                    to="/help-center/contact-support"
                    search={{
                      product:
                        article.section === "hr"
                          ? "HR Workspace"
                          : article.section === "institution"
                            ? "Institution Workspace"
                            : article.section === "account-security"
                              ? "Account & Security"
                              : "Candidate",
                      category:
                        article.section === "account-security"
                          ? "Security or account access concern"
                          : "Other",
                    }}
                  >
                    Contact Support
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/help-center">Search Help Centre</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/20 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Clock3 className="h-4 w-4 text-primary" /> {title}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
