<template>
  <div id="app">
    <div ref="parallax" class="parallax bg-no-repeat bg-center bg-cover h-full fixed left-0 top-0 w-full z-0"></div>

    <!-- ▼ ヒーローエリア -->
    <section class="bg-white h-64 relative">
      スライドショー
    </section>
    <!-- ▲ ヒーローエリア -->


    <!-- ▼ 電子計算機研究会とは -->
    <section class="bg-white border-t-2 py-32 relative w-full">
      <div class="container mx-auto">
        <div class="divide-y divide-divider mb-20 px-4 sm:px-24 md:px-40 lg:px-64 xl:px-96">
          <h2 class="font-bold mb-4 text-3xl sm:text-4xl text-center tracking-widest">電子計算機研究会とは</h2>
          <p class="pt-5 text-center sm:text-lg text-secondary tracking-widest">何をしているところなの？</p>
        </div>

        <div class="grid sm:grid-cols-3 gap-16 px-5">
          <ArticleCard href="/article?tag=programming" tag="プログラミング"
                       :img-path="require('@/assets/images/cover-programming.png')"
                       description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"></ArticleCard>
          <ArticleCard href="/article?tag=electronic" tag="電子工作"
                       :img-path="require('@/assets/images/cover-electronic.png')"
                       description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"></ArticleCard>
          <ArticleCard href="/article?tag=dtm" tag="DTM" :img-path="require('@/assets/images/cover-dtm.png')"
                       description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"></ArticleCard>
        </div>
        <p class="font-semibold leading-7 mt-20 text-center text-lg text-secondary tracking-widest">
          他にも、3Dモデルを作成したり<br class="sm:hidden">ゲーム大会を開いたりしています！
        </p>
      </div>
    </section>
    <!-- ▲ 電子計算機研究会とは -->


    <!-- ▼ 電算研の部室 -->
    <section class="relative w-full z-10" style="height: 83vh">
      <div class="container h-full relative mx-auto">
        <img class="oucrc-room-label absolute left-0" src="@/assets/images/oucrc-room-label.png" alt="電算研の部室">
        <a href="#">
          <img
            class="oucrc-room-button absolute right-0 shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out"
            src="@/assets/images/oucrc-room-button.png" alt="部室に何があるの？">
        </a>
      </div>
      <hr class="line">
    </section>
    <!-- ▲ 電算研の部室 -->


    <!-- ▼ お知らせ -->
    <section class="bg-white relative pt-20 md:py-20">
      <div class="grid grid-cols-1 md:grid-cols-3">
        <section class="col-span-1 image bg-red-500">
          test
        </section>
        <section class="col-span-1 md:col-span-2">
          <div class="text-3xl font-bold border-b-2 py-5 pl-5">お知らせ</div>
          <div v-for="notice in notices.contents" :key="notice.date + '-' + notice.createdAt" class="border-b-2 border-gray-300 text-gray-700">
            <a href="https://google.com">
                <div class="text-xl text-left py-5 pl-5">
                  {{notice.title.slice(0, 30)}}
                  <div class="text-right float-right pr-5">
                    &#9658;
                  </div>
                </div>
            </a>
          </div>
          <div class="py-5 pr-5">
            <a href="https://google.com">
              <button class="block font-bold text-xl text-gray-700" style="margin: 0 0 0 auto">もっとみる</button>
            </a>
          </div>
        </section>
      </div>
      <hr class="line md:hidden">
    </section>
    <!-- ▲ お知らせ -->


    <!-- ▼ お問い合わせ -->
    <section class="bg-white h-64 relative">
      <Contact/>
    </section>
    <!-- ▲ お問い合わせ -->


  </div>
</template>

<script>
import Contact from "~/components/Contact";
import axios from "axios";

export default {
  /*お知らせを取ってくる処理系統*/
  data(){
    return{
      notices: {
        contents: []
      },
      status: 'wait'
    }
  },
  asyncData(){
    return axios.get('https://oucrc.microcms.io/api/v1/news?' + Object.entries({
      limit: 3,
      fields: 'id,title',
      orders: '-date,-createdAt'
    }).map(([key, value]) => key + '=' + value).join('&'), {
      headers: {
        'X-API-KEY': '6d1b79a2-58de-49aa-bb5c-d2828e0d7d47'
      }
    }).then(response => {
      return {
        notices: response.data,
        status: 'success'
      }
    }).catch(function (e){
      console.log('Oops')
      console.log(e.response.status)
      return {
        notices: null,
        status: 'error'
      }
    })
  },

  components: {
    Contact
  },
  methods: {
    handleScroll() {
      this.$refs.parallax.style.top = (this.$refs.parallax.clientWidth < 640 ? 500 : 250) - (window.scrollY / 5) + 'px'
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.oucrc-room-label {
  height: 40vh;
  top: 5vh;
}

.oucrc-room-button {
  bottom: 5vh;
  height: 8vh;
}

.parallax {
  background-image: url(@/assets/images/oucrc-room.png)
}

.line{
  margin: 0 auto;
  @apply border-gray-600 border-solid border
}

</style>
