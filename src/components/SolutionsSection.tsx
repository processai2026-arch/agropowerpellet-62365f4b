import { Flame, TrendingDown, Leaf, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerSlow, solutionCard, cornerShape, viewportOnce } from "@/lib/motion";

const solutions = [
  {
    icon: Flame,
    title: "Thermal Energy Solutions",
    desc: "Custom biomass fuel blends optimized for your boiler specifications and thermal requirements.",
    highlight: "Up to 8,000 kcal/kg",
  },
  {
    icon: TrendingDown,
    title: "Fuel Cost Reduction",
    desc: "Replace expensive fossil fuels with cost-effective agro-residues. Average savings of 25-35% on fuel costs.",
    highlight: "30% avg. savings",
  },
  {
    icon: Truck,
    title: "Supply Chain Management",
    desc: "End-to-end logistics from farm-gate aggregation to factory-door delivery with guaranteed schedules.",
    highlight: "99% on-time delivery",
  },
  {
    icon: Leaf,
    title: "Sustainability Impact",
    desc: "Transition to carbon-neutral fuels. We help you track and report CO₂ reductions for ESG compliance.",
    highlight: "Carbon neutral",
  },
];

const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Solutions
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Reduce Costs. Increase Profitability.
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerSlow}
        >
          {solutions.map((s) => (
            <motion.div
              key={s.title}
              variants={solutionCard}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/40 transition-colors overflow-hidden group"
            >
              <motion.div
                variants={cornerShape}
                style={{ originX: 1, originY: 0 }}
                className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors"
              />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl gradient-eco flex items-center justify-center mb-5">
                  <s.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-card-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground mb-4">{s.desc}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-eco-light text-primary">
                  {s.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
