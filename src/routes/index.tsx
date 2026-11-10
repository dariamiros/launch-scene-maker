import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { initPrimaHero } from "@/lib/prima-hero";
import heroVideo from "@/assets/village_twilight_hero.mp4.asset.json";
import emblem from "@/assets/deer_emblem_gold.png.asset.json";

const TITLE = "Prima dell’Alba — Il gioco di squadra che corre contro il sole";
const DESCRIPTION =
  "È la notte di Natale e il sole sta per sorgere: consegna tutti i regali prima dell’alba, prima che i Furfanti li rubino.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!appRef.current) return;
    return initPrimaHero(appRef.current);
  }, []);

  return (
    <div
      id="app"
      ref={appRef}
      data-mode="exact"
      data-menu="closed"
      data-intro="pending"
      data-ready="false"
    >
      <div id="stage">
        <video
          id="bg"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
          width={1280}
          height={960}
          aria-label="Volo lento sopra un villaggio alpino innevato al crepuscolo, con baite illuminate e fumo dai camini"
        >
          <source src={heroVideo.url} type="video/mp4" />
        </video>
      </div>
      <div id="topscrim" />
      <div id="scrim" />

      <header id="masthead">
        <Link className="logo" to="/">
          <img src={emblem.url} alt="" width={256} height={256} />
          <span>PRIMA DELL’ALBA</span>
        </Link>
        <div className="cluster" id="nav-panel">
          <nav className="links" id="links" aria-label="Principale">
            <Link className="is-active" to="/" aria-current="page">
              Home
            </Link>
            <Link to="/il-gioco">Il Gioco</Link>
            <Link to="/personaggi">Personaggi</Link>
            <Link to="/regolamento">Regole</Link>
            <Link to="/scatola">La Scatola</Link>
          </nav>
          <Link className="signup" to="/scatola">
            Vedi in 3D
          </Link>
        </div>
      </header>
      <button
        id="menu-btn"
        type="button"
        aria-label="Menu"
        aria-expanded="false"
        aria-controls="nav-panel"
      >
        <span />
        <span />
      </button>

      <section id="hero">
        <h1>
          <span className="ln">
            <span>Prima</span>
          </span>
          <span className="ln">
            <span>Dell’Alba</span>
          </span>
        </h1>
        <p>
          Il gioco di squadra che corre contro il sole. Consegna tutti i regali prima che sorga
          l’alba!
        </p>
        <Link className="explore" to="/il-gioco">
          Scopri il Gioco
        </Link>
      </section>
    </div>
  );
}
