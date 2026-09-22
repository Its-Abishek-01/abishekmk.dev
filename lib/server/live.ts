import 'server-only';
// Live visitor sessions: every visit pings Abishek on Telegram, the same message updates as the visitor browses,
// and Abishek can reply in Telegram to talk to the visitor on the page.
//
// Firestore (server-only; rules deny all client access):
//   live_sessions/{sid}  one per visitor (id kept in their browser, so returning visitors are recognised)
//   live_tgmap/{tgMessageId} -> { sid }  so a Telegram reply finds its visitor
import { randomBytes } from 'node:crypto';
import { FieldValue, type Firestore } from 'firebase-admin/firestore';
import { esc, sendToOwner, editOwnerMessage } from './tg';

export const VISIT_GAP_MS = 30 * 60 * 1000;      // a new "visit" after 30 minutes away
export const ONLINE_MS = 45 * 1000;              // seen within 45 s = on the page now
const MAX_LOG = 40, MAX_MSGS = 200;

export interface ChatMsg { from: 'abishek' | 'visitor'; text: string; at: number }
export interface Session {
  sid: string;
  createdAt: number;
  lastSeen: number;
  visits: number;
  visitStart: number;
  page: string;
  ref: string;
  device: string;
  lang: string;
  screen: string;
  ipHash: string;
  tgMsgId: number | null;
  log: string[];
  notified: string[];
  messages: ChatMsg[];
}

export interface VisitInfo { page: string; ref: string; utm: string; lang: string; screen: string; tz: string; ua: string }

export const newSid = () => randomBytes(16).toString('base64url');
export const validSid = (s: unknown): s is string => typeof s === 'string' && /^[A-Za-z0-9_-]{16,32}$/.test(s);

const BOT = /bot|crawl|spider|slurp|lighthouse|headless|phantom|puppeteer|playwright|preview|facebookexternalhit|embedly|quora link|pinterest|bingpreview|google-inspectiontool/i;
export const isBot = (ua: string) => !ua || BOT.test(ua);

export function describeDevice(ua: string): string {
  const os = /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) ? 'iPad' : /Android/.test(ua) ? 'Android' : /Windows/.test(ua) ? 'Windows' : /Mac OS X|Macintosh/.test(ua) ? 'Mac' : /Linux/.test(ua) ? 'Linux' : 'Unknown';
  const br = /SamsungBrowser/.test(ua) ? 'Samsung Internet' : /Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Browser';
  const inApp = /Instagram/.test(ua) ? ' (Instagram)' : /FBAN|FBAV/.test(ua) ? ' (Facebook)' : /LinkedInApp/.test(ua) ? ' (LinkedIn)' : '';
  return os + ' · ' + br + inApp;
}

const IST = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
export const istTime = (ms: number) => IST.format(new Date(ms)).replace(' ', '').toLowerCase();
const shortId = (sid: string) => sid.slice(0, 5);
const pageName = (p: string) => p === '/' ? 'landing page' : p.startsWith('/portfolio') ? 'portfolio' : p;

/** The one Telegram message per visit that keeps updating. */
export function card(s: Session, note = ''): string {
  const returning = s.visits > 1 ? '🔁 <b>Returning visitor</b> · visit ' + s.visits : '👀 <b>New visitor</b>';
  const online = Date.now() - s.lastSeen < ONLINE_MS ? '🟢 on the page now' : '⚪ left at ' + istTime(s.lastSeen);
  const lines = [
    returning + ' · #' + shortId(s.sid),
    '📄 ' + esc(pageName(s.page)) + '   ' + online,
    '📱 ' + esc(s.device) + ' · ' + esc(s.lang) + (s.screen ? ' · ' + esc(s.screen) : ''),
    '↪ ' + esc(s.ref || 'direct / typed'),
    '',
    ...s.log.slice(-25).map(l => '• ' + l),
    s.messages.length ? '\n💬 ' + s.messages.length + ' chat message' + (s.messages.length > 1 ? 's' : '') : '',
    note ? '\n' + note : '',
    '\n<i>Reply to this message to talk to them on the page.</i>',
  ].filter(l => l !== '');
  return lines.join('\n');
}

export async function loadSession(db: Firestore, sid: string): Promise<Session | null> {
  const snap = await db.collection('live_sessions').doc(sid).get();
  return snap.exists ? (snap.data() as Session) : null;
}

export async function saveSession(db: Firestore, s: Session): Promise<void> {
  if (s.log.length > MAX_LOG) s.log = s.log.slice(-MAX_LOG);
  if (s.messages.length > MAX_MSGS) s.messages = s.messages.slice(-MAX_MSGS);
  await db.collection('live_sessions').doc(s.sid).set(s);
}

