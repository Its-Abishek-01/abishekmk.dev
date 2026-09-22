'use client';
// Interactions for the portfolio, ported from the LOCKED prototype (prototype/v05-repo.html).
// All files are server-rendered (lib/portfolio/content.ts); this adds hot reload, tabs, terminal and "go to file".
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import type { FileMeta } from '@/lib/portfolio/content';
import { emitLive } from '@/lib/live/emit';

const LANG: Record<string, string> = { md: 'Markdown', dart: 'Dart', js: 'JavaScript', jsx: 'JavaScript React', sh: 'Shell Script', log: 'Log', json: 'JSON', yml: 'YAML' };
const esc = (s: string) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);
const icon = (ext: string) => '<span class="ic ' + ext + '">' + ext.slice(0, 2).toUpperCase() + '</span>';

export default function PortfolioBehaviors({ files }: { files: FileMeta[] }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.pf');
    if (!root) return;
    const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) => r.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = root) => Array.from(r.querySelectorAll<T>(s));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = !reduce;
    const byId = Object.fromEntries(files.map(f => [f.id, f]));
    const fileEls = $$('.file');
    const cleanups: Array<() => void> = [];
    const timers: number[] = [];
    const on = (el: EventTarget, ev: string, fn: EventListenerOrEventListenerObject, opt?: AddEventListenerOptions) => { el.addEventListener(ev, fn, opt); cleanups.push(() => el.removeEventListener(ev, fn, opt)); };

    /* terminal + status */
    const term = $('#term'), crumb = $('#crumb'), sLang = $('#sLang'), sLn = $('#sLn'), sReload = $('#sReload');
    let reloads = 0;
    const trim = () => { if (term) while (term.children.length > 6) term.firstChild?.remove(); };
    const termPush = (html: string) => { term?.insertAdjacentHTML('beforeend', '<div class="ln">' + html + '</div>'); trim(); };
    const termCmd = (cmd: string, done?: () => void) => {
      const el = document.createElement('div'); el.className = 'ln'; term?.appendChild(el); trim();
      if (!motion) { el.innerHTML = '<span class="p">$</span> <span class="c">' + esc(cmd) + '</span>'; done?.(); return; }
      let i = 0; const t = window.setInterval(() => { i += 2; el.innerHTML = '<span class="p">$</span> <span class="c">' + esc(cmd.slice(0, i)) + '</span>'; if (i >= cmd.length) { clearInterval(t); done?.(); } }, 16);
      timers.push(t);
    };
    termPush('<span class="ok">abishek</span> · ' + files.length + ' files · ⎇ main · type <span class="c">⌘K</span> to jump to a file');
    const status = () => { if (sLn) sLn.textContent = 'Ln ' + (Math.floor(scrollY / 24) + 1).toLocaleString('en-IN') + ', Col 1'; };
    on(window, 'scroll', status, { passive: true }); status();

    /* tabs + explorer follow the file you're in */
    const tabsEl = $('#tabs'), tree = $('#tree'), opened: string[] = [];
    const openTab = (id: string) => {
      const f = byId[id]; if (!f || !tabsEl) return;
      if (!opened.includes(id)) { opened.push(id); tabsEl.insertAdjacentHTML('beforeend', '<button type="button" class="tab new" data-go="' + id + '">' + icon(f.ext) + esc(f.path.split('/').pop() as string) + '</button>'); }
      $$('.tab', tabsEl).forEach(t => t.classList.toggle('on', t.dataset.go === id));
      $('.tab.on', tabsEl)?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
      if (tree) $$('a', tree).forEach(a => a.classList.toggle('on', a.dataset.go === id));
      if (crumb) crumb.innerHTML = '<b>abishek</b> / ' + esc(f.path).replace(/\//g, ' / ');
      if (sLang) sLang.textContent = LANG[f.ext];
    };
    let currentId: string | null = null;
    const followIO = new IntersectionObserver(es => es.forEach(e => { const id = (e.target as HTMLElement).dataset.id || ''; if (e.isIntersecting && id !== currentId) { currentId = id; openTab(id); } }), { rootMargin: '-40% 0px -55% 0px' });
    fileEls.forEach(el => followIO.observe(el));
    cleanups.push(() => followIO.disconnect());

    /* hot reload: type the source, flash, build the preview */
    const setShow = (el: HTMLElement, v: string) => { el.dataset.show = v; $$('.seg button', el).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v))); };
    $$('.seg').forEach(seg => on(seg, 'click', e => { const b = (e.target as HTMLElement).closest<HTMLElement>('button'); const file = seg.closest<HTMLElement>('.file'); if (b && file) setShow(file, b.dataset.v || 'view'); }));

    const runPipeline = () => {
      const jobs = $$('#f-ship .job'), res = $('#runRes'), durs = [2.1, 4.8, 3.2, 1.9, 0.6];
      if (res) res.textContent = 'in progress';
      const go = (i: number) => {
        if (i >= jobs.length) { if (res) res.textContent = '✓ success'; termPush('<span class="ok">✓</span> how-i-ship · 5 jobs passed'); return; }
        const j = jobs[i]; j.classList.add('run');
        timers.push(window.setTimeout(() => { j.classList.remove('run'); j.classList.add('ok'); const d = $('.dot', j); if (d) d.textContent = '✓'; const t = $('.t', j); if (t) t.textContent = durs[i].toFixed(1) + 's'; go(i + 1); }, motion ? 520 : 0));
      };
      go(0);
    };

    const reload = (el: HTMLElement) => {
      if (el.dataset.done) return; el.dataset.done = '1';
      const f = byId[el.dataset.id || '']; if (!f) return;
      const lines = $$('.code .l', el), view = $('.view', el), rv = view ? $$('.rv', view) : [], t0 = performance.now();
      const finish = () => {
        el.classList.add('live', 'flash'); setShow(el, 'view'); const st = $('.state', el); if (st) st.textContent = '⚡ live';
        if (motion) gsap.fromTo(rv, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'expo.out', stagger: .06 });
        timers.push(window.setTimeout(() => el.classList.remove('flash'), 900));
        const ms = Math.round(performance.now() - t0);
        reloads++; if (sReload) sReload.textContent = '⚡ ' + reloads + ' reload' + (reloads > 1 ? 's' : '');
        termPush('<span class="ok">✓</span> hot reload · ' + ms + ' ms · ' + esc(f.path));
        if (tree) $('a[data-go="' + f.id + '"]', tree)?.classList.add('done');
        if (f.id === 'ship') runPipeline();
        if (f.id !== 'readme') emitLive('file', 'opened ' + f.path);
      };
      termCmd(f.cmd, () => {
        if (!motion) { finish(); return; }
        lines.forEach(l => l.classList.add('hide'));
        let i = 0;
        const step = () => { if (i < lines.length) { lines[i++].classList.remove('hide'); timers.push(window.setTimeout(step, 38)); } else timers.push(window.setTimeout(finish, 140)); };
        step();
      });
    };
    let reloadIO: IntersectionObserver | null = null;
    if (motion) {
      fileEls.forEach(el => { setShow(el, 'src'); const st = $('.state', el); if (st) st.textContent = '● source'; if (el.dataset.id !== 'readme') gsap.set($$('.rv', el), { opacity: 0 }); });
      reloadIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { reloadIO?.unobserve(e.target); reload(e.target as HTMLElement); } }), { threshold: .22 });
      fileEls.forEach(el => reloadIO?.observe(el));
    } else fileEls.forEach(reload);
    cleanups.push(() => reloadIO?.disconnect());

    /* navigation */
    let lenis: Lenis | null = null;
    const goTo = (id: string) => {
      const el = document.getElementById('f-' + id); if (!el) return;
      const top = el.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(el).scrollMarginTop || '0');
      if (lenis) lenis.scrollTo(top, { duration: 1.4 }); else scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    };

    /* go to file (⌘K) */
    const pal = $('#palette'), qEl = $<HTMLInputElement>('#q'), resEl = $('#results');
    let cur: FileMeta[] = [], act = 0, lastFocus: HTMLElement | null = null;
    const score = (f: FileMeta, q: string) => {
      const t = q.toLowerCase().trim(); if (!t) return 1;
      let s = 0; const name = f.path.toLowerCase();
      if (name.includes(t)) s += 10;
      t.split(/\s+/).forEach(w => { if (!w) return; if (name.includes(w)) s += 4; f.tags.forEach(tag => { if (tag === w) s += 6; else if (tag.startsWith(w)) s += 3; }); if (f.ds.toLowerCase().includes(w)) s += 2; });
      return s;
    };
    const mark = (p: string, q: string) => { const t = q.toLowerCase().trim(); if (!t) return esc(p); const i = p.toLowerCase().indexOf(t); return i < 0 ? esc(p) : esc(p.slice(0, i)) + '<mark>' + esc(p.slice(i, i + t.length)) + '</mark>' + esc(p.slice(i + t.length)); };
    const renderPal = () => {
      if (!qEl || !resEl) return;
      const q = qEl.value;
      cur = files.map(f => ({ f, s: score(f, q) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.f); act = 0;
      resEl.innerHTML = cur.length
        ? cur.map((f, i) => '<li class="opt" role="option" id="o-' + f.id + '" data-id="' + f.id + '" aria-selected="' + (i === 0) + '">' + icon(f.ext) + '<span class="nm">' + mark(f.path.split('/').pop() as string, q) + '</span><span class="dir">' + esc(f.dir || '/') + '</span><span class="ds">' + esc(f.ds) + '</span></li>').join('')
        : '<li class="opt" aria-disabled="true"><span></span><span class="ds">No file matches “' + esc(q) + '”. Try flutter, infra or contact.</span></li>';
      qEl.setAttribute('aria-activedescendant', cur[0] ? 'o-' + cur[0].id : '');
    };
    const setAct = (i: number) => { if (!resEl || !qEl) return; const o = $$('.opt[data-id]', resEl); if (!o.length) return; act = (i + o.length) % o.length; o.forEach((x, j) => x.setAttribute('aria-selected', String(j === act))); o[act].scrollIntoView({ block: 'nearest' }); qEl.setAttribute('aria-activedescendant', o[act].id); };
    const openPal = () => { lastFocus = document.activeElement as HTMLElement; pal?.classList.add('open'); if (qEl) qEl.value = ''; renderPal(); timers.push(window.setTimeout(() => qEl?.focus(), 30)); lenis?.stop(); };
    const closePal = () => { pal?.classList.remove('open'); lenis?.start(); lastFocus?.focus?.(); };
    const pick = (id: string) => { const q = qEl?.value.trim(); if (q) emitLive('search', 'searched “' + q + '” → ' + id); closePal(); goTo(id); };
    if (qEl) { on(qEl, 'input', renderPal); on(qEl, 'keydown', e => { const k = (e as KeyboardEvent).key; if (k === 'ArrowDown') { e.preventDefault(); setAct(act + 1); } else if (k === 'ArrowUp') { e.preventDefault(); setAct(act - 1); } else if (k === 'Enter' && cur[act]) { e.preventDefault(); pick(cur[act].id); } }); }
    if (resEl) on(resEl, 'click', e => { const o = (e.target as HTMLElement).closest<HTMLElement>('.opt[data-id]'); if (o?.dataset.id) pick(o.dataset.id); });
    if (pal) on(pal, 'click', e => { if (e.target === pal) closePal(); });
    const openBtn = $('#openPal'); if (openBtn) on(openBtn, 'click', openPal);
    on(window, 'keydown', e => {
      const ke = e as KeyboardEvent;
      const typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement as HTMLElement | null)?.tagName || '');
      if ((ke.key.toLowerCase() === 'k' && (ke.metaKey || ke.ctrlKey)) || (ke.key === '/' && !typing)) { e.preventDefault(); if (pal?.classList.contains('open')) closePal(); else openPal(); }
      else if (ke.key === 'Escape' && pal?.classList.contains('open')) closePal();
    });
    on(root, 'click', e => {
      const t = e.target as HTMLElement;
      const g = t.closest<HTMLElement>('[data-go]'); if (g?.dataset.go) { e.preventDefault(); goTo(g.dataset.go); return; }
      if (t.closest('[data-pal]')) openPal();
    });

    /* contact.sh */
    on(root, 'submit', e => {
      const form = e.target as HTMLFormElement; if (form.id !== 'brief') return; e.preventDefault();
      const f = new FormData(form), name = String(f.get('name') || '').trim(), who = String(f.get('contact') || '').trim();
      if (!name || !who) { termPush('<span style="color:var(--red)">✗</span> contact.sh: --name and --reply-to are required'); (form.elements.namedItem(name ? 'contact' : 'name') as HTMLInputElement | null)?.focus(); return; }
      let sid: string | undefined; try { sid = localStorage.getItem('live-sid') || undefined; } catch { /* private mode */ }
      emitLive('form', 'ran contact.sh');
      fetch('/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, phone: who, needs: [String(f.get('type') || '')], message: String(f.get('msg') || ''), via: 'portfolio', sid }), keepalive: true }).catch(() => {});
      const body = 'Hi Abishek,\n\nName: ' + name + '\nReply to: ' + who + '\nProject: ' + f.get('type') + '\n\n' + (f.get('msg') || '');
      location.href = 'mailto:abishek.mk.01@gmail.com?subject=' + encodeURIComponent('Project: ' + f.get('type')) + '&body=' + encodeURIComponent(body);
      termPush('<span class="ok">✓</span> brief ready · your mail app opened · exit 0');
    });

    let ctx: gsap.Context | null = null, raf: ((t: number) => void) | null = null;
    if (motion) {
      gsap.registerPlugin(ScrollTrigger);
      lenis = new Lenis({ lerp: .1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update); lenis.on('scroll', status);
      raf = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0);
      ctx = gsap.context(() => {
        fileEls.forEach(el => { const src = $('.src', el); if (src) gsap.fromTo(src, { y: 30 }, { y: -30, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }); });
        $$('.proj h2, .readme h1, .contact h2').forEach(h => gsap.fromTo(h, { letterSpacing: '.02em' }, { letterSpacing: '-.02em', ease: 'none', scrollTrigger: { trigger: h, start: 'top 95%', end: 'top 45%', scrub: true } }));
      }, root);
    }

    return () => {
      cleanups.forEach(c => c()); timers.forEach(t => { clearTimeout(t); clearInterval(t); });
      ctx?.revert(); if (raf) gsap.ticker.remove(raf); lenis?.destroy();
    };
  }, [files]);
  return null;
}
