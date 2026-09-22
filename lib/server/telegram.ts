import 'server-only';
// Sends a new-enquiry alert to Abishek's phone through a Telegram bot.
// Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (App Hosting secrets, see apphosting.yaml).
// Never throws: an alert failure must not lose or block an enquiry.

export interface EnquiryAlert {
  name: string; phone: string; business?: string; needs?: string[]; when?: string; message?: string; via?: string;
}

const esc = (s: string) => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string);

/** A wa.me link when the contact looks like a phone number (10-digit Indian numbers get +91). */
function whatsappLink(contact: string): string | null {
  const digits = contact.replace(/\D/g, '');
  if (digits.length === 10) return 'https://wa.me/91' + digits;
  if (digits.length >= 11 && digits.length <= 15) return 'https://wa.me/' + digits;
  return null;
}

export async function sendEnquiryAlert(e: EnquiryAlert): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN, chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const source = e.via === 'portfolio' ? 'portfolio · contact.sh' : e.via === 'mail' ? 'landing · sent by email' : 'landing · sent on WhatsApp';
  const wa = whatsappLink(e.phone);
  const lines = [
    '<b>New enquiry</b> · abishekmk.dev',
    '',
    '<b>' + esc(e.name) + '</b>',
    '📞 ' + esc(e.phone),
    e.business ? '🏪 ' + esc(e.business) : '',
    e.needs?.length ? '🧩 ' + esc(e.needs.join(', ')) : '',
    e.when ? '⏱ ' + esc(e.when) : '',
    e.message ? '\n' + esc(e.message.slice(0, 1500)) : '',
    '',
    '<i>' + source + '</i>',
    wa ? '<a href="' + wa + '">Reply on WhatsApp →</a>' : '',
  ].filter(Boolean);

  try {
    const res = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true }),
      signal: AbortSignal.timeout(4000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
