# 09 — Conventions

## Git
- **Branches:** `dev` (work) → merge to `main` (live). Short-lived feature branches off `dev` (`feat/hero-search`) are fine for big pieces.
- **Commits:** Conventional Commits, imperative, ≤ 72 characters in the subject.
  `feat(search): rank results by field weight` · `fix(kolam): pause canvas when tab hidden` · `docs: record D-002 decision` · `chore(ci): add contrast check`
  Types: `feat` `fix` `perf` `refactor` `style` `docs` `test` `chore` `ci` `content`.
- **Scopes:** `search` `kolam` `ui` `sections` `work` `content` `tokens` `firebase` `ci` `seo` `a11y`.
- One logical change per commit, with docs updated in the same commit when behavior changes.
- **Never commit:** `.env*`, service-account JSON, Firebase debug logs. `.gitignore` covers these, but check `git status` anyway.
- On Windows, write multi-line commit messages to a file and use `git commit -F <file>`, because PowerShell here-strings get mangled.

## Code
- TypeScript `strict`. No `any` unless it's commented with why.
- Components: one per file, PascalCase, colocated `*.module.css` only if Tailwind can't express it.
- **Tokens only.** No raw hex, px font sizes or ms durations in components. Import from the generated token CSS variables / Tailwind theme.
- Server-only code (`firebase-admin`, secrets) lives in `lib/server/` and imports `server-only`.
- Accessibility is part of "done": keyboard path, visible focus (marigold ring), labels, and reduced-motion behavior.

## Content
- Case studies go in `content/work/<slug>.mdx`. Frontmatter is validated by zod, so a build fails on bad data.
- Every metric in frontmatter carries a `source` field that points to a row in `docs/02-content-inventory.md`.

## Docs ritual (after each finished step)
1. Tick it in `06-progress.md` and add a session-log line.
2. Record any decision in `07-decisions.md`.
3. Move answered questions out of `08-open-questions.md`.
