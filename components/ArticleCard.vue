<template>
  <div class="bg-white text-center">
    <a href="#" class="inline-block transform hover:scale-102 transition duration-500 ease-in-out">
      <div class="relative">
        <img class="object-cover h-56 w-full" :src="imgPath" v-bind:alt="tag">
        <div class="absolute bg-primary font-bold h-10 pt-2 px-5 text-center text-sm text-white tracking-widest" style="left: -8px;top: 10px">
          {{ tag }}
        </div>
      </div>
      <h3 class="font-semibold leading-8 mt-4 px-3 text-left text-lg text-secondary tracking-widest">
        {{ description }}
      </h3>
      <p class="double-line-button mt-8 transform hover:scale-105 transition duration-500 ease-in-out">
        <img src="@/assets/images/next.png" alt="もっと見る">
        <span class="mr-1 tracking-widest">内容を見る</span>
      </p>
    </a>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: ['tag', 'imgPath', 'description']
}
</script>

<style scoped>

</style>
