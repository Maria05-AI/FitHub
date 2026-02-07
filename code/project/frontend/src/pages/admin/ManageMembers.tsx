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
import { get, put, post, patch, del } from "@/lib/api";
 
interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: "active" | "suspended" | "expired";
  assignedTrainerId: string;
  assignedTrainer: string;
}

// API user shape returned by /admin/users
interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  specialty?: string | null;
  is_active?: boolean;
  plan?: string | null;
  status?: string | null;
  assigned_trainer_id?: number | null;
  created_at?: string | null;
}

const ManageMembers = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [trainers, setTrainers] = useState<{id: number, name: string}[]>([]);

  const plans = ["Basic", "Standard", "Premium"];

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);

  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "Basic",
    status: "active" as "active" | "suspended" | "expired",
    assignedTrainer: "0",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    status: "active" as "active" | "suspended" | "expired",
    assignedTrainer: "0",
  });

  const openAddDialog = () => {
    setAddFormData({
      name: "",
      email: "",
      phone: "",
      plan: "Basic",
      status: "active",
      assignedTrainer: "0",
    });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (member: Member) => {
    setEditingMember(member);
    setEditFormData({
      name: member.name,
      email: member.email,
      phone: member.phone || "",
      plan: member.plan,
      status: member.status,
      assignedTrainer: member.assignedTrainerId,
    });
    setIsEditDialogOpen(true);
  };

  const loadTrainers = async () => {
    // Try the dedicated trainers endpoint first (more efficient)
    try {
      const resp = await get<{ id: number; name: string }[]>('/admin/trainers');
      const all = [{ id: 0, name: 'None' }, ...resp.map((t) => ({ id: t.id, name: t.name }))];
      setTrainers(all);
      return all;
    } catch (err: unknown) {
      // Fallback: older API versions may only expose /admin/users
      try {
        const trainersResp = await get<AdminUser[]>('/admin/users');
        const trainersList = trainersResp
          .filter((u) => u.role === 'trainer')
          .map((u) => ({ id: u.id, name: u.name }));
        const allTrainers = [{ id: 0, name: 'None' }, ...trainersList];
        setTrainers(allTrainers);
        return allTrainers;
      } catch (err2: unknown) {
        const msg = err2 instanceof Error ? err2.message : String(err2);
        console.error('Failed to load trainers', msg);
        const fallback = [{ id: 0, name: 'None' }];
        setTrainers(fallback);
        return fallback;
      }
    }
  };

  const loadMembers = async (trainersList?: { id: number; name: string }[]) => {
    setLoading(true);
    try {
      const users = await get<AdminUser[]>('/admin/users');
      // Build trainer map from provided list or current state
      const source = trainersList ?? trainers;
      const trainerMap = source.reduce((acc, t) => {
        acc[t.id] = t.name;
        return acc;
      }, {} as Record<number, string>);
      const membersList: Member[] = users
        .filter((u) => u.role === "member")
        .map((u) => {
          const raw = (u.status?.toLowerCase()) || (u.is_active ? "active" : "suspended");
          let statusUnion: "active" | "suspended" | "expired" = "suspended";
          if (raw === "active") statusUnion = "active";
          else if (raw === "suspended") statusUnion = "suspended";
          else if (raw === "expired") statusUnion = "expired";

          return {
            id: String(u.id),
            name: u.name,
            email: u.email,
            phone: u.phone || "",
            plan: u.plan || "Basic",
            // prefer explicit status if backend exposes it (Active/Suspended/Expired)
            status: statusUnion,
            assignedTrainerId: u.assigned_trainer_id ? String(u.assigned_trainer_id) : '0',
            assignedTrainer: u.assigned_trainer_id ? trainerMap[u.assigned_trainer_id] || 'Unknown' : 'None',
          };
        });
      setMembers(membersList);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast({ 
        title: "Failed to load members", 
        description: msg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const t = await loadTrainers();
      await loadMembers(t);
    })();
  }, []);

  const handleAdd = async () => {
    setLoading(true);
    try {
      const trainer = trainers.find((t) => String(t.id) === addFormData.assignedTrainer);
      const payload: Partial<AdminUser> & { role: string } = {
        name: addFormData.name,
        email: addFormData.email,
        phone: addFormData.phone,
        role: "member",
        plan: addFormData.plan,
        assigned_trainer_id: trainer && trainer.id !== 0 ? trainer.id : null,
        status: addFormData.status === "active" ? "Active" : addFormData.status === "suspended" ? "Suspended" : "Expired",
        // backend will set a default password if none provided
      };
      await post("/admin/users", payload);
      toast({ title: "Member added successfully" });
      setIsAddDialogOpen(false);
      // Re-fetch fresh data from database (reload trainers then members to ensure mapping)
      const t = await loadTrainers();
      await loadMembers(t);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast({ 
        title: "Add failed", 
        description: msg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editingMember) return;
    setLoading(true);
    try {
      const trainer = trainers.find((t) => String(t.id) === editFormData.assignedTrainer);
      const payload: Partial<AdminUser> = {
        name: editFormData.name,
        email: editFormData.email,
        phone: editFormData.phone,
        plan: editFormData.plan,
        // send explicit status string (backend will sync is_active)
        status: editFormData.status === "active" ? "Active" : editFormData.status === "suspended" ? "Suspended" : "Expired",
        assigned_trainer_id: trainer && trainer.id !== 0 ? trainer.id : null,
      };
      await put(`/admin/users/${editingMember.id}`, payload);
      toast({ title: "Member updated successfully" });
      setIsEditDialogOpen(false);
      // Re-fetch fresh data from database (reload trainers then members to ensure mapping)
      const t = await loadTrainers();
      await loadMembers(t);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast({ 
        title: "Update failed", 
        description: msg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

 const toggleStatus = async (memberId: string) => {
    // Optimistically update UI so user sees immediate feedback, then call backend
    setLoading(true);
    // Do not optimistic-update UI. Call backend and then refresh on success.
    try {
      // backend expects PATCH for status toggle; lib/api will prefix /api
      console.debug("PATCH ->", `/admin/users/${memberId}/status`);

      // Map current status to next status string expected by backend
      const current = members.find((m) => m.id === memberId)?.status || "suspended";
      const next =
        current === "active"
          ? "Suspended"
          : current === "suspended"
          ? "Active"
          : "Suspended";

      const res = await patch(`/admin/users/${memberId}/status`, { status: next });
      console.debug("PATCH response:", res);

      // On success, re-fetch canonical state (reload trainers then members)
      const t = await loadTrainers();
      await loadMembers(t);
      toast({ title: "Status updated successfully" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Status toggle failed", msg);
      toast({ 
        title: "Status update failed", 
        description: msg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "suspended":
        return "destructive";
      case "expired":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Members</h1>
          <p className="text-muted-foreground mt-1">
            Add, edit, and manage member accounts and subscriptions
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>All Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member Name</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Trainer</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{member.plan}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(member.status)}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.assignedTrainer}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(member)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(member.id)}
                    >
                      {member.status === "active"
                        ? "Deactivate"
                        : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">Full Name</Label>
              <Input
                id="add-name"
                value={addFormData.name}
                onChange={(e) =>
                  setAddFormData({ ...addFormData, name: e.target.value })
                }
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-email">Email</Label>
              <Input
                id="add-email"
                type="email"
                value={addFormData.email}
                onChange={(e) =>
                  setAddFormData({ ...addFormData, email: e.target.value })
                }
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-phone">Phone</Label>
              <Input
                id="add-phone"
                value={addFormData.phone}
                onChange={(e) =>
                  setAddFormData({ ...addFormData, phone: e.target.value })
                }
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label>Plan</Label>
              <Select
                value={addFormData.plan}
                onValueChange={(value) =>
                  setAddFormData({ ...addFormData, plan: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan} value={plan}>
                      {plan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={addFormData.status}
                onValueChange={(value: "active" | "suspended" | "expired") =>
                  setAddFormData({ ...addFormData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Assigned Trainer</Label>
              <Select
                value={addFormData.assignedTrainer}
                onValueChange={(value) =>
                  setAddFormData({ ...addFormData, assignedTrainer: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {trainers.map((trainer) => (
                    <SelectItem key={trainer.id} value={String(trainer.id)}>
                      {trainer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Member Subscription Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Member Subscription</DialogTitle>
          </DialogHeader>
          {editingMember && (
            <div className="space-y-4 py-4">
              {/* صندوق الاسم والإيميل مثل الصورة */}
              <div className="rounded-lg bg-emerald-50 px-4 py-3">
                <p className="font-medium">{editingMember.name}</p>
                <p className="text-sm text-muted-foreground">
                  {editingMember.email}
                </p>
              </div>

              {/* ما نعرض حقول الاسم والإيميل والجوال هنا */}

              <div className="flex flex-col gap-2">
                <Label>Plan</Label>
                <Select
                  value={editFormData.plan}
                  onValueChange={(value) =>
                    setEditFormData({ ...editFormData, plan: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan} value={plan}>
                        {plan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select
                  value={editFormData.status}
                  onValueChange={(value: "active" | "suspended" | "expired") =>
                    setEditFormData({ ...editFormData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Assigned Trainer</Label>
                <Select
                  value={editFormData.assignedTrainer}
                  onValueChange={(value) =>
                    setEditFormData({ ...editFormData, assignedTrainer: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {trainers.map((trainer) => (
                      <SelectItem key={trainer.id} value={String(trainer.id)}>
                        {trainer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                  <Button onClick={handleEdit}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMembers;
