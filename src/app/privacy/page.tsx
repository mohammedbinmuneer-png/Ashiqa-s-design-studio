"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "A legal disclaimer",
    paragraphs: [
      "When you contact us through our website, we collect the information you provide in the contact form, including your name, email address, subject, and message. We may also collect technical data such as your IP address and browser user agent string to help protect our services and prevent spam.",
      "We use this information solely to respond to your inquiry and to communicate with you about our architecture and interior design services. We do not sell or share your personal information with third parties for marketing purposes.",
    ],
  },
  {
    title: "Embedded content from other websites",
    paragraphs: [
      "Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.",
      "These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.",
    ],
  },
  {
    title: "How long we retain your data",
    paragraphs: [
      "If you submit a contact form or send us an inquiry, we retain your message and the associated metadata for as long as necessary to respond to your request and maintain a record of our business correspondence.",
      "For career applications sent via email, we retain application materials for the duration of the recruitment process and for a reasonable period thereafter, unless you request deletion. You may contact us at any time to request access to, correction of, or deletion of your personal information.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>

          <div className="mt-10 space-y-12">
            {sections.map((section, idx) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
                className="space-y-4"
              >
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                  {section.title}
                </h2>
                {section.paragraphs.map((text) => (
                  <p
                    key={text.slice(0, 40)}
                    className="text-[#3F3F46] text-sm sm:text-base leading-relaxed font-sans"
                  >
                    {text}
                  </p>
                ))}
              </motion.section>
            ))}

            <p className="text-sm text-[#71717A] pt-4 border-t border-[#CEC8BA]/40">
              For privacy-related questions, contact us at{" "}
              <Link
                href="mailto:ashiqasdesignstudio@gmail.com"
                className="text-primary hover:underline"
              >
                ashiqasdesignstudio@gmail.com
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
