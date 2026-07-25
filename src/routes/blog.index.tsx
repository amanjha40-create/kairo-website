import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { posts, type BlogPost } from "@/lib/blog-posts";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Fingerprint,
  Clock3,
  Mail,
  FileCheck2,
  Layers,
  Send,
  Network,
  AlertTriangle,
  GitBranch,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { Counter } from "@/components/motion/Counter";
import { TrustShield } from "@/components/trust/TrustShield";
import { siteUrl } from "@/lib/domain-config";

const URL = siteUrl("/blog");
const TITLE = "Kairo Blog — Insights on Trust Infrastructure";
const DESC =
  "Research, hiring trends, verification innovation, reusable trust identities, and the future of professional reputation.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Kairo Blog",
          url: URL,
          description: DESC,
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: siteUrl(`/blog/${p.slug}`),
            datePublished: p.date,
            description: p.description,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

const CATEGORIES = [
  "All",
  "Trust Infrastructure",
  "Employment Verification",
  "Hiring",
  "Identity",
  "Compliance",
  "Future of Work",
] as const;

type Category = (typeof CATEGORIES)[number];

// Map existing post categories/tags to the unified taxonomy
function bucket(post: BlogPost): Category[] {
  const out: Category[] = [];
  const c = post.category.toLowerCase();
  const tags = post.tags.map((t) => t.toLowerCase());
  if (tags.includes("trust profile") || tags.includes("reusable verification")) out.push("Trust Infrastructure");
  if (c === "verification" || tags.includes("background verification")) out.push("Employment Verification");
  if (c === "hiring" || tags.includes("recruiting") || tags.includes("time to hire") || tags.includes("startups"))
    out.push("Hiring");
  if (c === "identity") out.push("Identity");
  if (tags.includes("fraud")) out.push("Compliance");
  if (tags.includes("remote hiring") || tags.includes("ai")) out.push("Future of Work");
  if (out.length === 0) out.push("Trust Infrastructure");
  return out;
}

function visualFor(post: BlogPost) {
  const tags = post.tags.map((t) => t.toLowerCase());
  if (tags.includes("fraud")) return "warning" as const;
  if (tags.includes("identity")) return "fingerprint" as const;
  if (tags.includes("trust profile") || tags.includes("reusable verification")) return "shield" as const;
  if (tags.includes("background verification") || post.category === "Verification") return "pipeline" as const;
  if (tags.includes("time to hire") || tags.includes("recruiting") || post.category === "Hiring") return "network" as const;
  return "timeline" as const;
}

const FEATURED_SLUG = "portable-trust-profile-explained";

function BlogIndex() {
  const featured = useMemo(() => posts.find((p) => p.slug === FEATURED_SLUG) ?? posts[0], []);
  const rest = useMemo(() => posts.filter((p) => p.slug !== featured.slug), [featured]);
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () => (active === "All" ? rest : rest.filter((p) => bucket(p).includes(active))),
    [rest, active]
  );

  return (
    <SiteLayout>
      {/* HERO */}
      <BlogHero />

      {/* FEATURED */}
      <FeaturedArticle post={featured} />

      {/* CATEGORIES */}
      <section className="border-b border-border bg-secondary/20">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Browse
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-foreground text-background shadow-elevated"
                      : "border border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-faint opacity-40" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 relative">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                <Sparkles className="h-3 w-3" /> Latest
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                Field notes on <span className="text-gradient-teal">verified trust.</span>
              </h2>
            </div>
            <div className="text-sm text-muted-foreground">{filtered.length} articles</div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center text-sm text-muted-foreground">
              No articles in this category yet — check back soon.
            </div>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <ArticleCard key={p.slug} post={p} index={i} />
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* TRUST INSIGHTS */}
      <TrustInsights />

      {/* NEWSLETTER */}
      <Newsletter />
    </SiteLayout>
  );
}

/* ───────────────────────── HERO ───────────────────────── */

