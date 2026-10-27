// Portfolio content + server-side renderers, ported from the LOCKED prototype (prototype/v05-repo.html).
// Every claim here must exist in docs/02-content-inventory.md (D-004).

export type Ext = 'md' | 'dart' | 'js' | 'jsx' | 'sh' | 'log' | 'json' | 'yml';

export interface RepoFile {
  id: string;
  path: string;
  ext: Ext;
  dir?: string;
  star?: boolean;
  cmd: string;
  tags: string[];
  ds: string;
  src: string;
  view: () => string;
}

/** What the browser needs for tabs, terminal and "go to file" (no source/markup). */
export type FileMeta = Pick<RepoFile, 'id' | 'path' | 'ext' | 'dir' | 'cmd' | 'tags' | 'ds'>;

export const LANG: Record<Ext, string> = {
  md: 'Markdown', dart: 'Dart', js: 'JavaScript', jsx: 'JavaScript React', sh: 'Shell Script', log: 'Log', json: 'JSON', yml: 'YAML',
};

const esc = (s: string): string =>
  String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);

interface ProjOpts {
  feat?: boolean; meta: string; badge?: string; title: string; sum: string; points: string[]; mv: string; ml: string; chips: string[];
}

function proj(o: ProjOpts): string {
  return '<div class="proj' + (o.feat ? ' feat' : '') + '"><div class="meta rv"><span>' + esc(o.meta) + '</span>' + (o.badge ? '<span class="badge">' + esc(o.badge) + '</span>' : '') + '</div><h2 class="rv">' + esc(o.title) + '</h2><p class="sum rv">' + esc(o.sum) + '</p><ul class="points">' + o.points.map(p => '<li class="rv">' + esc(p) + '</li>').join('') + '</ul><div class="chips rv">' + o.chips.map(c => '<span class="chip">' + esc(c) + '</span>').join('') + '</div><div class="metric rv"><b>' + esc(o.mv) + '</b><span>' + esc(o.ml) + '</span></div></div>';
}

function logView(): string {
  const L = [
    { c: 'head', br: 'HEAD → massclick', w: '2026 – now', t: 'Massclick', r: 'Software Engineer', p: 'A local-search platform for Tamil Nadu. The Flutter app, the Node and MongoDB API, the React web and its SEO, and the servers underneath.', s: [] as string[][] },
    { c: 'fl', br: 'freelance/vandizone', w: 'ongoing', t: 'VandiZone', r: 'Freelance · my own client', p: 'A marketplace for hiring JCBs, cranes and goods trucks. Two Flutter apps, the office console and the public website — the whole platform is mine.', s: [] },
    { c: '', br: 'digihope', w: '2025 – 2026', t: 'Digihope Technologies', r: 'Head of Mobile App Development · 1 year', p: 'Led the Flutter apps for Android and iOS: architecture, state management, every Play Console, App Store and TestFlight release. Cut crash rates and mentored junior developers.', s: [['Veezzo', 'food delivery on AWS Lambda + S3']] },
    { c: '', br: 'syuap', w: '2024', t: 'Syuap Tech Solution', r: 'Intern · 6 months, during my M.Sc', p: 'Three months building Flutter mobile apps, then three months on React, in Agile sprints on live apps.', s: [['Vmark', 'multi-seller e-commerce, React + Express']] },
    { c: '', br: 'msc', w: '2023 – 2025', t: 'M.Sc, Bishop Heber College', r: 'Tiruchirappalli · GPA 8.6', p: 'Second prize in an aptitude test competition.', s: [] },
    { c: '', br: 'bsc', w: '2020 – 2023', t: 'B.Sc, National College', r: 'Tiruchirappalli · GPA 8.4', p: 'Organised Naco Tech 2022 and coordinated its Python quiz.', s: [['COS OD', 'my own attendance app, Flutter + Laravel']] },
  ];
  return '<div class="log">' + L.map(e => '<article class="entry ' + e.c + ' rv"><div class="ref"><span class="br">' + esc(e.br) + '</span><span>' + esc(e.w) + '</span></div><h3>' + esc(e.t) + '</h3><div class="role">' + esc(e.r) + '</div><p>' + esc(e.p) + '</p>' + (e.s.length ? '<div class="ship">' + e.s.map(x => '<span><b>' + esc(x[0]) + '</b> · ' + esc(x[1]) + '</span>').join('') + '</div>' : '') + '</article>').join('') + '</div>';
}

