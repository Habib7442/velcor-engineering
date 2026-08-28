import { EXPERTISE_CATEGORIES } from "@/lib/data/expertise";
import { PhotoCard } from "@/components/sections/expertise/PhotoCard";

export function WhatWeDoHighlight() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-wide text-blue-600 uppercase">What We Do</span>
          <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-blue-900 sm:text-4xl">
            Three ways we help industrial teams build.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {EXPERTISE_CATEGORIES.map((category) => (
            <PhotoCard
              key={category.slug}
              href={`/expertise/${category.slug}`}
              imageSrc={`/expertise/${category.slug}.jpg`}
              imageAlt={category.name}
              title={category.name}
              subtitle={category.tagline}
              linkLabel="Learn More"
              className="aspect-square"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
