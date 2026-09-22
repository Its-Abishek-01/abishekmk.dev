# Working rules for this repo (Claude / Codex / any AI session)

1. **Read `docs/06-progress.md` first**, every session. It is the live state. Then read only the docs the task touches.
2. **Docs are the source of truth**, not chat history. When a decision is made, record it in `docs/07-decisions.md`; when something is finished, tick it in `docs/06-progress.md` — before moving to the next step.
3. **Status tags** in docs: `[confirmed]` (Abishek said so), `[assumed]` (reasonable default, not yet confirmed), `[open]` (needs an answer — also listed in `08-open-questions.md`).
4. **No fabrication.** Every number or claim on the site must exist in `docs/02-content-inventory.md` with a source. If it isn't there, it doesn't ship. Recruiters check.
5. **Design tokens live in `design/tokens.json`.** Never hardcode a color, font size, radius or duration in a component — use the token.
6. **Tooling rules (Abishek's standing preferences):**
   - Never use browser/preview tools (Browser pane, Chrome, `preview_start`, screenshots). Abishek checks visuals himself.
   - Ask before `npm run build`, `npm run dev`, `npm start` or any dev server.
   - Ask before pushing to a remote, creating Firebase resources, or deploying.
7. **Report progress in short plain sentences** as you work — Abishek can't see tool output.
8. **Git:** work on `dev`, conventional commits (see `docs/09-conventions.md`), never commit secrets (`.env*`, service-account JSON).
