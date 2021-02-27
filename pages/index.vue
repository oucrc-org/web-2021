<template>
  <div id="app">
    <div class="parallax bg-no-repeat bg-center bg-cover h-full fixed left-0 top-0 w-full z-0"></div>

    <!-- ▼ ヒーローエリア -->
    <section class="bg-white h-64 relative">
      <br><br><br>スライドショー
    </section>
    <!-- ▲ ヒーローエリア -->


    <!-- ▼ 電子計算機研究会とは -->
    <section class="bg-red-300 h-64 relative w-full">
      <div class="container mx-auto">
        電子計算機研究会とは
      </div>
    </section>
    <!-- ▲ 電子計算機研究会とは -->


    <!-- ▼ 電算研の部室 -->
    <section class="relative w-full z-10" style="height: 76vh">
      <div class="container h-full relative mx-auto">
        <img class="oucrc-room-label absolute left-0" src="~/assets/images/oucrc-room-label.png" alt="電算研の部室">
        <a href="#">
          <img class="oucrc-room-button absolute right-0 transform hover:scale-105 transition duration-500 ease-in-out"
               src="~/assets/images/oucrc-room-button.png" alt="部室に何があるの？">
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
      <Contact />
    </section>
    <!-- ▲ お問い合わせ -->


  </div>
</template>

<script>
import Contact from "~/components/Contact";
export default {
  components: {Contact}
}
</script>

<style scoped>
.oucrc-room-label {
  height: 40vh;
  top: 5vh;
}

.oucrc-room-button {
  bottom: 5vh;
  height: 7vh;
}

.parallax {
  background-image: url(~/assets/images/oucrc-room.png)
}
</style>
