"use client";

import { useEffect, useRef } from "react";

/*
 * stand-in for the 21st.dev component "hero ascii schlieren" (@nikolas-sapa).
 *
 * the original file was not present in this project and the 21st.dev registry
 * requires a login, so it could not be pulled automatically. this file keeps the
 * same path and export name (`SchlierenRig`), so installing the original simply
 * overwrites it:
 *
 *   npx shadcn@latest add "https://21st.dev/r/nikolas-sapa/hero-ascii-schlieren"
 *
 * what it draws: a rising thermal plume and a shear layer, cut by a knife edge.
 * only steep density gradients survive, as sparse bright / dark ascii bands.
 * moving the pointer horizontally rotates the knife edge.
 */

const RAMP = ".:-=+*#%@";
const FRAME_MS = 1000 / 30;
const THRESHOLD = 2.4;

export function SchlierenRig({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bright = Array.from(RAMP, (_, k) => `rgba(245,245,245,${(0.3 + (0.7 * k) / (RAMP.length - 1)).toFixed(2)})`);
    const dim = Array.from(RAMP, (_, k) => `rgba(139,139,139,${(0.22 + (0.5 * k) / (RAMP.length - 1)).toFixed(2)})`);

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cellW = 0;
    let cellH = 0;
    let field = new Float32Array(0);
    // start slightly rotated so both the plume edges and the shear layer read
    let angle = 0.45;
    let targetAngle = 0.45;
    let raf = 0;
    let last = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontSize = width < 768 ? 11 : 13;
      cellW = fontSize * 0.62;
      cellH = fontSize * 1.3;
      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);
      field = new Float32Array(cols * rows);
      ctx.font = `${fontSize}px ${getComputedStyle(canvas).fontFamily}`;
      ctx.textBaseline = "top";
      // always paint once so the field is there before (or without) the animation loop
      draw(still ? 0 : performance.now());
    };

    const draw = (time: number) => {
      const t = time * 0.001;
      const aspect = width / height;
      // the plume sits right of centre so the left side stays calm for text
      const axis = aspect < 1 ? 0.62 : 0.74;

      for (let j = 0; j < rows; j++) {
        const y = 1 - j / rows;
        const sway = 0.07 * y * Math.sin(3.1 * y - 1.3 * t) + 0.04 * y * y * Math.sin(7.3 * y - 2.1 * t + 1.7);
        const spread = 0.035 + 0.17 * y;
        for (let i = 0; i < cols; i++) {
          const x = (i / cols - axis) * aspect;
          const d = (x - sway) / spread;
          const core = Math.exp(-d * d);
          const eddies = 0.6 + 0.4 * Math.sin(11 * y - 2.4 * t + 2.6 * d) + 0.22 * Math.sin(23 * y - 3.7 * t - 4 * d + Math.sin(5 * y + t));
          const plume = core * eddies * (1.1 - 0.5 * y);
          const layer = 0.74 + 0.03 * Math.sin(5 * x - 0.8 * t) + 0.015 * Math.sin(13 * x + 1.7 * t);
          field[j * cols + i] = plume + 0.55 * Math.tanh((y - layer) / 0.035);
        }
      }

      angle += (targetAngle - angle) * 0.08;
      const kx = Math.cos(angle);
      const ky = Math.sin(angle);
      const invDx = cols / (2 * aspect);
      const invDy = rows / 2;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      for (let j = 1; j < rows - 1; j++) {
        for (let i = 1; i < cols - 1; i++) {
          const p = j * cols + i;
          const gx = (field[p + 1] - field[p - 1]) * invDx;
          const gy = (field[p - cols] - field[p + cols]) * invDy;
          const g = gx * kx + gy * ky;
          const m = (Math.abs(g) - THRESHOLD) / 12;
          if (m <= 0) continue;
          const k = Math.min(RAMP.length - 1, Math.floor(m * RAMP.length));
          ctx.fillStyle = g > 0 ? bright[k] : dim[k];
          ctx.fillText(RAMP[k], i * cellW, j * cellH);
        }
      }
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (time - last < FRAME_MS) return;
      last = time;
      draw(time);
    };

    const start = () => {
      if (still || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (event: PointerEvent) => {
      targetAngle = 0.45 + (event.clientX / window.innerWidth - 0.5) * Math.PI;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);

    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    viewObserver.observe(canvas);

    resize();
    if (!still) window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      sizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full font-mono ${className ?? ""}`} />;
}
