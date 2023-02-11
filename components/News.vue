<template>
  <div>
    <div class="text-2xl font-bold border-b-2 border-divider py-5 pl-5 tracking-widest">
      お知らせ
    </div>
    <div
      v-for="notice in news.contents"
      :key="notice.id"
      class="border-b-2 border-divider text-secondary"
    >
      <NuxtLink :to="'news/' + notice.id">
        <div class="text-lg text-left tracking-widest py-3 sm:py-5 pl-5">
          <p
            class="text-sm sm:text-base inline-block overflow-hidden pt-1 sm:pt-0 whitespace-no-wrap"
            style="text-overflow: ellipsis; width: 88%"
          >
            {{ notice.title }}
          </p>
          <div class="text-right float-right pr-5">
            <img class="mt-3 h-2" src="/images/common/news-link.svg" alt="News" />
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MicroCMSListResponse } from 'microcms-js-sdk'
import type { News } from '~/types/micro-cms'

interface Props {
  news: MicroCMSListResponse<News>
}

const props = defineProps<Props>()
</script>
<script lang="ts">
export default {
  name: 'News',
}
</script>
