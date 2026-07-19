"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

// Inertial smooth scrolling (Lenis) — gives parallax the weighted, premium feel
// seen on Awwwards sites. Disabled when the user prefers reduced motion.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
