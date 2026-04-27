import type { Variants } from "framer-motion";

// Premium fluid easing — the new house standard
export const easeFluid = [0.16, 1, 0.3, 1] as const;
export const easeSoft = [0.25, 0.1, 0.25, 1] as const;

export const viewportOnce = { once: true, margin: "-10%" } as const;

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

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerSlow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
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
  hidden: { scale: 1.15, opacity: 0, y: 20 },
  show: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeSoft },
  },
};

// 2. Blur-to-Focus cinematic reveal
export const blurFocus: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeSoft },
  },
};

export const blurFocusContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

export const blurFocusContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

// 3. Solutions card slide-from-left + corner shape subtle scale
export const solutionCard: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: easeSoft },
  },
};

export const cornerShape: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.85, ease: easeSoft, delay: 0.2 },
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
