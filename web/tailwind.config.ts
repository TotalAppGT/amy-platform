import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08070B",
        surface: "#100E15",
        raised: "#17141D",
        line: "rgba(255,255,255,0.08)",
        cream: "#F5F1EA",
        muted: "#B9B3C4",
        rose: "#FF4D8D",
        roseDeep: "#C2185B",
        blush: "#FF9DBF",
        gold: "#E9C46A",
        lilac: "#B79CFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(255,77,141,0.45)",
        card: "0 24px 60px -30px rgba(0,0,0,0.9)",
      },
      opacity: {
        12: "0.12",
        15: "0.15",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        65: "0.65",
        85: "0.85",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "fade-up": "fade-up .7s ease-out both",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
