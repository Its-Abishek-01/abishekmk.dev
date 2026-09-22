// A visitor opened a page. Pings Abishek on Telegram (once per visit) and returns the visitor's session id.
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import { limited, ipHashOf } from '@/lib/server/rate';
import { isBot, startVisit, validSid } from '@/lib/server/live';

const Body = z.object({
  sid: z.string().max(40).optional(),
  page: z.string().max(200),
  ref: z.string().max(200).optional().default(''),
  utm: z.string().max(200).optional().default(''),
  lang: z.string().max(40).optional().default(''),
  screen: z.string().max(30).optional().default(''),
  tz: z.string().max(60).optional().default(''),
});

export async function POST(req: Request) {
  const ua = req.headers.get('user-agent') || '';
  if (isBot(ua)) return new NextResponse(null, { status: 204 });
  const ipHash = ipHashOf(req);
  if (limited('start:' + ipHash, 30, 10 * 60 * 1000)) return NextResponse.json({ ok: false, reason: 'rate-limited' }, { status: 429 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  const db = await getDb();
  if (!db) return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 });

  const { sid, ...v } = parsed.data;
  const s = await startVisit(db, validSid(sid) ? sid : null, { ...v, ua }, ipHash);
  return NextResponse.json({ ok: true, sid: s.sid });
}
