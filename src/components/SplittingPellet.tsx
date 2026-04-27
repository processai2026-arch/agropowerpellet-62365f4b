import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import pellet from "@/assets/biomass-pellet.png";

const easeSoft = [0.25, 0.1, 0.25, 1] as const;

const PelletHalf = ({
  side,
  progress,
}: {
  side: "left" | "right";
  progress: MotionValue<number>;
}) => {
  const isLeft = side === "left";
  // Move halves apart and slightly fade as progress goes 0 -> 1
  const x = useTransform(progress, [0, 1], ["0%", isLeft ? "-110%" : "110%"]);
  const rotate = useTransform(progress, [0, 1], [0, isLeft ? -8 : 8]);
  const opacity = useTransform(progress, [0, 0.85, 1], [1, 1, 0]);

  // Each half is the full image but masked to one side via clip-path.
  const clipPath = isLeft
    ? "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
    : "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)";

  return (
    <motion.img
      src={pellet}
      alt=""
      aria-hidden="true"
      style={{
        x,
        rotate,
        opacity,
        clipPath,
        WebkitClipPath: clipPath,
      }}
      className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      draggable={false}
    />
  );
};

const SplittingPellet = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Drive the split mostly within the middle portion of the scroll range.
  const split = useTransform(scrollYProgress, [0.15, 0.75], [0, 1], {
    clamp: true,
  });
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.7],
    [0, 1]
  );
  const headlineY = useTransform(scrollYProgress, [0.4, 0.7], [30, 0]);

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="relative bg-background"
      style={{ height: "120vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="relative w-[min(80vw,520px)] aspect-square">
          <PelletHalf side="left" progress={split} />
          <PelletHalf side="right" progress={split} />
        </div>

        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY, ease: easeSoft }}
          className="absolute inset-x-0 bottom-16 md:bottom-24 text-center px-4"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            From Residue to Resource
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-foreground">
            One pellet. Endless industrial energy.
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default SplittingPellet;
