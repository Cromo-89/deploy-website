import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";

// NOTE: placeholder figures — reemplazar por números reales de Deploy.
const stats = [
  { to: 50, prefix: "+", suffix: "", label: "Proyectos desplegados" },
  { to: 30, prefix: "+", suffix: "", label: "Clientes en la región" },
  { to: 8, prefix: "", suffix: "", label: "Años construyendo" },
  { to: 99.9, prefix: "", suffix: "%", label: "Uptime promedio", decimals: 1 },
];

export function Stats() {
  return (
    <section className="border-y border-line bg-surface/40">
      <div className="container-deploy grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div>
              <div className="text-5xl font-medium tracking-tighter md:text-6xl">
                <CountUp
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals ?? 0}
                />
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-fg-muted">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
