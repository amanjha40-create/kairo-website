# GitHub Workflow

## Canonical repository

- Repository: `https://github.com/amanjha40-create/kairo-website.git`
- Primary branch: `main`

This repository is the canonical GitHub home for the standalone Kairo website.

## Expected workflow

1. work in the standalone website repository
2. validate with `npm ci`, `npm run typecheck`, and `npm run build`
3. keep public website changes separate from backend or standalone product-app changes
4. preserve embedded `/app` routes only until the separate HR removal acceptance happens

## Scope guardrails

- do not copy backend code into this repository
- do not copy standalone HR workspace code into this repository beyond the currently preserved embedded legacy `/app` routes
- do not add candidate, institution, or admin standalone apps here
- do not change production hosting or DNS as part of ordinary repository maintenance

## Hygiene

- keep `.env.example` tracked
- keep `.env` and `.env.*` untracked
- do not commit local build output, `node_modules`, `.output`, `.tanstack`, or `.wrangler`
- document new environment variables in [docs/WEBSITE_ARCHITECTURE.md](/Users/Aman/Documents/New project/kairo-website/docs/WEBSITE_ARCHITECTURE.md)
