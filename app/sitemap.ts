import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { EXPERTISE_CATEGORIES } from "@/lib/data/expertise";

// Only real, indexable pages -- privacy-policy and terms are noIndex
// (see lib/seo.ts buildMetadata calls) and deliberately excluded here,
// since listing a page in the sitemap while telling crawlers not to
// index it sends a mixed signal.
const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/expertise", changeFrequency: "monthly", priority: 0.8 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
];

// Generated from the same data the /expertise pages render, so the
// sitemap can't drift out of sync with the actual routes.
function expertiseRoutes(): { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] {
  return EXPERTISE_CATEGORIES.flatMap((category) => [
    { path: `/expertise/${category.slug}`, changeFrequency: "monthly" as const, priority: 0.7 },
    ...category.services.map((service) => ({
      path: `/expertise/${category.slug}/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [...ROUTES, ...expertiseRoutes()].map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
