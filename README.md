# Abishek M K — Portfolio

Personal portfolio for **M.K. Abishek**, Software Engineer at Massclick (Tiruchirappalli).
Full-stack + mobile + infrastructure work, shown as real systems with real numbers.

> **Status:** Phase 3. Both designs are locked and ported into a Next.js app: `/` (freelance landing) and `/portfolio`. See [`docs/06-progress.md`](docs/06-progress.md).

## Run it

```bash
npm install
npm run typecheck
npm run dev      # http://localhost:3000  (ask before running, per CLAUDE.md)
```

The locked designs live in `prototype/`. After editing one, regenerate the app's styles and markup with `python scripts/port_prototypes.py`.

## Where things live

| Path | What |
|---|---|
| [`docs/00-index.md`](docs/00-index.md) | Start here — map of every doc |
| [`docs/01-brief.md`](docs/01-brief.md) | Goal, audience, concept, success criteria |
| [`docs/02-content-inventory.md`](docs/02-content-inventory.md) | Every fact the site may claim, with its source |
| [`docs/03-architecture.md`](docs/03-architecture.md) | Stack, Firebase setup, data flow, performance budget |
| [`docs/04-design-system.md`](docs/04-design-system.md) | Color, type, spacing, motion, the kolam motif |
| [`docs/05-ui-pages.md`](docs/05-ui-pages.md) | Information architecture, page-by-page sections |
| [`docs/06-progress.md`](docs/06-progress.md) | Phases + checklist — the live tracker |
| [`docs/07-decisions.md`](docs/07-decisions.md) | Decision log |
| [`docs/08-open-questions.md`](docs/08-open-questions.md) | What's still undecided |
| [`docs/09-conventions.md`](docs/09-conventions.md) | Git workflow, commits, code style |
| [`design/tokens.json`](design/tokens.json) | Design tokens — single source of truth for color/type/spacing/motion |

## Branches

- `main` — what's live. Deploys to Firebase App Hosting once connected.
- `dev` — day-to-day work. Merge to `main` to release.
