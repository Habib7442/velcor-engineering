import { SECTORS } from "@/lib/data/sectors";

export function ExpertiseHero() {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-10 sm:px-10 sm:pt-32">
        <span className="text-xs font-medium tracking-wide text-petrol uppercase">Our Expertise</span>
        <h1 className="font-heading mt-4 max-w-2xl text-4xl leading-[1.1] font-semibold text-graphite sm:text-5xl">
          Thirteen sectors, one engineering partner.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Every sector below is a discipline our team practices directly — not a subcontracted capability. Jump to
          the one you need, or read through to see how the pieces connect.
        </p>

        <nav aria-label="Jump to sector" className="mt-8 flex flex-wrap gap-2">
          {SECTORS.map((sector) => (
            <a
              key={sector.slug}
              href={`#${sector.slug}`}
              className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-medium text-graphite transition-colors hover:border-petrol/30 hover:text-petrol"
            >
              {sector.name}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
