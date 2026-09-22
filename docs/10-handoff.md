# 10 — Handoff (read this in any new session, with any agent)

Everything a fresh agent (Claude, Codex, anything) needs to continue this project without the chat history.
It copies the knowledge that used to live only in Claude's local memory on Abishek's PC. **Keep it up to date:**
when something here changes, edit this file in the same commit.

Read order: `CLAUDE.md` → **this file** → `docs/06-progress.md` (live state) → `docs/07-decisions.md` (why) → the doc your task touches.

---

## 1. Who and what

- **Abishek M K** (they/them in docs unless told otherwise), Software Engineer at Massclick, Tiruchirappalli (Trichy), Tamil Nadu.
  Email abishek.mk.01@gmail.com · WhatsApp/call **+91 93451 61419** (confirmed for public use) · LinkedIn `its-abishek-mk` · GitHub `Its-Abishek-01`.
- This repo is **two sites in one Next.js app**:
  - `/` = **freelance landing page** for non-technical clients (SEO-first, "the face of my freelancing"). Design LOCKED = `prototype/landing-v02.html` (tag `v0.2-landing-locked`).
  - `/portfolio` = **developer portfolio** ("the portfolio is a repository", files that hot-reload). Design LOCKED = `prototype/v05-repo.html` (tag `v0.5-portfolio-locked`).
- Locked means: content fixes only, unless Abishek explicitly reopens the design.

## 2. Career facts (confirmed by Abishek; months were set by us, order is confirmed)

| When | What |
|---|---|
| 2018 / 2020 | SSLC / HSC, Lakshmi Matric HSS, Manapparai; Student of the Year 2020 |
| 2020–2023 | B.Sc, National College of Arts and Science, Trichy (GPA 8.4) |
| 2023–2025 | M.Sc, Bishop Heber College, Trichy (GPA 8.6) |
| Jan–Jun 2024 | Intern, **Syuap Tech Solution**, 6 months during M.Sc: 3 months Flutter mobile, 3 months React. Built **Vmark** there |
| Apr 2025–Mar 2026 | **Head of Mobile App Development, Digihope Technologies** (1 year). Built **Veezzo** there |
| Apr 2026–now | **Software Engineer, Massclick** (first app commit 2026-04-01) |
| ongoing | **VandiZone**: his OWN freelance project with a direct client. Feature it prominently |
| — | **COS OD**: his own project (Flutter + Laravel attendance app) |

**Never make the site Massclick-only.** Every number shown must be in `docs/02-content-inventory.md` with a source (no fabrication).

## 3. Live infrastructure

| Thing | Value |
|---|---|
| GitHub | **private** `https://github.com/Its-Abishek-01/abishekmk.dev`, branches `dev` (work) and `main` (live) |
| Firebase project | `abishekmk-dev` (owner **abishek.mk.01@gmail.com**, Blaze plan) |
| App Hosting | backend `abishekmk`, region asia-southeast1, **auto-rollout from GitHub `main`** |
| Live URL | https://abishekmk--abishekmk-dev.asia-southeast1.hosted.app |
| Firestore | `(default)`, asia-south1, production mode, rules = deny all client access (deployed) |
| Enquiries | `/api/enquiry` → Firestore `enquiries` → Telegram alert to Abishek's phone (verified working) |
| Secrets | App Hosting secrets `telegram-bot-token`, `telegram-chat-id` (values never in git, never seen by Claude) |
| Domain | **not bought yet**. The code still says `abishekmk.dev` (layout.tsx, sitemap.ts, robots.ts, JSON-LD, footer text). Change all of them when a domain is chosen |

