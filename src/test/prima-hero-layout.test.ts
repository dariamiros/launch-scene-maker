import { describe, expect, it } from "vitest";

import { computeLayout } from "@/lib/prima-hero";

describe("Prima dell'Alba layout modes", () => {
  it("uses the exact desktop layout at the 1280×960 design size with unit scale 1", () => {
    const L = computeLayout(1280, 960);
    expect(L.mode).toBe("exact");
    expect(L.u).toBe(1);
    expect(L.s).toBe(1);
  });

  it("switches to tablet below the 0.874 desktop ratio when the viewport is at least 600px wide", () => {
    expect(computeLayout(1100, 900).mode).toBe("tablet");
    expect(computeLayout(1120, 900).mode).toBe("exact");
  });

  it("uses compact mode for phones narrower than 600px", () => {
    expect(computeLayout(390, 844).mode).toBe("compact");
  });

  it("keeps the artwork covering the viewport (never letterboxed)", () => {
    const L = computeLayout(1920, 800);
    expect(1280 * L.s).toBeGreaterThanOrEqual(1920);
    expect(960 * L.s).toBeGreaterThanOrEqual(800);
  });
});
