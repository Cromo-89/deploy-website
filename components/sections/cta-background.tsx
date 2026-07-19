"use client";

import { motion } from "framer-motion";
import { useRichMotion } from "@/lib/use-rich-motion";

// Technical backdrop for the closing CTA: a subtle grid with a blue "spotlight"
// that drifts across it, like a deploy/scan sweep. Pure transform/opacity → 60fps.
// On mobile/touch (or reduced motion) it falls back to a static glow — animated
// large blurs are costly to repaint on mobile GPUs.
export function CtaBackground() {
  const rich = useRichMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Technical grid */}
      <div className="bg-grid absolute inset-0" />

      {!rich ? (
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/20 blur-[90px]" />
      ) : (
        <>
          {/* Drifting spotlight */}
          <motion.div
            className="absolute h-[460px] w-[460px] rounded-full bg-blue/25 blur-[130px]"
            style={{ left: "50%", top: "50%", marginLeft: -230, marginTop: -230 }}
            animate={{
              x: [-180, 180, -120, -180],
              y: [-40, 30, 60, -40],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Secondary, brighter accent following a different path */}
          <motion.div
            className="absolute h-[280px] w-[280px] rounded-full bg-blue-bright/20 blur-[110px]"
            style={{ left: "50%", top: "50%", marginLeft: -140, marginTop: -140 }}
            animate={{
              x: [140, -160, 100, 140],
              y: [20, -40, 40, 20],
              opacity: [0.5, 0.9, 0.6, 0.5],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}
    </div>
  );
}
