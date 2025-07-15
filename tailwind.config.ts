
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'cinematic': ['Cairo', 'Tajawal', 'Bebas Neue', 'Oswald', 'Arial Black', 'sans-serif'],
        'arabic': ['Cairo', 'Tajawal', 'Amiri', 'Oswald', 'Arial Black', 'sans-serif'],
        'sans': ['Cairo', 'Tajawal', 'Oswald', 'Bebas Neue', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.7rem', { lineHeight: '1.4' }],
        'sm': ['0.8rem', { lineHeight: '1.5' }],
        'base': ['0.9rem', { lineHeight: '1.6' }],
        'lg': ['1rem', { lineHeight: '1.6' }],
        'xl': ['1.1rem', { lineHeight: '1.5' }],
        '2xl': ['1.3rem', { lineHeight: '1.4' }],
        '3xl': ['1.6rem', { lineHeight: '1.3' }],
        '4xl': ['1.9rem', { lineHeight: '1.2' }],
        '5xl': ['2.1rem', { lineHeight: '1.1' }],
        '6xl': ['2.5rem', { lineHeight: '1' }],
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
        // Updated theme colors to match the turquoise design
        'turquoise': {
          50: 'hsl(189 100% 96%)',
          100: 'hsl(189 90% 90%)',
          200: 'hsl(189 85% 80%)',
          300: 'hsl(189 80% 70%)',
          400: 'hsl(189 75% 60%)',
          500: 'hsl(189 100% 42%)',
          600: 'hsl(189 100% 35%)',
          700: 'hsl(189 100% 28%)',
          800: 'hsl(189 100% 20%)',
          900: 'hsl(189 100% 15%)',
        },
        'orange-accent': {
          50: 'hsl(45 100% 95%)',
          100: 'hsl(45 100% 85%)',
          200: 'hsl(45 100% 75%)',
          300: 'hsl(45 100% 70%)',
          400: 'hsl(45 100% 65%)',
          500: 'hsl(45 100% 60%)',
          600: 'hsl(45 100% 50%)',
          700: 'hsl(45 100% 40%)',
          800: 'hsl(45 100% 30%)',
          900: 'hsl(45 100% 20%)',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
