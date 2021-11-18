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
        'mobile-dark': "url('/images/bg-mobile-dark.jpg')",
        'mobile-light': "url('/images/bg-mobile-light.jpg')",
      },
      spacing: {
        '4.5': '1.125rem',
        '124': '31rem'
      },
      padding: {
        '13': '4.75rem',
      },
      fontSize: {
        'xs': '.65rem',
        'sm': '.8rem',
        '2.5xl': ['1.65rem', '1.8rem'],
        '3.5xl': ['2.25rem', '2.5rem'],
        '4xl': ['2.5rem', '2.75rem'],
      },
      borderWidth: {
        '1': '1px'
      },
      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(77, 80, 102, 0.25)',
      },
      letterSpacing: {
        'title-mobile': '.55rem',
        'title-desktop': '.75rem',
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
