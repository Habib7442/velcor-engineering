import type { Metadata } from "next";
import { company } from "@/lib/data/company";

export const siteConfig = {
  name: "Velcor Engineering",
  url: "https://velcorengineering.com",
  titleTemplate: "%s | Velcor Engineering",
  defaultTitle: "Velcor Engineering | Product Design & Plant Engineering",
  defaultDescription:
    "Velcor Engineering is a multidisciplinary engineering and design partner delivering product design and plant engineering services to industrial clients worldwide.",
  logo: "/logo_transparent.png",
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
    icons: {
      icon: [
        { url: "/favicons/favicon.ico", sizes: "any" },
        { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/favicons/site.webmanifest",
    // Only rendered once a real code is supplied -- Search Console gives
    // you this after adding the property, there's nothing to fill in
    // ahead of time.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
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

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    image: new URL(siteConfig.logo, siteConfig.url).toString(),
    telephone: company.phone.href.replace("tel:", ""),
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.addressParts.streetAddress,
      addressLocality: company.addressParts.addressLocality,
      addressRegion: company.addressParts.addressRegion,
      postalCode: company.addressParts.postalCode,
      addressCountry: company.addressParts.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
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
