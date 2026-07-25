import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/reusable-trust-identity")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
