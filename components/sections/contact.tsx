"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowUpRight } from "lucide-react";

// Inline "fill-in-the-blank" field: borderless, underline only, auto-sizes to
// its content (field-sizing where supported). The modern/minimal alternative to
// boxed inputs — the form reads like a sentence.
const inlineField =
  "inline bg-transparent border-b border-line pb-1 text-white placeholder:text-fg-subtle/70 " +
  "focus:border-blue focus:outline-none transition-colors [field-sizing:content] " +
  "align-baseline caret-blue";

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to a route handler / Resend / form service.
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Proyecto — ${data.get("name") ?? ""}${data.get("company") ? " · " + data.get("company") : ""}`,
    );
    const body = encodeURIComponent(String(data.get("message") ?? ""));
    window.location.href = `mailto:hola@deploy.dev?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section id="contacto" eyebrow="Contacto">
      <form onSubmit={onSubmit} className="max-w-4xl">
        {/* Conversational statement — the form reads as a sentence */}
        <Reveal>
          <p className="text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.6] tracking-tight text-fg-muted">
            Hola, soy{" "}
            <input
              name="name"
              required
              aria-label="Tu nombre"
              placeholder="tu nombre"
              className={`${inlineField} min-w-[7ch] max-w-full`}
            />{" "}
            de{" "}
            <input
              name="company"
              aria-label="Tu empresa"
              placeholder="empresa"
              className={`${inlineField} min-w-[6ch] max-w-full`}
            />
            .
            <br />
            Escríbanme a{" "}
            <input
              name="email"
              type="email"
              required
              aria-label="Tu email"
              placeholder="tu@email.com"
              className={`${inlineField} min-w-[11ch] max-w-full`}
            />
            .
          </p>
        </Reveal>

        {/* Project — full-width auto-growing field so long text wraps cleanly */}
        <Reveal delay={0.08}>
          <div className="mt-12">
            <label
              htmlFor="message"
              className="font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle"
            >
              Quiero construir
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={1}
              placeholder="una idea, un MVP, una plataforma nueva…"
              className="mt-3 w-full resize-none border-b border-line bg-transparent pb-3 text-2xl text-white caret-blue placeholder:text-fg-subtle/70 transition-colors focus:border-blue focus:outline-none [field-sizing:content] md:text-3xl"
            />
          </div>
        </Reveal>

        {/* Minimal submit + meta */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <Magnetic className="inline-block self-start">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 text-lg font-medium text-white transition-colors hover:text-blue-bright"
              >
                Enviar mensaje
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors group-hover:border-blue/60">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </button>
            </Magnetic>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle">
              <a
                href="mailto:hola@deploy.dev"
                className="normal-case tracking-normal text-sm text-fg-muted transition-colors hover:text-white"
              >
                hola@deploy.dev
              </a>
              <span>Chile</span>
              <span>Respuesta &lt; 24 hs</span>
            </div>
          </div>
        </Reveal>

        {sent && (
          <p className="mt-6 text-sm text-fg-muted">
            Abrimos tu correo con el mensaje — ¡gracias! Te respondemos pronto.
          </p>
        )}
      </form>
    </Section>
  );
}
