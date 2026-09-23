# 02 — Content inventory

**Rule:** the site may only claim what is listed here. Each item has a source and a status.
`[verified]` = read from repo/docs on 2026-09-22 · `[ask]` = needs Abishek to confirm before it ships · `[private]` = true but don't publish (client/internal detail).

Sources: `MC` = `D:\dev_abishek\massclick` (git + tracker docs) · `APP` = `massclick-mobile-app` · `VPS` = `D:\dev_abishek\vps` · `MEM` = Claude memory notes.

## Identity
| Item | Value | Status |
|---|---|---|
| Name | M.K. Abishek | verified (resume) |
| Email | abishek.mk.01@gmail.com | verified (resume) |
| Phone / WhatsApp | +91 93451 61419, shown on the landing page (call + WhatsApp) | confirmed 2026-09-22 |
| LinkedIn | linkedin.com/in/its-abishek-mk | verified (resume) |
| GitHub | github.com/Its-Abishek-01 | verified (resume) |
| Location | Tiruchirappalli, Tamil Nadu | verified |
| Current role | Software Engineer, Massclick | confirmed (chat 2026-09-22) — exact title/start month: ask |
| Languages | Profile README: "I know Japanese". Level? JLPT? | ask |
| Education | M.Sc — Bishop Heber College (2025, 8.6) · B.Sc — National College (2023, 8.4) | verified (resume) |

## Career timeline (corrected by Abishek 2026-09-22; months set by us, order confirmed)
| When | What | Status |
|---|---|---|
| 2018 / 2020 | SSLC (8.2) / HSC (7.6), Lakshmi Matric HSS, Manapparai; Student of the Year 2020 | verified (resume) |
| 2020 – 2023 | B.Sc, National College of Arts and Science, Tiruchirappalli (8.4); organised Naco Tech 2022 | verified (resume) |
| 2023 – 2025 | M.Sc, Bishop Heber College, Tiruchirappalli (8.6); 2nd prize, aptitude test | verified (resume) |
| Jan – Jun 2024 | **Intern, Syuap Tech Solution** (during the M.Sc), ~6 months: 3 months Flutter mobile, 3 months React. Agile sprints, shipped enhancements to deployed apps | confirmed (chat); months assumed |
| Apr 2025 – Mar 2026 | **Head of Mobile App Development, Digihope Technologies** (1 year). Led Flutter Android + iOS apps, architecture + state management, Play Console / App Store / TestFlight releases and compliance, crash-rate + performance work, worked with PHP/Express backend teams, mentored junior developers | confirmed (chat) + resume; months assumed |
| Apr 2026 – now | **Software Engineer, Massclick** | confirmed |

## Other projects (ownership confirmed 2026-09-22)
| Project | Stack | What | Status |
|---|---|---|---|
| VandiZone | Flutter, Firebase | **His own freelance project with a direct client (confirmed 2026-09-22), featured.** Two apps, Customer Booking + Captain/Owner. Real-time bookings (Realtime DB + Firestore), Google Maps live tracking and trip history, phone/email auth, FCM trip alerts | verified (resume) |
| Veezzo | Flutter, AWS | **Built at Digihope.** Food delivery: browse restaurants, order, live tracking. API Gateway + Lambda + S3, geolocation, payment gateway | verified (resume) |
| Vmark | React, Express, Node | **Built at Syuap** (the React half of the internship). Multi-user e-commerce: sellers register and manage products, auth, CRUD, REST | verified (resume) |
| COS OD | Flutter, Laravel | His own project (confirmed 2026-09-22). Class-wise attendance app, REST APIs | verified |

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
| **OTP abuse defense (SMS pumping)** | Attack on the OTP endpoint: **9,907 fraudulent SMS, ₹1,882**, 155 numbers, 48 fixed targets took 98%, in 4 waves over 21–23 Sep 2026 (figures reconciled against the provider's full export and the billing total — an earlier 56,775 count was a log-line miscount). Blocked at the edge within minutes of detection, then shipped: proxy-aware true client IP, per-number + global daily caps, verify lockout, legacy routes retired (410), a decoy honeypot with auto-trapping, and an admin control page. OTP restored same day; attacker still active and costing ₹0 | MEM otp_send_nginx_block | verified — **live** on /portfolio as `work/otp-abuse.js` (D-027, named as Massclick) |
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
| COS OD, Vmark, VandiZone, Veezzo | Older projects from resume. Not in public repos, so probably private or in company accounts | keep/trim: ask |
| yoo-music (node + php) | Personal music app, Jan 2025, small | verified (public repo) — low value, lab at most |
| Public repo audit 2026-09-22 | Public repos: Its-Abishek-01 (profile README), sound_detective, yoo-music-node/php, sample-site, web-lab-bhc, a DVRA clone, 2 forks (niloy-bhowmick, will-you-be-my-valentine) | verified via gh API |

## Do NOT use
- `portfolio/` (Hamish Williams' open-source repo), `skills/` (Emil Kowalski) — not Abishek's work.
- Customer names, phone numbers, DB hostnames/IPs, internal credentials — `[private]`.
- **OTP case study `[private]` specifics:** victim mobile numbers, attacker IPs/ASNs, the nginx/config snippets, exact cap values, and how the honeypot decides to trap. The attacker is still probing and reads the internet too. Publish the shape and the outcome, never the recipe.
