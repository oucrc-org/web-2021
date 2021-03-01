<template>
  <div class="container mx-auto">
    <div class="lg:grid grid-cols-3 gap-8 xl:gap-12 lg:mt-16">

      <!---------------------------------------------------  メイン  --------------------------------------------------->

      <section class="bg-white lg:col-span-2 row-span-2 pb-16 lg:pb-0 lg:shadow-xl" :class="$style.article">

        <!-- ▼ トップ画像 -->
        <div v-if="typeof article.image !== 'undefined' && article.image !== 'null'">
          <img :src="article.image.url" :class="$style.article"/>
        </div>
        <div v-else>
          <img src="@/assets/images/cover.png" :class="$style.article"/>
        </div>
        <!-- ▲ トップ画像 -->


        <!-- ▼ タイトル -->
        <div class="font-bold mt-6 mx-8 sm:mx-16 text-5xl tracking-wider">
          {{ article.title.replace(/　/g, " ") }}
        </div>
        <!-- ▲ タイトル -->


        <!-- ▼ サブテキスト -->
        <div class="mb-16 mt-6 mx-8 sm:mx-16">
          <p v-if="article.name !== null" class="text-lg text-secondary tracking-widest">
            執筆者: {{ article.name.name }}
          </p>
          <p class="text-lg text-secondary tracking-widest">最終更新: {{ timeUpdated }}</p>
        </div>
        <!-- ▲ サブテキスト -->


        <!-- ▼ 記事本文 -->
        <span v-html="article.body" class="block leading-8 px-8 sm:px-16 text-lg tracking-wider"></span>
        <!-- ▲ 記事本文 -->

      </section>

      <!---------------------------------------------------  メイン  --------------------------------------------------->


      <!--------------------------------------------------  サイドバー  ------------------------------------------------->

      <section v-if="article.name !== null" class="bg-white border-t lg:border-none border-divider pt-16 lg:pt-0 sm:px-12 lg:px-0 lg:shadow-xl">
        <div class="grid grid-cols-10 gap-4 mt-12">

          <!-- ▼ メンバーアイコン -->
          <div class="col-span-4 inline-block pl-8 row-end-2">
            <img
              v-if="article.name.avatar !== null"
              :src="article.name.avatar.url"
              class="rounded-full" alt="仮">
          </div>
          <!-- ▲ メンバーアイコン -->


          <!-- ▼ SNSリンク -->
          <div class="col-span-6 inline-block mt-2 pr-8 text-center">
            <p class="bg-highlight inline-block px-6 py-1 rounded-lg text-secondary text-sm tracking-widest">
              {{ article.name.enteryear }}年度 入部
            </p>
            <div class="lg:text-left pl-1 xl:pl-6">
              <a v-if="article.name.twitter !== void(0)" :href="article.name.twitter">
                <img src="@/assets/images/sns-twitter.png" alt="Twitter"
                     class="inline mr-1 mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
              <a v-if="article.name.github !== void(0)" :href="article.name.github">
                <img src="@/assets/images/sns-github.png" alt="GitHub"
                     class="inline mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
              <a v-if="article.name.youtube !== void(0)" :href="article.name.youtube">
                <img src="@/assets/images/sns-youtube.png" alt="YouTube"
                     class="inline ml-2 mt-4 w-6 xl:w-8 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
            </div>
          </div>
          <!-- ▲ SNSリンク -->

        </div>

        <!-- ▼ メンバー紹介 -->
        <div class="mt-6 mx-10">
          <p v-if="article.name.name !== void(0)" class="font-bold text-3xl text-secondary tracking-widest">{{ article.name.name }}</p>
          <p v-if="article.name.status !== void(0)" class="leading-7 mt-4 text-secondary tracking-widest">
            {{ article.name.status }}
          </p>
        </div>
        <!-- ▲ メンバー情報 -->


        <!-- ▼ この人が書いた記事 -->
        <div class="pt-16 mx-8 sm:mx-10 text-center">
          <Title label="この人が書いた記事"/>
          <ArticleCard href="/article?tag=programming" tag="プログラミング" class="py-3"
                       :img-path="require('@/assets/images/cover-programming.png')"
                       description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"></ArticleCard>
        </div>
        <!-- ▲ この人が書いた記事 -->


        <!-- ▼ 最新の投稿 -->
        <div class="pt-16 mb-8 mx-8 sm:mx-10 text-center">
          <Title label="最新の投稿"/>
          <ArticleCard href="/article?tag=programming" tag="プログラミング" class="py-3"
                       :img-path="require('@/assets/images/cover-programming.png')"
                       description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"></ArticleCard>
        </div>
        <!-- ▲ 最新の投稿 -->

      </section>

      <!--------------------------------------------------  サイドバー  ------------------------------------------------->

    </div>

    <!---------------------------------------------------  スクリプト  -------------------------------------------------->

    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/androidstudio.min.css">
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

export default {
  data() {
    return {
      article: 'There are no data',
      timeUpdated: ''
    }
  },
  mounted() {
    this.renderMathJax()
  },
  methods: {
    renderMathJax() {
      if (window.MathJax) {
        window.MathJax.Hub.Config({
          TeX: {equationNumbers: {autoNumber: 'AMS'}},
          tex2jax: {
            inlineMath: [
              ['$', '$'],
              ['\\(', '\\)']
            ],
            processEscapes: true
          },
          'HTML-CSS': {matchFontHeight: false},
          displayAlign: 'center',
          displayIndent: '2em'
        })
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
      }
    },
  },
  asyncData({params, error}) {
    return axios.get(`https://oucrc.microcms.io/api/v1/article/${params.id}`, {
      headers: {
        'X-API-KEY': '6d1b79a2-58de-49aa-bb5c-d2828e0d7d47'
      }
    }).then(response => {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
      const timeUpdated = new Date(response.data.updatedAt).toLocaleDateString('ja-JP', options)
      console.log(response.data)
      return {
        article: response.data,
        timeUpdated: timeUpdated
      }
    }).catch(function (e) {
      console.log(e.response.status)
      error({
        statusCode: e.response.status,
        message: e.message
      })
    })
  }
}
</script>

<style>
.MathJax_Display {
  @apply overflow-x-scroll overflow-y-hidden
}
</style>

<style module>
.article img {
  @apply block m-auto w-full
}

.article h1 {
  @apply border-divider border-b-2 pb-3 pl-1 pt-5 text-h1
}

.article h2 {
  @apply pt-3 text-h2
}

.article h3 {
  @apply pt-1 text-h3
}

.article h4 {
  @apply text-h4
}

.article h5 {
  @apply text-h5
}

.article h6 {
  @apply text-h6
}

.article code {
  @apply overflow-scroll my-8 px-6 py-4 rounded-xl
}

.article blockquote {
  @apply p-2 bg-blockquote mb-4 border-l-8 border-blockquoteSidebar rounded pl-4
}

.article blockquote > p {
  @apply mb-0
}

.article ol {
  @apply list-decimal p-2
}

.article ul {
  @apply list-disc p-2
}

.article a {
  @apply text-blue-600
}

.article iframe {
  @apply block m-auto
}
</style>
