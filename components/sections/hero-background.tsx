"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useRichMotion } from "@/lib/use-rich-motion";
import { HeroShader } from "./hero-shader";

// Animated hero backdrop: a WebGL liquid-aurora shader (reference: neuform.ai)
// + rising particles that evoke a deployment/upload, layered on top. Pure
// transform/opacity for the particles so they stay at 60fps regardless of the
// shader. On mobile/touch (or reduced motion) it falls back to a single static
// glow — WebGL and large animated blurs are both expensive on mobile GPUs.
export function HeroBackground() {
  const rich = useRichMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 40,
      })),
    [],
  );

  if (!rich) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue/20 blur-[90px]"
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Liquid aurora shader (WebGL) */}
      <HeroShader />

      {/* Rising particles — the "deploy" ascent */}
      <div className="absolute inset-0">
        {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute bottom-0 rounded-full bg-blue-bright/70"
              style={{ left: `${p.left}%`, width: p.size, height: p.size }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, -220 - p.drift * 0.5],
                x: [0, p.drift],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeOut",
                times: [0, 0.1, 0.8, 1],
              }}
            />
          ))}
        </div>
    </div>
  );
}
