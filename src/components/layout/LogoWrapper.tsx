"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function LogoWrapper() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjectsOrContact = pathname.startsWith("/projects") || pathname === "/contact";
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  useEffect(() => {
    if (!isHome) {
      setIsDarkBackground(true);
      return;
    }

    const handleScroll = () => {
      // Check the element at the top-center of the viewport
      const element = document.elementFromPoint(window.innerWidth / 2, 100);

      if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        // Parse RGB value and calculate luminance
        const rgb = bgColor.match(/\d+/g);

        if (rgb && rgb.length >= 3) {
          const r = parseInt(rgb[0]);
          const g = parseInt(rgb[1]);
          const b = parseInt(rgb[2]);

          // Calculate relative luminance
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // If luminance > 0.5, it's a light background (show black logo)
          setIsDarkBackground(luminance < 0.5);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <Link href="/" className="fixed top-3 left-3 z-[90] group" aria-label="Ashiqa's Design Studio — Home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/LOGO.png"
        alt="Ashiqa's Design Studio"
        className={`h-[160px] w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:opacity-90 ${
          !isProjectsOrContact && isDarkBackground ? "brightness-0 invert" : ""
        }`}
        style={{ willChange: "filter, opacity" }}
      />
    </Link>
  );
}
