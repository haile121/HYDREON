/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        env: {
          50: "#f4f8f5",
          100: "#e5eee7",
          200: "#cedec4",
          300: "#a8c7b4",
          400: "#79a88e",
          500: "#52896c",
          600: "#3c6e54",
          700: "#305844",
          800: "#1b3b2b", // Deep natural green brand primary
          900: "#153023",
          950: "#0b1b13",
        },
        river: {
          50: "#f2f7fa",
          100: "#e1eef4",
          200: "#c8e0eb",
          300: "#9fc9de",
          400: "#6faaca",
          500: "#4c8db4",
          600: "#3a7298",
          700: "#2c4c5e", // Deep water slate brand secondary
          800: "#284656",
          900: "#243c4a",
        },
        paper: {
          50: "#fcfbf7", // Editorial warm off-white canvas
          100: "#f7f4ec",
          200: "#ece5d7",
          300: "#ddd2be",
          400: "#cabb9e",
        },
        borderNeutral: "#e2ded4",
        textMain: "#1a201c",
        textMuted: "#5a665e",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        card: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
        floating:
          "0 10px 25px -5px rgba(27,59,43,0.1), 0 8px 10px -6px rgba(27,59,43,0.05)",
      },
    },
  },
  plugins: [],
};
