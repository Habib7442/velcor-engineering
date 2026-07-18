import { Award, HandHeart, Lightbulb, ShieldCheck, Target, Users, type LucideIcon } from "lucide-react";

type Value = {
  name: string;
  description: string;
  icon: LucideIcon;
};

const VALUES: Value[] = [
  {
    name: "Collaborative",
    description:
      "We work inside your team, not around it — sharing models, drawings, and decisions as they happen instead of at handoff.",
    icon: Users,
  },
  {
    name: "Inclusive",
    description: "Good engineering comes from different vantage points. We build project teams, and partnerships, that reflect that.",
    icon: HandHeart,
  },
  {
    name: "Innovative",
    description:
      "We reach for proven methods first and new ones when they earn their place — the right tool for the constraint in front of us, not novelty for its own sake.",
    icon: Lightbulb,
  },
  {
    name: "Excellence",
    description:
      "Drawings, calculations, and code get checked before they leave our hands, not after a client catches the error.",
    icon: Award,
  },
  {
    name: "Impact-Driven",
    description:
      "We measure a project by what it does once it's running — uptime, throughput, safety margin — not by hours logged designing it.",
    icon: Target,
  },
  {
    name: "Integrity",
    description: "If a deadline, budget, or design choice won't hold up, we say so before it becomes your problem.",
    icon: ShieldCheck,
  },
];

export function CultureValues() {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-wide text-petrol uppercase">Culture &amp; Values</span>
          <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-graphite sm:text-4xl">
            What guides how we work.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.name} className="rounded-2xl border border-border bg-white p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-amber-100">
                <value.icon className="size-5 text-petrol-700" aria-hidden="true" />
              </div>
              <h3 className="font-heading mt-4 text-lg font-semibold text-graphite">{value.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
