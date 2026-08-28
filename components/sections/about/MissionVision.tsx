import { Compass, Target, type LucideIcon } from "lucide-react";

const BLOCKS: { label: string; statement: string; icon: LucideIcon }[] = [
  {
    label: "Mission",
    statement:
      "To give industrial teams an engineering partner who covers the full span of a project — product design through plant engineering — without handing them off between vendors.",
    icon: Target,
  },
  {
    label: "Vision",
    statement:
      "To be the firm known for the same result on every project: work that holds up under review, delivered on the schedule we committed to.",
    icon: Compass,
  },
];

export function MissionVision() {
  return (
    <section className="bg-blue-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-2 lg:gap-8">
        {BLOCKS.map((block) => (
          <div
            key={block.label}
            className="rounded-lg border border-steel-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 p-8 shadow-sm"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-blue-100">
              <block.icon className="size-6 text-blue-800" aria-hidden="true" />
            </div>
            <span className="mt-5 block text-xs font-medium tracking-wide text-blue-600 uppercase">
              {block.label}
            </span>
            <p className="font-heading mt-3 text-2xl leading-snug font-semibold text-blue-900">{block.statement}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
