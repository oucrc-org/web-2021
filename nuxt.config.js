import axios from 'axios'
import { sortRoutes } from '@nuxt/utils'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: '/articles/p/:p',
          component: resolve(__dirname, 'pages/articles/index.vue'),
          name: 'article',
        },
        {
          path: '/articles/category/:categoryId/:p?',
          component: resolve(__dirname, 'pages/articles/index.vue'),
          name: 'category',
        },
        {
          path: '/articles/series/:seriesId/:p?',
          component: resolve(__dirname, 'pages/articles/index.vue'),
          name: 'series',
        }
      )
      sortRoutes(routes)
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
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
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        size: '180x180',
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/day.js' },
    { src: '~plugins/lazyload.js' },
    { src: '~plugins/content-parser.server.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/google-fonts', { display: 'block', download: true, inject: true }],
    '@nuxtjs/google-gtag',
    'cookie-universal-nuxt',
  ],

  // Google Analytics
  'google-gtag': {
    id: 'G-7KXW9F58WD',
    dev: false,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /**
     * パース系ライブラリはESMなので、そのままではdevサーバーで使用できない
     * スタンドアロンモードではサーバーサイドのバンドルに含めてしまう
     * generate後の動作は問題ない
     */
    standalone: true,
  },

  generate: {
    async routes() {
      const countPerPage = 9
      const headers = {
        'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY,
      }

      const articles = await getAll(
        `${process.env.API_URL}/article`,
        { headers, params: { depth: 0 } },
        { throttle: 100 }
      )
      const categories = await getAll(
        `${process.env.API_URL}/category`,
        { headers, params: { depth: 0 } },
        { throttle: 100 }
      )
      const series = await getAll(
        `${process.env.API_URL}/series`,
        { headers, params: { depth: 0 } },
        { throttle: 100 }
      )
      const members = await getAll(
        `${process.env.API_URL}/member`,
        { headers, params: { depth: 0 } },
        { throttle: 100 }
      )

      const countArticlesByCategory = new Map(categories.map(category => [category.id, 0]))
      const countArticlesBySeries = new Map(series.map(series => [series.id, 0]))

      articles.forEach(({category, series}) => {
        if (category) countArticlesByCategory[category.id]++
        if (series) countArticlesBySeries[series.id]++
      })

      // TODO: これ route と一緒に payload も返すようにすれば N+1 問題解消できるのでは？
      // ↑を頑張ってやっています
      return [
        // 記事ページ
        ...articles.map(article => ({
          route: `/articles/${article.id}`,
          payload: {
            article: article,
            recommendArticles: articles.slice(4)
            // FIXME: 執筆者情報が消え失せてるので渡してあげる
          }
        })),
        // FIXME: 記事一覧ページ (絞り込みなし)
        // ...[...range(0, Math.ceil(articles.length / countPerPage))].map((i) => ({
        //   route: `/articles/p/${i + 1}`,
        // })),
        // FIXME: カテゴリ別記事一覧ページ
        // ...categoryArray.map((key) => ({ route: `/articles/category/${key}` })),
        // FIXME: シリーズ別記事一覧ページ
        // ...seriesArray.map((key) => ({ route: `/articles/series/${key}` })),
        // FIXME: カテゴリ別記事一覧ページ (ページネーションあり版)
        // ...Object.entries(countArticlesByCategory)
        //   .map(([k, v]) => {
        //     return [...range(0, Math.ceil(v / countPerPage))].map((i) => ({
        //       route: `/articles/category/${k}/${i + 1}`,
        //     }))
        //   })
        //   .flat(),
        // FIXME: シリーズ別記事一覧ページ (ページネーションあり版)
        // ...Object.entries(countArticlesBySeries)
        //   .map(([k, v]) => {
        //     return [...range(0, Math.ceil(v / countPerPage))].map((i) => ({
        //       route: `/articles/series/${k}/${i + 1}`,
        //     }))
        //   })
        //   .flat(),
        // FIXME: メンバー一覧ページ
        // FIXME: メンバー個別ページ
        // FIXME: お知らせページ
      ]
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
  },

  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
  },
}

function* range(start, end, step = 1) {
  let x = start
  while (x < end) {
    yield x
    x += step
  }
}

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

async function runSequentilly(promiseFactories, { throttle = 0 }) {
  const res = []
  for (const promiseFactory of promiseFactories) {
    const running = promiseFactory()
    await sleep(throttle)
    // TODO: エラーハンドリング
    res.push(await running)
  }
  return res
}

async function getAll(url, { params, ...options }, { bulkLimit = 100, throttle = 0 }) {
  const { data: { totalCount } } = await axios.get(url, { ...options, params: { limit: 0 } })

  const offsets = Array.from(range(0, totalCount, bulkLimit))
  return Array.from(
    await runSequentilly(
      offsets.map(
        (offset) => async () =>
          axios.get(url, {
            ...options,
            params: {
              ...params,
              offset,
              limit: bulkLimit,
            },
          }).then(({ data }) => data.contents)
      ),
      { throttle }
    )
  ).flat()
}
