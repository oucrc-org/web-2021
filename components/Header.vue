<template>
  <div id="header" class="bg-white text-lg flex flex-row h-16 justify-between px-3 shadow sticky top-0 w-full z-50">
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
      <img src="~/assets/images/hamburger.svg" width="18" height="18" alt="メニュー" class="m-2 ml-4 block md:hidden">
    </div>
  </div>
</template>

<style scoped>
#navigation > * {
  @apply h-full inline-block mr-4 pt-5 text-sm text-primary transition duration-300 ease-in-out
}

#navigation > .active {
  @apply border-b-2 border-primary
}
</style>
