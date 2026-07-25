import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-verification-engine")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
