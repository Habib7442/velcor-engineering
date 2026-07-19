import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = ["Automation", "Piping", "Electrical", "Mechanical", "Instrumentation", "Civil"];

export function WhoWeAre() {
  return (
    <section className="bg-bone">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <div className="order-2 overflow-hidden rounded-3xl lg:order-1">
          <Image
            src="/assets/who_we_are.png"
            alt="Velcor Engineering team reviewing plant engineering drawings"
            width={960}
            height={720}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="order-1 flex flex-col items-start gap-5 lg:order-2">
          <span className="text-xs font-medium tracking-wide text-petrol uppercase">Who We Are</span>

          <h2 className="font-heading max-w-xl text-3xl leading-[1.15] font-semibold text-graphite sm:text-4xl">
            A multidisciplinary engineering partner, not a single-service vendor.
          </h2>

          <div className="max-w-xl">
            <p className="text-lg leading-relaxed text-muted-foreground">
              <span className="font-semibold text-graphite">Velcor Engineering</span> brings product design and
              plant engineering under one roof, so industrial teams get coordinated work from a single accountable
              partner instead of stitching together specialists themselves.
            </p>

            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-2 text-sm font-semibold text-graphite">
                  <span className="size-1.5 rounded-full bg-muted-foreground" aria-hidden="true" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="link"
            className="px-0 text-petrol hover:text-petrol-800"
            nativeButton={false}
            render={<Link href="/about" />}
          >
            Learn More
            <ArrowRight
              className="size-4 text-amber-700 transition-transform group-hover/button:translate-x-0.5"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
