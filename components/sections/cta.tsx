import { RevealText } from "@/components/ui/reveal-text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CtaBackground } from "./cta-background";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <CtaBackground />

      <div className="container-deploy text-center">
        <h2 className="mx-auto max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1] tracking-tightest">
          <RevealText text="¿Tienes un proyecto en mente?" />
          <br />
          <RevealText
            text="Hagamos deploy juntos."
            className="text-gradient-blue"
            delay={0.15}
          />
        </h2>
        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Button href="#contacto" className="px-8 py-4 text-base">
              Iniciar proyecto
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
