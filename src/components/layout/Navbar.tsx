"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  { name: "Expertise", href: "/#expertise" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lightNav = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <>
      {/* Centered nav bar — links only */}
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-3 pointer-events-none">
        <div
          className={cn(
            "pointer-events-auto h-12 md:h-14 flex items-center justify-center rounded-xl px-6 md:px-10 transition-all duration-500",
            scrolled
              ? "bg-background/95 backdrop-blur-md border border-border shadow-sm"
              : "bg-transparent"
          )}
        >
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative py-0.5 text-[13px] uppercase tracking-[0.26em] transition-colors duration-300 hover:text-primary whitespace-nowrap",
                  lightNav
                    ? isActive(link.href)
                      ? "text-white font-semibold"
                      : "text-white/75 hover:text-white"
                    : isActive(link.href)
                      ? "text-primary font-semibold"
                      : "text-foreground/65"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 w-full h-px bg-primary origin-left transition-transform duration-300",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                  )}
                />
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <div className="lg:hidden fixed top-5 right-4 sm:right-6 z-[60]">
        <Sheet>
          <SheetTrigger>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Menu"
              className={cn(
                "h-10 w-10",
                lightNav ? "text-white hover:text-white/80" : "text-primary"
              )}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-l-border">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-8 mt-16">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xl font-heading tracking-widest uppercase hover:text-primary transition-colors text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
