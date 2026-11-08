// Layout + menu + entrance logic for the Prima dell'Alba hero.
// Plain DOM so the same module powers the app route and the standalone HTML export.

export const DW = 1280;
export const DH = 960;
export const HERO_H = 411;
export const HEAD_H = 74;
export const UI_MIN_H = 560;
export const U_DESK = 0.874;
export const PHONE_W = 600;
export const TAB_REF = 840;
export const T_MIN = 0.873;
export const T_MAX = 1.08;

const EXPO = "cubic-bezier(.16,1,.3,1)";
const SOFT = "cubic-bezier(.22,.75,.2,1)";

export type HeroMode = "exact" | "tablet" | "compact";

export interface HeroLayout {
  mode: HeroMode;
  u: number;
  s: number;
  tx: number;
  ty: number;
  scrim: number;
  heroTop: number;
}

export function computeLayout(vw: number, vh: number): HeroLayout {
  const uw = vw / DW;
  const ut = Math.min(Math.min(Math.max(vw / TAB_REF, T_MIN), T_MAX), vh / UI_MIN_H);
  const mode: HeroMode =
    uw >= U_DESK ? "exact" : vw >= PHONE_W && ut >= T_MIN ? "tablet" : "compact";

  if (mode === "compact") {
    return { mode, u: 1, s: 1, tx: 0, ty: 0, scrim: 0, heroTop: 0 };
  }

  const s = Math.max(vw / DW, vh / DH);
  const visW = Math.min(DW, vw / s);
  const visH = Math.min(DH, vh / s);

  let u: number;
  let tx: number;
  if (mode === "exact") {
    const k = Math.min(1, visW / DW);
    u = Math.min(s * k, vh / UI_MIN_H);
    tx = vw / 2 - DW * 0.5 * s;
  } else {
    u = ut;
    const bias = 0.15 * (1 - visW / DW);
    tx = vw / 2 - DW * (0.5 + bias) * s;
  }
  tx = Math.min(0, Math.max(vw - DW * s, tx));
  const ty = (vh - DH * s) / 2;
  const scrim = Math.min(1, Math.max(0, (DH - visH) / 240)) * 0.45;

  let heroTop = Math.max(0, vh - HERO_H * u) * 0.495449;
  if (mode === "tablet") {
    const lo = HEAD_H * u + 28 * u;
    const hi = vh - HERO_H * u - 28 * u;
    heroTop = Math.max(lo, Math.min(hi, heroTop));
  }

  return { mode, u, s, tx, ty, scrim, heroTop };
}

