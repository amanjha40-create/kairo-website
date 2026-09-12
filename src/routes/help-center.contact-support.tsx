import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  ShieldAlert,
  MessageSquareWarning,
  ArrowRight,
  LifeBuoy,
  Lock,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { siteUrl } from "@/lib/domain-config";
import {
  mapSupportBackendFieldErrors,
  supportAcceptedResponseSchema,
  supportApiErrorResponseSchema,
  supportEndpointUrl,
  supportIssueCategories,
  supportProducts,
  supportRequestSchema,
  type SupportRequestFormInput,
} from "@/lib/support-request";
import {
  CHAT_PROVIDER_REQUIRED,
  SUPPORT_EMAIL,
  SUPPORT_HOURS,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
  SUPPORT_RESPONSE_PROMISE,
  SUPPORT_TIMEZONE,
  hasLiveChatProvider,
} from "@/lib/support";

const PAGE_URL = siteUrl("/help-center/contact-support");
const PAGE_TITLE = "Contact KairoID Support";
const PAGE_DESC =
  "Call KairoID, email support, submit a support request, or report a security or account-access concern.";

const searchSchema = z.object({
  product: z.enum(supportProducts).optional(),
  category: z.enum(supportIssueCategories).optional(),
  route: z.string().optional(),
  publicId: z.string().optional(),
});

export const Route = createFileRoute("/help-center/contact-support")({
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
  }),
  component: ContactSupportPage,
});

