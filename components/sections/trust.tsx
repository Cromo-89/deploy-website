const tech = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "React Native",
  "Flutter",
  "PostgreSQL",
  "AWS",
  "Vercel",
  "Docker",
];

export function Trust() {
  return (
    <section className="border-y border-line py-10">
      <div className="container-deploy">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
          Tecnologías que dominamos
        </p>
      </div>
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14 hover:[animation-play-state:paused]">
          {tech.map((t) => (
            <span
              key={t}
              className="text-xl font-medium tracking-tight text-fg-muted md:text-2xl"
            >
              {t}
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-marquee items-center gap-14 pr-14 hover:[animation-play-state:paused]"
        >
          {tech.map((t) => (
            <span
              key={t}
              className="text-xl font-medium tracking-tight text-fg-muted md:text-2xl"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
