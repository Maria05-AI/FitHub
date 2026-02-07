export default function Stats() {
  const items = [
    { value: "500+", label: "Active Members" },
    { value: "50+",  label: "Expert Trainers" },
    { value: "10K+", label: "Workouts Logged" },
  ];
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6 grid gap-4 sm:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.label}
            className="rounded-2xl border border-border bg-card text-card-foreground p-6 text-center shadow-sm"
            style={{ backgroundImage: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
          >
            <div className="text-2xl font-semibold">{it.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
