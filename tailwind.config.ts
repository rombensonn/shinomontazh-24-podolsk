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
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        surface: "var(--color-surface)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "on-primary": "var(--color-on-primary)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        graphite: "var(--color-graphite)",
        warning: "var(--color-warning)",
        steel: "var(--color-steel)",
        concrete: "var(--color-concrete)",
      },
      boxShadow: {
        card: "0 12px 34px rgba(15, 23, 42, 0.08)",
        soft: "0 8px 24px rgba(15, 23, 42, 0.06)",
      },
      borderRadius: {
        card: "8px",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono-industrial)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
