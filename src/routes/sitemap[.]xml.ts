import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { posts } from "@/lib/blog-posts";
import { WEBSITE_URL } from "@/lib/domain-config";

const BASE_URL = WEBSITE_URL;

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/product", changefreq: "monthly", priority: "0.9" },
  { path: "/trust-passport", changefreq: "monthly", priority: "0.9" },
  { path: "/hr-workspace", changefreq: "monthly", priority: "0.9" },
  { path: "/institution-workspace", changefreq: "monthly", priority: "0.9" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/for-professionals", changefreq: "monthly", priority: "0.8" },
  { path: "/for-employers", changefreq: "monthly", priority: "0.8" },
  { path: "/for-institutions", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/trust-center", changefreq: "monthly", priority: "0.7" },
  { path: "/help-center", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  ...posts.map((p) => ({
    path: `/blog/${p.slug}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  })),
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
