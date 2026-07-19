import { GraduationCap, Layers, TrendingUp, UserCheck, type LucideIcon } from "lucide-react";

type Benefit = {
  name: string;
  description: string;
  icon: LucideIcon;
};

const BENEFITS: Benefit[] = [
  {
    name: "Cross-disciplinary work",
    description:
      "You won't spend years on one narrow slice of a project. Move between product design and plant engineering as the work calls for it.",
    icon: Layers,
  },
  {
    name: "Direct project ownership",
    description:
      "No hand-off to a separate delivery team. The engineer who scopes a project stays on it through commissioning.",
    icon: UserCheck,
  },
  {
    name: "Breadth across sectors",
    description:
      "Work spans water treatment, power, automotive, solar, and more — instead of specializing narrowly by default.",
    icon: TrendingUp,
  },
  {
    name: "Learning that isn't self-funded",
    description: "Time and support for the certifications and tools a project actually needs, not just what you already know.",
    icon: GraduationCap,
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-petrol-50">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-wide text-petrol uppercase">Why Velcor</span>
          <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-graphite sm:text-4xl">
            What working here actually looks like.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <div key={benefit.name} className="rounded-2xl border border-border bg-white p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-amber-100">
                <benefit.icon className="size-5 text-petrol-700" aria-hidden="true" />
              </div>
              <h3 className="font-heading mt-4 text-lg font-semibold text-graphite">{benefit.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
