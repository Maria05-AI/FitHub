import { useState } from "react";
import MemberLayout from "@/components/MemberLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Dumbbell, Calendar, Flame } from "lucide-react";
import { toast } from "sonner";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([
    { id: 1, date: "2025-01-23", type: "Strength Training", exercises: "Bench Press, Squats, Deadlifts", duration: 50, calories: 320 },
    { id: 2, date: "2025-01-22", type: "Cardio", exercises: "Running, Cycling", duration: 35, calories: 280 },
    { id: 3, date: "2025-01-20", type: "HIIT", exercises: "Burpees, Jump Squats, Mountain Climbers", duration: 40, calories: 350 },
    { id: 4, date: "2025-01-18", type: "Strength Training", exercises: "Overhead Press, Pull-ups, Rows", duration: 45, calories: 290 },
  ]);

  const [newWorkout, setNewWorkout] = useState({
    type: "",
    exercises: "",
    duration: "",
    calories: "",
  });

  const handleAddWorkout = () => {
    if (!newWorkout.type || !newWorkout.duration) {
      toast.error("Please fill in required fields");
      return;
    }

    const workout = {
      id: workouts.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: newWorkout.type,
      exercises: newWorkout.exercises,
      duration: parseInt(newWorkout.duration),
      calories: parseInt(newWorkout.calories) || 0,
    };

    setWorkouts([workout, ...workouts]);
    setNewWorkout({ type: "", exercises: "", duration: "", calories: "" });
    toast.success("Workout logged successfully!");
  };

  return (
    <MemberLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Workouts</h1>
            <p className="text-muted-foreground">Track and manage your workout history</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Log Workout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log New Workout</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Workout Type *</Label>
                  <Input
                    id="type"
                    placeholder="e.g., Strength Training, Cardio, HIIT"
                    value={newWorkout.type}
                    onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exercises">Exercises</Label>
                  <Input
                    id="exercises"
                    placeholder="e.g., Bench Press, Squats"
                    value={newWorkout.exercises}
                    onChange={(e) => setNewWorkout({ ...newWorkout, exercises: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (min) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="45"
                      value={newWorkout.duration}
                      onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      placeholder="300"
                      value={newWorkout.calories}
                      onChange={(e) => setNewWorkout({ ...newWorkout, calories: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddWorkout} className="w-full">
                  Log Workout
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Workouts</p>
                  <p className="text-2xl font-bold mt-1">{workouts.length}</p>
                </div>
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold mt-1">5 sessions</p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Calories</p>
                  <p className="text-2xl font-bold mt-1">
                    {workouts.reduce((sum, w) => sum + w.calories, 0)}
                  </p>
                </div>
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workout History */}
        <Card>
          <CardHeader>
            <CardTitle>Workout History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{workout.type}</h3>
                      <span className="text-sm text-muted-foreground">{workout.date}</span>
                    </div>
                    {workout.exercises && (
                      <p className="text-sm text-muted-foreground">{workout.exercises}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-orange-500" />
                        {workout.calories} cal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
};

export default Workouts;
