import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MultiplyingPellets = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const firstOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.45, 0.6],
    [0, 1, 0]
  );
  const firstScale = useTransform(scrollYProgress, [0.2, 0.6], [0.95, 1.15]);

  const finalOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.82],
    [0, 1],
    { clamp: true }
  );
  const finalY = useTransform(scrollYProgress, [0.65, 0.82], [30, 0], {
    clamp: true,
  });

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="relative bg-background"
      style={{ height: "140vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* First headline */}
        <motion.div
          style={{ opacity: firstOpacity, scale: firstScale }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center px-4 pointer-events-none"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            From Residue to Resource
          </span>
        </motion.div>

        {/* Final headline */}
        <motion.div
          style={{ opacity: finalOpacity, y: finalY }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center px-4 pointer-events-none"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Multiply the Power
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-foreground">
            One Pellet. Infinite Industrial Power.
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default MultiplyingPellets;
