"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Fragment, useRef } from "react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "./hero-background";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

// One continuous headline so the words reveal as a single left-to-right wave.
// "desplegamos" is just the accented word in the flow — not a separate,
// late-arriving block (which read as a loading glitch).
const HEADLINE: { w: string; grad?: boolean }[] = [
  { w: "Construimos" },
  { w: "y" },
  { w: "desplegamos", grad: true },
  { w: "el" },
  { w: "software" },
  { w: "que" },
  { w: "tu" },
  { w: "producto" },
  { w: "necesita." },
];

const HEADLINE_TEXT = HEADLINE.map((h) => h.w).join(" ");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28"
    >
      {/* Background texture + animated aurora/particles */}
      <div aria-hidden className="bg-grid absolute inset-0 -z-20" />
      <motion.div
        aria-hidden
        style={{ y: reduce ? 0 : glowY }}
        className="absolute inset-0 -z-10"
      >
        <HeroBackground />
      </motion.div>

      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
        className="container-deploy"
      >
        <h1
          className="max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-tightest"
          aria-label={HEADLINE_TEXT}
        >
          <motion.span
            className="inline"
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
            }}
          >
            {HEADLINE.map((item, i) => (
              <Fragment key={i}>
                <span
                  aria-hidden
                  className="inline-block overflow-hidden pb-[0.1em] align-bottom"
                >
                  <motion.span
                    className={cn("inline-block", item.grad && "text-gradient-blue")}
                    variants={
                      reduce
                        ? undefined
                        : {
                            hidden: { y: "110%" },
                            show: {
                              y: 0,
                              transition: { duration: 0.65, ease: ease.out },
                            },
                          }
                    }
                  >
                    {item.w}
                  </motion.span>
                </span>
                {i < HEADLINE.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </motion.span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease.out, delay: 0.7 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted text-pretty"
        >
          Diseño, desarrollo web, apps a medida e infraestructura. Del concepto
          al deploy, con la precisión de un equipo que vive en producción.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease.out, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="#contacto">Iniciar proyecto</Button>
          <Button href="#trabajo" variant="ghost">
            Ver trabajo
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-line p-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-blue" />
        </motion.div>
      </motion.div>
    </section>
  );
}
