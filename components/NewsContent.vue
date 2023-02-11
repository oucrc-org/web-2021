<template>
  <section
    class="bg-white lg:col-span-2 row-span-2 mb-2 md:mb-32 pb-20 lg:shadow-xl"
    :class="$style.news"
  >
    <!-- ▼ トップ画像 -->
    <div>
      <picture>
        <source type="image/webp" :srcset="require('@/assets/images/news/cover.webp')" />
        <img
          v-lazy="require('@/assets/images/news/cover.jpg')"
          class="block m-auto w-full"
          alt="トップ画像"
        />
      </picture>
    </div>
    <!-- ▲ トップ画像 -->

    <!-- ▼ タイトル -->
    <div class="font-bold mt-6 mx-8 sm:mx-16 text-4xl sm:text-5xl tracking-wider">
      {{ news.title.replace(/　/g, ' ') }}
    </div>
    <!-- ▲ タイトル -->

    <!-- ▼ サブテキスト -->
    <div class="mb-8 mt-6 mx-8 sm:mx-16">
      <p class="sm:text-lg text-secondary tracking-widest">
        最終更新: {{ $dayjs(news.updatedAt).format('YYYY/MM/DD') }}
      </p>
    </div>
    <!-- ▲ サブテキスト -->

    <!-- ▼ 記事本文 -->
    <span
      v-html="news.body"
      class="block leading-8 mt-16 px-8 sm:px-16 text-lg tracking-wider"
    ></span>
    <!-- ▲ 記事本文 -->
  </section>
</template>
<script setup lang="ts">
import { News } from '~/types/micro-cms'
interface Props {
  news: News
}
const props = defineProps<Props>()
</script>
<script>
export default {
  name: 'NewsContent',
}
</script>

<style module>
.news {
  word-break: break-all;
  line-break: loose;
}

.news img {
  @apply block mx-auto my-5 w-full;
}

.news h1 {
  @apply border-divider border-b-2 my-5 pb-3 pl-1 pt-5 text-h2 leading-10;
}

.news h2 {
  @apply my-3 pt-3 text-h3 sm:text-h2;
}

.news h3 {
  @apply my-3 pt-1 text-h4 sm:text-h3;
}

.news h4 {
  @apply my-3 text-h5 sm:text-h4;
}

.news h5 {
  @apply my-3 text-h6 sm:text-h5;
}

.news h6 {
  @apply my-3 text-h6;
}

.news p {
}

.news code {
  @apply overflow-scroll my-8 px-6 py-4 rounded-2xl;
}

.news p code {
  @apply bg-highlight mx-1 my-0 px-2 py-1 rounded text-base;
}

.news blockquote {
  @apply p-2 bg-blockquote mb-4 border-l-8 border-blockquoteSidebar rounded pl-4;
}

.news blockquote > p {
  @apply mb-0;
}

.news ol {
  @apply list-decimal p-2 px-6;
}

.news ul {
  @apply list-disc p-2 px-6;
}

.news a {
  line-break: anywhere;
  @apply text-blue-600;
}

.news iframe {
  @apply block m-auto w-full;
}
</style>
