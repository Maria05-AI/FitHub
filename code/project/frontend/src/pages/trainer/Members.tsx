 // src/pages/trainer/Members.tsx
import { useEffect, useMemo, useState } from "react";
import TrainerLayout from "@/components/TrainerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, User, Mail, Phone, Calendar, TrendingUp, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { get, post } from "@/lib/api";

type Member = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  joined: string;        // مثال: "Jan 2025"
  attendance: number;    // 0-100
  lastActive: string;    // مثال: "Today"
  status: "Active" | "Inactive";
};

export default function TrainerMembers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // add-dialog state
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [saving, setSaving] = useState(false);

  // جلب الأعضاء من الباك
  async function fetchMembers() {
    try {
      setLoading(true);
      setErrorMsg(null);
      const data = await get<Member[]>("/trainers/members"); // GET /api/trainers/members
      setMembers(data);
    } catch (err: any) {
      setErrorMsg(typeof err?.message === "string" ? err.message : "Failed to load members");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q)
    );
  }, [members, searchQuery]);

  // إضافة عضو جديد
  async function handleAdd() {
    setSaving(true);
    try {
      const created = await post<Member>("/trainers/members", {
        name: newName,
        email: newEmail,
        phone: newPhone,
      }); // POST /api/trainers/members
      setMembers((prev) => [created, ...prev]);
      setOpen(false);
      setNewName(""); setNewEmail(""); setNewPhone("");
    } catch (err: any) {
      alert(typeof err?.message === "string" ? err.message : "Failed to add member");
    } finally {
      setSaving(false);
    }
  }

  const totalActive = members.filter((m) => m.status === "Active").length;
  const avgAttendance =
    members.length > 0
      ? Math.round(members.reduce((s, m) => s + (m.attendance ?? 0), 0) / members.length)
      : 0;

  return (
    <TrainerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Member Management</h1>
            <p className="text-muted-foreground">Manage and monitor your gym members</p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Full Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <Input type="email" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                <Input type="tel" placeholder="Phone" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
                <Button className="w-full" onClick={handleAdd} disabled={saving || !newName || !newEmail}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Add Member"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Errors */}
        {errorMsg && (
          <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
            {errorMsg}
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{members.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Members</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{totalActive}</p>
                <p className="text-sm text-muted-foreground mt-1">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{avgAttendance}%</p>
                <p className="text-sm text-muted-foreground mt-1">Avg Attendance</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">
                  {members.filter((m) => m.joined?.toLowerCase().includes("jan 2025")).length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">New This Month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Members List */}
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading members...
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((member) => (
              <Card key={member.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <User className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {member.joined}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="font-medium">Attendance: {member.attendance}%</span>
                      </div>
                      <span className="text-muted-foreground">Last: {member.lastActive}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </TrainerLayout>
  );
}
