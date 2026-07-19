import { PLANT_ENGINEERING_DISCIPLINES } from "@/lib/data/plant-engineering";

export function PlantEngineeringSection() {
  return (
    <section id="plant-engineering" className="scroll-mt-24 bg-petrol-50">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-wide text-petrol uppercase">Plant Engineering</span>
          <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-graphite sm:text-4xl">
            The facility work, discipline by discipline.
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {PLANT_ENGINEERING_DISCIPLINES.map((discipline, index) => (
            <div
              key={discipline.name}
              className={
                index % 2 === 1
                  ? "rounded-2xl border border-border bg-petrol-50 p-6 sm:p-8"
                  : "rounded-2xl border border-border bg-white p-6 sm:p-8"
              }
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <discipline.icon className="size-5 text-petrol-700" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-graphite">{discipline.name}</h3>
              </div>

              <ul className="mt-5 sm:columns-2 sm:gap-x-8">
                {discipline.deliverables.map((item) => (
                  <li
                    key={item}
                    className="mb-2 flex items-start gap-2.5 text-sm font-medium text-graphite break-inside-avoid"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
