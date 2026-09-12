import { z } from "zod";

import { siteUrl } from "@/lib/domain-config";

const requiredTrimmedString = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be ${max} characters or fewer`);

export const supportProducts = [
  "Candidate",
  "HR Workspace",
  "Institution Workspace",
  "Account & Security",
] as const;

export const supportIssueCategories = [
  "Login or password reset",
  "OTP not received",
  "Trust Invitation",
  "Verification status",
  "Evidence or document upload",
  "Trust Passport or sharing",
  "Resume import",
  "Institution verification link",
  "Team or workspace access",
  "Security or account access concern",
  "Onboarding help",
  "Other",
] as const;

export const supportRequestSchema = z.object({
  name: requiredTrimmedString("Name", 160),
  email: requiredTrimmedString("Email", 255).email("Enter a valid email address"),
  product: z.enum(supportProducts, {
    errorMap: () => ({ message: "Choose the KairoID product you need help with" }),
  }),
  category: z.enum(supportIssueCategories, {
    errorMap: () => ({ message: "Choose the issue category that fits best" }),
  }),
  subject: requiredTrimmedString("Subject", 160),
  description: z
    .string()
    .trim()
    .min(20, "Please share a bit more detail so support can help")
    .max(4000, "Description must be 4000 characters or fewer"),
  relevantPublicId: z
    .string()
    .trim()
    .max(160, "Relevant public ID must be 160 characters or fewer")
    .optional()
    .default(""),
  currentRoute: z
    .string()
    .trim()
    .max(500, "Current route must be 500 characters or fewer")
    .optional()
    .default(""),
  appVersion: z
    .string()
    .trim()
    .max(120, "App version must be 120 characters or fewer")
    .optional()
    .default(""),
  platform: z
    .string()
    .trim()
    .max(120, "Platform must be 120 characters or fewer")
    .optional()
    .default(""),
  pageUrl: z
    .string()
    .trim()
    .max(500, "Page URL must be 500 characters or fewer")
    .optional()
    .default(""),
  referrer: z
    .string()
    .trim()
    .max(500, "Referrer must be 500 characters or fewer")
    .optional()
    .default(""),
  website: z.string().trim().max(0, "Spam submission rejected").optional().default(""),
});

export type SupportRequestFormInput = z.input<typeof supportRequestSchema>;
export type SupportRequestData = z.infer<typeof supportRequestSchema>;

export const supportAcceptedResponseSchema = z.object({
  status: z.literal("accepted"),
  message: z.string().min(1),
});

export const supportApiErrorDetailSchema = z.object({
  location: z.array(z.union([z.string(), z.number()])),
  message: z.string().min(1),
  error_type: z.string().min(1).optional(),
});

export const supportApiErrorResponseSchema = z.object({
  error: z.object({
    code: z.string().min(1),
    message: z.string().min(1),
    details: z.array(supportApiErrorDetailSchema).optional(),
  }),
});

export function supportEndpointUrl() {
  return siteUrl("/api/public/support");
}

export function mapSupportBackendFieldErrors(
  details: Array<{ location: Array<string | number>; message: string }> | undefined,
): Partial<Record<keyof SupportRequestFormInput, string[]>> {
  if (!details?.length) return {};
  const fieldErrors: Partial<Record<keyof SupportRequestFormInput, string[]>> = {};

  for (const detail of details) {
    const fieldKey = detail.location[detail.location.length - 1];
    if (typeof fieldKey !== "string") continue;
    fieldErrors[fieldKey as keyof SupportRequestFormInput] = [
      ...(fieldErrors[fieldKey as keyof SupportRequestFormInput] ?? []),
      detail.message,
    ];
  }

  return fieldErrors;
}
