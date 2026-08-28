import Image from "next/image";

export function AboutHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <span className="text-xs font-medium tracking-wide text-blue-600 uppercase">About Velcor</span>

          <h1 className="font-heading mt-4 max-w-xl text-4xl leading-[1.1] font-semibold text-blue-900 sm:text-5xl">
            Engineering depth, without the vendor hand-offs.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Velcor Engineering is a multidisciplinary engineering and design partner. We cover product design and
            plant engineering under one roof — automation, piping, electrical, mechanical, instrumentation, and civil
            — so industrial teams work with one accountable partner instead of coordinating a chain of specialists
            themselves.
          </p>
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-lg">
          <Image
            src="/about/hero.jpg"
            alt="Velcor engineers reviewing project drawings"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
