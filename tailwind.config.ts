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
        border:         "var(--border)",
        "border-strong":"var(--border-strong)",
        fg:             "var(--fg)",
        "fg-2":         "var(--fg-2)",
        "fg-muted":     "var(--fg-muted)",
        accent:         "var(--accent)",
        "accent-ink":   "var(--accent-ink)",
        "accent-deep":  "var(--accent-deep)",
        watermark:      "var(--watermark)",
        "scope-bg":     "var(--scope-bg)",
        "scope-grid":   "var(--scope-grid)",
        "scope-text":   "var(--scope-text)",
        "scope-fg":     "var(--scope-fg)",
      },
      fontFamily: {
        ui:      ["var(--font-b612)", "ui-sans-serif", "system-ui", "sans-serif"],
        body:    ["var(--font-source-serif)", "ui-serif", "Georgia", "serif"],
        mono:    ["var(--font-code)", "ui-monospace", "SF Mono", "Menlo"],
      },
      fontSize: {
        sm:      ["0.875rem",{ lineHeight: "1.55" }],
        xs:      ["0.75rem", { lineHeight: "1.30" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
      },
      maxWidth: {
        read:   "680px",
        page:   "1120px",
      },
    },
  },
  plugins: [],
};
export default config;
