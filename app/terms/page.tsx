import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | Velcor Engineering",
  description: "The terms governing your use of the Velcor Engineering website.",
  path: "/terms",
  noIndex: true,
});

const SECTIONS = [
  {
    heading: "Acceptance of Terms",
    body: "By accessing or using this website, you agree to these Terms of Service. If you do not agree, please do not use this site.",
  },
  {
    heading: "Use of This Website",
    body: "This website is provided to give you information about Velcor Engineering's product design and plant engineering services and to let you request a quote or get in touch. You agree to use it only for lawful purposes and not to submit false, misleading, or malicious information through our forms.",
  },
  {
    heading: "Intellectual Property",
    body: "All text, graphics, logos, and other content on this website are the property of Velcor Engineering or its licensors and are protected by applicable intellectual property laws. You may view and share pages of this site for personal or internal business reference, but may not reproduce, modify, or distribute our content for commercial purposes without our written permission.",
  },
  {
    heading: "Engineering Services Disclaimer",
    body: "Content on this website — including service descriptions, capability lists, and case study summaries — is provided for general informational purposes only and does not constitute engineering advice, a proposal, or an offer capable of acceptance. Any actual engineering services are governed exclusively by a separate, signed engagement agreement between Velcor Engineering and the client, which takes precedence over anything described on this site.",
  },
  {
    heading: "Third-Party Links",
    body: "This site may reference or link to third-party websites or services. We do not control and are not responsible for the content, accuracy, or practices of any third-party site.",
  },
  {
    heading: "Limitation of Liability",
    body: "This website and its content are provided \"as is\" without warranties of any kind, express or implied. To the fullest extent permitted by law, Velcor Engineering is not liable for any indirect, incidental, or consequential damages arising from your use of this website.",
  },
  {
    heading: "Indemnification",
    body: "You agree to indemnify and hold Velcor Engineering harmless from any claims, damages, or expenses arising from your misuse of this website or violation of these Terms.",
  },
  {
    heading: "Governing Law",
    body: "These Terms are governed by the laws applicable in the jurisdiction in which Velcor Engineering operates, without regard to conflict-of-law principles.",
  },
  {
    heading: "Changes to These Terms",
    body: "We may update these Terms from time to time. The \"Effective Date\" below reflects the most recent revision. Continued use of this website after a change constitutes acceptance of the updated Terms.",
  },
  {
    heading: "Contact Us",
    body: "If you have questions about these Terms, contact us at info@velcorengineering.com.",
  },
];

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col bg-bone">
      <div className="mx-auto w-full max-w-3xl px-6 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-24">
        <h1 className="font-heading text-4xl font-semibold text-graphite sm:text-5xl">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted-foreground">Effective Date: July 18, 2026</p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-xl font-semibold text-graphite">{section.heading}</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
