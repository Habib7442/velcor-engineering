import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { EXPERTISE_CATEGORIES, getCategory } from "@/lib/data/expertise";
import { Button } from "@/components/ui/button";
import { PhotoCard } from "@/components/sections/expertise/PhotoCard";

type Params = { category: string };

export function generateStaticParams() {
  return EXPERTISE_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  return buildMetadata({
    title: `${category.name} | Velcor Engineering`,
    description: `${category.tagline} — ${category.services.length} engineering service areas, from ${category.services[0].name} to ${category.services[category.services.length - 1].name}.`,
    path: `/expertise/${category.slug}`,
  });
}

export default async function ExpertiseCategoryPage({ params }: { params: Promise<Params> }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Our Expertise", url: "/expertise" },
    { name: category.name, url: `/expertise/${category.slug}` },
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="relative overflow-hidden bg-blue-900">
        <Image
          src={`/expertise/${category.slug}.jpg`}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-20">
          <nav aria-label="Breadcrumb" className="text-xs text-steel-300">
            <Link href="/expertise" className="hover:text-white">
              Our Expertise
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="font-heading mt-4 max-w-2xl text-4xl leading-[1.1] font-semibold text-white sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-steel-300">{category.tagline}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <div className="max-w-3xl space-y-4">
            {category.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {category.services.map((service) => (
              <PhotoCard
                key={service.slug}
                href={`/expertise/${category.slug}/${service.slug}`}
                imageSrc={`/expertise/${category.slug}-${service.slug}.jpg`}
                imageAlt={service.name}
                title={service.name}
                subtitle={service.tagline}
                linkLabel="View scope"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-blue-900 sm:text-4xl">
              Looking for a custom solution?
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Tell us about your project and we&apos;ll scope the right engineering package.
            </p>
          </div>
          <Button size="lg" variant="accent" nativeButton={false} render={<Link href="/contact" />}>
            Talk to Us
          </Button>
        </div>
      </section>
    </main>
  );
}
