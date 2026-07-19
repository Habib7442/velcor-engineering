"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const MIN_DISPLAY_MS = 900;

export function Preloader() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(!shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const start = Date.now();

    function finish() {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => setVisible(false), remaining);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      return () => window.removeEventListener("load", finish);
    }
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-petrol-700"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src="/logo_white_small.png"
                alt="Velcor Engineering"
                width={680}
                height={218}
                priority
                className="h-10 w-auto sm:h-12"
              />
            </motion.div>

            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-petrol-500/30">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
                className="h-full w-full rounded-full bg-amber"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
