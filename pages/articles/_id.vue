<template>
  <div class="container mx-auto">
    <OGPSetter
      :title="article.title"
      :description="article.body"
      :url="this.$route.path"
      :image="typeof article.image !== 'undefined' ? article.image.url : null"
    />

    <div class="lg:grid grid-cols-3 gap-8 xl:gap-12 lg:mt-16 pb-10">
      <!---------------------------------------------------  メイン  --------------------------------------------------->

      <ArticleContent
        :article="article"
        :timeUpdated="timeUpdated"
        :category="article.category"
        :series="article.series"
      />

      <!---------------------------------------------------  メイン  --------------------------------------------------->

      <!--------------------------------------------------  サイドバー  ------------------------------------------------->

      <section
        v-if="article.name !== null"
        class="bg-white border-t lg:border-none border-divider pt-16 lg:pt-0 sm:px-16 md:px-24 lg:px-0 lg:shadow-xl"
      >
        <div class="grid grid-cols-9 gap-4 mt-12">
          <!-- ▼ メンバーアイコン -->
          <NuxtLink :to="`/members/${article.name.id}`" class="col-span-4">
            <div v-if="article.name.avatar !== void 0" class="inline-block pl-8 row-end-2">
              <picture>
                <source type="image/webp" :srcset="`${article.name.avatar.url}?fm=webp&w=128`" />
                <img
                  :src="`${article.name.avatar.url}?w=128`"
                  class="shadow-xl rounded-full w-32 lg:w-24 xl:w-32 h-32 lg:h-24 xl:h-32"
                  alt="取得に失敗しました"
                />
              </picture>
            </div>
            <div v-else>
              <picture>
                <source type="image/webp" :srcset="require('@/assets/images/member/member.webp')" />
                <img
                  class="object-cover shadow-xl rounded-full w-32 lg:w-24 xl:w-32 h-32 lg:h-24 xl:h-32 m-auto"
                  v-lazy="require('@/assets/images/member/member.jpg')"
                  alt="メンバーアイコン"
                />
              </picture>
            </div>
          </NuxtLink>
          <!-- ▲ メンバーアイコン -->

          <!-- ▼ SNSリンク -->
          <div
            class="col-span-5 inline-block mt-2 pr-8 lg:pr-5 pl-4 lg:pl-0 text-right lg:text-center"
          >
            <p
              class="bg-highlight inline-block px-5 xl:px-6 py-1 rounded-lg text-secondary text-sm tracking-widest"
            >
              {{ article.name.enteryear }}年度 入部
            </p>
            <div class="lg:text-left xl:pl-3 pr-1">
              <a
                v-if="article.name.twitter !== void 0"
                target="_blank"
                rel="noopener noreferrer"
                :href="`https://twitter.com/${article.name.twitter.replace(/@/g, '')}`"
              >
                <img
                  v-lazy="require('@/assets/images/member/sns-twitter.png')"
                  alt="Twitter"
                  class="inline mr-1 mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out"
                />
              </a>
              <a
                v-if="article.name.github !== void 0"
                target="_blank"
                rel="noopener noreferrer"
                :href="`https://github.com/${article.name.github.replace(/@/g, '')}`"
              >
                <img
                  v-lazy="require('@/assets/images/member/sns-github.png')"
                  alt="GitHub"
                  class="inline mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out"
                />
              </a>
              <a
                v-if="article.name.youtube !== void 0"
                target="_blank"
                rel="noopener noreferrer"
                :href="`https://www.youtube.com/channel/${article.name.youtube}`"
              >
                <img
                  v-lazy="require('@/assets/images/member/sns-youtube.png')"
                  alt="YouTube"
                  class="inline ml-2 mt-4 w-6 xl:w-8 transform hover:scale-110 transition duration-200 ease-in-out"
                />
              </a>
            </div>
          </div>
          <!-- ▲ SNSリンク -->
        </div>

        <!-- ▼ メンバー紹介 -->
        <div class="mt-3 xl:mt-6 mx-10 pb-8" v-if="article.name !== void 0">
          <p class="font-bold text-3xl text-secondary tracking-widest">
            <NuxtLink :to="`/members/${article.name.id}`">
              {{ article.name.name }}
            </NuxtLink>
          </p>
          <p class="leading-7 mt-1 text-secondary tracking-widest">
            <NuxtLink :to="`/members/${article.name.id}`">
              {{ article.name.status }}
            </NuxtLink>
          </p>
        </div>
        <!-- ▲ メンバー情報 -->

        <!-- ▼ この人が書いた記事 -->
        <div
          v-if="otherArticles.contents !== void 0 && otherArticles.contents.length"
          class="pt-24 mx-8 sm:mx-10 text-center"
        >
          <Title label="この人が書いた記事" />
          <div
            v-for="otherArticle in otherArticles.contents"
            :key="`otherarticle-${otherArticle.id}`"
          >
            <ArticleCard
              :href="`/articles/${otherArticle.id}`"
              :category="otherArticle.category !== null ? otherArticle.category.category : null"
              class="py-8"
              :img-path="otherArticle.image !== void 0 ? otherArticle.image.url : null"
              :description="otherArticle.title"
              :img-max-width="575"
            />
          </div>
        </div>
        <!-- ▲ この人が書いた記事 -->

        <!-- ▼ 最新のオススメ記事 -->
        <div
          v-if="recommendArticles.contents !== void 0 && recommendArticles.contents.length"
          class="pt-24 mx-8 sm:mx-10 text-center"
        >
          <Title label="最新のオススメ記事" />
          <div
            v-for="otherArticle in recommendArticles.contents"
            :key="`otherarticle-${otherArticle.id}`"
          >
            <ArticleCard
              :href="`/articles/${otherArticle.id}`"
              :category="otherArticle.category !== null ? otherArticle.category.category : null"
              class="py-8"
              :img-path="otherArticle.image !== void 0 ? otherArticle.image.url : null"
              :description="otherArticle.title"
              :img-max-width="575"
            />
          </div>
        </div>
        <!-- ▲ 最新のオススメ記事 -->
      </section>

      <!--------------------------------------------------  サイドバー  ------------------------------------------------->
    </div>

    <!---------------------------------------------------  スクリプト  -------------------------------------------------->

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/androidstudio.min.css"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"></script>
    <script>
      window.setTimeout(function () {
        hljs.initHighlighting()
      }, 1000)
    </script>

    <!---------------------------------------------------  スクリプト  -------------------------------------------------->
  </div>
