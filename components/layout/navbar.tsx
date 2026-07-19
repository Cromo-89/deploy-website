"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#proceso", label: "Proceso" },
  { href: "#nosotros", label: "Nosotros" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-canvas/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="container-deploy flex h-16 items-center justify-between md:h-20">
        <Link href="#top" aria-label="Deploy — inicio" className="relative z-10">
          <Image
            src="/logo-deploy-blue-white.svg"
            alt="Deploy"
            width={112}
            height={49}
            className="h-6 w-auto md:h-7"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group relative text-sm text-fg-muted transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="#contacto" className="px-5 py-2.5">
            Hablemos
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-white transition-all duration-300",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-white transition-all duration-300",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-0 flex flex-col justify-center bg-canvas px-6 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-4xl font-medium tracking-tighter"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="#contacto" magnetic={false} className="w-full">
                Hablemos
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
