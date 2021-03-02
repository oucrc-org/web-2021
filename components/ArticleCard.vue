<template>
  <div class="bg-white text-center">
    <NuxtLink v-bind:to="href" class="inline-block transform hover:scale-101 transition duration-500 ease-in-out w-full">
      <div class="relative">
        <img v-if="imgPath !== null" class="object-cover h-56 w-full" :src="imgPath" v-bind:alt="tag">
        <img v-else class="object-cover h-56 w-full" src="@/assets/images/dummy.png" alt="">
        <div v-if="tag !== null" class="absolute bg-primary font-bold py-2 px-5 text-center text-sm text-white tracking-widest" style="left: -8px;top: 10px">
          {{ tag }}
        </div>
      </div>
      <h3 class="font-semibold leading-8 mt-4 px-3 text-left text-lg text-secondary tracking-widest">
        {{ description }}
      </h3>
      <DoubleLineButton label="内容を見る" />
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
    tag: {
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
  }
}
</script>

<style scoped>

</style>
