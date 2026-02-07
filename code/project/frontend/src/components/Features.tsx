 import { Calendar, TrendingUp, Award, Users, BarChart3, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Calendar,
    title: "Session Booking",
    description: "Easily schedule and manage training sessions with calendar-style booking and attendance tracking.",
  },
  {
    icon: TrendingUp,
    title: "Workout Logging",
    description: "Record exercises, duration, and calories burned with comprehensive workout history.",
  },
  {
    icon: Award,
    title: "Gamification",
    description: "Stay motivated with achievement streaks, badges, and progress milestones.",
  },
  {
    icon: Users,
    title: "Trainer Dashboard",
    description: "Manage member profiles, sessions, and performance with powerful trainer tools.",
  },
  {
    icon: BarChart3,
    title: "Performance Reports",
    description: "Track progress with detailed weekly and monthly analytics and visual charts.",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Monitor attendance, subscription status, and workout consistency in real-time.",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you achieve your fitness goals and manage your gym experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm hover:-translate-y-1"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;