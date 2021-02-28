module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        'primary': '#262626',
        'secondary': '#595959',
        'divider': '#DADADA',
        'blockquote': '#F8F8F8',
        'blockquoteSidebar': '#CACACA',

        'highlight': '#F3F3F3'
      },
      fontSize: {
        'h1': '1.8em',
        'h2': '1.6em',
        'h3': '1.4em',
        'h4': '1.2em',
        'h5': '1.0em',
        'h6': '0.8em',
      },
      scale: {
        '101': '1.01'
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      }
    },
  },
  variants: {
    extend: {
      border: ['hover']
    }
  },
  plugins: [],
}