function BlogHero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div className="absolute inset-0 bg-mesh-hero -z-10" />
      <div className="absolute inset-0 bg-grid-faint opacity-50 -z-10" />
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-primary/15 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-info/10 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Kairo Journal
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04]">
            Insights on <span className="text-gradient-teal">trust infrastructure.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Research, hiring trends, verification innovation, reusable trust identities, and the future of professional reputation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#latest"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("latest")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-premium inline-flex items-center gap-2 rounded-xl h-12 px-6 font-semibold text-sm"
            >
              Explore articles <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#newsletter"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-xl h-12 px-6 font-semibold text-sm border border-border bg-card shadow-soft hover:border-primary/40 hover:-translate-y-0.5 transition-all"
            >
              Subscribe <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Animated trust profile assembly */}
        <div className="relative">
          <div className="absolute -inset-10 bg-gradient-to-tr from-primary/25 via-info/15 to-transparent blur-3xl rounded-full animate-pulse-glow -z-10" />
          <TrustAssemblyVisual reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

function TrustAssemblyVisual({ reduce }: { reduce: boolean }) {
  const stages = [
    { icon: Fingerprint, label: "Identity" },
    { icon: FileCheck2, label: "Employment" },
    { icon: Layers, label: "Education" },
    { icon: ShieldCheck, label: "Verification" },
  ];
  return (
    <div className="relative rounded-3xl border border-border bg-card shadow-premium p-6 md:p-8 overflow-hidden">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          Trust profile · assembling
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] font-semibold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Live
        </div>
      </div>

      <div className="relative mt-6 grid grid-cols-[1fr_auto] gap-4 items-center">
        <ul className="space-y-2.5">
          {stages.map((s, i) => (
            <motion.li
              key={s.label}
              initial={reduce ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-3.5 py-2.5"
            >
              <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center shrink-0">
                <s.icon className="h-4 w-4 text-primary" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold">{s.label}</div>
                <div className="text-[10px] text-muted-foreground">Source-verified</div>
              </div>
              <motion.span
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.55 + i * 0.25, duration: 0.3 }}
                className="ml-auto inline-flex items-center justify-center h-5 w-5 rounded-full bg-success text-success-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </motion.span>
            </motion.li>
          ))}
        </ul>

        {/* Connection lines + shield */}
        <div className="relative flex items-center justify-center pl-2">
          <svg width="60" height="220" viewBox="0 0 60 220" className="absolute inset-y-0 -left-2">
            <defs>
              <linearGradient id="bl-line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="oklch(0.62 0.11 192 / 0)" />
                <stop offset="100%" stopColor="oklch(0.62 0.11 192 / 0.7)" />
              </linearGradient>
            </defs>
            {[36, 92, 148, 204].map((y, i) => (
              <path
                key={y}
                d={`M0 ${y} C 20 ${y}, 30 110, 50 110`}
                stroke="url(#bl-line)"
                strokeWidth="1.4"
                fill="none"
                className="animate-trust-flow"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </svg>
          <motion.div
            initial={reduce ? false : { scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <TrustShield size={88} />
          </motion.div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2.5">
        {[
          { l: "Trust Score", v: "98" },
          { l: "Sources", v: "12" },
          { l: "Refresh", v: "Live" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-background/60 p-3 text-center">
            <div className="text-base font-bold text-gradient-teal">{s.v}</div>
            <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── FEATURED ───────────────────────── */

function FeaturedArticle({ post }: { post: BlogPost }) {
  return (
    <section className="border-b border-border bg-secondary/20">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          <Sparkles className="h-3 w-3" /> Featured
        </div>
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="group block rounded-3xl border border-border bg-card shadow-premium overflow-hidden hover:border-primary/40 transition-all"
        >
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-gradient-to-br from-navy/95 via-navy/85 to-primary/40">
              <div className="absolute inset-0 bg-grid-faint opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ArticleVisual kind={visualFor(post)} large />
              </div>
              <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                {post.category}
              </div>
            </div>
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" />{post.readingMinutes} min read</span>
              </div>
              <h2 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed line-clamp-3">{post.description}</p>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read the feature
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ───────────────────────── ARTICLE CARD ───────────────────────── */

function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      id={index === 0 ? "latest" : undefined}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group relative flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
      >
        <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/0 group-hover:bg-primary/15 blur-2xl transition-colors" />

        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-navy/95 via-navy/80 to-primary/30">
          <div className="absolute inset-0 bg-grid-faint opacity-25" />
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <ArticleVisual kind={visualFor(post)} />
          </div>
          <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/10 backdrop-blur border border-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            {post.category}
          </div>
        </div>

        <div className="relative p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <Clock3 className="h-3 w-3" />
            <span>{post.readingMinutes} min read</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.description}</p>
          <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Read article
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.li>
  );
}

/* ───────────────────────── ARTICLE VISUALS (SVG) ───────────────────────── */

type VisualKind = "shield" | "fingerprint" | "network" | "warning" | "pipeline" | "timeline";

function ArticleVisual({ kind, large = false }: { kind: VisualKind; large?: boolean }) {
  const size = large ? 220 : 140;
  const stroke = "oklch(0.78 0.11 200)";
  const accent = "oklch(0.62 0.11 192)";

  switch (kind) {
    case "shield":
      return <TrustShield size={size} />;
    case "fingerprint":
      return (
        <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-[0_8px_24px_rgba(14,165,164,0.35)]">
          <defs>
            <radialGradient id="fp-g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="55" fill="url(#fp-g)" />
          {[18, 26, 34, 42, 50].map((r, i) => (
            <circle
              key={r}
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={stroke}
              strokeOpacity={0.5 + i * 0.08}
              strokeWidth="1.4"
              strokeDasharray={`${r * 1.2} ${r * 0.4}`}
              transform={`rotate(${i * 22} 60 60)`}
            />
          ))}
          <circle cx="60" cy="60" r="6" fill={accent} />
        </svg>
      );
    case "network":
      return (
        <svg width={size} height={size * 0.85} viewBox="0 0 160 140">
          <defs>
            <linearGradient id="nw-l" x1="0" x2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {[
            [30, 30, 80, 70],
            [80, 70, 130, 30],
            [80, 70, 30, 110],
            [80, 70, 130, 110],
            [30, 30, 30, 110],
            [130, 30, 130, 110],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#nw-l)" strokeWidth="1.4" />
          ))}
          {[
            [30, 30, 8],
            [130, 30, 8],
            [30, 110, 8],
            [130, 110, 8],
            [80, 70, 12],
          ].map(([cx, cy, r], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={(r as number) + 4} fill={accent} opacity="0.15" />
              <circle cx={cx} cy={cy} r={r as number} fill={accent} />
            </g>
          ))}
        </svg>
      );
    case "warning":
      return (
        <svg width={size} height={size * 0.9} viewBox="0 0 140 130">
          <defs>
            <linearGradient id="wr-g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.82 0.13 80)" />
              <stop offset="100%" stopColor="oklch(0.62 0.18 35)" />
            </linearGradient>
          </defs>
          {[1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M70 10 L${130 + (i - 2) * 0} 115 L${10 + (i - 2) * 0} 115 Z`}
              fill="none"
              stroke="url(#wr-g)"
              strokeWidth="1"
              strokeOpacity={0.15 * i}
              transform={`scale(${1 - i * 0.08}) translate(${i * 6} ${i * 4})`}
              style={{ transformOrigin: "70px 70px" }}
            />
          ))}
          <path d="M70 18 L122 110 L18 110 Z" fill="url(#wr-g)" opacity="0.18" stroke="url(#wr-g)" strokeWidth="2" />
          <rect x="66" y="50" width="8" height="32" rx="3" fill="url(#wr-g)" />
          <circle cx="70" cy="94" r="5" fill="url(#wr-g)" />
        </svg>
      );
    case "pipeline":
      return (
        <svg width={size * 1.3} height={size * 0.6} viewBox="0 0 220 110">
          <defs>
            <linearGradient id="pp-l" x1="0" x2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>
          <line x1="20" y1="55" x2="200" y2="55" stroke="url(#pp-l)" strokeWidth="2" strokeDasharray="6 6" className="animate-trust-flow" />
          {[
            { cx: 30, label: "ID" },
            { cx: 90, label: "EMP" },
            { cx: 150, label: "EDU" },
            { cx: 200, label: "✓" },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.cx} cy="55" r="18" fill="oklch(0.18 0.04 257)" stroke={accent} strokeWidth="1.5" />
              <text x={n.cx} y="59" textAnchor="middle" fontSize="9" fontWeight="700" fill="oklch(0.92 0.04 200)">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      );
    case "timeline":
    default:
      return (
        <svg width={size * 1.3} height={size * 0.7} viewBox="0 0 220 120">
          <defs>
            <linearGradient id="tl-l" x1="0" x2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <line x1="20" y1="60" x2="200" y2="60" stroke="url(#tl-l)" strokeWidth="1.5" />
          {[20, 65, 110, 155, 200].map((x, i) => (
            <g key={x}>
              <line x1={x} y1="50" x2={x} y2="70" stroke={accent} strokeWidth="1.2" opacity="0.6" />
              <circle cx={x} cy="60" r={i === 4 ? 8 : 5} fill={accent} opacity={0.4 + i * 0.15} />
              {i % 2 === 0 && (
                <rect x={x - 18} y="20" width="36" height="14" rx="3" fill="oklch(0.18 0.04 257)" stroke={accent} strokeOpacity="0.4" />
              )}
              {i % 2 === 1 && (
                <rect x={x - 18} y="86" width="36" height="14" rx="3" fill="oklch(0.18 0.04 257)" stroke={accent} strokeOpacity="0.4" />
              )}
            </g>
          ))}
        </svg>
      );
  }
}

/* ───────────────────────── TRUST INSIGHTS ───────────────────────── */

function TrustInsights() {
  const stats = [
    { value: 2.1, suffix: "", label: "Days Average Verification Time", decimal: true },
    { value: 95, suffix: "%", label: "Reduction in Manual Verification Effort" },
    { value: 120, suffix: "+", label: "Source-Verified Records" },
    { value: 100, suffix: "%", label: "Portable Trust Profiles" },
  ];
  return (
    <section className="relative border-y border-border overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-mesh-dark opacity-80" />
      <div className="absolute inset-0 bg-grid-faint opacity-20" />
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 relative">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            <ShieldCheck className="h-3 w-3" /> Trust insights
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            The numbers behind <span className="text-gradient-teal">reusable trust.</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 shadow-premium"
            >
              <div className="text-4xl md:text-5xl font-bold tracking-tight text-gradient-teal">
                {s.decimal ? (
                  <DecimalCounter to={s.value} />
                ) : (
                  <Counter to={s.value} suffix={s.suffix} />
                )}
              </div>
              <div className="mt-3 text-xs md:text-sm text-white/70 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DecimalCounter({ to }: { to: number }) {
  // Counter component is integer-only; render whole+decimal manually
  const whole = Math.floor(to);
  const decimal = Math.round((to - whole) * 10);
  return (
    <span className="inline-flex items-baseline">
      <Counter to={whole} />
      <span>.{decimal}</span>
    </span>
  );
}

/* ───────────────────────── NEWSLETTER ───────────────────────── */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="newsletter" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-hero -z-10" />
      <div className="absolute inset-0 bg-grid-faint opacity-50 -z-10" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[420px] rounded-full bg-primary/15 blur-3xl -z-10" />

      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28 relative">
        <div className="relative rounded-3xl border border-border bg-card/80 backdrop-blur shadow-premium p-8 md:p-14 overflow-hidden">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
          <div className="absolute -left-16 -bottom-16 h-52 w-52 rounded-full bg-info/15 blur-3xl animate-pulse-glow" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              <Mail className="h-3 w-3" /> Newsletter
            </div>
            <h2 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight">
              Stay ahead of <span className="text-gradient-teal">trust infrastructure.</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Get insights on hiring, verification, and reusable trust profiles.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="mt-8 mx-auto max-w-md flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 rounded-xl border border-border bg-background px-4 text-sm shadow-soft focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="btn-premium inline-flex items-center justify-center gap-2 rounded-xl h-12 px-6 font-semibold text-sm"
              >
                {submitted ? "Subscribed ✓" : (<><Send className="h-4 w-4" />Subscribe</>)}
              </button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">One email a month. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Unused imports guard
