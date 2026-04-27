import { Truck, Link, BarChart3, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { blurFocus, blurFocusContainer, viewportOnce } from "@/lib/motion";

const features = [
  {
    icon: Link,
    title: "Supply Chain Mastery",
    desc: "End-to-end sourcing, aggregation, and delivery of agro-residues with optimized logistics.",
  },
  {
    icon: Truck,
    title: "Pan-India Network",
    desc: "Strong connections with farmers, aggregators, and industrial consumers across regions.",
  },
  {
    icon: BarChart3,
    title: "Cost Optimization",
    desc: "Data-driven supply planning that reduces fuel procurement costs by up to 30%.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    desc: "Rigorous quality checks ensure consistent moisture, calorific value, and ash content.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={blurFocus}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            About Us
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Bridging Agriculture & Industry
          </h2>
          <p className="text-muted-foreground text-lg mt-4">
            Agro Power Pellet is a leading trader and supply chain solutions
            provider in the bioenergy and agro-residue sector. We connect
            industrial energy consumers with sustainable fuel sources, enabling
            cost savings, operational efficiency, and reduced carbon emissions.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={blurFocusContainer}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={blurFocus}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-colors hover:shadow-lg group"
            >

              <div className="w-12 h-12 rounded-xl bg-eco-light flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
