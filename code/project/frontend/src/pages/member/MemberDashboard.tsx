import MemberLayout from "@/components/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Flame, Award, TrendingUp, Dumbbell, Clock } from "lucide-react";

const MemberDashboard = () => {
  const stats = [
    { name: "Current Streak", value: "14 days", icon: Flame, color: "text-orange-500" },
    { name: "Total Workouts", value: "42", icon: Dumbbell, color: "text-primary" },
    { name: "This Month", value: "12 sessions", icon: Calendar, color: "text-accent" },
    { name: "Avg Duration", value: "45 min", icon: Clock, color: "text-muted-foreground" },
  ];

  const recentWorkouts = [
    { date: "2025-01-23", type: "Strength Training", duration: "50 min", calories: 320 },
    { date: "2025-01-22", type: "Cardio", duration: "35 min", calories: 280 },
    { date: "2025-01-20", type: "HIIT", duration: "40 min", calories: 350 },
  ];

  const achievements = [
    { name: "7 Day Streak", icon: "🔥", unlocked: true },
    { name: "First Month", icon: "🎉", unlocked: true },
    { name: "50 Workouts", icon: "💪", unlocked: false },
    { name: "100 Workouts", icon: "⭐", unlocked: false },
  ];

  return (
    <MemberLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Keep up the great work on your fitness journey.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Workouts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                Recent Workouts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentWorkouts.map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div>
                    <p className="font-medium">{workout.type}</p>
                    <p className="text-sm text-muted-foreground">{workout.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{workout.duration}</p>
                    <p className="text-sm text-muted-foreground">{workout.calories} cal</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      achievement.unlocked
                        ? "border-primary bg-primary/5"
                        : "border-border bg-muted/20 opacity-60"
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="text-sm font-medium">{achievement.name}</p>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="mt-2">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monthly Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Workout Goal</span>
                <span className="font-medium">12 / 16 sessions</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Calories Burned</span>
                <span className="font-medium">3,850 / 5,000 cal</span>
              </div>
              <Progress value={77} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
};

export default MemberDashboard;