function stackView(): string {
  const G: [string, string[][]][] = [
    ['mobile', [['Flutter', 'Android · iOS', '#54C5F8', '#0B2A3A', 'Fl'], ['Dart', 'language', '#54C5F8', '#0F2230', 'Dt'], ['Riverpod', 'state', '#9FE7F5', '#10262C', 'Rp']]],
    ['web', [['React', 'Massclick web · Vmark', '#61DAFB', '#0B2330', 'Re'], ['Next.js', 'this site · Daybook', '#fff', '#111', 'Nx']]],
    ['backend', [['Node.js', 'Massclick API', '#8CC84B', '#15260E', 'No'], ['Express', 'REST + SSR', '#ddd', '#1b1b1b', 'Ex'], ['MongoDB', 'search, geo', '#6CC24A', '#10240F', 'Mg'], ['Redis', 'cache', '#FF6B5B', '#2B0F0C', 'Rd'], ['Socket.IO', 'live leads, chat', '#fff', '#1d1d1d', 'Io']]],
    ['cloud', [['Firebase', 'VandiZone, Daybook', '#FFCA28', '#2D2206', 'Fb'], ['AWS', 'S3 · Lambda', '#FF9900', '#2A1B05', 'Aw'], ['Docker', 'API replicas', '#4BA3F2', '#0B1E30', 'Dk'], ['nginx', 'edge', '#3CC47C', '#0C2217', 'Ng'], ['GitHub Actions', 'CI/CD', '#8BB6FF', '#0E1728', 'GA']]],
    ['watch', [['Grafana', 'alerts', '#F68A3B', '#2B1606', 'Gf'], ['Prometheus', 'metrics', '#E6522C', '#2B0F08', 'Pr']]],
    ['also', [['Laravel', 'COS OD', '#FF5A4E', '#2B0E0C', 'Lv'], ['Python', 'deck generators', '#FFD43B', '#1B2433', 'Py']]],
  ];
  return '<div class="groups">' + G.map(([g, l]) => '<div class="group rv"><h3>"' + g + '"</h3><div class="tools">' + l.map(t => '<div class="tool"><span class="lg" style="background:' + t[3] + ';color:' + t[2] + '">' + t[4] + '</span><div><b>' + esc(t[0]) + '</b><small>' + esc(t[1]) + '</small></div></div>').join('') + '</div></div>').join('') + '</div>';
}

function shipView(): string {
  const J = [['brief', 'What it does, who uses it, what "done" means.'], ['build', 'Small commits you can see every day.'], ['test', 'On real devices and real data.'], ['ship', 'Play Store, App Store or a server, with a rollback ready.'], ['watch', 'Alerts, crash reports and fixes after launch.']];
  return '<div class="run rv"><div class="rhd"><span><b>how-i-ship</b> · on: your-idea</span><span class="res" id="runRes">queued</span></div><div class="jobs">' + J.map((j, i) => '<div class="job" data-i="' + i + '"><span class="dot"></span><div><h3>' + j[0] + '</h3><p>' + esc(j[1]) + '</p></div><span class="t">—</span></div>').join('') + '</div></div>';
}

const WA = 'https://wa.me/919345161419?text=' + encodeURIComponent("Hi Abishek, I saw your portfolio and I'd like to talk.");

