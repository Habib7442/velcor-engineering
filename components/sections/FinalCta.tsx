import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-blue-900">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Let&apos;s build something great together
          </h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-steel-300">
            Tell us what you&apos;re working on — product design, plant engineering, or a project that spans both.
          </p>
        </div>

        <Button size="lg" variant="accent" nativeButton={false} render={<Link href="/contact" />}>
          Talk to Us
        </Button>
      </div>
    </section>
  );
}
