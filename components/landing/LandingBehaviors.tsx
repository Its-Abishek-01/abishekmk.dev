'use client';
// Interactions for the landing page, ported from the LOCKED prototype (prototype/landing-v02.html).
// The markup is server-rendered (lib/landing/markup.ts); this only enhances it.
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const WA = '919345161419';
const wa = (t: string) => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t);

interface BizType { label: string; c: string; url: string; what: string; site: string; app: string }
const TYPES: BizType[] = [
  { label: 'Clinic', c: '#0B7A6C', url: 'yourclinic.in', what: 'appointment booking app + website',
    site: '<div class="m-hero"></div><span class="m-hb">Care that fits your day.</span><span class="m-p">Book a visit with Dr. Priya or Dr. Karthik in under a minute.</span><div class="m-row"><span class="m-btn">Book appointment</span><span class="m-tag">Open today · 9–8</span></div><div class="m-grid three"><div class="m-tile"></div><div class="m-tile"></div><div class="m-tile"></div></div>',
    app: '<span class="m-h">Book a doctor</span><div class="m-card"><i></i><div><b>Dr. Priya</b><small>Dentist · 6 slots</small></div><span class="m-tag">Book</span></div><div class="m-card"><i></i><div><b>Dr. Karthik</b><small>General · 4 slots</small></div><span class="m-tag">Book</span></div><div class="m-slots"><span>9:30</span><span class="on">10:00</span><span>10:30</span><span>11:00</span></div><span class="m-btn">Confirm 10:00</span>' },
  { label: 'Restaurant', c: '#D9481F', url: 'yourrestaurant.in', what: 'menu and ordering app + website',
    site: '<div class="m-hero"></div><span class="m-hb">From our kitchen to your door.</span><span class="m-p">Order online or reserve a table for tonight.</span><div class="m-row"><span class="m-btn">Order now</span><span class="m-tag">Delivery in 30 min</span></div><div class="m-grid three"><div class="m-tile"></div><div class="m-tile"></div><div class="m-tile"></div></div>',
    app: '<span class="m-h">Today’s menu</span><div class="m-card"><i></i><div><b>Veg meals</b><small>₹120 · bestseller</small></div><span class="m-tag">+ Add</span></div><div class="m-card"><i></i><div><b>Chicken biryani</b><small>₹180</small></div><span class="m-tag">+ Add</span></div><div class="m-card"><i></i><div><b>Filter coffee</b><small>₹30</small></div><span class="m-tag">+ Add</span></div><span class="m-btn">Checkout · 2 items</span>' },
  { label: 'Shop', c: '#7A4DD8', url: 'yourshop.in', what: 'online store app + website',
    site: '<div class="m-hero"></div><span class="m-hb">The new collection is here.</span><span class="m-p">Shop online, pay safely, pick up in store or get it delivered.</span><div class="m-row"><span class="m-btn">Shop now</span><span class="m-tag">Free delivery above ₹999</span></div><div class="m-grid three"><div class="m-tile"></div><div class="m-tile"></div><div class="m-tile"></div></div>',
    app: '<span class="m-h">New arrivals</span><div class="m-grid"><div class="m-tile"></div><div class="m-tile"></div><div class="m-tile"></div><div class="m-tile"></div></div><span class="m-btn">View cart · 3</span>' },
  { label: 'School', c: '#1F63D8', url: 'yourschool.edu.in', what: 'parent app + school website',
    site: '<div class="m-hero"></div><span class="m-hb">Admissions open for 2027.</span><span class="m-p">Classes, results, events and notices in one place for parents.</span><div class="m-row"><span class="m-btn">Apply now</span><span class="m-tag">Notice board</span></div><div class="m-grid three"><div class="m-tile"></div><div class="m-tile"></div><div class="m-tile"></div></div>',
    app: '<span class="m-h">Class 8-B</span><div class="m-card"><i></i><div><b>Attendance</b><small>Present today</small></div><span class="m-tag">✓</span></div><div class="m-card"><i></i><div><b>Homework</b><small>Maths · page 42</small></div><span class="m-tag">New</span></div><div class="m-card"><i></i><div><b>Sports day</b><small>Friday · 9 am</small></div></div>' },
  { label: 'Taxi & travel', c: '#C46A0A', url: 'yourtravels.in', what: 'booking app with live tracking',
    site: '<div class="m-hero"></div><span class="m-hb">Rides and tours across Tamil Nadu.</span><span class="m-p">Book a cab, an outstation trip or a temple tour in a few taps.</span><div class="m-row"><span class="m-btn">Book a ride</span><span class="m-tag">24 × 7</span></div><div class="m-grid three"><div class="m-tile"></div><div class="m-tile"></div><div class="m-tile"></div></div>',
    app: '<span class="m-h">Where to?</span><div class="m-map"><i style="left:28%;top:36%"></i><i style="left:68%;top:64%"></i></div><div class="m-card"><i></i><div><b>Captain on the way</b><small>4 min away</small></div></div><span class="m-btn">Track live</span>' },
  { label: 'Startup', c: '#0E8F5F', url: 'yourstartup.app', what: 'MVP app + admin dashboard',
    site: '<span class="m-hb">Dashboard</span><div class="m-bars"><i style="height:40%"></i><i style="height:62%"></i><i style="height:48%"></i><i style="height:80%"></i><i style="height:66%"></i><i style="height:92%"></i></div><div class="m-grid three"><div class="m-tile"></div><div class="m-tile"></div><div class="m-tile"></div></div><span class="m-p">Users, orders and revenue, live.</span>',
    app: '<span class="m-h">Welcome back</span><div class="m-card"><i></i><div><b>Your plan</b><small>Pro · active</small></div></div><div class="m-bars"><i style="height:50%"></i><i style="height:70%"></i><i style="height:60%"></i><i style="height:90%"></i></div><span class="m-btn">Get started</span>' },
];

