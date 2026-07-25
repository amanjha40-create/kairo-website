import { createFileRoute } from "@tanstack/react-router";
import { sendContactEmail } from "@/lib/aws-ses";
import { contactFormSchema, flattenFieldErrors } from "@/lib/contact";

// Simple in-memory rate limit (per worker instance). Best-effort spam guard.
const HITS = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = HITS.get(ip);
  if (!entry || entry.reset < now) {
    HITS.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
          "unknown";
        if (!rateLimit(ip)) {
          return Response.json(
            { ok: false, error: "Too many requests" },
            { status: 429 },
          );
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json(
            { ok: false, error: "Invalid JSON" },
            { status: 400 },
          );
        }

        const parsed = contactFormSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json(
            {
              ok: false,
              error: "Please review the highlighted fields and try again.",
              fieldErrors: flattenFieldErrors(parsed.error),
            },
            { status: 400 },
          );
        }

        const result = await sendContactEmail(parsed.data);
        if (!result.ok) {
          return Response.json(
            {
              ok: false,
              error: result.error,
            },
            { status: 503 },
          );
        }

        return Response.json({ ok: true, messageId: result.messageId });
      },
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }),
    },
  },
});
