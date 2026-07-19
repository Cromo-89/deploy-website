"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    n: "01",
    title: "Descubrimiento",
    desc: "Entendemos el problema, el negocio y los usuarios. Definimos alcance, riesgos y qué significa el éxito.",
  },
  {
    n: "02",
    title: "Diseño & Arquitectura",
    desc: "Prototipamos la experiencia y diseñamos la arquitectura técnica. Decisiones que evitan deuda futura.",
  },
  {
    n: "03",
    title: "Desarrollo & QA",
    desc: "Iteraciones cortas, código revisado y pruebas. Ves avances reales cada semana, no promesas.",
  },
  {
    n: "04",
    title: "Deploy & Soporte",
    desc: "Ponemos en producción con CI/CD, monitoreo y soporte. Del lanzamiento a la evolución continua.",
  },
];

export function Process() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="proceso"
      eyebrow="Cómo trabajamos"
      title="Un proceso claro, del concepto al deploy."
      intro="Sin cajas negras. Sabes en qué etapa estás y qué sigue."
    >
      <div ref={ref} className="relative">
        {/* Progress line */}
        <div className="absolute left-0 top-0 h-full w-px bg-line md:left-[calc(16.666%-0.5px)]">
          {!reduce && (
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-blue"
            />
          )}
        </div>

        <div className="space-y-px">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="grid gap-4 py-8 pl-8 md:grid-cols-[16.666%_1fr] md:gap-8 md:pl-0">
                <div className="font-mono text-sm text-blue md:pl-12">{s.n}</div>
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-fg-muted">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