function ContactSupportPage() {
  const search = readSupportSearch();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const chatAvailable = hasLiveChatProvider();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SupportRequestFormInput>({
    resolver: zodResolver(supportRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      product: search.product ?? "Candidate",
      category: search.category ?? "Other",
      subject: "",
      description: "",
      relevantPublicId: search.publicId ?? "",
      currentRoute: search.route ?? "",
      appVersion: "",
      platform: "",
      pageUrl: "",
      referrer: "",
      website: "",
    },
  });

  useEffect(() => {
    setValue("product", search.product ?? "Candidate");
    setValue("category", search.category ?? "Other");
    setValue("relevantPublicId", search.publicId ?? "");
    setValue("currentRoute", search.route ?? "");
  }, [search.category, search.product, search.publicId, search.route, setValue]);

  async function onSubmit(values: SupportRequestFormInput) {
    setServerError(null);
    trackEvent("support_request_submit", { product: values.product, category: values.category });

    try {
      const response = await fetch(supportEndpointUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const raw = await response.json().catch(() => null);

      if (response.ok) {
        const accepted = supportAcceptedResponseSchema.safeParse(raw);
        if (!accepted.success) {
          throw new Error("Unexpected response from support service.");
        }
        setSubmitted(true);
        reset({
          ...values,
          subject: "",
          description: "",
          relevantPublicId: values.relevantPublicId,
          currentRoute: values.currentRoute,
          appVersion: "",
          platform: "",
          pageUrl: "",
          referrer: "",
          website: "",
        });
        toast.success(accepted.data.message);
        return;
      }

      const parsedError = supportApiErrorResponseSchema.safeParse(raw);
      if (response.status === 422 && parsedError.success) {
        const fieldErrors = mapSupportBackendFieldErrors(parsedError.data.error.details);
        for (const [fieldName, fieldIssues] of Object.entries(fieldErrors)) {
          if (!fieldIssues?.length) continue;
          setError(fieldName as keyof SupportRequestFormInput, {
            type: "server",
            message: fieldIssues[0],
          });
        }
      }

      if (parsedError.success) {
        throw new Error(parsedError.data.error.message);
      }

      throw new Error("We couldn’t send your support request right now. Please try again shortly.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We couldn’t send your support request right now. Please try again shortly.";
      setServerError(message);
      toast.error(message);
    }
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-mesh-hero -z-10" />
        <div className="absolute inset-0 bg-grid-faint opacity-60 -z-10" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-soft">
                <LifeBuoy className="h-3.5 w-3.5" /> Contact KairoID Support
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                Get help from the KairoID team.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Use this support hub for product issues, account access concerns, onboarding help,
                and troubleshooting across Candidate, HR Workspace, and Institution Workspace.
              </p>

              <div className="mt-8 grid gap-4">
                <a
                  href={SUPPORT_PHONE_TEL}
                  className="rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:border-primary/30"
                >
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <div className="text-base font-semibold text-foreground">
                        Call KairoID Support
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {SUPPORT_PHONE_DISPLAY}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {SUPPORT_HOURS} · {SUPPORT_TIMEZONE}
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:border-primary/30"
                >
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <div className="text-base font-semibold text-foreground">Email Support</div>
                      <div className="mt-1 text-sm text-muted-foreground">{SUPPORT_EMAIL}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {SUPPORT_RESPONSE_PROMISE}
                      </div>
                    </div>
                  </div>
                </a>
                <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-start gap-3">
                    <MessageSquareWarning className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <div className="text-base font-semibold text-foreground">
                        Chat with KairoID Support
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {chatAvailable
                          ? "Live chat is available for this environment."
                          : "Live chat is not active yet for this Help Centre. Use phone, email, or the support request form instead."}
                      </div>
                      {!chatAvailable && (
                        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                          {CHAT_PROVIDER_REQUIRED}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-border bg-card p-5 shadow-soft">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-1 h-4 w-4 text-primary" />
                  <div>
                    <div className="text-base font-semibold text-foreground">
                      Security or account access concern
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Use this for suspicious login, wrong organization access, suspected
                      information exposure, or loss of access to a work account. Never send KairoID
                      your password, OTP, access token, refresh token, or private key.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[1.75rem] border border-border bg-card p-5 shadow-soft">
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-1 h-4 w-4 text-primary" />
                  <div>
                    <div className="text-base font-semibold text-foreground">
                      Onboarding help for HR and Institution teams
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Use this path if your organization needs help with first workspace setup,
                      first Trust Invitation, first verification workflow, or team access.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-card md:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Submit a support request
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Tell us what you need help with.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Include only safe context. Public IDs such as an invitation ID, verification ID, or
                share ID help. Do not paste passwords, OTPs, access tokens, refresh tokens, or
                document contents.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Name" error={errors.name?.message}>
                    <Input {...register("name")} placeholder="Your name" />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <Input {...register("email")} placeholder="you@example.com" type="email" />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Product" error={errors.product?.message}>
                    <select
                      {...register("product")}
                      className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      {supportProducts.map((product) => (
                        <option key={product} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Issue category" error={errors.category?.message}>
                    <select
                      {...register("category")}
                      className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      {supportIssueCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Subject" error={errors.subject?.message}>
                  <Input {...register("subject")} placeholder="Short summary of the issue" />
                </Field>

                <Field label="Description" error={errors.description?.message}>
                  <Textarea
                    {...register("description")}
                    rows={7}
                    placeholder="Describe what happened, what you expected, and what you tried already."
                  />
                </Field>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Relevant public ID (optional)"
                    error={errors.relevantPublicId?.message}
                  >
                    <Input
                      {...register("relevantPublicId")}
                      placeholder="Verification ID, Invitation ID, Organization ID, Share ID..."
                    />
                  </Field>
                  <Field
                    label="Current route or screen (optional)"
                    error={errors.currentRoute?.message}
                  >
                    <Input
                      {...register("currentRoute")}
                      placeholder="For example: /trust-invitations/..."
                    />
                  </Field>
                </div>

                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Lock className="h-4 w-4 text-primary" /> Safety note
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Screenshots are not attached automatically in this version. If support needs
                    one, they can request it later by email without asking for your password, OTP,
                    access token, refresh token, or document contents.
                  </p>
                </div>

                <input type="hidden" {...register("appVersion")} />
                <input type="hidden" {...register("platform")} />
                <input type="hidden" {...register("pageUrl")} />
                <input type="hidden" {...register("referrer")} />
                <input type="hidden" {...register("website")} />

                {serverError && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
                    {serverError}
                  </div>
                )}

                {submitted && !serverError && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                    Your support request has been received by KairoID. {SUPPORT_RESPONSE_PROMISE}
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Button type="submit" className="btn-premium rounded-xl" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit support request"}
                  </Button>
                  <Button asChild type="button" variant="outline" className="rounded-xl">
                    <Link to="/help-center">Search Help Centre</Link>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-[1.75rem] border border-border bg-card px-6 py-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-foreground">
                  Not sure where to start?
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Search the Help Centre for product guides, troubleshooting, and security help
                  before opening a duplicate request.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/help-center">
                  Open Help Centre <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function readSupportSearch(): z.infer<typeof searchSchema> {
  if (typeof window === "undefined") {
    return {};
  }

  const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
  const parsed = searchSchema.safeParse(params);
  return parsed.success ? parsed.data : {};
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
    </div>
  );
}
