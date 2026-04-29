import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import pellet from "@/assets/biomass-pellet.png";

const easeSoft = [0.25, 0.1, 0.25, 1] as const;

// 6 satellite pellets arranged in a circle around the center pellet.
// Each appears at a different scroll progress threshold and at a fixed angle.
const SATELLITES: { appearAt: number; angle: number }[] = [
  { appearAt: 0.2, angle: 0 },
  { appearAt: 0.3, angle: 60 },
  { appearAt: 0.4, angle: 120 },
  { appearAt: 0.5, angle: 180 },
  { appearAt: 0.6, angle: 240 },
  { appearAt: 0.7, angle: 300 },
];

const SatellitePellet = ({
  progress,
  appearAt,
  angle,
  radius,
  hovered,
}: {
  progress: MotionValue<number>;
  appearAt: number;
  angle: number;
  radius: number;
  hovered: boolean;
}) => {
  const end = Math.min(appearAt + 0.12, 1);
  const opacity = useTransform(progress, [appearAt, end], [0, 1], { clamp: true });
  const scale = useTransform(progress, [appearAt, end], [0.3, 1], { clamp: true });
  const glow = useTransform(
    progress,
    [appearAt, end],
    [0, hovered ? 28 : 18],
    { clamp: true }
  );
  const filter = useTransform(
    glow,
    (g) => `drop-shadow(0 0 ${g}px rgba(77, 124, 95, 0.85)) drop-shadow(0 8px 14px rgba(0,0,0,0.35))`
  );

  // Convert polar to cartesian for absolute positioning offset
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <motion.img
      src={pellet}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{
        opacity,
        scale,
        filter,
        x,
        y,
      }}
      className="absolute top-1/2 left-1/2 w-[28%] aspect-square -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
    />
  );
};

const MultiplyingPellets = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Cluster grows from 1 → 1.4 as pellets multiply
  const clusterScale = useTransform(scrollYProgress, [0.1, 0.75], [1, 1.4], {
    clamp: true,
  });

  // Background aura expands & intensifies
  const auraScale = useTransform(scrollYProgress, [0.1, 0.75], [0.8, 1.5], {
    clamp: true,
  });
  const auraOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.85],
    [0.15, 0.55, 0.75],
    { clamp: true }
  );

  // Center pellet subtle glow ramps up
  const centerGlow = useTransform(scrollYProgress, [0.1, 0.75], [6, 22], {
    clamp: true,
  });
  const centerFilter = useTransform(
    centerGlow,
    (g) => `drop-shadow(0 0 ${g}px rgba(77, 124, 95, 0.9)) drop-shadow(0 10px 18px rgba(0,0,0,0.4))`
  );

  // First headline (fades out as energy builds)
  const firstOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.45, 0.6],
    [0, 1, 0]
  );
  const firstScale = useTransform(scrollYProgress, [0.2, 0.6], [0.95, 1.15]);

  // Final headline fades in near the end
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
        {/* Expanding eco-green energy aura */}
        <motion.div
          style={{ scale: auraScale, opacity: auraOpacity }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(120vw,900px)] aspect-square rounded-full pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-full h-full rounded-full animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(77,124,95,0.55) 0%, rgba(77,124,95,0.25) 35%, rgba(77,124,95,0.05) 60%, transparent 75%)",
              animationDuration: "4s",
            }}
          />
        </motion.div>

        {/* Rotating cluster (continuous rotation, grows with scroll) */}
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          style={{ scale: clusterScale }}
          className="relative w-[min(80vw,520px)] aspect-square pointer-events-auto"
        >
          <div className="absolute inset-0">
            {/* Center pellet — always visible */}
            <motion.img
              src={pellet}
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{ filter: centerFilter }}
              className="absolute top-1/2 left-1/2 w-[32%] aspect-square -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
            />

            {/* Satellite pellets — appear progressively */}
            {SATELLITES.map((s, i) => (
              <SatellitePellet
                key={i}
                progress={scrollYProgress}
                appearAt={s.appearAt}
                angle={s.angle}
                radius={140}
                hovered={hovered}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* First headline */}
        <motion.div
          style={{ opacity: firstOpacity, scale: firstScale }}
          className="absolute inset-x-0 bottom-16 md:bottom-24 text-center px-4 pointer-events-none"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            From Residue to Resource
          </span>
        </motion.div>

        {/* Final headline */}
        <motion.div
          style={{ opacity: finalOpacity, y: finalY }}
          className="absolute inset-x-0 bottom-16 md:bottom-24 text-center px-4 pointer-events-none"
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
