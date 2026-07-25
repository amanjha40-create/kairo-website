import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

const TITLE = "Pricing — Kairo";
const DESC = "Simple pricing for the Kairo Trust Workspace. Full pricing details coming soon.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="Pricing"
      title="Simple pricing for modern hiring."
      intro="Transparent plans for professionals, employers and institutions. Detailed pricing lands with the next release."
    />
  ),
});
