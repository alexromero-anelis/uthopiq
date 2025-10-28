"use client";
import "./hero.css";

export default function FondoAnimado() {
  return (
    <div className="net-bg" aria-hidden>
      <svg className="net-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Malla base gris (muy sutil) */}
          <pattern id="hexPatternBase" width="36" height="31.1769" patternUnits="userSpaceOnUse">
            <path
              d="M9 0 L27 0 L36 15.588 L27 31.1769 L9 31.1769 L0 15.588 Z"
              fill="none"
              stroke="rgba(36,36,36,0.62)"
              strokeWidth="1"
            />
          </pattern>

          {/* Runner rojo: mismo hex, trazo fino animable por CSS */}
          <pattern id="hexPatternRunner" width="36" height="31.1769" patternUnits="userSpaceOnUse">
            <path
              className="hex-run r1"
              d="M9 0 L27 0 L36 15.588 L27 31.1769 L9 31.1769 L0 15.588 Z"
              fill="none"
            />
          </pattern>

          {/* Dos runners extra con leve desfase para sensación de flujo, aún más sutiles */}
          <pattern id="hexPatternRunner2" width="36" height="31.1769" patternUnits="userSpaceOnUse" patternTransform="translate(12,6)">
            <path className="hex-run r2" d="M9 0 L27 0 L36 15.588 L27 31.1769 L9 31.1769 L0 15.588 Z" fill="none" />
          </pattern>
          <pattern id="hexPatternRunner3" width="36" height="31.1769" patternUnits="userSpaceOnUse" patternTransform="translate(24,12)">
            <path className="hex-run r3" d="M9 0 L27 0 L36 15.588 L27 31.1769 L9 31.1769 L0 15.588 Z" fill="none" />
          </pattern>

          {/* Vignette para contraste del texto */}
          <radialGradient id="vignette" cx="50%" cy="40%" r="75%">
            <stop offset="55%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.65)" />
          </radialGradient>
        </defs>

        {/* Base negra + malla gris */}
        <rect x="0" y="0" width="100%" height="100%" fill="#000" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#hexPatternBase)" />

        {/* Capas runner (muy sutiles) */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#hexPatternRunner)" opacity="0.22" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#hexPatternRunner2)" opacity="0.16" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#hexPatternRunner3)" opacity="0.12" />

        {/* Vignette para asegurar lectura del texto */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#vignette)" />
      </svg>
    </div>
  );
}
