"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ease } from "@/lib/motion";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#proceso", label: "Proceso" },
  { href: "#nosotros", label: "Nosotros" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          // No blur/bg while the menu is open: backdrop-filter would make the
          // header the containing block for the fixed overlay, breaking full-screen.
          scrolled && !open
            ? "border-b border-line bg-canvas/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
      <nav className="container-deploy flex h-16 items-center justify-between md:h-20">
        <Link href="#top" aria-label="Deploy — inicio" className="relative z-10">
          <Image
            src="/logo-deploy-blue-white.svg"
            alt="Deploy"
            width={144}
            height={63}
            className="h-8 w-auto md:h-10"
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
      </header>

      {/* Mobile overlay — rendered OUTSIDE the header. The scrolled header uses
          backdrop-blur, which turns it into the containing block for fixed
          descendants; keeping the overlay here makes its `fixed inset-0` relative
          to the viewport so it always covers the full screen. z-40 sits under the
          header (z-50) so the logo and close button stay on top and clickable. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: ease.out }}
            className="fixed inset-0 z-40 flex h-[100dvh] flex-col justify-center overflow-hidden bg-canvas px-6 md:hidden"
          >
            {/* Depth: technical grid + soft glow */}
            <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-50" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 top-24 -z-10 h-72 w-72 rounded-full bg-blue/15 blur-[90px]"
            />

            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
              }}
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: ease.out },
                    },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-5xl font-medium tracking-tighter transition-colors hover:text-blue-bright"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.18 + links.length * 0.07,
                duration: 0.5,
                ease: ease.out,
              }}
            >
              <Button href="#contacto" magnetic={false} className="w-full">
                Hablemos
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
