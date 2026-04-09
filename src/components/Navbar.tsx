import { useState } from "react";
import { Menu, X, Phone, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            Agro Power Pellet
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+919940099060">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="h-4 w-4" /> Call Now
            </Button>
          </a>
          <a href="#contact">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Quote
            </Button>
          </a>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 mt-3">
            <a href="tel:+919940099060" className="flex-1">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Phone className="h-4 w-4" /> Call Now
              </Button>
            </a>
            <a href="#contact" className="flex-1">
              <Button size="sm" className="w-full bg-primary text-primary-foreground">
                Get Quote
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
