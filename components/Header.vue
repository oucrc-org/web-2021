<template>
  <header>
    <div class="bg-white text-lg flex flex-row h-16 justify-between opacity-90 px-3 shadow-md fixed w-full z-50">

      <!-- ▼ ロゴ -->
      <NuxtLink to="/" class="m-2 flex flex-row items-center">
        <picture>
          <source type="image/webp" :srcset="require('@/assets/images/common/oucrc-logo.webp')">
          <img class="h-10 hidden md:block mr-2" src="@/assets/images/common/oucrc-logo.png" alt="ロゴ">
        </picture>
        <picture>
          <source type="image/webp" :srcset="require('@/assets/images/common/oucrc-label.webp')">
          <img class="h-8" src="@/assets/images/common/oucrc-label.png" alt="岡山大学電子計算機研究会">
        </picture>
      </NuxtLink>
      <!-- ▲ ロゴ -->


      <!-- ▼ PC ナビゲーション -->
      <div class="hidden md:flex flex-grow justify-end">
        <nav id="navigation" class="self-center h-full">
          <NuxtLink to="/" class="border-b-2 border-white hover:border-divider" exact>ホーム</NuxtLink>
          <NuxtLink to="/articles" class="border-b-2 border-white hover:border-divider">作品紹介</NuxtLink>
          <NuxtLink to="/members" class="border-b-2 border-white hover:border-divider">部員紹介</NuxtLink>
          <NuxtLink to="/join" class="border-b-2 border-white hover:border-divider">入部フォーム</NuxtLink>
        </nav>
      </div>
      <!-- ▲ PC ナビゲーション -->


      <!-- ▼ スマホ ハンバーガーメニュー -->
      <div class="h-auto flex flex-row ">
        <button class="focus:outline-none" v-on:click="flag = !flag" type="button">
          <img v-if="!flag" src="~/assets/images/header/hamburger.svg" width="18" height="18" alt="メニュー"
               class="m-2 block md:hidden">
          <img v-if="flag" src="~/assets/images/header/close.svg" width="18" height="18" alt="キャンセル"
               class="m-2 md:hidden">
          <span class="hamburger">ハンバーガーメニュー</span>
        </button>
      </div>
      <!-- ▲ スマホ ハンバーガーメニュー -->

    </div>

    <div class="navbar fixed text-center text-xl z-40" v-bind:class="{show: flag}">

      <!-- ▼ スマホ ナビゲーション -->
      <nav class="self-center h-full">
        <div class="py-5">
          <NuxtLink to="/" v-on:click.native="flag = false" class="border-b-2 border-white hover:border-divider" exact>
            ホーム
          </NuxtLink>
        </div>
        <div class="py-5">
          <NuxtLink to="/articles" v-on:click.native="flag = false"
                    class="border-b-2 border-white hover:border-divider">
            作品紹介
          </NuxtLink>
        </div>
        <div class="py-5">
          <NuxtLink to="/members" v-on:click.native="flag = false" class="border-b-2 border-white hover:border-divider">
            部員紹介
          </NuxtLink>
        </div>
        <div class="py-5">
          <NuxtLink to="/join" v-on:click.native="flag = false" class="border-b-2 border-white hover:border-divider">
            入部フォーム
          </NuxtLink>
        </div>
      </nav>
      <!-- ▲ スマホ ナビゲーション -->

    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    }
  }
}
</script>

<style scoped>
#navigation > * {
  @apply h-full inline-block mr-4 pt-5 text-sm text-primary transition duration-300 ease-in-out
}

#navigation > .active {
  @apply border-b-2 border-primary
}

.navbar {
  @apply bg-white font-bold hidden w-full h-full py-64 top-0 left-0 opacity-90
}

.hamburger {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.show {
  @apply block
}
</style>