export default function LandingBehaviors() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.lp');
    if (!root) return;
    const $ = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];
    const timers: number[] = [];

    /* pick your business */
    const typesEl = $('#types'), site = $('#site'), app = $('#app'), url = $('#url'), what = $('#what'), phone = $('#heroPhone');
    let cur = -1, picked = false;
    if (typesEl && site && app && url && what && phone) {
      typesEl.innerHTML = TYPES.map((t, i) => '<button type="button" data-i="' + i + '" aria-pressed="' + (i === 0) + '" style="--c:' + t.c + '"><i></i>' + t.label + '</button>').join('');
      const show = (i: number) => {
        if (i === cur) return; cur = i; const t = TYPES[i];
        typesEl.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.i) === i)));
        [site, app, url].forEach(e => e.classList.add('out'));
        timers.push(window.setTimeout(() => {
          site.innerHTML = t.site; app.innerHTML = t.app; url.textContent = t.url;
          site.style.setProperty('--c', t.c); app.style.setProperty('--c', t.c);
          phone.querySelector<HTMLElement>('.appnav')?.style.setProperty('--c', t.c);
          what.innerHTML = '<b>' + t.label + '</b> · ' + t.what;
          [site, app, url].forEach(e => e.classList.remove('out'));
        }, reduce ? 0 : 240));
      };
      const onPick = (e: Event) => { const b = (e.target as HTMLElement).closest('button'); if (!b) return; picked = true; show(Number(b.dataset.i)); };
      typesEl.addEventListener('click', onPick); cleanups.push(() => typesEl.removeEventListener('click', onPick));
      show(0);
      if (!reduce) { const iv = window.setInterval(() => { if (!picked && !document.hidden) show((cur + 1) % TYPES.length); }, 3400); cleanups.push(() => clearInterval(iv)); }
    }

    /* uptime bars (illustrative) */
    const up = $('.uptime'); if (up) up.innerHTML = Array.from({ length: 30 }, () => '<i></i>').join('');

    /* how it works: pinned phone follows the step */
    const steps = $$('.step'), screens = $$('.sc'), pct = $('#pct'), bbar = $('#bbar');
    let buildIv = 0;
    const setStep = (i: number) => {
      steps.forEach(s => s.classList.toggle('on', Number(s.dataset.s) === i));
      screens.forEach(s => s.classList.toggle('on', Number(s.dataset.s) === i));
      if (i === 2 && !reduce && bbar && pct) {
        let w = 20; bbar.style.setProperty('--w', w + '%'); clearInterval(buildIv);
        buildIv = window.setInterval(() => { w = Math.min(100, w + 10); bbar.style.setProperty('--w', w + '%'); pct.textContent = w + '%'; if (w >= 100) clearInterval(buildIv); }, 420);
      }
    };
    const stepIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.s)); }), { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach(s => stepIO.observe(s)); setStep(0);
    cleanups.push(() => { stepIO.disconnect(); clearInterval(buildIv); });

    /* statement words */
    const st = $('#statement'), KEY = ['one', 'developer,', 'store.', 'massclick', 'vandizone'];
    if (st && !st.dataset.split) {
      st.dataset.split = '1';
      st.innerHTML = (st.textContent || '').split(' ').map(w => '<span class="w' + (KEY.includes(w.toLowerCase()) ? ' k' : '') + '">' + w + '</span>').join(' ');
    }

    /* enquiry: saved to the server (when configured), then WhatsApp or email opens with the details */
    const form = $<HTMLFormElement>('#enq');
    let via = 'wa';
    const setVia = (e: Event) => { const b = (e.target as HTMLElement).closest<HTMLElement>('[data-via]'); if (b) via = b.dataset.via || 'wa'; };
    const onSubmit = (e: Event) => {
      e.preventDefault(); if (!form) return;
      const f = new FormData(form), note = $('#enqNote');
      const name = String(f.get('name') || '').trim(), ph = String(f.get('phone') || '').trim();
      if (!name || !ph) { if (note) { note.textContent = 'Please add your name and a phone number so I can reply.'; note.style.color = '#B3321F'; } (form.elements.namedItem(name ? 'phone' : 'name') as HTMLInputElement | null)?.focus(); return; }
      if (note) note.style.color = '';
      const needs = f.getAll('need').map(String);
      const payload = { name, phone: ph, business: String(f.get('biz') || ''), needs, when: String(f.get('when') || ''), message: String(f.get('msg') || ''), via };
      fetch('/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
      const needText = needs.join(', ') || 'Not sure yet';
      const text = 'Hi Abishek, I’m ' + name + '.\nBusiness: ' + (payload.business || '-') + '\nI need: ' + needText + '\nWhen: ' + payload.when + '\nPhone: ' + ph + '\n\n' + payload.message;
      if (via === 'mail') location.href = 'mailto:abishek.mk.01@gmail.com?subject=' + encodeURIComponent('Project enquiry: ' + needText) + '&body=' + encodeURIComponent(text);
      else window.open(wa(text), '_blank', 'noopener');
      if (note) note.textContent = 'Your message is ready. Press send in the app that just opened.';
    };
    form?.addEventListener('click', setVia); form?.addEventListener('submit', onSubmit);
    cleanups.push(() => { form?.removeEventListener('click', setVia); form?.removeEventListener('submit', onSubmit); });

    /* floating WhatsApp */
    const fab = $('#fab');
    const onScroll = () => fab?.classList.toggle('show', scrollY > innerHeight * .9);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    cleanups.push(() => removeEventListener('scroll', onScroll));

    if (reduce) {
      $$('#statement .w').forEach(w => { w.style.color = w.classList.contains('k') ? '#F2A93B' : '#F5F5F2'; });
      return () => { cleanups.forEach(c => c()); timers.forEach(clearTimeout); };
    }

    /* motion */
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: .1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0);
    const onAnchor = (e: Event) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.dataset.wa !== undefined) return;
      const id = a.getAttribute('href') || ''; if (id.length < 2) return;
      e.preventDefault(); lenis.scrollTo(id === '#top' ? 0 : id, { offset: -52, duration: 1.4 });
    };
    root.addEventListener('click', onAnchor);

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero h1', { y: 16, opacity: 0, duration: .9 })
        .from('.hero .display', { y: 40, opacity: 0, duration: 1.2 }, .06)
        .from('.hero .intro, .hero .pills', { y: 24, opacity: 0, duration: 1, stagger: .08 }, .2)
        .from('#stagewrap', { y: 120, opacity: 0, duration: 1.6 }, .25)
        .from('#heroPhone', { y: 80, x: 40, duration: 1.6 }, .4);
      gsap.fromTo('#stagewrap', { scale: 1.1, transformOrigin: '50% 0%' }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#stagewrap', start: 'top 90%', end: 'top 20%', scrub: true } });
      gsap.to('#heroPhone', { y: -60, ease: 'none', scrollTrigger: { trigger: '#stagewrap', start: 'top 60%', end: 'bottom top', scrub: true } });
      const rise = (sel: gsap.TweenTarget, trig: Element | string, extra: gsap.TweenVars = {}) =>
        gsap.from(sel, Object.assign({ y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: trig, start: 'top 85%' } }, extra));
      $$('.w-text.center').forEach(h => rise(h.children, h));
      rise('.tile', '.bento', { y: 80 });
      rise('.chooser', '.chooser'); rise('.trust span', '.trust', { y: 20, stagger: .06 });
      $$('.proj').forEach(p => {
        const first = p.querySelector('div'); if (first) rise(first, p);
        gsap.from(p, { scale: .94, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'top 40%', scrub: true } });
      });
      gsap.to('.p-vz .ph1', { y: -30, rotate: -10, ease: 'none', scrollTrigger: { trigger: '.p-vz', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.p-vz .ph2', { y: 30, rotate: 9, ease: 'none', scrollTrigger: { trigger: '.p-vz', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from('.p-mc .floaty', { y: 40, opacity: 0, stagger: .12, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.p-mc', start: 'top 60%' } });
      gsap.to('.p-mc .floaty', { y: (i: number) => [-30, 20, -20][i] ?? 0, ease: 'none', scrollTrigger: { trigger: '.p-mc', start: 'top bottom', end: 'bottom top', scrub: true } });
      rise('.why > div', '.why'); rise('.areas span', '.areas', { y: 20, stagger: .04 });
      rise('.dev > *', '.dev', { y: 40 });
      rise('.faq details', '.faq', { y: 24, stagger: .05 });
      rise('.cc', '.cards', { x: -30, y: 0 }); rise('form.q', 'form.q');
      gsap.to('#statement .w', { color: (_i: number, el: Element) => el.classList.contains('k') ? '#F2A93B' : '#F5F5F2', stagger: .1, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top 70%', end: 'bottom 60%', scrub: true } });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    addEventListener('load', refresh);

    return () => {
      cleanups.forEach(c => c()); timers.forEach(clearTimeout);
      root.removeEventListener('click', onAnchor); removeEventListener('load', refresh);
      ctx.revert(); gsap.ticker.remove(raf); lenis.destroy();
    };
  }, []);
  return null;
}
