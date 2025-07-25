
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
        'xs': ['0.7rem', { lineHeight: '1.4' }], // Reduced from 0.75rem
        'sm': ['0.8rem', { lineHeight: '1.5' }], // Reduced from 0.875rem
        'base': ['0.9rem', { lineHeight: '1.6' }], // Reduced from 1rem
        'lg': ['1rem', { lineHeight: '1.6' }], // Reduced from 1.125rem
        'xl': ['1.1rem', { lineHeight: '1.5' }], // Reduced from 1.25rem
        '2xl': ['1.3rem', { lineHeight: '1.4' }], // Reduced from 1.5rem
        '3xl': ['1.6rem', { lineHeight: '1.3' }], // Reduced from 1.875rem
        '4xl': ['1.9rem', { lineHeight: '1.2' }], // Reduced from 2.25rem
        '5xl': ['2.1rem', { lineHeight: '1.1' }], // Reduced from 2.5rem
        '6xl': ['2.5rem', { lineHeight: '1' }], // Reduced from 3rem
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
        // New theme colors
        'soft-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'mint': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
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