export function initPrimaHero(app: HTMLElement): () => void {
  const $ = <T extends Element>(sel: string) => app.querySelector(sel) as T;
  const header = $<HTMLElement>("#masthead");
  const hero = $<HTMLElement>("#hero");
  const btn = $<HTMLButtonElement>("#menu-btn");
  const scrim = $<HTMLElement>("#scrim");
  const panel = $<HTMLElement>("#nav-panel");
  const video = $<HTMLVideoElement>("#bg");
  const logo = $<HTMLElement>(".logo");
  const signup = $<HTMLElement>(".signup");
  const para = $<HTMLElement>("#hero p");
  const explore = $<HTMLElement>(".explore");
  const links = Array.from(app.querySelectorAll<HTMLElement>("#links a"));
  const lines = Array.from(app.querySelectorAll<HTMLElement>("#hero .ln > span"));

  let raf = 0;
  let destroyed = false;

  const setMenu = (open: boolean) => {
    app.dataset["menu"] = open ? "open" : "closed";
    btn.setAttribute("aria-expanded", String(open));
  };

  const viewport = () => {
    const vv = window.visualViewport;
    return { vw: vv ? vv.width : window.innerWidth, vh: vv ? vv.height : window.innerHeight };
  };

  function layout() {
    raf = 0;
    const { vw, vh } = viewport();
    const L = computeLayout(vw, vh);
    if (app.dataset["mode"] !== L.mode) {
      app.dataset["mode"] = L.mode;
      if (L.mode === "exact") setMenu(false);
    }
    const st = app.style;
    st.setProperty("--u", String(L.u));
    hero.style.transform = "";

    if (L.mode === "compact") {
      ["--s", "--tx", "--ty", "--scrim", "--hero-top"].forEach((k) => st.removeProperty(k));
    } else {
      st.setProperty("--s", String(L.s));
      st.setProperty("--tx", `${L.tx}px`);
      st.setProperty("--ty", `${L.ty}px`);
      st.setProperty("--scrim", String(L.scrim));
      st.setProperty("--hero-top", `${L.heroTop}px`);

      if (L.mode === "tablet") {
        // fitHero: shrink from top-left when the hero would overflow the viewport.
        const h = hero.offsetHeight;
        const avail = vh - L.heroTop - 28 * L.u;
        if (h > avail) hero.style.transform = `scale(${Math.max(0.55, avail / h)})`;
      }
    }
    app.dataset["ready"] = "true";
  }

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(layout);
  };

  layout();
  window.addEventListener("resize", schedule);
  window.addEventListener("orientationchange", schedule);
  window.visualViewport?.addEventListener("resize", schedule);
  document.fonts?.ready.then(() => !destroyed && schedule());

  // Menu
  const onBtn = () => setMenu(app.dataset["menu"] !== "open");
  const onScrim = () => setMenu(false);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && app.dataset["menu"] === "open") setMenu(false);
  };
  const onPanel = (e: Event) => {
    if (app.dataset["mode"] !== "exact" && (e.target as Element).closest("a")) setMenu(false);
  };
  btn.addEventListener("click", onBtn);
  scrim.addEventListener("click", onScrim);
  document.addEventListener("keydown", onKey);
  panel.addEventListener("click", onPanel);

  // Autoplay safety: some renderers don't reflect the muted attribute.
  video.muted = true;
  video.play?.()?.catch(() => {});

  // Entrance
  const fontsReady = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
  const videoReady = new Promise<void>((res) => {
    if (video.readyState >= 2) return res();
    video.addEventListener("loadeddata", () => res(), { once: true });
    video.addEventListener("error", () => res(), { once: true, capture: true });
  });
  const timeout = new Promise<void>((res) => setTimeout(res, 1000));

  const start = () => {
    if (destroyed) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mode = app.dataset["mode"];
    const soft = mode === "exact" ? [logo, ...links, signup] : [logo, btn];
    const bases = soft.map((el) => {
      const t = getComputedStyle(el).transform;
      return t && t !== "none" ? t : "";
    });

    app.dataset["intro"] = "done";

    if (reduce) {
      [header, hero].forEach((el) =>
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, easing: "linear", fill: "backwards" }),
      );
      return;
    }

    lines.forEach((el, i) =>
      el.animate([{ transform: "translateY(112%)" }, { transform: "none" }], {
        duration: 900,
        delay: 380 + i * 120,
        easing: EXPO,
        fill: "backwards",
      }),
    );

    soft.forEach((el, i) => {
      const base = bases[i];
      el.animate(
        [
          { opacity: 0, transform: `translateY(9px) ${base}`.trim() },
          { opacity: 1, transform: base || "none" },
        ],
        { duration: 540, delay: 90 + i * 55, easing: SOFT, fill: "backwards" },
      );
    });

    para.animate(
      [
        { opacity: 0, transform: "translateY(12px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 680, delay: 860, easing: SOFT, fill: "backwards" },
    );

    explore.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }], {
      duration: 600,
      delay: 1060,
      easing: EXPO,
      fill: "backwards",
    });
  };

  Promise.race([Promise.all([fontsReady, videoReady]), timeout]).then(() => {
    if (!destroyed) requestAnimationFrame(start);
  });

  return () => {
    destroyed = true;
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("orientationchange", schedule);
    window.visualViewport?.removeEventListener("resize", schedule);
    btn.removeEventListener("click", onBtn);
    scrim.removeEventListener("click", onScrim);
    document.removeEventListener("keydown", onKey);
    panel.removeEventListener("click", onPanel);
  };
}
