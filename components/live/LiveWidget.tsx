'use client';
// Live visits + "Abishek says hi" card.
// - Starts/continues a visit (Abishek gets a Telegram message), forwards interactions, polls for his replies.
// - When he writes, a card slides up: swipe it away, or reply and chat.
// - Opt out on your own devices with ?me=1 (undo with ?me=0). Respects Do Not Track.
import { useCallback, useEffect, useRef, useState } from 'react';

interface Msg { from: 'abishek' | 'visitor'; text: string; at: number }
interface LiveEvent { type: string; label?: string }

const K = { sid: 'live-sid', me: 'live-me', read: 'live-read', last: 'live-last' };
const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  del(k: string) { try { localStorage.removeItem(k); } catch { /* private mode */ } },
};
const post = (url: string, body: unknown) =>
  fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), keepalive: true }).then(r => r.ok ? r.json() : null).catch(() => null);

export default function LiveWidget() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [mode, setMode] = useState<'hidden' | 'card' | 'chat' | 'pill'>('hidden');
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const sidRef = useRef<string | null>(null);
  const afterRef = useRef(0);
  const lastChatRef = useRef(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);

  const readUpTo = () => Number(store.get(K.read) || 0);
  const lastFromHim = msgs.filter(m => m.from === 'abishek').at(-1);

  /* ---------- start the visit, forward events, poll for replies ---------- */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('me') === '1') store.set(K.me, '1');
    if (params.get('me') === '0') store.del(K.me);
    if (store.get(K.me) === '1' || navigator.doNotTrack === '1' || (navigator as Navigator & { webdriver?: boolean }).webdriver) return;

    let stopped = false, timer = 0;
    const queue: LiveEvent[] = [];
    const sent = new Set<string>();
    const startedAt = Date.now();

    const flush = () => {
      const sid = sidRef.current; if (!sid) return;
      while (queue.length) { const e = queue.shift() as LiveEvent; post('/api/live/event', { sid, type: e.type, label: e.label || '' }); }
    };
    const onEvent = (ev: Event) => {
      const d = (ev as CustomEvent<LiveEvent>).detail; if (!d?.type) return;
      const key = d.type + '|' + (d.label || '');
      if (sent.has(key)) return;             // each distinct action is reported once per page view
      sent.add(key); queue.push(d); flush();
    };
    window.addEventListener('live', onEvent);

    // Clicks worth knowing about, detected without touching the page markup.
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement | null)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const emit = (type: string, label: string) => window.dispatchEvent(new CustomEvent('live', { detail: { type, label } }));
      if (href.includes('wa.me/')) emit('whatsapp', 'tapped WhatsApp (' + (a.textContent || '').trim().slice(0, 40) + ')');
      else if (href.startsWith('tel:')) emit('call', 'tapped Call');
      else if (href.startsWith('mailto:')) emit('email', 'tapped Email');
      else if (href.includes('linkedin.com')) emit('link', 'opened LinkedIn');
      else if (href.includes('github.com')) emit('link', 'opened GitHub');
      else if (href === '/portfolio') emit('nav', 'clicked through to the portfolio');
    };
    document.addEventListener('click', onClick, true);
    // FAQ questions opened (landing page <details>)
    const onToggle = (ev: Event) => {
      const d = ev.target as HTMLDetailsElement;
      if (d.tagName === 'DETAILS' && d.open) { const q = d.querySelector('summary')?.textContent?.replace('+', '').trim(); if (q) window.dispatchEvent(new CustomEvent('live', { detail: { type: 'faq', label: 'read FAQ: ' + q } })); }
    };
    document.addEventListener('toggle', onToggle, true);

    const poll = async () => {
      if (stopped) return;
      const sid = sidRef.current;
      const chatActive = Date.now() - lastChatRef.current < 3 * 60 * 1000;
      const aged = Date.now() - startedAt > 30 * 60 * 1000 && !chatActive;
      if (sid && !document.hidden) {
        const r = await fetch('/api/live/poll?sid=' + encodeURIComponent(sid) + '&after=' + afterRef.current, { cache: 'no-store' }).then(x => x.ok ? x.json() : null).catch(() => null) as { messages?: Msg[] } | null;
        const fresh = (r?.messages || []).filter(m => m.at > afterRef.current);
        if (fresh.length) {
          afterRef.current = Math.max(...fresh.map(m => m.at));
          store.set(K.last, String(afterRef.current));
          setMsgs(prev => [...prev, ...fresh.filter(f => !prev.some(p => p.at === f.at && p.from === f.from))]);
          if (fresh.some(m => m.from === 'abishek')) { lastChatRef.current = Date.now(); setMode(m => m === 'chat' ? 'chat' : 'card'); }
        }
      }
      timer = window.setTimeout(poll, chatActive ? 3000 : aged ? 30000 : 8000);
    };

    (async () => {
      const u = new URL(location.href);
      const utm = ['utm_source', 'utm_medium', 'utm_campaign'].map(k => u.searchParams.get(k)).filter(Boolean).join(' / ');
      let ref = '';
      try { ref = document.referrer ? new URL(document.referrer).host : ''; } catch { /* ignore */ }
      if (ref === location.host) ref = '';
      const r = await post('/api/live/start', {
        sid: store.get(K.sid) || undefined, page: location.pathname, ref, utm,
        lang: navigator.language || '', screen: innerWidth + '×' + innerHeight, tz: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      }) as { sid?: string } | null;
      if (!r?.sid || stopped) return;
      sidRef.current = r.sid; store.set(K.sid, r.sid);
      afterRef.current = 0;          // first poll returns the whole conversation, so a returning visitor sees earlier replies
      flush(); poll();
    })();

    return () => {
      stopped = true; clearTimeout(timer);
      window.removeEventListener('live', onEvent);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('toggle', onToggle, true);
    };
  }, []);

  /* ---------- decide what to show when messages change ---------- */
  useEffect(() => {
    if (!msgs.length) return;
    const unread = msgs.some(m => m.from === 'abishek' && m.at > readUpTo());
    setMode(m => (m === 'hidden' ? (unread ? 'card' : 'pill') : m));
  }, [msgs]);

  useEffect(() => { if (mode === 'chat') { store.set(K.read, String(Date.now())); threadRef.current?.scrollTo({ top: 1e6 }); } }, [mode, msgs]);

  /* ---------- swipe the card away ---------- */
  useEffect(() => {
    const el = cardRef.current; if (!el || mode !== 'card') return;
    let x0 = 0, dx = 0, drag = false;
    const down = (e: PointerEvent) => { if ((e.target as HTMLElement).closest('button')) return; drag = true; x0 = e.clientX; dx = 0; el.setPointerCapture(e.pointerId); el.style.transition = 'none'; };
    const move = (e: PointerEvent) => { if (!drag) return; dx = e.clientX - x0; el.style.transform = 'translateX(' + dx + 'px) rotate(' + dx / 40 + 'deg)'; el.style.opacity = String(Math.max(0, 1 - Math.abs(dx) / 260)); };
    const up = () => {
      if (!drag) return; drag = false;
      el.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1), opacity .35s';
      if (Math.abs(dx) > 90) { el.style.transform = 'translateX(' + (dx > 0 ? 520 : -520) + 'px) rotate(' + (dx > 0 ? 12 : -12) + 'deg)'; el.style.opacity = '0'; setTimeout(() => dismiss(), 260); }
      else { el.style.transform = ''; el.style.opacity = ''; }
    };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    return () => { el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
  });

  const dismiss = useCallback(() => {
    store.set(K.read, String(Date.now()));
    setMode('pill');
    const sid = sidRef.current; if (sid) post('/api/live/event', { sid, type: 'chat', label: 'swiped your message away' });
  }, []);

  const send = async () => {
    const text = draft.trim(); const sid = sidRef.current;
    if (!text || !sid || sending) return;
    setSending(true);
    const r = await post('/api/live/say', { sid, text }) as { at?: number } | null;
    setSending(false);
    if (r?.at) { setMsgs(prev => [...prev, { from: 'visitor', text, at: r.at as number }]); setDraft(''); lastChatRef.current = Date.now(); }
  };

  if (mode === 'hidden' || !msgs.length) return null;

  const unreadCount = msgs.filter(m => m.from === 'abishek' && m.at > readUpTo()).length;

  return (
    <div className="lc" role="region" aria-label="Message from Abishek">
      {mode === 'pill' && (
        <button type="button" className="lc-pill" onClick={() => setMode('chat')} aria-label="Open chat with Abishek">
          <span className="lc-av" aria-hidden="true">AB</span>Chat with Abishek{unreadCount > 0 && <b className="lc-badge">{unreadCount}</b>}
        </button>
      )}

      {mode === 'card' && lastFromHim && (
        <div className="lc-card" ref={cardRef} aria-live="polite">
          <div className="lc-head"><span className="lc-av" aria-hidden="true">AB</span><div><b>Abishek</b><small><i className="lc-dot" />the developer behind this site</small></div>
            <button type="button" className="lc-x" onClick={dismiss} aria-label="Dismiss">×</button></div>
          <p className="lc-text">{lastFromHim.text}</p>
          <div className="lc-actions"><button type="button" className="lc-reply" onClick={() => setMode('chat')}>Reply</button><span className="lc-hint">Swipe to dismiss</span></div>
        </div>
      )}

      {mode === 'chat' && (
        <div className="lc-chat">
          <div className="lc-head"><span className="lc-av" aria-hidden="true">AB</span><div><b>Abishek</b><small><i className="lc-dot" />usually replies in a few minutes</small></div>
            <button type="button" className="lc-x" onClick={() => setMode('pill')} aria-label="Minimise chat">–</button></div>
          <div className="lc-thread" ref={threadRef}>
            {msgs.map(m => <div key={m.from + m.at} className={'lc-msg ' + (m.from === 'abishek' ? 'him' : 'me')}>{m.text}</div>)}
          </div>
          <form className="lc-form" onSubmit={e => { e.preventDefault(); send(); }}>
            <label htmlFor="lc-input" className="lc-sr">Your reply</label>
            <input id="lc-input" value={draft} onChange={e => setDraft(e.target.value)} placeholder="Type a reply…" maxLength={1000} autoComplete="off" />
            <button type="submit" disabled={!draft.trim() || sending} aria-label="Send">➤</button>
          </form>
          <p className="lc-note">Messages go straight to Abishek. Share a phone number if you want a call back.</p>
        </div>
      )}
    </div>
  );
}
