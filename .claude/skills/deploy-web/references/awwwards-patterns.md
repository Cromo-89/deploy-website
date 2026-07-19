# Deploy — Awwwards Reference Patterns & 2026 Trends

Distilled from analyzing Awwwards agency/portfolio winners and 2026 design-trend
coverage. Use this to keep the Deploy site current and award-worthy. These are
*patterns to apply*, filtered for our technical-minimalist/dark aesthetic — not a
mandate to use every trend (restraint is the brand).

## Studios worth studying (open these for reference)

Award-winning agency/dev studios with the sensibility we want:
Lusion, Noomo Agency, Locomotive, WILD, BASED, SymbolStudio, tile., cloudstudio,
Studio Modular, six2eight. They share: monochrome + one accent, oversized type,
buttery scroll motion, and heavy craft on micro-detail.

## The recurring winning patterns

1. **Type IS the hero.** Oversized expressive headlines that fill the viewport,
   sometimes clipped by the browser edge. Little/no stock hero imagery. → Our hero
   leads with big display type + one blue emphasis word, not a photo.
2. **Kinetic typography.** Type that moves on load/scroll/hover — line-clip reveals,
   weight shifts, horizontal drift. → Use `RevealText`, marquees; keep it subtle.
3. **Scroll-driven storytelling.** Content reveals as chapters; progress indicators;
   parallax depth. Prefer CSS scroll-driven animations where supported, Framer Motion
   `useScroll` otherwise. → Sections reveal in sequence; process/work scrub on scroll.
4. **Mixed scroll direction.** A vertical page that slides sideways through a gallery
   or timeline. Strong signature move. → Good candidate for "Selected work" or "Process"
   (horizontal pinned scroll). Use once, deliberately — it's a wow moment, not a default.
5. **Custom cursor.** A cursor that morphs/scales over interactive elements and labels
   actions ("Ver caso", "Drag"). → Optional; only if it stays snappy and hides on touch.
6. **Buttery smooth scrolling.** Many winners use smooth-scroll (Lenis) for weighted,
   inertial scrolling that makes parallax feel premium. → Consider adding `lenis` /
   `@studio-freight/lenis` if the client wants that heavier feel; test perf first.
7. **Micro-detail craft.** Magnetic buttons, hover underlines that wipe, grayscale→color
   images, hairline borders, tasteful grain/noise, in-view number count-ups. These small
   things are what juries reward. → Already covered in animations.md; apply liberally.
8. **Loader / intro moment.** A short branded preloader (isotype + progress) that hands
   off into a hero reveal. → Keep under ~1.5s; skip on repeat visits; never block content long.
9. **Broken/editorial grid + huge negative space.** Asymmetric layouts, generous
   whitespace, confident alignment. → Vary section rhythm; don't make every section a
   centered 3-col grid.
10. **Case studies as narrative.** Work isn't a thumbnail wall — each project is a
    story with problem → approach → result → stack. → Build a proper case-study template.

## What to deliberately AVOID (anti-patterns for Deploy)

- Motion for motion's sake, bouncy/elastic easing, everything animating at once.
- Large flat blue fills (breaks the accent discipline).
- Slow loaders or scroll-jacking that fights the user.
- Effects that tank performance or ignore `prefers-reduced-motion` — juries and users
  both penalize this. Craft includes restraint and accessibility.

## Optional dependencies to consider (only if the feel calls for it)

- `lenis` — smooth/inertial scrolling.
- `@react-three/fiber` + `three` — a subtle WebGL hero element (particles, shader blob).
  High effort/perf cost; only if we want a true showpiece hero.
- `split-type` — fine-grained per-character/line text animation beyond word-splitting.

Reach for these one at a time, measure the bundle and FPS, and keep the fallback clean.
