import type { Config } from "tailwindcss";
import * as tailwindAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  preffix: "",
  theme: {
    colors: {
      popred: {
        50: "#FDF7F7",
        100: "#FAEFEF",
        200: "#F5DCDB",
        300: "#EFC8C7",
        400: "#E9B5B4",
        500: "#E29998",
        600: "#D77674",
        700: "#C94542",
        800: "#AB3331",
        900: "#7F2624",
        950: "#5B1B1A",
      },
      popcream: {
        50: "#FDFCF7",
        100: "#FAF7EA",
        200: "#F5F0D6",
        300: "#ECE2B1",
        400: "#E2D388",
        500: "#D7C25B",
        600: "#C9B031",
        700: "#B09A2B",
        800: "#948124",
        900: "#6B5D1A",
        950: "#4A4112",
      },
      popteal: {
        50: "#F0FAFA",
        100: "#DDF3F4",
        200: "#B6E5E7",
        300: "#84D4D6",
        400: "#4BBFC3",
        500: "#36A1A5",
        600: "#287679",
        700: "#226567",
        800: "#1C5254",
        900: "#164041",
        950: "#0E292A",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      aspectRatio: {
        poster: "2 / 3",
      },
      spacing: {
        "1/3": "33.33333%",
        "2/3": "66.66667%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
