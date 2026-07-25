# Kairo Website Architecture

## Overview

The Kairo website is a TanStack Start application that serves both public website routes and an embedded internal `/app` experience from the same codebase.

This repository is the canonical source of truth for the public Kairo marketing website.

- Framework: React 19 + TypeScript
- Routing: TanStack Router file-based routes
- Styling: Tailwind CSS v4
- SSR/runtime: TanStack Start on Cloudflare Workers
- Auth: Supabase
- Public contact delivery: AWS SES via a server-side route

The public website now uses centralized domain configuration so marketing entry points can route to independently deployed products without coupling those links to the embedded `/app` routes.

## Routing

### Public website routes

Public pages live in `src/routes` and include:

- `/`
- `/product`
- `/trust-passport`
- `/hr-workspace`
- `/institution-workspace`
- `/for-professionals`
- `/for-employers`
- `/for-institutions`
- `/contact`
- `/about`
- `/blog`
- `/trust-center`
- `/help-center`
- `/privacy`
- `/terms`

### Embedded product routes

The repository still contains embedded product routes such as:

- `/app`
- `/app/people`
- `/app/invitations`
- `/app/verifications`
- `/app/team`
- `/login`
- `/signup`
- `/onboarding`

These routes remain in place for previews and internal/demo flows, but public marketing CTAs should no longer point to them directly.

The embedded `/app` routes are temporary legacy code during the migration window. Standalone HR product development lives in `kairo-hr-workspace`, and `/app` should only be removed or redirected after separate acceptance.

## Domain Strategy

Centralized domain configuration lives in `src/lib/domain-config.ts`.

The current supported domain variables are:

- `WEBSITE_URL`
- `HR_WORKSPACE_URL`
- `CANDIDATE_APP_URL`
- `UNIVERSITY_URL`
- `ADMIN_URL`

Client-side reads use the `VITE_` equivalents:

- `VITE_WEBSITE_URL`
- `VITE_HR_WORKSPACE_URL`
- `VITE_CANDIDATE_APP_URL`
- `VITE_UNIVERSITY_URL`
- `VITE_ADMIN_URL`

### Current linking behavior

- Public website metadata, canonicals, and sitemap use `WEBSITE_URL`
- Public HR workspace CTAs use `HR_WORKSPACE_URL`
- Institution/public workspace labels can use `UNIVERSITY_URL`
- Candidate and admin domains are reserved in config for future website entry points

## Contact Architecture

The contact form uses a shared Zod schema in `src/lib/contact.ts`.

### Client

- Route: `src/routes/contact.tsx`
- Validation: `react-hook-form` + `zodResolver`
- Submission target: `POST /api/public/contact`

### Server

- Route: `src/routes/api/public/contact.ts`
- Validation: shared `contactFormSchema`
- Spam protection:
  - honeypot field
  - in-memory rate limiting
- Delivery: AWS SES via `src/lib/aws-ses.ts`
- Success behavior: returns `200` only after SES returns a message id
- Failure behavior: returns non-2xx when validation or delivery fails

## Environment Variables

### Required existing variables

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Domain configuration variables

- `WEBSITE_URL`
- `HR_WORKSPACE_URL`
- `CANDIDATE_APP_URL`
- `UNIVERSITY_URL`
- `ADMIN_URL`
- `VITE_WEBSITE_URL`
- `VITE_HR_WORKSPACE_URL`
- `VITE_CANDIDATE_APP_URL`
- `VITE_UNIVERSITY_URL`
- `VITE_ADMIN_URL`

### Contact delivery variables

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN` optional
- `AWS_REGION`
- `AWS_SES_FROM_EMAIL`

`contact@kairoid.com` is the fixed destination for website contact submissions.

## Deployment Assumptions

- The website is deployed separately from the HR workspace.
- Public website routes are expected to live under `WEBSITE_URL`.
- HR, candidate, university, and admin products can live on separate domains or subdomains.
- Public CTAs should route to those deployed product domains, not to the bundled website `/app` routes.
- AWS credentials remain server-only and must never be exposed through client-side `VITE_` variables.
