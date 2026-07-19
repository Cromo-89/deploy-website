"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Kinetic headline: words rise and come into focus (blur → sharp), staggered.
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
        <Fragment key={i}>
          <motion.span
            className={cn("inline-block", wordClassName?.(w, i))}
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: ease.out, delay: delay + i * 0.06 }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
