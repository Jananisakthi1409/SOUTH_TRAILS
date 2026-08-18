/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'tt-pine': '#166534',
        'tt-pine-deep': '#14532d',
        'tt-pine-light': '#15803d',
        'tt-gold': '#15803d',
        'tt-gold-dim': 'rgba(21, 128, 61, 0.14)',
        'tt-blue': '#15803d',
        'tt-blue-hover': '#166534',
        'tt-rust': '#166534',
        'tt-cream': '#ffffff',
        'tt-cream-light': '#f8fafc',
        'tt-ink': '#1f2937',
        'tt-ink-soft': '#6b7280',
        'st-green': '#15803d',
        'st-green-dark': '#166534',
        'st-green-light': '#dcfce7',
        'st-green-soft': '#f0fdf4',
        'st-bg': '#f8fafc',
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
