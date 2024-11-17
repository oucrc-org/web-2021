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
        :category="
          article.category !== null
            ? categories.find(category => category.id === article.category.id) ?? null
            : null"
        :series="article.series"
      />

      <!---------------------------------------------------  メイン  --------------------------------------------------->

      <!--------------------------------------------------  サイドバー  ------------------------------------------------->

      <section
        v-if="writer !== null"
        class="bg-white border-t lg:border-none border-divider pt-16 lg:pt-0 sm:px-16 md:px-24 lg:px-0 lg:shadow-xl"
      >
        <div class="grid grid-cols-9 gap-4 mt-12">
          <!-- ▼ メンバーアイコン -->
          <NuxtLink :to="`/members/${writer.id}`" class="col-span-4">
            <div v-if="writer.avatar !== void 0" class="inline-block pl-8 row-end-2">
              <picture>
                <source type="image/webp" :srcset="`${writer.avatar.url}?fm=webp&w=128`" />
                <img
                  :src="`${writer.avatar.url}?w=128`"
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
              {{ writer.enteryear }}年度 入部
            </p>
            <div class="lg:text-left xl:pl-3 pr-1">
              <a
                v-if="writer.twitter !== void 0"
                target="_blank"
                rel="noopener noreferrer"
                :href="`https://twitter.com/${writer.twitter.replace(/@/g, '')}`"
              >
                <img
                  v-lazy="require('@/assets/images/member/sns-twitter.png')"
                  alt="Twitter"
                  class="inline mr-1 mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out"
                />
              </a>
              <a
                v-if="writer.github !== void 0"
                target="_blank"
                rel="noopener noreferrer"
                :href="`https://github.com/${writer.github.replace(/@/g, '')}`"
              >
                <img
                  v-lazy="require('@/assets/images/member/sns-github.png')"
                  alt="GitHub"
                  class="inline mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out"
                />
              </a>
              <a
                v-if="writer.youtube !== void 0"
                target="_blank"
                rel="noopener noreferrer"
                :href="`https://www.youtube.com/channel/${writer.youtube}`"
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
        <div class="mt-3 xl:mt-6 mx-10 pb-8" v-if="writer !== void 0">
          <p class="font-bold text-3xl text-secondary tracking-widest">
            <NuxtLink :to="`/members/${writer.id}`">
              {{ writer.name }}
            </NuxtLink>
          </p>
          <p class="leading-7 mt-1 text-secondary tracking-widest">
            <NuxtLink :to="`/members/${writer.id}`">
              {{ writer.status }}
            </NuxtLink>
          </p>
        </div>
        <!-- ▲ メンバー情報 -->

        <!-- ▼ この人が書いた記事 -->
        <div
          v-if="otherArticles !== void 0 && otherArticles.length"
          class="pt-24 mx-8 sm:mx-10 text-center"
        >
          <Title label="この人が書いた記事" />
          <div
            v-for="otherArticle in otherArticles"
            :key="`otherarticle-${otherArticle.id}`"
          >
            <ArticleCard
              :href="`/articles/${otherArticle.id}`"
              :category="
                otherArticle.category !== null
                  ? categories.find(category => category.id === otherArticle.category.id) ?? null
                  : null"
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
          v-if="recommendArticles !== void 0 && recommendArticles.length"
          class="pt-24 mx-8 sm:mx-10 text-center"
        >
          <Title label="最新のオススメ記事" />
          <div
            v-for="otherArticle in recommendArticles"
            :key="`otherarticle-${otherArticle.id}`"
          >
            <ArticleCard
              :href="`/articles/${otherArticle.id}`"
              :category="
                otherArticle.category !== null
                  ? categories.find(category => category.id === otherArticle.category.id) ?? null
                  : null" class="py-8"
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
      article: undefined,
      writer: undefined,
      otherArticles: [],
      recommendArticles: [],
      categories: [],
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
  async asyncData({ payload, params, error, $config, $dayjs, $contentParser }) {
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

    // 記事が直接持つ（参照の内容以外の）情報を取得
    const article = payload.article;
    const parsedArticle = await parseArticle(article)

    // 記事の作者
    const writer = payload.writer;
    parsedArticle.name = writer;

    // 最終更新時間
    const timeUpdated = $dayjs(article.updatedAt).format('YYYY/MM/DD')

    // 同じ作者のその他の記事を最新から3件取得
    const otherArticles = payload.articlesBySameWriter;

    // おすすめ（新着）記事を取得
    const recommendArticles = payload.recommendArticles;

    return {
      article: parsedArticle,
      writer,
      otherArticles,
      recommendArticles,
      timeUpdated,
      categories: payload.categories,
    }
  },
}
</script>
