<template>
  <div class="page-jumper">
    <NuxtLink
      v-if="currentPageNum > 1"
      :to="createNuxtLinkTo(currentPageNum - 1)"
    >
      <div class="text-subtext text-xl">&lt;</div>
    </NuxtLink>
    <NuxtLink
      v-for="pageNum in [...Array(maxPageNum)].map((_, i) => i + 1)"
      :key="'jumper' + pageNum"
      :to="createNuxtLinkTo(pageNum)"
    >
      <div
        class="text-xl"
        :class="[pageNum === currentPageNum ? 'text-primary' : 'text-subtext']"
      >
        {{ pageNum }}
      </div>
    </NuxtLink>
    <NuxtLink
      v-if="currentPageNum < maxPageNum"
      :to="createNuxtLinkTo(currentPageNum + 1)"
    >
      <div class="text-subtext text-xl">&gt;</div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Pagenation',
  props: {
    currentPageNum: {
      type: Number,
    },
    maxPageNum: {
      type: Number,
      required: true,
      validator: (n) => Number.isSafeInteger(n) && n >= 1,
    },
    createNuxtLinkTo: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style scoped>
.page-jumper {
  @apply flex flex-row mx-auto my-2 justify-center;
}

.page-jumper div {
  @apply px-3;
}
</style>
