import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { OpenRolesEmptyState } from "@/components/sections/careers/OpenRolesEmptyState";
import { BenefitsSection } from "@/components/sections/careers/BenefitsSection";
import { ResumeApplicationForm } from "@/components/sections/careers/ResumeApplicationForm";

export const metadata: Metadata = buildMetadata({
  title: "Careers | Velcor Engineering",
  description:
    "Join Velcor Engineering — work across product design and plant engineering disciplines. No open roles right now, but we're always interested in strong engineers.",
  path: "/careers",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Careers", url: "/careers" },
]);

export default function CareersPage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <CareersHero />
      <OpenRolesEmptyState />
      <BenefitsSection />
      <ResumeApplicationForm />
    </main>
  );
}
