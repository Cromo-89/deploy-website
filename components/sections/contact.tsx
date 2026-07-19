"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowUpRight } from "lucide-react";

const field =
  "w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-white placeholder:text-fg-subtle transition-colors focus:border-blue/60 focus:outline-none";

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to a route handler / Resend / form service.
    // For now, open the user's mail client with the message prefilled.
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Proyecto — ${data.get("name") ?? ""}`);
    const body = encodeURIComponent(String(data.get("message") ?? ""));
    window.location.href = `mailto:hola@deploy.dev?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section id="contacto">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-fg-muted">
              Contacto
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-4xl font-medium tracking-tighter md:text-5xl lg:text-6xl">
              Cuéntanos qué quieres construir.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md leading-relaxed text-fg-muted">
              Respondemos en menos de 24 hs. Sin formularios eternos: cuéntanos
              la idea y el resto lo resolvemos en una llamada.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 space-y-4">
              <a
                href="mailto:hola@deploy.dev"
                className="group flex items-center gap-2 text-lg text-white transition-colors hover:text-blue-bright"
              >
                hola@deploy.dev
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="text-sm text-fg-subtle">
                Chile · Trabajamos con equipos de toda LATAM
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-line bg-surface/40 p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Nombre" className={field} />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className={field}
              />
            </div>
            <input
              name="company"
              placeholder="Empresa (opcional)"
              className={`${field} mt-4`}
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Cuéntanos sobre tu proyecto…"
              className={`${field} mt-4 resize-none`}
            />
            <div className="mt-6 flex items-center gap-4">
              <Magnetic className="inline-block">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-medium text-white shadow-glow-sm transition-colors hover:bg-blue-bright hover:shadow-glow"
                >
                  Enviar mensaje
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </Magnetic>
              {sent && (
                <span className="text-sm text-fg-muted">
                  Abrimos tu correo — ¡gracias!
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
