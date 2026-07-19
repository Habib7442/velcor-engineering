import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { WhatWeDoHero } from "@/components/sections/what-we-do/WhatWeDoHero";
import { ProductDesignSection } from "@/components/sections/what-we-do/ProductDesignSection";
import { PlantEngineeringSection } from "@/components/sections/what-we-do/PlantEngineeringSection";
import { CustomSolutionCta } from "@/components/sections/what-we-do/CustomSolutionCta";

export const metadata: Metadata = buildMetadata({
  title: "What We Do | Velcor Engineering",
  description:
    "Product design and plant engineering capabilities — industrial automation, machine design, control systems, piping, electrical, mechanical, instrumentation, and civil/structural engineering.",
  path: "/what-we-do",
});

export default function WhatWeDoPage() {
  return (
    <main className="flex flex-1 flex-col">
      <WhatWeDoHero />
      <ProductDesignSection />
      <PlantEngineeringSection />
      <CustomSolutionCta />
    </main>
  );
}
