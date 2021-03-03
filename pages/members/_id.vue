<template>
  <div class="container mx-auto lg:pt-16 px-10 sm:px-0">

    <OGPSetter
      :title="member.name"
      :description="member.status"
      :url="this.$route.path"
      :image="member.avatar !== void(0) ? member.avatar.url : null"
    />

    <!---------------------------------------------------  部員情報  --------------------------------------------------->

    <section class="bg-white pt-16 lg:pt-0">
      <div class="sm:grid grid-cols-9 md:grid-cols-10 gap-4 mt-20">
        <div class="col-span-4 grid grid-cols-10 gap-4">

          <!-- ▼ メンバーアイコン -->
          <div v-if="member.avatar !== void(0)" class="col-span-4 inline-block lg:pl-8 row-end-2">
            <img
              :src="member.avatar.url"
              class="shadow-xl rounded-full object-cover h-24 xl:h-32 w-24 xl:w-32" alt="取得に失敗しました">
          </div>
          <div v-else class="col-span-4 inline-block lg:pl-8 row-end-2">
            <img
              src="@/assets/images/member.png"
              class="shadow-xl rounded-full object-cover h-24 xl:h-32 w-24 xl:w-32" alt="メンバーアイコン">
          </div>
          <!-- ▲ メンバーアイコン -->


          <!-- ▼ SNSリンク -->
          <div class="col-span-6 inline-block mt-2 lg:pr-8 text-center">
            <p v-if="member.enteryear !== void(0)"
               class="bg-highlight inline-block px-6 py-1 rounded-lg text-secondary text-sm tracking-widest">
              {{ member.enteryear }}年度 入部
            </p>
            <div class="lg:text-left lg:pl-6 xl:pl-12">
              <a v-if="member.twitter !== void(0)" target="_blank" rel="noopener noreferrer"
                 :href="`https://twitter.com/${member.twitter.replace(/@/g,'')}`">
                <img src="@/assets/images/sns-twitter.png" alt="Twitter"
                     class="inline mr-1 mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
              <a v-if="member.github !== void(0)" target="_blank" rel="noopener noreferrer"
                 :href="`https://github.com/${member.github.replace(/@/g,'')}`">
                <img src="@/assets/images/sns-github.png" alt="GitHub"
                     class="inline mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
              <a v-if="member.youtube !== void(0)" target="_blank" rel="noopener noreferrer"
                 :href="`https://www.youtube.com/user/${member.youtube}`">
                <img src="@/assets/images/sns-youtube.png" alt="YouTube"
                     class="inline ml-2 mt-4 w-6 xl:w-8 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
            </div>
          </div>
          <!-- ▲ SNSリンク -->


          <!-- ▼ メンバー名 -->
          <div class="col-span-8 lg:col-start-2">
            <p v-if="member.name !== void(0)" class="font-bold text-3xl text-secondary tracking-widest">{{
                member.name
              }}</p>
            <p v-if="member.status !== void(0)" class="text-lg text-subtext tracking-widest">{{ member.status }}</p>
          </div>
          <!-- ▲ メンバー名 -->

        </div>

        <div class="col-span-5 md:col-span-6 sm:border-l-4 border-highlight mt-12 sm:mt-0 sm:px-12">

          <!-- ▼ 自己紹介 -->
          <div class="bg-primary font-bold inline-block py-2 px-8 text-center text-sm text-white tracking-widest">
            自己紹介
          </div>
          <p class="leading-8 mt-4 text-secondary tracking-widest">
            {{ member.intro !== void(0) ? member.intro :'なし' }}
          </p>
          <!-- ▲ 自己紹介 -->

        </div>
      </div>


      <!-- ▼ 自己紹介画像 -->
      <div v-if="member.introImage !== void(0)" class="my-32">
        <Title label="自己紹介画像" class="mb-10"/>
        <img
          :src="member.introImage.url"
          class="w-full" alt="取得に失敗しました">
      </div>
      <!-- ▲ 自己紹介画像 -->


      <!-- ▼ この人が書いた記事 -->
      <div v-if="articles.contents !== void(0) && articles.contents.length"
           class="pt-16 mb-24 mt-10 lg:mx-8 xl:mx-12 text-center">
        <div class="container mx-auto">
          <Title label="この人が書いた記事" class="mb-4"/>
          <div class="sm:grid grid-cols-3 gap-8">
            <ArticleCard
              v-for="article in articles.contents"
              :key="`articlecard-${article.id}`"
              class="py-6"
              :href="`/article/${article.id}`"
              :series="article.series != null ? article.series : {}"
              :category="article.category !== void(0) ? article.category.category : null"
              :img-path="article.image !== void(0) ? article.image.url : null"
              :title="article.title !== void(0) ? article.title : null"
              :description="article.body.replace(/<br>/g, '\n').replace(/<[^<>]+>/g, '')"/>
          </div>
        </div>
      </div>
      <!-- ▲ この人が書いた記事 -->

    </section>

    <!---------------------------------------------------  部員情報  --------------------------------------------------->

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      member: 'no data',
      articles: {
        contents: []
      }
    }
  },

  asyncData({params, error}) {

    /*一回目：メンバー情報の取得*/
    return axios.get(`https://oucrc.microcms.io/api/v1/member/${params.id}`, {
      headers: {
        'X-API-KEY': '6d1b79a2-58de-49aa-bb5c-d2828e0d7d47'
      }
      /*一回目のコールバック*/
    }).then(response => {
      console.log(response.data)

      /*メンバーのIDが取得出来た時*/
      if (response.data.id !== void (0)) {
        return axios.get('https://oucrc.microcms.io/api/v1/article', {
          headers: {
            'X-API-KEY': '6d1b79a2-58de-49aa-bb5c-d2828e0d7d47'
          },
          params: {
            limit: 10000,
            filters: `name[equals]${response.data.id}`
          }

          /*二回目のコールバック*/
        }).then(res => {
          console.log(res.data)
          return {
            member: response.data,
            articles: res.data
          }

          /*二回目の処理の例外処理*/
        }).catch(function (e) {
          console.log(e)
          error({
            statusCode: e.response.status,
            message: e.message
          })
        })
      }

      /*メンバーのIDが取得できなかったとき*/
      else {
        return {
          member: response.data
        }
      }
      /*一回目処理のの例外処理*/
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
