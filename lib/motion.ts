import type { Variants } from "framer-motion";

// The house easing curves — reuse everywhere for a consistent motion signature.
export const ease = {
  out: [0.16, 1, 0.3, 1] as const, // expo-out — default for reveals
  inOut: [0.65, 0, 0.35, 1] as const, // parallax, transitions
  soft: [0.25, 0.1, 0.25, 1] as const,
};

export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};
