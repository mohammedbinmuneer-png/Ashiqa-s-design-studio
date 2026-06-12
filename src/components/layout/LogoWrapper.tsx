"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function LogoWrapper() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjectsOrContact = pathname.startsWith("/projects") || pathname === "/contact";
  // Simpler, deterministic logo visibility: always show logo in a visible pill container.

  return (
    <Link href="/" className="fixed top-3 left-3 z-[90] group" aria-label="Ashiqa's Design Studio — Home">
      <span className="inline-flex items-center justify-center rounded-md p-1 bg-ash-off-white/90 ring-1 ring-border shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/LOGO.png"
          alt="Ashiqa's Design Studio"
          className="h-[165px] w-auto transition-opacity duration-300 group-hover:opacity-90"
          style={{ willChange: "opacity" }}
        />
      </span>
    </Link>
  );
}
