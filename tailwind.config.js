/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        // Custom NetSurf colors
        void: "#030304",
        space: "#0A0A0F",
        panel: "#111118",
        neon: {
          violet: "#6E5AFE",
          cyan: "#00C8C8",
          magenta: "#C81B8D",
          emerald: "#00D084",
        },
        text: {
          primary: "#F0F0F5",
          secondary: "#8A8AA0",
          muted: "#5A5A70",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        glow: "0 0 30px rgba(110,90,254,0.15)",
        'glow-lg': "0 0 60px rgba(110,90,254,0.3)",
        'neon-cyan': "0 0 40px rgba(0,200,200,0.2)",
        'btn-primary': "0 4px 20px rgba(110,90,254,0.4)",
        'btn-primary-hover': "0 6px 30px rgba(110,90,254,0.6)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "neon-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(110,90,254,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(110,90,254,0.5)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "status-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.3)", opacity: "0.6" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "slow-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-20%)" },
        },
        "particle-drift-1": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(20px, -30px)" },
          "50%": { transform: "translate(-10px, -15px)" },
          "75%": { transform: "translate(15px, 10px)" },
        },
        "particle-drift-2": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-25px, 20px)" },
          "50%": { transform: "translate(10px, 30px)" },
          "75%": { transform: "translate(-15px, -10px)" },
        },
        "particle-drift-3": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(30px, 15px)" },
          "66%": { transform: "translate(-20px, -25px)" },
        },
        "dot-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "neon-pulse": "neon-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "status-pulse": "status-pulse 2s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1s infinite",
        "slow-scroll": "slow-scroll 30s linear infinite",
        "particle-drift-1": "particle-drift-1 20s ease-in-out infinite",
        "particle-drift-2": "particle-drift-2 25s ease-in-out infinite",
        "particle-drift-3": "particle-drift-3 30s ease-in-out infinite",
        "dot-pulse": "dot-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
