import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell, SectionLabel } from "@/components/site-chrome";
import board from "@/assets/game/tabellone_percorso.jpg.asset.json";

const TITLE = "Il Gioco — Prima dell’Alba";
const DESCRIPTION =
  "Come si gioca a Prima dell’Alba: tira i dadi, supera le missioni e consegna i regali prima che sorga il sole. 6+ anni, 2–6 giocatori, 25–35 minuti.";

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
  "Tira il dado e muovi la tua pedina lungo il percorso di 50 caselle.",
  "Fai l’azione della casella: consegna o ruba un regalo, supera una Missione, pesca una carta Magia o Tempesta.",
  "Sfida a palle di neve chi incontri sulla tua casella e usa il potere del tuo personaggio.",
  "Quando sorge il sole si contano i regali: sui tetti per i Buoni, nella Tana per i Furfanti.",
];

const STATS = [
  { value: "6+", label: "Anni" },
  { value: "2–6", label: "Giocatori" },
  { value: "25–35’", label: "Minuti" },
];

const CONTENTS = [
  "1 tabellone",
  "6 pedine personaggio",
  "12 gettoni regalo",
  "8 gettoni carbone",
  "40 carte Missione",
  "12 carte Magia",
  "12 carte Tempesta",
  "2 dadi",
  "1 segnalino Alba",
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
            in squadra, da 1 contro 1 fino a 3 contro 3.
          </p>
          <img
            src={board.url}
            alt="Il tabellone: un percorso di caselle colorate con le stelle nella neve, tra abeti, lampioni e una baita illuminata, fino al traguardo"
            width={1376}
            height={768}
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
                <span className={`font-display font-bold ${s.value.length > 3 ? "text-xl" : "text-3xl"}`}>
                  {s.value}
                </span>
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
          to="/regolamento"
          className="inline-flex h-12 items-center bg-primary px-7 text-sm font-semibold uppercase tracking-[0.06em] text-primary-foreground transition-colors hover:bg-primary-glow"
        >
          Leggi il regolamento completo
        </Link>
        <Link
          to="/personaggi"
          className="inline-flex h-12 items-center border-[1.5px] border-primary px-7 text-sm font-semibold uppercase tracking-[0.06em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
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
