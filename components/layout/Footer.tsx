import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav-links";
import { SOCIAL_ICONS } from "@/lib/data/social-icons";
import { company } from "@/lib/data/company";

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-blue-500/30 bg-blue-900">
      <span
        aria-hidden="true"
        className="font-heading pointer-events-none absolute inset-x-0 bottom-[-0.28em] z-0 text-center text-[clamp(1.25rem,5.5vw,7rem)] leading-none font-semibold tracking-tight whitespace-nowrap text-blue-500/20 select-none"
      >
        VELCOR ENGINEERING
      </span>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Image
            src="/logo-horizontal-white.png"
            alt="Velcor Engineering"
            width={800}
            height={251}
            loading="eager"
            quality={100}
            className="h-14 w-auto"
          />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-steel-300">
            Product design and plant engineering for industrial teams who need it done right the first time.
          </p>

          <div className="mt-5 flex items-center gap-3" role="group" aria-label="Social media">
            {SOCIAL_ICONS.map((icon) => (
              <a key={icon.name} href={icon.href} target="_blank" rel="noopener noreferrer" aria-label={icon.name}>
                <Image src={icon.src} alt={icon.name} width={30} height={30} className="size-[30px] rounded-full" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2 lg:flex-col lg:gap-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-steel-300 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 text-sm text-steel-300">
          <span className="text-xs font-medium tracking-wide text-steel-300/70 uppercase">Contact</span>
          <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white">
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            {company.email}
          </a>
          <a href={company.usPhone.href} className="flex items-center gap-2 hover:text-white">
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-white">US:</span> {company.usPhone.display}
          </a>
          <a href={company.phone.href} className="flex items-center gap-2 hover:text-white">
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-white">INDIA:</span> {company.phone.display}
          </a>
          <span className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span className="max-w-56">{company.address}</span>
          </span>
        </div>
      </div>

      <div className="relative z-10 border-t border-blue-500/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p className="text-xs text-steel-300">
            © {new Date().getFullYear()} Velcor Engineering. All rights reserved.
          </p>

          <nav aria-label="Legal" className="flex gap-x-6">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs font-medium text-steel-300 hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
