import MemberLayout from "@/components/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calendar, Dumbbell, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const MemberProgress = () => {
  const weeklyData = [
    { day: "Mon", workouts: 1, calories: 320 },
    { day: "Tue", workouts: 1, calories: 280 },
    { day: "Wed", workouts: 0, calories: 0 },
    { day: "Thu", workouts: 1, calories: 350 },
    { day: "Fri", workouts: 1, calories: 290 },
    { day: "Sat", workouts: 1, calories: 310 },
    { day: "Sun", workouts: 0, calories: 0 },
  ];

  const monthlyStats = {
    totalWorkouts: 18,
    goalWorkouts: 20,
    totalCalories: 5240,
    goalCalories: 6000,
    avgDuration: 42,
    consistency: 72,
  };

  return (
    <MemberLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Progress & Analytics</h1>
          <p className="text-muted-foreground">Track your fitness journey and achievements</p>
        </div>

        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="overall">Overall</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6">
            {/* Weekly Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Workouts</p>
                      <p className="text-2xl font-bold mt-1">5</p>
                    </div>
                    <Dumbbell className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Calories</p>
                      <p className="text-2xl font-bold mt-1">1,550</p>
                    </div>
                    <Flame className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Time</p>
                      <p className="text-2xl font-bold mt-1">43m</p>
                    </div>
                    <Calendar className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Streak</p>
                      <p className="text-2xl font-bold mt-1">14</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{day.day}</span>
                        <span className="text-muted-foreground">
                          {day.workouts} workout{day.workouts !== 1 ? 's' : ''} • {day.calories} cal
                        </span>
                      </div>
                      <Progress value={day.workouts > 0 ? 100 : 0} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            {/* Monthly Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Workout Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span className="font-medium">
                      {monthlyStats.totalWorkouts} / {monthlyStats.goalWorkouts}
                    </span>
                  </div>
                  <Progress
                    value={(monthlyStats.totalWorkouts / monthlyStats.goalWorkouts) * 100}
                    className="h-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Calories Burned</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {monthlyStats.totalCalories} / {monthlyStats.goalCalories}
                    </span>
                  </div>
                  <Progress
                    value={(monthlyStats.totalCalories / monthlyStats.goalCalories) * 100}
                    className="h-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Consistency Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>This Month</span>
                    <span className="font-medium">{monthlyStats.consistency}%</span>
                  </div>
                  <Progress value={monthlyStats.consistency} className="h-2" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-secondary/30">
                    <p className="text-2xl font-bold text-primary">{monthlyStats.totalWorkouts}</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Workouts</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/30">
                    <p className="text-2xl font-bold text-primary">{monthlyStats.totalCalories}</p>
                    <p className="text-sm text-muted-foreground mt-1">Calories Burned</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/30">
                    <p className="text-2xl font-bold text-primary">{monthlyStats.avgDuration}m</p>
                    <p className="text-sm text-muted-foreground mt-1">Avg Duration</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/30">
                    <p className="text-2xl font-bold text-primary">{monthlyStats.consistency}%</p>
                    <p className="text-sm text-muted-foreground mt-1">Consistency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overall" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All-Time Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">127</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Workouts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">38,420</p>
                    <p className="text-sm text-muted-foreground mt-1">Calories Burned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">5,715</p>
                    <p className="text-sm text-muted-foreground mt-1">Minutes Trained</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">14</p>
                    <p className="text-sm text-muted-foreground mt-1">Current Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MemberLayout>
  );
};

export default MemberProgress;
