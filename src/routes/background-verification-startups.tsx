import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/background-verification-startups")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
