import TrainerLayout from "@/components/TrainerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const TrainerReports = () => {
  const weeklyData = [
    { day: "Mon", sessions: 3, attendance: 28 },
    { day: "Tue", sessions: 4, attendance: 35 },
    { day: "Wed", sessions: 2, attendance: 18 },
    { day: "Thu", sessions: 3, attendance: 32 },
    { day: "Fri", sessions: 4, attendance: 38 },
    { day: "Sat", sessions: 2, attendance: 20 },
    { day: "Sun", sessions: 0, attendance: 0 },
  ];

  const topPerformers = [
    { name: "Sarah Martinez", workouts: 24, attendance: 96 },
    { name: "John Doe", workouts: 22, attendance: 92 },
    { name: "Emma Wilson", workouts: 20, attendance: 88 },
    { name: "Mike Johnson", workouts: 19, attendance: 85 },
  ];

  return (
    <TrainerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Performance Reports</h1>
          <p className="text-muted-foreground">Analyze member progress and attendance</p>
        </div>

        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="members">Member Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6">
            {/* Weekly Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Sessions</p>
                      <p className="text-2xl font-bold mt-1">18</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Attendance</p>
                      <p className="text-2xl font-bold mt-1">171</p>
                    </div>
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg/Session</p>
                      <p className="text-2xl font-bold mt-1">9.5</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Fill Rate</p>
                      <p className="text-2xl font-bold mt-1">79%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{day.day}</span>
                        <span className="text-muted-foreground">
                          {day.sessions} session{day.sessions !== 1 ? 's' : ''} • {day.attendance} attendees
                        </span>
                      </div>
                      <Progress value={day.attendance > 0 ? (day.attendance / 40) * 100 : 0} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">72</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Sessions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">684</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Attendance</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">9.5</p>
                  <p className="text-sm text-muted-foreground mt-1">Avg Attendance</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">82%</p>
                  <p className="text-sm text-muted-foreground mt-1">Fill Rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Week 1</span>
                      <span className="font-medium">18 sessions • 168 attendees</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Week 2</span>
                      <span className="font-medium">17 sessions • 171 attendees</span>
                    </div>
                    <Progress value={79} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Week 3</span>
                      <span className="font-medium">19 sessions • 178 attendees</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Week 4</span>
                      <span className="font-medium">18 sessions • 167 attendees</span>
                    </div>
                    <Progress value={77} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((member, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {member.workouts} workouts this month
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{member.attendance}%</p>
                          <p className="text-xs text-muted-foreground">Attendance</p>
                        </div>
                      </div>
                      <Progress value={member.attendance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">32</p>
                  <p className="text-sm text-muted-foreground mt-1">Active Members</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">21.4</p>
                  <p className="text-sm text-muted-foreground mt-1">Avg Workouts/Member</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">87%</p>
                  <p className="text-sm text-muted-foreground mt-1">Retention Rate</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TrainerLayout>
  );
};

export default TrainerReports;
