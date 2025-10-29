"use client";
import { useEffect, useRef } from "react";

/**
 * Fondo global: cielo estrellado (blanco + rojo)
 * - Pocas partículas, flotando suave, sin mouse
 * - Ocupa todo el viewport, responsive con re-seed en resize (debounced)
 * - DPR capado + coordenadas redondeadas para evitar "temblores"
 * - Singleton (se monta una sola vez)
 */
export default function GlobalBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return; // evita dobles montajes
    mountedRef.current = true;

    // Canvas global en <body>, por detrás de #root (usa .site-bg-canvas en tu index.css)
    const canvas = document.createElement("canvas");
    canvas.className = "site-bg-canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvasRef.current = canvas;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: false });
    document.documentElement.style.background = "#000";
    document.body.style.background = "#000";
    canvas.style.background = "#000";

    // --- Parámetros del efecto (ajustables) ---
    const RED_RATIO = 0.28; // ~28% estrellas rojas
    const MIN_COUNT = 60; // mínimo de estrellas
    const MAX_COUNT = 180; // máximo de estrellas
    const SPEED = 0.12; // velocidad base de deriva
    const TWINKLE_MIN = 0.6; // alpha base mínima
    const TWINKLE_MAX = 1.0; // alpha base máxima
    const SIZE_MIN = 0.9; // tamaño mínimo en px
    const SIZE_MAX = 1.8; // tamaño máximo en px
    const DRIFT = 0.35; // intensidad del campo direccional

    // Tamaño + DPR (capado) con transform consistente
    let dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // coords lógicas = px CSS
    };
    setSize();

    // Partículas (estrellas)
    const stars = [];
    const makeStars = () => {
      stars.length = 0;
      const area = window.innerWidth * window.innerHeight;
      // densidad suave por área
      const target = Math.round(
        Math.min(MAX_COUNT, Math.max(MIN_COUNT, area * 0.00005))
      );

      for (let i = 0; i < target; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // Deriva muy suave en una dirección pseudo-constante + ligero ruido
        const dir = Math.random() * Math.PI * 2;
        const spd = SPEED * (0.6 + Math.random() * 0.8); // 0.072–0.216
        const vx = Math.cos(dir) * spd;
        const vy = Math.sin(dir) * spd;

        // "Twinkle" (parpadeo) usando fase y frecuencia propias
        const phase = Math.random() * Math.PI * 2;
        const tw = 0.6 + Math.random() * 1.1; // velocidad de parpadeo

        stars.push({
          x,
          y,
          vx,
          vy,
          s: SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN),
          red: Math.random() < RED_RATIO,
          phase,
          tw,
        });
      }
    };
    makeStars();

    // Campo direccional baratísimo (da una deriva global sutil)
    const field = (x, y, t) => {
      const s1 = Math.sin(x * 0.0008 + t * 0.12);
      const s2 = Math.cos(y * 0.0007 - t * 0.09);
      return { x: s2 * DRIFT * 0.04, y: s1 * DRIFT * 0.04 };
    };

    // Resize con debounce + re-seed
    let resizeRaf = 0;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        dpr = Math.min(1.5, window.devicePixelRatio || 1);
        setSize();
        makeStars();
      });
    };
    window.addEventListener("resize", onResize);

    // Pausar si pestaña oculta
    let paused = document.hidden;
    const onVis = () => {
      paused = document.hidden;
      if (!paused) loop(performance.now());
    };
    document.addEventListener("visibilitychange", onVis);

    const WHITE = "rgba(255,255,255,";
    const RED = "rgba(255,75,75,"; // #ff4b4b
    let last = performance.now();

    const loop = (now) => {
      if (paused) return;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = now * 0.001;

      for (let i = 0; i < stars.length; i++) {
        const p = stars[i];

        // Deriva + pequeño campo direccional
        const v = field(p.x, p.y, t);
        p.x += p.vx + v.x;
        p.y += p.vy + v.y;

        // Wrap (mantiene distribución uniforme)
        const W = window.innerWidth,
          H = window.innerHeight,
          M = 2;
        if (p.x < -M) p.x = W + M;
        if (p.x > W + M) p.x = -M;
        if (p.y < -M) p.y = H + M;
        if (p.y > H + M) p.y = -M;

        // Twinkle: alpha oscilante entre TWINKLE_MIN y TWINKLE_MAX
        p.phase += p.tw * dt;
        const osc = (Math.sin(p.phase) + 1) * 0.5; // 0..1
        const a = TWINKLE_MIN + (TWINKLE_MAX - TWINKLE_MIN) * osc;

        // Dibujo sin jitter (coordenadas redondeadas)
        const s = p.s;
        const px = Math.round(p.x - s * 0.5);
        const py = Math.round(p.y - s * 0.5);

        ctx.globalAlpha = a;
        ctx.fillStyle = (p.red ? RED : WHITE) + a + ")";
        ctx.fillRect(px, py, s, s);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      canvas.remove();
      mountedRef.current = false;
    };
  }, []);

  return null;
}
