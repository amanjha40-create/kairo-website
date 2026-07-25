import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/employment-verification")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
