// The visitor's page checks here for messages from Abishek. Also keeps "on the page now" fresh.
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { limited } from '@/lib/server/rate';
import { loadSession, validSid } from '@/lib/server/live';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sid = url.searchParams.get('sid');
  const after = Number(url.searchParams.get('after') || 0) || 0;
  if (!validSid(sid)) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  if (limited('poll:' + sid, 400, 10 * 60 * 1000)) return NextResponse.json({ ok: false, reason: 'rate-limited' }, { status: 429 });

  const db = await getDb();
  if (!db) return NextResponse.json({ ok: true, messages: [] });
  const s = await loadSession(db, sid);
  if (!s) return NextResponse.json({ ok: false, reason: 'unknown-session' }, { status: 404 });

  // Write "last seen" at most every 20 s to keep Firestore writes low.
  const now = Date.now();
  if (now - s.lastSeen > 20_000) await db.collection('live_sessions').doc(sid).update({ lastSeen: now });

  const messages = s.messages.filter(m => m.at > after);
  return NextResponse.json({ ok: true, messages }, { headers: { 'cache-control': 'no-store' } });
}
