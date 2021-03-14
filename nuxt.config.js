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
      {
        hid: 'description',
        name: 'description',
        content: '岡山大学電子計算機研究会は、パソコンを使ってプログラミングやDTMをしたり、電子工作や3Dプリンターなど "モノづくり" をしている部活です！部にはVRゴーグルやタブレットなどの機材があり、デバッグなども気軽にできます！また、電子工作のパーツや3Dプリンターなどもあるため、ハードルなく "モノづくり" の世界に入ることができます！そして、息抜きにはゲーム大会を開いたり、漫画を読むこともできます。岡大に入学して部活動・サークル選びに迷っている方は、ぜひ一度遊びに来てください！'
      },
      {name: 'google-site-verification', content: 'gUJca8xJ_QAdQ02BNBQRL7jCS53EgM8BWQZqA7zbSQU'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'apple-touch-icon', size: '180x180', href: '/apple-touch-icon.png'},
      /* Google Fonts */
      {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Roboto:wght@400;700&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~plugins/lazyload.js" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/google-fonts', {display: 'block', download: true, inject: true}],
    '@nuxtjs/google-gtag',
    'cookie-universal-nuxt'
  ],

  // Google Analytics
  'google-gtag': {
    id: 'G-7KXW9F58WD',
    dev: false
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    exclude: [
      /^\/articles/,
      /^\/members/,
      /^\/news/,
      /^\/health/
    ]
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {}
  },

  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    X_API_KEY: process.env.X_API_KEY
  }
}
