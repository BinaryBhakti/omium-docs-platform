/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#08090a",
        "bg-elevated": "#0e0f10",
        "bg-card": "#141516",
        "bg-hover": "#1a1b1d",
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.16)",
        },
        text: {
          DEFAULT: "#f7f8f8",
          secondary: "#8a8f98",
          tertiary: "#62666d",
          quaternary: "#3c4043",
        },
        warm: {
          glow: "rgba(255,140,90,0.15)",
          halftone: "rgba(232,106,56,0.35)",
          solid: "#e86a38",
        },
        status: {
          ok: "#5e9e5b",
          warn: "#f2c94c",
          err: "#eb5757",
        },
      },
      fontFamily: {
        sans: [
          "Satoshi Variable",
          "Satoshi",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "JetBrains Mono Variable",
          "Berkeley Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      fontSize: {
        meta: ["0.6875rem", { letterSpacing: "0.12em" }],
        hero: [
          "clamp(2.2rem, 6vw, 4.3rem)",
          { lineHeight: "0.98", letterSpacing: "-0.03em" },
        ],
        section: [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.025em" },
        ],
      },
      borderRadius: {
        card: "12px",
        pill: "999px",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.8)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
