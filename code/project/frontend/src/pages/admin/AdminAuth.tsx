import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import logo from "@/assets/fithub-logo.png";
import { post } from "@/lib/api";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin() {
    setError(null);
    setLoading(true);
    try {
      const res = await post<{ token: string; role: string }>("/auth/login", { email, password });
      // Ensure backend returned admin role
      if (res.role !== "admin") {
        setError("Credentials are valid but not an admin account.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
      console.error("Admin login error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[hsl(174,45%,98%)]">
      <div className="container mx-auto flex min-h-[100dvh] max-w-4xl flex-col items-center justify-center px-4">
        <div className="mb-6 flex flex-col items-center">
          <img src={logo} alt="FitHub" className="mb-3 h-12 w-auto" />
          <h1 className="text-2xl font-semibold">Welcome to FitHub</h1>
          <p className="text-sm text-muted-foreground">Admin Portal — sign in to manage the system</p>
        </div>

        <Card className="w-[420px] max-w-full border-0 bg-white/90 shadow-xl ring-1 ring-black/5 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Admin Sign In</CardTitle>
            <CardDescription className="text-[13px]">Enter your administrator credentials</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">{error}</div>
            )}

            <div className="space-y-1">
              <label className="text-sm">Email</label>
              <Input placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>

            <div className="space-y-1">
              <label className="text-sm">Password</label>
              <Input placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>

            <Button type="button" className="w-full" onClick={handleLogin} disabled={loading}>
              {loading ? "Please wait..." : "Sign In"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;
