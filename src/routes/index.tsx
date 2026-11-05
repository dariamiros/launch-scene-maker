import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { initPrimaHero } from "@/lib/prima-hero";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261005_115704_e1b28e05-aef1-477c-924b-0c1d4612f86f.mp4";

const TITLE = "Prima dell’Alba — Una Notte. Tutto il Mondo.";
const DESCRIPTION =
  "Una notte. Tutto il mondo. Vivi la magia della notte più attesa dell'anno, immerse nella quiete del villaggio innevato.";

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
          aria-label="Cinematic slow forward camera movement over a snowy magical village under high mountain peaks at dawn, glowing cozy wooden cabins with smoke coming from chimneys"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>
      <div id="topscrim" />
      <div id="scrim" />

      <header id="masthead">
        <a className="logo" href="#">
          PRIMA DELL’ALBA
        </a>
        <div className="cluster" id="nav-panel">
          <nav className="links" id="links" aria-label="Main">
            <a className="is-active" href="#" aria-current="page">
              Home
            </a>
            <a href="#">Storia</a>
            <a href="#">Esperienza</a>
            <a href="#">Collezione</a>
          </nav>
          <a className="signup" href="#">
            Prenota Ora
          </a>
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
        <p>{DESCRIPTION}</p>
        <a className="explore" href="#">
          Scopri la Magia
        </a>
      </section>
    </div>
  );
}
