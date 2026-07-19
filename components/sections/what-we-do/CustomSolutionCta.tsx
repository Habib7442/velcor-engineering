import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CustomSolutionCta() {
  return (
    <section className="bg-petrol-700">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-bone sm:text-4xl">
            Looking for a Custom Solution?
          </h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-petrol-100">
            If your project spans a mix of these disciplines, or something outside this list entirely, tell us
            about it and we&apos;ll scope it directly.
          </p>
        </div>

        <Button size="lg" variant="accent" nativeButton={false} render={<Link href="/contact" />}>
          Talk to Us
        </Button>
      </div>
    </section>
  );
}
