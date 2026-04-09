import { Wheat, Coffee, TreePine, Nut, Axe, Cylinder, Flame } from "lucide-react";

const products = [
  { icon: Axe, name: "Saw Dust", desc: "Fine wood particles ideal for boiler fuel and pellet manufacturing" },
  { icon: Coffee, name: "Coffee Husk", desc: "High-calorific agricultural byproduct from coffee processing" },
  { icon: Wheat, name: "Rice Husk", desc: "Abundant agro-residue perfect for thermal energy generation" },
  { icon: Nut, name: "Groundnut Shell", desc: "Excellent biomass fuel with consistent burning properties" },
  { icon: TreePine, name: "Waste Wood", desc: "Recycled wood materials for sustainable energy production" },
  { icon: Wheat, name: "Corn Cob", desc: "Dense biomass fuel with high heat output per unit" },
  { icon: Wheat, name: "Corn Stalk", desc: "Versatile agricultural waste for industrial combustion" },
  { icon: Cylinder, name: "Biomass Pellets", desc: "Compressed, uniform fuel for automated boiler systems" },
  { icon: Flame, name: "Stoves & Burners", desc: "Efficient biomass combustion equipment for industries" },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Products
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Biomass Fuels & Solutions
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            We source, aggregate, and supply a wide range of agro-residues and
            biomass fuels tailored to your industrial energy needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <div
              key={p.name}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all hover:shadow-lg group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-eco flex items-center justify-center flex-shrink-0">
                  <p.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
