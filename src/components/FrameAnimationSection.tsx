import { useRef, useEffect, useState } from "react";

const FRAME_COUNT = 64;
const SECTION_HEIGHT = "200vh";
const BG_COLOR = "#eef4f0";

/** Pad a number to 3 digits: 1 → "001" */
const pad = (n: number) => String(n).padStart(3, "0");

/** Build the URL for a given frame index (1-based). */
const frameSrc = (i: number) => `/frames/ezgif-frame-${pad(i)}.jpg`;

const FrameAnimationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* ── Preload all 64 frames on mount ─────────────────────────── */
  useEffect(() => {
    let cancelled = false;

    const preload = async () => {
      const imgs: HTMLImageElement[] = [];

      await Promise.all(
        Array.from({ length: FRAME_COUNT }, (_, i) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = frameSrc(i + 1);
            img.onload = () => {
              imgs[i] = img;
              resolve();
            };
            img.onerror = () => resolve(); // gracefully skip broken frames
          });
        })
      );

      if (!cancelled) {
        setImages(imgs);
        setLoaded(true);
      }
    };

    preload();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ── Draw the correct frame based on scroll position ────────── */
  useEffect(() => {
    if (!loaded || images.length === 0) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /** Render a frame index (0-based) onto the canvas. */
    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img) return;

      // Size canvas to viewport
      const dpr = window.devicePixelRatio || 1;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.scale(dpr, dpr);

      // Fill background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, vw, vh);

      // Draw image – cover the canvas while maintaining aspect ratio
      const imgRatio = img.width / img.height;
      const canvasRatio = vw / vh;

      let drawW: number, drawH: number, drawX: number, drawY: number;
      if (imgRatio > canvasRatio) {
        drawH = vh;
        drawW = vh * imgRatio;
        drawX = (vw - drawW) / 2;
        drawY = 0;
      } else {
        drawW = vw;
        drawH = vw / imgRatio;
        drawX = 0;
        drawY = (vh - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Reset transform for next draw
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    let currentFrame = -1;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = section.offsetHeight - window.innerHeight;

      // How far the user has scrolled through this section (0 → 1)
      const scrolled = (window.scrollY - sectionTop) / sectionHeight;
      const progress = Math.min(Math.max(scrolled, 0), 1);

      const frameIndex = Math.min(
        Math.floor(progress * FRAME_COUNT),
        FRAME_COUNT - 1
      );

      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        drawFrame(frameIndex);
      }
    };

    // Draw the first frame immediately
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [loaded, images]);

  return (
    <section
      ref={sectionRef}
      style={{ height: SECTION_HEIGHT, position: "relative" }}
    >
      {/* Sticky container pinned to viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: BG_COLOR,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        />

        {/* Static text overlay at bottom center */}
        <span
          style={{
            position: "absolute",
            bottom: "48px",
            left: "50%",
            transform: "translateX(-50%)",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            fontSize: "13px",
            color: "#2d6a4f",
            fontWeight: 600,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          From Residue to Resource
        </span>
      </div>
    </section>
  );
};

export default FrameAnimationSection;
