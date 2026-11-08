import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ledger: "#F6F3EC",
        ivory: "#FDFBF7",
        stoneborder: "#DFD9CE",
        pine: {
          DEFAULT: "#1B3B2B",
          hover: "#12291E",
        },
        copper: {
          DEFAULT: "#B85D19",
          hover: "#9A4B11",
        },
        ink: "#191918",
        muted: "#656058",
      },
      boxShadow: {
        ledger: "0 16px 36px -14px rgba(27, 59, 43, 0.08), 0 0 0 1px rgba(223, 217, 206, 0.9)",
      },
    },
  },
  plugins: [],
};

export default config;
