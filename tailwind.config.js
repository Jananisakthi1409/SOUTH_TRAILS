/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'tt-pine': '#07110f',
        'tt-pine-deep': '#030a0c',
        'tt-pine-light': '#12302d',
        'tt-gold': '#f0c94a',
        'tt-gold-dim': 'rgba(240, 201, 74, 0.22)',
        'tt-blue': '#2f7dd3',
        'tt-blue-hover': '#3d8ee9',
        'tt-rust': '#c8440a',
        'tt-cream': '#f5efe6',
        'tt-cream-light': '#fffaf4',
        'tt-ink': '#1a0a00',
        'tt-ink-soft': '#6b5f55',
      },
      fontFamily: {
        display: ['"Yatra One"', "Georgia", "serif"],
        sans: ['"DM Sans"', "Inter", "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        luxury: "0 30px 100px rgba(0, 0, 0, 0.36)",
        glow: "0 0 46px rgba(240, 201, 74, 0.22)",
      },
      keyframes: {
        floatCard: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        lineRise: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "100%": { transform: "scaleY(1)", transformOrigin: "top" },
        },
      },
      animation: {
        "float-card": "floatCard 6s ease-in-out infinite",
        "line-rise": "lineRise 700ms ease-out both",
      },
    },
  },
  plugins: [],
};
