"use client";
import { useEffect, useRef } from "react";

export default function FondoAnimado() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // más rápido
    canvas.style.background = "#000";

    // Tamaño y DPR limitado
    const setSize = () => {
      const dpr = 1; // fijo para rendimiento
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    };
    setSize();

    // Partículas ligeras (rectángulos pequeños)
    const area = window.innerWidth * window.innerHeight;
    const COUNT =
      area > 2000000 ? 80 :
      area > 1200000 ? 65 :
      area > 800000  ? 55 :
      area > 500000  ? 45 : 36;

    const particles = [];
    const cx = window.innerWidth * 0.5;
    const cy = window.innerHeight * 0.5;

    for (let i = 0; i < COUNT; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rad = 40 + Math.random() * 200;
      const speed = 0.3 + Math.random() * 0.5;
      particles.push({
        x: cx + Math.cos(ang) * rad,
        y: cy + Math.sin(ang) * rad,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        s: 1 + Math.random() * 1.5,
        red: Math.random() < 0.25,
        a: 0.7 + Math.random() * 0.3,
      });
    }

    const field = (x, y, t) => {
      const n1 = Math.sin((x + t * 35) * 0.0018);
      const n2 = Math.cos((y - t * 28) * 0.0016);
      return { x: n2 * 0.08, y: n1 * 0.08 };
    };

    const mouse = { x: 0, y: 0, active: false };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onLeave = () => { mouse.active = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    let paused = document.hidden;
    const onVis = () => { paused = document.hidden; if (!paused) loop(performance.now()); };
    document.addEventListener("visibilitychange", onVis);

    const MAX_SPEED = 1.2;
    const FRICTION = 0.985;
    let last = performance.now();

    const WHITE = "rgba(255,255,255,";
    const RED   = "rgba(255,75,75,";

    const loop = (now) => {
      if (paused) return;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const v = field(p.x, p.y, now);
        p.vx += v.x;
        p.vy += v.y;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx*dx + dy*dy;
          const R = 100;
          if (d2 < R*R) {
            const f = 0.0008 * (1 - d2/(R*R));
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > MAX_SPEED) {
          const k = MAX_SPEED / sp;
          p.vx *= k; p.vy *= k;
        }

        p.x += p.vx;
        p.y += p.vy;

        const W = window.innerWidth, H = window.innerHeight, M = 4;
        if (p.x < -M) p.x = W + M;
        if (p.x > W + M) p.x = -M;
        if (p.y < -M) p.y = H + M;
        if (p.y > H + M) p.y = -M;

        ctx.globalAlpha = p.a;
        ctx.fillStyle = (p.red ? RED : WHITE) + p.a + ")";
        const s = p.s;
        ctx.fillRect(p.x - s * 0.5, p.y - s * 0.5, s, s);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      className="tech-bg-canvas"
      ref={canvasRef}
      aria-hidden="true"
    />
  );
}
