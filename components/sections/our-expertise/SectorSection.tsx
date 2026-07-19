import type { Sector } from "@/lib/data/sectors";

type SectorSectionProps = {
  sector: Sector;
  index: number;
};

export function SectorSection({ sector, index }: SectorSectionProps) {
  const alt = index % 2 === 1;

  return (
    <section id={sector.slug} className={alt ? "scroll-mt-24 bg-petrol-50" : "scroll-mt-24 bg-white"}>
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-16">
        <div className="flex size-14 items-center justify-center rounded-full bg-amber-100">
          <sector.icon className="size-7 text-petrol-700" aria-hidden="true" />
        </div>

        <h2 className="font-heading mt-5 text-2xl font-semibold text-graphite sm:text-3xl">{sector.name}</h2>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{sector.description}</p>

        <ul className="mt-6 max-w-3xl sm:columns-2 sm:gap-x-8">
          {sector.capabilities.map((capability) => (
            <li
              key={capability}
              className="mb-2 flex items-start gap-2.5 text-sm font-medium text-graphite break-inside-avoid"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
              {capability}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
