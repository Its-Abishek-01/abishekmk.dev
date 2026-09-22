# 01 — Brief

## Goal
A portfolio that makes a hiring manager think *"this person runs production systems, not tutorials"* within 10 seconds — and then proves it with depth for anyone who keeps scrolling. `[confirmed: "so amazing", use every design skill]`

## Audience
1. **Recruiters / hiring managers** (skim, 30–90 s, often on a phone) → need role, strongest 3 proofs, contact.
2. **Engineers doing the technical screen** (read case studies, 5–15 min) → need architecture, trade-offs, real numbers, what went wrong.
3. **Freelance clients** `[assumed]` → need "what can he build for me" + contact.

## Who Abishek is (positioning)
Software Engineer who owns a local-search platform end to end: **Flutter apps, Node/MongoDB backend, React web + SEO, and the servers it runs on.** Built the Massclick mobile app from its first commit; authored ~67% of the main platform's commits since April 2026. Based in Tiruchirappalli, Tamil Nadu.

One-liner candidates `[open — pick one]`:
- "I build the app, the API, and the server it runs on."
- "Full-stack engineer. Mobile to metal."
- "I ship systems people search, tap and pay through."

## The big idea `[confirmed 2026-09-22, D-001]`

### "Search my work"
Abishek's core craft is a **search engine** (category intent, geo ranking, typo fallback). So the portfolio's hero *is* a search box. Type `mobile`, `seo`, `infra`, `search` or anything — results rank his real work, with a relevance reason, exactly like the engine he built. It's a demo, a navigation system and a résumé in one gesture. Suggested queries sit under the box so no one faces a blank field.

### The kolam grid (visual motif)
A **kolam** is the dot-grid line drawing made at the doorstep every morning across Tamil Nadu — dots (*pulli*) connected by one continuous line. It is also, exactly, what a system diagram is: nodes joined by flows. The site's background is a quiet pulli dot grid; when a case study explains an architecture, lines draw between the dots and the grid *becomes* the diagram. Roots and engineering in one image — nobody else's portfolio looks like this.

### Proof, not adjectives
Every claim carries its number and source (`33,096/33,096 objects migrated, 0 failed`). Metric chips link to the case study that earned them.

## Success criteria
- Mobile LCP < 2.0 s, CLS < 0.05, INP < 150 ms on a mid-range Android over 4G (he fixed LCP for a living — the site must pass its own test).
- Lighthouse ≥ 95 in all four categories.
- WCAG 2.2 AA; full keyboard use; `prefers-reduced-motion` respected everywhere.
- A recruiter can find role + contact + 3 proofs without scrolling past the second screen.
- Every number on the site traces to `02-content-inventory.md`.

## Out of scope (for v1)
Blog, CMS admin UI, multilingual (Tamil version is a nice v2 idea `[open]`).
