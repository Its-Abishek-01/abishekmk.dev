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
| Education | M.Sc Computer Science — Bishop Heber College (2025, 8.6) · B.Sc Computer Science — National College (2023, 8.4) | verified (resume); subject Computer Science for both confirmed 2026-09-23 |

## Career timeline (corrected by Abishek 2026-09-22; order confirmed. Months unconfirmed → years only everywhere public, 2026-09-23)
| When | What | Status |
|---|---|---|
| 2018 / 2020 | SSLC (8.2) / HSC (7.6), Lakshmi Matric HSS, Manapparai; Student of the Year 2020 | verified (resume) |
| 2020 – 2023 | B.Sc, National College of Arts and Science, Tiruchirappalli (8.4); organised Naco Tech 2022 | verified (resume) |
| 2023 – 2025 | M.Sc, Bishop Heber College, Tiruchirappalli (8.6); 2nd prize, aptitude test | verified (resume) |
| 2024 | **Intern, Syuap Tech Solution** (during the M.Sc), ~6 months: 3 months Flutter mobile, 3 months React. Agile sprints, shipped enhancements to deployed apps | confirmed (chat); months NOT confirmed (2026-09-23), so years only on the résumé and portfolio |
| 2025 – 2026 | **Head of Mobile App Development, Digihope Technologies** (1 year). Led Flutter Android + iOS apps, architecture + state management, Play Console / App Store / TestFlight releases and compliance, crash-rate + performance work, worked with PHP/Express backend teams, mentored junior developers | confirmed (chat) + resume; months NOT confirmed (2026-09-23), so years only on the résumé and portfolio |
| 2026 – now | **Software Engineer, Massclick** (first commit 2026-04-01) | confirmed; shown as a year for consistency |

## Other projects (ownership confirmed 2026-09-22)
| Project | Stack | What | Status |
|---|---|---|---|
| VandiZone | Flutter, Firebase | **His own freelance project with a direct client (confirmed 2026-09-22), featured.** Two apps, Customer Booking + Captain/Owner. Real-time bookings (Realtime DB + Firestore), Google Maps live tracking and trip history, phone/email auth, FCM trip alerts. **This row is the old, thin description. The real product is far bigger — see "VandiZone — the platform" below.** | verified (resume), understated |
| Veezzo | Flutter, AWS | **Built at Digihope.** Food delivery: browse restaurants, order, live tracking. API Gateway + Lambda + S3, geolocation, payment gateway | verified (resume) |
| Vmark | React, Express, Node | **Built at Syuap** (the React half of the internship). Multi-user e-commerce: sellers register and manage products, auth, CRUD, REST | verified (resume) |
| COS OD | Flutter, Laravel | His own project (confirmed 2026-09-22). Class-wise attendance app, REST APIs | verified |

## VandiZone — the platform (source: Caller Handbook v1.0, 26 Oct 2026)

`VZ-HB` = *Vandizone · Caller Handbook*, Edition 1.0, 26 Oct 2026, given by Abishek. It documents the live product as of that date:
**Customer app 2.0.14 · VZ Captain app 2.1.20 · office console and website**. It is marked *Internal training document*, so publish the
**shape** of the system, never rupee figures, percentages, internal thresholds, or the client's own staff material.

**[ask] Which surfaces are Abishek's build?** The résumé claims only the two Flutter apps. The handbook describes a four-surface
platform (customer app, captain app, admin console, public website). Nothing below moves onto the site until he says which parts he
wrote and in what stack. Every row is *verified about the product*, `[ask]` about authorship.

