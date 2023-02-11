<template>
  <!-- ▼ トップ画像 -->
  <div v-if="article.image && article.image.width">
    <picture>
      <source
        type="image/webp"
        :srcset="`${article.image.url}?fm=webp${article.image.width > 1008 ? '&w=1008' : ''}`"
      />
      <img
        :src="`${article.image.url}${article.image.width > 1008 ? '?w=1008' : ''}`"
        class="h-64 sm:h-96 md:h-120 object-cover"
        style="margin: 0 !important"
        alt="トップ画像"
      />
    </picture>
  </div>
  <div v-else>
    <picture>
      <source type="image/webp" srcset="/images/article/cover.webp" />
      <img src="/images/article/cover.jpg" class="block m-auto w-full" alt="トップ画像" />
    </picture>
  </div>
  <!-- ▲ トップ画像 -->

  <!-- ▼ タイトル -->
  <div class="font-bold mt-6 mx-8 sm:mx-16 text-4xl sm:text-5xl tracking-wider">
    {{ article.title.replace(/　/g, ' ') }}
  </div>
  <!-- ▲ タイトル -->

  <!-- ▼ サブテキスト -->
  <div class="mb-8 mt-6 mx-8 sm:mx-16">
    <p
      v-if="typeof article.name !== 'undefined' && article.name !== null"
      class="sm:text-lg text-secondary tracking-widest overflow-hidden"
    >
      執筆者: {{ article.name.name }}
    </p>
    <p class="sm:text-lg text-secondary tracking-widest">
      最終更新: {{ $dayjs(article.updatedAt).format('YYYY/MM/DD') }}
    </p>
  </div>
  <!-- ▲ サブテキスト -->

  <!-- ▼ タグ -->
  <div class="mx-8 sm:mx-16 my-8">
    <NuxtLink
      :to="`/articles/category/${article.category.id}`"
      v-if="article.category !== null"
      class="bg-blockquote inline-block mb-3 mr-3 rounded-lg pb-2 px-4"
    >
      <span class="inline-block h-6 w-6">
        <img
          class="pt-2"
          src="/images/article/category.svg"
          style="margin: 0 !important"
          alt="カテゴリー"
        />
      </span>
      <span class="align-top inline-block pl-2 pt-2 text-secondary text-sm">{{
        article.category.category
      }}</span>
    </NuxtLink>

    <NuxtLink
      :to="`/articles/series/${article.series.id}`"
      v-if="article.series !== null"
      class="bg-blockquote inline-block rounded-lg pb-2 px-4"
    >
      <span class="inline-block h-6 w-6">
        <img
          class="pt-2"
          src="/images/article/series.svg"
          style="margin: 0 !important"
          alt="シリーズ"
        />
      </span>
      <span class="align-top inline-block pl-2 pt-2 text-secondary text-sm">{{
        article.series.series
      }}</span>
    </NuxtLink>
  </div>
  <!-- ▲ タグ -->

  <!-- ▼ ランキング -->
  <div class="mx-8 sm:mx-16 my-8">
    <div v-for="[key, value] in Object.entries(ranking)" :key="key" class="inline-block">
      <div
        v-if="value.data.includes(article.id)"
        :class="value.bg_class"
        class="sm:inline-block mb-3 sm:mr-4 rounded-lg pb-3 pt-1 px-4 tracking-widest"
      >
        <span class="inline-block h-6 w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mt-3"
            :class="value.text_class"
            fill="currentColor"
            viewBox="0 0 200 145.218"
          >
            <path
              d="M112.159,265.46v.028L62.307,323.72l-39.689-40V378.5H201.724V283.719l-39.689,40-49.852-58.232v-.028l-.012.014ZM16.519,387.2a4.338,4.338,0,0,0-4.348,4.348v14.782a4.338,4.338,0,0,0,4.348,4.348h191.3a4.338,4.338,0,0,0,4.348-4.348V391.547a4.338,4.338,0,0,0-4.348-4.348Z"
              transform="translate(-12.171 -265.459)"
            />
          </svg>
        </span>
        <span class="align-top inline-block ml-2 pl-2 pt-2 text-sm" :class="value.text_class"
          >{{ value.title
          }}<span class="font-bold ml-1">{{ value.data.indexOf(article.id) + 1 }}位</span></span
        >
      </div>
    </div>
  </div>
  <!-- ▲ ランキング -->

  <!-- ▼ 記事本文 -->
  <span
    :class="$style.article"
    v-html="article.body"
    class="block leading-8 mt-16 px-8 sm:px-16 text-lg tracking-wider"
  ></span>
  <!-- ▲ 記事本文 -->
