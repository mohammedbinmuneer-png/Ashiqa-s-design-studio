"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cookiePurposes = [
  "Improve the performance and functionality of the website.",
  "Allow us to serve relevant advertisements.",
  "Allow us to measure and improve the effectiveness of our advertising campaigns.",
  "Allow us to measure and improve the performance of our website.",
  "Store your preferences and personalize your experience.",
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 md:px-12 bg-[#D8D2C6]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[2rem] p-8 md:p-14 lg:p-16 shadow-sm"
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground pb-6 border-b border-[#CEC8BA]/60">
            Cookie Policy
          </h1>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 space-y-5"
          >
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
              A legal disclaimer
            </h2>
            <p className="text-[#3F3F46] text-sm sm:text-base leading-relaxed font-sans">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-[#3F3F46] text-sm sm:text-base leading-relaxed font-sans">
              {cookiePurposes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#3F3F46] text-sm sm:text-base leading-relaxed font-sans pt-2">
              Cookies are small text files stored on your device when you visit our website. You can
              control or disable cookies through your browser settings at any time. Please note that
              disabling cookies may affect certain features and functionality of this site.
            </p>
          </motion.section>

          <p className="text-sm text-[#71717A] pt-10 mt-10 border-t border-[#CEC8BA]/40">
            For questions about our use of cookies, contact us at{" "}
            <Link
              href="mailto:ashiqasdesignstudio@gmail.com"
              className="text-primary hover:underline"
            >
              ashiqasdesignstudio@gmail.com
            </Link>
            . See also our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
