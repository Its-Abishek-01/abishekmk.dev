// Something the visitor did (picked a business type, reached a section, tapped WhatsApp...).
// Updates the visit's Telegram message; important actions also buzz Abishek's phone.
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import { limited } from '@/lib/server/rate';
import { loadSession, recordEvent, validSid } from '@/lib/server/live';

const Body = z.object({
  sid: z.string().max(40),
  type: z.string().regex(/^[a-z_-]{2,24}$/),
  label: z.string().max(160).optional().default(''),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !validSid(parsed.data.sid)) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  const { sid, type, label } = parsed.data;
  if (limited('event:' + sid, 60, 10 * 60 * 1000)) return NextResponse.json({ ok: false, reason: 'rate-limited' }, { status: 429 });

  const db = await getDb();
  if (!db) return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 });
  const s = await loadSession(db, sid);
  if (!s) return NextResponse.json({ ok: false, reason: 'unknown-session' }, { status: 404 });
  await recordEvent(db, s, type, label);
  return NextResponse.json({ ok: true });
}