</template>

<script>
import axios from 'axios'

/**
 * @returns MDが有効か
 * @param {Article} article
 */
function checkMarkdownEnabled(article) {
  return article.markdown_enabled && article.body_markdown && article.body_markdown.length > 0
}

function logParseError(config, article, field) {
  const editUrl = config.API_URL.replace(/\/v1/, 's/article/') + article.id
  console.error(`以下の記事は${field}がパースできないため修正してください: ${editUrl}`)
}

export default {
  data() {
    return {
      article: 'There are no data',
      otherArticles: 'No',
      recommendArticles: 'No',
      timeUpdated: '',
    }
  },
  computed: {
    isMarkdown() {
      return checkMarkdownEnabled(this.article)
    },
  },
  mounted() {
    this.renderMathJax()
  },
  methods: {
    renderMathJax() {
      if (window.MathJax) {
        window.MathJax.Hub.Config({
          TeX: { equationNumbers: { autoNumber: 'AMS' } },
          tex2jax: {
            inlineMath: [
              ['$', '$'],
              ['\\(', '\\)'],
            ],
            processEscapes: true,
          },
          'HTML-CSS': { matchFontHeight: false },
          displayAlign: 'center',
          displayIndent: '2em',
        })
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
      }
    },
  },
  async asyncData({ params, error, $config, $dayjs, $contentParser }) {
    /** 記事のbodyをパースして上書きする */
    async function parseArticle(article) {
      let body = article.body
      const { body_markdown, body_html } = article
      if (checkMarkdownEnabled(article)) {
        try {
          body = await $contentParser(body_markdown, { isMarkdown: true })
        } catch (e) {
          console.error(e)
          logParseError($config, article, 'MD')
          body = body_markdown
        }
      } else if (body_html && body_html.length > 0) {
        // 新リッチエディタ
        try {
          body = await $contentParser(body_html)
        } catch (e) {
          console.error(e)
          logParseError($config, article, '新リッチエディタ')
          body = body_html
        }
      } else {
        // 旧リッチエディタ
        try {
          body = await $contentParser(body)
        } catch (e) {
          console.error(e)
          logParseError($config, article, '旧リッチエディタ')
        }
      }

      return {
        ...article,
        body,
      }
    }

    let isAbortedThisFn = false
    const headerAxios = {
      headers: {
        'X-MICROCMS-API-KEY': $config.MICROCMS_API_KEY,
      },
    }

    // 記事が直接持つ（参照の内容以外の）情報を取得
    const { data: article } = await axios
      .get(`${$config.API_URL}/article/${params.id}`, { ...headerAxios })
      .catch((e) => {
        isAbortedThisFn = true
        error({
          statusCode: e.response?.status,
          message: e.message,
        })
      })
    if (isAbortedThisFn) return // XXX: これ undefined を return していいの？

    // 最終更新時間
    const timeUpdated = $dayjs(article.updatedAt).format('YYYY/MM/DD')

    // 名前が取得できなかったときの処理
    if (article.name === null) {
      return {
        article,
        timeUpdated,
      }
    }

    // 同じ作者のその他の記事を取得
    const { data: otherArticles } = await axios
      .get(`${$config.API_URL}/article`, {
        ...headerAxios,
        params: {
          filters: `name[equals]${article.name.id}[and]id[not_equals]${article.id}`,
          limit: 3,
        },
      })
      .catch((e) => {
        isAbortedThisFn = true
        error({
          statusCode: e.response?.status,
          message: e.message,
        })
      })
    if (isAbortedThisFn) return // XXX: これ undefined を return していいの？

    // おすすめ（新着）記事を取得
    const { data: recommendArticles } = await axios
      .get(`${$config.API_URL}/article`, {
        ...headerAxios,
        params: {
          filters: `id[not_equals]${article.id}`,
          limit: 4,
        },
      })
      .catch((e) => {
        isAbortedThisFn = true
        error({
          statusCode: e.response?.status,
          message: e.message,
        })
      })
    if (isAbortedThisFn) return // XXX: これ undefined を return していいの？

    const parsedArticle = await parseArticle(article)
    return {
      article: parsedArticle,
      otherArticles,
      recommendArticles,
      timeUpdated,
    }
  },
}
</script>
