import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav-links";

const SOCIAL_ICONS = [
  { name: "Facebook", src: "/social-icons/facebook.png" },
  { name: "Instagram", src: "/social-icons/instagram.png" },
  { name: "LinkedIn", src: "/social-icons/linkedin.png" },
  { name: "WhatsApp", src: "/social-icons/whatsapp.png" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-petrol-700">
      <span
        aria-hidden="true"
        className="font-heading pointer-events-none absolute inset-x-0 bottom-[-0.28em] z-0 text-center text-[clamp(3rem,16vw,10rem)] leading-none font-semibold whitespace-nowrap text-petrol-500/20 select-none"
      >
        VELCOR ENGINEERING
      </span>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="font-heading text-xl font-semibold text-bone">
            Velcor <span className="font-normal text-petrol-100">Engineering</span>
          </span>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-petrol-100">
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

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-petrol-100 hover:text-bone">
              {link.label}
            </Link>
          ))}
        </nav>
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
