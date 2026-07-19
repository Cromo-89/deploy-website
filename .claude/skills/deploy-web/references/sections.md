# Deploy — Section Blueprints

Blueprints for each section of an agency site. Each gives: **purpose**, **layout**,
**Deploy-flavored copy** (starting point, refine with the user — Deploy builds software,
web & mobile apps), and **which animation** to apply. Build mobile-first; pull tokens from
the design system; wrap entrances in `<Reveal>` unless noted.

Language: default copy in **Spanish** (the team is ES-speaking) unless the user asks for
English or a bilingual site. Keep it concise, confident, technical — never salesy fluff.

## Section order (typical landing)

Navbar → Hero → Trust strip (logos/tech) → Services → Selected work → Process →
Stats → Team → Testimonials → CTA → Contact → Footer.

Not every site needs all of these. Start with Navbar, Hero, Services, Work, CTA, Footer
as the minimum viable agency landing, then add the rest.

---

## Navbar

- **Purpose**: orient + one clear CTA. Minimal.
- **Layout**: `isotype-blue.svg` (or white wordmark) left; center/right nav links
  (Servicios, Trabajo, Proceso, Contacto); a `Hablemos` button right. Sticky, transparent
  over hero, gains a `bg-canvas/70 backdrop-blur border-b border-line` after scrolling ~40px.
- **Mobile**: hamburger → full-screen overlay menu with staggered link reveal.
- **Motion**: link underline wipe on hover; navbar background fades in on scroll
  (`useScroll`/scroll listener). Mobile menu links stagger in.

## Hero

- **Purpose**: state what Deploy does in one confident line + primary CTA. This is the
  Awwwards money shot.
- **Layout**: full viewport (`min-h-[92vh]`), content left-aligned or centered. Oversized
  `display` headline, a one-line `body-lg` subhead in `fg-muted`, two buttons (primary
  `Iniciar proyecto`, ghost `Ver trabajo`). Behind it: a blue glow blob + subtle `bg-grid`
  texture. Optionally an abstract 3D/isometric element or the isotype animated.
- **Copy** (starting point):
  - Eyebrow: `AGENCIA DE DESARROLLO`
  - Headline: **Construimos y desplegamos el software que tu producto necesita.**
    (emphasize one word, e.g. *desplegamos*, in blue or gradient-text)
  - Subhead: `Diseño, desarrollo web, apps a medida e infraestructura. Del concepto al deploy.`
- **Motion**: `RevealText` word-by-word on the headline; subhead + buttons fade up with
  small delays after it; glow blob slow parallax; a scroll-cue chevron at the bottom.

## Trust strip (logos / tech)

- **Purpose**: instant credibility. Either client logos or the tech stack Deploy uses.
- **Layout**: a slim band, muted, small caption `Tecnologías que dominamos` or
  `Confían en nosotros`, then a **marquee** of logos (React, Next.js, Node, TypeScript,
  Postgres, AWS, Flutter, etc. — or client marks).
- **Motion**: infinite marquee (animations §9), edges masked, pause on hover.

## Services

- **Purpose**: what Deploy offers, scannable. The core of an *informational* site.
- **Layout**: eyebrow + section title, then a grid of 3–6 hairline cards (`grid md:grid-cols-3`).
  Each card: thin Lucide icon, title, 1–2 line description, optional "→" link. Alternatively
  a numbered list/accordion for a more editorial feel.
- **Services** (starting set — confirm with user):
  1. **Desarrollo Web** — Sitios y plataformas web rápidas, a medida, con Next.js/React.
  2. **Aplicaciones a Medida** — Web apps y SaaS: del MVP al producto en producción.
  3. **Apps Móviles** — iOS y Android nativas o multiplataforma (React Native / Flutter).
  4. **Cloud & DevOps** — Infraestructura, CI/CD y despliegues escalables.
  5. **Diseño UX/UI** — Interfaces claras y sistemas de diseño consistentes.
  6. **Integraciones & APIs** — Conectamos tus sistemas, pagos, datos y terceros.
