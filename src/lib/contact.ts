import { z } from "zod";

import { WEBSITE_URL } from "@/lib/domain-config";

const requiredTrimmedString = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be ${max} characters or fewer`);

export const CONTACT_TO_EMAIL = "contact@kairoid.com";

function readRuntimeValue(name: string): string | undefined {
  try {
    const env = (import.meta as { env?: Record<string, string | undefined> }).env ?? {};
    return env[name];
  } catch {
    return process.env[name];
  }
}

export function contactApiBaseUrl(): string {
  const explicit =
    readRuntimeValue("VITE_API_BASE_URL") ??
    readRuntimeValue("API_BASE_URL") ??
    (WEBSITE_URL.includes("localhost") ? "http://localhost:8000" : "https://api.kairoid.com");
  return explicit.replace(/\/+$/, "");
}

export function contactEndpointUrl(): string {
  return `${contactApiBaseUrl()}/api/v1/public/contact`;
}

export const contactFormSchema = z.object({
  firstName: requiredTrimmedString("First name", 80),
  lastName: requiredTrimmedString("Last name", 80),
  email: requiredTrimmedString("Work email", 255).email("Enter a valid work email"),
  company: requiredTrimmedString("Company", 160),
  hires: requiredTrimmedString("Hires per month", 40),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more detail")
    .max(2000, "Message must be 2000 characters or fewer"),
  website: z.string().trim().max(0, "Spam submission rejected").optional().default(""),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

export const contactAcceptedResponseSchema = z.object({
  status: z.literal("accepted"),
  message: z.string().min(1),
});

export const contactApiErrorDetailSchema = z.object({
  location: z.array(z.union([z.string(), z.number()])),
  message: z.string().min(1),
  error_type: z.string().min(1).optional(),
});

export const contactApiErrorResponseSchema = z.object({
  error: z.object({
    code: z.string().min(1),
    message: z.string().min(1),
    details: z.array(contactApiErrorDetailSchema).optional(),
  }),
});

export type ContactResponse = z.infer<typeof contactAcceptedResponseSchema>;

export function flattenFieldErrors(error: z.ZodError<ContactFormInput>) {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).filter(([, issues]) => issues?.length),
  ) as Partial<Record<keyof ContactFormInput, string[]>>;
}

const backendToFrontendFieldMap: Partial<Record<string, keyof ContactFormInput>> = {
  first_name: "firstName",
  last_name: "lastName",
  work_email: "email",
  company: "company",
  hires_per_month: "hires",
  message: "message",
  website: "website",
};

export function mapBackendFieldErrors(
  details: Array<{ location: Array<string | number>; message: string }> | undefined,
): Partial<Record<keyof ContactFormInput, string[]>> {
  if (!details?.length) return {};
  const fieldErrors: Partial<Record<keyof ContactFormInput, string[]>> = {};

  for (const detail of details) {
    const fieldKey = detail.location[detail.location.length - 1];
    if (typeof fieldKey !== "string") continue;
    const formField = backendToFrontendFieldMap[fieldKey];
    if (!formField) continue;
    fieldErrors[formField] = [...(fieldErrors[formField] ?? []), detail.message];
  }

  return fieldErrors;
}