export const FILES: RepoFile[] = [
  {
    id: 'readme', path: 'README.md', ext: 'md', cmd: 'cat README.md', tags: ['about', 'hello', 'abishek', 'readme', 'hire'], ds: 'Who I am, in one screen',
    src: `# M.K. Abishek
> Software Engineer · Massclick · Tiruchirappalli

I build the **app**, the **API**, and the **server** it runs on.

![commits](1,557) ![s3](33,096/33,096) ![cutover](~90s)

- Flutter · Node.js · MongoDB · React · AWS
- Syuap → Digihope → Massclick, plus VandiZone
- open to work: full-time or freelance`,
    view: () => `<div class="readme"><p class="hello rv">// hello, world</p><h1 class="rv">M.K. <em>Abishek</em></h1><p class="tag rv">I build the <b>app</b>, the <b>API</b>, and the <b>server</b> it runs on.</p><p class="who rv">Software engineer in Tiruchirappalli. I interned at Syuap, led mobile at Digihope for a year, build the whole VandiZone marketplace for my own client, and since April 2026 work on every layer of Massclick.</p><div class="shields rv"><span class="shield"><span>commits</span><b>1,557</b></span><span class="shield" style="--c:#F2A93B"><span>s3 re-key</span><b>33,096 / 33,096</b></span><span class="shield" style="--c:#7FB8FF"><span>db cutover</span><b>~90 s</b></span><span class="shield" style="--c:#B39DFF"><span>app</span><b>v2.1.1</b></span><span class="shield"><span>geo coverage</span><b>89.3%</b></span></div><div class="ctas rv"><a class="cta pri" href="#f-vandizone" data-go="vandizone">See the work ↓</a><button class="cta" type="button" data-pal>Go to file ⌘K</button><a class="cta" href="#f-contact" data-go="contact">Contact</a><a class="cta" href="/">Hire me for a project →</a></div><p class="avail rv"><i></i>Open to work · full-time or freelance</p></div>`,
  },
  {
    id: 'vandizone', path: 'work/vandizone.dart', ext: 'dart', dir: 'work', star: true, cmd: 'flutter run work/vandizone.dart', tags: ['vandizone', 'freelance', 'client', 'flutter', 'firebase', 'maps', 'mobile', 'realtime', 'marketplace', 'dispatch', 'payments', 'razorpay', 'gst', 'console', 'logistics', 'jcb', 'crane', 'truck'], ds: 'A whole marketplace, built solo · Flutter + Firebase',
    src: `// VandiZone · my own client · Flutter + Firebase + Cloud Functions
// (a sketch of the idea, not production code)

// a job is only ever offered to a captain who can really do it
final shortlist = (await captains
        .where('onDuty', isEqualTo: true)
        .where('verified', isEqualTo: true)
        .where('model', isEqualTo: booking.model)
        .get())
    .where((c) => c.within(booking.site, radiusKm))
    .where((c) => c.machine.fits(booking.load)) // tons · body · ft · lift
    .where((c) => c.papersValid(today));        // insurance · fitness

// then it rings on the alarm channel, and work only starts
// when the customer reads out a 4-digit code the captain never sees.`,
    view: () => proj({ feat: true, meta: 'Freelance · Flutter + Firebase + Cloud Functions', badge: 'My own client project', title: 'VandiZone', sum: 'A marketplace for hiring JCBs, cranes and goods trucks. I build the whole thing on my own: the customer app, the captain and owner app, the office console the business is run from, and the public website.', points: ['A dispatch engine that offers a job only to drivers who are on duty, verified and in range, and whose machine actually fits the load — payload, body type, trailer length, crane lift and height', 'Work proved rather than trusted: gated stages unlocked by GPS, 4-digit codes only the customer can see, completion photos, weighbridge slips and e-way bills', 'Two pricing engines — hourly billing recomputed from the real worked time, and a blind counter-offer auction where the customer names a rate and drivers bid against it', 'Razorpay, wallets, commission and owner payouts, GST invoicing split CGST/SGST or IGST, and cancellation terms frozen onto each booking so a later rate change can never rewrite an old one', 'An office console of around twenty modules that opens categories, retunes dispatch and forces app updates without shipping a release'], mv: '4 surfaces', ml: 'two apps, a console and the website — all mine', chips: ['Flutter', 'Firebase', 'Cloud Functions', 'Firestore', 'Google Maps', 'Razorpay'] }),
  },
  {
    id: 'mobile', path: 'work/massclick_app.dart', ext: 'dart', dir: 'work', cmd: 'flutter run work/massclick_app.dart', tags: ['massclick', 'mobile', 'flutter', 'riverpod', 'android', 'ios', 'app'], ds: 'Massclick app · built from the first commit',
    src: `// Massclick app · v2.1.1 · Android + iOS · EN + த

final leads = ref.watch(leadsProvider);        // Riverpod

socket.on('lead:analytics:update', (_) {
  ref.invalidate(leadsProvider);               // live lead alerts
});

// OTP auto-fill · App Links · FCM lead channel`,
    view: () => proj({ meta: 'Massclick · Mobile', title: 'Massclick App', sum: 'I built the Massclick Flutter app from its very first commit to v2.1.1 on Android and iOS, in English and Tamil.', points: ['Riverpod state, go_router navigation, cached feeds that refresh in the background', 'A map with a draggable results sheet, a leads dashboard and the Spotlight feed', 'Web-to-mobile parity audit: ~25 fixes and features shipped from 20 features checked'], mv: '263 / 264', ml: 'commits in the app repo are mine', chips: ['Flutter', 'Riverpod', 'go_router', 'Socket.IO', 'FCM'] }),
  },
  {
    id: 'search', path: 'work/search.js', ext: 'js', dir: 'work', cmd: 'node work/search.js --city trichy', tags: ['search', 'geo', 'backend', 'node', 'mongodb', 'location', 'engine'], ds: 'Search engine over ~18,000 places',
    src: `// Search & Geo · Massclick API

const category = resolveCategoryIntent(term); // intent first

const results = await Business.aggregate([
  { $match: { $text: { $search: term }, ...near(city) } },
  { $sort: { distance: 1, score: -1 } },
]);

// too few results? widen to nearby pincodes, then the district`,
    view: () => proj({ meta: 'Massclick · Backend', title: 'Search & Geo', sum: 'The search engine behind every Massclick query: category intent, text score and distance ranking over a location graph of about 18,000 places.', points: ['Category-intent resolution before full-text search', 'Distance ranking from the searched place, with nearby-pincode and district fallbacks', 'Coordinates recovered and matched across the Trichy location graph'], mv: '7.8 → 89.3%', ml: 'Trichy localities with coordinates', chips: ['Node.js', 'MongoDB', 'Redis'] }),
  },
  {
    id: 'db', path: 'work/mongo-move.sh', ext: 'sh', dir: 'work', cmd: 'sh work/mongo-move.sh', tags: ['database', 'mongodb', 'infra', 'migration', 'devops', 'backup'], ds: 'MongoDB moved to its own server',
    src: `# The Database Move · production cutover

node db-backups/backup.js --label pre-cutover --prod

# stop both app replicas together, final sync, repoint the URL
docker compose up -d --no-deps

# nightly dumps on the new box, pulled off-box at 03:30
# verified byte-for-byte with sha256sum`,
    view: () => proj({ meta: 'Massclick · Infra', title: 'The Database Move', sum: 'I moved every Massclick database onto a dedicated MongoDB server, then set up backups and monitoring that followed it there.', points: ['Snapshots with checksums before every change, and a tested restore path', 'Nightly backups, plus an off-box copy pulled by the app server', 'Monitoring and exporters repointed so the dashboards measure the real database'], mv: '~90 s', ml: 'of production downtime at cutover', chips: ['MongoDB', 'Linux', 'Docker', 'Prometheus', 'Grafana'] }),
  },
  {
    id: 's3', path: 'work/s3-rekey.js', ext: 'js', dir: 'work', cmd: 'node work/s3-rekey.js copy --commit', tags: ['s3', 'aws', 'cloud', 'migration', 'storage', 'backend'], ds: '36,187 files re-keyed, zero lost',
    src: `// 36,187 files, zero lost · AWS S3

await plan();                  // every object mapped to an owner
await copy({ commit: true });  // 33,096 / 33,096 · failed = 0
await verifyS3();              // sizes match, old keys still there

// lintS3Paths.js: 51 call sites migrated, 0 hardcoded URLs left`,
    view: () => proj({ meta: 'Massclick · Cloud', title: '36,187 Files, Zero Lost', sum: 'I re-keyed every object in the Massclick S3 bucket to a clean, owner-based structure, with the database updated to match.', points: ['Plan, copy, verify, resume and rollback commands, all dry-run first', 'A lint gate so no code can write to the old paths again', 'Nothing deleted: old keys kept until the new ones were verified'], mv: '33,096 / 33,096', ml: 'objects copied, 0 failed', chips: ['AWS S3', 'Node.js', 'MongoDB'] }),
  },
  {
    id: 'perf', path: 'work/mobile-lcp.jsx', ext: 'jsx', dir: 'work', cmd: 'npx lighthouse /business --mobile', tags: ['performance', 'web', 'react', 'seo', 'lcp', 'frontend', 'speed'], ds: 'Business pages fast on budget phones',
    src: `// Fast on a budget phone · React + Express SSR

const AddBusinessModal = lazy(() => import('./AddBusinessModal'));
const ShareSheet       = lazy(() => import('./ShareSheet'));

// the server paints the hero before React boots
res.send(businessRouteShell(business));  // LCP before JS`,
    view: () => proj({ meta: 'Massclick · Web', title: 'Fast on a Budget Phone', sum: 'Search Console flagged mobile business pages as slow. I measured why, then made the hero appear before any JavaScript runs.', points: ['Server-rendered business hero with a preloaded photo', 'Login popup and share sheet load only when someone needs them', 'Nearly halved the business-page JavaScript bundle'], mv: '173 → 92 KB', ml: 'business-page bundle, brotli', chips: ['React', 'Express SSR', 'Core Web Vitals'] }),
  },
  {
    id: 'crawl', path: 'work/crawl-trap.js', ext: 'js', dir: 'work', cmd: 'curl -sI massclick.in/20trichy20…', tags: ['seo', 'crawl', 'incident', 'infra', 'monitoring', 'googlebot'], ds: 'Googlebot junk URLs stopped',
    src: `// The crawl trap · Express SSR middleware

if (isJunkPath(req.path)) {
  return res.status(410).end();   // Gone, for good
}

// emitted links now pass through slugify, every $regex is escaped
// alert rule rewritten so 410s no longer page anyone`,
    view: () => proj({ meta: 'Massclick · Ops', title: 'The Crawl Trap', sum: 'Googlebot was generating ever-longer junk URLs from one bad link, and the database CPU alert kept firing. I found the generator and closed it.', points: ['Fixed the URL generator and escaped every regex built from a path', 'Junk and unknown-category URLs now return 410 Gone', 'Rewrote the Grafana error-rate rule, which had a logic bug hiding real errors'], mv: '6–7% → ~0.1%', ml: 'non-410 client error rate', chips: ['Express', 'Grafana', 'Search Console'] }),
  },
  {
    id: 'otp', path: 'work/otp-abuse.js', ext: 'js', dir: 'work', cmd: 'node work/otp-abuse.js --report', tags: ['security', 'otp', 'abuse', 'fraud', 'sms', 'incident', 'rate limit', 'honeypot', 'nginx', 'backend'], ds: 'An SMS pump, stopped',
    src: `// SMS pumping · Massclick sign-in

// 1. stop the bleeding at the edge (backup first, rollback ready)
// 2. know who is really calling
const ip = clientIp(req);          // proxy-aware, right to left

// 3. caps per number and per day, plus a verify lockout
if (await abuseGuard.blocks(ip, mobile)) {
  return decoy(res);               // looks sent. nothing sent.
}

await sendOtp(mobile);             // real people only`,
    view: () => proj({ meta: 'Massclick · Security', title: 'The SMS Pump', sum: 'Someone was firing sign-in codes at our login endpoint to farm the SMS payout, and every message was billed to us. I cut it off, then rebuilt the defence so the attack pays nothing.', points: ['Blocked at the edge within minutes of detection, with the config backed up and the rollback ready', 'Rebuilt the defence: true client IP behind the proxy, caps per number and per day, a lockout after repeated failures, and the old unused routes retired', 'Attack traffic now meets a decoy that answers like success and sends no SMS; real sign-ins were back on the same day', 'Reconciled the provider’s full export against the bill to get the real figures, correcting a first count that read six times too high'], mv: '₹1,882 → ₹0', ml: 'what the attack costs us now', chips: ['nginx', 'Node.js', 'Express', 'Rate limiting', 'Incident response'] }),
  },
  {
    id: 'experience', path: 'experience.log', ext: 'log', cmd: 'git log --oneline --decorate', tags: ['experience', 'career', 'job', 'digihope', 'syuap', 'massclick', 'education', 'veezzo', 'vmark', 'cosod', 'lead', 'intern'], ds: 'Career, newest first',
    src: `* (HEAD -> massclick) Software Engineer · 2026 – now
* (freelance/vandizone) my own client · ongoing
* (digihope) Head of Mobile · 2025 – 2026
|   shipped: Veezzo
* (syuap) Intern, Flutter then React · 2024
|   shipped: Vmark
* (msc) M.Sc, Bishop Heber College · 2023 – 2025
* (bsc) B.Sc, National College · 2020 – 2023
    shipped: COS OD`,
    view: logView,
  },
  {
    id: 'stack', path: 'stack.json', ext: 'json', cmd: 'cat stack.json | jq', tags: ['stack', 'skills', 'tools', 'flutter', 'node', 'react', 'aws', 'firebase', 'docker'], ds: 'What I reach for',
    src: `{
  "mobile":  ["Flutter", "Dart", "Riverpod"],
  "web":     ["React", "Next.js"],
  "backend": ["Node.js", "Express", "MongoDB", "Redis", "Socket.IO"],
  "cloud":   ["Firebase", "AWS", "Docker", "nginx", "GitHub Actions"],
  "watch":   ["Grafana", "Prometheus"],
  "also":    ["Laravel", "Python"]
}`,
    view: stackView,
  },
  {
    id: 'ship', path: 'ship.yml', ext: 'yml', cmd: 'gh workflow run ship.yml', tags: ['process', 'pipeline', 'ship', 'ci', 'how', 'work'], ds: 'How I work with you',
    src: `name: how-i-ship
on: [your-idea]

jobs:
  brief:  { run: "what it does, who uses it, what done means" }
  build:  { needs: brief, run: "small commits you can see daily" }
  test:   { needs: build, run: "real devices, real data" }
  ship:   { needs: test,  run: "stores or servers, rollback ready" }
  watch:  { needs: ship,  run: "alerts, crash reports, fixes" }`,
    view: shipView,
  },
  {
    id: 'contact', path: 'contact.sh', ext: 'sh', cmd: './contact.sh', tags: ['contact', 'email', 'hire', 'linkedin', 'github', 'freelance', 'whatsapp'], ds: 'Send me a brief',
    src: `#!/usr/bin/env bash
# say hello · I reply within a day

./contact.sh \\
  --to    "abishek.mk.01@gmail.com" \\
  --type  "mobile app" \\
  --about "what you're building"`,
    view: () => `<div class="contact"><h2 class="rv">Got an idea? <em>Let's ship it.</em></h2><p class="lead rv">An app, an API, a platform that has to stay up, or a full-time role. Tell me what you're building.</p><form class="brief rv" id="brief" novalidate><div class="row"><label for="fName">--name<input id="fName" name="name" required placeholder="Priya R" autocomplete="name"></label><label for="fContact">--reply-to<input id="fContact" name="contact" required placeholder="you@company.com"></label></div><label>--type<span class="radios" role="group" aria-label="Project type"><label><input type="radio" name="type" value="Mobile app" checked><span>Mobile app</span></label><label><input type="radio" name="type" value="Web app"><span>Web app</span></label><label><input type="radio" name="type" value="Backend / API"><span>Backend / API</span></label><label><input type="radio" name="type" value="Full product"><span>Full product</span></label><label><input type="radio" name="type" value="Full-time role"><span>Full-time role</span></label></span></label><label for="fMsg">--about<textarea id="fMsg" name="msg" placeholder="What it does, who uses it, and when you need it"></textarea></label><div><button class="cta pri" type="submit">Run ./contact.sh ↵</button></div></form><div class="links rv"><a class="cta" href="${WA}" target="_blank" rel="noopener">WhatsApp</a><a class="cta" href="mailto:abishek.mk.01@gmail.com">Email</a><a class="cta" href="https://www.linkedin.com/in/its-abishek-mk" target="_blank" rel="noopener">LinkedIn ↗</a><a class="cta" href="https://github.com/Its-Abishek-01" target="_blank" rel="noopener">GitHub ↗</a><a class="cta" href="/">abishek.wiozen.in →</a></div><p class="eof">-- EOF · abishek.wiozen.in · built with Next.js on Firebase App Hosting</p></div>`,
  },
];

