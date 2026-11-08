import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell, SectionLabel } from "@/components/site-chrome";
import board from "@/assets/game/tabellone.jpg.asset.json";

const TITLE = "Il Gioco — Prima dell’Alba";
const DESCRIPTION =
  "Come si gioca a Prima dell’Alba: tira i dadi, supera le missioni e consegna i regali prima che sorga il sole. 6+ anni, 2–6 giocatori, 30 minuti.";

export const Route = createFileRoute("/il-gioco")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IlGioco,
});

const STEPS = [
  "Tira il dado e muovi la tua pedina sul percorso.",
  "Pesca una carta missione: indovinelli, mimi e sfide di squadra.",
  "Consegna i regali o ruba quelli degli avversari: vince chi arriva prima dell’alba!",
];

const STATS = [
  { value: "6+", label: "Anni" },
  { value: "2–6", label: "Giocatori" },
  { value: "30’", label: "Minuti" },
];

const CONTENTS = [
  "1 tabellone",
  "6 pedine personaggio",
  "24 regali",
  "40 carte missione",
  "2 dadi",
  "1 segnalino alba",
];

function IlGioco() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Il Gioco</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-wide md:text-6xl">
          Il gioco di squadra che corre contro il sole
        </h1>
        <div className="mt-12 grid items-start gap-12 md:grid-cols-[1.05fr_1fr]">
          <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
            È la notte di Natale e il sole sta per sorgere! Babbo Natale, l’elfo e la renna devono
            consegnare tutti i regali prima dell’alba, ma i Furfanti sono in agguato: l’elfo ladro,
            l’orso e la volpe faranno di tutto per rubarli. Tira i dadi, supera le missioni e gioca
            in squadra: 1 contro 1, 2 contro 2 o 3 contro 3.
          </p>
          <img
            src={board.url}
            alt="Il percorso del tabellone: una strada di caselle colorate nella neve tra abeti e una baita illuminata"
            width={790}
            height={474}
            className="w-full border border-primary/70"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-5 pb-20 md:grid-cols-2 md:px-8">
        <div>
          <SectionLabel>Come si gioca</SectionLabel>
          <ol className="space-y-6">
            {STEPS.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-primary font-display text-lg font-bold text-primary">
                  {i + 1}
                </span>
                <span className="pt-1.5 text-base leading-relaxed text-foreground/90 md:text-lg">
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <SectionLabel>Contenuto</SectionLabel>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-base text-foreground/90 md:text-lg">
            {CONTENTS.map((c) => (
              <li key={c} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex gap-5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex h-28 w-24 flex-col items-center justify-center rounded-[50%] border-2 border-primary bg-background/60"
              >
                <span className="font-display text-3xl font-bold">{s.value}</span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-wrap gap-4 px-5 pb-24 md:px-8">
        <Link
          to="/personaggi"
          className="inline-flex h-12 items-center bg-primary px-7 text-sm font-semibold uppercase tracking-[0.06em] text-primary-foreground transition-colors hover:bg-primary-glow"
        >
          Conosci i personaggi
        </Link>
        <Link
          to="/scatola"
          className="inline-flex h-12 items-center border-[1.5px] border-primary px-7 text-sm font-semibold uppercase tracking-[0.06em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Guarda la scatola in 3D
        </Link>
      </section>
    </PageShell>
  );
}
