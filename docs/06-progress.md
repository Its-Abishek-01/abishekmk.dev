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
- [x] Hero + search interaction prototype (v0.1)
- [x] Kolam grid: idle field + line-draw demo + scroll spine (v0.1)
- [x] Type & color specimen (both themes, width slider, spring demo) (v0.1)
- [x] Six case-study cards + proof strip + pinned system-map story + journey (v0.1)
- [x] v0.1 (kolam) reviewed. Execution liked, idea rejected (D-010)
- [~] Concept round: 4 sketches published, Abishek picks one (or a mix) → build it out → sign off
  - 01 Teardown · https://claude.ai/artifact/2dVCMpLHm3qcTkCLs6By8G
  - 02 Powers of Ten · https://claude.ai/artifact/ALUb5gs3rJyNAUZ7F6h3Rf
  - 03 Cinematic chapters · https://claude.ai/artifact/NPHxd4yztNzmE2gbrSBzav
  - 04 Departure board · https://claude.ai/artifact/MuFXNjCB2Aess78jyehMVa

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
| 2026-09-22 | Career corrected by Abishek (Syuap intern 6 mo during M.Sc → Digihope 1 yr → Massclick Apr 2026). All 4 concepts now show Digihope, Syuap, VandiZone, Veezzo, Vmark, COS OD, not only Massclick. Republished (v2). |
| 2026-09-22 | Kolam idea dropped (D-010). Four concept sketches built in prototype/concepts/, each with its own palette and type. |
| 2026-09-22 | Prototype v0.1 published (scroll-first per D-009). Palette/type revised to "Threshold" + Anek (D-003r). Awaiting review. |
| 2026-09-22 | Public GitHub repos reviewed; gh still only has Massclick-App (personal login pending). Phase 2 prototype started. |
| 2026-09-22 | Concept, stack, Firebase owner (personal) and GitHub owner (Its-Abishek-01) accepted. |
| 2026-09-22 | Workspace set up (Phase 0). Concept, stack and design system drafted, all `[assumed]` pending review. |
