---
name: deploy-web
description: >-
  Build and extend the marketing/informational website for Deploy, a software &
  web/app development agency, with an awards-quality (Awwwards-style) technical-minimalist
  aesthetic. Use this skill WHENEVER working on the Deploy site — creating or editing any
  page, section, or component (hero, services, work/portfolio, process, team, contact,
  footer, navbar), setting up the Next.js + Tailwind + Framer Motion project, adding
  scroll-based animations or micro-interactions, or making styling/branding decisions.
  Trigger even if the user just says "add a section", "make the hero", "the landing",
  "our site", or names Deploy — this skill holds the brand palette, design system,
  animation patterns, and section blueprints that keep everything consistent.
---

# Deploy — Website Builder

You are building the website for **Deploy**, an agency that builds software, web
apps, and mobile apps. The site is **informational/marketing** (not a product app):
it sells trust and craft. The bar is **Awwwards agency quality** — the kind of site
that wins Site of the Day. Every section should feel intentional, fast, and alive.

## Aesthetic direction (non-negotiable feel)

**Technical-minimalist / futuristic.** Think a senior dev studio, not a flashy
marketing shop. The rules that produce this feel:

- **Dark-first.** Deep near-black canvas (`#0A0A0B`/`#161616`), generous negative space.
- **Big, confident typography.** Oversized display headings, tight tracking, low line-height.
- **Restraint with color.** The blue `#2375D7` is an *accent*, used sparingly for
  emphasis, glows, and interactive states — never as large flat fills. Most of the page
  is monochrome; the blue punctuates.
- **Precision over spectacle.** Animations are smooth, subtle, and purposeful
  (reveals, parallax, magnetic hovers) — never bouncy or gimmicky. Ease curves matter.
- **Grid & alignment discipline.** Everything sits on a consistent grid with a max
  content width. Misalignment reads as amateur.
- **Performance is part of the design.** 60fps animations, no layout shift, fast LCP.

When in doubt, remove rather than add. Whitespace and one perfect detail beat five
competing effects.

## Brand assets

Logos live in this skill's `assets/` folder (source of truth):

- `logo-deploy-blue-white.svg` — wordmark for dark backgrounds (use most of the time)
- `logo-deploy-blue-black.svg` — wordmark for light backgrounds
- `isotype-blue.svg` — the isotype/mark alone (favicon, loader, compact navbar, footer)

Copy these into the project's `public/` when scaffolding. Never redraw or recolor them.

## Core palette

Full tokens in `references/design-system.md`. The essentials:

| Token | Value | Use |
|-------|-------|-----|
| Brand blue | `#2375D7` | Accent, CTAs, glows, links, active states |
| Near-black | `#161616` | Elevated surfaces, cards |
| Canvas | `#0A0A0B` | Page background |
| White | `#FFFFFF` | Primary text on dark |
| Muted | `#8A8A8F` | Secondary text |

## Tech stack (default)

- **Next.js (App Router, TypeScript)** — SSR/SSG for SEO, image optimization, easy Vercel deploy.
- **Tailwind CSS** — with the Deploy tokens wired into `tailwind.config`.
- **Framer Motion** — reveals, micro-interactions, page transitions, layout animations.
- **next/font** — self-hosted fonts, no layout shift (see design system for choices).
- **Lucide** icons (or custom SVG) — thin, geometric, matches the aesthetic.

Only reach for GSAP/ScrollTrigger if a genuinely complex pinned/scrubbed scroll
sequence is needed that Framer Motion's `useScroll` can't express cleanly. Prefer
Framer Motion first — one animation library keeps the bundle lean.

Deploy target is **Vercel**. Keep everything static/SSG where possible.

## Workflow

### Starting from scratch (empty project)

1. Scaffold: `npx create-next-app@latest deploy-web --typescript --tailwind --app --eslint`
   (use `--yes` / accept defaults; no `src/` dir needed but fine either way).
2. Install: `npm i framer-motion lucide-react clsx tailwind-merge`.
3. Wire the design system: apply `references/design-system.md` to `tailwind.config`,
   `globals.css`, and set up `next/font`. Copy logos into `public/`.
4. Create the shared primitives first (see below), then build sections.
5. Assemble the landing page from sections, then add sub-pages if needed.

### Extending an existing project

Read `tailwind.config` and `globals.css` first to reuse existing tokens/utilities —
never hardcode a hex that already has a token. Match the established component
patterns and file structure. Then build the requested section/component.

### Build order for a section

For any new section: consult `references/sections.md` for the blueprint (layout,
copy angle, animation), build it responsive-first (mobile → desktop), wire the
animation from `references/animations.md`, then verify against the Quality checklist.

## Shared primitives (build these once, reuse everywhere)

Consistency comes from a small set of reused building blocks. Create them early:

- **`<Section>`** — vertical rhythm + max-width container + optional eyebrow label.
- **`<Reveal>`** — wraps children, fades/translates them in on scroll (Framer Motion
  `whileInView`). The default entrance for almost everything.
- **`<Button>`** — primary (blue), ghost, and link variants with a consistent hover.
- **`<Eyebrow>`** — the small monospace/uppercase label above headings (very "agency").
- **`cn()`** — the `clsx` + `tailwind-merge` helper.

These live in `references/animations.md` and `references/design-system.md` with copy-paste code.

## Reference files

Read the relevant one before building — they hold the real detail:

- **`references/design-system.md`** — full color/type/spacing tokens, `tailwind.config`,
  `globals.css`, font setup, the `cn()` helper, glow/gradient/grid-texture utilities.
- **`references/animations.md`** — Framer Motion patterns: `<Reveal>`, staggered lists,
  parallax with `useScroll`, magnetic buttons, marquee, count-up, text-reveal, page
  transitions, and the standard easing curves. Includes the reduced-motion rule.
- **`references/sections.md`** — blueprints for each agency section (navbar, hero,
  services, work/case studies, process, stats, team, testimonials, CTA, contact,
  footer): layout, suggested Deploy copy, and which animation to apply.
- **`references/awwwards-patterns.md`** — the recurring award-winning patterns and 2026
  trends (kinetic type, scroll storytelling, mixed scroll direction, custom cursor,
  smooth scroll, loaders), plus anti-patterns to avoid and optional deps. Read this when
  deciding how ambitious a section's motion should be or when the user wants "more wow".

## Quality checklist (verify before calling a section done)

- **Responsive**: looks intentional at 375px, 768px, 1440px. No horizontal scroll.
- **Motion**: entrances are smooth, staggered where there are lists, and respect
  `prefers-reduced-motion`. Nothing janky on scroll.
- **Tokens only**: colors/spacing/radii come from Tailwind tokens, not raw hexes.
- **Type hierarchy**: clear jump from display → heading → body → muted. Tight tracking on display.
- **Accent discipline**: blue is used as punctuation, not filling large areas.
- **A11y**: semantic tags, `alt` text, focus-visible states, sufficient contrast, real headings.
- **Performance**: `next/image` for imagery, no CLS, animations are transform/opacity only.
- **Copy**: concise, confident, technical. No filler lorem ipsum in shipped sections.

If you can't yet verify visually, say so and offer to run the dev server / screenshot.
