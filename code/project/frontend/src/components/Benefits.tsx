 import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Benefits = () => {
  const memberBenefits = [
    "Log workouts and track calories burned",
    "Monitor your progress with streaks and badges",
    "Book training sessions with ease",
    "Access detailed performance reports",
    "Stay motivated with gamification features",
  ];

  const trainerBenefits = [
    "Manage member profiles efficiently",
    "Control training sessions and schedules",
    "Generate performance analytics",
    "Track attendance and engagement",
    "Support members' fitness journeys",
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Built for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a gym member or trainer, FitHub provides the tools you need.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Members Card */}
          <Card className="border-2 hover:border-primary/50 transition-colors bg-gradient-to-br from-card to-secondary/20">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">For Members</h3>
                <p className="text-muted-foreground">
                  Take control of your fitness journey with comprehensive tracking and motivation.
                </p>
              </div>
              <ul className="space-y-3">
                {memberBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Trainers Card */}
          <Card className="border-2 hover:border-accent/50 transition-colors bg-gradient-to-br from-card to-accent/5">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">For Trainers</h3>
                <p className="text-muted-foreground">
                  Streamline your workflow and focus on what matters - your members' success.
                </p>
              </div>
              <ul className="space-y-3">
                {trainerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Benefits;