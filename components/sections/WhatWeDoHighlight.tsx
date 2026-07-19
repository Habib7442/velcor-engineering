import Link from "next/link";
import { ArrowRight, Boxes, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";

const HIGHLIGHTS = [
  {
    name: "Product Design",
    description:
      "We design the machine — automation, control systems, robotics, embedded products — from concept through a build-ready package.",
    href: "/what-we-do#product-design",
    icon: Boxes,
  },
  {
    name: "Plant Engineering",
    description:
      "We engineer the facility it runs in — piping, electrical, mechanical, instrumentation, and civil — discipline by discipline, to code.",
    href: "/what-we-do#plant-engineering",
    icon: Factory,
  },
];

export function WhatWeDoHighlight() {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-wide text-petrol uppercase">What We Do</span>
          <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-graphite sm:text-4xl">
            Two halves of one offering.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {HIGHLIGHTS.map((item) => (
            <div key={item.name} className="rounded-2xl border border-border bg-white p-8">
              <div className="flex size-12 items-center justify-center rounded-full bg-amber-100">
                <item.icon className="size-6 text-petrol-700" aria-hidden="true" />
              </div>
              <h3 className="font-heading mt-5 text-xl font-semibold text-graphite">{item.name}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.description}</p>

              <Button
                variant="link"
                className="mt-4 px-0 text-petrol hover:text-petrol-800"
                nativeButton={false}
                render={<Link href={item.href} />}
              >
                Learn More
                <ArrowRight className="size-4 text-amber-700" aria-hidden="true" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