</template>
<script setup lang="ts">
import 'highlight.js/styles/androidstudio.css'
import type { Article } from '~/types/micro-cms'
interface Props {
  article: Article
}
const props = defineProps<Props>()
useHead({
  script: [
    { src: 'https://polyfill.io/v3/polyfill.min.js?features=es6' },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML',
    },
  ],
})
</script>
<script lang="ts">
export default {
  name: 'ArticleContent',
  data() {
    return {
      ranking: {
        views: {
          title: '2021年アクセスランキング:',
          bg_class: 'bg-yellow-100',
          text_class: 'text-yellow-500',
          data: ['zc-pub38s', 'o2ql0oomqfd', 'e6vkrz4uqtt'],
        },
        technology: {
          title: '2021年技術記事:',
          bg_class: 'bg-green-100',
          text_class: 'text-green-500',
          data: ['vbp0hni4l', '66dakcrrl', 'wlb6a8w9m'],
        },
        interesting: {
          title: '2021年おもしろ記事:',
          bg_class: 'bg-pink-100',
          text_class: 'text-pink-500',
          data: ['3cv3mk166ude', 'vbp0hni4l', 'uqj8wl-ldpg2'],
        },
        beginner: {
          title: '2021年初心者記事:',
          bg_class: 'bg-blue-100',
          text_class: 'text-blue-500',
          data: ['sov344416', 'zlu04tkzslcw', 'wd1erphyov8'],
        },
        series_technology: {
          title: '2021年技術シリーズ:',
          bg_class: 'bg-green-100',
          text_class: 'text-green-500',
          data: ['h_19frtxx7c', 'cfykct7kadve', ''],
        },
        series_interesting: {
          title: '2021年おもしろシリーズ:',
          bg_class: 'bg-pink-100',
          text_class: 'text-pink-500',
          data: ['qpwi_a2-8o', 'r_vu3w1g5', 'ti_xc21a7'],
        },
        series_beginner: {
          title: '2021年初心者シリーズ:',
          bg_class: 'bg-blue-100',
          text_class: 'text-blue-500',
          data: ['wnkvw5pd8b1', 'cfykct7kadve', 'h_19frtxx7c'],
        },
      },
    }
  },
}
</script>

<style>
.MathJax_Display {
  @apply overflow-x-scroll overflow-y-hidden;
}
</style>

<style module>
.article {
  word-break: break-all;
  line-break: loose;
}

.article img {
  @apply block mx-auto my-5 w-full;
}

.article h1 {
  @apply border-divider border-b-2 my-5 pb-3 pl-1 pt-5 text-h2 leading-10;
}

.article h2 {
  @apply my-3 pt-3 text-h3 sm:text-h2;
}

.article h3 {
  @apply my-3 pt-1 text-h4 sm:text-h3;
}

.article h4 {
  @apply my-3 text-h5 sm:text-h4;
}

.article h5 {
  @apply my-3 text-h6 sm:text-h5;
}

.article h6 {
  @apply my-3 text-h6;
}

.article p {
}

.article code {
  @apply overflow-scroll my-8 px-6 py-4 rounded-2xl;
}

.article p code {
  @apply bg-highlight mx-1 my-0 px-2 py-1 rounded text-base;
}

.article blockquote {
  @apply p-2 bg-blockquote mb-4 border-l-8 border-blockquoteSidebar rounded pl-4;
}

.article blockquote > p {
  @apply mb-0;
}

.article ol {
  @apply list-decimal p-2 px-6;
}

.article ul {
  @apply list-disc p-2 px-6;
}

.article a {
  line-break: anywhere;
  @apply text-blue-600;
}

.article iframe {
  @apply block m-auto w-full;
}
</style>
