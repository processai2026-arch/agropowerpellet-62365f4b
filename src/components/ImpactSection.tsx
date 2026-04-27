import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CountUp from "@/components/CountUp";
import { fadeUp, staggerContainer, cardItem, viewportOnce } from "@/lib/motion";

const stats = [
  { value: 30, suffix: "%", label: "Average Fuel Cost Savings", sub: "for our industrial clients" },
  { value: 5000, suffix: "+", label: "Tons CO₂ Reduced", sub: "annually through biomass adoption" },
  { value: 10000, suffix: "+", label: "Tons Biomass Supplied", sub: "turning waste into valuable energy" },
  { value: 100, suffix: "+", label: "Farmer Livelihoods", sub: "supported through agro-residue procurement" },
];

const ImpactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Subtle slow parallax: background drifts as user scrolls
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="py-20 md:py-28 gradient-hero relative overflow-hidden"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 opacity-10 will-change-transform"
      >
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-earth blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary" style={{ color: 'hsl(145 63% 55%)' }}>
            Our Impact
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3" style={{ color: 'hsl(0 0% 100%)' }}>
            Driving the Circular Economy
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: 'hsl(0 0% 70%)' }}>
            Every ton of agro-residue we trade prevents open burning, reduces
            carbon emissions, and creates value for farmers and industries alike.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={cardItem}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              className="text-center p-6 rounded-2xl border backdrop-blur-sm"
              style={{
                borderColor: 'hsl(0 0% 100% / 0.1)',
                backgroundColor: 'hsl(0 0% 100% / 0.05)',
              }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient-eco mb-2">
                <CountUp value={s.value} suffix={s.suffix} duration={2.5} />
              </div>
              <div className="font-semibold text-sm" style={{ color: 'hsl(0 0% 90%)' }}>
                {s.label}
              </div>
              <div className="text-xs mt-1" style={{ color: 'hsl(0 0% 60%)' }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
