import logo from "@/assets/neurofuel-logo.jpg";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="NeuroFuel logo"
            className="h-7 w-7 rounded-md object-cover mix-blend-screen"
          />
          <span className="font-display font-semibold">NeuroFuel</span>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} NeuroFuel. Eat sharper. Play faster.</p>
      </div>
    </footer>
  );
}
