 
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import logo from "@/assets/fithub-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="FitHub" className="h-8 w-auto" />
          </div>
          <Link to="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <Hero />
      <Features />
      <Benefits />
      {/* Admin Portal CTA placed near the bottom of the landing page (centered) */}
      <div className="bg-card/30 py-12">
        <div className="container flex justify-center">
          <Link to="/admin/login">
            <Button size="lg" className="shadow-lg inline-flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v5c0 5.523-3.582 10-8 11-4.418-1-8-5.477-8-11V6l8-4z" />
              </svg>
              <span>Admin Portal</span>
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;