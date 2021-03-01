<template>
  <div :class="{ parent:flag }">
    <div id="header" class="bg-white text-lg flex flex-row h-16 justify-between px-3 shadow sticky top-0 w-full z-50" v-bind:class="{fixed: flag}">
      <NuxtLink to="/" class="m-2 flex flex-row items-center">
        <img src="~/assets/images/oucrc-logo-small.png" alt="ロゴ" class="h-10 hidden md:block mr-2">
        <img src="~/assets/images/oucrc-label-small.png" alt="岡山大学電子計算機研究会" class="h-8">
      </NuxtLink>
      <div class="hidden md:flex flex-grow justify-end">
        <nav id="navigation" class="self-center h-full">
          <NuxtLink to="/" class="border-b-2 border-white hover:border-divider" exact>ホーム</NuxtLink>
          <NuxtLink to="/article" class="border-b-2 border-white hover:border-divider">作品紹介</NuxtLink>
          <NuxtLink to="/members" class="border-b-2 border-white hover:border-divider">部員紹介</NuxtLink>
          <NuxtLink to="/join" class="border-b-2 border-white hover:border-divider">入部フォーム</NuxtLink>
        </nav>
      </div>
      <div class="h-auto flex flex-row">
        <img src="~/assets/images/search.svg" width="18" height="18" alt="検索" class="m-2">
        <button v-on:click="flag = !flag">
          <img v-if="!flag" src="~/assets/images/hamburger.svg" width="18" height="18" alt="メニュー" class="m-2 block md:hidden">
          <img v-if="flag" src="~/assets/images/cancel.svg" width="18" height="18" alt="キャンセル" class="m-2 md:hidden">
        </button>
      </div>
    </div>
    <div class="navbar text-center text-xl" v-bind:class="{show: flag}">
      <nav class="self-center h-full">
        <div class="py-5">
          <NuxtLink to="/" v-on:click.native="flag = false" class="border-b-2 border-white hover:border-divider" exact>ホーム</NuxtLink>
        </div>
        <div class="py-5">
          <NuxtLink to="/article" v-on:click.native="flag = false" class="border-b-2 border-white hover:border-divider">作品紹介</NuxtLink>
        </div>
        <div class="py-5">
          <NuxtLink to="/members" v-on:click.native="flag = false" class="border-b-2 border-white hover:border-divider">部員紹介</NuxtLink>
        </div>
        <div class="py-5">
          <NuxtLink to="/join" v-on:click.native="flag = false" class="border-b-2 border-white hover:border-divider">入部フォーム</NuxtLink>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
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

#header{
  z-index: 9999;
}

.fixed{
  position: fixed;
  top: 0;
}

.parent{
  padding-bottom: 4rem;
}

.navbar{
  position: fixed;
  display: none;
  font-weight: bolder;
  top: 0;
  left: 0;
  z-index: 9998;
  opacity: .9;
  @apply bg-white w-full h-full py-64
}

.show{
  display: block;
}
</style>
