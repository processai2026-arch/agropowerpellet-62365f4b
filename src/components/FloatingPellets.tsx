import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Global ambient FALLING pellet background.
 * - Fixed full-viewport layer behind content (z-index: 1, pointer-events: none)
 * - Pellets fall from above the viewport to below, with a gentle horizontal sway
 * - Density scales with scroll progress (15 → 65 pellets desktop, capped at 20 on mobile)
 * - CSS keyframes only (no JS-driven motion), GPU-accelerated via transform
 */

type Pellet = {
  id: number;
  leftPct: number;       // 0-100
  width: number;         // px
  height: number;        // px
  rotate: number;        // deg
  duration: number;      // s (fall cycle)
  delay: number;         // s (negative so mid-cycle on mount)
  swayVariant: number;   // 0-3 → which sway keyframe
  opacity: number;       // 0.35 - 0.55
  color: string;         // gradient mid color
  colorDark: string;     // gradient edge color
};

const MAX_DESKTOP = 65;
const MAX_MOBILE = 20;

const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

// Color palette: 60% warm brown, 25% dark amber, 15% light tan
const pickColor = (r: number): { mid: string; dark: string } => {
  if (r < 0.6) return { mid: "#8B5E3C", dark: "#5d3d23" };
  if (r < 0.85) return { mid: "#6B4423", dark: "#3f2812" };
  return { mid: "#C4956A", dark: "#8a6440" };
};

const buildPellets = (count: number, mobile: boolean): Pellet[] => {
  // Sizes: width x height. Mobile uses only the two smaller sizes.
  const sizes = mobile
    ? [
        { w: 8, h: 18 },
        { w: 12, h: 28 },
      ]
    : [
        { w: 8, h: 18 },
        { w: 8, h: 18 },
        { w: 8, h: 18 },
        { w: 12, h: 28 },
        { w: 12, h: 28 },
        { w: 16, h: 38 },
      ];

  return Array.from({ length: count }).map((_, i) => {
    const r1 = rand(i + 1);
    const r2 = rand(i + 2);
    const r3 = rand(i + 3);
    const r4 = rand(i + 4);
    const r5 = rand(i + 5);
    const r6 = rand(i + 6);
    const r7 = rand(i + 7);
    const size = sizes[Math.floor(r3 * sizes.length)];
    const { mid, dark } = pickColor(r7);
    return {
      id: i,
      leftPct: r1 * 100,
      width: size.w,
      height: size.h,
      rotate: Math.round((r4 * 2 - 1) * 60),  // -60° to +60°
      duration: 8 + r2 * 7,                   // 8s - 15s
      delay: -r5 * 15,                        // negative so mid-cycle
      swayVariant: Math.floor(r6 * 4),
      opacity: 0.35 + r5 * 0.2,               // 0.35 - 0.55
      color: mid,
      colorDark: dark,
    };
  });
};

const FloatingPellets = () => {
  const isMobile = useIsMobile();
  const max = isMobile ? MAX_MOBILE : MAX_DESKTOP;

  const pellets = useMemo(() => buildPellets(max, isMobile), [max, isMobile]);

  const [visibleCount, setVisibleCount] = useState(Math.round(max * 0.25));

  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      // 0%: 15, 25%: 25, 50%: 35, 75%: 50, 100%: 65 (desktop). Mobile scales to max=20.
      const ratio =
        progress < 0.25
          ? 0.23 + (progress / 0.25) * (0.38 - 0.23)
          : progress < 0.5
          ? 0.38 + ((progress - 0.25) / 0.25) * (0.54 - 0.38)
          : progress < 0.75
          ? 0.54 + ((progress - 0.5) / 0.25) * (0.77 - 0.54)
          : 0.77 + ((progress - 0.75) / 0.25) * (1.0 - 0.77);
      setVisibleCount(Math.max(3, Math.round(max * ratio)));
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
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1, overflow: "hidden" }}
    >
      {pellets.map((p, i) => {
        const isVisible = i < visibleCount;
        return (
          <span
            key={p.id}
            className="absolute block"
            style={{
              left: `${p.leftPct}%`,
              top: "-80px",
              width: `${p.width}px`,
              height: `${p.height}px`,
              borderRadius: "4px",
              background: `linear-gradient(90deg, ${p.colorDark} 0%, ${p.color} 50%, ${p.colorDark} 100%)`,
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,220,170,0.25), inset 0 -1px 2px rgba(0,0,0,0.3)",
              opacity: isVisible ? p.opacity : 0,
              transition: "opacity 1s ease-out",
              willChange: "transform, opacity",
              transform: `rotate(${p.rotate}deg)`,
              animation: `pellet-fall-${p.swayVariant} ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        );
      })}

      <style>{`
        @keyframes pellet-fall-0 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          25%  { transform: translate(20px, 25vh) rotate(15deg); }
          50%  { transform: translate(-10px, 50vh) rotate(-10deg); }
          75%  { transform: translate(15px, 75vh) rotate(20deg); }
          100% { transform: translate(0, calc(100vh + 120px)) rotate(0deg); }
        }
        @keyframes pellet-fall-1 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          25%  { transform: translate(-30px, 25vh) rotate(-20deg); }
          50%  { transform: translate(20px, 50vh) rotate(15deg); }
          75%  { transform: translate(-25px, 75vh) rotate(-15deg); }
          100% { transform: translate(0, calc(100vh + 120px)) rotate(10deg); }
        }
        @keyframes pellet-fall-2 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          50%  { transform: translate(35px, 50vh) rotate(25deg); }
          100% { transform: translate(-20px, calc(100vh + 120px)) rotate(-15deg); }
        }
        @keyframes pellet-fall-3 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          33%  { transform: translate(-40px, 33vh) rotate(-25deg); }
          66%  { transform: translate(30px, 66vh) rotate(20deg); }
          100% { transform: translate(-15px, calc(100vh + 120px)) rotate(-10deg); }
        }
      `}</style>
    </div>
  );
};

export default FloatingPellets;
