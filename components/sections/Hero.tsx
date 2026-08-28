"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const SERVICES = ["Automation", "Piping", "Electrical", "Mechanical", "Instrumentation", "Civil"];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[480px] items-center overflow-hidden lg:min-h-[600px]">
      <Image
        src="/hero_bg.png"
        alt=""
        aria-hidden="true"
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent sm:h-32 lg:h-40"
        aria-hidden="true"
      />

      <motion.div
        initial={shouldReduceMotion ? "show" : "hidden"}
        animate="show"
        variants={container}
        className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 pt-28 pb-10 sm:px-10 lg:max-w-6xl lg:pt-32 lg:pb-14"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center rounded-full border border-blue-600/20 bg-blue-600/5 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-600 uppercase"
        >
          Engineering | Automation | Technology
        </motion.span>

        <motion.h1
          variants={item}
          className="font-heading max-w-2xl text-4xl leading-[1.1] font-semibold text-blue-900 sm:text-5xl lg:text-6xl"
        >
          Engineering What <span className="text-blue-600">Powers</span> Tomorrow.
        </motion.h1>

        <motion.div variants={item} className="max-w-xl">
          <p className="-mx-3 rounded-lg bg-white/70 px-3 py-2 text-lg leading-relaxed text-blue-900 backdrop-blur-sm sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-muted-foreground sm:backdrop-blur-none">
            <span className="font-semibold text-blue-900">Velcor Engineering</span> delivers multidisciplinary
            solutions across industrial plants, engineered products, automation, and digital technology.
          </p>

          <ul className="-mx-3 mt-4 flex flex-wrap gap-x-6 gap-y-2 rounded-lg bg-white/70 px-3 py-2 backdrop-blur-sm sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
            {SERVICES.map((service) => (
              <li key={service} className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                <span className="size-1.5 rounded-full bg-muted-foreground" aria-hidden="true" />
                {service}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-4">
          <Button size="lg" nativeButton={false} render={<Link href="/expertise" />}>
            Explore Services
          </Button>
          <Button size="lg" variant="accent" nativeButton={false} render={<Link href="/contact" />}>
            Discuss Your Project
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
