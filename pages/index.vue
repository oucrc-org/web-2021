<template>
  <div id="app">

    <OGPSetter
      :url="this.$route.path"
    />

    <div ref="parallax" class="parallax bg-no-repeat bg-center bg-cover h-full fixed left-0 top-16 w-full z-0"></div>

    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">

    <!-- ▼ ヒーローエリア -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <NuxtLink to="#" class="swiper-slide block">
          <img class="h-full object-cover w-full" style="object-position: 50% 100%"
               src="@/assets/images/swiper/sakura.jpg" alt="新歓のお知らせ">
        </NuxtLink>
        <NuxtLink to="news/lp3g8w6b4l3" class="swiper-slide block">
          <img class="h-full object-cover w-full" style="object-position: 50% 100%"
               src="@/assets/images/swiper/character.jpg" alt="電算研キャラクター">
        </NuxtLink>
      </div>
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-pagination swiper-pagination-white"></div>
    </div>

    <script>
      var swiper = new Swiper('.swiper-container', {
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        }
      })
    </script>
    <!-- ▲ ヒーローエリア -->


    <!-- ▼ 電子計算機研究会とは -->
    <section class="bg-white border-t-2 py-32 relative w-full">
      <div class="container mx-auto">
        <div class="divide-y divide-divider mb-20 px-4 sm:px-24 md:px-40 lg:px-64 xl:px-96">
          <h2 class="font-bold mb-4 text-3xl sm:text-4xl text-center tracking-widest">電子計算機研究会とは</h2>
          <p class="pt-5 text-center sm:text-lg text-secondary tracking-widest">何をしているところなの？</p>
        </div>

        <div class="grid sm:grid-cols-3 gap-16 px-5">
          <ArticleCard href="/article?category=noi18t4xa3" category="プログラミング"
                       :img-path="require('@/assets/images/cover-programming.png')"
                       description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"></ArticleCard>
          <ArticleCard href="/article?category=2_x0e6wfbu" category="電子工作"
                       :img-path="require('@/assets/images/cover-electronic.png')"
                       description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"></ArticleCard>
          <ArticleCard href="/article?category=dtm" category="DTM" :img-path="require('@/assets/images/cover-dtm.png')"
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
    </section>
    <!-- ▲ 電算研の部室 -->


    <!-- ▼ お知らせ -->
    <section class="bg-white relative pb-16 pt-10 lg:pt-20 lg:py-20 z-20">
      <div class="container mx-auto">
        <div class="lg:grid grid-cols-5 gap-20 px-6 sm:px-10 lg:px-0">
          <div class="col-span-2 image bg-red-500 hidden lg:block">キャラ</div>
          <div class="col-span-3">
            <News :notices="notices"/>
            <NuxtLink to="/news"
                      class="block font-semibold lg:pb-0 pt-5 pr-2 text-right text-secondary tracking-widest">
              もっとみる
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <!-- ▲ お知らせ -->


    <!-- ▼ お問い合わせ -->
    <section class="bg-white relative contact">
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
  data() {
    return {
      notices: {
        contents: []
      }
    }
  },
  head() {
    return {
      titleTemplate: null,
    }
  },
  asyncData() {
    const currentTime = new Date().toISOString()
    return axios.get('https://oucrc.microcms.io/api/v1/news?' + Object.entries({
      limit: 3,
      fields: 'id,title',
      orders: 'important,-date,-createdAt',
      filters: 'date[less_than]' + currentTime
    }).map(([key, value]) => key + '=' + value).join('&'), {
      headers: {
        'X-API-KEY': '6d1b79a2-58de-49aa-bb5c-d2828e0d7d47'
      }
    }).then(response => {
      return {
        notices: response.data
      }
    }).catch(function () {
      return {
        notices: null
      }
    })
  },
  components: {
    Contact
  },
  methods: {
    handleScroll() {
      this.$refs.parallax.style.top = (this.$refs.parallax.clientWidth < 640 ? 1200 : 900) - (window.scrollY / 2) + 'px'
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
.swiper-wrapper {
  height: 85vh;
}

@media (max-width: 1024px) {
  .swiper-wrapper {
    height: 65vh;
  }
}

@media (max-width: 768px) {
  .swiper-wrapper {
    height: 55vh;
  }
}

@media (max-width: 640px) {
  .swiper-wrapper {
    height: 45vh;
  }
}

.oucrc-room-label {
  height: 40vh;
  top: 5vh;
}

.oucrc-room-button {
  bottom: 5vh;
  height: 8vh;
}

.parallax {
  background-image: url(@/assets/images/oucrc-room.jpg)
}

@media (min-width: 768px) {
  .contact {
    height: 80vh;
  }
}
</style>
