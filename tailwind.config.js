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
      'ruritania':['Ruritania'],
      'papyrus':['Papyrus'],
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
