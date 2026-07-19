"use client";

import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(reduce ? to : to);
  }, [inView, to, mv, reduce]);

  useEffect(() => {
    if (reduce) {
      if (ref.current)
        ref.current.textContent = prefix + to.toFixed(decimals) + suffix;
      return;
    }
    return spring.on("change", (v) => {
      if (ref.current)
        ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
    });
  }, [spring, prefix, suffix, decimals, reduce, to]);

  return (
    <span ref={ref}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
