import { z } from "zod";

const requiredTrimmedString = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be ${max} characters or fewer`);

export const CONTACT_TO_EMAIL = "contact@kairoid.com";

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

export const contactSuccessResponseSchema = z.object({
  ok: z.literal(true),
  messageId: z.string().min(1),
});

export const contactErrorResponseSchema = z.object({
  ok: z.literal(false),
  error: z.string().min(1),
  fieldErrors: z.record(z.array(z.string())).optional(),
});

export const contactResponseSchema = z.union([
  contactSuccessResponseSchema,
  contactErrorResponseSchema,
]);

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactResponse = z.infer<typeof contactResponseSchema>;

export function flattenFieldErrors(error: z.ZodError<ContactFormInput>) {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).filter(([, issues]) => issues?.length),
  ) as Partial<Record<keyof ContactFormInput, string[]>>;
}
