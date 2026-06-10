import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-orange": "#E8640C",
        "brand-green": "#2D5A3D",
        "brand-green-light": "#4A7C59",
        "brand-navy": "#0D1117",
        "brand-navy-2": "#0F1923",
        "brand-navy-3": "#162032",
        "brand-border": "#1E2D3D",
        "brand-white": "#F0EDE8",
        "brand-muted": "#8A9BB0",
        "brand-red": "#C0444A",
        "brand-tint": "#111827",
        "brand-footer": "#0A0C10",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        "orange-soft": "0 8px 30px rgba(232, 100, 12, 0.12)",
        "orange-subtle": "0 6px 24px rgba(232, 100, 12, 0.08)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        ticker: "ticker 25s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
