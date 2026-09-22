// One-time setup: tells Telegram where to deliver Abishek's bot messages.
// Open  https://<site>/api/telegram/setup?key=<TELEGRAM_WEBHOOK_SECRET>  once after deploying.
import { NextResponse } from 'next/server';
import { tg } from '@/lib/server/tg';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  const url = new URL(req.url);
  if (!secret || url.searchParams.get('key') !== secret) return new NextResponse('forbidden', { status: 403 });
  const host = req.headers.get('x-forwarded-host') || url.host;
  const hook = 'https://' + host + '/api/telegram/webhook';
  const r = await tg('setWebhook', { url: hook, secret_token: secret, allowed_updates: ['message'], drop_pending_updates: true });
  await tg('setMyCommands', { commands: [{ command: 'live', description: 'Who is on the site right now' }, { command: 'help', description: 'How replying to visitors works' }] });
  return NextResponse.json({ ok: r !== null, webhook: hook });
}
