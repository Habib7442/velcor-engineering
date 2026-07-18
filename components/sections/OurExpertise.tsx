"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SECTORS } from "@/lib/data/sectors";

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
    <section className="bg-petrol-50">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-medium tracking-wide text-petrol uppercase">Our Expertise</span>
            <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-graphite sm:text-4xl">
              Engineering coverage across twelve sectors.
            </h2>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous sector"
              onClick={() => scrollByAmount(-1)}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next sector" onClick={() => scrollByAmount(1)}>
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          role="region"
          aria-label="Our Expertise sectors"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-10 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SECTORS.map((sector) => (
            <div
              key={sector.slug}
              className="w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-white"
            >
              <div className="flex h-full flex-col p-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-amber-100">
                  <sector.icon className="size-5 text-petrol-700" aria-hidden="true" />
                </div>

                <h3 className="font-heading mt-4 text-lg font-semibold text-graphite">{sector.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sector.blurb}</p>

                <Button
                  variant="link"
                  className="mt-auto justify-start self-start pt-3 px-0 text-petrol hover:text-petrol-800"
                  nativeButton={false}
                  render={<Link href={`/our-expertise#${sector.slug}`} />}
                >
                  Read More
                  <ArrowRight className="size-4 text-amber-700" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
