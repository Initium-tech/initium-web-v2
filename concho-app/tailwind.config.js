/** Tailwind CSS 3 — misma paleta que conchoads/index.html, más colores por tema (variables CSS). */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'] },
      colors: {
        // Identidad Concho Ads (fija en ambos temas)
        gold: { DEFAULT: '#C7A74A', light: '#e0c96e', dark: '#A38531' },
        concho: { bg: '#0B1120', card: '#111827', accent: '#1F4D3A' },
        // Colores que cambian con el tema (ver src/css/input.css)
        page: 'rgb(var(--c-page) / <alpha-value>)',
        alt: 'rgb(var(--c-alt) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseRing: {
          '0%, 100%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '0.4' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(199, 167, 74, 0.3)' },
          '50%': { borderColor: 'rgba(199, 167, 74, 0.7)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-delay': 'float 4s ease-in-out 1s infinite',
        'float-delay2': 'float 4s ease-in-out 2s infinite',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
        'glow-border': 'borderGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
