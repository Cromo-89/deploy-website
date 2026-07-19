"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealText } from "@/components/ui/reveal-text";
import { Button } from "@/components/ui/button";
import { ease } from "@/lib/motion";

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
      {/* Background texture + glow */}
      <div aria-hidden className="bg-grid absolute inset-0 -z-20" />
      <motion.div
        aria-hidden
        style={{ y: reduce ? 0 : glowY }}
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue/20 blur-[130px]"
      />

      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
        className="container-deploy"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ease.out }}
        >
          <Eyebrow>Agencia de desarrollo</Eyebrow>
        </motion.div>

        <h1 className="mt-6 max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-tightest">
          <RevealText text="Construimos y" delay={0.1} />{" "}
          <RevealText
            text="desplegamos"
            delay={0.25}
            className="text-gradient-blue"
          />{" "}
          <RevealText text="el software que tu producto necesita." delay={0.4} />
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
