import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Name: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/919940099060?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Let's Power Your Industry
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            Get a free quote for biomass fuel supply. Our team responds within 2 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                Mr. M. G. Sankkar
              </h3>
              <p className="text-muted-foreground">Founder & Managing Director</p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+919940099060"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl gradient-eco flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">Call Now</div>
                  <div className="text-muted-foreground text-sm">+91 9940099060</div>
                </div>
              </a>

              <a
                href="https://wa.me/919940099060"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl gradient-earth flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">WhatsApp</div>
                  <div className="text-muted-foreground text-sm">Quick response guaranteed</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-eco-light flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">Location</div>
                  <div className="text-muted-foreground text-sm">Tamil Nadu, India</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <textarea
              placeholder="Tell us about your fuel requirements..."
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-6 text-base"
            >
              Send via WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
