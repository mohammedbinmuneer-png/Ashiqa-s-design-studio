import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 md:py-12 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="bg-[#D3BAA1] text-[#1A1A1A] rounded-[2rem] p-10 md:p-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-heading tracking-[0.15em] leading-tight">
                Ashiqa&apos;s
                <br />
                Design Studio
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-[#1A1A1A]/85">
                Bring your dreams into reality by breathing life into your ideas and visions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <ul className="space-y-2.5">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#expertise" className="hover:text-white transition-colors">
                    Expertise
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1A1A1A]/10 pt-8 text-xs text-[#1A1A1A]/70">
            <p>
              © {new Date().getFullYear()} by Ashiqa&apos;s Design Studio | All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
