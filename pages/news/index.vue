<template>
  <section class="container mx-auto">
    <OGPSetter
      title="お知らせ"
      description="OUCRC（岡山大学電子計算機研究会）のからのお知らせ一覧です！"
    />

    <div class="lg:grid grid-cols-4 xl:grid-cols-5 gap-24 mt-16 px-8">
      <div class="col-span-2 xl:col-span-3">
        <News v-if="news" :news="news" />
      </div>
      <div class="col-span-2 mt-32 lg:mt-0">
        <a
          class="twitter-timeline"
          data-width="1200"
          data-theme="light"
          href="https://twitter.com/oucrc?ref_src=twsrc%5Etfw"
          >Tweets by oucrc</a
        >
        <component
          :is="'script'"
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MicroCMSListResponse } from 'microcms-js-sdk'
import type { News } from '~/types/micro-cms'
const currentTime = new Date().toISOString()
const { data: news } = useFetch<MicroCMSListResponse<News>>('/api/news', {
  params: {
    limit: 1000,
    fields: 'id,title',
    orders: '-important,-date,-createdAt',
    filters: `date[less_than]${currentTime}`,
  },
})
useOG({
  title: 'お知らせ',
  description: 'OUCRC（岡山大学電子計算機研究会）のからのお知らせ一覧です！',
})
</script>
