import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-lg shadow-sm' : 'bg-background/80 backdrop-blur-lg'} border-b border-border`}>
      <div className="container mx-auto flex items-center justify-between h-14 sm:h-16 px-4">
        <a href="#" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
          <span className="font-display text-lg sm:text-xl font-bold text-foreground">
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

        <button
          className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-14 bg-background/98 backdrop-blur-md transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-4 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-xl transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex gap-3 mt-6 pt-6 border-t border-border">
            <a href="tel:+919940099060" className="flex-1">
              <Button variant="outline" size="lg" className="w-full gap-2 rounded-xl">
                <Phone className="h-4 w-4" /> Call Now
              </Button>
            </a>
            <a href="#contact" className="flex-1" onClick={() => setOpen(false)}>
              <Button size="lg" className="w-full bg-primary text-primary-foreground rounded-xl">
                Get Quote
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
