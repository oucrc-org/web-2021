<template>
  <section class="bg-white lg:col-span-2 row-span-2 mb-2 md:mb-32 pb-20 lg:shadow-xl" :class="$style.article">

    <!-- ▼ トップ画像 -->
    <div v-if="typeof article.image !== 'undefined' && article.image !== 'null'">
      <img :src="article.image.url" class="h-64 sm:h-96 md:h-120 object-cover" style="margin: 0!important"/>
    </div>
    <div v-else>
      <img src="@/assets/images/cover.png" class="block m-auto w-full"/>
    </div>
    <!-- ▲ トップ画像 -->


    <!-- ▼ タイトル -->
    <div class="font-bold mt-6 mx-8 sm:mx-16 text-4xl sm:text-5xl tracking-wider">
      {{ article.title.replace(/　/g, " ") }}
    </div>
    <!-- ▲ タイトル -->


    <!-- ▼ サブテキスト -->
    <div class="mb-8 mt-6 mx-8 sm:mx-16">
      <p v-if="typeof article.name !== 'undefined' && article.name !== null"
         class="sm:text-lg text-secondary tracking-widest">
        執筆者: {{ article.name.name }}
      </p>
      <p class="sm:text-lg text-secondary tracking-widest">最終更新: {{ timeUpdated }}</p>
    </div>
    <!-- ▲ サブテキスト -->


    <!-- ▼ タグ -->
    <div class="mx-8 sm:mx-16 my-8">
      <NuxtLink :to="`/article?category=${category.id}`" v-if="category" class="bg-blockquote inline-block mb-3 mr-3 rounded-lg pb-2 px-4">
        <span class="inline-block h-6 w-6">
          <img class="pt-2" src="@/assets/images/category.png" style="margin: 0 !important" alt="カテゴリー">
        </span>
        <span class="align-top inline-block pl-2 pt-2 text-secondary text-sm">{{ category.category }}</span>
      </NuxtLink>

      <NuxtLink :to="`/article?series=${series.id}`" v-if="series" class="bg-blockquote inline-block rounded-lg pb-2 px-4">
        <span class="inline-block h-6 w-6">
          <img class="pt-2" src="@/assets/images/series.png" style="margin: 0 !important" alt="シリーズ">
        </span>
        <span class="align-top inline-block pl-2 pt-2 text-secondary text-sm">{{ series.series }}</span>
      </NuxtLink>
    </div>
    <!-- ▲ タグ -->


    <!-- ▼ 記事本文 -->
    <span v-html="article.body" class="block leading-8 mt-16 px-8 sm:px-16 text-lg tracking-wider"></span>
    <!-- ▲ 記事本文 -->

  </section>
</template>

<script>
export default {
  name: "ArticleContent",
  props: {
    article: {
      type: Object,
      default: ''
    },
    category: {
      type: Object,
      default: {}
    },
    series: {
      type: Object,
      default: {}
    },
    timeUpdated: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.MathJax_Display {
  @apply overflow-x-scroll overflow-y-hidden
}
</style>

<style module>
.article img {
  @apply block mx-auto my-5 w-full
}

.article h1 {
  @apply border-divider border-b-2 mb-5 pb-3 pl-1 pt-5 text-h2 sm:text-h1
}

.article h2 {
  @apply mb-3 pt-3 text-h3 sm:text-h2
}

.article h3 {
  @apply mb-3 pt-1 text-h4 sm:text-h3
}

.article h4 {
  @apply mb-3 text-h5 sm:text-h4
}

.article h5 {
  @apply mb-3 text-h6 sm:text-h5
}

.article h6 {
  @apply mb-3 text-h6
}

.article code {
  @apply overflow-scroll my-8 px-6 py-4 rounded-xl
}

.article blockquote {
  @apply p-2 bg-blockquote mb-4 border-l-8 border-blockquoteSidebar rounded pl-4
}

.article blockquote > p {
  @apply mb-0
}

.article ol {
  @apply list-decimal p-2
}

.article ul {
  @apply list-disc p-2
}

.article a {
  @apply text-blue-600
}

.article iframe {
  @apply block m-auto
}
</style>
