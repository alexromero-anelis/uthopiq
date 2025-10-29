"use client";

import { useEffect, useRef } from "react";
import "./hero.css";

export default function FondoAnimado() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    // Tamaño y DPR
    const setSize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    // Colores desde CSS global
    const css = getComputedStyle(document.documentElement);
    const COLOR_BG = css.getPropertyValue("--negro").trim() || "#252423";
    const COLOR_RED =
      css.getPropertyValue("--rojo-primario").trim() || "#ff4b4b";
    const COLOR_WHITE = css.getPropertyValue("--blanco").trim() || "#ffffff";

    // Parámetros suavizados
    const area = window.innerWidth * window.innerHeight;
    const PARTICLES =
      area > 2_000_000
        ? 150
        : area > 1_200_000
        ? 120
        : area > 800_000
        ? 95
        : area > 500_000
        ? 80
        : 65;

    const LINKS_DIST = Math.max(100, Math.min(180, Math.sqrt(area) / 3));
    const RED_RATIO = 0.28;
    const NODE_MASTERS = Math.max(2, Math.floor(PARTICLES / 30));
    const STREAKS = Math.max(6, Math.floor(PARTICLES / 12));

    // Escalas físicas (más lento/fluido)
    const FIELD_STRENGTH = 0.12;
    const FRICTION = 0.96;
    const MOUSE_FORCE = 0.001;
    const ATTRACT_STRENGTH = 0.012;
    const MAX_SPEED = 1.2;

    // Estados
    const particles = [];
    const masters = [];
    const streaks = [];

    // Nodos maestros con “flotación” lenta
    for (let i = 0; i < NODE_MASTERS; i++) {
      const x = (window.innerWidth * (i + 1)) / (NODE_MASTERS + 1);
      const y = window.innerHeight * (0.3 + Math.random() * 0.4);
      masters.push({
        x,
        y,
        ox: x,
        oy: y,
        phase: Math.random() * Math.PI * 2,
        r: 42 + Math.random() * 24,
      });
    }

    // Partículas iniciales (velocidades más bajas)
    for (let i = 0; i < PARTICLES; i++) {
      const m = masters[i % masters.length];
      const ang = Math.random() * Math.PI * 2;
      const rad = 40 + Math.random() * 160;
      const px = m.x + Math.cos(ang) * rad;
      const py = m.y + Math.sin(ang) * rad;
      const speed = 0.15 + Math.random() * 0.25;
      particles.push({
        x: Math.max(0, Math.min(window.innerWidth, px)),
        y: Math.max(0, Math.min(window.innerHeight, py)),
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        r: 1 + Math.random() * 1.5,
        red: Math.random() < RED_RATIO,
      });
    }

    // Estelas (más pausadas)
    for (let i = 0; i < STREAKS; i++) {
      const fromLeft = Math.random() < 0.5;
      const angle = fromLeft ? (Math.PI * 3) / 4 : Math.PI / 4;
      const speed = 1.2 + Math.random() * 2.0;
      streaks.push({
        x: fromLeft ? -100 : window.innerWidth + 100,
        y: Math.random() * window.innerHeight,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed * (fromLeft ? 1 : -1),
        len: 80 + Math.random() * 140,
        life: 0,
        maxLife: 4 + Math.random() * 3.0,
        red: Math.random() < 0.4,
      });
    }

    // Campo vectorial
    const field = (x, y, t) => {
      const s1 = Math.sin((x + t * 40) * 0.002);
      const s2 = Math.cos((y - t * 25) * 0.0025);
      const s3 = Math.sin((x + y + t * 30) * 0.0012);
      return { x: s2 * 0.6 + s3 * 0.4, y: s1 * 0.6 - s3 * 0.4 };
    };

    // Mouse
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
    };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => (mouse.active = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    // Resize
    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    // Wrapping toroidal
    const wrap = (p) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const M = 8;
      if (p.x < -M) p.x = W + M;
      if (p.x > W + M) p.x = -M;
      if (p.y < -M) p.y = H + M;
      if (p.y > H + M) p.y = -M;
    };

    // Loop con dt real
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.033, (now - last) / 1000);
      const dt60 = dt * 60;
      last = now;

      // Fondo + viñeta
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.fillStyle = COLOR_BG || "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const g = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.2,
        0,
        canvas.width * 0.8,
        canvas.height * 0.2,
        Math.max(canvas.width, canvas.height) * 0.9
      );
      g.addColorStop(0, "rgba(255,75,75,0.03)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Flotación de masters
      for (const m of masters) {
        m.phase += dt;
        const a = 10;
        m.x = m.ox + Math.cos(m.phase * 0.35) * a;
        m.y = m.oy + Math.sin(m.phase * 0.27) * a;
      }

      // Actualizar partículas
      for (const p of particles) {
        const v = field(p.x, p.y, now * 0.001);
        p.vx += v.x * FIELD_STRENGTH * dt60;
        p.vy += v.y * FIELD_STRENGTH * dt60;

        // Atracción suave al master más cercano (+ twist)
        let nearest = masters[0];
        let best = Infinity;
        for (const m of masters) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < best) {
            best = d2;
            nearest = m;
          }
        }
        const dxm = nearest.x - p.x;
        const dym = nearest.y - p.y;
        const dist = Math.hypot(dxm, dym) || 1;
        const nx = dxm / dist;
        const ny = dym / dist;
        const twist = 0.4;
        const tx = -ny,
          ty = nx;
        p.vx += (nx * ATTRACT_STRENGTH + tx * ATTRACT_STRENGTH * twist) * dt60;
        p.vy += (ny * ATTRACT_STRENGTH + ty * ATTRACT_STRENGTH * twist) * dt60;

        // Mouse
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          const R = 160;
          if (d2 < R * R) {
            const f = MOUSE_FORCE * (1 - d2 / (R * R));
            p.vx += dx * f * dt60;
            p.vy += dy * f * dt60;
          }
        }

        // Fricción + clamp
        p.vx *= Math.pow(FRICTION, dt60);
        p.vy *= Math.pow(FRICTION, dt60);
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > MAX_SPEED) {
          const k = MAX_SPEED / sp;
          p.vx *= k;
          p.vy *= k;
        }

        // Movimiento + wrapping
        p.x += p.vx * dt60;
        p.y += p.vy * dt60;
        wrap(p);
      }

      // Spatial hashing para conexiones
      const cell = LINKS_DIST;
      const cols = Math.ceil(window.innerWidth / cell);
      const rows = Math.ceil(window.innerHeight / cell);
      const grid = new Array(cols * rows).fill(0).map(() => []);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = Math.max(0, Math.min(cols - 1, Math.floor(p.x / cell)));
        const cy = Math.max(0, Math.min(rows - 1, Math.floor(p.y / cell)));
        grid[cx + cy * cols].push(i);
      }

      // Líneas de red
      ctx.save();
      ctx.lineWidth = 1;
      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          const bucket = grid[cx + cy * cols];
          for (let nx = cx; nx <= Math.min(cols - 1, cx + 1); nx++) {
            for (let ny = cy; ny <= Math.min(rows - 1, cy + 1); ny++) {
              const bucket2 = grid[nx + ny * cols];
              for (let i = 0; i < bucket.length; i++) {
                const a = particles[bucket[i]];
                const startJ = bucket === bucket2 ? i + 1 : 0;
                for (let j = startJ; j < bucket2.length; j++) {
                  const b = particles[bucket2[j]];
                  const dx = a.x - b.x;
                  const dy = a.y - b.y;
                  const d2 = dx * dx + dy * dy;
                  if (d2 <= LINKS_DIST * LINKS_DIST) {
                    const alpha = Math.max(0, 1 - Math.sqrt(d2) / LINKS_DIST);
                    const bothRed = a.red && b.red;
                    const anyRed = a.red || b.red;
                    const base = anyRed ? (bothRed ? 0.5 : 0.25) : 0.25;
                    ctx.strokeStyle = anyRed
                      ? `rgba(255,75,75,${alpha * base})`
                      : `rgba(255,255,255,${alpha * base})`;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                  }
                }
              }
            }
          }
        }
      }
      ctx.restore();

      // Partículas
      ctx.save();
      for (const p of particles) {
        if (p.red) {
          ctx.fillStyle = COLOR_RED;
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = p.red ? COLOR_RED : COLOR_WHITE;
        ctx.globalAlpha = p.red ? 1 : 0.9;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      // Arcos pulsantes
      ctx.save();
      ctx.lineWidth = 1;
      for (const m of masters) {
        const puls = 0.5 + 0.5 * Math.sin(m.phase * 2.2);
        ctx.strokeStyle = `rgba(255,255,255,${0.08 + puls * 0.08})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(255,75,75,${0.12 + puls * 0.18})`;
        ctx.beginPath();
        const start = (m.phase % (Math.PI * 2)) * 0.6;
        ctx.arc(m.x, m.y, m.r + 8, start, start + Math.PI * 0.75);
        ctx.stroke();
      }
      ctx.restore();

      // Estelas
      ctx.save();
      for (const s of streaks) {
        s.life += dt;
        s.x += s.vx * dt60;
        s.y += s.vy * dt60;
        if (
          s.x < -200 ||
          s.x > window.innerWidth + 200 ||
          s.y < -200 ||
          s.y > window.innerHeight + 200 ||
          s.life > s.maxLife
        ) {
          const fromLeft = Math.random() < 0.5;
          const angle = fromLeft ? (Math.PI * 3) / 4 : Math.PI / 4;
          const speed = 1.2 + Math.random() * 2.0;
          s.x = fromLeft ? -120 : window.innerWidth + 120;
          s.y = Math.random() * window.innerHeight;
          s.vx = Math.cos(angle) * speed * (fromLeft ? 1 : -1);
          s.vy = Math.sin(angle) * speed * (fromLeft ? 1 : -1);
          s.len = 80 + Math.random() * 140;
          s.life = 0;
          s.maxLife = 4 + Math.random() * 3.0;
          s.red = Math.random() < 0.4;
        }
        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * s.len,
          s.y - s.vy * s.len
        );
        const head = s.red ? "rgba(255,75,75,0.45)" : "rgba(255,255,255,0.38)";
        const tail = s.red ? "rgba(255,75,75,0.0)" : "rgba(255,255,255,0.0)";
        grad.addColorStop(0, head);
        grad.addColorStop(1, tail);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * s.len, s.y - s.vy * s.len);
        ctx.stroke();
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas className="tech-bg-canvas" ref={canvasRef} aria-hidden="true" />
  );
}
