import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/data/company";
import { SOCIAL_ICONS } from "@/lib/data/social-icons";

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-border bg-white p-8">
      <div>
        <h2 className="font-heading text-xl font-semibold text-graphite">Direct Contact</h2>

        <ul className="mt-5 flex flex-col gap-4">
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-petrol-700" aria-hidden="true" />
            <a href={`mailto:${company.email}`} className="text-sm text-graphite hover:text-petrol">
              {company.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-petrol-700" aria-hidden="true" />
            <a href={company.phone.href} className="text-sm text-graphite hover:text-petrol">
              {company.phone.display}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-petrol-700" aria-hidden="true" />
            <span className="text-sm text-graphite">{company.address}</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-graphite">Connect</h3>
        <div className="mt-3 flex items-center gap-3" role="group" aria-label="Social media">
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
    </div>
  );
}
