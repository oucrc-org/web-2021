<template>
  <NuxtLink :to="href" class="transform hover:scale-103 transition duration-500 ease-in-out">
    <div class="px-5">
      <img
        v-if="imgPath !== null"
        class="rounded-full w-full h-full object-cover" alt="画像"
        :src="imgPath">
      <img v-else class="rounded-full　object-cover h-full w-full" src="@/assets/images/dummy.png" alt="">
    </div>
    <p class="font-bold mt-3 text-center text-lg text-secondary">{{ name }}</p>
    <div class="overflow-hidden px-3 text-center text-sm text-subtext">
      <p class="overflow-hidden overflow- whitespace-no-wrap" style="text-overflow: ellipsis">{{ status }}</p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'MemberIndexCard',
  props: {
    href: {
      type: String,
      default: '#'
    },
    imgPath: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: null
    }
  }
}
</script>
