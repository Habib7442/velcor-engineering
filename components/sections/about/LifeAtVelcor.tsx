import Image from "next/image";

const CALLOUTS = ["Cross-disciplinary teams", "Direct client access", "Ownership from concept to commissioning"];

export function LifeAtVelcor() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <span className="text-xs font-medium tracking-wide text-blue-600 uppercase">Life at Velcor</span>
          <h2 className="font-heading mt-3 max-w-lg text-3xl leading-[1.15] font-semibold text-blue-900 sm:text-4xl">
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

        <div className="relative aspect-4/3 overflow-hidden rounded-lg">
          <Image
            src="/about/life-at-velcor.jpg"
            alt="Velcor engineering team collaborating"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-blue-950/0"
            aria-hidden="true"
          />
          <ul className="absolute inset-x-0 bottom-0 space-y-3 p-6 sm:p-8">
            {CALLOUTS.map((callout) => (
              <li key={callout} className="flex items-center gap-3 text-base font-medium text-white">
                <span className="size-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
                {callout}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
