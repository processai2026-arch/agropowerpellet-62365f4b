import type { Variants } from "framer-motion";

// Premium fluid easing — the new house standard
export const easeFluid = [0.16, 1, 0.3, 1] as const;
export const easeSoft = [0.25, 0.1, 0.25, 1] as const;

export const viewportOnce = { once: true, margin: "-15%" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeFluid } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: easeFluid } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: easeFluid } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const cardItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeFluid },
  },
};

// 1. Premium Parallax Reveal — image scales down from 1.1 → 1 inside masked container
export const parallaxCard: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeFluid },
  },
};

export const parallaxImage: Variants = {
  hidden: { scale: 1.15 },
  show: { scale: 1, transition: { duration: 1.2, ease: easeFluid } },
};

// 2. Blur-to-Focus cinematic reveal
export const blurFocus: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: easeFluid },
  },
};

export const blurFocusContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

// 3. Solutions card slide up + corner shape expand
export const solutionCard: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeFluid },
  },
};

export const cornerShape: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1, ease: easeFluid, delay: 0.25 },
  },
};

// 4. Industries alternating slide
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeFluid } },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeFluid } },
};

export const slideFromBottom: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeFluid } },
};
