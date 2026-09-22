// The visitor replied in the chat card. Stores it and forwards it to Abishek's Telegram.
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import { limited } from '@/lib/server/rate';
import { loadSession, appendMessage, mapTg, validSid } from '@/lib/server/live';
import { esc, sendToOwner } from '@/lib/server/tg';

const Body = z.object({ sid: z.string().max(40), text: z.string().trim().min(1).max(1000) });

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !validSid(parsed.data.sid)) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  const { sid, text } = parsed.data;
  if (limited('say:' + sid, 20, 10 * 60 * 1000)) return NextResponse.json({ ok: false, reason: 'rate-limited' }, { status: 429 });

  const db = await getDb();
  if (!db) return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 });
  const s = await loadSession(db, sid);
  if (!s) return NextResponse.json({ ok: false, reason: 'unknown-session' }, { status: 404 });

  const now = Date.now();
  await appendMessage(db, sid, { from: 'visitor', text, at: now }, true);
  const id = await sendToOwner('💬 <b>#' + s.sid.slice(0, 5) + ' says:</b>\n' + esc(text) + '\n\n<i>Reply to this to answer.</i>', { replyTo: s.tgMsgId ?? undefined });
  await mapTg(db, id, s.sid);
  return NextResponse.json({ ok: true, at: now });
}
