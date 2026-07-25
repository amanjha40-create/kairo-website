import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-background-verification")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
