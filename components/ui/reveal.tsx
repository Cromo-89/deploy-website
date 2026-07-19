"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";
import type { ReactNode } from "react";

// The default scroll entrance: content rises and comes into focus (blur → sharp),
// once. The blur-focus is what gives the refined, "developing into view" feel
// (à la augen.pro). Wrap almost anything.
export function Reveal({
  children,
  delay = 0,
  y = 24,
  blur = true,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={
        reduce
          ? false
          : { opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: ease.out, delay }}
    >
      {children}
    </MotionTag>
  );
}
