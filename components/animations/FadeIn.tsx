import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Animation d'entrée en CSS pur (plus de Framer Motion) : composant serveur,
// aucun JS hydraté, le contenu paint dès le premier rendu.
export default function FadeIn({ children, delay = 0, className }: Props) {
  return (
    <div
      className={`animate-fade-up${className ? ` ${className}` : ""}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
