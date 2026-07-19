# Deploy — Animation & Motion Patterns

Motion is what separates an Awwwards site from a template. For Deploy the motion
language is **precise, smooth, and restrained**: content reveals as you scroll,
hovers respond magnetically, numbers count up, marquees drift. Nothing bounces or
spins for no reason. Framer Motion is the default engine.

## Table of contents
1. Golden rules
2. Easing curves
3. `<Reveal>` — the default entrance
4. Staggered lists / grids
5. Text reveal (line/word by line)
6. Parallax with `useScroll`
7. Sticky / scrub scroll sequences
8. Magnetic button + hover micro-interactions
9. Marquee (logo/tech strip)
10. Count-up stats
11. Page / route transitions
12. Custom cursor (optional)
13. Reduced motion

---

## 1. Golden rules

- **Animate only `transform` and `opacity`.** They're GPU-composited → 60fps. Avoid
  animating `width`, `top`, `box-shadow`, `filter` on scroll.
- **Reveal once.** Scroll entrances use `viewport={{ once: true }}` — re-triggering on
  every scroll-by feels cheap and distracting.
- **Distances are small.** Entrances translate ~16–32px, not 100px+. Subtlety reads as premium.
- **Durations 0.4–0.8s.** Faster feels snappy/technical; slower drags.
- **Stagger lists** by 0.06–0.1s per item so grids cascade instead of popping at once.
- **Always honor `prefers-reduced-motion`** (see §13).

## 2. Easing curves

Define once and reuse — consistent easing is a signature.

```ts
// lib/motion.ts
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,    // "expo out" — the house curve, most reveals
  inOut: [0.65, 0, 0.35, 1] as const, // smooth both ends — parallax, transitions
  soft: [0.25, 0.1, 0.25, 1] as const,
};

export const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
};
```

## 3. `<Reveal>` — the default entrance

The workhorse. Wrap almost anything that should fade+rise in on scroll.

```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

export function Reveal({
  children, delay = 0, y = 24, className,
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  );
}
```

## 4. Staggered lists / grids

Parent orchestrates, children inherit. Use for service cards, work grid, stats.

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};

<motion.ul variants={container} initial="hidden" whileInView="show"
  viewport={{ once: true, margin: "-10%" }} className="grid gap-6 md:grid-cols-3">
  {items.map((it) => (
    <motion.li key={it.id} variants={item}>{/* card */}</motion.li>
  ))}
</motion.ul>
```

## 5. Text reveal (line / word by line)

For hero headlines and big section titles — words rise from a clipped baseline.

```tsx
function RevealText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span className="inline-block"
            initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: ease.out, delay: i * 0.05 }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}
```

Keep the delay small; long headlines shouldn't take 3s to finish.

## 6. Parallax with `useScroll`

Subtle depth on images, blobs, background layers. Move ~5–15% of scroll distance.

```tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return <motion.div ref={ref} style={{ y }}>{children}</motion.div>;
}
```

## 7. Sticky / scrub scroll sequences

For a hero or process section that pins while content scrubs. Framer Motion handles
most of this with `useScroll` + a `sticky` wrapper — reach for GSAP ScrollTrigger only
if you need frame-accurate pinning of complex timelines.

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
// wrap the pinned content in a `sticky top-0 h-screen` element inside a tall `ref` section
```

## 8. Magnetic button + hover micro-interactions

The magnetic pull on CTAs is a classic agency touch — the button leans toward the cursor.

```tsx
"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }
  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }} className="inline-block">
      {children}
    </motion.div>
  );
}
```

Other micro-interactions: links with an underline that wipes in (`bg-blue`, scale-x on
hover); cards that lift `-translate-y-1` and brighten their border to `blue/40`; icons
that nudge on hover. Keep transitions ~150–250ms.

## 9. Marquee (logo / tech strip)

Infinite horizontal drift for a "technologies we use" or client strip. Duplicate the
content and translate `-50%` (see the `marquee` keyframe in the design system config).

```tsx
<div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
  <div className="flex shrink-0 animate-marquee gap-16">{logos}</div>
  <div aria-hidden className="flex shrink-0 animate-marquee gap-16">{logos}</div>
</div>
```

Pause on hover with `hover:[animation-play-state:paused]` if desired.

## 10. Count-up stats

Numbers that animate from 0 when scrolled into view (e.g. "50+ projects deployed").

```tsx
"use client";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  useEffect(() => spring.on("change", (v) => {
    if (ref.current) ref.current.textContent = Math.round(v).toString() + suffix;
  }), [spring, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}
```

## 11. Page / route transitions

In the App Router, wrap page content in an `AnimatePresence` + `motion.main` that fades
between routes. Keep it fast (~0.4s) — it shouldn't delay perceived navigation.

```tsx
"use client";
import { motion } from "framer-motion";
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.main>
  );
}
```

For a bolder touch, add a full-screen blue/near-black wipe panel that sweeps across on
navigation — but only if it doesn't hurt perceived speed.

## 12. Custom cursor (optional)

A small circle that follows the cursor and scales up over interactive elements is very
"agency". Use a spring-followed `motion.div` fixed to the pointer; hide on touch devices
and when reduced motion is set. Don't let it swallow clicks (`pointer-events-none`).

## 13. Reduced motion

Non-negotiable for accessibility. Two layers:

1. The CSS media query in `globals.css` (design system §5) neutralizes durations globally.
2. In JS-driven components, read `useReducedMotion()` and render the final state directly
   (skip the entrance), as `<Reveal>` does with `initial={reduce ? false : {...}}`.

Never ship an animation that can't be turned off — motion-sensitive users get sick from it,
and Awwwards/juries check for it too.
