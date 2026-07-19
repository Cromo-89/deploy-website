"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { staggerContainer, staggerItem } from "@/lib/motion";

// Placeholder team — reemplazar por el equipo real (fotos en /public, roles, links).
const team = [
  { name: "Nombre Apellido", role: "Co-fundador · Full-stack", initials: "NA" },
  { name: "Nombre Apellido", role: "Co-fundador · Diseño & UX", initials: "NA" },
  { name: "Nombre Apellido", role: "Mobile & Backend", initials: "NA" },
  { name: "Nombre Apellido", role: "Cloud & DevOps", initials: "NA" },
];

export function Team() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="nosotros"
      eyebrow="Nosotros"
      title="Unos amigos que se toman el software en serio."
      intro="Un equipo pequeño y senior. Hablas directo con quien construye tu producto."
    >
      <motion.ul
        variants={staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {team.map((m, i) => (
          <motion.li key={i} variants={staggerItem} data-cursor="hover">
            <div className="group overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-blue/30">
              <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-surface-2 to-canvas">
                {/* Swap for a grayscale->color photo with next/image */}
                <span className="text-4xl font-medium text-fg-subtle transition-colors group-hover:text-blue">
                  {m.initials}
                </span>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-blue/0 transition-colors duration-500 group-hover:bg-blue/[0.06]"
                />
              </div>
              <div className="p-5">
                <h3 className="font-medium tracking-tight">{m.name}</h3>
                <p className="mt-1 text-sm text-fg-muted">{m.role}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
