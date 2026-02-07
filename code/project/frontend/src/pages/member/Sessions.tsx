import { useState } from "react";
import MemberLayout from "@/components/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MapPin } from "lucide-react";
import { toast } from "sonner";

const Sessions = () => {
  const [sessions] = useState([
    {
      id: 1,
      title: "HIIT Training",
      trainer: "Sarah Johnson",
      date: "2025-01-25",
      time: "10:00 AM",
      duration: "45 min",
      location: "Studio A",
      status: "upcoming",
      spots: 8,
    },
    {
      id: 2,
      title: "Strength & Conditioning",
      trainer: "Mike Chen",
      date: "2025-01-26",
      time: "2:00 PM",
      duration: "60 min",
      location: "Gym Floor",
      status: "upcoming",
      spots: 5,
    },
    {
      id: 3,
      title: "Yoga Flow",
      trainer: "Emma Williams",
      date: "2025-01-27",
      time: "9:00 AM",
      duration: "50 min",
      location: "Studio B",
      status: "available",
      spots: 12,
    },
    {
      id: 4,
      title: "Boxing Fundamentals",
      trainer: "David Martinez",
      date: "2025-01-28",
      time: "5:00 PM",
      duration: "45 min",
      location: "Boxing Ring",
      status: "available",
      spots: 6,
    },
  ]);

  const upcomingSessions = sessions.filter(s => s.status === "upcoming");
  const availableSessions = sessions.filter(s => s.status === "available");

  const handleBookSession = (sessionId: number) => {
    toast.success("Session booked successfully!");
  };

  const handleCancelSession = (sessionId: number) => {
    toast.success("Session cancelled");
  };

  return (
    <MemberLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Training Sessions</h1>
          <p className="text-muted-foreground">Book and manage your training sessions</p>
        </div>

        {/* Upcoming Sessions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">My Upcoming Sessions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="border-primary/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <User className="h-4 w-4" />
                        {session.trainer}
                      </p>
                    </div>
                    <Badge>Booked</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{session.location}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleCancelSession(session.id)}
                  >
                    Cancel Booking
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Sessions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Sessions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {availableSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <User className="h-4 w-4" />
                        {session.trainer}
                      </p>
                    </div>
                    <Badge variant="secondary">{session.spots} spots left</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{session.location}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleBookSession(session.id)}
                  >
                    Book Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default Sessions;
