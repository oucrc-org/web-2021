export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    linkActiveClass: 'active'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'OUCRC | 岡山大学電子計算機研究会',
    htmlAttrs: {
      lang: 'ja'
    },
    titleTemplate: '%s - OUCRC | 岡山大学電子計算機研究会',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'google-site-verification', content: 'gUJca8xJ_QAdQ02BNBQRL7jCS53EgM8BWQZqA7zbSQU'},

      { hid: 'description', name: 'description', content: ''},
      { hid: 'og:site_name', property: 'og:site_name', content: 'OUCRC | 岡山大学電子計算機研究会' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://example.com' },
      { hid: 'og:title', property: 'og:title', content: 'OUCRC | 岡山大学電子計算機研究会' },
      { hid: 'og:description', property: 'og:description', content: '' },
      { hid: 'og:image', property: 'og:image', content: '@/assets/images/cover.png' },
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'apple-touch-icon', size: '180x180', href: '/apple-touch-icon.png'},
      /* Google Fonts */
      {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
      }
    ],
    script: [
      {src: 'https://polyfill.io/v3/polyfill.min.js?features=es6', mode: 'client'},
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics'
  ],

  // Google Analytics
  googleAnalytics: {
    id: 'G-7KXW9F58WD',
    dev: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {}
  },
}
