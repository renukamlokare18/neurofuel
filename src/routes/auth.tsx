import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import logo from "@/assets/neurofuel-logo.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — NeuroFuel" },
      { name: "description", content: "Sign in or create your NeuroFuel account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [diet, setDiet] = useState("non-veg");
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
      } else {
        const meta = {
          name: String(fd.get("name") ?? ""),
          age: String(fd.get("age") ?? ""),
          weight: String(fd.get("weight") ?? ""),
          height: String(fd.get("height") ?? ""),
          diet,
          gaming_hrs: String(fd.get("hours") ?? ""),
        };
        const { error } = await signUp(email, password, meta);
        if (error) throw error;
        toast.success("Account created. Check your email if confirmation is required.");
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-hero">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <Link to="/" className="mb-8 flex items-center gap-2 self-center">
          <img src={logo} alt="NeuroFuel logo" className="h-10 w-10 rounded-lg object-cover mix-blend-screen" />
          <span className="font-display text-xl font-bold">NeuroFuel</span>
        </Link>

        <Card className="border-border/60 bg-card-gradient p-8 shadow-card-soft">
          <div className="mb-6 grid grid-cols-2 rounded-lg bg-secondary/60 p-1">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`rounded-md py-2 text-sm font-medium transition-all ${
                mode === "signin" ? "bg-neon text-neon-foreground shadow-neon" : "text-muted-foreground"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-md py-2 text-sm font-medium transition-all ${
                mode === "signup" ? "bg-neon text-neon-foreground shadow-neon" : "text-muted-foreground"
              }`}
            >
              Sign up
            </button>
          </div>

          <h1 className="font-display text-2xl font-bold">
            {mode === "signin" ? "Welcome back, gamer." : "Create your loadout."}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Log in to view your meal plan and stats."
              : "Tell us about you so we can fuel your wins."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Alex Rivera" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="you@neurofuel.gg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required minLength={6} placeholder="••••••••" />
            </div>

            {mode === "signup" && (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name="age" type="number" min={13} placeholder="22" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" name="weight" type="number" placeholder="72" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" name="height" type="number" placeholder="178" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Diet</Label>
                    <Select value={diet} onValueChange={setDiet}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                        <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Gaming hrs/day</Label>
                    <Input id="hours" name="hours" type="number" min={0} max={24} placeholder="6" />
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-neon text-neon-foreground hover:bg-neon/90 shadow-neon"
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to our Terms & Privacy.
          </p>
        </Card>
      </div>
    </div>
  );
}
