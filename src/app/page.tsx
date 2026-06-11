"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteImages } from "@/lib/site-images";
import { FocusAreasScroll } from "@/components/home/FocusAreasScroll";
import { DiceProjectsSection } from "@/components/home/DiceProjectsGrid";
import { GalleryScroll } from "@/components/home/GalleryScroll";
import { Image3D, ParallaxImage3D } from "@/components/home/Image3D";

const heroSlides = [
  {
    image: siteImages.hero[0],
    heading: "Revamping Experiences",
    headingClass: "text-xl sm:text-4xl md:text-5xl lg:text-[4.2rem]",
  },
  {
    image: siteImages.hero[1],
    heading: "Where Art and Function Intertwine",
    headingClass: "text-xl sm:text-4xl md:text-5xl lg:text-[4.2rem]",
  },
  {
    image: siteImages.hero[2],
    heading: "A Glimpse into Architectural Harmony",
    headingClass: "text-xl sm:text-4xl md:text-5xl lg:text-[4.2rem]",
  },
];

const diceProjects = [
  { num: "01", title: "Louvered", image: siteImages.projects.one, href: "/projects" },
  { num: "02", title: "Aalayam", image: siteImages.projects.two, href: "/projects" },
  { num: "03", title: "Haven", image: siteImages.projects.three, href: "/projects" },
  { num: "04", title: "Saibo Boutique", image: siteImages.projects.four, href: "/projects" },
  { num: "05", title: "The Mansion Within", image: siteImages.projects.five, href: "/projects" },
];

const focusAreas = [
  {
    num: "01",
    title: "Architecture",
    description:
      "With an emphasis on planning, design, and the production of immersive 3D views, we take pride in a portfolio of picturesque and genre-defining projects, landscaping.",
    image: siteImages.focus.architecture,
  },
  {
    num: "02",
    title: "Interior Design",
    description:
      "Our specialty is creating individualized and inspirational interiors catered to the distinct tastes of each customer. We create surroundings that are visually stunning, soothing, and nurturing.",
    image: siteImages.focus.interior,
  },
  {
    num: "03",
    title: "Landscape",
    description:
      "We're dedicated to transforming outdoor spaces through innovative landscape design, seamlessly blending with nature to enhance the beauty of your surroundings.",
    image: siteImages.focus.landscape,
  },
];

const galleryItems = [
  { image: siteImages.gallery.sophistication, label: "Sophistication" },
  { image: siteImages.gallery.creativity, label: "Creativity" },
  { image: siteImages.gallery.elegance, label: "Elegance" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#D8D2C6]">
      {/* Hero — full-bleed like lobarch.com */}
      <section className="relative w-full h-[85vh] min-h-[560px] overflow-hidden group/hero">
        <Link
          href="/"
          className="absolute top-4 left-4 sm:left-6 md:left-8 z-30 group"
          aria-label="Ashiqa's Design Studio — Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Ashiqa's Design Studio"
            className="h-[160px] w-auto brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-opacity duration-300 group-hover:opacity-90"
          />
        </Link>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/35 z-10" />
            <Image3D
              variant="hero"
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].heading}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-20">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.9 }}
                className={`font-heading ${heroSlides[currentSlide].headingClass} text-white max-w-5xl leading-[1.1] tracking-tight`}
              >
                {heroSlides[currentSlide].heading}
              </motion.h1>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
          }
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors opacity-0 group-hover/hero:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors opacity-0 group-hover/hero:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "h-[2px] rounded-full transition-all duration-500",
                currentSlide === index ? "w-12 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="space-y-6 md:space-y-8 px-4 sm:px-6 md:px-10 lg:px-14 py-10 md:py-14">
        {/* Mission */}
        <section id="about" className="bg-white rounded-[2rem] p-8 md:p-14 lg:p-20 shadow-sm scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-primary text-[11px] uppercase tracking-[0.35em] font-semibold">
                Mission
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.05]">
                Elevate Your Dreams
              </h2>
              <p className="text-[#3F3F46] leading-relaxed text-base">
                We believe that design is the art of the craft. We elevate spaces, ideas, and
                possibilities, creating designs that soar above the ordinary. Every project is an
                opportunity to reach higher, striving for the extraordinary.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] bg-[#EBE9E4]"
            >
              <ParallaxImage3D
                src={siteImages.mission}
                alt="Modern living room interior"
                rounded="rounded-[2rem]"
              />
            </motion.div>
          </div>
        </section>

        <DiceProjectsSection projects={diceProjects} />

        <FocusAreasScroll areas={focusAreas} />

        <GalleryScroll items={galleryItems} />

        {/* CTA */}
        <section className="bg-white rounded-[2rem] overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center items-center text-center space-y-8">
            <p className="font-heading text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-snug max-w-md">
              Bring your dreams into reality by breathing life into your ideas and visions.
            </p>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-10 h-14 uppercase tracking-[0.25em] text-[11px] font-semibold"
              )}
            >
              Start a Project
            </Link>
          </div>
          <div className="relative min-h-[320px] md:min-h-full bg-[#EBE9E4] overflow-hidden">
            <Image3D
              src={siteImages.cta}
              alt="Interior design lounge"
              variant="panel"
              rounded="rounded-none"
              className="absolute inset-0"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
