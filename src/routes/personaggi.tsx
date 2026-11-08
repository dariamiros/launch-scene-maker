import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell, SectionLabel } from "@/components/site-chrome";
import babbo from "@/assets/game/babbo.jpg.asset.json";
import jing from "@/assets/game/jing.jpg.asset.json";
import cometa from "@/assets/game/cometa.jpg.asset.json";
import cappellostorto from "@/assets/game/cappellostorto.jpg.asset.json";
import gelone from "@/assets/game/gelone.jpg.asset.json";
import codarossa from "@/assets/game/codarossa.jpg.asset.json";

const TITLE = "Personaggi — Prima dell’Alba";
const DESCRIPTION =
  "I Buoni e i Furfanti di Prima dell’Alba: Babbo Natale, Jing l’elfo e la renna Cometa contro Cappellostorto, Gelone e Codarossa.";

export const Route = createFileRoute("/personaggi")({
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
  component: Personaggi,
});

type Hero = { name: string; role: string; img: string };

const BUONI: Hero[] = [
  { name: "Babbo Natale", role: "Il capo della consegna", img: babbo.url },
  { name: "Jing l’elfo", role: "L’aiutante più svelto", img: jing.url },
  { name: "Cometa", role: "La renna che vola nella notte", img: cometa.url },
];

const FURFANTI: Hero[] = [
  { name: "Cappellostorto", role: "L’elfo ladro", img: cappellostorto.url },
  { name: "Gelone", role: "L’orso dei ghiacci", img: gelone.url },
  { name: "Codarossa", role: "La volpe furba", img: codarossa.url },
];

function Portrait({ h, rogue }: { h: Hero; rogue?: boolean }) {
  return (
    <figure className="flex flex-col items-center text-center">
      <div
        className={`w-full max-w-[220px] overflow-hidden rounded-[50%] border-[3px] ${rogue ? "border-rogue" : "border-primary"}`}
      >
        <img
          src={h.img}
          alt={h.name}
          width={206}
          height={282}
          loading="lazy"
          className="aspect-[206/282] w-full scale-[1.06] object-cover"
        />
      </div>
      <figcaption className="mt-5">
        <span className="block font-display text-xl font-bold tracking-wide">{h.name}</span>
        <span
          className={`mt-1 block text-xs font-semibold uppercase tracking-[0.2em] ${rogue ? "text-rogue" : "text-primary"}`}
        >
          {h.role}
        </span>
      </figcaption>
    </figure>
  );
}

function Personaggi() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 pt-16 md:px-8 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Personaggi</p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight tracking-wide md:text-6xl">
          Buoni contro Furfanti
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90">
          Scegli da che parte stare: aiuta Babbo Natale a consegnare i regali, oppure unisciti ai
          Furfanti e prova a rubarli prima che sorga il sole.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-16 md:px-8">
        <SectionLabel>I Buoni</SectionLabel>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
          {BUONI.map((h) => (
            <Portrait key={h.name} h={h} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 pt-20 md:px-8">
        <div className="mb-6 border-b border-rogue/60 pb-3 text-xs font-semibold uppercase tracking-[0.3em] text-rogue">
          I Furfanti
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
          {FURFANTI.map((h) => (
            <Portrait key={h.name} h={h} rogue />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <Link
          to="/scatola"
          className="inline-flex h-12 items-center bg-primary px-7 text-sm font-semibold uppercase tracking-[0.06em] text-primary-foreground transition-colors hover:bg-primary-glow"
        >
          Guarda la scatola in 3D
        </Link>
      </section>
    </PageShell>
  );
}
