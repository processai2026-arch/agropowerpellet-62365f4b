import { Shield, TrendingDown, Leaf, Network, Clock, Award } from "lucide-react";

const reasons = [
  { icon: Shield, title: "Reliable Supply", desc: "Guaranteed year-round availability with buffer stocks and multi-source procurement." },
  { icon: TrendingDown, title: "Cost Efficient", desc: "Competitive pricing through direct farmer networks and logistics optimization." },
  { icon: Leaf, title: "100% Sustainable", desc: "Every ton of biomass we supply prevents fossil fuel CO₂ emissions." },
  { icon: Network, title: "Strong Network", desc: "Pan-India aggregation network spanning 10+ states and 100+ suppliers." },
  { icon: Clock, title: "On-Time Delivery", desc: "Dedicated fleet management ensures your operations never stop." },
  { icon: Award, title: "Quality Certified", desc: "Lab-tested moisture content, calorific value, and ash percentage." },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Your Trusted Biomass Partner
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="flex gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-earth-light flex items-center justify-center flex-shrink-0">
                <r.icon className="h-6 w-6 text-earth" />
              </div>
              <div>
                <h3 className="font-display font-bold text-card-foreground">{r.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
