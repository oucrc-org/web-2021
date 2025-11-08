<template>
  <div class="page-jumper">
    <NuxtLink
      v-if="currentPageNum > 1"
      :to="createNuxtLinkTo(currentPageNum - 1)"
    >
      <div class="text-subtext text-xl">&lt;</div>
    </NuxtLink>
    <template v-for="(item, index) in pageNumbers">
      <NuxtLink
        v-if="typeof item === 'number'"
        :key="'page-' + item"
        :to="createNuxtLinkTo(item)"
      >
        <div
          class="text-xl"
          :class="[item === currentPageNum ? 'text-primary' : 'text-subtext']"
        >
          {{ item }}
        </div>
      </NuxtLink>
      <span v-else :key="'ellipsis-' + index" class="text-subtext text-xl px-3">
        ...
      </span>
    </template>
    <NuxtLink
      v-if="currentPageNum < maxPageNum"
      :to="createNuxtLinkTo(currentPageNum + 1)"
    >
      <div class="text-subtext text-xl">&gt;</div>
    </NuxtLink>
  </div>
</template>

<script>
import { generatePageNumbers } from './utils/pagination.js'

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
  computed: {
    pageNumbers() {
      return generatePageNumbers(this.currentPageNum, this.maxPageNum)
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
