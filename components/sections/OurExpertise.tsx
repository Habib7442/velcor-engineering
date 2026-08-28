"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhotoCard } from "@/components/sections/expertise/PhotoCard";
import { ALL_SERVICES } from "@/lib/data/expertise";

const SCROLL_AMOUNT = 312;

export function OurExpertise() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollByAmount = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * SCROLL_AMOUNT,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByAmount(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByAmount(-1);
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-medium tracking-wide text-blue-600 uppercase">Our Expertise</span>
            <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-blue-900 sm:text-4xl">
              Engineering coverage across twelve service areas.
            </h2>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon" aria-label="Previous service" onClick={() => scrollByAmount(-1)}>
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next service" onClick={() => scrollByAmount(1)}>
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          role="region"
          aria-label="Our Expertise service areas"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-10 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ALL_SERVICES.map((service) => (
            <PhotoCard
              key={service.slug}
              href={`/expertise/${service.categorySlug}/${service.slug}`}
              imageSrc={`/expertise/${service.categorySlug}-${service.slug}.jpg`}
              imageAlt={service.name}
              title={service.name}
              subtitle={service.tagline}
              sizes="288px"
              className="w-72 shrink-0 snap-start"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
