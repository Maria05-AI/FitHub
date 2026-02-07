import { Link } from "react-router-dom";
// Rendered inside `AdminLayout` by the parent admin route; do not wrap here.
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Users, UserCog, CreditCard, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Trainers", value: "12", icon: UserCog, change: "+2 this month" },
    { title: "Total Members", value: "156", icon: Users, change: "+18 this month" },
    { title: "Active Memberships", value: "142", icon: CreditCard, change: "91% active" },
    { title: "Revenue", value: "$12,450", icon: TrendingUp, change: "+15% vs last month" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your gym management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-[var(--shadow-card)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button asChild>
            <Link to="/admin/trainers">
              <UserCog className="mr-2 h-4 w-4" />
              Manage Trainers
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/admin/members">
              <Users className="mr-2 h-4 w-4" />
              Manage Members
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New member registered", name: "John Smith", time: "2 hours ago" },
              { action: "Trainer account created", name: "Sarah Johnson", time: "5 hours ago" },
              { action: "Membership renewed", name: "Mike Davis", time: "1 day ago" },
              { action: "Member deactivated", name: "Emily Brown", time: "2 days ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.name}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
