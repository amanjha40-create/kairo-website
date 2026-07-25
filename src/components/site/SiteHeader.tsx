import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { HR_WORKSPACE_URL } from "@/lib/domain-config";
import { SmartLink } from "@/components/site/SmartLink";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type LinkItem = { to: string; label: string; desc?: string };

const product: LinkItem[] = [
  { to: "/product", label: "Product Overview", desc: "Portable trust infrastructure across professionals, employers and institutions." },
  { to: "/trust-passport", label: "Trust Passport", desc: "One verified professional identity, owned for life and shared with consent." },
  { to: "/hr-workspace", label: "HR Workspace", desc: "For employers — invite candidates and respond to verification requests." },
  { to: "/institution-workspace", label: "Institution Workspace", desc: "For universities, colleges and credential issuers." },
];

const solutions: LinkItem[] = [
  { to: "/for-professionals", label: "For Professionals", desc: "Build a Trust Passport that moves with you." },
  { to: "/for-employers", label: "For Employers", desc: "Consent-based verification and trusted candidate profiles." },
  { to: "/for-institutions", label: "For Institutions", desc: "Verify credentials and issue trusted education records." },
];

const resources: LinkItem[] = [
  { to: "/blog", label: "Blog", desc: "Insights on hiring, verification, trust, and fraud prevention." },
  { to: "/trust-center", label: "Trust Center", desc: "Verification methodology, privacy, consent, and trust standards." },
  { to: "/help-center", label: "Help Center", desc: "Frequently asked questions, onboarding help, and support." },
];

const company: LinkItem[] = [
  { to: "/about", label: "About", desc: "The team building portable professional trust infrastructure." },
  { to: "/contact", label: "Contact", desc: "Talk to our team about your organisation or use case." },
];

function MenuColumn({ items, onNav, width = "w-[420px]" }: { items: LinkItem[]; onNav: (label: string, to: string) => void; width?: string }) {
  return (
    <ul className={`grid ${width} gap-1 p-3`}>
      {items.map((it) => (
        <li key={it.to}>
          <Link
            to={it.to}
            onClick={() => onNav(it.label, it.to)}
            className="block rounded-lg p-3 hover:bg-secondary transition-colors"
          >
            <div className="text-sm font-semibold text-foreground">{it.label}</div>
            {it.desc && <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{it.desc}</div>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const onNav = (label: string, to: string) => trackEvent("nav_click", { label, to });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 md:h-15 max-w-7xl items-center justify-between px-4 sm:px-6 gap-3">
        <Logo className="h-5 md:h-[22px]" />

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MenuColumn items={product} onNav={onNav} width="w-[460px]" />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MenuColumn items={solutions} onNav={onNav} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/pricing"
                onClick={() => onNav("Pricing", "/pricing")}
                className={navigationMenuTriggerStyle() + " bg-transparent"}
                activeProps={{ className: "text-foreground bg-secondary" }}
              >
                Pricing
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MenuColumn items={resources} onNav={onNav} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MenuColumn items={company} onNav={onNav} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login" onClick={() => trackEvent("cta_click", { label: "Sign in", location: "header" })}>Sign in</Link>
          </Button>
          <Button asChild size="sm" className="btn-premium rounded-xl h-9 px-4">
            <SmartLink to={HR_WORKSPACE_URL} onClick={() => trackEvent("cta_click", { label: "Open workspace", location: "header" })}>
              Open workspace <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </SmartLink>
          </Button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 -mr-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/80 active:bg-secondary transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="px-5 py-4 space-y-2">
            {[
              { label: "Product", items: product },
              { label: "Solutions", items: solutions },
            ].map((group) => (
              <details key={group.label} className="group">
                <summary className="flex items-center justify-between py-2 text-sm font-semibold cursor-pointer list-none">
                  {group.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-1 pl-2 space-y-1 border-l border-border">
                  {group.items.map((it) => (
                    <li key={it.to}>
                      <Link
                        to={it.to}
                        onClick={() => { setOpen(false); onNav(it.label, it.to); }}
                        className="block py-2 pl-3 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <Link to="/pricing" onClick={() => { setOpen(false); onNav("Pricing", "/pricing"); }} className="block py-2 text-sm font-semibold">Pricing</Link>
            {[
              { label: "Resources", items: resources },
              { label: "Company", items: company },
            ].map((group) => (
              <details key={group.label} className="group">
                <summary className="flex items-center justify-between py-2 text-sm font-semibold cursor-pointer list-none">
                  {group.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-1 pl-2 space-y-1 border-l border-border">
                  {group.items.map((it) => (
                    <li key={it.to}>
                      <Link
                        to={it.to}
                        onClick={() => { setOpen(false); onNav(it.label, it.to); }}
                        className="block py-2 pl-3 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            <div className="flex gap-2 pt-3">
              <Button asChild variant="ghost" size="sm" className="flex-1 rounded-xl">
                <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 btn-premium rounded-xl">
                <SmartLink to={HR_WORKSPACE_URL} onClick={() => setOpen(false)}>Open workspace</SmartLink>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