- **Motion**: staggered grid reveal; cards lift + border→`blue/40` on hover; icon nudge.

## Selected work / case studies

- **Purpose**: proof. Even 3 strong projects beat a long list.
- **Layout**: large alternating rows or a 2-col grid of project cards. Each: cover image
  (`next/image`), project name, one-line result/tag (`E-commerce · +40% conversión`),
  stack tags, link to a case detail (or modal). Big imagery, generous spacing.
- **Motion**: image parallax within its frame on scroll; card reveal; hover reveals a
  `Ver caso →` label + subtle image zoom (`scale-105`, `overflow-hidden`).
- If real projects don't exist yet, use a couple of tasteful placeholders and tell the user
  to swap them — don't fake specific client names/metrics.

## Process

- **Purpose**: show how Deploy works → reduces buyer risk.
- **Layout**: numbered steps (`01–04`) as a vertical timeline or horizontal stepper.
  Each step: mono number, title, short description.
- **Steps** (starting point): `01 Descubrimiento` · `02 Diseño & Arquitectura` ·
  `03 Desarrollo & QA` · `04 Deploy & Soporte`.
- **Motion**: steps reveal in sequence as they enter; a connecting line that draws in
  (animate `scaleY`/`scaleX` of a `bg-blue` line via `useScroll`); numbers can count/flip.

## Stats

- **Purpose**: quantify credibility.
- **Layout**: 3–4 big numbers in a row, mono units, muted labels. On `surface` band or
  bordered top/bottom hairlines.
- **Copy** (confirm real numbers): `+50 Proyectos`, `+30 Clientes`, `8 Años`, `99.9% Uptime`.
  Never invent misleading metrics — ask the user for real figures.
- **Motion**: `CountUp` (animations §10) when scrolled into view.

## Team

- **Purpose**: humanize the agency — "unos amigos" building serious software.
- **Layout**: grid of member cards: photo (grayscale → color on hover is a nice touch),
  name, role, optional social links. Or an editorial row per person.
- **Motion**: staggered reveal; grayscale→color and slight zoom on hover.

## Testimonials

- **Purpose**: social proof in clients' words.
- **Layout**: one large featured quote, or a slider/marquee of quote cards with
  name + company + avatar.
- **Motion**: fade/slide between quotes; or a slow marquee of cards.

## CTA (closing)

- **Purpose**: convert. A bold, high-contrast band before the footer.
- **Layout**: centered oversized line + primary button. Big blue glow, maybe the isotype
  watermark. `¿Tenés un proyecto en mente?` / **Hagamos deploy juntos.** + `Iniciar proyecto`.
- **Motion**: headline `RevealText`; magnetic button; glow pulse.

## Contact

- **Purpose**: make reaching out effortless.
- **Layout**: two columns — left: heading + email (`hola@deploy.xx`), socials, location;
  right: a simple form (nombre, email, mensaje) or just a large mailto button if no backend
  yet. If a form: validate, show success/error states, wire to a route handler / Resend /
  form service later.
- **Motion**: fields reveal; button magnetic; focus states use blue.

## Footer

- **Purpose**: navigation + close the brand loop.
- **Layout**: white wordmark or isotype, short tagline, columns of links (Servicios,
  Empresa, Legal), socials, copyright + year. Optionally a giant faded `DEPLOY` wordmark
  across the bottom edge (an agency signature move).
- **Motion**: subtle reveal; the giant wordmark can parallax slightly.

---

## Putting a page together

Compose `app/page.tsx` from these sections in order, each in its own component file under
`components/sections/`. Keep server components by default; add `"use client"` only to the
animated leaves (Reveal wrappers, magnetic buttons, marquees) so the page stays fast.
Give every section an `id` matching the navbar anchors for smooth in-page scrolling.
