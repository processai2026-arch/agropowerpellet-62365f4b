const stats = [
  { value: "30%", label: "Average Fuel Cost Savings", sub: "for our industrial clients" },
  { value: "5,000+", label: "Tons CO₂ Reduced", sub: "annually through biomass adoption" },
  { value: "10,000+", label: "Tons Biomass Supplied", sub: "turning waste into valuable energy" },
  { value: "100+", label: "Farmer Livelihoods", sub: "supported through agro-residue procurement" },
];

const ImpactSection = () => {
  return (
    <section id="impact" className="py-20 md:py-28 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-earth blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
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
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center p-6 rounded-2xl border backdrop-blur-sm"
              style={{
                borderColor: 'hsl(0 0% 100% / 0.1)',
                backgroundColor: 'hsl(0 0% 100% / 0.05)',
              }}
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient-eco mb-2">
                {s.value}
              </div>
              <div className="font-semibold text-sm" style={{ color: 'hsl(0 0% 90%)' }}>
                {s.label}
              </div>
              <div className="text-xs mt-1" style={{ color: 'hsl(0 0% 60%)' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
