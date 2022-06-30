module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    fontFamily: {
      'nunito': ['nunito', 'sans-serif'],
      'MyFont': ['"My Font"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
    },
    underlineThickness: {
      'thin': '2px',
      'thick': '5px'
    },

    boxShadow: {
      error: "0 0 0 3px rgba(255, 40, 40, 0.5)",
      offset: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      offsetHover: "0 7px 7px rgba(0,0,0,0.25), 0 7px 7px rgba(0,0,0,0.22)",
    },
    textShadow: { // defaults to {}
      'default': '0 2px 2px rgba(0, 0, 0, 0.9)',
      'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
    },

    extend: {



        backgroundImage: {
         'loadingImage': "url('/img/loadingImage.svg')",
        },


      colors: {
        purple: "#250352",
        yellow: "#F1B33C",
        almostWhite: "#EDEDED",
        grey: "#707070",
        black: "#222222"
      },
      padding: {
        '1/3': '33.33333%',
        '1/2': '50%',
        '2/3': '66.666667%'
      },

      height: {
        h128: '32rem',
      },

      maxHeight: {
        h128: '32rem',
      }
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [require('@tailwindcss/typography'),
  require('tailwindcss-typography')({
    // all these options default to the values specified here
    ellipsis: true,         // whether to generate ellipsis utilities
    hyphens: true,          // whether to generate hyphenation utilities
    kerning: true,          // whether to generate kerning utilities
    textUnset: true,        // whether to generate utilities to unset text properties
    componentPrefix: 'c-',  // the prefix to use for text style classes
  }), require('tailwind-underline-utils')],


};
