"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Image3DProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  rounded?: string;
  variant?: "hero" | "card" | "panel";
  floatDelay?: number;
};

function useTilt(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), {
    stiffness: 180,
    damping: 22,
  });
  const imgX = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 20,
  });
  const imgY = useSpring(useTransform(py, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return { ref, rotateX, rotateY, imgX, imgY, onMove, onLeave };
}

export function Image3D({
  src,
  alt,
  className,
  imageClassName,
  rounded = "rounded-[2rem]",
  variant = "card",
  floatDelay = 0,
}: Image3DProps) {
  const tiltEnabled = variant !== "hero";
  const { ref, rotateX, rotateY, imgX, imgY, onMove, onLeave } = useTilt(tiltEnabled);

  if (variant === "hero") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        <motion.img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover scale-110", imageClassName)}
          animate={{
            scale: [1.1, 1.22],
            x: ["-2%", "2%"],
            y: ["-1.5%", "1.5%"],
            rotateZ: [-0.4, 0.4],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("w-full h-full", className)}
      style={{ perspective: 1400 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className={cn("relative w-full h-full overflow-hidden shadow-lg", rounded)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          variant === "card"
            ? { y: [0, -8, 0], rotateZ: [-0.3, 0.3, -0.3] }
            : { y: [0, -5, 0] }
        }
        transition={{
          y: { duration: 5 + floatDelay, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 7 + floatDelay, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover scale-[1.12]", imageClassName)}
          style={{ x: imgX, y: imgY, transform: "translateZ(40px)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10"
          style={{ transform: "translateZ(50px)" }}
        />
      </motion.div>
    </div>
  );
}

type ParallaxImage3DProps = Image3DProps & {
  scrollRef?: React.RefObject<HTMLElement | null>;
};

export function ParallaxImage3D({
  src,
  alt,
  className,
  rounded = "rounded-[2rem]",
  floatDelay = 0,
}: ParallaxImage3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]);

  return (
    <div ref={ref} className={cn("w-full h-full", className)} style={{ perspective: 1600 }}>
      <motion.div
        className={cn("relative w-full h-full overflow-hidden shadow-xl", rounded)}
        style={{ rotateX, transformStyle: "preserve-3d" }}
        animate={{ rotateY: [-1.5, 1.5, -1.5] }}
        transition={{
          rotateY: { duration: 8 + floatDelay, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover scale-[1.15]"
          style={{ y, transform: "translateZ(30px)" }}
        />
      </motion.div>
    </div>
  );
}

type FocusPanelImageProps = {
  src: string;
  alt: string;
  active: boolean;
  index: number;
};

export function FocusPanelImage({ src, alt, active, index }: FocusPanelImageProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? [1.08, 1.14, 1.08] : 1.12,
        x: active ? ["-1.5%", "1.5%", "-1.5%"] : 0,
        y: active ? ["-1%", "1%", "-1%"] : 0,
        rotateX: active ? [-1, 1, -1] : 0,
      }}
      transition={{
        opacity: { duration: 0.85, ease: "easeInOut" },
        scale: { duration: 12 + index * 2, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 14 + index * 2, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 16 + index * 2, repeat: Infinity, ease: "easeInOut" },
        rotateX: { duration: 10 + index * 2, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ transformPerspective: 1200 }}
    />
  );
}
