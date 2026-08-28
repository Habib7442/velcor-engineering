import { EXPERTISE_CATEGORIES } from "@/lib/data/expertise";

export type NavMenuColumn = {
  label: string;
  items: { name: string; href: string }[];
};

// One column per category, listing its services — drives the header's
// mega-menu directly from the same data the /expertise pages render, so
// the two can't drift out of sync.
export const EXPERTISE_MENU: NavMenuColumn[] = EXPERTISE_CATEGORIES.map((category) => ({
  label: category.name,
  items: category.services.map((service) => ({
    name: service.name,
    href: `/expertise/${category.slug}/${service.slug}`,
  })),
}));
