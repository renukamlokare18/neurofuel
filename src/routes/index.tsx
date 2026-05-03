import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Flame, Gamepad2, LineChart, Salad, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { KITS } from "@/lib/mock-data";
import heroImg from "@/assets/hero-gamer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroFuel — Eat sharper. Play faster." },
      {
        name: "description",
        content:
          "Nutritionist-designed meal plans and kits engineered for gamers. Boost focus, reaction time, and endurance.",
      },
      { property: "og:title", content: "NeuroFuel — Eat sharper. Play faster." },
      {
        property: "og:description",
        content: "Meal plans and kits engineered for esports performance.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Kits />
      <Pricing />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-20 md:grid-cols-2 md:pt-28">
        <div className="flex flex-col justify-center">
          <Badge variant="outline" className="w-fit border-neon/40 bg-neon/10 text-neon">
            <Sparkles className="mr-1.5 h-3 w-3" /> Built with esports nutritionists
          </Badge>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            Eat sharper.
            <br />
            <span className="text-gradient-neon">Play faster.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            NeuroFuel turns your diet into a competitive edge. Personalized meal plans and ready-to-eat
            kits engineered for focus, reaction time, and endurance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-neon text-neon-foreground hover:bg-neon/90 shadow-neon">
              <Link to="/auth">
                Start Fueling <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/80">
              <a href="#how">See how it works</a>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-neon" /> Nutritionist-approved</div>
            <div className="flex items-center gap-2"><Gamepad2 className="h-4 w-4 text-neon" /> Loved by 12k gamers</div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-neon/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-glow">
            <img
              src={heroImg}
              alt="Focused esports gamer in neon-lit setup"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-background/70 p-4 backdrop-blur-md">
              <div>
                <p className="text-xs text-muted-foreground">Focus level today</p>
                <p className="font-display text-2xl font-bold text-neon">+38%</p>
              </div>
              <div className="h-10 w-10 animate-pulse-neon rounded-full bg-neon/20 grid place-items-center">
                <Brain className="h-5 w-5 text-neon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="border-y border-border/60 bg-card/30 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-neon">The problem</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Your diet is throttling your APM.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Skipped meals, energy crashes, and instant noodles aren't a strategy. NeuroFuel replaces them
          with food that's actually built for your brain — measured, planned, delivered.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { icon: Flame, title: "Energy crashes", text: "Sugar spikes that kill round 4." },
            { icon: Brain, title: "Foggy focus", text: "Slower reactions in the clutch." },
            { icon: Salad, title: "Zero structure", text: "No plan, no progress, no edge." },
          ].map((item) => (
            <Card key={item.title} className="border-border/60 bg-card-gradient p-6 text-left">
              <item.icon className="h-6 w-6 text-neon" />
              <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: Brain,
      title: "Personalized plans",
      text: "A 30-second quiz builds a meal plan tuned to your weight, diet and play hours.",
    },
    {
      icon: Salad,
      title: "Ready-to-eat kits",
      text: "Focus Boost, Late Night Grind, Tournament Mode — pick your mission.",
    },
    {
      icon: LineChart,
      title: "Performance tracking",
      text: "Log energy, focus and play time. Watch your stats climb week over week.",
    },
    {
      icon: Zap,
      title: "Smart reminders",
      text: "Get pinged before queue so you never play hangry again.",
    },
  ];
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neon">Features</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Everything you need to fuel the win.</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((f) => (
            <Card
              key={f.title}
              className="group relative overflow-hidden border-border/60 bg-card-gradient p-6 transition-all hover:border-neon/40 hover:shadow-neon"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-neon/15 text-neon">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Tell us your stats", text: "Weight, diet, gaming hours — a quick quiz." },
    { n: "02", title: "Get your plan", text: "A custom meal plan + kit recommendations." },
    { n: "03", title: "Track & climb", text: "Log focus and energy. Iterate. Win more." },
  ];
  return (
    <section id="how" className="border-y border-border/60 bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neon">How it works</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Three steps to peak performance.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border/60 bg-card-gradient p-8">
              <div className="font-display text-5xl font-bold text-gradient-neon">{s.n}</div>
              <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Kits() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-neon">Kits</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Pick your loadout.</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Curated by sports nutritionists. Built for the moments that matter.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {KITS.map((k) => (
            <Card
              key={k.id}
              className="group overflow-hidden border-border/60 bg-card-gradient p-0 transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={k.image}
                  alt={k.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  {k.tags.map((t) => (
                    <Badge key={t} variant="outline" className="border-neon/30 bg-neon/10 text-neon">
                      {t}
                    </Badge>
                  ))}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{k.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{k.tagline}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{k.calories} kcal</span>
                  <span className="font-medium text-neon">View →</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Casual",
      price: "Free",
      desc: "For gamers exploring better fuel.",
      features: ["Basic meal plan", "1 kit recommendation", "Energy & focus log"],
      cta: "Start free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19",
      desc: "For ranked grinders.",
      features: ["Personalized plan", "All meal kits", "Weekly insights", "Smart reminders"],
      cta: "Go Pro",
      highlight: true,
    },
    {
      name: "Tournament",
      price: "$49",
      desc: "For serious teams.",
      features: ["1:1 nutritionist", "Team dashboard", "Match-day plans", "Priority kits"],
      cta: "Talk to us",
      highlight: false,
    },
  ];
  return (
    <section id="pricing" className="border-t border-border/60 bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neon">Pricing</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Choose your tier.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <Card
              key={t.name}
              className={`relative overflow-hidden border bg-card-gradient p-8 ${
                t.highlight ? "border-neon/50 shadow-neon" : "border-border/60"
              }`}
            >
              {t.highlight && (
                <Badge className="absolute right-6 top-6 bg-neon text-neon-foreground">Most popular</Badge>
              )}
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">{t.price}</span>
                {t.price !== "Free" && <span className="text-muted-foreground">/mo</span>}
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-neon/15 text-neon">
                      <Zap className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 w-full ${
                  t.highlight
                    ? "bg-neon text-neon-foreground hover:bg-neon/90"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                <Link to="/auth">{t.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-neon/30 bg-card-gradient p-10 text-center shadow-glow md:p-16">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Ready to <span className="text-gradient-neon">level up</span> your fuel?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join thousands of players using NeuroFuel to win more matches.
            </p>
            <Button asChild size="lg" className="mt-8 bg-neon text-neon-foreground hover:bg-neon/90 shadow-neon">
              <Link to="/auth">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
