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

      <ArticleContent :article="article" :timeUpdated="timeUpdated"
                      :category="article.category"
                      :series="article.series"/>

      <!---------------------------------------------------  メイン  --------------------------------------------------->


      <!--------------------------------------------------  サイドバー  ------------------------------------------------->

      <section v-if="article.name !== null"
               class="bg-white border-t lg:border-none border-divider pt-16 lg:pt-0 sm:px-16 md:px-24 lg:px-0 lg:shadow-xl">
        <div class="grid grid-cols-9 gap-4 mt-12">

          <!-- ▼ メンバーアイコン -->
          <NuxtLink :to="`/members/${article.name.id}`" class="col-span-4">
            <div v-if="article.name.avatar !== void(0)"
                 class="inline-block pl-8 row-end-2">
              <img
                :src="article.name.avatar.url"
                class="shadow-xl rounded-full w-32 lg:w-24 xl:w-32 h-32 lg:h-24 xl:h-32" alt="取得に失敗しました">
            </div>
            <div v-else>
              <img class="object-cover shadow-xl rounded-full w-32 lg:w-24 xl:w-32 h-32 lg:h-24 xl:h-32 m-auto"
                   src="@/assets/images/member.png" alt="メンバーアイコン">
            </div>
          </NuxtLink>
          <!-- ▲ メンバーアイコン -->


          <!-- ▼ SNSリンク -->
          <div class="col-span-5 inline-block mt-2 pr-8 lg:pr-5 pl-4 lg:pl-0 text-right lg:text-center">
            <p class="bg-highlight inline-block px-5 xl:px-6 py-1 rounded-lg text-secondary text-sm tracking-widest">
              {{ article.name.enteryear }}年度 入部
            </p>
            <div class="lg:text-left xl:pl-3 pr-1">
              <a v-if="article.name.twitter !== void(0)" target="_blank" rel="noopener noreferrer"
                 :href="`https://twitter.com/${article.name.twitter.replace(/@/g,'')}`">
                <img src="@/assets/images/sns-twitter.png" alt="Twitter"
                     class="inline mr-1 mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
              <a v-if="article.name.github !== void(0)" target="_blank" rel="noopener noreferrer"
                 :href="`https://github.com/${article.name.github.replace(/@/g,'')}`">
                <img src="@/assets/images/sns-github.png" alt="GitHub"
                     class="inline mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
              <a v-if="article.name.youtube !== void(0)" target="_blank" rel="noopener noreferrer"
                 :href="`https://www.youtube.com/user/${article.name.youtube}`">
                <img src="@/assets/images/sns-youtube.png" alt="YouTube"
                     class="inline ml-2 mt-4 w-6 xl:w-8 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
            </div>
          </div>
          <!-- ▲ SNSリンク -->

        </div>

        <!-- ▼ メンバー紹介 -->
        <div class="mt-3 xl:mt-6 mx-10 pb-8" v-if="article.name !== void(0)">
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
        <div v-if="otherArticles.contents !== void(0) && otherArticles.contents.length"
             class="pt-24 mx-8 sm:mx-10 text-center">
          <Title label="この人が書いた記事"/>
          <div v-for="otherArticle in otherArticles.contents" :key="`otherarticle-${otherArticle.id}`">
            <ArticleCard :href="`/articles/${otherArticle.id}`"
                         :category="otherArticle.category !== void(0) ? otherArticle.category.category : null" class="py-8"
                         :img-path="otherArticle.image !== void(0) ? otherArticle.image.url : null"
                         :description="otherArticle.title"
            />
          </div>
        </div>
        <!-- ▲ この人が書いた記事 -->

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
      otherArticles: 'No',
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
    /*一度目の処理*/
    return axios.get(`https://oucrc.microcms.io/api/v1/article/${params.id}`, {
      headers: {
        'X-API-KEY': '6d1b79a2-58de-49aa-bb5c-d2828e0d7d47'
      }
    }).then(response => {

      /*最終更新時間の取得*/
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
      const timeUpdated = new Date(response.data.updatedAt).toLocaleDateString('ja-JP', options)

      /*名前が取得できたとき*/
      if (response.data.name !== null) {

        /*二回目の処理*/
        return axios.get('https://oucrc.microcms.io/api/v1/article', {
          headers: {
            'X-API-KEY': '6d1b79a2-58de-49aa-bb5c-d2828e0d7d47'
          },
          params: {
            filters: `name[equals]${response.data.name.id}[and]id[not_equals]${response.data.id}`,
            limit: 4
          }

          /*二回目の処理のコールバック*/
        }).then(res => {

          /*返り値*/
          return {
            article: response.data,
            otherArticles: res.data,
            timeUpdated: timeUpdated
          }

          /*二回目の処理のエラーハンドリング*/
        }).catch(function (e) {
          console.log(e)
          error({
            statusCode: e.response.status,
            message: e.message
          })
        })
      }

      /*名前が取得できなかったときの処理*/
      else {
        return {
          article: response.data,
          timeUpdated: timeUpdated
        }
      }

      /*一回目の処理のエラーハンドリング*/
    }).catch(function (e) {
      console.log(e)
      error({
        statusCode: e.response.status,
        message: e.message
      })
    })
  }
}
</script>
