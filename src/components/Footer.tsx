import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold">Agro Power Pellet</span>
          </div>
          <p className="text-sm" style={{ color: 'hsl(0 0% 65%)' }}>
            © {new Date().getFullYear()} Agro Power Pellet. Smart Supply Chains. Sustainable Energy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
