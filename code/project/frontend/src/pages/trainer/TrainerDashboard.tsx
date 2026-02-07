import TrainerLayout from "@/components/TrainerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TrainerDashboard = () => {
  const stats = [
    { name: "Active Members", value: "32", icon: Users, color: "text-primary" },
    { name: "Sessions This Week", value: "18", icon: Calendar, color: "text-accent" },
    { name: "Avg Attendance", value: "94%", icon: TrendingUp, color: "text-primary" },
    { name: "Top Performer", value: "Sarah M.", icon: Award, color: "text-orange-500" },
  ];

  const upcomingSessions = [
    { title: "HIIT Training", time: "10:00 AM", members: 8, location: "Studio A" },
    { title: "Strength Training", time: "2:00 PM", members: 12, location: "Gym Floor" },
    { title: "Boxing Class", time: "5:00 PM", members: 6, location: "Boxing Ring" },
  ];

  const recentActivity = [
    { member: "John Doe", action: "Completed HIIT session", time: "2 hours ago" },
    { member: "Emma Wilson", action: "Booked Yoga class", time: "4 hours ago" },
    { member: "Mike Johnson", action: "Achieved 30-day streak", time: "5 hours ago" },
  ];

  return (
    <TrainerLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Trainer Dashboard 💪</h1>
          <p className="text-muted-foreground">Monitor your members and manage sessions</p>
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
          {/* Today's Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSessions.map((session, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">{session.time} • {session.location}</p>
                    </div>
                    <Badge variant="secondary">{session.members} members</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <p className="font-medium">{activity.member}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>This Week's Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">18</p>
                <p className="text-sm text-muted-foreground mt-1">Sessions Conducted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">94%</p>
                <p className="text-sm text-muted-foreground mt-1">Attendance Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">4.8</p>
                <p className="text-sm text-muted-foreground mt-1">Avg Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">156</p>
                <p className="text-sm text-muted-foreground mt-1">Member Check-ins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TrainerLayout>
  );
};

export default TrainerDashboard;
