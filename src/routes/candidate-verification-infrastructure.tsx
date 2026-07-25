import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/candidate-verification-infrastructure")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
