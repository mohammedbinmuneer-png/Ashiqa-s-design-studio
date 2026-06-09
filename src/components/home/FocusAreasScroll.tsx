"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { FocusPanelImage } from "@/components/home/Image3D";

export type FocusArea = {
  num: string;
  title: string;
  description: string;
  image: string;
};

type FocusAreasScrollProps = {
  areas: FocusArea[];
};

export function FocusAreasScroll({ areas }: FocusAreasScrollProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const idx = elements.indexOf(visible[0].target as HTMLDivElement);
          if (idx >= 0) setActiveIndex(idx);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [areas.length]);

  return (
    <section id="expertise" ref={sectionRef} className="scroll-mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Sticky quote + image panel */}
        <div className="relative lg:sticky lg:top-28 lg:self-start lg:h-[calc(100vh-7rem)] rounded-[2rem] overflow-hidden min-h-[420px]">
          <div className="absolute inset-0">
            {areas.map((area, index) => (
              <FocusPanelImage
                key={area.num}
                src={area.image}
                alt={area.title}
                active={activeIndex === index}
                index={index}
              />
            ))}
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
            <Quote className="h-9 w-9 text-white/80 mb-5" strokeWidth={1.5} />
            <blockquote className="font-heading text-2xl sm:text-3xl md:text-4xl text-white leading-snug uppercase tracking-wide">
              Every great design begins with an even better story...
            </blockquote>
          </div>
        </div>

        {/* Scroll-driven focus list */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-sm">
          <div className="mb-8 md:mb-12 lg:sticky lg:top-28 lg:z-10 lg:bg-white lg:pb-6">
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-4">
              Our Focus Areas
            </h2>
            <p className="text-[#3F3F46] text-sm md:text-base leading-relaxed">
              Our areas of competence include interior design, architecture, and landscaping,
              with a focus on creating quiet and lovely environments.
            </p>
          </div>

          <div className="space-y-0">
            {areas.map((area, idx) => (
              <div
                key={area.num}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className={cn(
                  "min-h-[55vh] lg:min-h-[65vh] flex flex-col justify-center py-10 border-b border-[#CEC8BA]/40 last:border-0 transition-opacity duration-500",
                  activeIndex === idx ? "opacity-100" : "opacity-35"
                )}
              >
                <div className="flex gap-5 items-start">
                  <span
                    className={cn(
                      "font-heading text-2xl md:text-3xl transition-colors duration-500",
                      activeIndex === idx ? "text-primary" : "text-primary/25"
                    )}
                  >
                    {area.num}
                  </span>
                  <div className="flex-1 space-y-4">
                    <h3
                      className={cn(
                        "font-heading text-xl md:text-2xl transition-all duration-500",
                        activeIndex === idx ? "text-foreground translate-x-0" : "text-foreground/45"
                      )}
                    >
                      {area.title}
                    </h3>
                    <motion.p
                      initial={false}
                      animate={{
                        opacity: activeIndex === idx ? 1 : 0.6,
                        y: activeIndex === idx ? 0 : 8,
                      }}
                      transition={{ duration: 0.45 }}
                      className="text-sm md:text-base text-[#3F3F46] leading-relaxed max-w-lg"
                    >
                      {area.description}
                    </motion.p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
