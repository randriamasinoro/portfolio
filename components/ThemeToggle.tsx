"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Garde d'hydratation next-themes : le thème n'est connu qu'après montage
  // client. Le setState au montage est volontaire ici.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Placeholder pour éviter le CLS avant hydratation
  if (!mounted) {
    return <div className="w-8 h-8" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="w-8 h-8 inline-flex items-center justify-center rounded text-fg-muted hover:text-fg transition-colors duration-200"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
