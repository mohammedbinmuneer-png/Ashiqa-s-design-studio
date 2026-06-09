"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteImages } from "@/lib/site-images";

const categories = ["All", "Residential", "Commercial", "Cultural", "Urban"];

const projects = [
  {
    id: 10,
    title: "Makkah Supermarket Head Office",
    category: "Commercial",
    location: "Riyadh, Saudi Arabia",
    year: "2023",
    description: "A full head office interior design for Makkah Supermarket — blending functional workspace planning with a refined commercial aesthetic tailored to the brand.",
    image: "/lobarch/saibo-botique-1.avif",
  },
  {
    id: 9,
    title: "Extel Mobiles",
    category: "Commercial",
    location: "Abu Dhabi, UAE",
    year: "2024",
    description: "A sleek retail interior featuring sage green cabinetry, warm wood counters, and backlit shelving — designed to maximize product visibility and create a premium shopping experience.",
    image: "/lobarch/lob-arch-interior-2.avif",
  },
  {
    id: 2,
    title: "Floating Gardens",
    category: "Residential",
    location: "Singapore",
    year: "2022",
    description: "Suspended residential pods connected by sky bridges, surrounded by lush vertical gardens 200 meters above ground.",
    image: siteImages.portfolio.residential,
  },
  {
    id: 3,
    title: "The Void Museum",
    category: "Cultural",
    location: "Tokyo, Japan",
    year: "2023",
    description: "A cultural center built around negative space — the architecture is defined by what is absent rather than what is present.",
    image: siteImages.portfolio.cultural,
  },
  {
    id: 4,
    title: "Meridian Hub",
    category: "Urban",
    location: "New York, USA",
    year: "2021",
    description: "A mixed-use urban campus that reimagines the city block as a vertical neighborhood with public plazas at every level.",
    image: siteImages.portfolio.urban,
  },
  {
    id: 5,
    title: "Obsidian Residence",
    category: "Residential",
    location: "Oslo, Norway",
    year: "2022",
    description: "A private residence carved into a cliffside, with floor-to-ceiling glass walls that frame the fjord like a living painting.",
    image: siteImages.portfolio.interior,
  },
  {
    id: 6,
    title: "Arc Pavilion",
    category: "Cultural",
    location: "Paris, France",
    year: "2024",
    description: "A temporary pavilion for the Paris Design Week — a single continuous surface that folds into walls, roof, and seating.",
    image: siteImages.portfolio.pavilion,
  },
  {
    id: 8,
    title: "Solaris District",
    category: "Urban",
    location: "Barcelona, Spain",
    year: "2023",
    description: "A solar-powered urban district with integrated energy harvesting facades and zero-carbon infrastructure.",
    image: siteImages.portfolio.solar,
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  // Split projects into chunks of 5
  const chunks: (typeof projects)[] = [];
  for (let i = 0; i < filtered.length; i += 5) {
    chunks.push(filtered.slice(i, i + 5));
  }

  const renderSlot = (project: typeof projects[0] | undefined, slotIndex: number, gridAreaClass: string) => {
    if (!project) {
      return (
        <div className={`hidden md:flex flex-col items-center justify-center h-full min-h-[250px] border border-dashed border-[#CEC8BA]/20 rounded-[1.5rem] opacity-30 select-none ${gridAreaClass}`}>
          <div className="w-4 h-4 rounded-full bg-[#CEC8BA]/30" />
        </div>
      );
    }

    return (
      <motion.div
        key={project.id}
        layout
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4 }}
        className={`group flex flex-col justify-between ${gridAreaClass}`}
      >
        <Link href={`/projects/${project.id}`} className="block h-full space-y-4">
          {project.image && (
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#EBE9E4] shadow-sm">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
          )}
          <div className="px-2 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">{project.category}</span>
                <h2 className="font-heading text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h2>
              </div>
              <div className="w-8 h-8 rounded-full border border-[#CEC8BA] flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 flex-shrink-0">
                <ArrowUpRight className="h-4 w-4 text-[#52525B] group-hover:text-white transition-colors" />
              </div>
            </div>
            <p className="text-[#3F3F46] text-xs leading-relaxed font-sans line-clamp-2">{project.description}</p>
            <div className="flex items-center gap-3 text-[10px] text-[#71717A] uppercase tracking-widest font-sans font-medium">
              <span>{project.location}</span>
              <span className="w-1 h-1 rounded-full bg-[#CEC8BA]" />
              <span>{project.year}</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  const renderDecorativeSlot = (type: number, gridAreaClass: string) => {
    return (
      <div className={`hidden md:flex flex-col items-center justify-center h-full min-h-[250px] border border-dashed border-[#CEC8BA]/40 rounded-[1.5rem] p-4 text-center select-none bg-white/45 backdrop-blur-[2px] ${gridAreaClass}`}>
        {type === 1 && (
          <>
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 border border-[#CEC8BA]/60 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-2 border border-dashed border-[#CEC8BA]/40 rounded-full" />
              <div className="absolute w-6 h-[1px] bg-[#CEC8BA]/60" />
              <div className="absolute h-6 w-[1px] bg-[#CEC8BA]/60" />
            </div>
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#8C8370] font-semibold mt-3">AXIS & HARMONY</span>
          </>
        )}
        {type === 2 && (
          <>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C5A880] to-[#E5D3B3] flex items-center justify-center shadow-md">
              <span className="font-heading text-xs font-bold text-white tracking-widest">05</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#8C8370] font-semibold mt-3">QUINCUNX MATRIX</span>
          </>
        )}
        {type === 3 && (
          <>
            <p className="font-heading text-[11px] italic text-[#52525B] leading-relaxed max-w-[140px] font-medium">
              "Design is the silent ambassador of your brand."
            </p>
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#8C8370] font-semibold mt-3">EST. 2020</span>
          </>
        )}
        {type === 4 && (
          <>
            <div className="w-20 h-6 relative flex items-center justify-between px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#CEC8BA]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#CEC8BA]/40" />
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#CEC8BA]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#CEC8BA]/40" />
            </div>
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#8C8370] font-semibold mt-3">GRAVITY POINT</span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 md:px-12 bg-[#D8D2C6]">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white rounded-[2rem] p-8 md:p-16 lg:p-20 shadow-sm space-y-16">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">Our Portfolio</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">Projects</h1>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 text-xs uppercase tracking-[0.2em] transition-all rounded-full border ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "border-[#CEC8BA] text-[#52525B] hover:border-primary hover:text-primary bg-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="space-y-16">
            <AnimatePresence mode="popLayout">
              {chunks.map((chunk, chunkIdx) => (
                <motion.div
                  key={chunkIdx}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full border border-[#CEC8BA]/30 rounded-[2.5rem] p-6 md:p-12 bg-[#FAF9F6]/50 shadow-inner grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-stretch"
                >
                  {/* Absolute Dice Frame Accents */}
                  <div className="absolute top-4 left-4 w-2.5 h-2.5 rounded-full bg-[#CEC8BA]/40" />
                  <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#CEC8BA]/40" />
                  <div className="absolute bottom-4 left-4 w-2.5 h-2.5 rounded-full bg-[#CEC8BA]/40" />
                  <div className="absolute bottom-4 right-4 w-2.5 h-2.5 rounded-full bg-[#CEC8BA]/40" />

                  {/* Row 1, Col 1: Project 0 */}
                  {renderSlot(chunk[0], 0, "md:col-start-1 md:row-start-1")}

                  {/* Row 1, Col 2: Decorative 1 */}
                  {renderDecorativeSlot(1, "md:col-start-2 md:row-start-1")}

                  {/* Row 1, Col 3: Project 1 */}
                  {renderSlot(chunk[1], 1, "md:col-start-3 md:row-start-1")}

                  {/* Row 2, Col 1: Decorative 2 */}
                  {renderDecorativeSlot(2, "md:col-start-1 md:row-start-2")}

                  {/* Row 2, Col 2: Project 2 */}
                  {renderSlot(chunk[2], 2, "md:col-start-2 md:row-start-2")}

                  {/* Row 2, Col 3: Decorative 3 */}
                  {renderDecorativeSlot(3, "md:col-start-3 md:row-start-2")}

                  {/* Row 3, Col 1: Project 3 */}
                  {renderSlot(chunk[3], 3, "md:col-start-1 md:row-start-3")}

                  {/* Row 3, Col 2: Decorative 4 */}
                  {renderDecorativeSlot(4, "md:col-start-2 md:row-start-3")}

                  {/* Row 3, Col 3: Project 4 */}
                  {renderSlot(chunk[4], 4, "md:col-start-3 md:row-start-3")}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[#52525B] py-20 font-sans">No projects found.</p>
          )}

        </div>
      </div>
    </div>
  );
}