/* ---------- tiny syntax highlighter (server-side) ---------- */
const KW: Record<Ext, string> = {
  dart: 'final|var|const|await|async|return|if|else|new|void|class',
  js: 'const|let|await|async|return|if|else|new|import|export|from|function',
  jsx: 'const|let|await|async|return|if|else|new|import|export|from|function|lazy',
  sh: 'node|docker|compose|up|sh|curl|export',
  json: '', yml: 'name|on|jobs|needs|run', md: '', log: '',
};
const OPEN = '\u0000', CLOSE = '\u0001';

function hlLine(line: string, ext: Ext): string {
  let h = esc(line);
  if (ext === 'md') {
    if (/^#/.test(line)) return '<span class="tk-h">' + h + '</span>';
    if (/^&gt;/.test(h)) return '<span class="tk-c">' + h + '</span>';
    return h.replace(/\*\*(.+?)\*\*/g, '<span class="tk-n">**$1**</span>').replace(/!\[(.+?)\]\((.+?)\)/g, '<span class="tk-p">![$1]</span><span class="tk-s">($2)</span>').replace(/^- /, '<span class="tk-k">- </span>');
  }
  if (ext === 'log') return h.replace(/\((.+?)\)/, '<span class="tk-n">($1)</span>').replace(/^([*|])/, '<span class="tk-p">$1</span>');
  if (ext === 'sh' && /^#!/.test(line)) return '<span class="tk-c">' + h + '</span>';
  const cm = (ext === 'sh' || ext === 'yml') ? /(#.*)$/ : /(\/\/.*)$/;
  let comment = '';
  const m = h.match(cm);
  if (m && m.index !== undefined) { comment = '<span class="tk-c">' + m[1] + '</span>'; h = h.slice(0, m.index); }
  h = h.replace(/(&quot;.*?&quot;|'[^']*'|`[^`]*`)/g, OPEN + '$1' + CLOSE);
  h = h.split(new RegExp('(' + OPEN + '.*?' + CLOSE + ')')).map(p => {
    if (p.startsWith(OPEN)) return '<span class="tk-s">' + p.slice(1, -1) + '</span>';
    let q = p.replace(/\b(\d[\d,.]*)\b/g, '<span class="tk-n">$1</span>');
    if (KW[ext]) q = q.replace(new RegExp('\\b(' + KW[ext] + ')\\b', 'g'), '<span class="tk-k">$1</span>');
    q = q.replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="tk-f">$1</span>');
    q = q.replace(/(\$\w+)/g, '<span class="tk-p">$1</span>');
    return q;
  }).join('');
  return h + comment;
}

const icon = (ext: Ext) => '<span class="ic ' + ext + '">' + ext.slice(0, 2).toUpperCase() + '</span>';

/** All files, fully rendered, for the <main> editor area. */
export function renderMain(): string {
  return FILES.map(f => {
    const lines = f.src.split('\n');
    const name = f.path.split('/').pop() as string;
    return '<section class="file" id="f-' + f.id + '" data-id="' + f.id + '" data-show="view" aria-label="' + esc(f.path) + '">' +
      '<div class="fhead">' + icon(f.ext) + '<span class="path">' + esc(f.path.includes('/') ? f.path.split('/')[0] + ' / ' : '') + '<b>' + esc(name) + '</b></span><span class="lang">' + LANG[f.ext] + '</span>' +
      '<span class="seg" role="group" aria-label="View"><button type="button" data-v="view" aria-pressed="true">Preview</button><button type="button" data-v="src" aria-pressed="false">Source</button></span><span class="state">● source</span></div>' +
      '<div class="pane"><div class="src"><div class="bar"><span>' + esc(f.path) + '</span><span>' + lines.length + ' lines</span></div><pre class="code" aria-label="Source of ' + esc(f.path) + '">' + lines.map(l => '<span class="l">' + hlLine(l, f.ext) + '</span>').join('') + '</pre></div>' +
      '<div class="view"><span class="bolt">⚡ hot reload</span>' + f.view() + '</div></div></section>';
  }).join('');
}

/** The explorer tree. */
export function renderTree(): string {
  let lastDir = '';
  return '<li class="dir">▾ abishek</li>' + FILES.map(f => {
    let pre = '';
    if (f.dir && f.dir !== lastDir) { pre = '<li class="dir" style="padding-left:18px">▾ ' + f.dir + '</li>'; lastDir = f.dir; }
    return pre + '<li><a href="#f-' + f.id + '" data-go="' + f.id + '" class="' + (f.dir ? 'in' : '') + '">' + icon(f.ext) + '<span>' + esc(f.path.split('/').pop() as string) + '</span>' + (f.star ? '<span class="star">★</span>' : '') + '</a></li>';
  }).join('');
}

export const FILE_META: FileMeta[] = FILES.map(({ id, path, ext, dir, cmd, tags, ds }) => ({ id, path, ext, dir, cmd, tags, ds }));
