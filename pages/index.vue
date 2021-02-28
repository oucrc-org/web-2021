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
          <ArticleCard tag="プログラミング" :img-path="require('@/assets/images/cover-programming.png')"
                       description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"></ArticleCard>
          <ArticleCard tag="電子工作" :img-path="require('@/assets/images/cover-electronic.png')"
                       description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"></ArticleCard>
          <ArticleCard tag="DTM" :img-path="require('@/assets/images/cover-dtm.png')"
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
            class="oucrc-room-button absolute right-0 shadow-2xl transform hover:scale-102 transition duration-500 ease-in-out"
            src="@/assets/images/oucrc-room-button.png" alt="部室に何があるの？">
        </a>
      </div>
    </section>
    <!-- ▲ 電算研の部室 -->


    <!-- ▼ お知らせ -->
    <section class="bg-red-300 h-64 relative">
      お知らせ
    </section>
    <!-- ▲ お知らせ -->


    <!-- ▼ お問い合わせ -->
    <section class="bg-white h-64 relative">
      お問い合わせ
    </section>
    <!-- ▲ お問い合わせ -->


  </div>
</template>

<script>
export default {
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
</style>
