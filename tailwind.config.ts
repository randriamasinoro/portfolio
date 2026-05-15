import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0F",
        surface: "#12121A",
        "surface-2": "#1A1A2E",
        "surface-3": "#20203A",
        border: "#1E1E2E",
        "border-strong": "#2A2A3E",
        fg: "#E8E8F0",
        "fg-2": "#B0B0C0",
        "fg-muted": "#6B7280",
        "fg-dim": "#4B5563",
        accent: "#2D7DD2",
        "accent-strong": "#4A95E0",
        "domain-data": "#3B82F6",
        "domain-cyber": "#EF4444",
        "domain-embedded": "#22C55E",
        "domain-devsecops": "#A855F7",
      },
      fontFamily: {
        display: ["var(--font-syne)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-ibm-plex-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SF Mono", "Menlo"],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["3rem", { lineHeight: "1.10", letterSpacing: "-0.02em" }],
        h2: ["2rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h3: ["1.375rem", { lineHeight: "1.25" }],
        sm: ["0.875rem", { lineHeight: "1.55" }],
        xs: ["0.75rem", { lineHeight: "1.30" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
      },
      maxWidth: {
        layout: "1280px",
        read: "720px",
      },
      height: {
        nav: "60px",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.2, 0, 0, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        DEFAULT: "200ms",
        slow: "300ms",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "24px 24px",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        "fade-up": "fade-up 500ms cubic-bezier(0.2,0,0,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
