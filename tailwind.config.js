module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {
      colors: {
        primary: '#262626',
        secondary: '#595959',
        subtext: '#A8A8A8',
        heading: '#BBBBBB',
        divider: '#DADADA',
        blockquote: '#F8F8F8',
        blockquoteSidebar: '#CACACA',
        highlight: '#F3F3F3',
        footer: '#3B3B3B',
      },
      fontSize: {
        h1: '1.8em',
        h2: '1.6em',
        h3: '1.4em',
        h4: '1.2em',
        h5: '1.0em',
        h6: '0.8em',
      },
      opacity: {
        90: '.9',
      },
      scale: {
        101: '1.01',
        103: '1.03',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
        120: '30rem',
      },
    },
  },
  variants: {
    extend: {
      border: ['hover'],
      text: ['sm'],
    },
  },
  plugins: [],
}
