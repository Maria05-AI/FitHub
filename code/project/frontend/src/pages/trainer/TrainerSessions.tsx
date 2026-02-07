import { useState } from "react";
import TrainerLayout from "@/components/TrainerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, Clock, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

const TrainerSessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: "HIIT Training",
      date: "2025-01-25",
      time: "10:00 AM",
      duration: "45 min",
      location: "Studio A",
      capacity: 12,
      booked: 8,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Strength & Conditioning",
      date: "2025-01-26",
      time: "2:00 PM",
      duration: "60 min",
      location: "Gym Floor",
      capacity: 15,
      booked: 12,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Boxing Fundamentals",
      date: "2025-01-28",
      time: "5:00 PM",
      duration: "45 min",
      location: "Boxing Ring",
      capacity: 8,
      booked: 6,
      status: "upcoming",
    },
  ]);

  const [newSession, setNewSession] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    capacity: "",
  });

  const handleCreateSession = () => {
    if (!newSession.title || !newSession.date || !newSession.time) {
      toast.error("Please fill in required fields");
      return;
    }

    const session = {
      id: sessions.length + 1,
      ...newSession,
      capacity: parseInt(newSession.capacity) || 10,
      booked: 0,
      status: "upcoming",
    };

    setSessions([...sessions, session]);
    setNewSession({ title: "", date: "", time: "", duration: "", location: "", capacity: "" });
    toast.success("Session created successfully!");
  };

  return (
    <TrainerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Session Management</h1>
            <p className="text-muted-foreground">Create and manage training sessions</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Session Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., HIIT Training"
                    value={newSession.title}
                    onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newSession.time}
                      onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="45 min"
                      value={newSession.duration}
                      onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="10"
                      value={newSession.capacity}
                      onChange={(e) => setNewSession({ ...newSession, capacity: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Studio A"
                    value={newSession.location}
                    onChange={(e) => setNewSession({ ...newSession, location: e.target.value })}
                  />
                </div>
                <Button onClick={handleCreateSession} className="w-full">
                  Create Session
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{sessions.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Sessions</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">
                  {sessions.reduce((sum, s) => sum + s.booked, 0)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Total Bookings</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">
                  {Math.round(
                    (sessions.reduce((sum, s) => sum + s.booked, 0) /
                      sessions.reduce((sum, s) => sum + s.capacity, 0)) *
                      100
                  )}
                  %
                </p>
                <p className="text-sm text-muted-foreground mt-1">Avg Fill Rate</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">18</p>
                <p className="text-sm text-muted-foreground mt-1">This Week</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <Card key={session.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{session.title}</CardTitle>
                  <Badge variant={session.booked === session.capacity ? "destructive" : "secondary"}>
                    {session.booked}/{session.capacity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {session.time} • {session.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{session.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{session.booked} members booked</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TrainerLayout>
  );
};

export default TrainerSessions;
