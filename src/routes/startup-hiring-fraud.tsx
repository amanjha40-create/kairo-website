import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/startup-hiring-fraud")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
