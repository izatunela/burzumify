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
      'old-london':['Old London'],
      'papyrus':['Papyrus'],
      'ruritania':['Ruritania'],
      'times-new-roman':['Times New Roman']
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
