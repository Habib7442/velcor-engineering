"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown, ChevronRight, Mail, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/nav-links";
import { EXPERTISE_MENU, type NavMenuColumn } from "@/lib/data/nav-menu";
import { company } from "@/lib/data/company";
import { SOCIAL_ICONS } from "@/lib/data/social-icons";

const MEGA_MENUS: Record<string, NavMenuColumn[]> = {
  "/expertise": EXPERTISE_MENU,
};

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-950 bg-blue-900">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-horizontal-white.png"
            alt="Velcor Engineering"
            width={800}
            height={251}
            loading="eager"
            quality={100}
            className="h-11 w-auto"
          />
        </Link>

        <NavigationMenu.Root className="hidden lg:block" aria-label="Primary">
          <NavigationMenu.List className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              const menu = MEGA_MENUS[link.href];

              if (!menu) {
                return (
                  <NavigationMenu.Item key={link.href}>
                    <NavigationMenu.Link
                      render={<Link href={link.href} />}
                      active={active}
                      className={cn(
                        "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active ? "text-white" : "text-steel-300 hover:text-white",
                      )}
                    >
                      {link.label}
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                );
              }

              return (
                <NavigationMenu.Item key={link.href}>
                  <NavigationMenu.Trigger
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active ? "text-white" : "text-steel-300 hover:text-white",
                    )}
                  >
                    {link.label}
                    <NavigationMenu.Icon className="transition-transform duration-200 data-[popup-open]:rotate-180">
                      <ChevronDown className="size-3.5" aria-hidden="true" />
                    </NavigationMenu.Icon>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <div
                      className="grid gap-8 p-7"
                      style={{ gridTemplateColumns: `repeat(${menu.length}, minmax(14rem, 1fr))` }}
                    >
                      {menu.map((column) => (
                        <div key={column.label}>
                          <p className="text-xs font-semibold tracking-wide text-blue-900 uppercase">
                            {column.label}
                          </p>
                          <ul className="mt-3 flex flex-col gap-2.5">
                            {column.items.map((item) => (
                              <li key={item.name}>
                                <NavigationMenu.Link
                                  render={<Link href={item.href} />}
                                  closeOnClick
                                  className="text-sm text-steel-500 transition-colors hover:text-blue-600"
                                >
                                  {item.name}
                                </NavigationMenu.Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>

          <NavigationMenu.Portal>
            <NavigationMenu.Positioner sideOffset={12} collisionPadding={24} className="z-50 box-border">
              <NavigationMenu.Popup className="origin-[var(--transform-origin)] rounded-lg border border-steel-200 bg-white shadow-lg transition-[transform,opacity] duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
                <NavigationMenu.Viewport />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>

        <Button
          variant="accent"
          className="hidden lg:inline-flex"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          Discuss Your Project
        </Button>

        <Dialog.Root>
          <Dialog.Trigger
            render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu" />}
          >
            <Menu className="size-5" aria-hidden="true" />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-[60] bg-blue-950/50 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
            <Dialog.Popup className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out data-ending-style:translate-x-full data-starting-style:translate-x-full">
              <div className="flex items-center justify-between border-b border-steel-200 px-6 py-5">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Image
                  src="/logo-horizontal.png"
                  alt="Velcor Engineering"
                  width={800}
                  height={251}
                  quality={100}
                  className="h-9 w-auto"
                />
                <Dialog.Close render={<Button variant="ghost" size="icon" aria-label="Close menu" />}>
                  <X className="size-5" aria-hidden="true" />
                </Dialog.Close>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6" aria-label="Mobile">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Dialog.Close
                      key={link.href}
                      nativeButton={false}
                      render={<Link href={link.href} />}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium transition-colors",
                        active ? "bg-blue-50 text-blue-600" : "text-blue-900 hover:bg-blue-50 hover:text-blue-600",
                      )}
                    >
                      {link.label}
                      <ChevronRight
                        className={cn(
                          "size-4 transition-colors",
                          active ? "text-blue-600" : "text-steel-300 group-hover:text-blue-600",
                        )}
                        aria-hidden="true"
                      />
                    </Dialog.Close>
                  );
                })}
              </nav>

              <div className="border-t border-steel-200 px-6 py-6">
                <Button variant="accent" size="lg" className="w-full" nativeButton={false} render={<Link href="/contact" />}>
                  Discuss Your Project
                </Button>

                <div className="mt-6 flex flex-col gap-2.5 text-sm">
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-2.5 text-steel-500 hover:text-blue-600"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden="true" />
                    {company.email}
                  </a>
                  <a href={company.phone.href} className="flex items-center gap-2.5 text-steel-500 hover:text-blue-600">
                    <Phone className="size-4 shrink-0" aria-hidden="true" />
                    {company.phone.display}
                  </a>
                </div>

                <div className="mt-5 flex items-center gap-3" role="group" aria-label="Social media">
                  {SOCIAL_ICONS.map((icon) => (
                    <Image key={icon.name} src={icon.src} alt={icon.name} width={28} height={28} className="size-7 rounded-full" />
                  ))}
                </div>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
