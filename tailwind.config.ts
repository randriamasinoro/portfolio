import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:             "var(--bg)",
        surface:        "var(--surface)",
        "surface-2":    "var(--surface-2)",
        "surface-3":    "var(--surface-3)",
        border:         "var(--border)",
        "border-strong":"var(--border-strong)",
        fg:             "var(--fg)",
        "fg-2":         "var(--fg-2)",
        "fg-muted":     "var(--fg-muted)",
        "fg-dim":       "var(--fg-dim)",
        accent:         "var(--accent)",
        "accent-strong":"var(--accent-strong)",
        "domain-data":      "#3B82F6",
        "domain-cyber":     "#EF4444",
        "domain-embedded":  "#22C55E",
        "domain-devsecops": "#A855F7",
      },
      fontFamily: {
        display: ["var(--font-syne)", "ui-sans-serif", "system-ui"],
        body:    ["var(--font-ibm-plex-sans)", "ui-sans-serif", "system-ui"],
        mono:    ["var(--font-jetbrains-mono)", "ui-monospace", "SF Mono", "Menlo"],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1:      ["3rem",   { lineHeight: "1.10", letterSpacing: "-0.02em" }],
        h2:      ["2rem",   { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h3:      ["1.375rem",{ lineHeight: "1.25" }],
        sm:      ["0.875rem",{ lineHeight: "1.55" }],
        xs:      ["0.75rem", { lineHeight: "1.30" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
      },
      maxWidth: {
        layout: "1280px",
        read:   "720px",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.2, 0, 0, 1)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;
