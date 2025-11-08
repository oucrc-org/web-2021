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
      const { currentPageNum, maxPageNum } = this

      // 現在ページの前後1ページの範囲を計算
      const rangeStart = Math.max(2, currentPageNum - 1)
      const rangeEnd = Math.min(maxPageNum - 1, currentPageNum + 1)

      // 範囲内のページ番号を生成
      const middlePages = Array.from(
        { length: rangeEnd - rangeStart + 1 },
        (_, i) => rangeStart + i
      )

      // 最初のページ、省略記号、範囲内、省略記号、最後のページを結合
      return [
        1,
        ...(rangeStart > 2 ? ['ellipsis'] : []),
        ...middlePages,
        ...(rangeEnd < maxPageNum - 1 ? ['ellipsis'] : []),
        ...(maxPageNum > 1 ? [maxPageNum] : []),
      ]
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
