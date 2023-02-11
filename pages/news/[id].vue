<template>
  <div class="container mx-auto">
    <div class="my-16">
      <!---------------------------------------------------  メイン  --------------------------------------------------->
      <NewsContent v-if="news" :news="news" />
      <!---------------------------------------------------  メイン  --------------------------------------------------->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { News } from '~/types/micro-cms'
const { params } = useRoute()
const { data: news } = useFetch<News>(`/api/news/${params.id}`)
useOG({
  title: () => news.value?.title ?? '',
  description: () => news.value?.body.replace(/<br>/g, '\n').replace(/<[^<>]+>/g, ''),
})
</script>
