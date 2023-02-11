import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
  hooks: {
    'pages:extend'(pages) {
      pages.push(
        {
          path: '/articles/p/:p',
          file: resolve(__dirname, 'pages/articles/index.vue'),
          name: 'article',
        },
        {
          path: '/articles/category/:categoryId/:p?',
          file: resolve(__dirname, 'pages/articles/index.vue'),
          name: 'category',
        },
        {
          path: '/articles/series/:seriesId/:p?',
          file: resolve(__dirname, 'pages/articles/index.vue'),
          name: 'series',
        }
      )
    },
  },
  /**
   * ページ内容のキャッシュに有効期限を設定し、再ビルドを不要に
   * NetlifyでNext.jsのrevalidateに近い挙動を実現する
   * @see https://nuxt.com/docs/guide/concepts/rendering#route-rules
   */
  routeRules: {
    '/articles': { swr: 3600 },
    '/articles/**': { swr: 300 },
    '/news': { swr: 3600 },
    '/news/**': { swr: 300 },
  },
  css: ['/assets/css/index.scss'],
  app: {
    head: {
      title: 'OUCRC | 岡山大学電子計算機研究会',
      htmlAttrs: {
        lang: 'ja',
      },
      titleTemplate: '%s - OUCRC | 岡山大学電子計算機研究会',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            '岡山大学電子計算機研究会は、パソコンを使ってプログラミングやDTMをしたり、電子工作や3Dプリンターなど "モノづくり" をしている部活です！部にはVRゴーグルやタブレットなどの機材があり、デバッグなども気軽にできます！また、電子工作のパーツや3Dプリンターなどもあるため、ハードルなく "モノづくり" の世界に入ることができます！そして、息抜きにはゲーム大会を開いたり、漫画を読むこともできます。岡大に入学して部活動・サークル選びに迷っている方は、ぜひ一度遊びに来てください！',
        },
        {
          name: 'google-site-verification',
          content: 'gUJca8xJ_QAdQ02BNBQRL7jCS53EgM8BWQZqA7zbSQU',
        },
        {
          property: 'og:image',
          content:
            "'https://images.microcms-assets.io/assets/9db8326938b34b1381d6805cc5e10b04/e4434ebf7e8a426aaaa71f16dea02a74/cover.jpg'",
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
        },
        /* Google Fonts */
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Roboto:wght@400;700&display=swap',
        },
      ],
    },
  },

  modules: ['@nuxtjs/tailwindcss'],

  build: {
    // CommonJS警告が出たらここに追加すること
    transpile: ['vue3-particles'],
  },

  runtimeConfig: {
    MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN,
    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
    public: {
      GTAG_ID: process.env.GTAG_ID,
    },
  },
})
