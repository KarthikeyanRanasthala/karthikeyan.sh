const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/components/**/*.{jsx,tsx}', './pages/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#121212',
        },
      },
    },
  },
  variants: {},
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        h1: { fontSize: config('theme.fontSize.5xl') },
        h2: { fontSize: config('theme.fontSize.4xl') },
        h3: { fontSize: config('theme.fontSize.3xl') },
        h4: { fontSize: config('theme.fontSize.2xl') },
        h5: { fontSize: config('theme.fontSize.xl') },
      });
    }),
  ],
};
