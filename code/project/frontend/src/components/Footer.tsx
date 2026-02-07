import { Link } from "react-router-dom";
import logo from "@/assets/fithub-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <img src={logo} alt="FitHub" className="h-12 w-auto" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Smart Gym & Wellness Management System connecting members and trainers 
              for a better fitness journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#benefits" className="hover:text-primary transition-colors">Benefits</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><Link to="/admin/login" className="hover:text-primary transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: info@fithub.com</li>
              <li>Phone: +966 XXX XXXX</li>
              <li>Dammam, Saudi Arabia</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2025 FitHub. Built by Team FitHub - IAU Computer Science.</p>
          <p className="mt-2">
            <Link to="/admin/login" className="text-xs hover:text-primary">Admin Portal</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;