import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getPost, posts, type BlogPost } from "@/lib/blog-posts";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { siteUrl } from "@/lib/domain-config";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: BlogPost } => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return {};
    const url = siteUrl(`/blog/${params.slug}`);
    return {
      meta: [
        { title: `${post.title} | KairoID` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.date },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "keywords", content: post.tags.join(", ") },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Organization", name: "KairoID" },
            publisher: { "@type": "Organization", name: "KairoID", url: siteUrl("/") },
            mainEntityOfPage: url,
            keywords: post.tags.join(", "),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Blog", item: siteUrl("/blog") },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> All articles
        </Link>
        <div className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">
          {post.category} · {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.readingMinutes} min read
        </div>
        <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight leading-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{post.description}</p>

        <div className="mt-10 space-y-5 text-foreground/90 leading-relaxed">
          {post.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i} className="mt-10 text-2xl font-semibold tracking-tight">{block.text}</h2>;
            if (block.type === "p") return <p key={i}>{block.text}</p>;
            if (block.type === "ul") return (
              <ul key={i} className="list-disc pl-5 space-y-2 text-foreground/90">
                {block.items?.map((it) => <li key={it}>{it}</li>)}
              </ul>
            );
            return null;
          })}
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">{t}</span>
          ))}
        </div>
      </article>

      {/* Internal linking — drive blog readers to product/solution pages */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/[0.06] to-transparent p-6 md:p-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Explore KairoID</div>
            <h2 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">
              Put portable trust to work for your hiring team.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              See how source-verified, reusable Trust Profiles cut verification time and stop hiring fraud.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                { to: "/how-it-works" as const, label: "How KairoID works" },
                { to: "/portable-trust-profiles" as const, label: "Portable Trust Profiles" },
                { to: "/ai-background-verification" as const, label: "AI Verification Engine" },
                { to: "/pricing" as const, label: "Pricing" },
                { to: "/background-verification-startups" as const, label: "BGV for startups" },
                { to: "/employment-verification-platform" as const, label: "Employment verification" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm hover:border-primary/40 hover:bg-secondary/60 transition-colors"
                  >
                    <span className="font-medium">{l.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Book a demo <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="text-xl font-semibold tracking-tight">Keep reading</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug} className="rounded-xl border border-border bg-card p-5">
                  <Link to="/blog/$slug" params={{ slug: r.slug }} className="font-medium hover:text-primary">{r.title}</Link>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{r.description}</p>
                  <Link to="/blog/$slug" params={{ slug: r.slug }} className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
