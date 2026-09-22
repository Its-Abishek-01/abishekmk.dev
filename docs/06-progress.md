# 06 — Progress (live tracker)

**Last updated:** 2026-09-22 · **Current phase:** 3, live on the hosted.app URL; next: domain, rules deploy, enquiry notifications. Built from (both designs locked: landing v0.2 at `/`, portfolio v0.5 at `/portfolio`)
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
- [x] Concept round reviewed (D-011)
- [x] v0.2 combined prototype · https://claude.ai/artifact/RgafAPhexXDiuHBdwnPQXn (git tag v0.2-prototype)
- [x] v0.3 developer edition · https://claude.ai/artifact/CyqsnZmoNFDeY2vdJWMzKN (look liked; structure too busy)
- [x] v0.4 clean redesign · https://claude.ai/artifact/SJ1TzEEhUKgxoQvhN4ov21 (too close to Kamal's flow)
- [x] **v0.5 repo + hot reload: LOCKED as the portfolio** · https://claude.ai/artifact/HMPJkuYxGdeJu3R7C16TCb (tag v0.5-portfolio-locked)

## Phase 2b: Freelance landing page (D-016)
- [x] Answer landing questions (D-017)
- [x] Landing v0.1 · https://claude.ai/artifact/6QzRnhdinBUJFbpef5ZF2X (reviewed: wanted more space + Apple-like)
- [x] **Landing v0.2 LOCKED** · https://claude.ai/artifact/Kidn8byNzUV6bgom8eiPR9 (tag v0.2-landing-locked)
- [ ] SEO plan: keywords, metadata, JSON-LD, sitemap, Google Business Profile
  - 01 Teardown · https://claude.ai/artifact/2dVCMpLHm3qcTkCLs6By8G
  - 02 Powers of Ten · https://claude.ai/artifact/ALUb5gs3rJyNAUZ7F6h3Rf
  - 03 Cinematic chapters · https://claude.ai/artifact/NPHxd4yztNzmE2gbrSBzav
  - 04 Departure board · https://claude.ai/artifact/MuFXNjCB2Aess78jyehMVa

## Phase 3: App scaffold & Firebase
- [x] Next.js 16 + TypeScript app (`app/`), deps installed (next, react 19, gsap, lenis, zod, firebase-admin)
- [x] Locked designs ported with zero drift: `/` = landing v0.2, `/portfolio` = portfolio v0.5 (D-022)
- [x] SEO basics: metadata, canonical, JSON-LD (ProfessionalService + FAQPage, Person), sitemap.xml, robots.txt
- [x] `/api/enquiry` → Firestore (zod validation, per-IP rate limit)
- [x] Typecheck passes (`npm run typecheck`)
- [x] First production build passes (`npm run build`): `/`, `/portfolio`, sitemap, robots all static; `/api/enquiry` dynamic
- [x] Abishek signed in: gh as Its-Abishek-01 (in his own Command Prompt), `firebase login:add` abishek.mk.01@gmail.com
- [x] GitHub repo created (private): https://github.com/Its-Abishek-01/abishekmk.dev, `dev` + `main` pushed
- [x] Firebase project created: `abishekmk-dev` (owner abishek.mk.01@gmail.com)
- [x] Firebase config in repo: `.firebaserc`, `firebase.json`, `firestore.rules` (deny all client access), indexes
- [x] Blaze billing enabled (Abishek)
- [x] Firestore (default) created, production mode (Abishek)
- [x] App Hosting backend `abishekmk` (asia-southeast1), auto-rollout from `main`: **LIVE** https://abishekmk--abishekmk-dev.asia-southeast1.hosted.app
- [x] Live checks 2026-09-22: `/`, `/portfolio`, sitemap, robots = 200; `/api/enquiry` saves to Firestore (one labelled TEST doc, safe to delete)
- [x] Firestore rules deployed 2026-09-22 (deny all client access); public REST read of `enquiries` returns 403
- [ ] Buy abishekmk.dev (Abishek; RDAP 404 on 2026-09-22 = looked unregistered) → add custom domain in App Hosting → DNS records → HTTPS
- [x] Enquiry alerts to Abishek's phone via Telegram bot (`lib/server/telegram.ts`, secrets `telegram-bot-token` / `telegram-chat-id` in apphosting.yaml)
- [x] Bot created, secrets set + access granted, `15486a1` live
- [x] Live test 2026-09-22: `{"ok":true,"saved":true,"alerted":true}`: saved to Firestore and sent to Telegram

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
| 2026-09-22 | Telegram enquiry alerts live and verified (saved + alerted). Two TEST enquiries in Firestore are safe to delete. |
| 2026-09-22 | SITE LIVE on App Hosting (asia-southeast1). Enquiry → Firestore verified. Domain not bought yet. |
| 2026-09-22 | Firebase project abishekmk-dev created; Firestore creation waits on the API being enabled in the console. Config files committed. |
| 2026-09-22 | Repo Its-Abishek-01/abishekmk.dev created (private), dev + main pushed. Repo-local git credential helper = `gh auth git-credential`. |
| 2026-09-22 | Phase 3 started: Next.js app scaffolded, both locked designs ported, SEO + enquiry API added, typecheck green (D-021, D-022). |
| 2026-09-22 | Landing v0.2 LOCKED, WhatsApp number confirmed (D-020). Starting Phase 3. |
| 2026-09-22 | Landing v0.2: Apple-like product page, VandiZone + Massclick as past projects (D-019). |
| 2026-09-22 | Landing v0.1 built and published (D-017, D-018). |
| 2026-09-22 | Portfolio LOCKED at v0.5 (D-015). Next: freelance landing page with SEO (D-016). |
| 2026-09-22 | v0.5: new developer-native flow, portfolio as a repository with hot reload (D-014). |
| 2026-09-22 | v0.4 clean redesign (D-013): old section requests dropped, one coherent developer structure. |
| 2026-09-22 | v0.2 tagged. Reviewed kamal-portfolio (reference he likes). Built v0.3 developer edition with GSAP + Lenis (D-012). |
| 2026-09-22 | Concept review → v0.2 built from the liked parts (D-011) and published at the v0.1 link. VandiZone and COS OD confirmed as his own; VandiZone featured. |
| 2026-09-22 | Career corrected by Abishek (Syuap intern 6 mo during M.Sc → Digihope 1 yr → Massclick Apr 2026). All 4 concepts now show Digihope, Syuap, VandiZone, Veezzo, Vmark, COS OD, not only Massclick. Republished (v2). |
| 2026-09-22 | Kolam idea dropped (D-010). Four concept sketches built in prototype/concepts/, each with its own palette and type. |
| 2026-09-22 | Prototype v0.1 published (scroll-first per D-009). Palette/type revised to "Threshold" + Anek (D-003r). Awaiting review. |
| 2026-09-22 | Public GitHub repos reviewed; gh still only has Massclick-App (personal login pending). Phase 2 prototype started. |
| 2026-09-22 | Concept, stack, Firebase owner (personal) and GitHub owner (Its-Abishek-01) accepted. |
| 2026-09-22 | Workspace set up (Phase 0). Concept, stack and design system drafted, all `[assumed]` pending review. |
