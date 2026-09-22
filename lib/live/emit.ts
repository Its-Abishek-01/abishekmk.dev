// Tell the live widget that the visitor did something. Safe to call anywhere on the client.
// Types map to lines in Abishek's Telegram visit message; a few (whatsapp, call, email, form) also buzz his phone.
export function emitLive(type: string, label = ''): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('live', { detail: { type, label } }));
}
