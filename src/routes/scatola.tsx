import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { SiteHeader } from "@/components/site-chrome";
import type { BoxView, GiftBoxController } from "@/lib/gift-box-3d";
import front from "@/assets/box/gift_box_front.jpg.asset.json";
import back from "@/assets/box/gift_box_back.jpg.asset.json";
import spine from "@/assets/box/gift_box_spine.jpg.asset.json";
import strip from "@/assets/box/gift_box_strip.jpg.asset.json";

const TITLE = "La Scatola in 3D — Prima dell’Alba";
const DESCRIPTION =
  "Ruota e ingrandisci la scatola di Prima dell’Alba in 3D: fronte, retro, lato e vista dall’alto.";

export const Route = createFileRoute("/scatola")({
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
  component: Scatola,
});

const VIEWS: { v: BoxView; label: string }[] = [
  { v: "front", label: "Fronte" },
  { v: "back", label: "Retro" },
  { v: "side", label: "Lato" },
  { v: "top", label: "Dall’alto" },
];

const btn =
  "h-10 border-[1.5px] border-primary bg-background/70 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-primary backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground data-[on=true]:bg-primary data-[on=true]:text-primary-foreground";

function Scatola() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ctrl = useRef<GiftBoxController | null>(null);
  const [view, setView] = useState<BoxView | null>("front");
  const [auto, setAuto] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const stage = stageRef.current;
    if (!stage) return;
    import("@/lib/gift-box-3d")
      .then(({ mountGiftBox }) => {
        if (cancelled) return;
        ctrl.current = mountGiftBox(
          stage,
          { front: front.url, back: back.url, spine: spine.url, strip: strip.url },
          () => setReady(true),
        );
      })
      .catch((e) => {
        console.error(e);
        setFailed(true);
      });
    return () => {
      cancelled = true;
      ctrl.current?.destroy();
      ctrl.current = null;
    };
  }, []);

  const pick = (v: BoxView) => {
    ctrl.current?.setView(v);
    setView(v);
    setAuto(false);
  };
  const toggleAuto = () => {
    const next = !auto;
    ctrl.current?.setAuto(next);
    setAuto(next);
    setView(null);
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[image:var(--gradient-stage)] text-foreground">
      <SiteHeader />
      <main className="relative flex-1">
        <div className="pointer-events-none absolute left-5 top-6 z-10 md:left-8">
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide md:text-4xl">
            La Scatola
          </h1>
          <p className="mt-1 text-sm italic text-foreground/80 md:text-base">
            Prima dell’Alba in 3D
          </p>
        </div>
        <p className="pointer-events-none absolute right-8 top-7 z-10 hidden text-right text-xs uppercase tracking-[0.15em] text-foreground/65 md:block">
          Trascina per ruotare
          <br />
          Scorri per lo zoom
        </p>

        <div
          ref={stageRef}
          data-scene-ready={ready ? "true" : undefined}
          className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
          aria-label="Modello 3D della scatola del gioco Prima dell’Alba"
          role="img"
        />

        {!ready && !failed && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.3em] text-primary">
            Caricamento…
          </p>
        )}
        {failed && (
          <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-foreground/80">
            Il modello 3D non si è caricato. Ricarica la pagina per riprovare.
          </p>
        )}

        <nav
          aria-label="Viste della scatola"
          className="absolute inset-x-0 bottom-6 z-10 flex flex-wrap justify-center gap-2.5 px-4"
        >
          {VIEWS.map(({ v, label }) => (
            <button key={v} type="button" className={btn} data-on={view === v} onClick={() => pick(v)}>
              {label}
            </button>
          ))}
          <button type="button" className={btn} data-on={auto} onClick={toggleAuto}>
            Giro automatico
          </button>
        </nav>
      </main>
    </div>
  );
}
