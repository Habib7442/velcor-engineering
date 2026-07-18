import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";

export const metadata: Metadata = buildMetadata({
  title: "Velcor Engineering | Product Design & Plant Engineering Partner",
  description:
    "Velcor Engineering delivers product design and plant engineering services — automation, machine design, piping, electrical, mechanical, instrumentation, and civil/structural — to industrial clients worldwide.",
  path: "/",
});

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <WhoWeAre />
    </main>
  );
}
