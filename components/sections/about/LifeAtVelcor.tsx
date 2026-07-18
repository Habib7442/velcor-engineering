const CALLOUTS = ["Cross-disciplinary teams", "Direct client access", "Ownership from concept to commissioning"];

export function LifeAtVelcor() {
  return (
    <section className="bg-bone">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <span className="text-xs font-medium tracking-wide text-petrol uppercase">Life at Velcor</span>
          <h2 className="font-heading mt-3 max-w-lg text-3xl leading-[1.15] font-semibold text-graphite sm:text-4xl">
            Engineers who see a project from sketch to startup.
          </h2>
          <div className="mt-5 max-w-xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Our teams are organized around disciplines, not job titles — an engineer working on a piping layout
              sits next to the person specifying the instrumentation for the same line, so conflicts surface in
              the model instead of on site.
            </p>
            <p>
              You work directly with the people doing the engineering, not through a layer of account management —
              the same team that scopes a project stays on it through commissioning.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-petrol-700 p-8 sm:p-10">
          <ul className="space-y-4">
            {CALLOUTS.map((callout) => (
              <li key={callout} className="flex items-start gap-3 text-base font-medium text-bone">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
                {callout}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
