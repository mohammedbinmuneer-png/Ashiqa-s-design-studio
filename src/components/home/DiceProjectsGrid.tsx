"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Image3D } from "@/components/home/Image3D";

export type DiceProject = {
  num: string;
  title: string;
  image: string;
  href?: string;
};

const PROJECT_SLOTS = [
  { projectIndex: 0, className: "md:col-span-2 md:row-span-2" },
  { projectIndex: 1, className: "md:col-span-2" },
  { projectIndex: 2, className: "md:col-span-1" },
  { projectIndex: 3, className: "md:col-span-1" },
  { projectIndex: 4, className: "md:col-span-4" },
] as const;

function ProjectSlot({ project }: { project: DiceProject }) {
  const content = (
    <div className="group relative h-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_28px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-ash-off-white/80 pointer-events-none" />
      <div className="relative overflow-hidden rounded-[2rem]">
        <div className="aspect-[4/3] bg-ash-off-white">
          <Image3D
            src={project.image}
            alt={project.title}
            variant="card"
            rounded="rounded-[2rem]"
            floatDelay={Number(project.num) * 0.3}
          />
        </div>
      </div>

      <div className="relative p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-heading text-xs uppercase tracking-[0.35em] text-ash-slate">
            {project.num}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ash-off-white/15 text-primary text-sm font-semibold">
            {project.num}
          </span>
        </div>
        <h3 className="font-heading text-lg md:text-xl text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
      </div>
    </div>
  );

  return project.href ? (
    <Link href={project.href} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
}

type DiceProjectsGridProps = {
  projects: DiceProject[];
};

export function DiceProjectsGrid({ projects }: DiceProjectsGridProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-ash-white via-ash-off-white to-ash-fog p-6 md:p-8 shadow-2xl">
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 top-1/2 h-56 w-56 rounded-full bg-ash-off-white/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-36 w-36 rounded-full bg-ash-off-white blur-2xl" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {PROJECT_SLOTS.map((slot) => {
          const project = projects[slot.projectIndex];
          if (!project) return null;

          return (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: slot.projectIndex * 0.06 }}
              className={slot.className}
            >
              <ProjectSlot project={project} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function DiceProjectsSection({
  projects,
  allProjectsHref = "/projects",
}: {
  projects: DiceProject[];
  allProjectsHref?: string;
}) {
  return (
    <section className="bg-white rounded-[2rem] p-8 md:p-14 lg:p-20 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
        <div>
          <p className="text-primary text-[11px] uppercase tracking-[0.3em] font-semibold mb-3">
            Featured Work
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl text-foreground">Latest Projects</h2>
        </div>
        <Link
          href={allProjectsHref}
          className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-foreground hover:text-primary transition-colors"
        >
          All Projects
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <DiceProjectsGrid projects={projects} />

      <div className="flex justify-center md:justify-end mt-8">
        <Link
          href={allProjectsHref}
          className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-foreground hover:text-primary transition-colors"
        >
          All Projects
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
