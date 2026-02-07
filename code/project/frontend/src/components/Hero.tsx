 // src/components/Hero.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/fithub-logo.png";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="animate-fade-in">
            <img src={logo} alt="FitHub Logo" className="h-24 md:h-32 w-auto mx-auto" />
          </div>

          {/* Headline */}
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Your Complete{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Fitness Journey
              </span>
              <br />
              Starts Here
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              FitHub connects gym members and trainers on one powerful platform. Track workouts,
              book sessions, earn badges, and achieve your fitness goals with ease.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
            <Button size="lg" className="text-base px-8 group" asChild>
              <Link to="/auth?role=member">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="text-base px-8" asChild>
              <Link to="/auth?role=trainer">Trainer login</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 md:gap-12 pt-12 w-full max-w-2xl animate-fade-in-up delay-300">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Expert Trainers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Workouts Logged</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
