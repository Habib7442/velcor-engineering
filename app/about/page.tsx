import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { MissionVision } from "@/components/sections/about/MissionVision";
import { OurPromise } from "@/components/sections/about/OurPromise";
import { CultureValues } from "@/components/sections/about/CultureValues";
import { LifeAtVelcor } from "@/components/sections/about/LifeAtVelcor";
import { JoinTeamCta } from "@/components/sections/about/JoinTeamCta";

export const metadata: Metadata = buildMetadata({
  title: "About Velcor Engineering | Multidisciplinary Engineering Partner",
  description:
    "Velcor Engineering is a multidisciplinary engineering and design partner covering product design and plant engineering under one roof — our mission, values, and culture.",
  path: "/about",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
]);

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <AboutHero />
      <MissionVision />
      <OurPromise />
      <CultureValues />
      <LifeAtVelcor />
      <JoinTeamCta />
    </main>
  );
}
