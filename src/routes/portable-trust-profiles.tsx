import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/portable-trust-profiles")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
