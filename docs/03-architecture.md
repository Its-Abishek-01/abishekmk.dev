# 03 — Architecture

Stack and hosting `[confirmed 2026-09-22, D-002]`; details marked `[assumed]`/`[open]` below are still adjustable.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, React Server Components) + **TypeScript** (strict) | Static pages by default with server actions for the few dynamic bits. It's the same stack as Daybook, so there's nothing new to learn |
| Styling | **Tailwind CSS v4**, theme generated from `design/tokens.json` → CSS custom properties | One token source with no hardcoded values; dark/light via `[data-theme]` + `prefers-color-scheme` |
| Motion | **Motion** (`motion/react`) for UI; CSS scroll-driven animations where supported | Spring physics, interruptible gestures, layout animations |
| 3D / canvas | **Kolam grid in `<canvas>` 2D** (not WebGL) for the background; **react-three-fiber** only for one hero-level piece if it earns its bytes, lazy-loaded | The motif is thousands of dots. 2D canvas is cheap, and WebGL stays opt-in |
| Content | **MDX in the repo** (`content/work/*.mdx`) with frontmatter validated by **zod** at build | Case studies are long-form. Git history is the CMS, and a bad frontmatter field fails the build instead of shipping |
| Search (hero) | **Build-time index**: a small inverted index + synonym map generated from content frontmatter, scored client-side (term match × field weight × recency) | Mirrors the real Massclick engine design (category intent → text score). No server call, instant |
| Fonts | Self-hosted via `next/font` (see design system) | No layout shift; he did the same fix on Massclick |
| Images | `next/image` → AVIF/WebP; device screenshots pre-framed at build | LCP budget |
| OG images | `next/og` per page, generated from tokens | Every shared link looks designed |

## Hosting — Firebase (Blaze / paid) `[confirmed: paid Firebase]`

| Service | Use |
|---|---|
| **App Hosting** | Builds + serves the Next.js app from GitHub `main` (auto-rollout), with a CDN in front. Region `[open]`: Daybook uses asia-southeast1 |
| **Firestore** | `messages` (contact form) and `events` (first-party analytics, optional). No public read rules. Everything goes through server actions with the Admin SDK |
| **App Check** (reCAPTCHA Enterprise) | Blocks spam bots on the contact action |
| **Secret Manager** (via `apphosting.yaml`) | Any API tokens, e.g. a GitHub token for live stats |
| **Cloud Functions** (optional) | Firestore trigger on a new `messages` doc sends an email or push notification to Abishek `[open: email vs FCM to phone]` |
| **Firebase Analytics / GA4** | `[open]`: first-party events in Firestore vs GA4. First-party matches his Massclick work and keeps the site free of third-party cookies |

Firebase project: **new, dedicated** (e.g. `abishek-portfolio`), separate from Massclick's projects. Owner account `[confirmed]`: personal `abishek.mk.01@gmail.com` (D-007).

## Data flow

```
Browser ──GET──▶ App Hosting CDN ──miss──▶ Next.js (Cloud Run)
                                            ├─ static pages (prerendered at build)
                                            ├─ /api/og/*        (next/og)
                                            └─ server action: sendMessage()
                                                  ├─ App Check verify
                                                  ├─ zod validate + rate limit (per IP hash, Firestore counter)
                                                  └─ Firestore messages/{id} ──trigger──▶ Function ──▶ email / push
```

Optional live data: a **"live console"** section that shows current GitHub contribution counts through the GitHub GraphQL API. The data is fetched server-side, cached with ISR (revalidated every 6 h), and needs a token in Secret Manager.

## Folder layout (planned)

```
resume-its/
├─ app/                    routes (App Router)
│  ├─ (site)/page.tsx      home
│  ├─ work/[slug]/page.tsx case study
│  ├─ lab/page.tsx         side projects
│  ├─ about/page.tsx
│  └─ api/og/…             OG image routes
├─ components/
│  ├─ ui/                  primitives (Button, Chip, Card…) — tokens only
│  ├─ kolam/               grid canvas + diagram line system
│  ├─ search/              hero search, index loader, scorer
│  └─ sections/            page sections
├─ content/work/*.mdx      case studies (frontmatter: title, role, stack, metrics[], tags[], order)
├─ lib/                    content loader, search index builder, firebase-admin, analytics
├─ design/tokens.json      design tokens (source of truth)
├─ scripts/                build-time: tokens → CSS, search index, contrast check
├─ public/                 fonts (if not next/font), static media
├─ docs/                   this documentation
├─ apphosting.yaml         App Hosting runtime config + secrets refs
├─ firebase.json · firestore.rules · firestore.indexes.json
└─ .github/workflows/ci.yml  typecheck · lint · test · contrast check · build
```

## Quality gates (CI on every push to `dev` and PR to `main`)
- `tsc --noEmit`, ESLint, Prettier check
- Vitest unit tests: search scorer, content schema, token build
- `scripts/check-contrast` fails the build if any text-token pair drops below WCAG AA
- Lighthouse CI budget on the preview: LCP < 2.0 s, CLS < 0.05, TBT < 150 ms, JS (initial, gz) < 120 KB `[assumed budget]`

## Performance budget
| Metric | Budget |
|---|---|
| Initial JS (gzip) | ≤ 120 KB |
| Hero LCP element | Text (the name/headline), not an image. Fonts preloaded, `font-display: swap` with metric-matched fallback |
| Kolam canvas | Starts after first paint (`requestIdleCallback`), pauses when off-screen or tab hidden, static image under `prefers-reduced-motion` |
| Third-party scripts | 0 at load |
