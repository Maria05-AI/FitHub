import { useState, useEffect } from "react";
// Rendered inside `AdminLayout` by the route; do not wrap again.
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Plus, Pencil } from "lucide-react";
import { useToast } from "@/use-toast";
import { get, post, put, patch, del } from "@/lib/api";

interface Trainer {
  id: string;
  name: string;
  email: string;
  specialty: string;
  status: "active" | "inactive";
}

const ManageTrainers = () => {
  const { toast } = useToast();
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    status: "active" as "active" | "inactive",
  });

  const loadTrainers = async () => {
    setLoading(true);
    try {
      const users = await get<any[]>("/admin/users");
      const trainersList: Trainer[] = users
        .filter((u) => u.role === "trainer")
        .map((u) => ({
          id: String(u.id),
          name: u.name,
          email: u.email,
          specialty: u.specialty || "General Training",
          status: u.is_active ? "active" : "inactive",
        }));
      setTrainers(trainersList);
    } catch (e: any) {
      toast({
        title: "Failed to load trainers",
        description: e?.message || String(e),
        variant: "destructive"
      });
      // Clear trainers list on error to ensure no stale data
      setTrainers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  const openAddDialog = () => {
    setEditingTrainer(null);
    setFormData({ name: "", email: "", password: "", specialty: "", status: "active" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (trainer: Trainer) => {
    setEditingTrainer(trainer);
    setFormData({ name: trainer.name, email: trainer.email, password: "", specialty: trainer.specialty, status: trainer.status });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingTrainer) {
        // Update existing trainer
        await put(`/admin/users/${editingTrainer.id}`, {
          name: formData.name,
          email: formData.email,
          specialty: formData.specialty,
          is_active: formData.status === "active",
        });
        toast({ title: "Trainer updated successfully" });
      } else {
        // Add new trainer
        const payload: any = {
          name: formData.name,
          email: formData.email,
          role: "trainer",
          specialty: formData.specialty,
          password: formData.password || "password123",
        };
        await post("/admin/users", payload);
        toast({ title: "Trainer added successfully" });
      }
      setIsDialogOpen(false);
      // Re-fetch fresh data from database
      await loadTrainers();
    } catch (e: any) {
      toast({ 
        title: editingTrainer ? "Update failed" : "Add failed", 
        description: e?.message || String(e),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (trainerId: string) => {
    setLoading(true);
    try {
      // Call backend to toggle status
      await patch(`/admin/users/${trainerId}/status`);
      
      toast({ 
        title: "Status updated successfully",
        description: "Trainer status has been changed.",
      });
      
      // Re-fetch fresh data from database
      await loadTrainers();
    } catch (e: any) {
      toast({ 
        title: "Status update failed", 
        description: e?.message || String(e),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Trainers</h1>
            <p className="text-muted-foreground mt-1">Add, edit, and manage trainer accounts</p>
          </div>
          <Button onClick={openAddDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Trainer
          </Button>
        </div>

        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>All Trainers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trainer Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        <span className="ml-2">Loading trainers...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : trainers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No trainers found. Add your first trainer to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  trainers.map((trainer) => (
                    <TableRow key={trainer.id}>
                      <TableCell className="font-medium">{trainer.name}</TableCell>
                      <TableCell>{trainer.email}</TableCell>
                      <TableCell>{trainer.specialty}</TableCell>
                      <TableCell>
                        <Badge variant={trainer.status === "active" ? "default" : "secondary"}>{trainer.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(trainer)}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toggleStatus(trainer.id)}>
                          {trainer.status === "active" ? "Deactivate" : "Activate"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTrainer ? "Edit Trainer" : "Add Trainer"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter email" />
              </div>
              {!editingTrainer && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Enter password" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input id="specialty" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} placeholder="e.g., Strength Training, Yoga" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
};

export default ManageTrainers;
