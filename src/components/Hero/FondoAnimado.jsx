"use client";

import { useEffect, useState } from "react";
import "./hero.css";

export default function FondoAnimado() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const newElements = [];

    // Líneas luminosas que se mueven
    for (let i = 0; i < 8; i++) {
      newElements.push({
        id: `line-${i}`,
        type: "line",
        top: Math.random() * 100,
        delay: Math.random() * 6,
      });
    }

    // Partículas rojas y blancas
    for (let i = 0; i < 25; i++) {
      const isRed = Math.random() < 0.3;
      newElements.push({
        id: `particle-${i}`,
        type: "particle",
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: isRed ? "var(--rojo-primario)" : "rgba(255,255,255,0.4)",
        delay: Math.random() * 8,
      });
    }

    // Destellos hexagonales suaves
    for (let i = 0; i < 6; i++) {
      newElements.push({
        id: `hex-${i}`,
        type: "hex",
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
      });
    }

    setElements(newElements);
  }, []);

  return (
    <div className="tech-bg-dark">
      {elements.map((el) => {
        if (el.type === "line") {
          return (
            <div
              key={el.id}
              className="tech-line"
              style={{
                top: `${el.top}%`,
                animationDelay: `${el.delay}s`,
              }}
            />
          );
        }
        if (el.type === "particle") {
          return (
            <div
              key={el.id}
              className="tech-particle-dark"
              style={{
                top: `${el.top}%`,
                left: `${el.left}%`,
                width: `${el.size}px`,
                height: `${el.size}px`,
                backgroundColor: el.color,
                animationDelay: `${el.delay}s`,
              }}
            />
          );
        }
        if (el.type === "hex") {
          return (
            <div
              key={el.id}
              className="tech-hex-dark"
              style={{
                left: `${el.left}%`,
                top: `${el.top}%`,
                animationDelay: `${el.delay}s`,
              }}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
