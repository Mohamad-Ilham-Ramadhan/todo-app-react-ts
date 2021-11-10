module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          'bright-blue': '#3a7bfd',
        },
        check: {
          'from': '#57ddff',
          'to': '#c058f3'
        },
        'light-theme': {
          'very-light-gray': '#fafafa',
          'very-light-grayish-blue': '#e4e5f1',
          'light-grayish-blue': '#d2d3db',
          'dark-grayish-blue': '#9394a5',
          'very-dark-grayish-blue': '#484b6a',
        },
        'dark-theme': {
          'very-dark-blue': '#161722',
          'very-dark-desaturated-blue': '#25273c',
          'light-grayish-blue': '#cacde8',
          'light-grayish-blue-hover': '#e4e5f1',
          'dark-grayish-blue': '#777a92',
          'very-dark-grayish-blue': '#4d5066',
          'darkest-grayish-blue': '#393a4c',
        }
      },
      backgroundImage: {
        'desktop-dark': "url('/images/bg-desktop-dark.jpg')",
        'desktop-light': "url('/images/bg-desktop-light.jpg')",
        'mobile-light': "url('/images/bg-mobile-light.jpg')",
        'mobile-light': "url('/images/bg-mobile-light.jpg')",
      },
      spacing: {
        '136': '34rem'
      },
      padding: {
        '13': '4.75rem',
      },
      fontSize: {
        '4xl': ['2.5rem', '2.75rem'],
      },
      borderWidth: {
        '1': '1px'
      }
    },
    fontFamily: {
      sans: ['Josefin Sans', 'sans-serif']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
