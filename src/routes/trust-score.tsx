import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/trust-score")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
