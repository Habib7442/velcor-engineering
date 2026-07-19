import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { ContactMap } from "@/components/sections/contact/ContactMap";

export const metadata: Metadata = buildMetadata({
  title: "Contact Velcor Engineering | Get a Quote",
  description:
    "Get in touch with Velcor Engineering for product design and plant engineering inquiries, or request a quote for your next project.",
  path: "/contact",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Contact", url: "/contact" },
]);

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <ContactHero />

      <section className="bg-bone">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 sm:px-10 sm:pb-24 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>

      <ContactMap />
    </main>
  );
}
