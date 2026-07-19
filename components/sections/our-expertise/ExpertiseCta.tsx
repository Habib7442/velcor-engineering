import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ExpertiseCta() {
  return (
    <section className="bg-petrol-700">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-bone sm:text-4xl">
            Don&apos;t see your exact discipline?
          </h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-petrol-100">
            Most projects span more than one sector. Tell us what you&apos;re working on and we&apos;ll tell you how
            we&apos;d approach it.
          </p>
        </div>

        <Button size="lg" variant="accent" nativeButton={false} render={<Link href="/contact" />}>
          Talk to Us
        </Button>
      </div>
    </section>
  );
}
