import 'server-only';
// New-enquiry alert to Abishek's phone. Never throws: an alert failure must not lose or block an enquiry.
import { esc, sendToOwner } from './tg';

export interface EnquiryAlert {
  name: string; phone: string; business?: string; needs?: string[]; when?: string; message?: string; via?: string;
}

/** A wa.me link when the contact looks like a phone number (10-digit Indian numbers get +91). */
export function whatsappLink(contact: string): string | null {
  const digits = contact.replace(/\D/g, '');
  if (digits.length === 10) return 'https://wa.me/91' + digits;
  if (digits.length >= 11 && digits.length <= 15) return 'https://wa.me/' + digits;
  return null;
}

export async function sendEnquiryAlert(e: EnquiryAlert, replyTo?: number): Promise<boolean> {
  const source = e.via === 'portfolio' ? 'portfolio · contact.sh' : e.via === 'mail' ? 'landing · sent by email' : 'landing · sent on WhatsApp';
  const wa = whatsappLink(e.phone);
  const lines = [
    '📨 <b>New enquiry</b> · abishek.wiozen.in',
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
  return (await sendToOwner(lines.join('\n'), { replyTo })) !== null;
}
