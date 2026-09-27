"use client";

import { useEffect, useState } from "react";

// Halo violet qui suit la souris, derrière le contenu.
// Actif seulement avec une vraie souris (pas sur écran tactile). Une seule écoute
// pointermove, synchronisée sur l'affichage (requestAnimationFrame) ; la position
// est publiée en variables CSS (--mx, --my) réutilisées par la lueur des cards.
export default function CursorGlow() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          root.style.setProperty("--mx", `${x}px`);
          root.style.setProperty("--my", `${y}px`);
          frame = 0;
        });
      }
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        background: "radial-gradient(600px circle at var(--mx) var(--my), var(--cursor-glow), transparent 60%)",
      }}
    />
  );
}
