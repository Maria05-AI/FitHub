import { useEffect, useState } from "react";
import { get, put, post, API_BASE } from "@/lib/api";

type UserItem = {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
};

const ManageUsers = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await get<UserItem[]>("/admin/users");
      setUsers(res);
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function changeRole(id: number, role: string) {
    try {
      await put(`/admin/users/${id}/role`, { role });
      await load();
    } catch (e: any) {
      setError(e?.message || String(e));
    }
  }

  async function remove(id: number) {
    try {
      await fetch(`${API_BASE}/admin/users/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } });
      await load();
    } catch (e: any) {
      setError(e?.message || String(e));
    }
  }

  if (loading) return <div>Loading users…</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Users</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Role</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="space-x-2">
                {u.role !== "trainer" && (
                  <button onClick={() => changeRole(u.id, "trainer")} className="text-sm text-blue-600">Promote to Trainer</button>
                )}
                {u.role !== "member" && (
                  <button onClick={() => changeRole(u.id, "member")} className="text-sm text-blue-600">Demote to Member</button>
                )}
                {u.role !== "admin" && (
                  <button onClick={() => changeRole(u.id, "admin")} className="text-sm text-blue-600">Make Admin</button>
                )}
                <button onClick={() => remove(u.id)} className="text-sm text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
