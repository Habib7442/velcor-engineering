import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { EXPERTISE_CATEGORIES } from "@/lib/data/expertise";
import { Button } from "@/components/ui/button";
import { PhotoCard } from "@/components/sections/expertise/PhotoCard";

export const metadata: Metadata = buildMetadata({
  title: "Our Expertise | Velcor Engineering",
  description:
    "Velcor Engineering's expertise across Plants & Infrastructure, Product Engineering, and Industrial Automation — multidisciplinary engineering for industrial facilities, engineered products, and manufacturing operations.",
  path: "/expertise",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Our Expertise", url: "/expertise" },
]);

export default function ExpertiseHubPage() {
  return (
    <main className="flex flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-20">
          <span className="text-xs font-medium tracking-wide text-blue-600 uppercase">Our Expertise</span>
          <h1 className="font-heading mt-4 max-w-2xl text-4xl leading-[1.1] font-semibold text-blue-900 sm:text-5xl">
            Three ways we help industrial teams build.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            From critical plant infrastructure to engineered products and the automation that runs your line, Velcor
            Engineering covers the full span of multidisciplinary engineering under one accountable team.
          </p>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-3">
          {EXPERTISE_CATEGORIES.map((category) => (
            <PhotoCard
              key={category.slug}
              href={`/expertise/${category.slug}`}
              imageSrc={`/expertise/${category.slug}.jpg`}
              imageAlt={category.name}
              title={category.name}
              subtitle={category.tagline}
              linkLabel="Explore"
              className="aspect-square"
            />
          ))}
        </div>
      </section>

      <section className="bg-blue-900">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
              Not sure which category fits your project?
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-steel-300">
              Tell us what you&apos;re working on and we&apos;ll point you to the right engineering discipline.
            </p>
          </div>
          <Button size="lg" variant="accent" nativeButton={false} render={<Link href="/contact" />}>
            Talk to Us
          </Button>
        </div>
      </section>
    </main>
  );
}
