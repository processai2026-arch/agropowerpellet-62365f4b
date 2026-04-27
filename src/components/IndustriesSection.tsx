import { Factory, UtensilsCrossed, Shirt, Blocks, Droplets, Wheat } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, cardItem, viewportOnce } from "@/lib/motion";

const industries = [
  { icon: Factory, name: "Industrial Boilers", desc: "Steam & hot water generation for manufacturing" },
  { icon: UtensilsCrossed, name: "Food Processing", desc: "Drying, roasting, and thermal processing" },
  { icon: Shirt, name: "Textiles & Dyeing", desc: "Steam for dyeing, finishing, and laundering" },
  { icon: Blocks, name: "Brick Kilns", desc: "High-temperature firing with consistent fuel" },
  { icon: Droplets, name: "Chemical Plants", desc: "Process heating and thermal utilities" },
  { icon: Wheat, name: "Agro Industries", desc: "Rice mills, oil mills, and sugar refineries" },
];

const IndustriesSection = () => {
  return (
    <section id="industries" className="py-20 md:py-28 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Industries We Serve
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Reliable Biomass for Modern Industries
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {industries.map((ind) => (
            <motion.div
              key={ind.name}
              variants={cardItem}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-colors text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-eco-light mx-auto flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <ind.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">
                {ind.name}
              </h3>
              <p className="text-muted-foreground text-sm mt-2">{ind.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
