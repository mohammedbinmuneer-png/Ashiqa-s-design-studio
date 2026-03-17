"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Residential", "Commercial", "Cultural", "Urban"];

const projects = [
  {
    id: 10,
    title: "Makkah Supermarket Head Office, Riyadh",
    category: "Commercial",
    location: "Abu Dhabi, UAE",
    year: "2024",
    description: "A full head office interior design for Makkah Supermarket â€” blending functional workspace planning with a refined commercial aesthetic tailored to the brand.",
    image: "/supermarket.png",
  },
  {
    id: 9,
    title: "Extel Mobiles",
    category: "Commercial",
    location: "Local",
    year: "2024",
    description: "A sleek retail interior featuring sage green cabinetry, warm wood counters, and backlit shelving â€” designed to maximize product visibility and create a premium shopping experience.",
    image: "/mobile-shop.jpg",
  },
  {
    id: 2,
    title: "Floating Gardens",
    category: "Residential",
    location: "Singapore",
    year: "2022",
    description: "Suspended residential pods connected by sky bridges, surrounded by lush vertical gardens 200 meters above ground.",
    image: null,
  },
  {
    id: 3,
    title: "The Void Museum",
    category: "Cultural",
    location: "Tokyo, Japan",
    year: "2023",
    description: "A cultural center built around negative space â€” the architecture is defined by what is absent rather than what is present.",
    image: null,
  },
  {
    id: 4,
    title: "Meridian Hub",
    category: "Urban",
    location: "New York, USA",
    year: "2021",
    description: "A mixed-use urban campus that reimagines the city block as a vertical neighborhood with public plazas at every level.",
    image: null,
  },
  {
    id: 5,
    title: "Obsidian Residence",
    category: "Residential",
    location: "Oslo, Norway",
    year: "2022",
    description: "A private residence carved into a cliffside, with floor-to-ceiling glass walls that frame the fjord like a living painting.",
    image: null,
  },
  {
    id: 6,
    title: "Arc Pavilion",
    category: "Cultural",
    location: "Paris, France",
    year: "2024",
    description: "A temporary pavilion for the Paris Design Week â€” a single continuous surface that folds into walls, roof, and seating.",
    image: null,
  },
  {
    id: 8,
    title: "Solaris District",
    category: "Urban",
    location: "Barcelona, Spain",
    year: "2023",
    description: "A solar-powered urban district with integrated energy harvesting facades and zero-carbon infrastructure.",
    image: null,
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">Our Portfolio</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">Projects</h1>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-widest border transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/projects/${project.id}`} className="block bg-card group hover:bg-secondary transition-colors cursor-pointer">
                {project.image && (
                  <div className="relative w-full h-56 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-primary">{project.category}</span>
                      <h2 className="font-heading text-2xl font-bold text-foreground mt-1">{project.title}</h2>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
                    <span>{project.location}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{project.year}</span>
                  </div>
                </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No projects found.</p>
        )}
      </div>
    </div>
  );
}
