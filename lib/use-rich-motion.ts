"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// True only on real desktops (wide screen + fine pointer) that also allow motion.
// Heavy decorative animations (large animated blurs, particle fields) are gated
// behind this so mobile/touch devices get a lightweight static fallback and stay
// smooth. Defaults to false during SSR/first paint, then upgrades after mount —
// safe because the gated elements are purely decorative (no layout impact).
export function useRichMotion() {
  const reduce = useReducedMotion();
  const [rich, setRich] = useState(false);

  useEffect(() => {
    if (reduce) {
      setRich(false);
      return;
    }
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setRich(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  return rich;
}
