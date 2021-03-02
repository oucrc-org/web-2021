<template>
  <NuxtLink :to="href" class="transform hover:scale-103 transition duration-500 ease-in-out">
    <div class="text-center">
      <img v-if="imgPath !== null" class="object-cover rounded-full w-24 sm:w-32 h-24 sm:h-32 m-auto" alt="画像" :src="imgPath">
      <img v-else class="object-cover rounded-full w-24 sm:w-32 h-24 sm:h-32 m-auto" src="@/assets/images/dummy.png" alt="">
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
