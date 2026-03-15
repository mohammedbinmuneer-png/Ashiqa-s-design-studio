"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Tag, FileText, X } from "lucide-react";

const projects = [
  {
    id: 10,
    title: "Makkah Supermarket",
    category: "Commercial",
    location: "Abu Dhabi, UAE",
    year: "2024",
    description: "A full head office interior design for Makkah Supermarket — blending functional workspace planning with a refined commercial aesthetic tailored to the brand.",
    fullDescription: "This project involved a comprehensive interior design solution for the Makkah Supermarket Head Office. The design focuses on creating a professional yet welcoming workspace that reflects the brand identity. Key elements include optimized floor planning, modern workstation layouts, executive office spaces, meeting rooms, and staff amenity areas — all crafted to enhance productivity and represent the company's values.",
    pdf: "/Makkah Supermarket Head Office Design.pdf.pdf",
    images: ["/supermarket.png"],
  },
  {
    id: 9,
    title: "Mobile Shop",
    category: "Commercial",
    location: "Local",
    year: "2024",
    description: "A sleek retail interior featuring sage green cabinetry, warm wood counters, and backlit shelving.",
    fullDescription: "A sleek retail interior featuring sage green cabinetry, warm wood counters, and backlit shelving — designed to maximize product visibility and create a premium shopping experience for customers.",
    pdf: null,
    images: ["/mobile-shop.jpg"],
  },
];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pdfOpen, setPdfOpen] = useState(false);

  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-primary text-xs uppercase tracking-[0.4em]">{project.category}</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mt-2 mb-6">{project.title}</h1>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{project.location}</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{project.year}</span>
            <span className="flex items-center gap-2"><Tag className="h-4 w-4 text-primary" />{project.category}</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-foreground leading-relaxed text-lg">{project.fullDescription}</p>
        </motion.div>

        {/* Images */}
        {project.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6 uppercase tracking-widest">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img} alt={`${project.title} ${i + 1}`} className="w-full h-72 object-cover border border-border" />
              ))}
            </div>
          </motion.div>
        )}

        {/* PDF Viewer */}
        {project.pdf && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6 uppercase tracking-widest">Project Document</h2>
            <button
              onClick={() => setPdfOpen(true)}
              className="flex items-center gap-3 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-widest text-sm"
            >
              <FileText className="h-4 w-4" />
              View Project PDF
            </button>
          </motion.div>
        )}

        {/* PDF Modal */}
        {pdfOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl h-[90vh] bg-background border border-border flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <span className="font-heading font-bold text-foreground uppercase tracking-widest text-sm">{project.title} — Project Document</span>
                <button
                  onClick={() => setPdfOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Close PDF"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <iframe
                src={project.pdf ?? undefined}
                className="w-full flex-1"
                title={`${project.title} PDF`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
