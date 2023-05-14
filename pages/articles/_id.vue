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

import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
// import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'

/**
 * 設定不要でハイライト可能な言語一覧▼
 * @see https://github.com/wooorm/lowlight#syntaxes
 * もし上記以外に必要なら、以下のように追加できる
 */
import dart from 'highlight.js/lib/languages/dart'
import powershell from 'highlight.js/lib/languages/powershell'
const languages = { dart, powershell }

/**
 * HTMLをパースし、コードに適切なclassを付与する
 * 表示にはhighlight.jsのCSSが必要
 * HTMLにTeXを混ぜていてややこしいため、数式はクライアントサイドで描画する
 *
 * @see https://dev.classmethod.jp/articles/2020-04-15-conv-html-use-rehype/
 * @see https://github.com/rehypejs/rehype-highlight
 */
export async function parseHtml(html) {
  const parsed = await unified()
    // まずHTMLをパースする
    .use(rehypeParse, { fragment: true })
    // YouTubeのiframeを消してしまわないように
    // 以下のオプションだと中見が消えてしまうので保留
    // TODO: YouTubeに対応しつつサニタイズ
    // .use(rehypeSanitize, { tagNames: ['iframe'] })

    // コードにハイライトを適用する
    .use(rehypeHighlight, {
      detect: true,
      // デフォルト以外の検知可能言語を追加
      languages,
    })
    .use(rehypeStringify)
    .process(html)

  return parsed.toString()
}

/**
 * MarkdownをパースしてHTMLに
 * こちらなら言語をコードブロックで指定可能
 */
export async function parseMarkdown(markdown) {
  const parsed = await unified()
    // まずMDをパースする
    .use(remarkParse)
    // GFM (脚注や打ち消し線、テーブル、ToDoリスト)
    .use(remarkGfm)
    .use(remarkRehype)
    // コードにハイライトを適用する
    .use(rehypeHighlight, {
      detect: true,
      // デフォルト以外の検知可能言語を追加
      languages,
    })
    .use(rehypeStringify)
    .process(markdown)

  return parsed.toString()
}

/**
 * @returns MDが有効か
 * @param {Article} article
 */
function checkMarkdownEnabled(article) {
  return article.markdown_enabled && article.body_markdown && article.body_markdown.length > 0
}

/** 記事のbodyをパースして上書きする */
async function parseArticle(article) {
  let body = article.body
  let error = null
  const { body_markdown, body_html } = article

  if (checkMarkdownEnabled(article)) {
    try {
      body = await parseMarkdown(body_markdown)
    } catch (e) {
      console.error(e)
      error = JSON.stringify(e.message ?? e, null, '\t')
      body = body_markdown
    }
  } else if (body_html && body_html.length > 0) {
    try {
      body = await parseHtml(body_html)
    } catch (e) {
      console.error(e)
      error = JSON.stringify(e.message ?? e, null, '\t')
      body = body_html
    }
  }

  return {
    ...article,
    body,
    error,
  }
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
  asyncData({ params, error, $config, $dayjs }) {
    /*一度目の処理*/
    return axios
      .get(`${$config.API_URL}/article/${params.id}`, {
        headers: {
          'X-MICROCMS-API-KEY': $config.MICROCMS_API_KEY,
        },
      })
      .then(({ data: article }) => {
        /*最終更新時間*/
        const timeUpdated = $dayjs(article.updatedAt).format('YYYY/MM/DD')

        // 名前が取得できたとき
        if (article.name !== null) {
          // その他の記事を取得
          return axios
            .get(`${$config.API_URL}/article`, {
              headers: {
                'X-MICROCMS-API-KEY': $config.MICROCMS_API_KEY,
              },
              params: {
                filters: `name[equals]${article.name.id}[and]id[not_equals]${article.id}`,
                limit: 3,
              },

              /*二回目の処理のコールバック*/
            })
            .then(({ data: otherArticles }) => {
              // おすすめ記事取得
              return axios
                .get(`${$config.API_URL}/article`, {
                  headers: {
                    'X-MICROCMS-API-KEY': $config.MICROCMS_API_KEY,
                  },
                  params: {
                    filters: `id[not_equals]${article.id}`,
                    limit: 4,
                  },

                  // 三回目の処理のコールバック
                })
                .then(async ({ data: recommendArticles }) => {
                  const parsedArticle = await parseArticle(article)
                  return {
                    article: parsedArticle,
                    otherArticles,
                    recommendArticles,
                    timeUpdated,
                  }

                  //三回目の処理のエラーハンドリング
                })
                .catch(function (e) {
                  error({
                    statusCode: e.response?.status,
                    message: e.message,
                  })
                })

              //二回目の処理のエラーハンドリング
            })
            .catch(function (e) {
              error({
                statusCode: e.response?.status,
                message: e.message,
              })
            })
        } else {
          //名前が取得できなかったときの処理
          return {
            article,
            timeUpdated,
          }
        }

        //一回目の処理のエラーハンドリング
      })
      .catch(function (e) {
        error({
          statusCode: e.response?.status,
          message: e.message,
        })
      })
  },
}
</script>
