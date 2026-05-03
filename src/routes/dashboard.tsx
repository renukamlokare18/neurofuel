import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Brain, Flame, Gamepad2, LineChart, LogOut, Plus, Sparkles, Trash2 } from "lucide-react";
import logo from "@/assets/neurofuel-logo.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { db, type Row } from "@/services/db";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — NeuroFuel" },
      { name: "description", content: "Your personalized meal plan and performance tracking." },
    ],
  }),
  component: Dashboard,
});

type Meal = Row<"meal_plans">;
type Kit = Row<"kits">;
type Order = Row<"orders">;
type Profile = Row<"profiles">;

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [kits, setKits] = useState<Kit[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // meal form
  const [mealTime, setMealTime] = useState("09:00");
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState(400);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth" });
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const [p, m, k, o] = await Promise.all([
          db.getById("profiles", user.id),
          db.list("meal_plans", { filters: { user_id: user.id }, orderBy: { column: "meal_time" } }),
          db.list("kits", { orderBy: { column: "name" } }),
          db.list("orders", { filters: { user_id: user.id }, orderBy: { column: "created_at", ascending: false } }),
        ]);
        setProfile(p);
        setMeals(m);
        setKits(k);
        setOrders(o);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const addMeal = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !mealName) return;
    try {
      const created = await db.create("meal_plans", {
        user_id: user.id,
        meal_time: mealTime,
        meal: mealName,
        calories,
      });
      setMeals((prev) => [...prev, created].sort((a, b) => a.meal_time.localeCompare(b.meal_time)));
      setMealName("");
      toast.success("Meal added");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  const removeMeal = async (id: string) => {
    try {
      await db.remove("meal_plans", id);
      setMeals((p) => p.filter((m) => m.id !== id));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  const orderKit = async (kitId: string) => {
    if (!user) return;
    try {
      const o = await db.create("orders", { user_id: user.id, kit_id: kitId, quantity: 1 });
      setOrders((p) => [o, ...p]);
      toast.success("Order placed");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const totalCalories = meals.reduce((s, m) => s + (m.calories ?? 0), 0);

  if (authLoading || loading) {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="NeuroFuel logo" className="h-9 w-9 rounded-lg object-cover mix-blend-screen" />
            <span className="font-display text-lg font-bold">NeuroFuel</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-neon/40 bg-neon/10 text-neon">
              <Sparkles className="mr-1 h-3 w-3" /> Pro
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-1.5 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            GG, <span className="text-gradient-neon">{profile?.name ?? user?.email}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">Here's your fuel plan for today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <StatCard icon={Brain} label="Meals planned" value={String(meals.length)} accent />
          <StatCard icon={Flame} label="Total calories" value={`${totalCalories}`} />
          <StatCard icon={Gamepad2} label="Gaming hrs/day" value={`${profile?.gaming_hrs ?? 0}h`} />
          <StatCard icon={LineChart} label="Orders" value={String(orders.length)} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-border/60 bg-card-gradient p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Today's meal plan</h2>
              <Badge variant="outline" className="border-neon/30 bg-neon/10 text-neon">{totalCalories} kcal</Badge>
            </div>
            <div className="mt-5 divide-y divide-border/60">
              {meals.length === 0 && <p className="py-6 text-sm text-muted-foreground">No meals yet — add one →</p>}
              {meals.map((m) => (
                <div key={m.id} className="flex items-center gap-4 py-4">
                  <div className="grid h-10 w-14 place-items-center rounded-lg bg-secondary/60 font-mono text-sm text-neon">
                    {m.meal_time}
                  </div>
                  <p className="flex-1 text-sm">{m.meal}</p>
                  <span className="text-xs text-muted-foreground">{m.calories} kcal</span>
                  <Button variant="ghost" size="icon" onClick={() => removeMeal(m.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-border/60 bg-card-gradient p-6">
            <h2 className="font-display text-xl font-semibold">Add a meal</h2>
            <form onSubmit={addMeal} className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" value={mealTime} onChange={(e) => setMealTime(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meal">Meal</Label>
                <Input id="meal" value={mealName} onChange={(e) => setMealName(e.target.value)} placeholder="Grilled chicken bowl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cal">Calories</Label>
                <Input id="cal" type="number" min={0} value={calories} onChange={(e) => setCalories(Number(e.target.value))} />
              </div>
              <Button type="submit" className="w-full bg-neon text-neon-foreground hover:bg-neon/90 shadow-neon">
                <Plus className="mr-1.5 h-4 w-4" /> Add meal
              </Button>
            </form>
          </Card>
        </div>

        <section>
          <h2 className="font-display text-xl font-semibold">Recommended kits</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {kits.map((k) => (
              <Card key={k.id} className="overflow-hidden border-border/60 bg-card-gradient p-5">
                <div className="flex items-center gap-2">
                  {(k.tags ?? []).map((t) => (
                    <Badge key={t} variant="outline" className="border-neon/30 bg-neon/10 text-neon">{t}</Badge>
                  ))}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{k.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{k.tagline}</p>
                <p className="mt-2 font-mono text-sm text-neon">${Number(k.price).toFixed(2)}</p>
                <Button variant="secondary" className="mt-4 w-full" onClick={() => orderKit(k.id)}>Order kit</Button>
              </Card>
            ))}
          </div>
        </section>

        <Card className="border-border/60 bg-card-gradient p-6">
          <h2 className="font-display text-xl font-semibold">Your orders</h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            <div className="mt-5 space-y-2">
              {orders.map((o) => {
                const k = kits.find((x) => x.id === o.kit_id);
                return (
                  <div key={o.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/40 p-3 text-sm">
                    <span>{k?.name ?? "Kit"} × {o.quantity}</span>
                    <Badge variant="outline">{o.status}</Badge>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <Card className={`border-border/60 bg-card-gradient p-5 ${accent ? "ring-neon" : ""}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-neon" />
      </div>
      <p className="mt-3 font-display text-3xl font-bold">{value}</p>
    </Card>
  );
}
