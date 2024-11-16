import axios from 'axios'
import { sortRoutes } from '@nuxt/utils'
import _ from 'lodash'

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
        { headers, params: { depth: 0, orders: '-date' } },
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
      const news = await getAll(
        `${process.env.API_URL}/news`,
        { headers, params: { depth: 0 } },
        { throttle: 100 }
      )

      // TODO: これ route と一緒に payload も返すようにすれば N+1 問題解消できるのでは？
      // ↑を頑張ってやっています
      return [
        // 記事ページ
        ...articles.map(article => ({
          route: `/articles/${article.id}`,
          payload: {
            article,
            writer: members.find(member => member.id === article.name.id),
            recommendArticles: articles.filter(a => a.id !== article.id).slice(0, 4),
            articlesBySameWriter: articles.filter(a => a.name.id === article.name.id && a.id !== article.id).slice(0, 3),
          }
        })),
        // 記事一覧ページ (絞り込みなし1ページ目)
        {
          route: '/articles',
          payload: {
            currentPageNum: 1,
            maxPageNum: Math.ceil(articles.length / countPerPage),
            articles: articles.slice(0, countPerPage),
            categories: categories,
            series: series,
          },
        },
        // 記事一覧ページ (絞り込みなし)
        ..._.chunk(articles, countPerPage).map((chunkedArticles, i) => ({
          route: `/articles/p/${i + 1}`,
          payload: {
            currentPageNum: i + 1,
            maxPageNum: Math.ceil(articles.length / countPerPage),
            articles: chunkedArticles,
            categories: categories,
            series: series,
          },
        })),
        // カテゴリ別記事一覧ページ
        ..._.chain(categories)
          .map(category => [category.id, []])
          .fromPairs()
          .assign(_.chain(articles)
            .groupBy('category.id')
            .omit(undefined)
            .value()
          )
          .toPairs()
          .flatMap(([categoryId, articles]) => [
            {
              route: `/articles/category/${categoryId}`,
              payload: {
                currentPageNum: 1,
                maxPageNum: Math.ceil(articles.length / countPerPage),
                articles: articles.slice(0, countPerPage),
                categories: categories,
                series: series,
              },
            },
            ..._.chunk(articles, countPerPage).map((chunkedArticles, i) => ({
              route: `/articles/category/${categoryId}/${i + 1}`,
              payload: {
                currentPageNum: i + 1,
                maxPageNum: Math.ceil(articles.length / countPerPage),
                articles: chunkedArticles,
                categories: categories,
                series: series,
              },
            }))
          ])
          .value(),
        // シリーズ別記事一覧ページ
        ..._.chain(series)
          .map(aSeries => [aSeries.id, []])
          .fromPairs()
          .assign(_.chain(articles)
            .groupBy('series.id')
            .omit(undefined)
            .value()
          )
          .toPairs()
          .flatMap(([seriesId, articles]) => [
            {
              route: `/articles/series/${seriesId}`,
              payload: {
                currentPageNum: 1,
                maxPageNum: Math.ceil(articles.length / countPerPage),
                articles: articles.slice(0, countPerPage),
                categories: categories,
                series: series,
              },
            },
            ..._.chunk(articles, countPerPage).map((chunkedArticles, i) => ({
              route: `/articles/series/${seriesId}/${i + 1}`,
              payload: {
                currentPageNum: i + 1,
                maxPageNum: Math.ceil(articles.length / countPerPage),
                articles: chunkedArticles,
                categories: categories,
                series: series,
              },
            }))
          ])
          .value(),
        // メンバー一覧ページ
        {
          route: '/members',
          payload: {
            members
          }
        },
        // メンバー個別ページ
        ...members.map(member => ({
          route: `/members/${member.id}`,
          payload: {
            member: member,
            articles: articles.filter(article => article.name.id === member.id),
          }
        })),
        // お知らせ一覧ページ
        {
          route: '/news',
          payload: {
            notices: news,
          }
        },
        // お知らせ個別ページ
        ...news.map(news => ({
          route: `/news/${news.id}`,
          payload: news,
        })),
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
