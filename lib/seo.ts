import type { Metadata } from "next";

export const siteConfig = {
  name: "Velcor Engineering",
  url: "https://velcorengineering.com",
  titleTemplate: "%s | Velcor Engineering",
  defaultTitle: "Velcor Engineering | Product Design & Plant Engineering",
  defaultDescription:
    "Velcor Engineering is a multidisciplinary engineering and design partner delivering product design and plant engineering services to industrial clients worldwide.",
  logo: "/logo.png",
  sameAs: [] as string[],
};

type BuildMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const {
    title,
    description = siteConfig.defaultDescription,
    path = "/",
    noIndex = false,
  } = options;

  const url = new URL(path, siteConfig.url).toString();
  const resolvedTitle = title ?? siteConfig.defaultTitle;

  return {
    metadataBase: new URL(siteConfig.url),
    title: title ?? { default: siteConfig.defaultTitle, template: siteConfig.titleTemplate },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

type OrganizationJsonLd = {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
};

export function organizationJsonLd(): OrganizationJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: new URL(siteConfig.logo, siteConfig.url).toString(),
    sameAs: siteConfig.sameAs,
  };
}

type BreadcrumbItem = { name: string; url: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.url, siteConfig.url).toString(),
    })),
  };
}
