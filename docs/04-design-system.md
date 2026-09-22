# 04 — Design system

Tokens live in [`../design/tokens.json`](../design/tokens.json). This doc explains them. **Everything here is `[assumed]` until the Phase 2 prototype is signed off.**

## Personality
**Precise, warm, alive.** It should feel like an engineer's instrument panel lit by morning light. There's quiet structure (the dot grid), one confident accent, and motion that means something. It should not feel like a neon-gradient "dev portfolio" template.

Three words to test every screen against: **proof · craft · roots.**

## Color

Dark is the default theme and light is a first-class alternative. Palette name: **Ink & Marigold**. Marigold is the flower of Tamil festivals and doorsteps, and it's the one accent. Teal is secondary and is used for "system/data" things like diagram lines and live indicators.

### Dark (default)
| Token | Hex | Use | Contrast vs bg |
|---|---|---|---|
| `bg` | `#0B0D10` | Page | — |
| `surface` | `#14171C` | Cards, panels | — |
| `raised` | `#1C2027` | Popovers, hover | — |
| `line` | `#2A2F38` | Borders, grid dots (idle) | decorative |
| `text` | `#EDE8DE` | Body + headings (warm paper, not pure white) | **15.93** |
| `muted` | `#A09B91` | Secondary text | **7.03** |
| `faint` | `#6E6A63` | Captions ≥ 18 px, disabled, decorative only | 3.62 ⚠ not for body |
| `accent` | `#F2A93B` | Marigold: primary actions, focus, highlights | **9.74** |
| `accent-2` | `#45C1B6` | Teal: diagram flows, live/data states | **8.85** |
| `signal` | `#E8604A` | Kumkum red: errors, "incident" moments | **5.75** |
| `on-accent` | `#0B0D10` | Text on marigold buttons | **9.74** |

### Light
| Token | Hex | Contrast vs bg |
|---|---|---|
| `bg` | `#F4F0E8` (rice-paper) | — |
| `surface` | `#FBF8F2` | — |
| `raised` | `#FFFFFF` | — |
| `line` | `#DDD6C8` | decorative |
| `text` | `#15171B` | **15.79** |
| `muted` | `#5A564E` | **6.42** |
| `faint` | `#8A857B` | 3.23 ⚠ decorative / large only |
| `accent` | `#9A5B06` (deep marigold, darkened for text contrast) | **4.77** |
| `accent-2` | `#0B6F68` | **5.30** |
| `signal` | `#B3321F` | **5.45** |
| `on-accent` | `#FBF8F2` on `accent` | **5.12** |

All contrast ratios were computed with the WCAG 2.x formula on 2026-09-22. Every body-text pair passes AA (≥ 4.5). The `faint` token is only for large text or non-text use in both themes. `scripts/check-contrast` will enforce this in CI.

**Color rules**
- Accent covers at most ~5% of any screen. If everything glows, nothing does.
- Teal only means "system": data, flows, live. Never use it for decoration.
- No gradients on text. The single allowed gradient is the marigold "sunrise" glow behind the hero, at ≤ 12% opacity.

## Typography `[assumed]`
| Role | Family | Why |
|---|---|---|
| Display | **Fraunces** (variable; opsz, SOFT, WONK axes) | Warm, characterful serif with optical sizing. Big headlines feel editorial, not templated |
| Text / UI | **Geist** (variable) | Neutral and highly legible, with good tabular figures for metrics |
| Mono | **Geist Mono** | Code, metric values, the search box, "console" elements |
| Tamil (v2) | **Noto Sans Tamil** / **Mukta Malar** | If the Tamil version happens |

Fluid type scale (clamp, 360 → 1440 px viewport):
| Token | Size | Line height | Tracking |
|---|---|---|---|
| `display-xl` | 56 → 128 px | 0.95 | −0.03em |
| `display` | 40 → 80 px | 1.0 | −0.025em |
| `h1` | 32 → 56 px | 1.05 | −0.02em |
| `h2` | 26 → 40 px | 1.1 | −0.015em |
| `h3` | 20 → 26 px | 1.25 | −0.01em |
| `body-lg` | 18 → 20 px | 1.6 | 0 |
| `body` | 16 → 17 px | 1.65 | 0 |
| `small` | 14 px | 1.5 | 0.005em |
| `mono-sm` | 13 px | 1.5 | 0 |
| `eyebrow` | 12 px, uppercase, mono | 1.2 | 0.12em |

Measure: 60–72ch for prose. Metrics always use `font-variant-numeric: tabular-nums`.

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
