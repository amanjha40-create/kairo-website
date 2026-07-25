# Repository Migration

## Source

- Source folder: `/Users/Aman/Documents/New project/kairo-website`
- Destination repository: `https://github.com/amanjha40-create/kairo-website.git`
- Canonical branch: `main`

## Canonical boundary

This repository is the canonical source of truth for the public Kairo marketing website.

Current boundary rules:

- public marketing website code is canonical here
- embedded `/app` routes remain temporarily in this repository as legacy transitional product code
- standalone HR product development lives in `kairo-hr-workspace`
- backend code does not belong in this repository
- candidate, institution, and admin standalone applications do not belong in this repository

## Embedded `/app` status

Embedded `/app` routes are intentionally preserved during this migration.

They are temporary legacy code and must only be removed or redirected after separate acceptance for the HR cutover.

## Environment variables

Use [`.env.example`](/Users/Aman/Documents/New project/kairo-website/.env.example) as the local template.

Current variables used by the website:

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
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN` optional
- `AWS_REGION`
- `AWS_SES_FROM_EMAIL`

## Local development

```bash
cp .env.example .env
npm ci
npm run typecheck
npm run build
```

Use `npm run dev` for local development after dependencies are installed.

## Build commands

- `npm ci`
- `npm run typecheck`
- `npm run build`
- `npm run lint`

## Deployment assumptions

- the canonical website repository does not change current production hosting or DNS
- Lovable and Cloudflare deployment choices remain unchanged by this migration
- the website is expected to serve public marketing routes
- public CTAs can target separate product domains through centralized domain configuration

## Rollback and recovery

If a migration problem is discovered:

1. keep the source folder intact
2. compare the local source folder against the pushed repository
3. reset or recreate the standalone repository from the source folder if needed
4. do not remove the source folder until the pushed repository and a fresh clone are both verified

## Future HR removal plan

After separate acceptance:

1. remove or redirect embedded `/app` HR routes from this repository
2. point all HR product entry to the standalone `kairo-hr-workspace`
3. keep this repository focused on the public website only
