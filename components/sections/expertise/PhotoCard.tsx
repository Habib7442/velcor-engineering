import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PhotoCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  linkLabel?: string;
  sizes?: string;
  className?: string;
};

export function PhotoCard({
  href,
  imageSrc,
  imageAlt,
  title,
  subtitle,
  linkLabel = "Read More",
  sizes = "(min-width: 768px) 33vw, 100vw",
  className,
}: PhotoCardProps) {
  return (
    <Link href={href} className={cn("group relative block aspect-[4/5] overflow-hidden rounded-lg", className)}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/55 to-blue-950/5" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-steel-300">{subtitle}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white">
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