/** Atomic appends, so concurrent writes (an event and a chat reply at the same moment) never overwrite each other. */
export async function appendLog(db: Firestore, sid: string, line: string, extra: Record<string, unknown> = {}): Promise<void> {
  await db.collection('live_sessions').doc(sid).update({ log: FieldValue.arrayUnion(line), lastSeen: Date.now(), ...extra });
}
export async function appendMessage(db: Firestore, sid: string, m: ChatMsg, touchLastSeen: boolean): Promise<void> {
  await db.collection('live_sessions').doc(sid).update({ messages: FieldValue.arrayUnion(m), ...(touchLastSeen ? { lastSeen: m.at } : {}) });
}

export async function mapTg(db: Firestore, tgId: number | null, sid: string): Promise<void> {
  if (tgId) await db.collection('live_tgmap').doc(String(tgId)).set({ sid, at: Date.now() });
}

/** Start or continue a visit. Returns the session (new or existing). */
export async function startVisit(db: Firestore, sid: string | null, v: VisitInfo, ipHash: string): Promise<Session> {
  const now = Date.now();
  const refText = [v.ref, v.utm].filter(Boolean).join(' · ');
  const existing = sid ? await loadSession(db, sid) : null;

  if (existing && now - existing.lastSeen < VISIT_GAP_MS) {
    // Same visit, new page (e.g. landing → portfolio).
    existing.lastSeen = now;
    if (existing.page !== v.page) {
      const line = istTime(now) + ' opened the ' + esc(pageName(v.page));
      existing.page = v.page; existing.log.push(line);
      const firstPortfolio = v.page.startsWith('/portfolio') && !existing.notified.includes('portfolio');
      await appendLog(db, existing.sid, line, { page: v.page, ...(firstPortfolio ? { notified: FieldValue.arrayUnion('portfolio') } : {}) });
      if (firstPortfolio) {
        existing.notified.push('portfolio');
        const id = await sendToOwner('🧑‍💻 #' + shortId(existing.sid) + ' opened your <b>portfolio</b>', { replyTo: existing.tgMsgId ?? undefined });
        await mapTg(db, id, existing.sid);
      }
      if (existing.tgMsgId) await editOwnerMessage(existing.tgMsgId, card(existing));
    } else {
      await db.collection('live_sessions').doc(existing.sid).update({ lastSeen: now });
    }
    return existing;
  }

  const s: Session = existing ? {
    ...existing, lastSeen: now, visits: existing.visits + 1, visitStart: now, page: v.page, ref: refText || existing.ref,
    device: describeDevice(v.ua), lang: v.lang, screen: v.screen, ipHash, log: [], notified: [],
  } : {
    sid: newSid(), createdAt: now, lastSeen: now, visits: 1, visitStart: now, page: v.page, ref: refText,
    device: describeDevice(v.ua), lang: v.lang, screen: v.screen, ipHash, tgMsgId: null, log: [], notified: [], messages: [],
  };
  s.log.push(istTime(now) + ' landed on the ' + esc(pageName(v.page)) + (v.tz && v.tz !== 'Asia/Calcutta' && v.tz !== 'Asia/Kolkata' ? ' (timezone ' + esc(v.tz) + ')' : ''));
  s.tgMsgId = await sendToOwner(card(s));
  await mapTg(db, s.tgMsgId, s.sid);
  await saveSession(db, s);
  return s;
}

/** Events that deserve their own buzz on Abishek's phone (once per visit each). */
const IMPORTANT: Record<string, string> = {
  whatsapp: '📲 tapped <b>WhatsApp</b>',
  call: '📞 tapped <b>Call</b>',
  email: '✉️ tapped <b>Email</b>',
};  // the enquiry form sends its own full alert, threaded under the visit

export async function recordEvent(db: Firestore, s: Session, type: string, label: string): Promise<void> {
  const now = Date.now();
  s.lastSeen = now;
  const line = istTime(now) + ' ' + (label ? esc(label.slice(0, 120)) : esc(type));
  s.log.push(line);
  const buzz = !!IMPORTANT[type] && !s.notified.includes(type);
  await appendLog(db, s.sid, line, buzz ? { notified: FieldValue.arrayUnion(type) } : {});
  if (buzz) {
    s.notified.push(type);
    const id = await sendToOwner('#' + shortId(s.sid) + ' ' + IMPORTANT[type], { replyTo: s.tgMsgId ?? undefined });
    await mapTg(db, id, s.sid);
  }
  if (s.tgMsgId) await editOwnerMessage(s.tgMsgId, card(s));
}
