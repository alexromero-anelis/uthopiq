import { useEffect, useRef, useState } from "react";
import "./agents.css";

export default function CoverflowCarousel({ items, initialIndex = 2 }) {
  const [active, setActive] = useState(Math.min(initialIndex, items.length - 1));
  const [flipped, setFlipped] = useState(null);
  const trackRef = useRef(null);

  const prev = () => { setFlipped(null); setActive(i => (i === 0 ? items.length - 1 : i - 1)); };
  const next = () => { setFlipped(null); setActive(i => (i === items.length - 1 ? 0 : i + 1)); };

  // Teclado
  useEffect(() => {
    const onKey = e => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setFlipped(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Swipe
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0;
    const onStart = e => (startX = e.touches[0].clientX);
    const onEnd = e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) (dx > 0 ? prev() : next());
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, []);

  const getCardStyle = (index) => {
    const diff = index - active;
    const translateX = Math.round(diff * 280); // evita subpíxel

    let scale = 1, opacity = 0.4, zIndex = 0, rotateY = 0, translateZ = 0;

    if (diff === 0) {
      // ↓↓↓ Cambio clave: evitar escalar > 1 para no perder nitidez
      scale = 1; opacity = 1; zIndex = 10; translateZ = 40;
    } else if (Math.abs(diff) === 1) {
      scale = 0.96; opacity = 0.75; zIndex = 5; rotateY = diff > 0 ? -22 : 22; translateZ = -10;
    } else if (Math.abs(diff) === 2) {
      scale = 0.9; opacity = 0.4; zIndex = 1; rotateY = diff > 0 ? -30 : 30; translateZ = -40;
    } else {
      scale = 0.86; opacity = 0.15; zIndex = 0; rotateY = diff > 0 ? -38 : 38; translateZ = -80;
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      transition: "transform .55s cubic-bezier(0.4,0,0.2,1), opacity .35s ease",
      willChange: "transform, opacity",
    };
  };

  const handleCardClick = (i) => {
    if (i !== active) { setFlipped(null); setActive(i); }
    else { setFlipped(prev => (prev === i ? null : i)); }
  };

  return (
    <div className="agents-carousel">
      <div className="agents-stage">
        <div ref={trackRef} className="agents-track" style={{ perspective: "1500px" }}>
          {items.map((it, i) => (
            <div key={`${it.id}-${i}`} className="agent-slot" style={getCardStyle(i)}>
              <article
                className={`agent-card ${i === active ? "is-active" : ""} ${flipped === i ? "is-flipped" : ""}`}
                onClick={() => handleCardClick(i)}
                aria-pressed={flipped === i}
                /* === VARIABLES POR BOT PARA EL DORSO/ACENTO === */
                style={{
                  '--accent': it.accent,
                  '--backA': it.backA,
                  '--backB': it.backB,
                  '--backC': it.backC,
                }}
              >
                <div className="card-inner">
                  {/* Frente */}
                  <div className="agent-face agent-front">
                    <div className="surface">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="agent-img"
                        draggable="false"
                      />
                      <div className="agent-gradient" />
                      <div className="agent-info">
                        <h3 className="agent-name">{it.name}</h3>
                        <p className="agent-role">{it.role}</p>
                      </div>
                    </div>
                  </div>
                  {/* Dorso */}
                  <div className="agent-face agent-back">
                    <div className="surface surface-back">
                      <div className="agent-back-content">
                        <h3 className="agent-back-title">{it.name}</h3>
                        <p className="agent-back-role">{it.role}</p>
                        <p className="agent-back-desc">{it.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="agents-controls">
        <button className="icon-btn" onClick={prev} aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="agents-dots">
          {items.map((_, i) => (
            <button key={i} onClick={() => { setFlipped(null); setActive(i); }}
              className={`dot ${i === active ? "dot--active" : ""}`} aria-label={`Ir a la tarjeta ${i + 1}`} />
          ))}
        </div>
        <button className="icon-btn" onClick={next} aria-label="Siguiente">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}
