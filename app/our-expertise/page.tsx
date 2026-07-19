import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SECTORS } from "@/lib/data/sectors";
import { ExpertiseHero } from "@/components/sections/our-expertise/ExpertiseHero";
import { SectorSection } from "@/components/sections/our-expertise/SectorSection";
import { ExpertiseCta } from "@/components/sections/our-expertise/ExpertiseCta";

export const metadata: Metadata = buildMetadata({
  title: "Our Expertise | Velcor Engineering",
  description:
    "Thirteen engineering sectors covered by Velcor Engineering — water treatment, industrial automation, oil & gas, power, and more.",
  path: "/our-expertise",
});

export default function OurExpertisePage() {
  return (
    <main className="flex flex-1 flex-col">
      <ExpertiseHero />

      {SECTORS.map((sector, index) => (
        <SectorSection key={sector.slug} sector={sector} index={index} />
      ))}

      <ExpertiseCta />
    </main>
  );
}
