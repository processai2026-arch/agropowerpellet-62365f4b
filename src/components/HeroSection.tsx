import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Biomass field with industrial plant"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 gradient-hero opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl pt-20">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary-foreground border border-primary/30 mb-6">
          India's Trusted Biomass Supply Chain Partner
        </span>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6" style={{ color: 'hsl(0 0% 100%)' }}>
          Turning Agricultural Waste into{" "}
          <span className="text-gradient-eco">Industrial Energy</span>
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium" style={{ color: 'hsl(0 0% 85%)' }}>
          Smart supply chains. Sustainable energy. We help industries reduce
          fuel costs and increase profitability with reliable biomass solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact">
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 rounded-xl shadow-lg">
              Get a Free Quote <ArrowRight className="h-5 w-5" />
            </Button>
          </a>
          <a href="tel:+919940099060">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 text-base px-8 py-6 rounded-xl border-primary/40 hover:bg-primary/10"
              style={{ color: 'hsl(0 0% 95%)' }}
            >
              <Phone className="h-5 w-5" /> Call +91 9940099060
            </Button>
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Tons/Month Supplied" },
            { value: "30%", label: "Avg. Cost Savings" },
            { value: "50+", label: "Industry Clients" },
            { value: "100%", label: "Sustainable Fuel" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient-eco">
                {stat.value}
              </div>
              <div className="text-sm mt-1" style={{ color: 'hsl(0 0% 70%)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
