const BLOCKS = [
  {
    label: "Mission",
    statement:
      "To give industrial teams an engineering partner who covers the full span of a project — product design through plant engineering — without handing them off between vendors.",
  },
  {
    label: "Vision",
    statement:
      "To be the firm known for the same result on every project: work that holds up under review, delivered on the schedule we committed to.",
  },
];

export function MissionVision() {
  return (
    <section className="bg-petrol-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-2 lg:gap-16">
        {BLOCKS.map((block) => (
          <div key={block.label}>
            <span className="text-xs font-medium tracking-wide text-petrol uppercase">{block.label}</span>
            <p className="font-heading mt-3 text-2xl leading-snug font-semibold text-graphite sm:text-3xl">
              {block.statement}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
