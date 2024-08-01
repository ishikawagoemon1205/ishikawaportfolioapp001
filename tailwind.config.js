/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      'white': '#EFEFF0',
      'BGwhite': '#F2F2F2',
      'gray': '#BABABA',
      'Lgray': '#FBFBFB',
      'Dgray': '#2b2b2b',
      'black': '#000000',
      'green': '#35F2DF',
      'blue': '#0B8AFF',
      'Lblue': '#00E0FF',
      'Dblue': '#1400F9',
      'Dblue': '#300bff',
      'purple': '#e00f90',
      'red': '#FF4858',
    },
    extend: {},
  },
  plugins: [],
}

