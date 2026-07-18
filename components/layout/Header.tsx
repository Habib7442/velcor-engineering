"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/our-expertise", label: "Our Expertise" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        scrolled ? "border-border bg-bone/95 backdrop-blur" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="font-heading text-xl font-semibold text-petrol">
          Velcor <span className="font-normal text-graphite">Engineering</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-petrol",
                  active ? "text-petrol" : "text-graphite",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Button
          variant="accent"
          className="hidden lg:inline-flex"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          Talk to Us
        </Button>

        <Dialog.Root>
          <Dialog.Trigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu" />}>
            <Menu className="size-5" aria-hidden="true" />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-[60] bg-graphite/40 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
            <Dialog.Popup className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-xs flex-col gap-1 bg-bone p-6 shadow-xl transition-transform duration-200 ease-out data-ending-style:translate-x-full data-starting-style:translate-x-full">
              <div className="mb-6 flex items-center justify-between">
                <Dialog.Title className="font-heading text-lg font-semibold text-petrol">Menu</Dialog.Title>
                <Dialog.Close render={<Button variant="ghost" size="icon" aria-label="Close menu" />}>
                  <X className="size-5" aria-hidden="true" />
                </Dialog.Close>
              </div>

              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <Dialog.Close
                    key={link.href}
                    nativeButton={false}
                    render={<Link href={link.href} />}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-graphite hover:bg-petrol/5 hover:text-petrol"
                  >
                    {link.label}
                  </Dialog.Close>
                ))}
              </nav>

              <Button variant="accent" className="mt-4" nativeButton={false} render={<Link href="/contact" />}>
                Talk to Us
              </Button>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
