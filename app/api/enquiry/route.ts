// Saves an enquiry from the landing page or the portfolio to Firestore, then alerts Abishek on Telegram
// (threaded under the visitor's live-visit message when we know their session).
// Locally, without credentials, it returns 503 and the visitor's WhatsApp/email hand-off still happens in the browser.
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/server/db';
import { limited, ipHashOf } from '@/lib/server/rate';
import { sendEnquiryAlert } from '@/lib/server/telegram';
import { loadSession, validSid } from '@/lib/server/live';

const Enquiry = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(3).max(120),
  business: z.string().trim().max(200).optional().default(''),
  needs: z.array(z.string().max(60)).max(8).optional().default([]),
  when: z.string().trim().max(60).optional().default(''),
  message: z.string().trim().max(3000).optional().default(''),
  via: z.enum(['wa', 'mail', 'portfolio']).optional().default('wa'),
  sid: z.string().max(40).optional(),
});

export async function POST(req: Request) {
  const ipHash = ipHashOf(req);
  if (limited('enquiry:' + ipHash, 5, 10 * 60 * 1000)) return NextResponse.json({ ok: false, reason: 'rate-limited' }, { status: 429 });

  const parsed = Enquiry.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  const { sid, ...data } = parsed.data;

  // 1. Save it (the record of truth). 2. Ping Abishek's phone. Either one alone still counts as received.
  let saved = false, replyTo: number | undefined;
  const db = await getDb();
  if (db) {
    try {
      const { FieldValue } = await import('firebase-admin/firestore');
      await db.collection('enquiries').add({ ...data, sid: validSid(sid) ? sid : null, ipHash, createdAt: FieldValue.serverTimestamp(), status: 'new' });
      saved = true;
      if (validSid(sid)) replyTo = (await loadSession(db, sid))?.tgMsgId ?? undefined;
    } catch (err) {
      console.error('enquiry: firestore write failed', err);
    }
  }
  const alerted = await sendEnquiryAlert(data, replyTo);
  if (!saved && !alerted) return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 });
  return NextResponse.json({ ok: true, saved, alerted });
}
