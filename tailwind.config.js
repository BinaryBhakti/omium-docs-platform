/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: {
          DEFAULT: "var(--color-text)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        border: {
          strong: "var(--color-border-strong)",
          subtle: "var(--color-border-subtle)",
        },
        accent: {
          pink: "var(--color-accent-pink)",
          orange: "var(--color-accent-orange)",
          yellow: "var(--color-accent-yellow)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        ui: ["13px", { lineHeight: "19.5px", fontWeight: "400" }],
        smbody: ["15px", { lineHeight: "24px", fontWeight: "400" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        code: ["14px", { lineHeight: "24px", fontWeight: "400" }],
      },
      borderRadius: {
        sm: "2px",
        md: "4px",
        lg: "6px",
        xl: "12px",
        full: "9999px",
      },
      spacing: {
        1: "2px",
        2: "4px",
        2.5: "5px",
        3: "6px",
        4: "8px",
        5: "12px",
        6: "16px",
        7: "22px",
        8: "24px",
        9: "32px",
      },
    },
  },
  plugins: [],
};
