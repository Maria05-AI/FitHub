 // src/pages/trainer/TrainerProfile.tsx
import { useEffect, useState, useMemo } from "react";
import TrainerLayout from "@/components/TrainerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Award, Dumbbell, Calendar, Loader2 } from "lucide-react";
import { get } from "@/lib/api";

type TrainerMe = {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  certification: string;
  since: string; // مثال: "Oct 2024"
  stats?: { activeMembers?: number; totalSessions?: number; rating?: number; years?: string };
};

export default function TrainerProfile() {
  const [profile, setProfile] = useState<TrainerMe | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setErr(null);
        setLoading(true);
        // GET /api/trainers/me
        const data = await get<TrainerMe>("/trainers/me");
        setProfile(data);
      } catch (e: any) {
        setErr(
          (e && typeof e.message === "string" && e.message) ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const initials = useMemo(() => {
    const name = profile?.fullName || "";
    const parts = name.split(" ").filter(Boolean);
    const a = (parts[0]?.[0] || "").toUpperCase();
    const b = (parts[1]?.[0] || "").toUpperCase();
    return `${a}${b}`;
  }, [profile]);

  return (
    <TrainerLayout>
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Trainer Profile</h1>
          <p className="text-muted-foreground">Manage your professional information</p>
        </div>

        {err && (
          <div className="mb-6 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
            {err}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading profile...
          </div>
        ) : (
          profile && (
            <div className="grid gap-6 md:grid-cols-[320px,1fr] items-start">
              {/* Summary card (يسار) */}
              <Card className="h-fit">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-3xl font-semibold">
                      {initials || "TR"}
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{profile.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {profile.specialization}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <Badge variant="secondary">Certified Trainer</Badge>
                      {profile.stats?.years && (
                        <Badge variant="outline">{profile.stats.years}</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* معلومات احترافية (يمين) + إحصائيات */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={profile.email} />
                    <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={profile.phone} />
                    <InfoRow icon={<Dumbbell className="h-4 w-4" />} label="Specialization" value={profile.specialization} />
                    <InfoRow icon={<Award className="h-4 w-4" />} label="Certification" value={profile.certification} />
                    <InfoRow icon={<Calendar className="h-4 w-4" />} label="Trainer Since" value={profile.since} />
                  </CardContent>
                </Card>

                {/* Stats Grid */}
                {(profile.stats?.activeMembers ||
                  profile.stats?.totalSessions ||
                  profile.stats?.rating ||
                  profile.stats?.years) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Stat
                          label="Active Members"
                          value={profile.stats?.activeMembers ?? 0}
                        />
                        <Stat
                          label="Total Sessions"
                          value={profile.stats?.totalSessions ?? 0}
                        />
                        <Stat
                          label="Rating"
                          value={
                            profile.stats?.rating
                              ? `${profile.stats.rating}/5`
                              : "—"
                          }
                        />
                        <Stat label="Experience" value={profile.stats?.years ?? "—"} />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </TrainerLayout>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="grid grid-cols-[24px,1fr] items-center gap-3">
      <div className="text-muted-foreground flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border p-4 text-center">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

