<template>
  <section class="relative">
    <div class="absolute bg-repeat bg-white h-full w-full"></div>
    <div id="heroArea" class="relative w-full" style="height: 95vh"/>
    <div class="absolute pt-56 sm:pt-72 text-center top-0 w-full">
      <img class="fadeIn2s h-12 sm:h-20 md:h-24 mx-auto" src="@/assets/images/oucrc-label.png" alt="電子計算機研究会">
      <h2 class="fadeIn4s mt-4 sm:mt-8 text-lg sm:text-2xl tracking-widest">
        つくりたいものをつくる
      </h2>
    </div>
    <img class="fadeIn2s1s absolute bottom-0 h-32 mx-auto left-0 right-0" src="@/assets/images/scroll.png" alt="Scroll">
  </section>
</template>

<script>
import particles from '~/assets/js/particles.config'

export default {
  name: "HeroArea",
  mounted() {
    require('particles.js')
    particlesJS('heroArea', particles.data)
  }
}
</script>

<style scoped>
.bg-repeat {
  background-image: url(@/assets/images/bg-repeat.jpg);
  background-size: 99.6px 65.3px;
  background-position: left top;
}

.fadeIn2s {
  animation: fadeIn 2s;
}

.fadeIn4s {
  animation: fadeIn 4s;
}

.fadeIn2s1s {
  animation: fadeIn 2s 1s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
