import Image from "next/image";
import { RevealText } from "@/components/ui/reveal-text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/20 blur-[140px]"
      />
      <Image
        src="/isotype-blue.svg"
        alt=""
        aria-hidden
        width={520}
        height={520}
        className="pointer-events-none absolute right-0 top-1/2 -z-10 hidden w-[36rem] -translate-y-1/2 translate-x-1/3 opacity-[0.05] md:block"
      />

      <div className="container-deploy text-center">
        <h2 className="mx-auto max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1] tracking-tightest">
          <RevealText text="¿Tenés un proyecto en mente?" />
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
