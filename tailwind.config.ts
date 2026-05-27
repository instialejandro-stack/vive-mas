import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f0faf2",
          100: "#dcf4e4",
          200: "#b8e8c8",
          300: "#84d3a0",
          400: "#4cb874",
          500: "#2f9e6d",
          600: "#247d58",
          700: "#1d6347",
          800: "#1a4f39",
          900: "#173f32",
          950: "#0c2920"
        },
        coral: {
          DEFAULT: "#e9785f",
          light: "#fde9e4",
          dark: "#934230"
        },
        honey: {
          DEFAULT: "#f4b860",
          light: "#fff2d6",
          dark: "#7d5614"
        },
        sky: {
          DEFAULT: "#5ba4cf",
          light: "#e7f3fb",
          dark: "#24536b"
        },
        mist: "#eef7f4",
        ink: "#16342d",
        cream: "#faf9f6"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["ui-serif", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 20px 50px rgba(22, 52, 45, 0.12)",
        card: "0 4px 20px rgba(22, 52, 45, 0.07)",
        glow: "0 0 0 4px rgba(47, 158, 109, 0.20)"
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        pulse: "pulse 2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