### Access quirks (important)
- **GitHub pushes:** Abishek's own Command Prompt has `gh` logged in as **Its-Abishek-01**. Claude's shell on this PC only sees **Massclick-App**, so Claude can't fetch or push this private repo. **Abishek pushes** (`git push origin dev main`). The repo has a local credential helper `!gh auth git-credential`.
- **Firebase CLI** has two accounts (admin@massclick.in is active by default). For this project always add `--project abishekmk-dev --account abishek.mk.01@gmail.com`.
- A rollout builds **GitHub `main`**, not the local tree. If the live site looks old, check that Abishek's push actually reached `main`.
- If `apphosting.yaml` references a secret, the secret must exist and the backend must have access **before** pushing, or the rollout fails.

## 4. How Abishek likes to work (standing rules)

- **No browser/preview tools, ever** (Browser pane, Chrome, screenshots). He checks visuals himself.
- **Ask before** `npm run build` / `npm run dev` / `npm start`, pushing, creating cloud resources, or deploying.
- **Report progress in short, plain sentences** while working. He can't see tool output.
- Ask decisions as quick multiple-choice questions. He answers fast.
- For design, he wants **original, ambitious, best-in-class** work, not minimal patches, but he also said piling up per-section requests made designs worse. Keep **one coherent idea** per page.
- Credentials: never ask him to paste tokens or passwords into chat; he sets secrets himself via the CLI.

## 5. Design history (so nobody repeats rejected ideas)

- **Rejected:** the kolam motif and "follow one line down the page" scrolling; hover-reactive backgrounds (feel dated); green cutting-mat background; repeated chapter-over-chapter stacking; the departure-board concept; v0.4 (too close to the Kamal reference's section order).
- **Reference he loves:** `D:\dev_abishek\kamal-portfolio\index.html`, a video-editor portfolio (not his) with GSAP + ScrollTrigger + Lenis polish. Match its polish, **not** its structure.
- Prototype trail: `prototype/index.html` (v0.1→v0.2), `prototype/concepts/*`, `v03-dev.html`, `v04-dev.html`, `v05-repo.html` (locked), `landing-v01.html`, `landing-v02.html` (locked).

## 6. How the app is built

- Next.js 16 App Router + TypeScript. **Scoped plain CSS generated from the locked prototypes**: `python scripts/port_prototypes.py` writes `app/landing.css` (`.lp`), `app/portfolio/portfolio.css` (`.pf`), `lib/landing/markup.ts`, `lib/portfolio/shell.ts`. Edit the prototype, then re-run the script; never hand-edit generated files.
- Interactions: `components/landing/LandingBehaviors.tsx`, `components/portfolio/PortfolioBehaviors.tsx` (GSAP + ScrollTrigger + Lenis from npm).
- Portfolio content is typed in `lib/portfolio/content.ts`.
- Checks: `npm run typecheck` (free to run); `npm run build` (ask first).

## 7. Open threads

1. **Domain name.** Abishek doesn't want his name in it and asked for a catchy, brand-new brand name at low cost (~₹200 first year). Checked free on 2026-09-22 via registry RDAP (404 = unregistered):
   - Tamil-rooted: **sirpix.in** (sirpi = sculptor + pixel; our top pick), **minnix.in** (minnal = lightning), velichamlabs.in / sudarlabs.in / thulilabs.in (also free as .com)
   - Short global: **quivo.in**, shipyo.in, appsody.in, mirlo.in, tapsmith.in
   - Earlier ideas he passed on: abishekmk.in/.dev, buildwithabi.in, trichydev.in, appkaaran.in
   - Price reality: .in first year about ₹1–149 with offers (often needs a multi-year purchase), renewal about ₹899/yr. .xyz/.online look cheap but renew at ₹2,000+.
   - Before buying: Google the name for existing Indian businesses. **After buying:** switch the code's domain, then App Hosting → Settings → Domains → add it, then DNS records at the registrar.
   - If he picks a brand name, the landing page can show "Brand · by Abishek M K".
2. After the domain: Google Search Console + sitemap submit + Google Business Profile ("App & Website Developer in Trichy").
3. Two TEST enquiries in Firestore `enquiries` can be deleted.
4. Old open questions still in `docs/08-open-questions.md` (testimonial from the VandiZone client, Tamil version, etc.).
