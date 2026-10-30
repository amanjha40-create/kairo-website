import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Download, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.kairoid.app";

export const Route = createFileRoute("/invite/$token")({
  head: () => ({
    meta: [
      { title: "Open your Trust Invitation | KairoID" },
      {
        name: "description",
        content: "Open KairoID to review and respond to your Trust Invitation.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "referrer", content: "no-referrer" },
    ],
  }),
  component: InviteLandingPage,
});

function InviteLandingPage() {
  const { token } = Route.useParams();
  const appLink = `/invite/${encodeURIComponent(token)}`;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-navy px-5 py-6 text-white sm:px-8 sm:py-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_10%,oklch(0.70_0.13_192_/_0.28),transparent_30%),radial-gradient(circle_at_85%_88%,oklch(0.74_0.13_230_/_0.18),transparent_34%),linear-gradient(145deg,oklch(0.20_0.05_260),oklch(0.14_0.035_260))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />

      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col sm:min-h-[calc(100vh-5rem)]">
        <header className="flex items-center justify-between">
          <div className="rounded-xl bg-white px-3 py-2 shadow-sm">
            <Logo className="h-5" />
          </div>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-white/70 backdrop-blur">
            TRUST INVITATION
          </span>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="max-w-xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-teal/30 bg-teal/15 text-teal shadow-[0_0_40px_-12px_oklch(0.70_0.13_192)]">
              <ShieldCheck aria-hidden="true" className="h-6 w-6" />
            </div>
            <p className="mt-7 text-sm font-semibold tracking-[0.18em] text-teal">
              PRIVATE. CONSENT-BASED. YOURS.
            </p>
            <h1 className="mt-4 max-w-lg text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl">
              You&apos;ve received a Trust Invitation
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-white/70 sm:text-lg">
              Open KairoID to review and respond to your invitation. Sign in with the verified email
              address that received it.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-5 shadow-[0_36px_100px_-36px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-8">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal text-navy">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Continue securely in KairoID</h2>
                  <p className="mt-1 text-sm leading-6 text-white/60">
                    Invitation details are shown only after KairoID confirms your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <a
                href={appLink}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-teal px-5 py-3.5 text-sm font-bold text-navy transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Open KairoID
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Get it on Google Play
              </a>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-white/45">
              KairoID for iPhone is coming soon. No invitation information is displayed on this
              public page.
            </p>
          </div>
        </section>

        <footer className="border-t border-white/10 py-5 text-center text-xs text-white/40 sm:text-left">
          KairoID keeps invitation access tied to the intended verified account.
        </footer>
      </div>
    </main>
  );
}
