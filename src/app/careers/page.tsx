"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";

const CAREERS_EMAIL = "ashiqasdesignstudio@gmail.com";

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 md:px-12 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white rounded-[2rem] p-8 md:p-14 lg:p-20 shadow-sm space-y-12 md:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Work With Us
            </h1>

            <div className="space-y-6 lg:pt-2">
              <p className="text-ash-slate text-sm sm:text-base leading-relaxed max-w-md lg:ml-auto lg:text-right">
                We&apos;re looking for the best people to join our innovative team. Submit your
                application today.
              </p>
              <div className="flex lg:justify-end">
                <Link
                  href={`mailto:${CAREERS_EMAIL}?subject=Career%20Application%20-%20Ashiqa's%20Design%20Studio`}
                  className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ash-fog group-hover:border-primary group-hover:bg-primary/5 transition-colors">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="text-sm sm:text-base font-sans underline-offset-4 group-hover:underline">
                    {CAREERS_EMAIL}
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative overflow-hidden rounded-[2rem] aspect-[16/9] md:aspect-[21/9] bg-ash-fog"
          >
            <img
              src="/stock/careers-hero.jpg"
              alt="Design team collaborating over architectural plans"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
