import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/trust-profiles")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
