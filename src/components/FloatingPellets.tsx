import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Global ambient floating pellet background.
 * - Fixed full-viewport layer behind all content (z-index: 0, pointer-events: none)
 * - Density scales with scroll progress (more pellets as user scrolls down)
 * - Pellets drift slowly upward / diagonally with gentle rotation
 * - Mobile: pellet count is halved for performance
 */

type Pellet = {
  id: number;
  leftPct: number;       // 0-100
  topPct: number;        // 0-100 starting position
  size: number;          // px
  rotate: number;        // deg
  duration: number;      // s
  delay: number;         // s
  driftX: number;        // px horizontal drift
  driftY: number;        // px vertical drift (negative = up)
  opacity: number;       // target opacity
};

const MAX_DESKTOP = 40;
const MAX_MOBILE = 20;

// Seeded-ish random for stable pellet positions across renders
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const buildPellets = (count: number): Pellet[] => {
  const sizes = [16, 20, 24, 28, 32, 36];
  const angles = [0, 30, 45, 60, 90, 120, 150];
  return Array.from({ length: count }).map((_, i) => {
    const r1 = rand(i + 1);
    const r2 = rand(i + 2);
    const r3 = rand(i + 3);
    const r4 = rand(i + 4);
    const r5 = rand(i + 5);
    const r6 = rand(i + 6);
    const horizontalDir = r5 > 0.66 ? 0 : r5 > 0.33 ? 1 : -1; // straight up / right / left
    return {
      id: i,
      leftPct: r1 * 100,
      topPct: r2 * 100,
      size: sizes[Math.floor(r3 * sizes.length)],
      rotate: angles[Math.floor(r4 * angles.length)],
      duration: 22 + r5 * 18,         // 22s - 40s
      delay: -r6 * 25,                 // negative so they're mid-cycle on mount
      driftX: horizontalDir * (20 + r3 * 40),
      driftY: -(60 + r4 * 80),         // always drift upward overall
      opacity: 0.06 + r6 * 0.06,       // 0.06 - 0.12
    };
  });
};

const FloatingPellets = () => {
  const isMobile = useIsMobile();
  const max = isMobile ? MAX_MOBILE : MAX_DESKTOP;

  const pellets = useMemo(() => buildPellets(max), [max]);

  const [visibleCount, setVisibleCount] = useState(
    Math.round(max * 0.18) // start with ~6/40 or ~3/20
  );

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      // 0-20%: 6, 20-40%: 12, 40-60%: 20, 60-80%: 28, 80-100%: 38 (on desktop max=40)
      let target: number;
      if (progress < 0.2) target = Math.round(max * 0.15);
      else if (progress < 0.4) target = Math.round(max * 0.3);
      else if (progress < 0.6) target = Math.round(max * 0.5);
      else if (progress < 0.8) target = Math.round(max * 0.7);
      else target = Math.round(max * 0.95);
      setVisibleCount(target);
    };
    compute();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [max]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {pellets.map((p, i) => {
        const isVisible = i < visibleCount;
        return (
          <span
            key={p.id}
            className="absolute block"
            style={{
              left: `${p.leftPct}%`,
              top: `${p.topPct}%`,
              width: `${p.size}px`,
              height: `${Math.round(p.size * 0.42)}px`,
              borderRadius: "9999px",
              background:
                "linear-gradient(135deg, #a8771f 0%, #8B6914 45%, #5d4509 100%)",
              boxShadow:
                "inset 0 1px 1px rgba(255,220,160,0.35), inset 0 -1px 2px rgba(0,0,0,0.35)",
              transform: `rotate(${p.rotate}deg)`,
              opacity: isVisible ? p.opacity : 0,
              transition: "opacity 1.2s ease-out",
              willChange: "transform, opacity",
              animation: `pellet-drift-${p.id % 6} ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Drift keyframes — 6 variants so movement feels organic */}
      <style>{`
        @keyframes pellet-drift-0 {
          0%   { transform: translate(0,0) rotate(0deg); }
          100% { transform: translate(20px,-120px) rotate(40deg); }
        }
        @keyframes pellet-drift-1 {
          0%   { transform: translate(0,0) rotate(0deg); }
          100% { transform: translate(-30px,-140px) rotate(-50deg); }
        }
        @keyframes pellet-drift-2 {
          0%   { transform: translate(0,0) rotate(0deg); }
          100% { transform: translate(40px,-160px) rotate(60deg); }
        }
        @keyframes pellet-drift-3 {
          0%   { transform: translate(0,0) rotate(0deg); }
          100% { transform: translate(-20px,-100px) rotate(-30deg); }
        }
        @keyframes pellet-drift-4 {
          0%   { transform: translate(0,0) rotate(0deg); }
          100% { transform: translate(10px,-180px) rotate(20deg); }
        }
        @keyframes pellet-drift-5 {
          0%   { transform: translate(0,0) rotate(0deg); }
          100% { transform: translate(-40px,-130px) rotate(-60deg); }
        }
      `}</style>
    </div>
  );
};

export default FloatingPellets;
