// Saves an enquiry from the landing page or the portfolio to Firestore.
// Works on Firebase App Hosting (default credentials). Locally, without credentials, it returns 503 and the
// visitor's WhatsApp/email hand-off still happens in the browser, so no enquiry is lost.
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createHash } from 'node:crypto';

const Enquiry = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(3).max(120),
  business: z.string().trim().max(200).optional().default(''),
  needs: z.array(z.string().max(60)).max(8).optional().default([]),
  when: z.string().trim().max(60).optional().default(''),
  message: z.string().trim().max(3000).optional().default(''),
  via: z.enum(['wa', 'mail', 'portfolio']).optional().default('wa'),
});

// Small per-instance limit: 5 enquiries per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(key: string): boolean {
  const now = Date.now(), win = 10 * 60 * 1000;
  const list = (hits.get(key) || []).filter(t => now - t < win);
  list.push(now); hits.set(key, list);
  return list.length > 5;
}

async function db() {
  const configured = !!(process.env.FIREBASE_CONFIG || process.env.GOOGLE_CLOUD_PROJECT || process.env.GOOGLE_APPLICATION_CREDENTIALS);
  if (!configured) return null;
  const { getApps, initializeApp, applicationDefault } = await import('firebase-admin/app');
  const { getFirestore } = await import('firebase-admin/firestore');
  if (!getApps().length) initializeApp({ credential: applicationDefault() });
  return getFirestore();
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 16);
  if (limited(ipHash)) return NextResponse.json({ ok: false, reason: 'rate-limited' }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, reason: 'bad-json' }, { status: 400 }); }
  const parsed = Enquiry.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });

  const firestore = await db().catch(() => null);
  if (!firestore) return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 });

  const { FieldValue } = await import('firebase-admin/firestore');
  await firestore.collection('enquiries').add({ ...parsed.data, ipHash, createdAt: FieldValue.serverTimestamp(), status: 'new' });
  return NextResponse.json({ ok: true });
}
