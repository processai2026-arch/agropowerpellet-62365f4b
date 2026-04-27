import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, cardItem, viewportOnce } from "@/lib/motion";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Plant Manager, ABC Textiles",
    quote: "Switching to biomass fuel through Agro Power Pellet reduced our fuel costs by 28%. Their consistent supply has never disrupted our production schedule.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "Operations Head, Green Foods Pvt. Ltd.",
    quote: "The quality of biomass pellets is exceptional. We've seen significant improvements in boiler efficiency and our ESG metrics have improved dramatically.",
    stars: 5,
  },
  {
    name: "Suresh Patel",
    role: "Owner, Modern Brick Works",
    quote: "Agro Power Pellet's supply chain reliability is unmatched. On-time deliveries and competitive pricing have made them our sole biomass supplier.",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Client Success Stories
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardItem}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              className="bg-card rounded-2xl p-8 border border-border relative hover:border-primary/40 transition-colors"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/15" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-earth text-earth" />
                ))}
              </div>
              <p className="text-card-foreground mb-6 italic">"{t.quote}"</p>
              <div>
                <div className="font-semibold text-card-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
