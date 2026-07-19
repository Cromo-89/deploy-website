"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";

// Floating "back to top" anchor, bottom-right. A ring of "Deploy" text spins on
// its own axis; white by default, blue on hover. Appears after scrolling down.
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={toTop}
          aria-label="Volver al inicio"
          data-cursor="hover"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-6 right-6 z-40 flex h-24 w-24 items-center justify-center text-white transition-colors hover:text-blue-bright md:bottom-8 md:right-8"
        >
          {/* Spinning ring of text */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            style={
              reduce ? undefined : { animation: "spin-slow 14s linear infinite" }
            }
          >
            <defs>
              <path
                id="back-to-top-ring"
                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
            </defs>
            <text
              fill="currentColor"
              fontSize="11"
              fontWeight={500}
              letterSpacing="1.5"
              style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
            >
              <textPath
                href="#back-to-top-ring"
                startOffset="0"
                textLength="232"
                lengthAdjust="spacingAndGlyphs"
              >
                Deploy • Deploy • Deploy •
              </textPath>
            </text>
          </svg>

          {/* Center arrow */}
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line bg-canvas/40 backdrop-blur transition-colors group-hover:border-blue/50">
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
