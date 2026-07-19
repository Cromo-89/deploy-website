import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const columns = [
  {
    title: "Navegación",
    links: [
      { href: "#servicios", label: "Servicios" },
      { href: "#trabajo", label: "Trabajo" },
      { href: "#proceso", label: "Proceso" },
      { href: "#nosotros", label: "Nosotros" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { href: "mailto:hola@deploy.dev", label: "hola@deploy.dev" },
      { href: "#contacto", label: "Iniciar proyecto" },
    ],
  },
  {
    title: "Social",
    links: [
      { href: "#", label: "LinkedIn" },
      { href: "#", label: "GitHub" },
      { href: "#", label: "Instagram" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="container-deploy">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Image
              src="/logo-deploy-blue-white.svg"
              alt="Deploy"
              width={128}
              height={56}
              className="h-7 w-auto"
            />
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">
              Del concepto al deploy. Construimos software, web y apps que se
              ponen en producción.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-fg-muted transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line py-8 text-xs text-fg-subtle md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Deploy. Todos los derechos reservados.</p>
          <p className="font-mono">Hecho con precisión · Del concepto al deploy</p>
        </div>
      </div>

      {/* Giant faded wordmark — agency signature */}
      <Reveal className="pointer-events-none select-none">
        <div
          aria-hidden
          className="text-gradient -mb-[0.18em] px-4 text-center text-[22vw] font-semibold leading-none tracking-tighter opacity-[0.06]"
        >
          DEPLOY
        </div>
      </Reveal>
    </footer>
  );
}
