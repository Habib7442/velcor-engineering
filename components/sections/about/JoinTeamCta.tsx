import Link from "next/link";
import { Button } from "@/components/ui/button";

export function JoinTeamCta() {
  return (
    <section className="bg-petrol-700">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-bone sm:text-4xl">
            Build your career across disciplines.
          </h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-petrol-100">
            We&apos;re growing our product design and plant engineering teams. If you&apos;d rather work across
            disciplines than stay boxed into one, we want to hear from you.
          </p>
        </div>

        <Button size="lg" variant="accent" nativeButton={false} render={<Link href="/careers" />}>
          Join Our Growing Team
        </Button>
      </div>
    </section>
  );
}
