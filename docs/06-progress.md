# 06 — Progress (live tracker)

**Last updated:** 2026-09-22 · **Current phase:** 2, design prototype (Phase 1 leftovers: one-liner, personal gh login, content answers)
Legend: `[ ]` not started · `[~]` in progress · `[x]` done · `[-]` dropped

## Phase 0: Workspace ✅
- [x] Folder `D:\dev_abishek\resume-its`, git repo, `main` + `dev` branches
- [x] README, CLAUDE.md, AGENTS.md, .gitignore, .gitattributes, .editorconfig
- [x] Docs skeleton 00–09 with first drafts
- [x] Draft design tokens (`design/tokens.json`), contrast computed for both themes
- [x] Content inventory seeded from Massclick repos, VPS docs and memory

## Phase 1: Content & concept sign-off
- [ ] Abishek answers `08-open-questions.md` (at least the 🔴 ones)
- [ ] Pick the one-liner
- [x] Approve concept: "Search my work" + kolam grid (D-001)
- [x] Approve stack & Firebase setup (D-002, D-007: personal Firebase account)
- [ ] Connect GitHub (Its-Abishek-01) → review other projects → update inventory
- [ ] Confirm the case-study list + order

## Phase 2: Design prototype (static HTML, no build)
- [ ] Hero + search interaction prototype
- [ ] Kolam grid: idle field + line-draw demo
- [ ] Type & color specimen page (both themes)
- [ ] One case-study card + one proof metric
- [ ] Abishek reviews on his phone and desktop → revise → sign off

## Phase 3: App scaffold & Firebase
- [ ] Next.js 16 + TS + Tailwind v4 + Motion scaffold (ask before installing)
- [ ] Token pipeline: `tokens.json` → CSS variables → Tailwind theme
- [ ] Contrast check script + CI workflow (typecheck, lint, test, build)
- [ ] Create Firebase project (Blaze), App Hosting backend, Firestore, App Check
- [ ] GitHub remote + App Hosting auto-rollout from `main`
- [ ] First deploy of a "coming soon" shell (verify HTTP 200)

## Phase 4: Home page
- [ ] Hero + search (index builder + scorer + combobox a11y)
- [ ] Proof strip
- [ ] Selected work cards
- [ ] System map (signature)
- [ ] Stack, timeline, lab teaser, contact (Firestore + App Check)

## Phase 5: Case studies
- [ ] MDX pipeline + zod frontmatter
- [ ] Write 5–6 case studies (draft → Abishek fact-check → publish)
- [ ] Kolam diagram component for architecture sections

## Phase 6: Polish
- [ ] Motion pass (springs, reduced motion)
- [ ] Accessibility audit (keyboard, screen reader, contrast)
- [ ] Performance budget met (Lighthouse CI)
- [ ] OG images, favicon/kolam mark, résumé PDF

## Phase 7: Launch
- [ ] Custom domain + SSL on App Hosting
- [ ] SEO: metadata, sitemap, JSON-LD `Person`
- [ ] Google Search Console
- [ ] Update LinkedIn / GitHub profile links

## Session log
| Date | What happened |
|---|---|
| 2026-09-22 | Public GitHub repos reviewed; gh still only has Massclick-App (personal login pending). Phase 2 prototype started. |
| 2026-09-22 | Concept, stack, Firebase owner (personal) and GitHub owner (Its-Abishek-01) accepted. |
| 2026-09-22 | Workspace set up (Phase 0). Concept, stack and design system drafted, all `[assumed]` pending review. |
