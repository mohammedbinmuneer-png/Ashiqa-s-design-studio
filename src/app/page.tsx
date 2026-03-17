"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  { title: "Conceptual Design", description: "Visionary concepts that challenge conventional spatial thinking and redefine architectural boundaries." },
  { title: "Structural Engineering", description: "Precision engineering that makes the impossible possible, structures that defy gravity itself." },
  { title: "Interior Architecture", description: "Immersive interiors that blur the line between art and function, crafted for the extraordinary." },
  { title: "Urban Planning", description: "Future-forward urban environments designed to evolve with the communities they serve." },
];

const stats = [
  { value: "20+", label: "Projects Completed" },
  { value: "15+", label: "Happy Clients" },
  { value: "3", label: "Industry Awards" },
  { value: "5+", label: "Years of Expertise" },
];

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null);
  const scrollToAbout = () => aboutRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(245,240,232,0.2)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, #F5F0E8 100%)" }} />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="text-black text-xs uppercase tracking-[0.4em] mb-6 font-medium">Architecture Studio</p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-none mb-8">
            Designing Spaces<br /><span className="text-primary">Beyond Gravity</span>
          </h1>
          <p className="text-black text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            We create iconic structures that transcend the ordinary, where bold vision meets engineering mastery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className={cn(buttonVariants({ size: "lg" }), "rounded-none px-12 h-14 uppercase tracking-widest text-sm bg-primary text-primary-foreground hover:bg-primary/90")}>View Projects</Link>
            <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-none px-12 h-14 uppercase tracking-widest text-sm border-foreground/30 hover:border-primary hover:text-primary")}>Get in Touch</Link>
          </div>
        </motion.div>
        <button onClick={scrollToAbout} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black hover:text-primary transition-colors animate-bounce" aria-label="Scroll down">
          <ChevronDown className="h-6 w-6" />
        </button>
      </section>

      <section className="py-16 border-y border-border bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="font-heading text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-black text-sm uppercase tracking-widest mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef} className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">About Us</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">Meet Ashiqa Muneer</h2>
              <p className="text-black leading-relaxed mb-6">With a design philosophy rooted in cultural fusion and structural elegance, Ashiqa Muneer is an Indian architect making a significant mark on the UAE's architectural landscape. Bringing over 5 years of professional expertise to the region, Ashiqa specializes in creating spaces that balance functional necessity with aesthetic innovation.</p>
              <p className="text-black leading-relaxed mb-10">By bridging her rich Indian heritage with the bold, futuristic architectural demands of the UAE, Ashiqa delivers bespoke designs that are as sustainable as they are striking. Her portfolio spans sophisticated residential villas to modern commercial spaces.</p>
              <Link href="/projects" className={cn(buttonVariants({ variant: "outline" }), "rounded-none uppercase tracking-widest text-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground group inline-flex items-center gap-2")}>
                Explore Our Work <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="aspect-[4/5] bg-card border border-border relative overflow-hidden">
                <img src="/ashiqa.jpg" alt="Ashiqa Muneer" className="w-full h-full object-cover object-top" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-heading text-2xl font-bold text-black">Est. 2022</p>
                  <p className="text-black text-sm mt-1">Mussaffah, Abu Dhabi, UAE</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/30" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">What We Do</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-black">Our Services</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {services.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card p-10 hover:bg-secondary transition-colors group">
                <p className="text-primary/40 font-heading text-5xl font-bold mb-4 group-hover:text-primary/60 transition-colors">0{i + 1}</p>
                <h3 className="font-heading text-xl font-bold text-black mb-3">{service.title}</h3>
                <p className="text-black leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-black mb-6">Ready to Build the Future?</h2>
            <p className="text-black text-lg max-w-xl mx-auto mb-10">Let us collaborate on your next landmark project. Our team is ready to turn your vision into reality.</p>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "rounded-none px-12 uppercase tracking-widest text-sm bg-primary text-primary-foreground hover:bg-primary/90")}>Start a Project</Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}