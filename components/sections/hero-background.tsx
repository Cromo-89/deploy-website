"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// Animated hero backdrop: drifting blue "aurora" blobs + rising particles that
// evoke a deployment/upload. Pure transform/opacity so it stays at 60fps.
// Falls back to a single static glow when reduced motion is requested.
export function HeroBackground() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Particles get randomized on the client only, to avoid hydration mismatch.
  useEffect(() => setMounted(true), []);

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 40,
      })),
    [],
  );

  if (reduce) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue/20 blur-[130px]"
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Aurora blobs */}
      <motion.div
        className="absolute left-[46%] top-[26%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-blue/25 blur-[140px]"
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.12, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[62%] top-[42%] h-[420px] w-[420px] rounded-full bg-blue-bright/15 blur-[130px]"
        animate={{ x: [0, -50, 40, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute left-[34%] top-[54%] h-[360px] w-[360px] rounded-full bg-blue/15 blur-[120px]"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.92, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Rising particles — the "deploy" ascent */}
      {mounted && (
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
      )}
    </div>
  );
}
