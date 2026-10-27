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

## 2. Career facts (confirmed by Abishek; order confirmed. Months are NOT confirmed, so everything public shows years only, 2026-09-23)

| When | What |
|---|---|
| 2018 / 2020 | SSLC / HSC, Lakshmi Matric HSS, Manapparai; Student of the Year 2020 |
| 2020–2023 | B.Sc Computer Science, National College of Arts and Science, Trichy (GPA 8.4) |
| 2023–2025 | M.Sc Computer Science, Bishop Heber College, Trichy (GPA 8.6) |
| 2024 | Intern, **Syuap Tech Solution**, 6 months during M.Sc: 3 months Flutter mobile, 3 months React. Built **Vmark** there |
| 2025–2026 | **Head of Mobile App Development, Digihope Technologies** (1 year). Built **Veezzo** there |
| 2026–now | **Software Engineer, Massclick** (first app commit 2026-04-01; shown as a year for consistency) |
| ongoing | **VandiZone**: his OWN freelance project with a direct client. Feature it prominently. **Not just two apps** — confirmed 2026-10-27 (D-031) as a solo-built marketplace for hiring JCBs, cranes and goods trucks: the customer app, the VZ Captain app (driver + fleet-owner sides), a ~20-module office console at `/admin` and the public website, all on Firebase with Cloud Functions. Full feature list = the *VandiZone — the platform* section of `docs/02-content-inventory.md`, taken from his Caller Handbook v1.0. **Name the product, publish no rupee figures, percentages or thresholds** — the handbook is internal and says every figure in it is an example |
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
| Secrets | App Hosting secrets `telegram-bot-token`, `telegram-chat-id`, `telegram-webhook-secret` (values never in git) |
| Live visits + chat | Every visit → one self-updating Telegram message (Firestore `live_sessions`, `live_tgmap`). Abishek replies in Telegram → card on the visitor's page (`/api/live/poll`), visitor replies → `/api/live/say` → Telegram. `/live` in the bot lists who is online. Webhook registered via `/api/telegram/setup?key=<webhook secret>`. Abishek's own devices opt out with `?me=1` (undo `?me=0`) |
| Domain | **not bought yet**. Interim domain **`abishek.wiozen.in`** (subdomain Abishek already controls) is now hardcoded everywhere instead of the old placeholder `abishekmk.dev` (D-026): `app/layout.tsx` `SITE_URL`, `app/sitemap.ts`, `app/robots.ts`, `app/portfolio/page.tsx` JSON-LD `url`, footer/nav text (`scripts/port_prototypes.py` line ~125 → regenerates `lib/landing/markup.ts`; `lib/portfolio/content.ts`), `lib/server/telegram.ts` alert label. Google Search Console verification meta tag is set in `app/layout.tsx` `metadata.verification.google`. Swap all of these again once a real domain is bought (D-021 shortlist below) |

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
- **Cover letter** (D-033): `resume/abishek-mk-cover-letter.html` (+ `-color.html`), one page, the résumé letterhead. It is a TEMPLATE: the company, the role and the “why them” paragraph are `.slot` spans with a printing tint, so an unfilled one is obvious. Keep it one page — the slot paragraph grows when he fills it, and there is only about 6 mm spare.
- **CV** (D-032): a separate, full-length document in the same two editions — `resume/abishek-mk-cv.html` and `resume/abishek-mk-cv-color.html`, 3 A4 pages each. It is the long form the résumés have no room for, so new material goes here first. Its margins live in `@page` (so every page is padded) and the on-screen bar reports a page count, not a fit check; the navy edition is single-column by design. Render it exactly like the résumés with headless Edge.
- **Résumé** (D-028 plain/ATS, D-030 navy themed): two editions share the same facts, so change both. Themed edition = `resume/abishek-mk-resume-color.html` (deep navy, two columns; its fit bar also stores column bottoms in `#fit[data-cols]`, main/side, keep them level). He rejected a multi-colour version as "like a webpage": keep résumés to ONE theme colour, no tiles/chips/pills/icons. **As of 2026-10-27 (D-031) both sheets are full:** Massclick runs 5 bullets (not 7) and VandiZone carries a scope line plus 3 bullets, and the leading and section spacing were tightened to hold one page (plain 3 mm spare, navy 5 mm spare with columns level at 292/292). Anything new now has to displace something. Edit `resume/abishek-mk-resume.html` (claims from the inventory only), then re-render the PDF with headless Edge using a throwaway `--user-data-dir` (Edge ignores `--print-to-pdf` if it's already open without one): `msedge --headless=new --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf=resume/Abishek-MK-Resume.pdf file:///…/resume/abishek-mk-resume.html`. Check it's 1 page (pypdf) and that the on-page fit bar (`--dump-dom`, `#fit`) says it fits. Abishek approved headless Edge for this only; it's not a screenshot/preview tool.

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
