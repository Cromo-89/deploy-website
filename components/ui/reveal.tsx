"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";
import type { ReactNode } from "react";

// The default scroll entrance: fade + rise, once. Wrap almost anything.
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: ease.out, delay }}
    >
      {children}
    </MotionTag>
  );
}
