import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";

// Consistent vertical rhythm + container + optional eyebrow/title header.
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-24 md:py-32 lg:py-40", className)}
    >
      <div className={cn("container-deploy", containerClassName)}>
        {(eyebrow || title || intro) && (
          <div className="mb-14 max-w-3xl md:mb-20">
            {eyebrow && (
              <Reveal>
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-4xl font-medium tracking-tighter text-balance md:text-5xl lg:text-6xl">
                  {title}
                </h2>
              </Reveal>
            )}
            {intro && (
              <Reveal delay={0.1}>
                <p className="mt-5 text-lg leading-relaxed text-fg-muted text-pretty">
                  {intro}
                </p>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
