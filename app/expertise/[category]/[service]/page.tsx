import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { ALL_SERVICES, getCategory, getService } from "@/lib/data/expertise";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Params = { category: string; service: string };

export function generateStaticParams() {
  return ALL_SERVICES.map((service) => ({ category: service.categorySlug, service: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category: categorySlug, service: serviceSlug } = await params;
  const service = getService(categorySlug, serviceSlug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.name} | Velcor Engineering`,
    description: `${service.tagline} — ${service.deliverables.slice(0, 4).join(", ")}, and more.`,
    path: `/expertise/${service.categorySlug}/${service.slug}`,
  });
}

export default async function ExpertiseServicePage({ params }: { params: Promise<Params> }) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const service = getService(categorySlug, serviceSlug);
  const category = getCategory(categorySlug);
  if (!service || !category) notFound();

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Our Expertise", url: "/expertise" },
    { name: category.name, url: `/expertise/${category.slug}` },
    { name: service.name, url: `/expertise/${category.slug}/${service.slug}` },
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="relative overflow-hidden bg-blue-900">
        <Image
          src={`/expertise/${category.slug}-${service.slug}.jpg`}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-20">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 text-xs text-steel-300">
            <Link href="/expertise" className="hover:text-white">
              Our Expertise
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/expertise/${category.slug}`} className="hover:text-white">
              {category.name}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">{service.name}</span>
          </nav>
          <h1 className="font-heading mt-4 max-w-2xl text-4xl leading-[1.1] font-semibold text-white sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-steel-300">{service.tagline}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <div className="max-w-3xl space-y-4 border-l-2 border-blue-500 pl-6">
            {service.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <h2 className="font-heading text-2xl font-bold text-blue-900 sm:text-3xl">Our Engineering Scope</h2>
          <div className={cn("mt-6 grid gap-6", service.scope.length > 1 && "lg:grid-cols-2")}>
            {service.scope.map((group, index) => (
              <div key={group.groupLabel ?? index} className="rounded-lg border border-steel-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6 shadow-sm sm:p-7">
                {group.groupLabel && (
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-800">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-blue-900">{group.groupLabel}</h3>
                  </div>
                )}
                <ul className={cn("space-y-2.5", group.groupLabel && "mt-4")}>
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {service.applications && (
            <div className="mt-8 rounded-lg border border-steel-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6 shadow-sm sm:p-7">
              <h2 className="font-heading text-2xl font-bold text-blue-900 sm:text-3xl">Typical Applications</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.applications.map((application) => (
                  <span key={application} className="rounded-full border border-steel-200 px-3.5 py-1.5 text-sm text-blue-900">
                    {application}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 rounded-lg border border-steel-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl font-bold text-blue-900 sm:text-3xl">Key Deliverables</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.deliverables.map((deliverable) => (
                <span key={deliverable} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-blue-900 shadow-xs">
                  {deliverable}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-900">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
              Let&apos;s scope your {service.name.toLowerCase()} project.
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-steel-300">
              Send us your requirements and we&apos;ll respond with a scoping call or a written proposal.
            </p>
          </div>
          <Button size="lg" variant="accent" nativeButton={false} render={<Link href="/contact" />}>
            Discuss Your Project
          </Button>
        </div>
      </section>
    </main>
  );
}
