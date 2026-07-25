import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { AmbientNetwork } from "@/components/motion/AmbientNetwork";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <AmbientNetwork />
      <SiteHeader />
      <main className="flex-1 relative">{children}</main>
      <SiteFooter />
    </div>
  );
}
