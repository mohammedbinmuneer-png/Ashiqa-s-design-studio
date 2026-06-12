"use client";

import { motion } from "framer-motion";
import { Image3D } from "@/components/home/Image3D";

type GalleryItem = {
  image: string;
  label: string;
};

type GalleryScrollProps = {
  items: GalleryItem[];
};

export function GalleryScroll({ items }: GalleryScrollProps) {
  return (
    <section className="relative">
      <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:snap-none scrollbar-thin">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative shrink-0 w-[82vw] sm:w-[70vw] md:w-auto snap-center aspect-[4/5] bg-ash-fog"
          >
            <Image3D
              src={item.image}
              alt={item.label}
              variant="card"
              rounded="rounded-[2rem]"
              floatDelay={idx * 0.6}
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <p className="absolute bottom-8 left-0 right-0 text-center font-heading text-2xl sm:text-3xl md:text-4xl leading-tight text-white">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
