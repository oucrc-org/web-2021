<template>
  <div class="bg-white text-center">
    <NuxtLink
      :to="href"
      class="inline-block transform hover:scale-101 transition duration-500 ease-in-out w-full"
    >
      <div class="relative">
        <picture v-if="imgPath !== null">
          <source v-if="webpPath" type="image/webp" :srcset="webpPath" />
          <source
            v-else
            type="image/webp"
            :srcset="`${imgPath}?fm=webp${imgMaxWidth > 0 ? '&w=' + imgMaxWidth : ''}`"
          />
          <img
            class="object-cover shadow-lg h-56 w-full"
            v-lazy="`${imgPath}${imgMaxWidth > 0 ? '?w=' + imgMaxWidth : ''}`"
            :alt="`記事「${title}」のサムネイル`"
          />
        </picture>
        <picture v-else>
          <source type="image/webp" :srcset="require('@/assets/images/article/cover.webp')" />
          <img
            class="object-cover shadow-lg h-56 w-full"
            v-lazy="require('@/assets/images/article/cover.jpg')"
            alt="NoImage"
          />
        </picture>
        <img
          class="absolute bottom-0 h-20 right-0"
          v-lazy="require('@/assets/images/common/polygon.svg')"
          alt="Polygon"
        />
        <div
          v-if="category !== null"
          class="absolute bg-primary font-bold py-2 px-5 text-center text-sm text-white tracking-widest"
          style="left: -8px; top: 10px"
        >
          {{ category.category }}
        </div>
      </div>
      <h2
        class="font-semibold leading-8 mt-6 overflow-hidden whitespace-no-wrap px-3 text-left text-2xl text-primary tracking-widest"
        style="text-overflow: ellipsis"
      >
        {{ title }}
      </h2>
      <p
        class="font-semibold leading-8 mt-4 px-3 text-left text-lg text-secondary tracking-widest"
        :class="{ 'overflow-hidden': !ignoreAbridgement }"
      >
        <span class="block" :class="{ 'line-clamp-3': !ignoreAbridgement }">
          {{ description }}
        </span>
      </p>
      <DoubleLineButton label="内容を見る" class="mt-4" />
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    href: {
      type: String,
      default: '#',
    },
    category: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    imgPath: {
      type: String,
      default: null,
    },
    webpPath: {
      type: String,
      default: null,
    },
    imgMaxWidth: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
    ignoreAbridgement: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped></style>
