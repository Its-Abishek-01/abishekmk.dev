// Telegram calls this when Abishek writes to the bot.
// Replying to a visitor's message sends that text to the visitor's page. /live lists who is on the site now.
// Only accepts requests carrying the secret registered with Telegram, and only messages from Abishek's chat.
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { esc, ownerChatId, sendToOwner } from '@/lib/server/tg';
import { loadSession, appendMessage, istTime, ONLINE_MS, type Session } from '@/lib/server/live';

interface TgUpdate {
  message?: {
    message_id: number;
    chat: { id: number };
    text?: string;
    reply_to_message?: { message_id: number };
  };
}

const ok = () => NextResponse.json({ ok: true });

export async function POST(req: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || req.headers.get('x-telegram-bot-api-secret-token') !== secret) return new NextResponse('forbidden', { status: 403 });

  const update = await req.json().catch(() => null) as TgUpdate | null;
  const msg = update?.message;
  if (!msg || String(msg.chat.id) !== ownerChatId()) return ok();  // ignore anyone who isn't Abishek
  const text = (msg.text || '').trim();
  const db = await getDb();
  if (!db) { await sendToOwner('⚠️ Database not reachable, message not delivered.'); return ok(); }

  if (text === '/live' || text === '/who') {
    const since = Date.now() - 5 * 60 * 1000;
    const snap = await db.collection('live_sessions').where('lastSeen', '>', since).orderBy('lastSeen', 'desc').limit(10).get();
    if (snap.empty) { await sendToOwner('Nobody on the site in the last 5 minutes.'); return ok(); }
    const lines = snap.docs.map(d => { const s = d.data() as Session; return '• #' + s.sid.slice(0, 5) + ' · ' + esc(s.page) + ' · ' + esc(s.device) + ' · seen ' + istTime(s.lastSeen); });
    await sendToOwner('<b>On the site now</b>\n' + lines.join('\n') + '\n\n<i>Reply to a visitor’s visit message to talk to them.</i>');
    return ok();
  }
  if (text === '/start' || text === '/help' || !msg.reply_to_message) {
    await sendToOwner('Reply to a visitor’s message to talk to them on the page.\n/live shows who is on the site now.');
    return ok();
  }
  if (!text) { await sendToOwner('Only text messages can be sent to visitors.'); return ok(); }

  const map = await db.collection('live_tgmap').doc(String(msg.reply_to_message.message_id)).get();
  const sid = map.exists ? (map.data() as { sid: string }).sid : null;
  const s = sid ? await loadSession(db, sid) : null;
  if (!s) { await sendToOwner('I can’t tell which visitor that was. Reply to their visit message.'); return ok(); }

  const now = Date.now();
  await appendMessage(db, s.sid, { from: 'abishek', text: text.slice(0, 1000), at: now }, false);
  const online = now - s.lastSeen < ONLINE_MS;
  await sendToOwner(online
    ? '✓ Sent to #' + s.sid.slice(0, 5) + '. They’re on the page now.'
    : '✓ Saved for #' + s.sid.slice(0, 5) + '. They left at ' + istTime(s.lastSeen) + '; they’ll see it if they come back.', { silent: true });
  return ok();
}
