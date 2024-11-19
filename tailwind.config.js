/** @type {import('tailwindcss').Config} */
export default {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  content: [],
  theme: {
    colors:{
      'darkBlue': '#006aa3',
      'lightBlue': '#e0f2fe',
      'white': '#ffffff',
      'red': '#b91c1c',
      'green': '#15803d',
    },
    extend: {},
  },
  plugins: [],
}

