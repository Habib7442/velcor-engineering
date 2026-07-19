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
    <footer className="relative overflow-hidden bg-petrol-700">
      <span
        aria-hidden="true"
        className="font-heading pointer-events-none absolute inset-x-0 bottom-[-0.28em] z-0 text-center text-[clamp(1.25rem,5.5vw,7rem)] leading-none font-semibold tracking-tight whitespace-nowrap text-petrol-500/20 select-none"
      >
        VELCOR ENGINEERING
      </span>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Image
            src="/logo_non_transparent_cropped.png"
            alt="Velcor Engineering"
            width={1248}
            height={400}
            className="h-14 w-auto"
          />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-petrol-100">
            Product design and plant engineering for industrial teams who need it done right the first time.
          </p>

          <div className="mt-5 flex items-center gap-3" role="group" aria-label="Social media">
            {SOCIAL_ICONS.map((icon) => (
              <Image
                key={icon.name}
                src={icon.src}
                alt={icon.name}
                width={30}
                height={30}
                className="size-[30px] rounded-full"
              />
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2 lg:flex-col lg:gap-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-petrol-100 hover:text-bone">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 text-sm text-petrol-100">
          <span className="text-xs font-medium tracking-wide text-petrol-100/70 uppercase">Contact</span>
          <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-bone">
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            {company.email}
          </a>
          <a href={company.phone.href} className="flex items-center gap-2 hover:text-bone">
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            {company.phone.display}
          </a>
          <span className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span className="max-w-56">{company.address}</span>
          </span>
        </div>
      </div>

      <div className="relative z-10 border-t border-petrol-500/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p className="text-xs text-petrol-100">
            © {new Date().getFullYear()} Velcor Engineering. All rights reserved.
          </p>

          <nav aria-label="Legal" className="flex gap-x-6">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs font-medium text-petrol-100 hover:text-bone">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
