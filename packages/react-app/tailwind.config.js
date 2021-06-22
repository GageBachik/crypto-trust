/* eslint-disable global-require */
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['bumblebee', 'dracula'],
  },
};
