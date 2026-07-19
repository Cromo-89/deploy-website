"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useRichMotion } from "@/lib/use-rich-motion";

const projects = [
  {
    name: "Nova Commerce",
    tag: "E-commerce · Plataforma",
    result: "+40% conversión",
    stack: ["Next.js", "Stripe", "Postgres"],
    accent: "from-blue/30",
  },
  {
    name: "Fintrack",
    tag: "SaaS · Fintech",
    result: "0 → 10k usuarios",
    stack: ["React", "Node", "AWS"],
    accent: "from-indigo-500/30",
  },
  {
    name: "Rutas",
    tag: "App móvil · Logística",
    result: "-30% tiempos de ruta",
    stack: ["React Native", "Maps"],
    accent: "from-cyan-500/30",
  },
  {
    name: "Atlas CMS",
    tag: "Producto interno",
    result: "5x velocidad de publicación",
    stack: ["Next.js", "GraphQL"],
    accent: "from-sky-500/30",
  },
];

export function Work() {
  const rich = useRichMotion();
  // Render the two variants as separate components so their hooks (useScroll)
  // initialize with the ref already attached. Keeping useScroll in the parent
  // broke desktop: it ran while the mobile branch was mounted (ref null) and
  // never re-attached when the pinned section appeared.
  return rich ? <WorkDesktop /> : <WorkMobile />;
}

// Desktop: horizontal track pinned while the page scrolls (scroll-jacking wow).
function WorkDesktop() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  // Slide the track from a touch of right-inset to fully revealing the last card.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section id="trabajo" ref={targetRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-deploy mb-10 md:mb-14">
          <Eyebrow>Trabajo seleccionado</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-4xl font-medium tracking-tighter md:text-5xl">
            Productos que pusimos en producción.
          </h2>
        </div>

        <motion.div
          style={{ x }}
          className="flex gap-6 pl-[max(1.25rem,calc((100vw-1240px)/2+2rem))] pr-[10vw]"
        >
          {projects.map((p) => (
            <div key={p.name} className="w-[80vw] shrink-0 sm:w-[52vw] lg:w-[38vw]">
              <Card p={p} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Mobile / touch (and reduced motion): native swipe carousel with scroll-snap,
// instead of scroll-jacking the page — feels natural on a phone.
function WorkMobile() {
  return (
    <section id="trabajo" className="scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="container-deploy">
        <Eyebrow>Trabajo seleccionado</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-4xl font-medium tracking-tighter md:text-5xl">
          Productos que pusimos en producción.
        </h2>
      </div>

      <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((p) => (
          <div key={p.name} className="w-[80vw] shrink-0 snap-center sm:w-[46vw]">
            <Card p={p} />
          </div>
        ))}
        {/* Trailing spacer so the last card can snap to center */}
        <div aria-hidden className="w-px shrink-0" />
      </div>

      <p className="container-deploy mt-2 font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle">
        Desliza para ver más →
      </p>
    </section>
  );
}

function Card({ p }: { p: (typeof projects)[number] }) {
  return (
    <article
      data-cursor="hover"
      className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-line bg-surface p-7"
    >
      {/* Placeholder visual — swap for real project imagery (next/image) */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${p.accent} via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-fg-muted">
              {p.tag}
            </p>
            <h3 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
              {p.name}
            </h3>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-canvas/40 backdrop-blur transition-colors group-hover:border-blue/50">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="rounded-full bg-blue/15 px-3 py-1 text-xs font-medium text-blue-bright">
            {p.result}
          </span>
          <span className="text-xs text-fg-subtle">{p.stack.join(" · ")}</span>
        </div>
      </div>
    </article>
  );
}
