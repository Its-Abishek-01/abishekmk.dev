# 05 — UI & pages

`[assumed]` until the Phase 2 prototype is reviewed.

## Site map
```
/                 Home: the whole story in one scroll
/work/[slug]      Case studies (5–6 deep dives)
/lab              Side projects & experiments
/about            Longer story, education, timeline, résumé PDF
/contact          (also a section on home; this is the standalone version)
/resume.pdf       Always-current PDF résumé
```

## Home: section by section

### 1. Hero: "Search my work"
- Eyebrow: `SOFTWARE ENGINEER · MASSCLICK · TIRUCHIRAPPALLI`
- Display headline (Fraunces): the chosen one-liner (see brief).
- **Search box** (mono, large). Placeholder cycles through `try "flutter"`, `try "outage"`, `try "seo"`. Suggested chips sit below it: `mobile` `search engine` `infra` `performance` `payments`.
- Typing ranks case studies live. Each result row shows: title · a matched-term highlight · a *why it matched* note (e.g. `matched: stack=Flutter, 263 commits`) · a metric chip. This mimics the real engine's "category intent → text score" behavior.
- Empty query shows the top 3 proofs.
- Background: the kolam field with a faint marigold sunrise glow.
- Keyboard: `/` focuses search, `↑↓` moves between results, `Enter` opens one. The results list is an ARIA combobox.

### 2. Proof strip
Four large tabular metrics, each linking to its case study:
`1,294 commits` · `33,096 / 33,096 objects migrated` · `~90 s cutover downtime` · `7.8% → 89.3% geo coverage`.
They count up once on first view (skipped under reduced motion).

### 3. Selected work: 5–6 case-study cards
Proposed order `[open]`:
1. **Massclick Mobile**: built from the first commit to v2.1.1 (Flutter, Riverpod, EN+Tamil)
2. **Search & Geo**: the search engine and 18k-place location graph
3. **The Database Move**: MongoDB migration + backups + monitoring
4. **Fast on a ₹10k phone**: Core Web Vitals, SSR hero, the crawl trap
5. **36,187 files, zero lost**: S3 key restructure
6. **The day the IP vanished**: production incident write-up

Cards: device/diagram preview + title + one-line outcome + stack chips. On hover (desktop), the card's kolam mini-diagram draws itself.

### 4. "How I build": the system map
One large interactive kolam diagram of the Massclick platform: Flutter app · React web · Express API · MongoDB · Redis · S3 · Socket.IO · FCM · MSG91 · PhonePe · nginx/Docker · Grafana. Tap a node and it lights up its flows, with a one-line "what I did here" and a link to the relevant case study. **This is the signature moment.**

### 5. Stack
Grouped by where it runs (Device · Edge · Server · Data · Ops), not a logo wall. Each item shows *where it was used*, not a skill bar.

### 6. Timeline
2018 → now: school → B.Sc → M.Sc → Syuap (intern) → Digihope → Massclick. Drawn as a single continuous kolam line that loops around each milestone.

### 7. Lab (teaser)
Sound Detective, Watch Teardown 3D (+ others after the GitHub review). Links to `/lab`.

### 8. Contact
Short form (name, email, message) → Firestore through a server action, with App Check. Also: email, LinkedIn, GitHub, résumé download. Success state: a small kolam closes its loop.

### Global
- Header: logo mark (kolam) · Work · Lab · About · theme toggle · `⌘K`/`/` search trigger.
- Footer: "Built with Next.js on Firebase App Hosting. LCP __ s on this page," filled from real RUM data if we collect it `[open]`.
- Theme toggle: dark ↔ light, with a View Transitions circular reveal (falls back to a fade).

## Case study template (`/work/[slug]`)
1. Title + role + dates + stack chips + 3 headline metrics
2. **The problem** (with the real symptom: an alert, a slow page, a broken deploy)
3. **Constraints** (live traffic, no downtime, small team)
4. **Architecture**: kolam diagram that draws as you scroll
5. **What I did**: numbered decisions with trade-offs
6. **What went wrong**: honest; engineers trust this section most
7. **Result**: before/after numbers, with sources
8. Next / previous case study

## Responsive rules
- Mobile first. The design is done at 375 px, then 768, 1280 and 1600.
- The system map becomes a vertical, tappable list with a mini-diagram on mobile.
- Touch targets ≥ 44 px, and no hover-only information.
