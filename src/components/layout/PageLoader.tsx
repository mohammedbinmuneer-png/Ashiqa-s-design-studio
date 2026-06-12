"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MIN_LOAD_MS = 2800;
const WRITE_DURATION = 2.4;

export function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    const started = Date.now();

    const finish = () => {
      const elapsed = Date.now() - started;
      const wait = Math.max(0, MIN_LOAD_MS - elapsed);
      window.setTimeout(() => setPhase("exit"), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => window.removeEventListener("load", finish);
  }, []);

  useEffect(() => {
    if (phase === "loading") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const timer = window.setTimeout(() => setPhase("done"), 900);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          aria-hidden={phase === "exit"}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.45)_0%,transparent_55%)]" />

          <div className="relative px-6">
            {/* Writing cursor */}
            <motion.div
              className="absolute top-[-8%] bottom-[-8%] w-[2px] bg-gradient-to-b from-transparent via-white/80 to-transparent z-20 shadow-[0_0_12px_rgba(255,255,255,0.45)]"
              initial={{ left: "0%", opacity: 0 }}
              animate={{
                left: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: WRITE_DURATION,
                ease: [0.45, 0, 0.2, 1],
                times: [0, 0.05, 0.92, 1],
              }}
            />

            {/* Logo reveal — written left to right */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{
                duration: WRITE_DURATION,
                ease: [0.45, 0, 0.2, 1],
              }}
              className="relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/LOGO.png"
                alt="Ashiqa's Design Studio"
                className="h-[140px] sm:h-[160px] md:h-[190px] lg:h-[220px] w-auto brightness-0 invert"
              />
            </motion.div>
          </div>

          {/* Loading label */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: WRITE_DURATION * 0.55, duration: 0.5 }}
          >
            <p className="text-[11px] uppercase tracking-[0.45em] text-ash-white/35 font-sans">
              Loading
            </p>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-1 w-1 rounded-full bg-primary/80"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.1, 0.85] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
