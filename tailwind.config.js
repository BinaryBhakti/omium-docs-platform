/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: "#0a0a0a",
        panel: "#121212",
        copper: "#DE924F",
        "copper-muted": "rgba(222, 146, 79, 0.2)",
        hairline: "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Geist", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        ui: ["13px", { lineHeight: "19.5px", fontWeight: "400" }],
        smbody: ["15px", { lineHeight: "24px", fontWeight: "400" }],
        body: ["16px", { lineHeight: "26px", fontWeight: "400" }],
        code: ["13.5px", { lineHeight: "22px", fontWeight: "400" }],
      },
      borderRadius: {
        sm: "2px",
        md: "4px",
        lg: "6px",
        xl: "12px",
        "2xl": "16px",
        full: "9999px",
      },
      keyframes: {
        liquidGlassShimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "liquid-shimmer": "liquidGlassShimmer 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
