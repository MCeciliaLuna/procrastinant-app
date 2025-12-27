import {presetTailwind} from '@tailwindcss/vite';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [presetTailwind],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      tablet: '768px',
      desktop: '1024px',
    },
    extend: {
      colors: {
        orange: '#ea9010ff',
        green: '#90be6dff',
        light: '#eaefbdff',
        lightsecondary: '#c9e3acff',
        dark: '#37371fff',
      },
      fontFamily: {
        primary: ['Mynerve-Regular', 'sans-serif'],
        secondary: ['CourierPrime-Regular', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '10px',
      },
      boxShadow: {
        DEFAULT: '0px -1px 21px -3px rgba(0,0,0,0.49)',
      },
    },
  },
  plugins: [],
};
