module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'duerergotisch': ['Duerer Gotisch'],
      'fell': ['Fell'],
      'gregorian': ['Gregorian'],
      'ruritania':['Ruritania']
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [],
}
