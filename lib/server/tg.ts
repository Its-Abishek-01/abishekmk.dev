import 'server-only';
// Thin Telegram Bot API client. Never throws; returns null on any failure.
// Env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (Abishek's private chat with the bot).

export const esc = (s: string) => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string);

export const ownerChatId = () => process.env.TELEGRAM_CHAT_ID || '';

export async function tg<T = unknown>(method: string, payload: Record<string, unknown>): Promise<T | null> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch('https://api.telegram.org/bot' + token + '/' + method, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    const json = await res.json() as { ok: boolean; result?: T; description?: string };
    if (!json.ok) { console.warn('tg: ' + method + ' failed: ' + json.description); return null; }
    return json.result ?? null;
  } catch (err) {
    console.warn('tg: ' + method + ' error', err);
    return null;
  }
}

interface TgMessage { message_id: number }

/** Send an HTML message to Abishek. Returns the Telegram message id, or null. */
export async function sendToOwner(html: string, opts: { replyTo?: number; silent?: boolean } = {}): Promise<number | null> {
  const chatId = ownerChatId(); if (!chatId) return null;
  const r = await tg<TgMessage>('sendMessage', {
    chat_id: chatId, text: html.slice(0, 4000), parse_mode: 'HTML', disable_web_page_preview: true,
    disable_notification: !!opts.silent,
    ...(opts.replyTo ? { reply_parameters: { message_id: opts.replyTo, allow_sending_without_reply: true } } : {}),
  });
  return r?.message_id ?? null;
}

/** Replace the text of a message Abishek already has (no new notification). */
export async function editOwnerMessage(messageId: number, html: string): Promise<boolean> {
  const chatId = ownerChatId(); if (!chatId) return false;
  const r = await tg('editMessageText', { chat_id: chatId, message_id: messageId, text: html.slice(0, 4000), parse_mode: 'HTML', disable_web_page_preview: true });
  return r !== null;
}
