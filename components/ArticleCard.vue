<template>
  <div class="bg-white text-center">
    <NuxtLink
      v-bind:to="`/articles/${article.id}`"
      class="inline-block transform hover:scale-101 transition duration-500 ease-in-out w-full"
    >
      <div class="relative">
        <picture v-if="article.image">
          <source v-if="article.image.url" type="image/webp" :srcset="article.image.url" />
          <source v-else type="image/webp" :srcset="`${article.image.url}?fm=webp&w=559`" />
          <img
            class="object-cover shadow-lg h-56 w-full"
            :src="article.image.url"
            :alt="article.category.category"
          />
        </picture>
        <picture v-else>
          <source type="image/webp" srcset="/images/article/cover.webp" />
          <img
            class="object-cover shadow-lg h-56 w-full"
            src="/images/article/cover.jpg"
            alt="NoImage"
          />
        </picture>
        <img
          class="absolute bottom-0 h-20 right-0"
          src="/images/common/polygon.svg"
          alt="Polygon"
        />
        <div
          v-if="article.category"
          class="absolute bg-primary font-bold py-2 px-5 text-center text-sm text-white tracking-widest"
          style="left: -8px; top: 10px"
        >
          {{ article.category.category }}
        </div>
      </div>
      <h2
        class="font-semibold leading-8 mt-6 overflow-hidden whitespace-no-wrap px-3 text-left text-2xl text-primary tracking-widest"
        style="text-overflow: ellipsis"
      >
        {{ article.title }}
      </h2>
      <h3
        class="font-semibold leading-8 mt-4 px-3 text-left text-lg text-secondary tracking-widest"
        :class="{ 'overflow-hidden': !ignoreAbridgement }"
      >
        <span
          class="block"
          :style="
            ignoreAbridgement
              ? ''
              : {
                  display: '-webkit-box',
                  '-webkit-box-orient': 'vertical',
                  '-webkit-line-clamp': 3,
                }
          "
        >
          {{ description }}
        </span>
      </h3>
      <div class="mt-3 text-left">
        <NuxtLink
          :to="`/articles/series/${article.series.id}`"
          v-if="article.series"
          class="bg-blockquote inline-block mb-3 mr-4 rounded-lg pb-2 px-4 transform hover:scale-105 transition duration-500 ease-in-out"
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
      <DoubleLineButton label="内容を見る" class="mt-4" />
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { Article } from '~/types/micro-cms'

interface Props {
  article: Article
  ignoreAbridgement?: false
}
const props = defineProps<Props>()
const description = props.article.body.replace(/<br>/g, '\n').replace(/<[^<>]+>/g, '')
</script>
<script lang="ts">
export default {
  name: 'ArticleCard',
}
</script>

<style scoped></style>
