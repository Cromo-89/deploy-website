import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { Team } from "@/components/sections/team";
import { CTA } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <Work />
      <Process />
      <Stats />
      <Team />
      <CTA />
      <Contact />
    </>
  );
}
