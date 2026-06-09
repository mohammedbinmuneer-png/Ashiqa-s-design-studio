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

/** Five projects placed like dots on a die: corners + center */
const DICE_SLOTS = [
  { projectIndex: 0, gridClass: "md:col-start-1 md:row-start-1" },
  { spacer: true, gridClass: "md:col-start-2 md:row-start-1" },
  { projectIndex: 1, gridClass: "md:col-start-3 md:row-start-1" },
  { spacer: true, gridClass: "md:col-start-1 md:row-start-2" },
  { projectIndex: 2, gridClass: "md:col-start-2 md:row-start-2" },
  { spacer: true, gridClass: "md:col-start-3 md:row-start-2" },
  { projectIndex: 3, gridClass: "md:col-start-1 md:row-start-3" },
  { spacer: true, gridClass: "md:col-start-2 md:row-start-3" },
  { projectIndex: 4, gridClass: "md:col-start-3 md:row-start-3" },
] as const;

function SpacerSlot() {
  return (
    <div className="hidden md:block h-full min-h-[200px] rounded-[1.5rem] border border-dashed border-[#CEC8BA]/25 bg-transparent" />
  );
}

function ProjectSlot({ project }: { project: DiceProject }) {
  const content = (
    <div className="group space-y-3 h-full">
      <div className="aspect-[4/3] md:aspect-auto md:min-h-[200px] bg-[#EBE9E4]">
        <Image3D
          src={project.image}
          alt={project.title}
          variant="card"
          rounded="rounded-[1.5rem]"
          floatDelay={Number(project.num) * 0.4}
        />
      </div>
      <p className="font-heading text-sm md:text-base px-1">
        <span className="text-primary mr-2">{project.num}</span>
        <span className="text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </span>
      </p>
    </div>
  );

  if (project.href) {
    return (
      <Link href={project.href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

type DiceProjectsGridProps = {
  projects: DiceProject[];
};

export function DiceProjectsGrid({ projects }: DiceProjectsGridProps) {
  return (
    <div className="relative w-full border border-[#CEC8BA]/30 rounded-[2rem] p-5 md:p-10 bg-[#FAF9F6]/40 shadow-inner grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
      {DICE_SLOTS.map((slot, i) => {
        if ("spacer" in slot) {
          return (
            <div key={`spacer-${i}`} className={slot.gridClass}>
              <SpacerSlot />
            </div>
          );
        }

        const project = projects[slot.projectIndex];
        if (!project) return null;

        return (
          <motion.div
            key={project.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: slot.projectIndex * 0.08 }}
            className={slot.gridClass}
          >
            <ProjectSlot project={project} />
          </motion.div>
        );
      })}
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
        <h2 className="font-heading text-4xl sm:text-5xl text-foreground">Latest Projects</h2>
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
