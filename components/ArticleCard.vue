<template>
  <div class="bg-white text-center">
    <NuxtLink v-bind:to="href"
              class="inline-block transform hover:scale-101 transition duration-500 ease-in-out w-full">
      <div class="relative">
        <img v-if="imgPath !== null" class="object-cover shadow-lg h-56 w-full" :src="imgPath" v-bind:alt="category">
        <img v-else class="object-cover shadow-lg h-56 w-full" src="@/assets/images/cover.png" alt="NoImage">
        <img class="absolute bottom-0 h-20 right-0" src="@/assets/images/polygon.svg" alt="Polygon">
        <div v-if="category !== null"
             class="absolute bg-primary font-bold py-2 px-5 text-center text-sm text-white tracking-widest"
             style="left: -8px;top: 10px">
          {{ category }}
        </div>
      </div>
      <h2
        class="font-semibold leading-8 mt-6 overflow-hidden whitespace-no-wrap px-3 text-left text-2xl text-primary tracking-widest"
        style="text-overflow: ellipsis">
        {{ title }}
      </h2>
      <h3 class="font-semibold leading-8 mt-4 px-3 text-left text-lg text-secondary tracking-widest"
          :class="{'overflow-hidden' : !ignoreAbridgement}">
        <span class="block"
              :style="{'display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3' : !ignoreAbridgement}">
          {{ description }}
        </span>
      </h3>
      <div class="mt-3 text-left">
        <NuxtLink :to="`/articles?series=${series.id}`" v-if="typeof series.series !== 'undefined'"
                  class="bg-blockquote inline-block mb-3 mr-4 rounded-lg pb-2 px-4 transform hover:scale-105 transition duration-500 ease-in-out">
          <span class="inline-block h-6 w-6">
            <img class="pt-2" src="@/assets/images/series.svg" style="margin: 0 !important" alt="シリーズ">
          </span>
          <span class="align-top inline-block pl-2 pt-2 text-secondary text-sm">{{ series.series }}</span>
        </NuxtLink>
      </div>
      <DoubleLineButton label="内容を見る" class="mt-4"/>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    href: {
      type: String,
      default: '#'
    },
    series: {
      type: Object,
      default: () => {
        return {}
      }
    },
    category: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    imgPath: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: ''
    },
    ignoreAbridgement: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
