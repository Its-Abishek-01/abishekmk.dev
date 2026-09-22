# 02 — Content inventory

**Rule:** the site may only claim what is listed here. Each item has a source and a status.
`[verified]` = read from repo/docs on 2026-09-22 · `[ask]` = needs Abishek to confirm before it ships · `[private]` = true but don't publish (client/internal detail).

Sources: `MC` = `D:\dev_abishek\massclick` (git + tracker docs) · `APP` = `massclick-mobile-app` · `VPS` = `D:\dev_abishek\vps` · `MEM` = Claude memory notes.

## Identity
| Item | Value | Status |
|---|---|---|
| Name | M.K. Abishek | verified (resume) |
| Email | abishek.mk.01@gmail.com | verified (resume) |
| Phone | 9345161419 — show on site? | ask |
| LinkedIn | linkedin.com/in/its-abishek-mk | verified (resume) |
| GitHub | github.com/Its-Abishek-01 | verified (resume) |
| Location | Tiruchirappalli, Tamil Nadu | verified |
| Current role | Software Engineer, Massclick | confirmed (chat 2026-09-22) — exact title/start month: ask |
| Education | M.Sc — Bishop Heber College (2025, 8.6) · B.Sc — National College (2023, 8.4) | verified (resume) |

## Massclick — scale & ownership
| Claim | Number | Source | Status |
|---|---|---|---|
| Commits authored, main platform | 1,294 of 1,926 (~67%) | MC git log | verified |
| Commits authored, mobile app | 263 of 264; started it 2026-04-01 | APP git log | verified |
| Mobile app version | 2.1.1 (build 20), Android + iOS, EN + Tamil | APP pubspec | verified |
| Master locations | ~18,300 (district→zone→ward→locality) | MC SEARCH_GEO_PROGRESS | verified |
| Linked businesses | ~11,000 | MC SEARCH_GEO_PROGRESS | verified |
| Sitemap URLs | 24,000+ | MEM crawl-trap note | verified |
| Play Store downloads / rating | — | — | ask |

## Case-study proofs
| Case | Proof point | Source | Status |
|---|---|---|---|
| **S3 key restructure** | 36,187 objects / 1.77 GB audited; 33,096/33,096 copied, 0 failed, nothing deleted; 51 call sites migrated behind a lint gate; plan/verify/resume/rollback tooling | MC S3_KEY_RESTRUCTURE_PROGRESS | verified |
| **MongoDB migration** | Moved all DBs to a dedicated server; prod cutover ~90 s downtime; nightly backups + pull-based off-box copy verified by SHA-256; monitoring repointed | VPS massclick-mongodb.md | verified |
| **Search & geo** | Trichy locality coordinates 7.8%→89.3%, wards 12.8%→71.6%, zones 33%→100%; category intent + `$text` + distance ranking + nearby-pincode/district fallback | MC SEARCH_GEO_PROGRESS, MEM search note | verified |
| **Core Web Vitals** | Business-detail bundle 173→92 KB (brotli); server-rendered hero so mobile LCP paints before JS | MEM LCP note, commit 4cd1db67e / 4b1ac95d8 | verified — final field LCP result: ask (Search Console lags ~28 days) |
| **Crawl-trap fix** | ~120–198k junk Googlebot requests/day pinning DB CPU; fixed generator + 410s; non-410 4xx 6–7% → ~0.1% | MEM crawl-trap note | verified |
| **Production incident** | Provider routing outage → moved app server to new IP, DNS/SPF/CI/firewall updated, full incident log | VPS incidents/2026-09-15 | verified — publish level of detail: ask |
| **Web→mobile parity** | 20-feature audit, P0/P1/P2 gap report, ~25 items shipped (chat, events, feed, knowledge hub, marketing materials…) | APP docs/web-parity | verified |
| **Lead pipeline** | Save-first lead capture, alerts over WhatsApp/FCM/WebSocket decoupled; premium-first dispatch | MEM leads note, MC commits | verified |
| **APK assets** | Image weight −58.5% (WebP) | APP commit | verified |
| **Duplicate detection** | 41 true duplicates found among ~11,400 listings (name+category+fuzzy address) | MEM duplicates note | verified |
| **Certificates** | Server-rendered certificates with QR verification, auto-issued on payment | MC CERTIFICATE_SYSTEM_HANDOFF | verified |
| **Payments** | PhonePe gateway; Pay2All BBPS bill fetch + recharge | MC commits (Sep 2026) | verified |
| **Summit decks** | python-pptx generators (34 + 25 slides) with automated layout/contrast/copy checks | MEM mc-event notes | verified |
| **Daybook** | Agency reports app — Next.js 16, Firebase App Hosting, Firestore, roles, tests + CI | expense-tracker repo | verified — private internal tool: describe, no screenshots? ask |
| Zero-downtime deploys | Diagnosed 4 root causes, designed rolling restart + symlink swap | VPS zero-downtime-deploy-plan | verified as *designed*; shipped? ask |

## Side projects
| Project | What | Status |
|---|---|---|
| Sound Detective | Flutter Android app + native background collectors; explains mystery phone sounds with confidence score | verified (repo) — published? ask |
| Watch teardown 3D | Scroll-scrubbed Three.js exploded view of a watch movement | verified (repo) |
| COS OD, Vmark, VandiZone, Veezzo | Older projects from resume | keep/trim: ask |

## Do NOT use
- `portfolio/` (Hamish Williams' open-source repo), `skills/` (Emil Kowalski) — not Abishek's work.
- Customer names, phone numbers, DB hostnames/IPs, internal credentials — `[private]`.
