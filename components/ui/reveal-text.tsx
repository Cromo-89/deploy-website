"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Kinetic headline: words rise from a clipped baseline, staggered.
export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, i: number) => string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline", className)}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className={cn("inline-block", wordClassName?.(w, i))}
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: ease.out, delay: delay + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
