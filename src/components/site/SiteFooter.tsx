import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Linkedin } from "lucide-react";

const cols = [
  {
    title: "Product",
    links: [
      ["Product Overview", "/product"],
      ["Trust Passport", "/trust-passport"],
      ["HR Workspace", "/hr-workspace"],
      ["Institution Workspace", "/institution-workspace"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["For Professionals", "/for-professionals"],
      ["For Employers", "/for-employers"],
      ["For Institutions", "/for-institutions"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Blog", "/blog"],
      ["Trust Center", "/trust-center"],
      ["Help Center", "/help-center"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-secondary/40 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-6">
          <div className="md:col-span-2 space-y-5">
            <Logo className="h-7" />
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Portable professional trust infrastructure for professionals, employers and institutions.
            </p>

            <div className="space-y-1.5 text-sm text-muted-foreground">
              <a href="mailto:contact@kairoid.com" className="block hover:text-foreground transition-colors">contact@kairoid.com</a>
              <a href="tel:+918767299299" className="block hover:text-foreground transition-colors">+91 8767299299</a>
              <div>Bengaluru, India</div>
            </div>
            <a
              href="https://www.linkedin.com/company/kairoid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Kairo on LinkedIn"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 h-9 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              <Linkedin className="h-4 w-4" />
              <span>Follow Kairo on LinkedIn</span>
            </a>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold mb-4 uppercase tracking-wider text-foreground/80">{c.title}</div>
              <ul className="space-y-3">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Kairo. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Reusable trust for the modern workforce.</p>
        </div>
      </div>
    </footer>
  );
}
