# 04 — Design system

Tokens live in [`../design/tokens.json`](../design/tokens.json). This doc explains them. **Everything here is `[assumed]` until the Phase 2 prototype is signed off. The palette and type were revised on 2026-09-22 before the prototype was built.**

## Personality
**Precise, warm, alive.** It should feel like an engineer's instrument panel lit by morning light. There's quiet structure (the dot grid), one confident accent, and motion that means something. It should not feel like a neon-gradient "dev portfolio" template.

Three words to test every screen against: **proof · craft · roots.**

## Color: "Threshold" (revised 2026-09-22, D-003)

The palette comes straight from the kolam's own materials: **white rice-flour lines on a freshly washed, dark threshold floor, with marigold placed at the center.** Dark is the default. The first draft (warm cream with a serif) was dropped because it's the most common AI-generated portfolio look.

### Dark (default)
| Token | Hex | Use | Contrast vs bg |
|---|---|---|---|
| `bg` | `#10130F` | Wet threshold floor: green-black, not neutral | — |
| `surface` | `#171B16` | Cards, panels | — |
| `raised` | `#1F241E` | Popovers, hover | — |
| `line` | `#2C332B` | Borders, idle grid dots | decorative |
| `text` | `#ECE9DF` | Rice-flour white | **15.41** |
| `muted` | `#A4A697` | Secondary text | **7.56** |
| `faint` | `#72766B` | Large/decorative only | 4.03 |
| `accent` | `#F2A93B` | Marigold: actions, focus, highlights | **9.37** |
| `accent-2` | `#4CC3AE` | Teal: system flows, data, live | **8.67** |
| `signal` | `#EC6A52` | Kumkum: errors, incidents | **6.02** |
| `on-accent` | `#10130F` | Text on marigold | **9.37** |

### Light
| Token | Hex | Contrast vs bg |
|---|---|---|
| `bg` | `#ECEEE7` (limestone, green-grey) | — |
| `surface` | `#F6F7F2` | — |
| `raised` | `#FFFFFF` | — |
| `line` | `#D3D7CB` | decorative |
| `text` | `#141712` | **15.46** |
| `muted` | `#51564B` | **6.45** |
| `faint` | `#80857A` | 3.23 (large/decorative only) |
| `accent` | `#8F5304` (deep marigold) | **5.27** |
| `accent-2` | `#08665A` | **5.87** |
| `signal` | `#AE2F1C` | **5.57** |
| `on-accent` | `#F6F7F2` on accent | **5.73** |

All ratios use the WCAG 2.x formula. Every text pair passes AA, and `faint` is never used for body text.

**Color rules**
- Accent covers at most ~5% of any screen. Marigold sits at the center of a kolam, not all over it.
- Teal only means "system": flows, data, live. Never use it for decoration.
- No gradients on text. The one allowed glow is a faint marigold bloom behind the hero kolam.

## Typography (revised 2026-09-22)
| Role | Family | Why |
|---|---|---|
| Display | **Anek Latin** (variable: width 75–125, weight 100–800), by Ek Type | An Indian foundry, and the same family has **Anek Tamil**, so one voice covers both scripts. Condensed-heavy headlines, wide for small labels |
| Tamil | **Anek Tamil** | Small Tamil labels now (கோலம், புள்ளி), a full Tamil version later |
| Text / UI | **Geist** | Neutral and legible, with good tabular figures |
| Mono | **Geist Mono** | Search box, metrics, code, "console" elements |

Fluid scale unchanged (see tokens). Display headlines are set at width ~80 and weight 700–800, with tight tracking.

## Space, layout, shape
- **Base unit 4 px.** Space scale: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192.
- **The pulli grid is the layout grid.** The dot pitch is 24 px on mobile and 32 px on desktop, and major layout lines snap to dot columns. That's why the background and content feel related.
- Container: max 1240 px; gutters 16 px (mobile) → 40 px (desktop). 12 columns on desktop, 4 on mobile.
- Radius: `sm 6`, `md 12`, `lg 20`, `pill 999`. Cards use `lg`, chips use `pill`.
- Elevation: shadows are nearly invisible on dark. Depth comes from the `surface`/`raised` steps plus a 1 px `line` border and a faint inner top highlight.

## Motion
Principles, from the apple-design and animations.dev guidance:
1. **Physical, interruptible.** Springs, not durations, for anything the user drives. You can grab it mid-motion.
2. **Motion explains.** Every animation shows a cause, a relationship or a change of state. Nothing is decorative-only except the ambient grid.
3. **Fast in, gentle out.** UI feedback takes under 150 ms. Page-level transitions take 350–600 ms.

| Token | Value | Use |
|---|---|---|
| `spring-snappy` | stiffness 500, damping 35 | Press, toggle, chip |
| `spring-smooth` | stiffness 260, damping 30 | Cards, sheets, layout |
| `spring-gentle` | stiffness 120, damping 20 | Large hero elements |
| `ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | Non-spring entrances |
| `dur-instant` | 100 ms | Hover color |
| `dur-fast` | 180 ms | Small UI |
| `dur-base` | 320 ms | Panels |
| `dur-slow` | 600 ms | Section reveals |
| `dur-draw` | 1200 ms | Kolam line drawing |

**Reduced motion:** all transforms turn into opacity fades of ≤ 150 ms, the kolam becomes a static drawn image, and scroll-scrubbed sequences become stepped states.

## The kolam motif — rules
- **Idle:** a dot grid in `line` color at about 40% opacity. Dots near the cursor/touch brighten slightly within a 120 px radius. It's a subtle "field", not a spotlight.
- **Draw:** in case studies, architecture diagrams are drawn as continuous kolam-style curves between dots in `accent-2`, with a `dur-draw` stroke animation triggered as the section enters the viewport.
- **Signature:** a small, real kolam pattern (a 5×5 pulli with a sikku loop) is the logo mark / favicon. `[open]` Should it be generated in code or hand-drawn?
- **Never** use it as clip-art or a stock mandala. It stays geometric and continuous, and it's always generated from the grid.

## Iconography
Lucide icons at 1.5 px stroke to match the kolam line weight. Custom glyphs are drawn on the same 24 px grid.

## Imagery
- Device mockups of the Massclick app are drawn as clean frames with real screenshots. Screenshots already exist in `D:\dev_abishek\app-ss\` `[ask before use]`.
- No stock photos. The one exception is a real portrait of Abishek `[open]`.
