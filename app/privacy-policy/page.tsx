import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Velcor Engineering",
  description: "How Velcor Engineering collects, uses, and protects information submitted through this website.",
  path: "/privacy-policy",
  noIndex: true,
});

const SECTIONS = [
  {
    heading: "Introduction & Scope",
    body: "This Privacy Policy explains how Velcor Engineering (\"Velcor,\" \"we,\" \"us\") collects, uses, and protects information when you visit this website or submit information through our contact or newsletter forms. It does not cover information exchanged through a signed engineering services agreement, which is governed separately by that agreement.",
  },
  {
    heading: "Information We Collect",
    body: "When you submit our contact form, we collect your name, email address, and message, along with company, phone, and service-of-interest fields if you provide them. When you subscribe to our newsletter, we collect your email address and your consent to receive communications. If analytics are enabled on this site, we also collect standard technical information such as pages visited, device type, and approximate location, only after you accept cookies through our consent notice.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use contact-form submissions to respond to inquiries and quote requests, and newsletter-form submissions to send communications you've asked to receive. We use analytics data, where enabled, to understand how visitors use the site and to improve it. We do not use form submissions for advertising or sell your information to third parties.",
  },
  {
    heading: "Cookies & Analytics",
    body: "This site uses cookies only where necessary for the site to function and, if you consent, for web analytics. You will see a consent notice before any non-essential cookie is set, and you may decline analytics cookies without affecting your ability to use the site.",
  },
  {
    heading: "Data Sharing & Third Parties",
    body: "Form submissions are stored with Supabase, our database provider, acting as a data processor on our behalf. Where a CAPTCHA service is used to prevent spam submissions, that provider processes limited technical data as part of verifying your submission. We do not share your information with any other third party except where required by law.",
  },
  {
    heading: "Data Retention",
    body: "We retain contact-form submissions for as long as reasonably necessary to respond to your inquiry and maintain business records, and newsletter subscriber records until you unsubscribe or request deletion.",
  },
  {
    heading: "Your Rights",
    body: "Depending on where you're located, you may have the right to request access to, correction of, or deletion of the information we hold about you, and to withdraw newsletter consent at any time. To exercise any of these rights, contact us using the details below.",
  },
  {
    heading: "Data Security",
    body: "We use industry-standard technical safeguards, including access-controlled, server-side-only writes to our database, to protect the information you submit. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    heading: "Children's Privacy",
    body: "This website is intended for business use and is not directed at children. We do not knowingly collect information from children.",
  },
  {
    heading: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. The \"Effective Date\" below reflects the most recent revision.",
  },
  {
    heading: "Contact Us",
    body: "If you have questions about this Privacy Policy or wish to exercise your rights over your information, contact us at info@velcorengineering.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-1 flex-col bg-bone">
      <div className="mx-auto w-full max-w-3xl px-6 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-24">
        <h1 className="font-heading text-4xl font-semibold text-graphite sm:text-5xl">Privacy Policy</h1>
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
