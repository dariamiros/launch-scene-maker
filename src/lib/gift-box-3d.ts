// 3D viewer for the Prima dell'Alba game box (ported from the user's standalone three.js file).
// Browser-only: import dynamically from a useEffect.
import * as THREE from "three";

export type BoxView = "front" | "back" | "side" | "top";

export interface BoxTextures {
  front: string;
  back: string;
  spine: string;
  strip: string;
}

export interface GiftBoxController {
  setView: (v: BoxView) => void;
  setAuto: (on: boolean) => void;
  destroy: () => void;
}

const VIEWS: Record<BoxView, { x: number; y: number }> = {
  front: { x: 0.14, y: 0.5 },
  back: { x: 0.14, y: Math.PI + 0.5 },
  side: { x: 0.05, y: Math.PI / 2 },
  top: { x: 1.15, y: 0.35 },
};

export function mountGiftBox(
  stage: HTMLElement,
  textures: BoxTextures,
  onReady?: () => void,
): GiftBoxController {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 10, 6000);
  let camZ = 1180;
  camera.position.set(0, 40, camZ);

  const manager = new THREE.LoadingManager();
  let loaded = false;
  manager.onLoad = () => {
    loaded = true;
  };
  const loader = new THREE.TextureLoader(manager);
  loader.setCrossOrigin("anonymous");
  const maxA = renderer.capabilities.getMaxAnisotropy();
  const disposables: { dispose: () => void }[] = [];
  const tex = (src: string) => {
    const t = loader.load(src);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = maxA;
    disposables.push(t);
    return t;
  };
  const mat = (src: string) => {
    const m = new THREE.MeshStandardMaterial({ map: tex(src), roughness: 0.52, metalness: 0.04 });
    disposables.push(m);
    return m;
  };

  const W = 370;
  const H = 270;
  const D = 70;
  const mats = [
    mat(textures.spine),
    mat(textures.spine),
    mat(textures.strip),
    mat(textures.strip),
    mat(textures.front),
    mat(textures.back),
  ];
  const boxGeo = new THREE.BoxGeometry(W, H, D);
  disposables.push(boxGeo);
  const box = new THREE.Mesh(boxGeo, mats);
  const group = new THREE.Group();
  group.add(box);
  scene.add(group);

  // Soft floor shadow
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const gr = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  gr.addColorStop(0, "rgba(0,0,0,.6)");
  gr.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 256, 256);
  const shTex = new THREE.CanvasTexture(c);
  const shGeo = new THREE.PlaneGeometry(620, 300);
  const shMat = new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false });
  disposables.push(shTex, shGeo, shMat);
  const sh = new THREE.Mesh(shGeo, shMat);
  sh.rotation.x = -Math.PI / 2;
  sh.position.y = -H / 2 - 70;
  scene.add(sh);

  // Lights (legacy intensities × π for three r155+)
  scene.add(new THREE.HemisphereLight(0xb4c4ff, 0x141a3c, 0.95 * Math.PI));
  const key = new THREE.DirectionalLight(0xffffff, 1.05 * Math.PI);
  key.position.set(-380, 520, 640);
  scene.add(key);
  const warm = new THREE.PointLight(0xffc27a, 0.65 * Math.PI, 2200, 0);
  warm.position.set(420, -60, 420);
  scene.add(warm);

  // Snow
  const N = 260;
  const pos = new Float32Array(N * 3);
  const vel: number[] = [];
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 1500;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 1000;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 900 - 100;
    vel.push(0.25 + Math.random() * 0.5);
  }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const sc = document.createElement("canvas");
  sc.width = sc.height = 64;
  const sx = sc.getContext("2d")!;
  const sgr = sx.createRadialGradient(32, 32, 0, 32, 32, 32);
  sgr.addColorStop(0, "rgba(255,248,236,1)");
  sgr.addColorStop(1, "rgba(255,248,236,0)");
  sx.fillStyle = sgr;
  sx.fillRect(0, 0, 64, 64);
  const snowTex = new THREE.CanvasTexture(sc);
  const snowMat = new THREE.PointsMaterial({
    size: 9,
    map: snowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0.85,
  });
  disposables.push(sg, snowTex, snowMat);
  scene.add(new THREE.Points(sg, snowMat));

  // Controls
  const tgt = { ...VIEWS.front };
  const cur = { ...VIEWS.front };
  let auto = false;
  let drag = false;
  let lx = 0;
  let ly = 0;

  const onDown = (e: PointerEvent) => {
    drag = true;
    lx = e.clientX;
    ly = e.clientY;
    stage.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!drag) return;
    tgt.y += (e.clientX - lx) * 0.009;
    tgt.x = Math.max(-1.3, Math.min(1.3, tgt.x + (e.clientY - ly) * 0.006));
    lx = e.clientX;
    ly = e.clientY;
  };
  const onUp = () => {
    drag = false;
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    camZ = Math.max(700, Math.min(1900, camZ + e.deltaY * 0.8));
  };
  stage.addEventListener("pointerdown", onDown);
  stage.addEventListener("pointermove", onMove);
  stage.addEventListener("pointerup", onUp);
  stage.addEventListener("pointercancel", onUp);
  stage.addEventListener("wheel", onWheel, { passive: false });

  const size = () => {
    const w = stage.clientWidth || 1;
    const h = stage.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(size);
  ro.observe(stage);
  size();

  const t0 = performance.now();
  let raf = 0;
  let readySent = false;
  const frame = (t: number) => {
    if (auto && !drag) tgt.y += 0.006;
    cur.x += (tgt.x - cur.x) * 0.1;
    cur.y += (tgt.y - cur.y) * 0.1;
    group.rotation.set(cur.x, cur.y, 0);
    const asp = camera.aspect;
    const fit = asp < 1.1 ? (1180 / Math.max(asp, 0.45)) * 0.92 : 1180;
    const z = Math.max(camZ, fit > camZ && asp < 1.1 ? fit : camZ);
    camera.position.z += (z - camera.position.z) * 0.12;
    group.position.y = Math.sin((t - t0) / 1100) * 6;
    const p = sg.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      p[i * 3 + 1] -= vel[i];
      p[i * 3] += Math.sin((t - t0) / 900 + i) * 0.15;
      if (p[i * 3 + 1] < -520) p[i * 3 + 1] = 520;
    }
    sg.attributes.position.needsUpdate = true;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    if (loaded && !readySent) {
      readySent = true;
      onReady?.();
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return {
    setView(v) {
      auto = false;
      tgt.x = VIEWS[v].x;
      const turn = Math.round((cur.y - VIEWS[v].y) / (2 * Math.PI));
      tgt.y = VIEWS[v].y + turn * 2 * Math.PI;
    },
    setAuto(on) {
      auto = on;
    },
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      stage.removeEventListener("wheel", onWheel);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
