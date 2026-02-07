 // src/pages/Auth.tsx
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import logo from "@/assets/fithub-logo.png";
import { post } from "@/lib/api";

/**
 * Query params we use:
 *   ?mode=login|register
 *   &role=member|trainer
 *
 * Defaults: mode=login, role=member
 */
export default function Auth() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const mode = (params.get("mode") as "login" | "register") ?? "login";
  const role = (params.get("role") as "member" | "trainer") ?? "member";

  const isLogin = mode === "login";
  const isMember = role === "member";

  const title = useMemo(() => {
    if (isLogin) return isMember ? "Member Login" : "Trainer Login";
    return isMember ? "Member Registration" : "Trainer Registration";
  }, [isLogin, isMember]);

  // form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // helper to update query params (mode / role)
  const go = (next: Partial<{ mode: "login" | "register"; role: "member" | "trainer" }>) => {
    const url = new URL(window.location.href);
    if (next.mode) url.searchParams.set("mode", next.mode);
    if (next.role) url.searchParams.set("role", next.role);
    navigate(url.pathname + url.search, { replace: true });
    // clear previous errors when switching
    setErrorMsg(null);
  };

  async function handleSubmit() {
    console.log("[Auth] handleSubmit clicked");
    setErrorMsg(null);
    setLoading(true);
    try {
      if (isLogin) {
        // ---- LOGIN ----
        const res = await post<{ token: string; role: "member" | "trainer"; user: any }>(
          "/auth/login",
          { email, password }
        );

        console.log("[Auth] Login response:", res);

        // Save token and role from backend response
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);

        console.log("[Auth] Stored role:", res.role);

        // Navigate based on the role from backend
        if (res.role === "trainer") {
          navigate("/trainer/dashboard");
        } else {
          navigate("/member/dashboard");
        }

      } else {
        // ---- REGISTER ----
        const res = await post<{ token: string; role: "member" | "trainer"; user: any }>(
          "/auth/register",
          { fullName, email, password, role }
        );

        console.log("[Auth] Register response:", res);

        // Save token and role from backend response
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);

        console.log("[Auth] Stored role:", res.role);

        // Navigate based on the role from backend
        if (res.role === "trainer") {
          navigate("/trainer/dashboard");
        } else {
          navigate("/member/dashboard");
        }
      }
    } catch (err: any) {
      const text = typeof err?.message === "string" ? err.message : "Request failed";
      setErrorMsg(text);
      console.error("[Auth] submit error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[hsl(174,45%,98%)]">
      {/* soft blobs background */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,hsla(174,45%,60%,.25),transparent)]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,hsla(174,45%,60%,.22),transparent)]" />

      <div className="container mx-auto flex min-h-[100dvh] max-w-4xl flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <img src={logo} alt="FitHub" className="mb-3 h-12 w-auto" />
          <p className="text-sm text-muted-foreground">Smart Gym & Wellness Management</p>
        </div>

        {/* Role switch */}
        <div className="mb-3 flex w-[360px] max-w-full items-center justify-center gap-2 rounded-full bg-white/70 p-1 shadow-sm ring-1 ring-black/5 backdrop-blur">
          <button
            onClick={() => go({ role: "member" })}
            className={cn(
              "h-8 w-full rounded-full text-sm transition",
              isMember ? "bg-[hsl(0,0%,96%)] font-medium shadow-inner" : "text-muted-foreground hover:bg-white"
            )}
          >
            Member
          </button>
          <button
            onClick={() => go({ role: "trainer" })}
            className={cn(
              "h-8 w-full rounded-full text-sm transition",
              !isMember ? "bg-[hsl(0,0%,96%)] font-medium shadow-inner" : "text-muted-foreground hover:bg-white"
            )}
          >
            Trainer
          </button>
        </div>

        {/* Card */}
        <Card className="w-[420px] max-w-full border-0 bg-white/90 shadow-xl ring-1 ring-black/5 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-[13px]">
              {isLogin
                ? isMember
                  ? "Access your fitness dashboard"
                  : "Manage your members and sessions"
                : isMember
                ? "Create your FitHub account"
                : "Join the FitHub trainer team"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* error message */}
            {errorMsg && (
              <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
                {errorMsg}
              </div>
            )}

            {/* Full name appears only in Register */}
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm">Full Name</label>
                <Input
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm">Email</label>
              <Input
                placeholder={isMember ? "member@example.com" : "trainer@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="button" // مهم: لتجنب submit افتراضي داخل أي form
              className="w-full rounded-md bg-[hsl(174,45%,47%)] text-white transition hover:bg-[hsl(174,45%,42%)]"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>

            {/* footer links */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <button
                className="hover:underline"
                onClick={() => go({ mode: isLogin ? "register" : "login" })}
              >
                {isLogin ? "Register here" : "Already have an account? Sign in"}
              </button>
              <Link to="#" className={cn("hover:underline", isLogin ? "" : "invisible")}>
                Forgot password?
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
