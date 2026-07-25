import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, ShieldCheck, Clock, ArrowRight, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { siteUrl } from "@/lib/domain-config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  contactResponseSchema,
  type ContactFormInput,
} from "@/lib/contact";

const PAGE_URL = siteUrl("/contact");
const PAGE_TITLE = "Contact Kairo — Book a Demo of AI Trust Infrastructure";
const PAGE_DESC =
  "Talk to the Kairo team about AI-powered verified professional identity, portable trust profiles, and verified hiring at scale.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: PAGE_TITLE,
          url: PAGE_URL,
          description: PAGE_DESC,
          mainEntity: {
            "@type": "Organization",
            name: "Kairo",
            email: "contact@kairoid.com",
            telephone: "+91-8767299299",
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "sales",
                email: "contact@kairoid.com",
                telephone: "+91-8767299299",
                areaServed: "Worldwide",
                availableLanguage: ["English"],
              },
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bengaluru",
              addressRegion: "Karnataka",
              addressCountry: "IN",
            },
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, label: "Email us", value: "contact@kairoid.com", href: "mailto:contact@kairoid.com", desc: "We reply within one business day." },
  { icon: Phone, label: "Call us", value: "+91 8767299299", href: "tel:+918767299299", desc: "Mon–Fri · 10 AM – 7 PM IST." },
  { icon: MapPin, label: "Visit us", value: "Bengaluru, India", href: "#", desc: "Headquartered in Karnataka." },
];

function ContactPage() {
  const [submitted, setSubmitted] = useState<Pick<ContactFormInput, "firstName" | "email"> | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      hires: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormInput) {
    setServerError(null);
    trackEvent("contact_form_submit", { location: "contact_page" });
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const raw = await res.json().catch(() => null);
      const parsed = contactResponseSchema.safeParse(raw);

      if (!parsed.success) {
        throw new Error("Unexpected response from contact service.");
      }

      const response = parsed.data;

      if (!response.ok) {
        const fieldErrors = response.fieldErrors ?? {};
        for (const [fieldName, fieldIssues] of Object.entries(fieldErrors)) {
          if (!fieldIssues?.length) continue;
          setError(fieldName as keyof ContactFormInput, {
            type: "server",
            message: fieldIssues[0],
          });
        }

        throw new Error(response.error);
      }

      if (!res.ok) {
        throw new Error("Contact service request failed.");
      }

      setSubmitted({ firstName: values.firstName, email: values.email });
      reset();
      trackEvent("contact_form_success");
      toast.success("Thanks — we'll be in touch within 24 hours.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email contact@kairoid.com directly.";
      setServerError(message);
      trackEvent("contact_form_error", { message });
      toast.error(message);
    }
  }

  return (
    <SiteLayout>
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero -z-10" />
        <div className="absolute inset-0 bg-grid-faint opacity-60 -z-10" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl -z-10" />
        <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-info/10 blur-3xl -z-10" />

        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16">
          {/* Left — info */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-xs font-medium shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Contact
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04]">
              Let's build <span className="text-gradient-teal">trusted hiring</span> together.
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Tell us about your hiring workflows and verification needs. Our team will design a tailored rollout for your organization.
            </p>

            {/* contact cards */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group relative rounded-2xl border border-border bg-card/80 backdrop-blur p-5 shadow-card hover:shadow-elevated hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-x-5 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 group-hover:bg-primary/15 blur-2xl transition-colors" />
                  <div className="relative">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/15 to-info/10 border border-primary/20 flex items-center justify-center">
                      <c.icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="mt-1 text-sm font-semibold">{c.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{c.desc}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* trust strip */}
            <div className="mt-10 rounded-2xl border border-border bg-card/60 backdrop-blur p-5 flex flex-wrap items-center gap-x-6 gap-y-3 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4 text-primary" /> Professional identity infrastructure
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span>Portable trust</span><span>·</span><span>Reusable verification</span><span>·</span><span>Candidate-owned</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/25 via-info/15 to-transparent blur-3xl rounded-full -z-10" />
            {submitted ? (
              <div className="relative rounded-3xl border border-border bg-card shadow-premium p-10 md:p-12 text-center overflow-hidden">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight">Request received</h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                  Thanks {submitted.firstName || "there"} — our team will reach out within one business day at {submitted.email}.
                </p>
              </div>
            ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative rounded-3xl border border-border bg-card shadow-premium p-8 md:p-10 space-y-5 overflow-hidden"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                <Sparkles className="h-3 w-3" /> Book a demo
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tell us about your team</h2>

              {/* honeypot */}
              <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("website")} />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" maxLength={80} className="rounded-xl h-11" aria-invalid={!!errors.firstName} {...register("firstName")} />
                  {errors.firstName?.message ? <p className="text-xs text-destructive">{errors.firstName.message}</p> : null}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" maxLength={80} className="rounded-xl h-11" aria-invalid={!!errors.lastName} {...register("lastName")} />
                  {errors.lastName?.message ? <p className="text-xs text-destructive">{errors.lastName.message}</p> : null}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" maxLength={255} className="rounded-xl h-11" aria-invalid={!!errors.email} {...register("email")} />
                {errors.email?.message ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company">Company</Label>
                <Input id="company" maxLength={160} className="rounded-xl h-11" aria-invalid={!!errors.company} {...register("company")} />
                {errors.company?.message ? <p className="text-xs text-destructive">{errors.company.message}</p> : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hires">Hires per month</Label>
                <Input id="hires" placeholder="e.g. 50" maxLength={40} className="rounded-xl h-11" aria-invalid={!!errors.hires} {...register("hires")} />
                {errors.hires?.message ? <p className="text-xs text-destructive">{errors.hires.message}</p> : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">What can we help with?</Label>
                <Textarea id="message" rows={4} maxLength={2000} className="rounded-xl" aria-invalid={!!errors.message} {...register("message")} />
                {errors.message?.message ? <p className="text-xs text-destructive">{errors.message.message}</p> : null}
              </div>
              {serverError ? <p className="text-sm text-destructive">{serverError}</p> : null}
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full btn-premium rounded-xl h-12 font-semibold">
                {isSubmitting ? (<><Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Sending…</>) : (<>Request a demo <ArrowRight className="ml-1.5 h-4 w-4" /></>)}
              </Button>
              <div className="flex items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" /> Average response time under 24 hours
              </div>
            </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