| Area | What exists | Status |
|---|---|---|
| Surfaces | Customer app (Android) · VZ Captain app, one app with Captain and Owner sides · office console at `/admin` · public website | verified VZ-HB — who built each: ask |
| Scale markers | Customer app v2.0.14, Captain app v2.1.20 (26 Oct 2026); 3 categories live (Loaders, Trucks, Cranes), 6 more behind a "Coming soon" switch | verified VZ-HB |
| Roles | Customer (Individual or Business + GSTIN), Captain, Owner, Owner-operator (both roles on one account), Office staff with per-permission access | verified VZ-HB |
| Identifier scheme | VB booking · VC customer · VD captain · VO owner · VV vehicle · VZ-SEAL-… seals · VZ-INV-… invoices (series restarts each April) | verified VZ-HB |
| Dispatch / matching | A job is offered only to captains who are on duty, verified, on the right model, within a set radius of where they went on duty, and whose machine fits: payload, body type (open/closed/container), hazardous certification, flatbed length, crane lift weight and height. "Now" searches immediately, scheduled searches about an hour before, and times out with no charge if nobody accepts. Office staff can hand-pick a captain, with the booking held while they choose | verified VZ-HB |
| Proof-of-work chain | Jobs run as gated stages: GPS arrival, 4-digit customer work codes to start and finish, only one code live at a time, compulsory completion photo. Trucks add loaded weight, weighbridge slip photo, e-way bill photo and number, a platform-issued seal number, and a separate receiver code at delivery. Pause/resume with paused time unbilled, delay reporting with a reason, an out-of-range weight challenge, office stage-advance when a yard has no signal, and office correction of a wrong weight on a running job | verified VZ-HB |
| Live tracking | The captain's phone posts its position throughout the job even when the app is closed or the screen is locked, at least every 30 seconds while parked; a "no signal" flag when nothing arrives; an office live map over every running job plus route replay; and a shareable public tracking page that refreshes every 15 seconds with phone numbers and amounts stripped out | verified VZ-HB |
| Chat and calling | In-app chat and calling between the customer and the captain who took the job, from acceptance until two hours after it ends, then read-only; the office can read a booking's thread for disputes; the captain never sees the customer's number | verified VZ-HB |
| Pricing engine (machines) | Hourly with a one-hour minimum then 15-minute blocks, flat up and down charges, a per-km charge beyond the covered round trip, a full-day discount past 8 hours, and a per-model minimum-charge floor. The booking shows an estimate; the final bill is recomputed from the real hours and the machine's real journey. The whole rate card, the per-machine question set, surcharges and a calculator live in the console, and office bookings can use a phone-agreed rate within a capped discount | verified VZ-HB — every rupee value in the handbook is an example, do not publish |
| Pricing engine (trucks) | A reverse auction: the customer picks the unit (per trip, ton, bag or day) and names a rate against a suggested market rate, with a hard floor below which the booking is refused. Captains accept or counter; counter-offers are blind to each other and listed to the customer cheapest-first. The customer can raise their rate a limited number of times, notifying every captain holding the offer. No distance component — the named rate is the whole freight | verified VZ-HB |
| Settlement edge cases | A halt charge when a truck is held too long, accepted or rejected by the customer; a shortage deduction reported by the customer and disputable by the captain or owner; cash advances recorded mid-job and netted off the bill. The bill stays locked while any of these is undecided, and the console has a "needs a decision" queue | verified VZ-HB |
| Payments | Razorpay (UPI, cards, net banking) with server-side verification before a booking reads as paid; a platform wallet with a minimum balance to book; cash with captain confirmation; Razorpay payment links over SMS/WhatsApp for customers with no app; business accounts online-only by default so every B2B payment has a clean record | verified VZ-HB |
| Tax and invoicing | GST charged only to GSTIN customers, split CGST+SGST for an in-state GSTIN and a single IGST line otherwise; a tax invoice per completed booking and a commission invoice to the owner; invoices immutable, so a wrong one is cancelled and reissued; GST and revenue reports in the console | verified VZ-HB |
| Commission and payouts | Commission set per machine category, plus GST on it, taken out of the fare; the owner's earnings land in an owner wallet. On cash jobs the captain holds the money, so the commission is pulled from the wallet instead and can run it negative, clearing on the next top-up. Withdrawals go to a bank account on file, reviewed and marked paid by a person; the owner pays their own captains | verified VZ-HB |
| Cancellation policy engine | Tiered fees that differ for "now" and scheduled bookings, computed on the pre-tax price, and **frozen onto each booking at confirmation** so a later rate-card change cannot rewrite history. Free while still searching, free when the captain, owner or office cancels, free on timeout. A cash booking's fee can be collected, carried as owed against the next top-up, or written off by a manager. Refunds are credited to the wallet, not back to the card | verified VZ-HB |
| Verification back-office | Queues for captains (licence and validity, machine types), owners (identity, business, bank) and machines (RC, make/model/year, insurance and fitness expiry, capability figures). Approve or reject with a reason the applicant sees in the app; edit-details fixes typos and notifies the person; a machine can be moved to the correct model without losing its verification. Expired insurance or fitness silently drops a machine out of dispatch, with reminders before it lapses. No Aadhaar is collected or stored | verified VZ-HB |
| Load board | A public board on the website, a post-a-load form with one-step phone sign-up, and an office approve/reject queue. On approval the load becomes a real booking broadcast to matching trucks in the pickup district or near their duty point, with owners alerted too. Loads expire and can be withdrawn by the customer; the public board shows only towns, truck, load and date | verified VZ-HB |
| Fleet management | The owner registers machines with their papers, photo and capability figures, invites captains by their VD code (a captain belongs to one fleet at a time), and sets a duty chart of who may drive what; an owner can add a captain profile to drive their own machine. A fleet board shows every captain on-job, idle or off-duty on a map, and flags one who forgot to go off duty | verified VZ-HB |
| Captain reliability tooling | Job offers ring on the alarm channel so Silent and Vibrate don't mute them, and show on the lock screen. A built-in **job alert check** fires a test offer, then audits alarm volume, Do Not Disturb, the job-offer notification channel, battery saver, background restriction, location permission and the push connection, each with a one-tap fix; the home screen warns while anything is red | verified VZ-HB |
| Office console | Around twenty modules: Dashboard, Vehicles catalogue with the Coming-soon switch, Fleet, Bookings with a drawer for money, settlement, work pipeline, photos, tracking link, route trail, chat and bill items, New booking (phone bookings with a live bill preview), Loads to verify, Customers, Live map, Verification, Withdrawals, Account requests, Refunds, Invoices, Commission invoices, GST report, Reports, Job notes, Consignment notes, Pricing, Website content, Notifications (push now or scheduled) and Settings. Per-staff permissions gate booking, captain choice and load approval | verified VZ-HB |
| Remote control of the live apps | Categories opened, rates changed, dispatch radius and timeouts tuned, support contacts, booking limits and tax rules all change from the console with no app release; the console can also force an update screen or put the apps into maintenance mode | verified VZ-HB |
| Public website | `/` · `/book` for an instant quote without the app · `/captain` browser sign-up · `/verify`, a public check of a vehicle, captain or booking code that shows only safe details · `/loads` · `/loads/post` · `/t/…` live share page · `/terms` · `/privacy` · `/account-deletion` · `/admin` | verified VZ-HB |
| Trust and compliance posture | OTP-only sign-in with a terms consent tick and a stated "we never ask for your OTP" rule; work codes never shown to the captain; public tracking and the public board strip PII and amounts; a grievance officer with a 24-hour acknowledgement and 15-day resolution; account closure requests handled in the console | verified VZ-HB |

**[private] Do not publish from VZ-HB:** any rupee amount, percentage or threshold (rates, commission, cancellation tiers, the wallet
minimum, the rate floor, the dispatch radius and the timeouts are all examples that change from the console), the client's staff
scripts and escalation contacts, and anything identifying the client's own customers or captains.

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
