"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Boxes,
  Smartphone,
  Cloud,
  PenTool,
  Plug,
  ArrowUpRight,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { staggerContainer, staggerItem } from "@/lib/motion";

const services = [
  {
    icon: Code2,
    title: "Desarrollo Web",
    desc: "Sitios y plataformas rápidas, a medida, con Next.js y React. SEO, performance y accesibilidad de fábrica.",
  },
  {
    icon: Boxes,
    title: "Aplicaciones a Medida",
    desc: "Web apps y SaaS: del MVP al producto en producción, con arquitectura pensada para escalar.",
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    desc: "iOS y Android, nativas o multiplataforma con React Native y Flutter. Una base, dos tiendas.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Infraestructura, CI/CD y despliegues escalables. Observabilidad y uptime que no te despierta de noche.",
  },
  {
    icon: PenTool,
    title: "Diseño UX/UI",
    desc: "Interfaces claras y sistemas de diseño consistentes. La estética al servicio del producto.",
  },
  {
    icon: Plug,
    title: "Integraciones & APIs",
    desc: "Conectamos tus sistemas, pagos, datos y terceros. APIs robustas y bien documentadas.",
  },
];

export function Services() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="servicios"
      eyebrow="Servicios"
      title="Todo lo que tu producto necesita para llegar a producción."
      intro="Un solo equipo, del diseño al deploy. Sin traspasos que rompen el contexto."
    >
      <motion.ul
        variants={staggerContainer}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s) => (
          <motion.li
            key={s.title}
            variants={staggerItem}
            data-cursor="hover"
            className="group relative bg-canvas p-8 transition-colors hover:bg-surface"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-blue transition-colors group-hover:border-blue/40">
                <s.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <ArrowUpRight className="h-5 w-5 text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
            </div>
            <h3 className="mt-6 text-xl font-medium tracking-tight">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
