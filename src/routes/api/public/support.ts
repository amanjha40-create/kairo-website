import { createFileRoute } from "@tanstack/react-router";

import { sendSupportRequestEmail } from "@/lib/aws-ses";
import { supportRequestSchema } from "@/lib/support-request";
import { zodIssuesToApiDetails } from "@/lib/contact";

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

export const Route = createFileRoute("/api/public/support")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
          "unknown";

        if (!rateLimit(ip)) {
          return Response.json(
            {
              error: {
                code: "rate_limited",
                message: "You’re sending requests too quickly. Please try again shortly.",
              },
            },
            { status: 429 },
          );
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json(
            {
              error: {
                code: "invalid_json",
                message: "We couldn't read that support request. Please try again.",
              },
            },
            { status: 400 },
          );
        }

        const parsed = supportRequestSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json(
            {
              error: {
                code: "validation_error",
                message: "Please review the highlighted fields and try again.",
                details: zodIssuesToApiDetails(parsed.error),
              },
            },
            { status: 422 },
          );
        }

        const result = await sendSupportRequestEmail(parsed.data);
        if (!result.ok) {
          return Response.json(
            {
              error: {
                code: "service_unavailable",
                message: result.error,
              },
            },
            { status: 503 },
          );
        }

        return Response.json({
          status: "accepted",
          message: "Thanks — your support request has been received by KairoID.",
        });
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
