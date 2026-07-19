# Deploy — Design System

The single source of truth for color, type, spacing, and base utilities. Wire these
into the project once; then everything references tokens, never raw values.

## Table of contents
1. Color tokens
2. Typography
3. Spacing & layout
4. `tailwind.config` (v3) / `@theme` (v4)
5. `globals.css` (base + utilities)
6. Fonts with `next/font`
7. The `cn()` helper
8. Signature utilities (glow, grid texture, gradient text, noise)

---

## 1. Color tokens

Deploy is monochrome + one blue accent. Keep it disciplined.

| Token | Hex | Role |
|-------|-----|------|
| `canvas` | `#0A0A0B` | Page background (near-black, slightly warm-cool neutral) |
| `surface` | `#161616` | Cards, elevated panels |
| `surface-2` | `#1E1E20` | Hover/nested surfaces, borders on dark |
| `line` | `#26262A` | Hairline borders, dividers |
| `blue` (brand) | `#2375D7` | Accent — CTAs, links, glows, active states |
| `blue-bright` | `#3B8BEF` | Hover state of blue, brighter glow |
| `blue-soft` | `#2375D7` @ low alpha | Backgrounds of glows/gradients (use `/10`, `/20`) |
| `white` | `#FFFFFF` | Primary text on dark |
| `fg-muted` | `#8A8A8F` | Secondary text |
| `fg-subtle` | `#5A5A60` | Tertiary / captions / metadata |
| `black` (brand) | `#161616` | Deploy logo dark, text on light surfaces |

Rules:
- The blue is an **accent**. Large flat blue fills break the aesthetic — instead use
  blue for text emphasis, thin borders, glows (`box-shadow`/radial gradient), and CTAs.
- Never introduce a second accent hue. Depth comes from the neutral ramp, not more colors.
- Light sections (rare) invert: `#F7F7F8` bg, `#161616` text, blue accent unchanged.

## 2. Typography

Two families max:

- **Display / UI**: a modern geometric-to-neutral grotesk. Good picks:
  `Geist`, `Inter`, `Satoshi`, or `General Sans`. Default to **Geist** (pairs well with
  Next.js, self-hostable, clean and technical).
- **Mono**: for eyebrows, labels, code, metadata, stat units. `Geist Mono` or `JetBrains Mono`.

Type scale (fluid — use `clamp`):

| Name | Size (clamp) | Tracking | Leading | Use |
|------|-------------|----------|---------|-----|
| `display` | `clamp(2.75rem, 7vw, 6.5rem)` | `-0.03em` | `0.95` | Hero headline |
| `h1` | `clamp(2.25rem, 4.5vw, 3.75rem)` | `-0.025em` | `1.02` | Section titles |
| `h2` | `clamp(1.75rem, 3vw, 2.5rem)` | `-0.02em` | `1.1` | Sub-sections |
| `h3` | `clamp(1.25rem, 2vw, 1.5rem)` | `-0.01em` | `1.2` | Card titles |
| `body-lg` | `1.125rem` | `0` | `1.6` | Lead paragraphs |
| `body` | `1rem` | `0` | `1.65` | Default text |
| `eyebrow` | `0.8125rem` | `0.15em` | `1` | Uppercase mono labels |
| `caption` | `0.8125rem` | `0` | `1.5` | Metadata, captions |

Display headings: white with occasional blue emphasis word, or subtle gradient-text.
Keep tracking tight on large sizes — it's what makes big type look premium.

## 3. Spacing & layout

- **Container**: max-width `1240px`, side padding `1.25rem` (mobile) → `2rem` (desktop),
  centered. Optionally a wider `1440px` "bleed" container for hero/imagery.
- **Section vertical rhythm**: `py-24` mobile → `py-32`/`py-40` desktop. Generous.
- **Grid**: 12-col mental model; in practice use Tailwind `grid-cols-*` with `gap-6`/`gap-8`.
- **Radii**: `rounded-xl` (12px) for cards, `rounded-full` for pills/buttons, `rounded-2xl` for large panels.
- **Borders**: 1px `line` color hairlines; they define structure in dark UIs.

## 4. `tailwind.config`

If the project uses **Tailwind v3**, `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0A0B",
        surface: { DEFAULT: "#161616", 2: "#1E1E20" },
        line: "#26262A",
        blue: { DEFAULT: "#2375D7", bright: "#3B8BEF" },
        fg: { muted: "#8A8A8F", subtle: "#5A5A60" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: { tightest: "-0.03em", tighter: "-0.025em" },
      maxWidth: { container: "1240px", bleed: "1440px" },
      boxShadow: {
        glow: "0 0 60px -15px rgba(35,117,215,0.5)",
        "glow-sm": "0 0 30px -10px rgba(35,117,215,0.45)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 30s linear infinite" },
    },
  },
  plugins: [],
} satisfies Config;
```

For **Tailwind v4** (CSS-first), put the same values in an `@theme` block in `globals.css`
using `--color-*`, `--font-*`, `--shadow-*` custom properties instead of the JS config.

## 5. `globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-sans: "Geist", system-ui, sans-serif; /* set by next/font */
  --font-mono: "Geist Mono", ui-monospace, monospace;
}

html { scroll-behavior: smooth; }

body {
  background: #0A0A0B;
  color: #fff;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Selection & focus reflect the brand */
::selection { background: rgba(35,117,215,0.3); }
:focus-visible { outline: 2px solid #2375D7; outline-offset: 2px; }

/* Respect users who don't want motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 6. Fonts with `next/font`

```ts
// app/fonts.ts
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
export const sans = GeistSans;   // exposes --font-geist-sans
export const mono = GeistMono;
```

```tsx
// app/layout.tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Then map `--font-sans: var(--font-geist-sans)` etc. (`npm i geist`). If using Inter/Satoshi
instead, load via `next/font/google` or `next/font/local` and expose the same CSS vars so
nothing else changes.

## 7. The `cn()` helper

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 8. Signature utilities

These small touches carry the futuristic feel. Build as reusable classes/components.

**Blue glow** (behind hero headline, CTAs, key cards) — radial gradient, absolutely
positioned, blurred, low opacity, `pointer-events-none`:

```tsx
<div aria-hidden className="pointer-events-none absolute -z-10 h-[500px] w-[500px]
  rounded-full bg-blue/20 blur-[120px]" />
```

**Grid / dot texture** background (subtle technical grid):

```css
.bg-grid {
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 64px 64px;
  /* fade edges with a mask so it doesn't tile to the borders */
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
}
```

**Gradient text** (use sparingly, e.g. one word in the hero):

```css
.text-gradient {
  background: linear-gradient(180deg, #fff 0%, #b9c6d8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```
For a blue-tinted variant, blend `#fff → #6aa6ee`.

**Hairline card** (the default dark card):

```tsx
<div className="rounded-xl border border-line bg-surface p-6
  transition-colors hover:border-blue/40">
```

**Noise/grain** (optional, adds analog texture): a fixed, very-low-opacity tiled PNG
or an SVG `feTurbulence` overlay at `opacity-[0.03]`, `mix-blend-overlay`,
`pointer-events-none`. Skip on low-end if it costs perf.
