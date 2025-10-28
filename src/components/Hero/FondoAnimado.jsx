"use client";

import { useEffect, useState } from "react";
import "./hero.css";

export default function FondoAnimado() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const createElements = () => {
      const newElements = [];

      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: `bubble-${i}`,
          type: "bubble",
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 60 + 20,
          delay: Math.random() * 6,
        });
      }

      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: `particle-${i}`,
          type: "particle",
          top: Math.random() * 100,
          delay: Math.random() * 15,
        });
      }

      for (let i = 0; i < 5; i++) {
        newElements.push({
          id: `line-${i}`,
          type: "line",
          top: Math.random() * 100,
          width: Math.random() * 200 + 100,
          delay: Math.random() * 4,
        });
      }

      for (let i = 0; i < 6; i++) {
        newElements.push({
          id: `hex-${i}`,
          type: "hexagon",
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 3,
        });
      }

      setElements(newElements);
    };

    createElements();
  }, []);

  return (
    <div className="tech-bg">
      {elements.map((element) => {
        if (element.type === "bubble") {
          return (
            <div
              key={element.id}
              className="floating-element"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                width: `${element.size}px`,
                height: `${element.size}px`,
                animationDelay: `${element.delay}s`,
              }}
            />
          );
        }

        if (element.type === "particle") {
          return (
            <div
              key={element.id}
              className="tech-particle"
              style={{
                top: `${element.top}%`,
                animationDelay: `${element.delay}s`,
              }}
            />
          );
        }

        if (element.type === "line") {
          return (
            <div
              key={element.id}
              className="circuit-line"
              style={{
                top: `${element.top}%`,
                width: `${element.width}px`,
                left: `${Math.random() * 50}%`,
                animationDelay: `${element.delay}s`,
              }}
            />
          );
        }

        if (element.type === "hexagon") {
          return (
            <div
              key={element.id}
              className="tech-hexagon"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                animationDelay: `${element.delay}s`,
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
