import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import emblem from "@/assets/deer_emblem_gold.png.asset.json";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/il-gioco", label: "Il Gioco" },
  { to: "/personaggi", label: "Personaggi" },
  { to: "/scatola", label: "La Scatola" },
] as const;

export function Emblem({ className }: { className?: string }) {
  return <img src={emblem.url} alt="" width={256} height={256} className={className} />;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Emblem className="h-12 w-12" />
          <span className="font-display text-lg font-bold tracking-[0.15em] text-foreground md:text-xl">
            PRIMA DELL’ALBA
          </span>
        </Link>

        <nav aria-label="Principale" className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="relative text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground/80 transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:after:absolute data-[status=active]:after:-bottom-2 data-[status=active]:after:left-1/2 data-[status=active]:after:h-0.5 data-[status=active]:after:w-9 data-[status=active]:after:-translate-x-1/2 data-[status=active]:after:bg-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-end justify-center gap-1.5 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block h-[1.6px] w-7 bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[1.6px] bg-foreground transition-all ${open ? "w-7 -translate-y-[3.5px] -rotate-45" : "w-5"}`}
          />
        </button>
      </div>

      {open && (
        <nav
          aria-label="Principale mobile"
          className="flex flex-col gap-5 border-t border-border bg-background px-6 py-6 md:hidden"
        >
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              onClick={() => setOpen(false)}
              className="text-lg font-semibold uppercase tracking-[0.08em] text-foreground/80 data-[status=active]:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <Emblem className="h-9 w-9" />
          <span className="font-display text-sm font-bold tracking-[0.15em]">PRIMA DELL’ALBA</span>
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary">
          Una notte · Tutto il mondo
        </p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[image:var(--gradient-night)] text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 border-b border-primary/60 pb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
      {children}
    </div>
  );
}
